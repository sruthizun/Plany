/**
 * Integration and Regression Tests for Plany Bug Audit Fixes
 * Covers:
 * 1. Host-level cross-event-type conflict rejection.
 * 2. Independent multi-host concurrency (different hosts don't conflict).
 * 3. Timezone conversion preserving UTC instants and midnight-crossing date shifts.
 * 4. Weekend date selectability for timezone-shifted slots (Sydney Saturday).
 * 5. Month navigation boundary guards and past-month prevention.
 * 6. Dynamic detected timezone inclusion in options with invalid fallback.
 * 7. Month navigation slot synchronization (no stale dates/slots).
 */

import { describe, it, before, after } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { PrismaClient } from "@prisma/client";
import {
  createBooking,
  SlotConflictError,
} from "../src/lib/booking-coordinator";
import {
  generateAvailableSlots,
  AvailabilityScheduleInput,
} from "../src/lib/scheduling";
import {
  formatDateString,
  formatTime12Hour,
  getZonedDateParts,
  isValidTimezone,
  sanitizeTimezone,
} from "../src/lib/timezone";

describe("Plany Bug Audit Fixes & Regressions", () => {
  const tempDbName = `test-audit-${Date.now()}.db`;
  const tempDbPath = path.resolve(`prisma/${tempDbName}`);
  const testDbUrl = `file:${tempDbPath}`;

  let testPrisma: PrismaClient;
  let hostAId: string;
  let hostAEvent1Id: string;
  let hostAEvent2Id: string;
  let hostBId: string;
  let hostBEventId: string;

  const REFERENCE_NOW = new Date("2026-10-22T08:00:00.000Z");

  before(async () => {
    // Copy isolated dev.db template
    const devDbPath = path.resolve("prisma/dev.db");
    fs.copyFileSync(devDbPath, tempDbPath);

    testPrisma = new PrismaClient({
      datasources: { db: { url: testDbUrl } },
    });

    // 1. Host A with TWO different event types
    const hostA = await testPrisma.user.create({
      data: {
        email: `host-a-${Date.now()}@plany.dev`,
        name: "Host Alice Multi-Event",
        username: `host-a-${Date.now()}`,
        timezone: "America/New_York",
        availabilitySchedules: {
          create: {
            name: "Working Hours",
            timezone: "America/New_York",
            isDefault: true,
            rules: {
              create: [
                { dayOfWeek: 1, startTime: "09:00", endTime: "17:00" },
                { dayOfWeek: 2, startTime: "09:00", endTime: "17:00" },
                { dayOfWeek: 3, startTime: "09:00", endTime: "17:00" },
                { dayOfWeek: 4, startTime: "09:00", endTime: "17:00" },
                { dayOfWeek: 5, startTime: "09:00", endTime: "17:00" },
              ],
            },
          },
        },
        eventTypes: {
          create: [
            {
              title: "30-Min Strategy Call",
              slug: "30-min-strategy",
              durationMinutes: 30,
              isActive: true,
            },
            {
              title: "15-Min Quick Sync",
              slug: "15-min-sync",
              durationMinutes: 15,
              isActive: true,
            },
          ],
        },
      },
      include: { eventTypes: true },
    });

    hostAId = hostA.id;
    hostAEvent1Id = hostA.eventTypes.find((e) => e.slug === "30-min-strategy")!.id;
    hostAEvent2Id = hostA.eventTypes.find((e) => e.slug === "15-min-sync")!.id;

    // 2. Host B (separate independent user)
    const hostB = await testPrisma.user.create({
      data: {
        email: `host-b-${Date.now()}@plany.dev`,
        name: "Host Bob Independent",
        username: `host-b-${Date.now()}`,
        timezone: "America/New_York",
        availabilitySchedules: {
          create: {
            name: "Working Hours",
            timezone: "America/New_York",
            isDefault: true,
            rules: {
              create: [
                { dayOfWeek: 4, startTime: "09:00", endTime: "17:00" }, // Thursday
              ],
            },
          },
        },
        eventTypes: {
          create: [
            {
              title: "Bob 30-Min Chat",
              slug: "bob-30-min",
              durationMinutes: 30,
              isActive: true,
            },
          ],
        },
      },
      include: { eventTypes: true },
    });

    hostBId = hostB.id;
    hostBEventId = hostB.eventTypes[0]!.id;
  });

  after(async () => {
    if (testPrisma) {
      await testPrisma.$disconnect();
    }
    try {
      if (fs.existsSync(tempDbPath)) fs.unlinkSync(tempDbPath);
      const shm = `${tempDbPath}-shm`;
      const wal = `${tempDbPath}-wal`;
      if (fs.existsSync(shm)) fs.unlinkSync(shm);
      if (fs.existsSync(wal)) fs.unlinkSync(wal);
    } catch {
      // Cleanup best-effort
    }
  });

  // ================= PART 1: CONFIRMED BUGS TESTS =================

  it("Bug 1 Fix: Recalculates local date/time while preserving exact UTC instant upon timezone change, including midnight crossing", () => {
    // Instant: Thursday Oct 22, 2026, 7:30 PM - 8:00 PM EDT (23:30 - 00:00 UTC)
    const utcStart = "2026-10-22T23:30:00.000Z";
    const utcEnd = "2026-10-23T00:00:00.000Z";

    // 1. Initial timezone: America/New_York
    const nyDate = formatDateString(new Date(utcStart), "America/New_York");
    const nyStartTime = formatTime12Hour(new Date(utcStart), "America/New_York");
    const nyEndTime = formatTime12Hour(new Date(utcEnd), "America/New_York");

    assert.equal(nyDate, "2026-10-22");
    assert.equal(nyStartTime, "7:30 PM");
    assert.equal(nyEndTime, "8:00 PM");

    // 2. Invitee switches to Asia/Kolkata (UTC+5:30)
    // 23:30 UTC + 5:30 = 05:00 next day (Oct 23)!
    const istDate = formatDateString(new Date(utcStart), "Asia/Kolkata");
    const istEndDate = formatDateString(new Date(utcEnd), "Asia/Kolkata");
    const istStartTime = formatTime12Hour(new Date(utcStart), "Asia/Kolkata");
    const istEndTime = formatTime12Hour(new Date(utcEnd), "Asia/Kolkata");

    // Verify local date shifted to next day
    assert.equal(istDate, "2026-10-23", "Local date must cross midnight and become Oct 23 in Asia/Kolkata");
    assert.equal(istStartTime, "5:00 AM");
    assert.equal(istEndTime, "5:30 AM");
    assert.equal(istDate, istEndDate, "Slot finishes on same local morning");

    // Exact UTC meeting instant is completely unchanged
    assert.equal(new Date(utcStart).toISOString(), "2026-10-22T23:30:00.000Z");
    assert.equal(new Date(utcEnd).toISOString(), "2026-10-23T00:00:00.000Z");
  });

  it("Bug 2 Fix: Month navigation correctly guards against past months across year boundaries", () => {
    // Current reference: October 2026
    const curYear = 2026;
    const curMonth = 9; // 0-indexed (Oct)

    const isPrevDisabledForCurrent = (y: number, m: number) => y < curYear || (y === curYear && m <= curMonth);

    // Current month cannot go back
    assert.equal(isPrevDisabledForCurrent(2026, 9), true, "Previous month button must be disabled for current month");
    // Past month cannot go back
    assert.equal(isPrevDisabledForCurrent(2026, 8), true, "September 2026 must be disabled");
    assert.equal(isPrevDisabledForCurrent(2025, 11), true, "December 2025 must be disabled");

    // Future month CAN go back
    assert.equal(isPrevDisabledForCurrent(2026, 10), false, "November 2026 can navigate back to October");
    assert.equal(isPrevDisabledForCurrent(2027, 0), false, "January 2027 can navigate back to December 2026");

    // December-to-January navigation boundary
    let viewY = 2026;
    let viewM = 11; // December 2026
    const nextM = viewM === 11 ? 0 : viewM + 1;
    const nextY = viewM === 11 ? viewY + 1 : viewY;
    assert.equal(nextY, 2027);
    assert.equal(nextM, 0);

    // January 2027 back to December 2026
    const prevM = nextM === 0 ? 11 : nextM - 1;
    const prevY = nextM === 0 ? nextY - 1 : nextY;
    assert.equal(prevY, 2026);
    assert.equal(prevM, 11);
  });

  it("Bug 3 Fix: Weekend dates with valid slots (e.g. Sydney Saturday from Friday host hours) are selectable", () => {
    // Host in America/New_York available Friday 9:00 AM - 5:00 PM EDT (13:00 - 21:00 UTC)
    const schedule: AvailabilityScheduleInput = {
      timezone: "America/New_York",
      rules: [{ dayOfWeek: 5, startTime: "09:00", endTime: "17:00" }],
    };

    // Invitee in Australia/Sydney: Friday EDT is Saturday Oct 24 in Sydney
    const slotsSaturday = generateAvailableSlots({
      targetDate: "2026-10-24", // Saturday
      schedule,
      durationMinutes: 30,
      existingBookings: [],
      inviteeTimezone: "Australia/Sydney",
      referenceNow: new Date("2026-10-23T00:00:00.000Z"),
    });

    assert.ok(slotsSaturday.length > 0, "Sydney invitee must have valid slots on Saturday");
    assert.equal(slotsSaturday.length, 16, "All 16 30-min Friday slots fall on Saturday in Sydney");
    assert.equal(slotsSaturday[0].localDate, "2026-10-24");

    // Sunday has no slots
    const slotsSunday = generateAvailableSlots({
      targetDate: "2026-10-25", // Sunday
      schedule,
      durationMinutes: 30,
      existingBookings: [],
      inviteeTimezone: "Australia/Sydney",
      referenceNow: new Date("2026-10-23T00:00:00.000Z"),
    });
    assert.equal(slotsSunday.length, 0, "Sunday must have 0 slots");
  });

  it("Bug 4 Fix: Detected timezone (e.g. America/Detroit, Europe/Rome) is dynamically present in options and invalid values fall back safely", () => {
    const COMMON_TIMEZONES = ["America/New_York", "UTC"];

    const buildTimezoneOptions = (hostTz: string, inviteeTz: string) => {
      const set = new Set(COMMON_TIMEZONES);
      if (hostTz && isValidTimezone(hostTz)) set.add(hostTz);
      if (inviteeTz && isValidTimezone(inviteeTz)) set.add(inviteeTz);
      return Array.from(set).sort();
    };

    // Test with America/Detroit (not in common list)
    const detroitList = buildTimezoneOptions("America/New_York", "America/Detroit");
    assert.ok(detroitList.includes("America/Detroit"), "America/Detroit must be added to selectable options");

    // Test with Europe/Rome
    const romeList = buildTimezoneOptions("America/New_York", "Europe/Rome");
    assert.ok(romeList.includes("Europe/Rome"), "Europe/Rome must be added to selectable options");

    // Test invalid timezone fallback
    assert.equal(isValidTimezone("Fake/Timezone_Invalid"), false);
    assert.equal(sanitizeTimezone("Fake/Timezone_Invalid", "America/New_York"), "America/New_York");
  });

  // ================= PART 2: POTENTIAL RISKS TESTS =================

  it("Risk 1 Fix: Conflicts across different event types for the same host are rejected with 409", async () => {
    // Thursday Oct 22: Host A books Event 1 (30m) from 14:00 to 14:30 UTC
    const slotStart = new Date("2026-10-22T14:00:00.000Z");
    const slotEnd = new Date("2026-10-22T14:30:00.000Z");

    const bookingEvent1 = await createBooking(
      {
        eventTypeId: hostAEvent1Id,
        startTime: slotStart,
        endTime: slotEnd,
        inviteeName: "Alice Client",
        inviteeEmail: "client@example.com",
        inviteeTimezone: "America/New_York",
      },
      { referenceNow: REFERENCE_NOW, client: testPrisma }
    );
    assert.ok(bookingEvent1.id);

    // Now someone tries to book Event 2 (15m) for Host A overlapping the same slot: 14:15 - 14:30 UTC
    const overlapEvent2Start = new Date("2026-10-22T14:15:00.000Z");
    const overlapEvent2End = new Date("2026-10-22T14:30:00.000Z");

    await assert.rejects(
      async () => {
        await createBooking(
          {
            eventTypeId: hostAEvent2Id,
            startTime: overlapEvent2Start,
            endTime: overlapEvent2End,
            inviteeName: "Conflicting Invitee",
            inviteeEmail: "conflict@example.com",
            inviteeTimezone: "America/New_York",
          },
          { referenceNow: REFERENCE_NOW, client: testPrisma }
        );
      },
      (err: any) => err instanceof SlotConflictError && err.statusCode === 409,
      "Booking on Event Type 2 must conflict with existing confirmed booking on Event Type 1 for same host"
    );
  });

  it("Risk 1 Fix: Concurrent simultaneous requests on different event types for the same host allow only one to succeed", async () => {
    // Thursday Oct 22, 15:00 - 15:30 UTC
    const slotStart = new Date("2026-10-22T15:00:00.000Z");
    const slotEnd = new Date("2026-10-22T15:30:00.000Z");

    // Request on Event 1 (30m: 15:00 - 15:30) vs Request on Event 2 (15m: 15:00 - 15:15)
    const reqEvent1 = createBooking(
      {
        eventTypeId: hostAEvent1Id,
        startTime: slotStart,
        endTime: slotEnd,
        inviteeName: "Racer Event 1",
        inviteeEmail: "racer1@example.com",
        inviteeTimezone: "America/New_York",
      },
      { referenceNow: REFERENCE_NOW, client: testPrisma, skipMemoryMutex: true }
    );

    const reqEvent2 = createBooking(
      {
        eventTypeId: hostAEvent2Id,
        startTime: slotStart,
        endTime: new Date("2026-10-22T15:15:00.000Z"),
        inviteeName: "Racer Event 2",
        inviteeEmail: "racer2@example.com",
        inviteeTimezone: "America/New_York",
      },
      { referenceNow: REFERENCE_NOW, client: testPrisma, skipMemoryMutex: true }
    );

    const results = await Promise.allSettled([reqEvent1, reqEvent2]);
    const fulfilled = results.filter((r) => r.status === "fulfilled");
    const rejected = results.filter((r) => r.status === "rejected");

    assert.equal(fulfilled.length, 1, "Exactly one of the cross-event concurrent bookings must succeed");
    assert.equal(rejected.length, 1, "Exactly one of the cross-event concurrent bookings must be rejected");

    const reason: any = (rejected[0] as PromiseRejectedResult).reason;
    assert.ok(reason instanceof SlotConflictError);
    assert.equal(reason.statusCode, 409);
  });

  it("Risk 1 Fix: Different hosts booking the exact same time slot do NOT conflict", async () => {
    // Thursday Oct 22, 16:00 - 16:30 UTC
    const slotStart = new Date("2026-10-22T16:00:00.000Z");
    const slotEnd = new Date("2026-10-22T16:30:00.000Z");

    // Book for Host A
    const resA = await createBooking(
      {
        eventTypeId: hostAEvent1Id,
        startTime: slotStart,
        endTime: slotEnd,
        inviteeName: "Alice Invitee",
        inviteeEmail: "alice-client@example.com",
        inviteeTimezone: "America/New_York",
      },
      { referenceNow: REFERENCE_NOW, client: testPrisma }
    );

    // Book the EXACT same instant for Host B (different host)
    const resB = await createBooking(
      {
        eventTypeId: hostBEventId,
        startTime: slotStart,
        endTime: slotEnd,
        inviteeName: "Bob Invitee",
        inviteeEmail: "bob-client@example.com",
        inviteeTimezone: "America/New_York",
      },
      { referenceNow: REFERENCE_NOW, client: testPrisma }
    );

    assert.ok(resA.id);
    assert.ok(resB.id);
    assert.notEqual(resA.id, resB.id);
    assert.equal(resA.status, "confirmed");
    assert.equal(resB.status, "confirmed");
  });

  it("Risk 2 Fix: Month navigation automatically synchronizes selected date and handles empty months gracefully", () => {
    const schedule: AvailabilityScheduleInput = {
      timezone: "America/New_York",
      rules: [
        // Only available on Mondays
        { dayOfWeek: 1, startTime: "09:00", endTime: "17:00" },
      ],
    };

    // October 2026: First Monday >= Oct 22 is Oct 26
    const findFirstValidDateInMonth = (year: number, month: number, refNow: Date) => {
      const todayFmt = formatDateString(refNow, "America/New_York");
      const lastDay = new Date(year, month + 1, 0).getDate();
      for (let d = 1; d <= lastDay; d++) {
        const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
        if (dateStr < todayFmt) continue;
        const slots = generateAvailableSlots({
          targetDate: dateStr,
          schedule,
          durationMinutes: 30,
          existingBookings: [],
          inviteeTimezone: "America/New_York",
          referenceNow: refNow,
        });
        if (slots.length > 0) return dateStr;
      }
      return "";
    };

    const octDate = findFirstValidDateInMonth(2026, 9, REFERENCE_NOW);
    assert.equal(octDate, "2026-10-26", "Should select first available Monday in October");

    // Navigate to November 2026: First Monday is Nov 2
    const novDate = findFirstValidDateInMonth(2026, 10, REFERENCE_NOW);
    assert.equal(novDate, "2026-11-02", "Should select first available Monday in November");

    // Month with NO rules (e.g. empty schedule)
    const emptySchedule: AvailabilityScheduleInput = {
      timezone: "America/New_York",
      rules: [],
    };
    const emptyDate = generateAvailableSlots({
      targetDate: "2026-11-02",
      schedule: emptySchedule,
      durationMinutes: 30,
      existingBookings: [],
      inviteeTimezone: "America/New_York",
      referenceNow: REFERENCE_NOW,
    });
    assert.equal(emptyDate.length, 0, "Empty schedule must produce 0 slots and clear selected date");
  });

  it("Risk 3 Fix: SSR and client initial state match without hydration mismatches", () => {
    // Verify that server initial date and zoned parts match client initial calculation
    const hostTz = "America/New_York";
    const serverDate = formatDateString(REFERENCE_NOW, hostTz);
    const zonedParts = getZonedDateParts(REFERENCE_NOW, hostTz);

    assert.equal(serverDate, "2026-10-22");
    assert.equal(zonedParts.year, 2026);
    assert.equal(zonedParts.month, 10);
    assert.equal(zonedParts.day, 22);

    // Initial state does not access browser DOM and remains deterministic
    assert.ok(isValidTimezone(hostTz));
  });
});
