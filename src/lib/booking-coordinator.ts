/**
 * Booking Coordinator & Concurrency Service for Plany
 * Coordinates booking creation, validates availability and constraints,
 * and enforces cross-process database write-locking in SQLite to prevent double-booking.
 */

import { prisma } from "./db";
import {
  BookingInput,
  isSlotConflicting,
} from "./scheduling";
import {
  getZonedDateParts,
  parseTimeString,
  sanitizeTimezone,
  isValidTimezone,
} from "./timezone";

// Custom error classes for fine-grained error handling
export class ValidationError extends Error {
  readonly statusCode = 400;
  constructor(message: string) {
    super(message);
    this.name = "ValidationError";
  }
}

export class NotFoundError extends Error {
  readonly statusCode = 404;
  constructor(message: string) {
    super(message);
    this.name = "NotFoundError";
  }
}

export class SlotConflictError extends Error {
  readonly statusCode = 409;
  constructor(message = "The selected time slot is no longer available. Please select another time.") {
    super(message);
    this.name = "SlotConflictError";
  }
}

/**
 * In-memory FIFO Mutex for single-process fast-path coordination.
 * Database-level write locking is the primary cross-process guarantee.
 */
class AsyncMutex {
  private queue: Array<() => void> = [];
  private locked = false;

  async acquire(): Promise<() => void> {
    return new Promise((resolve) => {
      const release = () => {
        if (this.queue.length > 0) {
          const next = this.queue.shift()!;
          next();
        } else {
          this.locked = false;
        }
      };

      if (this.locked) {
        this.queue.push(() => resolve(release));
      } else {
        this.locked = true;
        resolve(release);
      }
    });
  }
}

const eventMutexes = new Map<string, AsyncMutex>();

export function getEventMutex(eventTypeId: string): AsyncMutex {
  let mutex = eventMutexes.get(eventTypeId);
  if (!mutex) {
    mutex = new AsyncMutex();
    eventMutexes.set(eventTypeId, mutex);
  }
  return mutex;
}

export interface CreateBookingRequest {
  eventTypeId: string;
  startTime: string | Date;
  endTime: string | Date;
  inviteeName: string;
  inviteeEmail: string;
  inviteeTimezone: string;
  inviteeNotes?: string | null;
}

export interface CreateBookingOptions {
  /** Optional reference timestamp for testing past slots deterministically */
  referenceNow?: Date;
  /** Optional custom prisma client (useful for isolated test transactions) */
  client?: typeof prisma;
  /** Skip the in-memory mutex to exercise pure database-level locking */
  skipMemoryMutex?: boolean;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Validates input parameters and formats.
 */
function validateBookingInput(input: CreateBookingRequest) {
  if (!input.eventTypeId || typeof input.eventTypeId !== "string" || !input.eventTypeId.trim()) {
    throw new ValidationError("Missing or invalid eventTypeId.");
  }

  if (!input.inviteeName || typeof input.inviteeName !== "string" || !input.inviteeName.trim()) {
    throw new ValidationError("Your name is required.");
  }

  if (
    !input.inviteeEmail ||
    typeof input.inviteeEmail !== "string" ||
    !EMAIL_REGEX.test(input.inviteeEmail.trim())
  ) {
    throw new ValidationError("A valid email address is required.");
  }

  if (!input.inviteeTimezone || !isValidTimezone(input.inviteeTimezone)) {
    throw new ValidationError("A valid invitee timezone is required.");
  }

  const start = new Date(input.startTime);
  const end = new Date(input.endTime);

  if (isNaN(start.getTime())) {
    throw new ValidationError("Invalid startTime format.");
  }

  if (isNaN(end.getTime())) {
    throw new ValidationError("Invalid endTime format.");
  }

  if (end.getTime() <= start.getTime()) {
    throw new ValidationError("endTime must be after startTime.");
  }

  return {
    start,
    end,
    inviteeName: input.inviteeName.trim(),
    inviteeEmail: input.inviteeEmail.trim().toLowerCase(),
    inviteeTimezone: input.inviteeTimezone.trim(),
    inviteeNotes: input.inviteeNotes?.trim() || null,
  };
}

/**
 * Checks whether the candidate slot falls inside the host's configured availability rules.
 */
function verifySlotWithinHostAvailability(
  startUtc: Date,
  endUtc: Date,
  durationMinutes: number,
  hostTimezone: string,
  rules: Array<{ dayOfWeek: number; startTime: string; endTime: string }>
) {
  const hostTz = sanitizeTimezone(hostTimezone);
  const hostStartParts = getZonedDateParts(startUtc, hostTz);

  // Day of week in host timezone
  const dayOfWeek = hostStartParts.dayOfWeek;

  // Matching availability rules for this day
  const matchingRules = rules.filter((r) => r.dayOfWeek === dayOfWeek);
  if (matchingRules.length === 0) {
    throw new ValidationError("Requested slot falls on a day when host has no configured availability.");
  }

  const slotStartMin = hostStartParts.hour * 60 + hostStartParts.minute;
  const slotEndMin = slotStartMin + durationMinutes;

  let fallsWithinRule = false;
  for (const rule of matchingRules) {
    const { hour: rStartH, minute: rStartM } = parseTimeString(rule.startTime);
    const { hour: rEndH, minute: rEndM } = parseTimeString(rule.endTime);
    const rStartMin = rStartH * 60 + rStartM;
    const rEndMin = rEndH * 60 + rEndM;

    if (slotStartMin >= rStartMin && slotEndMin <= rEndMin) {
      fallsWithinRule = true;
      break;
    }
  }

  if (!fallsWithinRule) {
    throw new ValidationError("Requested slot falls outside the host's configured hours for this day.");
  }
}

/**
 * Execute an operation with SQLite busy retry logic.
 * Retries bounded write conflicts (P2034) or busy locks across competing processes.
 */
async function withBusyRetry<T>(fn: () => Promise<T>, maxRetries = 10): Promise<T> {
  let attempt = 0;
  while (true) {
    try {
      return await fn();
    } catch (err: any) {
      attempt++;
      const isBusy =
        err?.code === "P2034" ||
        err?.code === "P2028" ||
        (typeof err?.message === "string" &&
          (err.message.includes("SQLITE_BUSY") ||
            err.message.includes("database is locked") ||
            err.message.includes("write conflict") ||
            err.message.includes("busy")));

      if (isBusy && attempt <= maxRetries) {
        // Exponential backoff with random jitter: 20ms to 350ms
        const delay = Math.min(20 * Math.pow(1.4, attempt) + Math.random() * 30, 350);
        await new Promise((resolve) => setTimeout(resolve, delay));
        continue;
      }
      throw err;
    }
  }
}

/**
 * Creates a booking safely coordinating concurrency to prevent double-booking.
 * Enforces cross-process SQLite write-locking so competing requests across
 * any number of processes cannot both perform the conflict check and insert.
 */
export async function createBooking(
  request: CreateBookingRequest,
  options: CreateBookingOptions = {}
) {
  const { referenceNow = new Date(), client = prisma, skipMemoryMutex = false } = options;

  // 1. Validate basic input fields
  const validated = validateBookingInput(request);

  // 2. Reject past slots
  if (validated.start.getTime() <= referenceNow.getTime()) {
    throw new ValidationError("Requested slot is in the past.");
  }

  // Optional in-memory mutex acquisition for single-process fast path
  let releaseMemoryLock = () => {};
  if (!skipMemoryMutex) {
    const mutex = getEventMutex(request.eventTypeId);
    releaseMemoryLock = await mutex.acquire();
  }

  try {
    return await withBusyRetry(async () => {
      // Execute in interactive transaction with database-level write locking
      return await client.$transaction(
        async (tx) => {
          // 3. Fetch event type with host and default availability schedule
          const eventType = await tx.eventType.findUnique({
            where: { id: request.eventTypeId },
            include: {
              user: {
                include: {
                  availabilitySchedules: {
                    where: { isDefault: true },
                    include: { rules: true },
                  },
                },
              },
            },
          });

          if (!eventType || !eventType.isActive) {
            throw new NotFoundError("Event type not found or is inactive.");
          }

          // 4. DATABASE-LEVEL WRITE LOCK ACQUISITION:
          // In SQLite, executing an UPDATE statement upgrades the connection's transaction
          // lock to RESERVED/EXCLUSIVE across the entire SQLite database file.
          // By updating the host user's record immediately before querying existing bookings,
          // any competing process attempting to book for this host is forced to wait or
          // retry on SQLITE_BUSY.
          await tx.user.update({
            where: { id: eventType.userId },
            data: { updatedAt: new Date() },
          });

          // 5. Verify duration matches
          const slotDurationMinutes = Math.round(
            (validated.end.getTime() - validated.start.getTime()) / 60000
          );
          if (slotDurationMinutes !== eventType.durationMinutes) {
            throw new ValidationError(
              `Requested slot duration (${slotDurationMinutes}m) does not match event duration (${eventType.durationMinutes}m).`
            );
          }

          // 6. Verify slot falls within host weekly availability
          const defaultSchedule = eventType.user.availabilitySchedules[0];
          if (!defaultSchedule || defaultSchedule.rules.length === 0) {
            throw new ValidationError("Host has no active availability schedule.");
          }

          verifySlotWithinHostAvailability(
            validated.start,
            validated.end,
            eventType.durationMinutes,
            defaultSchedule.timezone,
            defaultSchedule.rules
          );

          // 7. Check for conflicts with existing confirmed bookings (while holding write lock)
          const candidateBufferBefore = eventType.bufferBeforeMinutes ?? 0;
          const candidateBufferAfter = eventType.bufferAfterMinutes ?? 0;

          // Expanded candidate window
          const queryWindowStart = new Date(
            validated.start.getTime() - (candidateBufferBefore + 60) * 60000
          );
          const queryWindowEnd = new Date(
            validated.end.getTime() + (candidateBufferAfter + 60) * 60000
          );

          // Query all confirmed bookings belonging to the same host across all event types
          const existingBookings = await tx.booking.findMany({
            where: {
              eventType: {
                userId: eventType.userId,
              },
              status: "confirmed",
              startTime: { lt: queryWindowEnd },
              endTime: { gt: queryWindowStart },
            },
            select: {
              startTime: true,
              endTime: true,
              status: true,
            },
          });

          const conflicting = isSlotConflicting(
            validated.start,
            validated.end,
            existingBookings.map((b) => ({
              startTime: b.startTime,
              endTime: b.endTime,
              status: b.status,
            })),
            candidateBufferBefore,
            candidateBufferAfter
          );

          if (conflicting) {
            throw new SlotConflictError(
              "The selected time slot is no longer available. Please select another time."
            );
          }

          // 8. Slot is confirmed clean under the lock — persist confirmed booking
          const newBooking = await tx.booking.create({
            data: {
              eventTypeId: eventType.id,
              startTime: validated.start,
              endTime: validated.end,
              inviteeName: validated.inviteeName,
              inviteeEmail: validated.inviteeEmail,
              inviteeTimezone: validated.inviteeTimezone,
              inviteeNotes: validated.inviteeNotes,
              status: "confirmed",
            },
            select: {
              id: true,
              eventTypeId: true,
              startTime: true,
              endTime: true,
              inviteeName: true,
              inviteeEmail: true,
              inviteeTimezone: true,
              inviteeNotes: true,
              status: true,
              createdAt: true,
            },
          });

          return newBooking;
        },
        {
          timeout: 10000,
          maxWait: 5000,
        }
      );
    });
  } finally {
    releaseMemoryLock();
  }
}
