/**
 * Unit Tests for Plany Scheduling Engine and Timezone Logic
 */

import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  createInstantFromZoned,
  formatDateString,
  formatTime12Hour,
  getTimezoneOffsetMinutes,
  getZonedDateParts,
  isValidTimezone,
  sanitizeTimezone,
} from "../src/lib/timezone";
import {
  generateAvailableSlots,
  intervalsOverlap,
  isSlotConflicting,
  AvailabilityScheduleInput,
} from "../src/lib/scheduling";

describe("Plany Scheduling & Timezone Unit Tests", () => {
  // Standard Mon-Fri 9:00 AM - 5:00 PM America/New_York schedule
  const standardSchedule: AvailabilityScheduleInput = {
    timezone: "America/New_York",
    rules: [
      { dayOfWeek: 1, startTime: "09:00", endTime: "17:00" }, // Mon
      { dayOfWeek: 2, startTime: "09:00", endTime: "17:00" }, // Tue
      { dayOfWeek: 3, startTime: "09:00", endTime: "17:00" }, // Wed
      { dayOfWeek: 4, startTime: "09:00", endTime: "17:00" }, // Thu
      { dayOfWeek: 5, startTime: "09:00", endTime: "17:00" }, // Fri
    ],
  };

  it("1. Generates exactly 16 30-minute slots on a weekday (9:00 AM to 5:00 PM)", () => {
    // Thursday, October 15, 2026
    const referenceNow = createInstantFromZoned(2026, 10, 15, 7, 0, "America/New_York"); // 7:00 AM

    const slots = generateAvailableSlots({
      targetDate: "2026-10-15",
      schedule: standardSchedule,
      durationMinutes: 30,
      existingBookings: [],
      inviteeTimezone: "America/New_York",
      referenceNow,
    });

    assert.equal(slots.length, 16, "Should generate exactly 16 30-minute slots for an 8-hour window");
    assert.equal(slots[0]?.localStartTime, "9:00 AM");
    assert.equal(slots[0]?.localEndTime, "9:30 AM");
    assert.equal(slots[15]?.localStartTime, "4:30 PM");
    assert.equal(slots[15]?.localEndTime, "5:00 PM");
  });

  it("2. Excludes slots that occurred in the past", () => {
    // Reference time is 11:15 AM on Thursday, Oct 15, 2026
    const referenceNow = createInstantFromZoned(2026, 10, 15, 11, 15, "America/New_York");

    const slots = generateAvailableSlots({
      targetDate: "2026-10-15",
      schedule: standardSchedule,
      durationMinutes: 30,
      existingBookings: [],
      inviteeTimezone: "America/New_York",
      referenceNow,
    });

    // 9:00, 9:30, 10:00, 10:30, 11:00 are in the past (5 slots excluded).
    // Remaining should be 16 - 5 = 11 slots.
    assert.equal(slots.length, 11, "Should exclude past 5 slots");
    assert.equal(slots[0]?.localStartTime, "11:30 AM", "First available slot after 11:15 AM must be 11:30 AM");
  });

  it("3. Excludes weekends when no availability is configured", () => {
    const referenceNow = createInstantFromZoned(2026, 10, 1, 0, 0, "America/New_York");

    // Saturday, October 17, 2026
    const saturdaySlots = generateAvailableSlots({
      targetDate: "2026-10-17",
      schedule: standardSchedule,
      durationMinutes: 30,
      existingBookings: [],
      inviteeTimezone: "America/New_York",
      referenceNow,
    });

    // Sunday, October 18, 2026
    const sundaySlots = generateAvailableSlots({
      targetDate: "2026-10-18",
      schedule: standardSchedule,
      durationMinutes: 30,
      existingBookings: [],
      inviteeTimezone: "America/New_York",
      referenceNow,
    });

    assert.equal(saturdaySlots.length, 0, "Saturday should have zero available slots");
    assert.equal(sundaySlots.length, 0, "Sunday should have zero available slots");
  });

  it("4. Removes slots that overlap confirmed bookings, while ignoring cancelled bookings", () => {
    const referenceNow = createInstantFromZoned(2026, 10, 15, 7, 0, "America/New_York");

    // Existing confirmed booking: 10:00 AM - 10:30 AM
    const confirmedBooking = {
      startTime: createInstantFromZoned(2026, 10, 15, 10, 0, "America/New_York"),
      endTime: createInstantFromZoned(2026, 10, 15, 10, 30, "America/New_York"),
      status: "confirmed",
    };

    // Existing cancelled booking: 2:00 PM - 2:30 PM (should NOT block slot)
    const cancelledBooking = {
      startTime: createInstantFromZoned(2026, 10, 15, 14, 0, "America/New_York"),
      endTime: createInstantFromZoned(2026, 10, 15, 14, 30, "America/New_York"),
      status: "cancelled",
    };

    const slots = generateAvailableSlots({
      targetDate: "2026-10-15",
      schedule: standardSchedule,
      durationMinutes: 30,
      existingBookings: [confirmedBooking, cancelledBooking],
      inviteeTimezone: "America/New_York",
      referenceNow,
    });

    assert.equal(slots.length, 15, "Should have 15 slots (16 minus 1 confirmed booking)");

    const hasTenAm = slots.some((s) => s.localStartTime === "10:00 AM");
    assert.equal(hasTenAm, false, "10:00 AM slot must be removed");

    const hasTwoPm = slots.some((s) => s.localStartTime === "2:00 PM");
    assert.equal(hasTwoPm, true, "2:00 PM slot must remain available because booking was cancelled");
  });

  it("5. Respects buffer times before and after meetings", () => {
    const referenceNow = createInstantFromZoned(2026, 10, 15, 7, 0, "America/New_York");

    // Existing confirmed booking from 11:00 AM to 11:30 AM
    const booking = {
      startTime: createInstantFromZoned(2026, 10, 15, 11, 0, "America/New_York"),
      endTime: createInstantFromZoned(2026, 10, 15, 11, 30, "America/New_York"),
      status: "confirmed",
    };

    // With 15 minutes buffer before and after:
    // - 10:30 AM to 11:00 AM candidate slot has 15m bufferAfter (11:00-11:15) which collides with 11:00-11:30 booking.
    // - 11:30 AM to 12:00 PM candidate slot has 15m bufferBefore (11:15-11:30) which collides with 11:00-11:30 booking.
    const slots = generateAvailableSlots({
      targetDate: "2026-10-15",
      schedule: standardSchedule,
      durationMinutes: 30,
      bufferBeforeMinutes: 15,
      bufferAfterMinutes: 15,
      existingBookings: [booking],
      inviteeTimezone: "America/New_York",
      referenceNow,
    });

    const has1030 = slots.some((s) => s.localStartTime === "10:30 AM");
    const has1100 = slots.some((s) => s.localStartTime === "11:00 AM");
    const has1130 = slots.some((s) => s.localStartTime === "11:30 AM");
    const has1200 = slots.some((s) => s.localStartTime === "12:00 PM");

    assert.equal(has1030, false, "10:30 AM slot must be removed due to after-buffer collision");
    assert.equal(has1100, false, "11:00 AM slot must be removed due to direct booking overlap");
    assert.equal(has1130, false, "11:30 AM slot must be removed due to before-buffer collision");
    assert.equal(has1200, true, "12:00 PM slot should be available");
  });

  it("6. Accurately converts slots between America/New_York and Asia/Kolkata", () => {
    // Oct 15, 2026: EDT is UTC-4. IST is UTC+5:30. Difference is +9.5 hours.
    // Host working hours: 09:00 EDT (13:00 UTC = 18:30 IST) to 17:00 EDT (21:00 UTC = 02:30 IST next day).
    const referenceNow = createInstantFromZoned(2026, 10, 15, 7, 0, "America/New_York");

    // Invitee requests slots for Oct 15 in Asia/Kolkata
    const slots = generateAvailableSlots({
      targetDate: "2026-10-15",
      schedule: standardSchedule,
      durationMinutes: 30,
      existingBookings: [],
      inviteeTimezone: "Asia/Kolkata",
      referenceNow,
    });

    // On Oct 15 in India, the available slots are from 6:30 PM to 11:30 PM (11 slots).
    // The slots after midnight (12:00 AM to 2:00 AM) fall on Oct 16 in India!
    assert.equal(slots.length, 11, "India should see 11 slots for the evening of Oct 15");
    assert.equal(slots[0]?.localStartTime, "6:30 PM", "First slot in India must be 6:30 PM (9:00 AM EDT)");
    assert.equal(slots[0]?.localDate, "2026-10-15");
    assert.equal(slots[10]?.localStartTime, "11:30 PM", "Last slot on Oct 15 in India must be 11:30 PM");

    // Verify that the spillover slots correctly appear on Oct 16 in Asia/Kolkata
    const nextDaySlots = generateAvailableSlots({
      targetDate: "2026-10-16",
      schedule: standardSchedule,
      durationMinutes: 30,
      existingBookings: [],
      inviteeTimezone: "Asia/Kolkata",
      referenceNow,
    });

    // Should include early morning slots (12:00 AM to 2:00 AM) plus Friday evening slots
    const earlyMorningSlot = nextDaySlots.find((s) => s.localStartTime === "12:00 AM");
    assert.ok(earlyMorningSlot, "12:00 AM slot must be present on Oct 16 in India");
  });

  it("7. Handles daylight-saving transitions and invalid timezones safely", () => {
    // 7.1 Invalid timezone handling
    assert.equal(isValidTimezone("Mars/Olympus_Mons"), false);
    assert.equal(isValidTimezone(""), false);
    assert.equal(isValidTimezone("America/New_York"), true);
    assert.equal(isValidTimezone("UTC"), true);
    assert.equal(sanitizeTimezone("Invalid/Tz", "UTC"), "UTC");

    // 7.2 Daylight Saving Time transition in New York
    // In 2026, US DST ends on Sunday, November 1, 2026.
    // October 15, 2026 is EDT (UTC-4).
    // November 5, 2026 is EST (UTC-5).
    const summerDate = createInstantFromZoned(2026, 10, 15, 9, 0, "America/New_York");
    const winterDate = createInstantFromZoned(2026, 11, 5, 9, 0, "America/New_York");

    const summerOffset = getTimezoneOffsetMinutes(summerDate, "America/New_York");
    const winterOffset = getTimezoneOffsetMinutes(winterDate, "America/New_York");

    assert.equal(summerOffset, -240, "EDT offset must be -240 minutes (-4 hours)");
    assert.equal(winterOffset, -300, "EST offset must be -300 minutes (-5 hours)");

    // 9:00 AM in Summer EDT should be 13:00 UTC
    assert.equal(summerDate.toISOString(), "2026-10-15T13:00:00.000Z");
    // 9:00 AM in Winter EST should be 14:00 UTC
    assert.equal(winterDate.toISOString(), "2026-11-05T14:00:00.000Z");
  });

  it("8. Correctly allows adjacent, non-overlapping bookings", () => {
    const booking1Start = createInstantFromZoned(2026, 10, 15, 10, 0, "America/New_York");
    const booking1End = createInstantFromZoned(2026, 10, 15, 10, 30, "America/New_York");

    const booking2Start = createInstantFromZoned(2026, 10, 15, 10, 30, "America/New_York");
    const booking2End = createInstantFromZoned(2026, 10, 15, 11, 0, "America/New_York");

    // Booking 1 and Booking 2 are adjacent
    assert.equal(
      intervalsOverlap(booking1Start, booking1End, booking2Start, booking2End),
      false,
      "Adjacent intervals must not overlap"
    );

    // Candidate slot from 09:30 AM to 10:00 AM directly abuts Booking 1
    const candidateBeforeStart = createInstantFromZoned(2026, 10, 15, 9, 30, "America/New_York");
    const candidateBeforeEnd = createInstantFromZoned(2026, 10, 15, 10, 0, "America/New_York");

    const hasConflictBefore = isSlotConflicting(
      candidateBeforeStart,
      candidateBeforeEnd,
      [{ startTime: booking1Start, endTime: booking1End, status: "confirmed" }],
      0,
      0
    );
    assert.equal(hasConflictBefore, false, "Candidate ending exactly when booking starts must not conflict");

    // Candidate slot from 10:30 AM to 11:00 AM directly abuts Booking 1 end
    const hasConflictAfter = isSlotConflicting(
      booking2Start,
      booking2End,
      [{ startTime: booking1Start, endTime: booking1End, status: "confirmed" }],
      0,
      0
    );
    assert.equal(hasConflictAfter, false, "Candidate starting exactly when booking ends must not conflict");
  });

  it("9. Integration: Generates slots using real seeded host data from SQLite", async () => {
    const { prisma } = await import("../src/lib/db");

    const host = await prisma.user.findUnique({
      where: { username: "alex" },
      include: {
        availabilitySchedules: {
          where: { isDefault: true },
          include: { rules: true },
        },
        eventTypes: {
          where: { slug: "30-min-chat" },
        },
      },
    });

    assert.ok(host, "Seeded host 'alex' must exist in SQLite");
    const schedule = host.availabilitySchedules[0];
    const eventType = host.eventTypes[0];

    assert.ok(schedule, "Host default schedule must exist");
    assert.ok(eventType, "Host event type '30-min-chat' must exist");

    const referenceNow = createInstantFromZoned(2026, 10, 15, 7, 0, schedule.timezone);

    const slots = generateAvailableSlots({
      targetDate: "2026-10-15",
      schedule,
      durationMinutes: eventType.durationMinutes,
      bufferBeforeMinutes: eventType.bufferBeforeMinutes,
      bufferAfterMinutes: eventType.bufferAfterMinutes,
      existingBookings: [],
      inviteeTimezone: "America/New_York",
      referenceNow,
    });

    assert.equal(slots.length, 16, "Should generate exactly 16 slots from seeded DB records");
    assert.equal(slots[0]?.localStartTime, "9:00 AM");
    assert.equal(slots[15]?.localStartTime, "4:30 PM");

    await prisma.$disconnect();
  });

  it("10. Conflict Logic: Detects exact match and all overlap variations for simultaneous attempts", () => {
    // Host has confirmed booking A from 14:00 to 14:30 UTC
    const bookingA = {
      startTime: new Date("2026-10-15T14:00:00.000Z"),
      endTime: new Date("2026-10-15T14:30:00.000Z"),
      status: "confirmed",
    };
    const bookings = [bookingA];

    // Attempt 1: Exact same slot
    const exactAttempt = isSlotConflicting(
      new Date("2026-10-15T14:00:00.000Z"),
      new Date("2026-10-15T14:30:00.000Z"),
      bookings
    );
    assert.equal(exactAttempt, true, "Exact same slot must conflict");

    // Attempt 2: Partial overlap from front (13:45 - 14:15)
    const frontOverlap = isSlotConflicting(
      new Date("2026-10-15T13:45:00.000Z"),
      new Date("2026-10-15T14:15:00.000Z"),
      bookings
    );
    assert.equal(frontOverlap, true, "Front partial overlap must conflict");

    // Attempt 3: Partial overlap from back (14:15 - 14:45)
    const backOverlap = isSlotConflicting(
      new Date("2026-10-15T14:15:00.000Z"),
      new Date("2026-10-15T14:45:00.000Z"),
      bookings
    );
    assert.equal(backOverlap, true, "Back partial overlap must conflict");

    // Attempt 4: Enclosing slot (13:30 - 15:00)
    const enclosing = isSlotConflicting(
      new Date("2026-10-15T13:30:00.000Z"),
      new Date("2026-10-15T15:00:00.000Z"),
      bookings
    );
    assert.equal(enclosing, true, "Enclosing slot must conflict");

    // Attempt 5: Enclosed slot (14:05 - 14:25)
    const enclosed = isSlotConflicting(
      new Date("2026-10-15T14:05:00.000Z"),
      new Date("2026-10-15T14:25:00.000Z"),
      bookings
    );
    assert.equal(enclosed, true, "Enclosed slot must conflict");
  });

  it("11. Respects buffer times attached directly to existing bookings", () => {
    // Existing confirmed booking from 10:00 to 10:30 with 15m after-buffer (occupied until 10:45)
    const existingWithBuffer = {
      startTime: createInstantFromZoned(2026, 10, 15, 10, 0, "America/New_York"),
      endTime: createInstantFromZoned(2026, 10, 15, 10, 30, "America/New_York"),
      bufferAfterMinutes: 15,
      status: "confirmed",
    };

    // Candidate slot from 10:30 to 11:00 (zero candidate buffer)
    const candidate1030 = createInstantFromZoned(2026, 10, 15, 10, 30, "America/New_York");
    const candidate1100 = createInstantFromZoned(2026, 10, 15, 11, 0, "America/New_York");

    const conflicts1030 = isSlotConflicting(
      candidate1030,
      candidate1100,
      [existingWithBuffer],
      0,
      0
    );
    assert.equal(conflicts1030, true, "10:30-11:00 slot must conflict with existing booking's 15m after-buffer");

    // Candidate slot from 10:45 to 11:15 (starts right after the 15m buffer ends)
    const candidate1045 = createInstantFromZoned(2026, 10, 15, 10, 45, "America/New_York");
    const candidate1115 = createInstantFromZoned(2026, 10, 15, 11, 15, "America/New_York");

    const conflicts1045 = isSlotConflicting(
      candidate1045,
      candidate1115,
      [existingWithBuffer],
      0,
      0
    );
    assert.equal(conflicts1045, false, "10:45-11:15 slot must be allowed after existing booking buffer ends");
  });

  it("12. Resolves ambiguous and nonexistent DST local times deterministically", () => {
    // Nonexistent time: Spring forward in New York on March 8, 2026.
    // 2:00 AM jumps to 3:00 AM. 2:30 AM does not exist on the local clock.
    const gapInstant = createInstantFromZoned(2026, 3, 8, 2, 30, "America/New_York");
    assert.ok(gapInstant instanceof Date && !isNaN(gapInstant.getTime()), "Gap time must resolve to a valid Date object");
    // Should resolve safely to 07:30 UTC (3:30 AM EDT) without infinite loop or NaN
    assert.equal(gapInstant.toISOString(), "2026-03-08T07:30:00.000Z");

    // Ambiguous time: Fall back in New York on November 1, 2026.
    // 2:00 AM jumps back to 1:00 AM. 1:30 AM occurs twice.
    const overlapInstant = createInstantFromZoned(2026, 11, 1, 1, 30, "America/New_York");
    assert.ok(overlapInstant instanceof Date && !isNaN(overlapInstant.getTime()), "Ambiguous time must resolve to a valid Date object");
    // First occurrence is 1:30 AM EDT = 05:30 UTC
    assert.equal(overlapInstant.toISOString(), "2026-11-01T05:30:00.000Z");
  });

  it("13. Flags slots that cross midnight in the invitee's timezone", () => {
    // Host schedule from 18:00 to 22:00 UTC on Thursday, Oct 15, 2026
    const eveningUtcSchedule: AvailabilityScheduleInput = {
      timezone: "UTC",
      rules: [
        { dayOfWeek: 4, startTime: "18:00", endTime: "22:00" }, // Thu 18:00-22:00 UTC
      ],
    };

    // Invitee in Asia/Kolkata (+05:30).
    // 18:00 UTC = 23:30 IST on Oct 15.
    // With 45-minute duration, 23:30 IST ends at 00:15 IST on Oct 16!
    const referenceNow = new Date("2026-10-15T00:00:00.000Z");

    const slots = generateAvailableSlots({
      targetDate: "2026-10-15",
      schedule: eveningUtcSchedule,
      durationMinutes: 45,
      existingBookings: [],
      inviteeTimezone: "Asia/Kolkata",
      referenceNow,
    });

    assert.ok(slots.length > 0, "Should generate evening slots in India");
    const midnightCrossingSlot = slots[0];
    assert.equal(midnightCrossingSlot?.localDate, "2026-10-15");
    assert.equal(midnightCrossingSlot?.localStartTime, "11:30 PM");
    assert.equal(midnightCrossingSlot?.localEndTime, "12:15 AM");
    assert.equal(midnightCrossingSlot?.crossesMidnight, true, "Slot must be flagged as crossesMidnight: true");
  });

  it("14. Gracefully handles invalid, inverted, or missing availability rules without crashing", () => {
    const referenceNow = createInstantFromZoned(2026, 10, 15, 7, 0, "America/New_York");

    // Schedule containing malformed rules alongside one valid rule (09:00 - 10:00)
    const corruptedSchedule: AvailabilityScheduleInput = {
      timezone: "America/New_York",
      rules: [
        { dayOfWeek: 4, startTime: "17:00", endTime: "09:00" }, // Inverted: endTime < startTime
        { dayOfWeek: 4, startTime: "12:00", endTime: "12:00" }, // Zero length: endTime == startTime
        { dayOfWeek: 4, startTime: "invalid", endTime: "15:00" }, // Malformed time
        { dayOfWeek: 99, startTime: "09:00", endTime: "17:00" }, // Invalid day of week
        { dayOfWeek: 4, startTime: "09:00", endTime: "10:00" }, // Valid rule (2 30-min slots)
      ],
    };

    const slots = generateAvailableSlots({
      targetDate: "2026-10-15",
      schedule: corruptedSchedule,
      durationMinutes: 30,
      existingBookings: [],
      inviteeTimezone: "America/New_York",
      referenceNow,
    });

    // Only the valid rule (9:00-10:00) should produce slots: 9:00 AM and 9:30 AM
    assert.equal(slots.length, 2, "Corrupt rules must be skipped; only valid 9:00-10:00 rule should produce 2 slots");
    assert.equal(slots[0]?.localStartTime, "9:00 AM");
    assert.equal(slots[1]?.localStartTime, "9:30 AM");

    // Empty rules schedule
    const emptySlots = generateAvailableSlots({
      targetDate: "2026-10-15",
      schedule: { timezone: "America/New_York", rules: [] },
      durationMinutes: 30,
      existingBookings: [],
      inviteeTimezone: "America/New_York",
      referenceNow,
    });
    assert.equal(emptySlots.length, 0, "Empty rules should safely return 0 slots");
  });

  it("15. Strictly validates targetDate format and durationMinutes", () => {
    assert.throws(
      () =>
        generateAvailableSlots({
          targetDate: "invalid-date",
          schedule: standardSchedule,
          durationMinutes: 30,
          existingBookings: [],
          inviteeTimezone: "America/New_York",
        }),
      /Invalid targetDate format/
    );

    assert.throws(
      () =>
        generateAvailableSlots({
          targetDate: "2026-10-15",
          schedule: standardSchedule,
          durationMinutes: 0,
          existingBookings: [],
          inviteeTimezone: "America/New_York",
        }),
      /Invalid durationMinutes/
    );
  });
});

