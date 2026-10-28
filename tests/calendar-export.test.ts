/**
 * Tests for Step 8: Booking Confirmation & Calendar Export (.ics)
 * Verifies RFC 5545 compliance, character escaping, CRLF line endings,
 * line folding, duration calculation, and timezone preservation.
 */

import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  generateIcsContent,
  generateIcsFilename,
  escapeIcsText,
  foldIcsLine,
  formatIcsUtcDate,
  generateCleanUid,
} from "../src/lib/ics";
import { formatTime12Hour, formatDateString } from "../src/lib/timezone";

describe("Step 8: Booking Confirmation & Calendar Export (.ics)", () => {
  const TEST_NOW = new Date("2026-10-19T08:00:00.000Z");
  const START_INSTANT = new Date("2026-10-19T14:00:00.000Z"); // 10:00 AM EDT / 7:30 PM IST
  const END_INSTANT = new Date("2026-10-19T14:30:00.000Z");   // 10:30 AM EDT / 8:00 PM IST

  const unfoldIcs = (raw: string) => raw.replace(/\r\n[ \t]/g, "");

  it("1. Generates RFC 5545-compliant VCALENDAR and VEVENT structure with CRLF endings", () => {
    const ics = generateIcsContent({
      title: "30-Minute Meeting",
      description: "Quick chat to align on roadmap.",
      startTime: START_INSTANT,
      endTime: END_INSTANT,
      hostName: "Alex Morgan",
      hostEmail: "alex@plany.dev",
      inviteeName: "Sarah Connor",
      inviteeEmail: "sarah@example.com",
      inviteeTimezone: "America/New_York",
      now: TEST_NOW,
    });

    // Must end with CRLF
    assert.ok(ics.endsWith("\r\n"), "ICS content must end with CRLF");
    assert.ok(!ics.includes("\r\r"), "ICS content must not have double CRs");

    // Must contain required VCALENDAR headers
    assert.ok(ics.includes("BEGIN:VCALENDAR\r\n"), "Must contain BEGIN:VCALENDAR");
    assert.ok(ics.includes("VERSION:2.0\r\n"), "Must contain VERSION:2.0");
    assert.ok(ics.includes("PRODID:-//Plany//Plany Scheduling Calendar//EN\r\n"), "Must contain PRODID");
    assert.ok(ics.includes("CALSCALE:GREGORIAN\r\n"), "Must contain CALSCALE:GREGORIAN");
    assert.ok(ics.includes("METHOD:REQUEST\r\n"), "Must contain METHOD:REQUEST");

    // Must contain required VEVENT properties
    assert.ok(ics.includes("BEGIN:VEVENT\r\n"), "Must contain BEGIN:VEVENT");
    assert.ok(ics.includes("DTSTAMP:20261019T080000Z\r\n"), "Must contain formatted DTSTAMP in UTC");
    assert.ok(ics.includes("DTSTART:20261019T140000Z\r\n"), "Must contain formatted DTSTART in UTC");
    assert.ok(ics.includes("DTEND:20261019T143000Z\r\n"), "Must contain formatted DTEND in UTC");
    assert.ok(ics.includes("SUMMARY:30-Minute Meeting\r\n"), "Must contain SUMMARY");
    assert.ok(ics.includes("STATUS:CONFIRMED\r\n"), "Must contain STATUS:CONFIRMED");

    // Unfolded content checks for long folded lines (e.g. ORGANIZER and ATTENDEE)
    const unfolded = unfoldIcs(ics);
    assert.ok(unfolded.includes("ORGANIZER;CN=Alex Morgan:mailto:alex@plany.dev\r\n"), "Must contain ORGANIZER");
    assert.ok(
      unfolded.includes("ATTENDEE;CUTYPE=INDIVIDUAL;ROLE=REQ-PARTICIPANT;PARTSTAT=ACCEPTED;CN=Sarah Connor:mailto:sarah@example.com\r\n"),
      "Must contain ATTENDEE"
    );
    assert.ok(ics.includes("END:VEVENT\r\n"), "Must contain END:VEVENT");
    assert.ok(ics.includes("END:VCALENDAR\r\n"), "Must contain END:VCALENDAR");
  });

  it("2. Accurately preserves duration across meeting start and end times", () => {
    const start = new Date("2026-10-20T18:00:00.000Z");
    const end = new Date("2026-10-20T18:45:00.000Z"); // 45-min meeting

    const ics = generateIcsContent({
      title: "45-Minute Review",
      startTime: start,
      endTime: end,
      hostName: "Alex",
      inviteeName: "Jordan",
      inviteeEmail: "jordan@example.com",
    });

    assert.ok(ics.includes("DTSTART:20261020T180000Z\r\n"));
    assert.ok(ics.includes("DTEND:20261020T184500Z\r\n"));

    const dtStartMatch = ics.match(/DTSTART:(\d{8}T\d{6}Z)/);
    const dtEndMatch = ics.match(/DTEND:(\d{8}T\d{6}Z)/);

    assert.ok(dtStartMatch && dtEndMatch);

    const parsedStart = new Date(
      dtStartMatch[1].replace(/(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})Z/, "$1-$2-$3T$4:$5:$6Z")
    );
    const parsedEnd = new Date(
      dtEndMatch[1].replace(/(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})Z/, "$1-$2-$3T$4:$5:$6Z")
    );

    const diffMinutes = (parsedEnd.getTime() - parsedStart.getTime()) / 60000;
    assert.equal(diffMinutes, 45, "Calculated ICS duration must match 45 minutes exactly");
  });

  it("3. Escapes special characters (commas, semicolons, backslashes, newlines) per RFC 5545", () => {
    const rawText = "Project Planning, Part 1; Special & Fun \\ Architecture\nSecond line notes\r\nThird line";
    const escaped = escapeIcsText(rawText);

    assert.equal(
      escaped,
      "Project Planning\\, Part 1\\; Special & Fun \\\\ Architecture\\nSecond line notes\\nThird line"
    );

    // Test in full event generation
    const ics = generateIcsContent({
      title: "Strategy, Roadmap; & Q4 \\ Review",
      description: "Notes:\n- Point 1, item A;\n- Point 2 \\ detail",
      startTime: START_INSTANT,
      endTime: END_INSTANT,
      hostName: "Morgan, Alex; Dr.",
      inviteeName: "Smith, John; Jr.",
      inviteeEmail: "john@example.com",
    });

    const unfolded = unfoldIcs(ics);
    assert.ok(unfolded.includes("SUMMARY:Strategy\\, Roadmap\\; & Q4 \\\\ Review"));
    assert.ok(unfolded.includes("CN=Morgan\\, Alex\\; Dr."));
    assert.ok(unfolded.includes("CN=Smith\\, John\\; Jr."));
  });

  it("4. Correctly folds lines exceeding 75 octets per RFC 5545 Section 3.1", () => {
    const longSummary = "This is a very long event title that definitely exceeds the seventy-five octet limit prescribed by the RFC 5545 specification for calendar objects";
    const line = `SUMMARY:${longSummary}`;
    const folded = foldIcsLine(line);

    const lines = folded.split("\r\n");
    assert.ok(lines.length > 1, "Line must be folded into multiple lines");
    assert.ok(lines[0].length <= 75, "First line must not exceed 75 octets");
    for (let i = 1; i < lines.length; i++) {
      assert.ok(lines[i].startsWith(" "), "Continuation line must begin with space");
      assert.ok(lines[i].length <= 75, "Continuation line must not exceed 75 octets");
    }
  });

  it("5. Preserves exact meeting instant across host and invitee timezones", () => {
    // 14:00 UTC
    const utcStart = "2026-10-19T14:00:00.000Z";
    const utcEnd = "2026-10-19T14:30:00.000Z";

    // Host in America/New_York (EDT)
    const hostDate = formatDateString(new Date(utcStart), "America/New_York");
    const hostTime = formatTime12Hour(new Date(utcStart), "America/New_York");
    assert.equal(hostDate, "2026-10-19");
    assert.equal(hostTime, "10:00 AM");

    // Invitee in Asia/Kolkata (IST)
    const inviteeDate = formatDateString(new Date(utcStart), "Asia/Kolkata");
    const inviteeTime = formatTime12Hour(new Date(utcStart), "Asia/Kolkata");
    assert.equal(inviteeDate, "2026-10-19");
    assert.equal(inviteeTime, "7:30 PM");

    // The generated ICS uses UTC timestamp DTSTART:20261019T140000Z
    const ics = generateIcsContent({
      title: "Sync",
      startTime: utcStart,
      endTime: utcEnd,
      hostName: "Host",
      inviteeName: "Invitee",
      inviteeEmail: "invitee@example.com",
      inviteeTimezone: "Asia/Kolkata",
    });

    assert.ok(ics.includes("DTSTART:20261019T140000Z\r\n"));
    assert.ok(ics.includes("DTEND:20261019T143000Z\r\n"));
    const unfolded = unfoldIcs(ics);
    assert.ok(unfolded.includes("Timezone: Asia/Kolkata"));
  });

  it("6. Generates clean unique UIDs without leaking database primary keys or secrets", () => {
    const rawCuid = "cm4a7z3p0000108l4f4v1h3g9";
    const uid1 = generateCleanUid(rawCuid);
    const uid2 = generateCleanUid(rawCuid);

    assert.ok(uid1.startsWith("plany-"));
    assert.ok(uid1.endsWith("@plany.dev"));
    // Must be unique even with same seed
    assert.notEqual(uid1, uid2);
    // Must not directly expose raw database primary key
    assert.ok(!uid1.includes(rawCuid));
  });

  it("7. Generates safe, meaningful .ics filenames", () => {
    const fn1 = generateIcsFilename("30 Minute Meeting", "2026-10-19");
    assert.equal(fn1, "30-minute-meeting-2026-10-19.ics");

    const fn2 = generateIcsFilename("Product & Tech Sync: Q3/Q4!");
    assert.equal(fn2, "product-tech-sync-q3-q4.ics");

    const fn3 = generateIcsFilename("");
    assert.equal(fn3, "meeting.ics");
  });

  it("8. Rejects invalid date inputs with clear error", () => {
    assert.throws(
      () => formatIcsUtcDate("invalid-date-string"),
      /Invalid date provided/
    );
  });
});
