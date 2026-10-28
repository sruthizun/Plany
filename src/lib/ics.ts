/**
 * iCalendar (.ics) Generator for Plany
 * Complies with RFC 5545 specification for calendar data exchange.
 * Generates valid VCALENDAR and VEVENT structures with CRLF line endings,
 * text character escaping, and standard UTC timestamps.
 */

export interface IcsEventOptions {
  title: string;
  description?: string | null;
  startTime: Date | string;
  endTime: Date | string;
  hostName: string;
  hostEmail?: string | null;
  inviteeName: string;
  inviteeEmail: string;
  inviteeTimezone?: string | null;
  uid?: string;
  now?: Date;
}

/**
 * Formats a Date object into an iCalendar UTC timestamp string: YYYYMMDDTHHmmssZ
 */
export function formatIcsUtcDate(dateInput: Date | string): string {
  const date = typeof dateInput === "string" ? new Date(dateInput) : dateInput;
  if (isNaN(date.getTime())) {
    throw new Error(`Invalid date provided to formatIcsUtcDate: ${dateInput}`);
  }

  const y = date.getUTCFullYear().toString().padStart(4, "0");
  const m = (date.getUTCMonth() + 1).toString().padStart(2, "0");
  const d = date.getUTCDate().toString().padStart(2, "0");
  const h = date.getUTCHours().toString().padStart(2, "0");
  const min = date.getUTCMinutes().toString().padStart(2, "0");
  const s = date.getUTCSeconds().toString().padStart(2, "0");

  return `${y}${m}${d}T${h}${min}${s}Z`;
}

/**
 * Escapes special characters in text values per RFC 5545 Section 3.3.11:
 * Backslashes, semicolons, commas, and newlines must be escaped.
 */
export function escapeIcsText(text: string): string {
  if (!text) return "";
  return text
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,")
    .replace(/\r\n|\n|\r/g, "\\n");
}

/**
 * Folds iCalendar lines to not exceed 75 octets per RFC 5545 Section 3.1.
 */
export function foldIcsLine(line: string): string {
  const MAX_LEN = 75;
  if (line.length <= MAX_LEN) {
    return line;
  }

  const chunks: string[] = [];
  let remaining = line;

  // First chunk has full length
  chunks.push(remaining.substring(0, MAX_LEN));
  remaining = remaining.substring(MAX_LEN);

  // Subsequent continuation lines begin with a space, so content length is MAX_LEN - 1
  while (remaining.length > 0) {
    const chunkLength = MAX_LEN - 1;
    chunks.push(" " + remaining.substring(0, chunkLength));
    remaining = remaining.substring(chunkLength);
  }

  return chunks.join("\r\n");
}

/**
 * Generates an opaque, clean event UID without leaking internal database primary keys.
 */
export function generateCleanUid(seed?: string, now = new Date()): string {
  const timestamp = now.getTime();
  const randomPart = Math.random().toString(36).substring(2, 10);
  if (seed && typeof seed === "string") {
    // Generate a sanitized alphanumeric slug from seed
    const cleanSeed = seed.replace(/[^a-zA-Z0-9]/g, "").substring(0, 16);
    return `plany-${cleanSeed}-${timestamp}-${randomPart}@plany.dev`;
  }
  return `plany-${timestamp}-${randomPart}@plany.dev`;
}

/**
 * Builds a valid RFC 5545 .ics file content string.
 */
export function generateIcsContent(options: IcsEventOptions): string {
  const now = options.now ?? new Date();
  const dtStamp = formatIcsUtcDate(now);
  const dtStart = formatIcsUtcDate(options.startTime);
  const dtEnd = formatIcsUtcDate(options.endTime);

  const uid = options.uid ? generateCleanUid(options.uid, now) : generateCleanUid(undefined, now);

  const cleanSummary = escapeIcsText(options.title || "Meeting");

  // Build rich description
  let descText = options.description ? `${options.description.trim()}\n\n` : "";
  descText += `Host: ${options.hostName}\n`;
  descText += `Invitee: ${options.inviteeName} (${options.inviteeEmail})\n`;
  if (options.inviteeTimezone) {
    descText += `Timezone: ${options.inviteeTimezone}\n`;
  }
  descText += `Scheduled via Plany (https://plany.dev)`;

  const cleanDescription = escapeIcsText(descText);

  const organizerEmail = options.hostEmail?.trim() || "noreply@plany.dev";
  const organizerName = escapeIcsText(options.hostName || "Host");
  const inviteeEmail = options.inviteeEmail.trim();
  const inviteeName = escapeIcsText(options.inviteeName || "Invitee");

  // Construct standard VCALENDAR / VEVENT lines
  const lines: string[] = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Plany//Plany Scheduling Calendar//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:REQUEST",
    "BEGIN:VEVENT",
    `UID:${uid}`,
    `DTSTAMP:${dtStamp}`,
    `DTSTART:${dtStart}`,
    `DTEND:${dtEnd}`,
    `SUMMARY:${cleanSummary}`,
    `DESCRIPTION:${cleanDescription}`,
    `ORGANIZER;CN=${organizerName}:mailto:${organizerEmail}`,
    `ATTENDEE;CUTYPE=INDIVIDUAL;ROLE=REQ-PARTICIPANT;PARTSTAT=ACCEPTED;CN=${inviteeName}:mailto:${inviteeEmail}`,
    "STATUS:CONFIRMED",
    "TRANSP:OPAQUE",
    "END:VEVENT",
    "END:VCALENDAR",
  ];

  // Fold long lines and join with standard CRLF line endings
  return lines.map(foldIcsLine).join("\r\n") + "\r\n";
}

/**
 * Creates a clean filename for the downloadable .ics file.
 */
export function generateIcsFilename(eventTitle: string, dateStr?: string): string {
  const safeTitle = eventTitle
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  const safeDate = dateStr
    ? dateStr.replace(/[^a-zA-Z0-9]+/g, "-").replace(/(^-|-$)/g, "")
    : "";

  return safeDate ? `${safeTitle || "meeting"}-${safeDate}.ics` : `${safeTitle || "meeting"}.ics`;
}

/**
 * Triggers a client-side download of the generated .ics file.
 */
export function downloadIcsFile(filename: string, icsContent: string): void {
  if (typeof window === "undefined") return;

  const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", filename.endsWith(".ics") ? filename : `${filename}.ics`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
}
