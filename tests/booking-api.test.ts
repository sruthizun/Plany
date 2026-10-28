import { describe, it, before, after } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { spawn } from "node:child_process";
import { PrismaClient } from "@prisma/client";
import {
  createBooking,
  ValidationError,
  NotFoundError,
  SlotConflictError,
} from "../src/lib/booking-coordinator";
import { generateAvailableSlots } from "../src/lib/scheduling";

describe("Plany Booking API, Database-Level Write-Locking & Cross-Process Concurrency", () => {
  const tempDbName = `test-concurrency-${Date.now()}.db`;
  const tempDbPath = path.resolve(`prisma/${tempDbName}`);
  const testDbUrl = `file:${tempDbPath}`;

  let testPrisma: PrismaClient;
  let testUserId: string;
  let testEventTypeId: string;
  let testBufferEventTypeId: string;
  let scheduleId: string;

  // Reference test instant: Monday, Oct 19, 2026, 8:00 AM EDT (12:00 UTC)
  const REFERENCE_NOW = new Date("2026-10-19T12:00:00.000Z");

  // Valid future weekday slot: Monday Oct 19, 2026, 9:00 AM - 9:30 AM EDT (13:00 - 13:30 UTC)
  const VALID_SLOT_START = new Date("2026-10-19T13:00:00.000Z");
  const VALID_SLOT_END = new Date("2026-10-19T13:30:00.000Z");

  before(async () => {
    // 1. Create an isolated temporary SQLite database copy from dev.db template
    const devDbPath = path.resolve("prisma/dev.db");
    fs.copyFileSync(devDbPath, tempDbPath);

    testPrisma = new PrismaClient({
      datasources: { db: { url: testDbUrl } },
    });

    // 2. Set up isolated test host and event types in the temporary database
    const user = await testPrisma.user.create({
      data: {
        email: "isolated-api@plany.dev",
        name: "Isolated API Host",
        username: `isolated-host-${Date.now()}`,
        timezone: "America/New_York",
        availabilitySchedules: {
          create: {
            name: "Working Hours",
            timezone: "America/New_York",
            isDefault: true,
            rules: {
              create: [
                { dayOfWeek: 1, startTime: "09:00", endTime: "17:00" }, // Mon
                { dayOfWeek: 2, startTime: "09:00", endTime: "17:00" }, // Tue
                { dayOfWeek: 3, startTime: "09:00", endTime: "17:00" }, // Wed
                { dayOfWeek: 4, startTime: "09:00", endTime: "17:00" }, // Thu
                { dayOfWeek: 5, startTime: "09:00", endTime: "17:00" }, // Fri
              ],
            },
          },
        },
        eventTypes: {
          create: [
            {
              title: "30-Min Test Meeting",
              slug: "30-min-test",
              durationMinutes: 30,
              isActive: true,
            },
            {
              title: "30-Min Buffer Meeting",
              slug: "30-min-buffer-test",
              durationMinutes: 30,
              bufferBeforeMinutes: 15,
              bufferAfterMinutes: 15,
              isActive: true,
            },
          ],
        },
      },
      include: {
        eventTypes: true,
        availabilitySchedules: true,
      },
    });

    testUserId = user.id;
    testEventTypeId = user.eventTypes.find((e) => e.slug === "30-min-test")!.id;
    testBufferEventTypeId = user.eventTypes.find((e) => e.slug === "30-min-buffer-test")!.id;
    scheduleId = user.availabilitySchedules[0].id;
  });

  after(async () => {
    // Disconnect and remove the temporary SQLite database completely
    if (testPrisma) {
      await testPrisma.$disconnect();
    }
    try {
      if (fs.existsSync(tempDbPath)) {
        fs.unlinkSync(tempDbPath);
      }
      // Also remove SQLite journal files if present
      const walFile = `${tempDbPath}-wal`;
      const shmFile = `${tempDbPath}-shm`;
      const journalFile = `${tempDbPath}-journal`;
      if (fs.existsSync(walFile)) fs.unlinkSync(walFile);
      if (fs.existsSync(shmFile)) fs.unlinkSync(shmFile);
      if (fs.existsSync(journalFile)) fs.unlinkSync(journalFile);
    } catch {
      // Ignored
    }
  });

  it("1. Successfully saves a valid booking to SQLite with status 'confirmed'", async () => {
    const booking = await createBooking(
      {
        eventTypeId: testEventTypeId,
        startTime: VALID_SLOT_START,
        endTime: VALID_SLOT_END,
        inviteeName: "Alice Walker",
        inviteeEmail: "alice@example.com",
        inviteeTimezone: "America/New_York",
        inviteeNotes: "Discuss quarterly planning",
      },
      { referenceNow: REFERENCE_NOW, client: testPrisma }
    );

    assert.ok(booking.id, "Expected booking ID to be generated");
    assert.equal(booking.status, "confirmed");
    assert.equal(booking.inviteeName, "Alice Walker");
    assert.equal(booking.inviteeEmail, "alice@example.com");
    assert.equal(booking.startTime.toISOString(), VALID_SLOT_START.toISOString());
    assert.equal(booking.endTime.toISOString(), VALID_SLOT_END.toISOString());

    const row = await testPrisma.booking.findUnique({ where: { id: booking.id } });
    assert.ok(row, "Booking must exist in SQLite database");
    assert.equal(row.inviteeNotes, "Discuss quarterly planning");
  });

  it("2. Rejects invalid or empty invitee names with 400 ValidationError", async () => {
    await assert.rejects(
      async () => {
        await createBooking(
          {
            eventTypeId: testEventTypeId,
            startTime: new Date("2026-10-19T14:00:00.000Z"),
            endTime: new Date("2026-10-19T14:30:00.000Z"),
            inviteeName: "   ",
            inviteeEmail: "valid@example.com",
            inviteeTimezone: "America/New_York",
          },
          { referenceNow: REFERENCE_NOW, client: testPrisma }
        );
      },
      (err: any) => err instanceof ValidationError && err.message.includes("Your name is required")
    );
  });

  it("3. Rejects invalid email formats with 400 ValidationError", async () => {
    await assert.rejects(
      async () => {
        await createBooking(
          {
            eventTypeId: testEventTypeId,
            startTime: new Date("2026-10-19T14:00:00.000Z"),
            endTime: new Date("2026-10-19T14:30:00.000Z"),
            inviteeName: "Bob",
            inviteeEmail: "not-an-email",
            inviteeTimezone: "America/New_York",
          },
          { referenceNow: REFERENCE_NOW, client: testPrisma }
        );
      },
      (err: any) => err instanceof ValidationError && err.message.includes("valid email")
    );
  });

  it("4. Rejects non-existent or inactive event IDs with 404 NotFoundError", async () => {
    await assert.rejects(
      async () => {
        await createBooking(
          {
            eventTypeId: "non-existent-event-id",
            startTime: new Date("2026-10-19T14:00:00.000Z"),
            endTime: new Date("2026-10-19T14:30:00.000Z"),
            inviteeName: "Bob",
            inviteeEmail: "bob@example.com",
            inviteeTimezone: "America/New_York",
          },
          { referenceNow: REFERENCE_NOW, client: testPrisma }
        );
      },
      (err: any) => err instanceof NotFoundError && err.statusCode === 404
    );
  });

  it("5. Rejects inverted or invalid time ranges (endTime <= startTime) with 400 ValidationError", async () => {
    await assert.rejects(
      async () => {
        await createBooking(
          {
            eventTypeId: testEventTypeId,
            startTime: new Date("2026-10-19T14:30:00.000Z"),
            endTime: new Date("2026-10-19T14:00:00.000Z"),
            inviteeName: "Charlie",
            inviteeEmail: "charlie@example.com",
            inviteeTimezone: "America/New_York",
          },
          { referenceNow: REFERENCE_NOW, client: testPrisma }
        );
      },
      (err: any) => err instanceof ValidationError && err.message.includes("endTime must be after")
    );
  });

  it("6. Rejects duration mismatch with 400 ValidationError", async () => {
    await assert.rejects(
      async () => {
        await createBooking(
          {
            eventTypeId: testEventTypeId,
            startTime: new Date("2026-10-19T14:00:00.000Z"),
            endTime: new Date("2026-10-19T14:45:00.000Z"), // 45 mins instead of 30
            inviteeName: "Charlie",
            inviteeEmail: "charlie@example.com",
            inviteeTimezone: "America/New_York",
          },
          { referenceNow: REFERENCE_NOW, client: testPrisma }
        );
      },
      (err: any) => err instanceof ValidationError && err.message.includes("Requested slot duration")
    );
  });

  it("7. Rejects past slots with 400 ValidationError", async () => {
    const pastSlotStart = new Date("2026-10-19T11:00:00.000Z");
    const pastSlotEnd = new Date("2026-10-19T11:30:00.000Z");

    await assert.rejects(
      async () => {
        await createBooking(
          {
            eventTypeId: testEventTypeId,
            startTime: pastSlotStart,
            endTime: pastSlotEnd,
            inviteeName: "Dave",
            inviteeEmail: "dave@example.com",
            inviteeTimezone: "America/New_York",
          },
          { referenceNow: REFERENCE_NOW, client: testPrisma }
        );
      },
      (err: any) => err instanceof ValidationError && err.message.includes("past")
    );
  });

  it("8. Rejects slots on days when host has no availability (e.g. Saturday) with 400", async () => {
    const saturdaySlotStart = new Date("2026-10-24T14:00:00.000Z");
    const saturdaySlotEnd = new Date("2026-10-24T14:30:00.000Z");

    await assert.rejects(
      async () => {
        await createBooking(
          {
            eventTypeId: testEventTypeId,
            startTime: saturdaySlotStart,
            endTime: saturdaySlotEnd,
            inviteeName: "Eve",
            inviteeEmail: "eve@example.com",
            inviteeTimezone: "America/New_York",
          },
          { referenceNow: REFERENCE_NOW, client: testPrisma }
        );
      },
      (err: any) => err instanceof ValidationError && err.message.includes("no configured availability")
    );
  });

  it("9. Rejects slots outside host configured working hours with 400", async () => {
    const lateSlotStart = new Date("2026-10-19T22:00:00.000Z");
    const lateSlotEnd = new Date("2026-10-19T22:30:00.000Z");

    await assert.rejects(
      async () => {
        await createBooking(
          {
            eventTypeId: testEventTypeId,
            startTime: lateSlotStart,
            endTime: lateSlotEnd,
            inviteeName: "Frank",
            inviteeEmail: "frank@example.com",
            inviteeTimezone: "America/New_York",
          },
          { referenceNow: REFERENCE_NOW, client: testPrisma }
        );
      },
      (err: any) => err instanceof ValidationError && err.message.includes("outside the host's configured hours")
    );
  });

  it("10. Cancelled bookings do not block slots from being booked", async () => {
    const slotStart = new Date("2026-10-19T14:00:00.000Z");
    const slotEnd = new Date("2026-10-19T14:30:00.000Z");

    await testPrisma.booking.create({
      data: {
        eventTypeId: testEventTypeId,
        startTime: slotStart,
        endTime: slotEnd,
        inviteeName: "Cancelled Invitee",
        inviteeEmail: "cancelled@example.com",
        inviteeTimezone: "America/New_York",
        status: "cancelled",
      },
    });

    const booking = await createBooking(
      {
        eventTypeId: testEventTypeId,
        startTime: slotStart,
        endTime: slotEnd,
        inviteeName: "George",
        inviteeEmail: "george@example.com",
        inviteeTimezone: "America/New_York",
      },
      { referenceNow: REFERENCE_NOW, client: testPrisma }
    );

    assert.ok(booking.id);
    assert.equal(booking.status, "confirmed");
  });

  it("11. Confirmed overlapping bookings are rejected with 409 SlotConflictError", async () => {
    const slotStart = new Date("2026-10-19T15:00:00.000Z");
    const slotEnd = new Date("2026-10-19T15:30:00.000Z");

    const first = await createBooking(
      {
        eventTypeId: testEventTypeId,
        startTime: slotStart,
        endTime: slotEnd,
        inviteeName: "Harry",
        inviteeEmail: "harry@example.com",
        inviteeTimezone: "America/New_York",
      },
      { referenceNow: REFERENCE_NOW, client: testPrisma }
    );
    assert.ok(first.id);

    await assert.rejects(
      async () => {
        await createBooking(
          {
            eventTypeId: testEventTypeId,
            startTime: slotStart,
            endTime: slotEnd,
            inviteeName: "Imposter",
            inviteeEmail: "imposter@example.com",
            inviteeTimezone: "America/New_York",
          },
          { referenceNow: REFERENCE_NOW, client: testPrisma }
        );
      },
      (err: any) => err instanceof SlotConflictError && err.statusCode === 409
    );
  });

  it("12. Rejects slots that violate bufferBefore or bufferAfter constraints with 409", async () => {
    // Test on Wednesday Oct 21 in isolation
    const bookedStart = new Date("2026-10-21T14:00:00.000Z");
    const bookedEnd = new Date("2026-10-21T14:30:00.000Z");

    await createBooking(
      {
        eventTypeId: testBufferEventTypeId,
        startTime: bookedStart,
        endTime: bookedEnd,
        inviteeName: "Ian",
        inviteeEmail: "ian@example.com",
        inviteeTimezone: "America/New_York",
      },
      { referenceNow: REFERENCE_NOW, client: testPrisma }
    );

    const bufferConflictStart = new Date("2026-10-21T14:30:00.000Z");
    const bufferConflictEnd = new Date("2026-10-21T15:00:00.000Z");

    await assert.rejects(
      async () => {
        await createBooking(
          {
            eventTypeId: testBufferEventTypeId,
            startTime: bufferConflictStart,
            endTime: bufferConflictEnd,
            inviteeName: "Jack",
            inviteeEmail: "jack@example.com",
            inviteeTimezone: "America/New_York",
          },
          { referenceNow: REFERENCE_NOW, client: testPrisma }
        );
      },
      (err: any) => err instanceof SlotConflictError && err.statusCode === 409
    );
  });

  it("13. Pure Database-Level Locking (Without In-Memory Mutex): Two simultaneous requests for the exact same slot produce exactly one 201 and one 409", async () => {
    const raceSlotStart = new Date("2026-10-19T17:00:00.000Z");
    const raceSlotEnd = new Date("2026-10-19T17:30:00.000Z");

    // Explicitly set skipMemoryMutex: true to bypass the in-memory mutex completely
    const req1 = createBooking(
      {
        eventTypeId: testEventTypeId,
        startTime: raceSlotStart,
        endTime: raceSlotEnd,
        inviteeName: "DB Racer One",
        inviteeEmail: "dbracer1@example.com",
        inviteeTimezone: "America/New_York",
      },
      { referenceNow: REFERENCE_NOW, client: testPrisma, skipMemoryMutex: true }
    );

    const req2 = createBooking(
      {
        eventTypeId: testEventTypeId,
        startTime: raceSlotStart,
        endTime: raceSlotEnd,
        inviteeName: "DB Racer Two",
        inviteeEmail: "dbracer2@example.com",
        inviteeTimezone: "America/New_York",
      },
      { referenceNow: REFERENCE_NOW, client: testPrisma, skipMemoryMutex: true }
    );

    const results = await Promise.allSettled([req1, req2]);

    const fulfilled = results.filter((r) => r.status === "fulfilled");
    const rejected = results.filter((r) => r.status === "rejected");

    assert.equal(fulfilled.length, 1, "Exactly one concurrent booking request must succeed via database lock");
    assert.equal(rejected.length, 1, "Exactly one concurrent booking request must be rejected via database lock");

    const rejectedReason: any = (rejected[0] as PromiseRejectedResult).reason;
    assert.ok(
      rejectedReason instanceof SlotConflictError,
      "Rejected request must fail with SlotConflictError (HTTP 409)"
    );
    assert.equal(rejectedReason.statusCode, 409);

    const count = await testPrisma.booking.count({
      where: {
        eventTypeId: testEventTypeId,
        startTime: raceSlotStart,
        status: "confirmed",
      },
    });
    assert.equal(count, 1, "Database must contain exactly 1 confirmed booking row");
  });

  it("14. Concurrency: Two simultaneous requests for non-overlapping slots both succeed", async () => {
    const slotAStart = new Date("2026-10-19T18:00:00.000Z");
    const slotAEnd = new Date("2026-10-19T18:30:00.000Z");

    const slotBStart = new Date("2026-10-19T18:30:00.000Z");
    const slotBEnd = new Date("2026-10-19T19:00:00.000Z");

    const [resA, resB] = await Promise.all([
      createBooking(
        {
          eventTypeId: testEventTypeId,
          startTime: slotAStart,
          endTime: slotAEnd,
          inviteeName: "Slot A User",
          inviteeEmail: "userA@example.com",
          inviteeTimezone: "America/New_York",
        },
        { referenceNow: REFERENCE_NOW, client: testPrisma, skipMemoryMutex: true }
      ),
      createBooking(
        {
          eventTypeId: testEventTypeId,
          startTime: slotBStart,
          endTime: slotBEnd,
          inviteeName: "Slot B User",
          inviteeEmail: "userB@example.com",
          inviteeTimezone: "America/New_York",
        },
        { referenceNow: REFERENCE_NOW, client: testPrisma, skipMemoryMutex: true }
      ),
    ]);

    assert.ok(resA.id);
    assert.ok(resB.id);
    assert.equal(resA.status, "confirmed");
    assert.equal(resB.status, "confirmed");
  });

  it("15. Newly booked slots are excluded from the public booking page slot generator", async () => {
    const confirmedBookings = await testPrisma.booking.findMany({
      where: { eventType: { userId: testUserId }, status: "confirmed" },
      select: { startTime: true, endTime: true, status: true },
    });

    const hostSchedule = await testPrisma.availabilitySchedule.findUnique({
      where: { id: scheduleId },
      include: { rules: true },
    });

    const slots = generateAvailableSlots({
      targetDate: "2026-10-19",
      schedule: {
        timezone: hostSchedule!.timezone,
        rules: hostSchedule!.rules.map((r) => ({
          dayOfWeek: r.dayOfWeek,
          startTime: r.startTime,
          endTime: r.endTime,
        })),
      },
      durationMinutes: 30,
      existingBookings: confirmedBookings,
      inviteeTimezone: "America/New_York",
      referenceNow: REFERENCE_NOW,
    });

    // Total working hours 9:00 - 17:00 is 16 slots.
    // Booked slots on this day: 9:00, 10:00, 11:00, 1:00, 2:00, 2:30 -> 6 booked, 10 remaining.
    assert.equal(slots.length, 10, "Expected exactly 10 remaining available slots");
    const availableStartTimes = slots.map((s) => s.utcStartTime);
    assert.ok(!availableStartTimes.includes(VALID_SLOT_START.toISOString()));
  });

  it("16. Cross-Process Concurrency: Two separate Node.js OS processes sharing the SQLite file cannot double-book", async () => {
    // Slot: Monday Oct 19, 2026, 3:30 PM - 4:00 PM EDT (19:30 - 20:00 UTC)
    const crossProcessSlotStart = "2026-10-19T19:30:00.000Z";
    const crossProcessSlotEnd = "2026-10-19T20:00:00.000Z";

    const workerScript = path.resolve("tests/helpers/cross-process-worker.ts");

    function spawnWorker(name: string, email: string): Promise<{ stdout: string; exitCode: number }> {
      return new Promise((resolve, reject) => {
        const payloadBase64 = Buffer.from(
          JSON.stringify({
            dbUrl: testDbUrl,
            eventTypeId: testEventTypeId,
            startTime: crossProcessSlotStart,
            endTime: crossProcessSlotEnd,
            inviteeName: name,
            inviteeEmail: email,
            inviteeTimezone: "America/New_York",
            referenceNow: REFERENCE_NOW.toISOString(),
          })
        ).toString("base64");

        const tsxCli = path.resolve("node_modules/tsx/dist/cli.mjs");
        const proc = spawn(process.execPath, [tsxCli, workerScript, payloadBase64], {
          stdio: ["ignore", "pipe", "pipe"],
        });

        let stdout = "";
        let stderr = "";
        proc.stdout?.on("data", (chunk) => (stdout += chunk.toString()));
        proc.stderr?.on("data", (chunk) => (stderr += chunk.toString()));

        proc.on("close", (code) => {
          resolve({ stdout, exitCode: code ?? 0 });
        });
        proc.on("error", reject);
      });
    }

    // Launch both OS child processes concurrently
    const [proc1, proc2] = await Promise.all([
      spawnWorker("Child Process Alpha", "alpha@proc.dev"),
      spawnWorker("Child Process Beta", "beta@proc.dev"),
    ]);

    // Parse JSON outputs from workers
    const parseOutput = (raw: string) => {
      try {
        const lines = raw.trim().split("\n");
        const jsonLine = lines.reverse().find((l) => l.trim().startsWith("{"));
        return jsonLine ? JSON.parse(jsonLine) : { success: false, statusCode: 500, raw };
      } catch {
        return { success: false, statusCode: 500, raw };
      }
    };

    const res1 = parseOutput(proc1.stdout);
    const res2 = parseOutput(proc2.stdout);

    const outcomes = [res1, res2];
    const successes = outcomes.filter((o) => o.success === true && o.statusCode === 201);
    const conflicts = outcomes.filter((o) => o.success === false && o.statusCode === 409);

    assert.equal(successes.length, 1, "Exactly one independent OS process must succeed with 201 Created");
    assert.equal(conflicts.length, 1, "Exactly one independent OS process must receive 409 SlotConflictError");

    // Verify database row count in SQLite is strictly 1
    const count = await testPrisma.booking.count({
      where: {
        eventTypeId: testEventTypeId,
        startTime: new Date(crossProcessSlotStart),
        status: "confirmed",
      },
    });
    assert.equal(count, 1, "SQLite file must contain exactly 1 confirmed booking row across processes");
  });

  it("17. Two simultaneous overlapping requests with different start times cannot both succeed", async () => {
    // Tuesday, Oct 20, 2026:
    // Slot 1: 10:00 AM - 10:30 AM EDT (14:00 - 14:30 UTC)
    // Slot 2: 10:15 AM - 10:45 AM EDT (14:15 - 14:45 UTC) - Overlaps Slot 1 by 15 mins!
    const slot1Start = new Date("2026-10-20T14:00:00.000Z");
    const slot1End = new Date("2026-10-20T14:30:00.000Z");

    const slot2Start = new Date("2026-10-20T14:15:00.000Z");
    const slot2End = new Date("2026-10-20T14:45:00.000Z");

    const req1 = createBooking(
      {
        eventTypeId: testEventTypeId,
        startTime: slot1Start,
        endTime: slot1End,
        inviteeName: "Overlap Invitee One",
        inviteeEmail: "overlap1@example.com",
        inviteeTimezone: "America/New_York",
      },
      { referenceNow: REFERENCE_NOW, client: testPrisma, skipMemoryMutex: true }
    );

    const req2 = createBooking(
      {
        eventTypeId: testEventTypeId,
        startTime: slot2Start,
        endTime: slot2End,
        inviteeName: "Overlap Invitee Two",
        inviteeEmail: "overlap2@example.com",
        inviteeTimezone: "America/New_York",
      },
      { referenceNow: REFERENCE_NOW, client: testPrisma, skipMemoryMutex: true }
    );

    const results = await Promise.allSettled([req1, req2]);
    const fulfilled = results.filter((r) => r.status === "fulfilled");
    const rejected = results.filter((r) => r.status === "rejected");

    assert.equal(fulfilled.length, 1, "Exactly one overlapping request must succeed");
    assert.equal(rejected.length, 1, "Exactly one overlapping request must fail with conflict");

    const rejectedReason: any = (rejected[0] as PromiseRejectedResult).reason;
    assert.ok(
      rejectedReason instanceof SlotConflictError,
      "Overlapping request must be rejected with SlotConflictError (HTTP 409)"
    );
  });

  it("18. Buffer-time conflicts are prevented under concurrent requests", async () => {
    // testBufferEventTypeId has 15m bufferBefore and 15m bufferAfter
    // Tuesday, Oct 20, 2026:
    // Slot A: 11:00 AM - 11:30 AM EDT (15:00 - 15:30 UTC)
    // Slot B: 11:30 AM - 12:00 PM EDT (15:30 - 16:00 UTC) - Directly adjacent, but collides with 15m buffer!
    const slotAStart = new Date("2026-10-20T15:00:00.000Z");
    const slotAEnd = new Date("2026-10-20T15:30:00.000Z");

    const slotBStart = new Date("2026-10-20T15:30:00.000Z");
    const slotBEnd = new Date("2026-10-20T16:00:00.000Z");

    const reqA = createBooking(
      {
        eventTypeId: testBufferEventTypeId,
        startTime: slotAStart,
        endTime: slotAEnd,
        inviteeName: "Buffer Invitee A",
        inviteeEmail: "bufferA@example.com",
        inviteeTimezone: "America/New_York",
      },
      { referenceNow: REFERENCE_NOW, client: testPrisma, skipMemoryMutex: true }
    );

    const reqB = createBooking(
      {
        eventTypeId: testBufferEventTypeId,
        startTime: slotBStart,
        endTime: slotBEnd,
        inviteeName: "Buffer Invitee B",
        inviteeEmail: "bufferB@example.com",
        inviteeTimezone: "America/New_York",
      },
      { referenceNow: REFERENCE_NOW, client: testPrisma, skipMemoryMutex: true }
    );

    const results = await Promise.allSettled([reqA, reqB]);
    const fulfilled = results.filter((r) => r.status === "fulfilled");
    const rejected = results.filter((r) => r.status === "rejected");

    assert.equal(fulfilled.length, 1, "Exactly one buffer-conflicting request must succeed");
    assert.equal(rejected.length, 1, "Exactly one buffer-conflicting request must be rejected");

    const rejectedReason: any = (rejected[0] as PromiseRejectedResult).reason;
    assert.ok(
      rejectedReason instanceof SlotConflictError,
      "Buffer-conflicting request must fail with SlotConflictError (HTTP 409)"
    );
  });
});
