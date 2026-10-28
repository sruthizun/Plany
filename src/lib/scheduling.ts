/**
 * Core Scheduling Engine for Plany
 * Generates available booking slots, applies availability rules, enforces buffer times,
 * and detects booking conflicts across timezones.
 */

import {
  createInstantFromZoned,
  formatDateString,
  formatTime12Hour,
  getZonedDateParts,
  parseTimeString,
  sanitizeTimezone,
} from "./timezone";

export interface AvailabilityRuleInput {
  dayOfWeek: number; // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
  startTime: string; // "09:00"
  endTime: string;   // "17:00"
}

export interface AvailabilityScheduleInput {
  timezone: string;
  rules: AvailabilityRuleInput[];
}

export interface BookingInput {
  startTime: Date;
  endTime: Date;
  status: string; // "confirmed" | "cancelled"
  bufferBeforeMinutes?: number;
  bufferAfterMinutes?: number;
}

export interface AvailableSlot {
  /** UTC ISO string of the slot start time */
  utcStartTime: string;
  /** UTC ISO string of the slot end time */
  utcEndTime: string;
  /** Local calendar date in invitee's timezone ("YYYY-MM-DD") */
  localDate: string;
  /** Formatted 12-hour start time in invitee's timezone (e.g. "9:00 AM") */
  localStartTime: string;
  /** Formatted 12-hour end time in invitee's timezone (e.g. "9:30 AM") */
  localEndTime: string;
  /** True if the meeting ends on the subsequent calendar day in the invitee's timezone */
  crossesMidnight: boolean;
}

export interface GenerateSlotsOptions {
  /** Single target date ("YYYY-MM-DD") in the invitee's timezone */
  targetDate: string;
  /** Host weekly schedule and timezone */
  schedule: AvailabilityScheduleInput;
  /** Meeting duration in minutes (e.g. 30) */
  durationMinutes: number;
  /** Buffer time needed before each meeting */
  bufferBeforeMinutes?: number;
  /** Buffer time needed after each meeting */
  bufferAfterMinutes?: number;
  /** Existing bookings for the host */
  existingBookings: BookingInput[];
  /** Target timezone for the invitee */
  inviteeTimezone: string;
  /** Reference "now" instant for past slot exclusion (defaults to current time) */
  referenceNow?: Date;
  /** Minimum notice required in minutes before a slot can be booked */
  minNoticeMinutes?: number;
}

/**
 * Checks if two time intervals overlap.
 * Adjacent intervals (where one ends exactly when the other starts) do NOT overlap.
 */
export function intervalsOverlap(
  startA: Date,
  endA: Date,
  startB: Date,
  endB: Date
): boolean {
  return startA.getTime() < endB.getTime() && endA.getTime() > startB.getTime();
}

/**
 * Checks whether a candidate slot conflicts with any existing confirmed bookings,
 * accounting for buffer times on both the candidate slot and existing bookings.
 */
export function isSlotConflicting(
  slotStart: Date,
  slotEnd: Date,
  existingBookings: BookingInput[],
  candidateBufferBeforeMinutes = 0,
  candidateBufferAfterMinutes = 0
): boolean {
  // Expanded window needed for the candidate slot including its buffers
  const candidateWindowStart = new Date(slotStart.getTime() - candidateBufferBeforeMinutes * 60000);
  const candidateWindowEnd = new Date(slotEnd.getTime() + candidateBufferAfterMinutes * 60000);

  for (const booking of existingBookings) {
    if (booking.status !== "confirmed") {
      continue;
    }

    // Account for buffers that may be attached directly to the existing booking
    const bookingBufferBefore = booking.bufferBeforeMinutes ?? 0;
    const bookingBufferAfter = booking.bufferAfterMinutes ?? 0;
    const bookingWindowStart = new Date(booking.startTime.getTime() - bookingBufferBefore * 60000);
    const bookingWindowEnd = new Date(booking.endTime.getTime() + bookingBufferAfter * 60000);

    if (
      intervalsOverlap(
        candidateWindowStart,
        candidateWindowEnd,
        bookingWindowStart,
        bookingWindowEnd
      )
    ) {
      return true;
    }
  }

  return false;
}

/**
 * Validates and safely parses an availability rule.
 * Returns null if the rule is corrupt, has endTime <= startTime, or an invalid dayOfWeek.
 */
function validateRule(rule: AvailabilityRuleInput): {
  dayOfWeek: number;
  startHour: number;
  startMinute: number;
  endHour: number;
  endMinute: number;
} | null {
  if (
    typeof rule?.dayOfWeek !== "number" ||
    isNaN(rule.dayOfWeek) ||
    rule.dayOfWeek < 0 ||
    rule.dayOfWeek > 6
  ) {
    return null;
  }

  try {
    const { hour: startHour, minute: startMinute } = parseTimeString(rule.startTime);
    const { hour: endHour, minute: endMinute } = parseTimeString(rule.endTime);

    const startTotal = startHour * 60 + startMinute;
    const endTotal = endHour * 60 + endMinute;

    if (endTotal <= startTotal) {
      return null;
    }

    return {
      dayOfWeek: rule.dayOfWeek,
      startHour,
      startMinute,
      endHour,
      endMinute,
    };
  } catch {
    return null;
  }
}

/**
 * Generates all available slots for a target date in the invitee's timezone.
 */
export function generateAvailableSlots(options: GenerateSlotsOptions): AvailableSlot[] {
  const {
    targetDate,
    schedule,
    durationMinutes,
    bufferBeforeMinutes = 0,
    bufferAfterMinutes = 0,
    existingBookings = [],
    inviteeTimezone,
    referenceNow = new Date(),
    minNoticeMinutes = 0,
  } = options;

  if (typeof durationMinutes !== "number" || isNaN(durationMinutes) || durationMinutes <= 0) {
    throw new Error(`Invalid durationMinutes: ${durationMinutes}. Must be greater than 0.`);
  }

  if (!targetDate || !/^\d{4}-\d{2}-\d{2}$/.test(targetDate)) {
    throw new Error(`Invalid targetDate format "${targetDate}". Expected YYYY-MM-DD.`);
  }

  const hostTz = sanitizeTimezone(schedule?.timezone);
  const invTz = sanitizeTimezone(inviteeTimezone);

  // Parse invitee target date YYYY-MM-DD
  const [targetYearStr, targetMonthStr, targetDayStr] = targetDate.split("-");
  const targetYear = parseInt(targetYearStr ?? "0", 10);
  const targetMonth = parseInt(targetMonthStr ?? "0", 10);
  const targetDay = parseInt(targetDayStr ?? "0", 10);

  // Earliest possible UTC instant that could fall on targetDate in invitee timezone
  const targetDayStartUtc = createInstantFromZoned(targetYear, targetMonth, targetDay, 0, 0, invTz);

  // Buffer reference timestamp for minimum notice
  const earliestAllowedStart = new Date(referenceNow.getTime() + minNoticeMinutes * 60000);

  // To account for timezone offsets, examine host days spanning +/- 1 day around targetDayStartUtc
  const hostCenterParts = getZonedDateParts(targetDayStartUtc, hostTz);
  const centerDateInHost = new Date(Date.UTC(hostCenterParts.year, hostCenterParts.month - 1, hostCenterParts.day));

  const candidateHostDates: Date[] = [
    new Date(centerDateInHost.getTime() - 24 * 60 * 60 * 1000), // Day - 1
    centerDateInHost,                                          // Day 0
    new Date(centerDateInHost.getTime() + 24 * 60 * 60 * 1000), // Day + 1
  ];

  // Filter and pre-validate schedule rules
  const rawRules = Array.isArray(schedule?.rules) ? schedule.rules : [];
  const validRules = rawRules
    .map(validateRule)
    .filter((r): r is NonNullable<typeof r> => r !== null);

  const availableSlots: AvailableSlot[] = [];

  for (const hostDateObj of candidateHostDates) {
    const hostYear = hostDateObj.getUTCFullYear();
    const hostMonth = hostDateObj.getUTCMonth() + 1;
    const hostDay = hostDateObj.getUTCDate();

    // Determine host day of week
    const hostMidnightInstant = createInstantFromZoned(hostYear, hostMonth, hostDay, 0, 0, hostTz);
    const hostParts = getZonedDateParts(hostMidnightInstant, hostTz);
    const dayOfWeek = hostParts.dayOfWeek;

    // Find rules for this day of week
    const matchingRules = validRules.filter((r) => r.dayOfWeek === dayOfWeek);

    for (const rule of matchingRules) {
      const ruleStartUtc = createInstantFromZoned(
        hostYear,
        hostMonth,
        hostDay,
        rule.startHour,
        rule.startMinute,
        hostTz
      );
      const ruleEndUtc = createInstantFromZoned(
        hostYear,
        hostMonth,
        hostDay,
        rule.endHour,
        rule.endMinute,
        hostTz
      );

      let currentSlotStart = new Date(ruleStartUtc.getTime());

      while (true) {
        const currentSlotEnd = new Date(currentSlotStart.getTime() + durationMinutes * 60000);

        // Slot must fit completely inside working hours
        if (currentSlotEnd.getTime() > ruleEndUtc.getTime()) {
          break;
        }

        // 1. Must be in the future / respect notice window
        if (currentSlotStart.getTime() >= earliestAllowedStart.getTime()) {
          // 2. Check if the slot start falls on the requested calendar day in the invitee's timezone
          const slotDateInInvitee = formatDateString(currentSlotStart, invTz);

          if (slotDateInInvitee === targetDate) {
            // 3. Check for conflict with existing confirmed bookings (and buffers)
            const hasConflict = isSlotConflicting(
              currentSlotStart,
              currentSlotEnd,
              existingBookings,
              bufferBeforeMinutes,
              bufferAfterMinutes
            );

            if (!hasConflict) {
              const endDateInInvitee = formatDateString(currentSlotEnd, invTz);
              availableSlots.push({
                utcStartTime: currentSlotStart.toISOString(),
                utcEndTime: currentSlotEnd.toISOString(),
                localDate: slotDateInInvitee,
                localStartTime: formatTime12Hour(currentSlotStart, invTz),
                localEndTime: formatTime12Hour(currentSlotEnd, invTz),
                crossesMidnight: slotDateInInvitee !== endDateInInvitee,
              });
            }
          }
        }

        // Step to the next candidate slot by durationMinutes
        currentSlotStart = currentSlotEnd;
      }
    }
  }

  // Sort slots chronologically
  availableSlots.sort((a, b) => new Date(a.utcStartTime).getTime() - new Date(b.utcStartTime).getTime());

  return availableSlots;
}
