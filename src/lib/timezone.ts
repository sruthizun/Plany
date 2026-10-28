/**
 * Timezone utilities for Plany
 * Uses ECMAScript Intl API for reliable IANA timezone handling without external dependencies.
 */

/**
 * Validates whether a string is a valid IANA timezone identifier.
 */
export function isValidTimezone(tz: string): boolean {
  if (!tz || typeof tz !== "string" || tz.trim() === "") {
    return false;
  }
  try {
    Intl.DateTimeFormat(undefined, { timeZone: tz });
    return true;
  } catch {
    return false;
  }
}

/**
 * Sanitizes a timezone string, falling back to a default timezone if invalid.
 */
export function sanitizeTimezone(tz: string | undefined | null, defaultTz = "UTC"): string {
  if (tz && isValidTimezone(tz)) {
    return tz;
  }
  return defaultTz;
}

export interface ZonedDateParts {
  year: number;
  month: number; // 1-12
  day: number;   // 1-31
  hour: number;  // 0-23
  minute: number;// 0-59
  second: number;// 0-59
  dayOfWeek: number; // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
}

/**
 * Extracts date and time components of an instant in the specified timezone.
 */
export function getZonedDateParts(instant: Date, timeZone: string): ZonedDateParts {
  const safeTz = sanitizeTimezone(timeZone);
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: safeTz,
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    weekday: "short",
    hour12: false,
    hourCycle: "h23",
  });

  const parts = formatter.formatToParts(instant);
  let year = 0;
  let month = 0;
  let day = 0;
  let hour = 0;
  let minute = 0;
  let second = 0;
  let weekdayStr = "";

  for (const part of parts) {
    if (part.type === "year") year = parseInt(part.value, 10);
    else if (part.type === "month") month = parseInt(part.value, 10);
    else if (part.type === "day") day = parseInt(part.value, 10);
    else if (part.type === "hour") hour = parseInt(part.value, 10);
    else if (part.type === "minute") minute = parseInt(part.value, 10);
    else if (part.type === "second") second = parseInt(part.value, 10);
    else if (part.type === "weekday") weekdayStr = part.value;
  }

  const weekdayMap: Record<string, number> = {
    Sun: 0,
    Mon: 1,
    Tue: 2,
    Wed: 3,
    Thu: 4,
    Fri: 5,
    Sat: 6,
  };

  const dayOfWeek = weekdayMap[weekdayStr] ?? 0;

  return { year, month, day, hour, minute, second, dayOfWeek };
}

/**
 * Converts a zoned wall-clock date and time into an exact UTC Date instant.
 * Handles DST shifts (both ambiguous overlap times and nonexistent gap times)
 * deterministically.
 */
export function createInstantFromZoned(
  year: number,
  month: number, // 1-12
  day: number,   // 1-31
  hour: number,  // 0-23
  minute: number,// 0-59
  timeZone: string
): Date {
  const safeTz = sanitizeTimezone(timeZone);

  // Initial estimate assuming UTC
  const initialUtcTimestamp = Date.UTC(year, month - 1, day, hour, minute, 0, 0);
  let candidate = new Date(initialUtcTimestamp);
  let prevDiffMs: number | null = null;

  // Iteratively converge to the exact offset (settles in 1-2 steps for normal times)
  for (let i = 0; i < 4; i++) {
    const parts = getZonedDateParts(candidate, safeTz);
    const candidateAsLocalTimestamp = Date.UTC(
      parts.year,
      parts.month - 1,
      parts.day,
      parts.hour,
      parts.minute,
      parts.second,
      0
    );

    const diffMs = initialUtcTimestamp - candidateAsLocalTimestamp;
    if (diffMs === 0) {
      break;
    }

    // Detect oscillation caused by nonexistent local times (DST spring-forward gap)
    if (prevDiffMs !== null && Math.abs(diffMs) === Math.abs(prevDiffMs) && diffMs !== prevDiffMs) {
      // The wall-clock time does not exist in local timezone. Advance candidate to post-gap valid instant.
      candidate = new Date(candidate.getTime() + Math.abs(diffMs));
      break;
    }

    prevDiffMs = diffMs;
    candidate = new Date(candidate.getTime() + diffMs);
  }

  return candidate;
}

/**
 * Calculates the offset in minutes between UTC and the specified timezone for a given instant.
 * Positive for zones ahead of UTC (e.g. +330 for Asia/Kolkata), negative for zones behind (e.g. -240 for EDT).
 */
export function getTimezoneOffsetMinutes(instant: Date, timeZone: string): number {
  const parts = getZonedDateParts(instant, timeZone);
  const localAsUtc = Date.UTC(
    parts.year,
    parts.month - 1,
    parts.day,
    parts.hour,
    parts.minute,
    parts.second
  );
  return Math.round((localAsUtc - instant.getTime()) / 60000);
}

/**
 * Formats an instant in a target timezone as a 12-hour time string (e.g. "9:00 AM", "2:30 PM").
 */
export function formatTime12Hour(instant: Date, timeZone: string): string {
  const safeTz = sanitizeTimezone(timeZone);
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: safeTz,
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
  return formatter.format(instant);
}

/**
 * Formats an instant in a target timezone as an ISO date string "YYYY-MM-DD".
 */
export function formatDateString(instant: Date, timeZone: string): string {
  const parts = getZonedDateParts(instant, timeZone);
  const y = parts.year.toString().padStart(4, "0");
  const m = parts.month.toString().padStart(2, "0");
  const d = parts.day.toString().padStart(2, "0");
  return `${y}-${m}-${d}`;
}

/**
 * Parses a "HH:mm" 24-hour time string into hour and minute numbers.
 */
export function parseTimeString(timeStr: string): { hour: number; minute: number } {
  const [hStr, mStr] = timeStr.split(":");
  const hour = parseInt(hStr ?? "0", 10);
  const minute = parseInt(mStr ?? "0", 10);
  if (isNaN(hour) || isNaN(minute) || hour < 0 || hour > 23 || minute < 0 || minute > 59) {
    throw new Error(`Invalid time string "${timeStr}". Expected HH:mm in 24-hour format.`);
  }
  return { hour, minute };
}
