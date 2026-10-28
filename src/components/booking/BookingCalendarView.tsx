"use client";

import React, { useState, useMemo, useEffect } from "react";
import {
  generateAvailableSlots,
  AvailableSlot,
  AvailabilityScheduleInput,
  BookingInput,
} from "@/lib/scheduling";
import {
  formatDateString,
  formatTime12Hour,
  getZonedDateParts,
  isValidTimezone,
} from "@/lib/timezone";

import {
  generateIcsContent,
  generateIcsFilename,
  downloadIcsFile,
} from "@/lib/ics";

interface BookingCalendarViewProps {
  host: {
    name: string;
    username: string;
    email?: string | null;
    avatarUrl?: string | null;
  };
  eventType: {
    id: string;
    title: string;
    durationMinutes: number;
    description?: string | null;
    color?: string;
    bufferBeforeMinutes?: number;
    bufferAfterMinutes?: number;
  };
  schedule: AvailabilityScheduleInput;
  initialBookings?: Array<{
    startTime: string;
    endTime: string;
    status: string;
  }>;
}

// Major common IANA timezones for the selector dropdown
const COMMON_TIMEZONES = [
  "America/New_York",
  "America/Chicago",
  "America/Denver",
  "America/Los_Angeles",
  "Europe/London",
  "Europe/Paris",
  "Europe/Berlin",
  "Asia/Dubai",
  "Asia/Kolkata",
  "Asia/Singapore",
  "Asia/Tokyo",
  "Australia/Sydney",
  "UTC",
];

// Formats a YYYY-MM-DD date string as "D MMM YYYY" (e.g. "2026-11-05" -> "5 Nov 2026")
function formatDisplayDate(dateStr: string): string {
  if (!dateStr) return "";
  const [yearStr, monthStr, dayStr] = dateStr.split("-");
  const monthNum = parseInt(monthStr ?? "1", 10);
  const dayNum = parseInt(dayStr ?? "1", 10);
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const monthName = months[monthNum - 1] || monthStr;
  return `${dayNum} ${monthName} ${yearStr}`;
}

export function BookingCalendarView({
  host,
  eventType,
  schedule,
  initialBookings = [],
}: BookingCalendarViewProps) {
  // Invitee timezone detection (falls back to host timezone)
  const [inviteeTimezone, setInviteeTimezone] = useState<string>(schedule.timezone);

  // Dynamic list of selectable timezones ensuring host and detected browser timezone are present
  const timezoneOptions = useMemo(() => {
    const tzSet = new Set(COMMON_TIMEZONES);
    if (schedule.timezone && isValidTimezone(schedule.timezone)) {
      tzSet.add(schedule.timezone);
    }
    if (inviteeTimezone && isValidTimezone(inviteeTimezone)) {
      tzSet.add(inviteeTimezone);
    }
    return Array.from(tzSet).sort();
  }, [schedule.timezone, inviteeTimezone]);

  // Invitee timezone detection on client mount (safe against SSR mismatch)
  useEffect(() => {
    try {
      const detected = Intl.DateTimeFormat().resolvedOptions().timeZone;
      if (detected && isValidTimezone(detected)) {
        setInviteeTimezone(detected);
      }
    } catch {
      // Keep schedule.timezone fallback
    }
  }, [schedule.timezone]);

  // Current calendar month view (Year and Month 0-11 in invitee timezone)
  const today = useMemo(() => new Date(), []);
  const todayZonedParts = useMemo(
    () => getZonedDateParts(today, inviteeTimezone),
    [today, inviteeTimezone]
  );
  const currentYear = todayZonedParts.year;
  const currentMonth = todayZonedParts.month - 1; // 0 = Jan, 11 = Dec

  const [viewYear, setViewYear] = useState<number>(() => currentYear);
  const [viewMonth, setViewMonth] = useState<number>(() => currentMonth);

  // Selected date string (YYYY-MM-DD) in invitee's timezone
  const todayFormatted = useMemo(
    () => formatDateString(today, inviteeTimezone),
    [today, inviteeTimezone]
  );
  const [selectedDate, setSelectedDate] = useState<string>(todayFormatted);

  // Selected slot state (clicked slot and expanded "Next" state)
  const [selectedSlot, setSelectedSlot] = useState<AvailableSlot | null>(null);

  // View mode: 'select-slot' or 'booking-form'
  const [viewMode, setViewMode] = useState<"select-slot" | "booking-form">("select-slot");

  // Bookings list for real-time slot conflict exclusion
  const [bookings, setBookings] = useState<BookingInput[]>(() =>
    initialBookings.map((b) => ({
      startTime: new Date(b.startTime),
      endTime: new Date(b.endTime),
      status: b.status,
    }))
  );

  // Form input state
  const [inviteeName, setInviteeName] = useState("");
  const [inviteeEmail, setInviteeEmail] = useState("");
  const [inviteeNotes, setInviteeNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSlotConflict, setIsSlotConflict] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState<{
    id: string;
    startTime: string;
    endTime: string;
    inviteeName: string;
    inviteeEmail: string;
    inviteeTimezone: string;
    inviteeNotes?: string | null;
  } | null>(null);

  // Formatted confirmed booking details in invitee's selected timezone
  const confirmedDetails = useMemo(() => {
    if (!confirmedBooking) return null;
    const start = new Date(confirmedBooking.startTime);
    const end = new Date(confirmedBooking.endTime);
    const tz = confirmedBooking.inviteeTimezone || inviteeTimezone;
    const dateStr = formatDateString(start, tz);
    const [y, m, d] = dateStr.split("-").map(Number);
    const formattedDate = new Intl.DateTimeFormat("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    }).format(new Date(y, m - 1, d));

    const startTimeFormatted = formatTime12Hour(start, tz);
    const endTimeFormatted = formatTime12Hour(end, tz);

    return {
      formattedDate,
      dateStr,
      startTimeFormatted,
      endTimeFormatted,
      tz,
      start,
      end,
    };
  }, [confirmedBooking, inviteeTimezone]);

  // Downloadable .ics calendar invitation handler
  const handleDownloadCalendarInvite = () => {
    if (!confirmedBooking) return;
    const icsContent = generateIcsContent({
      title: eventType.title,
      description: eventType.description,
      startTime: confirmedBooking.startTime,
      endTime: confirmedBooking.endTime,
      hostName: host.name,
      hostEmail: host.email,
      inviteeName: confirmedBooking.inviteeName,
      inviteeEmail: confirmedBooking.inviteeEmail,
      inviteeTimezone: confirmedBooking.inviteeTimezone,
      uid: confirmedBooking.id,
    });

    const filename = generateIcsFilename(
      eventType.title,
      confirmedDetails?.dateStr
    );

    downloadIcsFile(filename, icsContent);
  };

  // Helper to re-format an existing selected slot in a given timezone preserving the exact UTC instant
  const formatSlotInTimezone = (
    utcStartTime: string,
    utcEndTime: string,
    targetTz: string
  ): AvailableSlot => {
    const start = new Date(utcStartTime);
    const end = new Date(utcEndTime);
    const localDate = formatDateString(start, targetTz);
    const endDate = formatDateString(end, targetTz);
    return {
      utcStartTime,
      utcEndTime,
      localDate,
      localStartTime: formatTime12Hour(start, targetTz),
      localEndTime: formatTime12Hour(end, targetTz),
      crossesMidnight: localDate !== endDate,
    };
  };

  // Timezone switch handler (Bug 1 fix)
  const handleTimezoneChange = (newTz: string) => {
    if (!newTz || !isValidTimezone(newTz)) return;
    setInviteeTimezone(newTz);

    if (selectedSlot) {
      const updatedSlot = formatSlotInTimezone(
        selectedSlot.utcStartTime,
        selectedSlot.utcEndTime,
        newTz
      );
      setSelectedSlot(updatedSlot);
      setSelectedDate(updatedSlot.localDate);

      const [slotY, slotM] = updatedSlot.localDate.split("-").map(Number);
      if (slotY && slotM) {
        setViewYear(slotY);
        setViewMonth(slotM - 1);
      }
    }
  };

  // Month navigation boundary check: Cannot navigate to months before current month (Bug 2 fix)
  const isPrevMonthDisabled =
    viewYear < currentYear || (viewYear === currentYear && viewMonth <= currentMonth);

  // Synchronize selected date when user navigates to another month (Risk 2 fix)
  const syncDateForTargetMonth = (targetYear: number, targetMonth: number) => {
    setSelectedSlot(null);
    const lastDay = new Date(targetYear, targetMonth + 1, 0).getDate();
    let firstAvailableDate: string | null = null;

    for (let d = 1; d <= lastDay; d++) {
      const dateStr = `${targetYear}-${String(targetMonth + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
      if (dateStr < todayFormatted) continue;

      try {
        const slots = generateAvailableSlots({
          targetDate: dateStr,
          schedule,
          durationMinutes: eventType.durationMinutes,
          bufferBeforeMinutes: eventType.bufferBeforeMinutes ?? 0,
          bufferAfterMinutes: eventType.bufferAfterMinutes ?? 0,
          existingBookings: bookings,
          inviteeTimezone,
          referenceNow: today,
        });
        if (slots.length > 0) {
          firstAvailableDate = dateStr;
          break;
        }
      } catch {
        // Continue searching
      }
    }

    // If target month has available dates, select the first valid date.
    // If target month has no available dates, clear selectedDate so we don't display a stale date from another month.
    setSelectedDate(firstAvailableDate ?? "");
  };

  const handlePrevMonth = () => {
    if (isPrevMonthDisabled) return;
    const newMonth = viewMonth === 0 ? 11 : viewMonth - 1;
    const newYear = viewMonth === 0 ? viewYear - 1 : viewYear;
    setViewMonth(newMonth);
    setViewYear(newYear);
    syncDateForTargetMonth(newYear, newMonth);
  };

  const handleNextMonth = () => {
    const newMonth = viewMonth === 11 ? 0 : viewMonth + 1;
    const newYear = viewMonth === 11 ? viewYear + 1 : viewYear;
    setViewMonth(newMonth);
    setViewYear(newYear);
    syncDateForTargetMonth(newYear, newMonth);
  };

  // Precompute selectable dates for the currently displayed month (Bug 3 fix: no hardcoded weekend exclusion)
  const selectableDatesMap = useMemo(() => {
    const map: Record<string, boolean> = {};
    const lastDayOfMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

    for (let d = 1; d <= lastDayOfMonth; d++) {
      const dateStr = `${viewYear}-${String(viewMonth + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
      if (dateStr < todayFormatted) {
        map[dateStr] = false;
        continue;
      }

      try {
        const slots = generateAvailableSlots({
          targetDate: dateStr,
          schedule,
          durationMinutes: eventType.durationMinutes,
          bufferBeforeMinutes: eventType.bufferBeforeMinutes ?? 0,
          bufferAfterMinutes: eventType.bufferAfterMinutes ?? 0,
          existingBookings: bookings,
          inviteeTimezone,
          referenceNow: today,
        });
        map[dateStr] = slots.length > 0;
      } catch {
        map[dateStr] = false;
      }
    }
    return map;
  }, [
    viewYear,
    viewMonth,
    todayFormatted,
    schedule,
    eventType.durationMinutes,
    eventType.bufferBeforeMinutes,
    eventType.bufferAfterMinutes,
    bookings,
    inviteeTimezone,
    today,
  ]);

  // Generate available slots for the selected date
  const availableSlots = useMemo(() => {
    if (!selectedDate) return [];
    try {
      return generateAvailableSlots({
        targetDate: selectedDate,
        schedule,
        durationMinutes: eventType.durationMinutes,
        bufferBeforeMinutes: eventType.bufferBeforeMinutes ?? 0,
        bufferAfterMinutes: eventType.bufferAfterMinutes ?? 0,
        existingBookings: bookings,
        inviteeTimezone,
        referenceNow: today,
      });
    } catch {
      return [];
    }
  }, [
    selectedDate,
    schedule,
    eventType.durationMinutes,
    eventType.bufferBeforeMinutes,
    eventType.bufferAfterMinutes,
    bookings,
    inviteeTimezone,
    today,
  ]);

  // Build calendar matrix (Days of month with blank prefix padding)
  const calendarDays = useMemo(() => {
    const firstDayOfMonth = new Date(viewYear, viewMonth, 1);
    const lastDayOfMonth = new Date(viewYear, viewMonth + 1, 0);
    const totalDays = lastDayOfMonth.getDate();

    // In Calendly, weeks start on Monday (0=Mon, 1=Tue, ..., 6=Sun)
    let startDayOfWeek = firstDayOfMonth.getDay() - 1;
    if (startDayOfWeek === -1) startDayOfWeek = 6;

    const days: Array<{
      dayNumber: number | null;
      dateString: string | null;
      isSelectable: boolean;
      isToday: boolean;
      isSelected: boolean;
    }> = [];

    // Prefix empty slots
    for (let i = 0; i < startDayOfWeek; i++) {
      days.push({
        dayNumber: null,
        dateString: null,
        isSelectable: false,
        isToday: false,
        isSelected: false,
      });
    }

    // Actual month days
    for (let d = 1; d <= totalDays; d++) {
      const dateStr = `${viewYear}-${String(viewMonth + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
      const isPast = dateStr < todayFormatted;
      const isSelectable = !isPast && Boolean(selectableDatesMap[dateStr]);

      days.push({
        dayNumber: d,
        dateString: dateStr,
        isSelectable,
        isToday: dateStr === todayFormatted,
        isSelected: dateStr === selectedDate,
      });
    }

    return days;
  }, [viewYear, viewMonth, selectedDate, todayFormatted, selectableDatesMap]);

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];

  // Format selected date nicely for header (e.g. "Thursday, October 15")
  const formattedSelectedDateHeader = useMemo(() => {
    if (!selectedDate) return "";
    const [y, m, d] = selectedDate.split("-").map(Number);
    if (!y || !m || !d) return selectedDate;
    const dateObj = new Date(y, m - 1, d);
    return new Intl.DateTimeFormat("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    }).format(dateObj);
  }, [selectedDate]);

  return (
    <div className="min-h-screen bg-[#fcfbf8] flex items-center justify-center py-6 px-3 sm:px-6 lg:py-12">
      {/* 
        Calendly Production Widget Shell:
        Desktop: 1000px max width, 16px radius, white surface, subtle steel-tinted shadow.
        Mobile (<=975px): Full width, vertically stacked, touch-friendly.
      */}
      <div className="w-full max-w-[1000px] min-h-[660px] bg-white rounded-2xl border border-[#d8dce0] shadow-[0_1px_3px_rgba(7,26,49,0.06),0_12px_24px_rgba(7,26,49,0.04)] overflow-hidden flex flex-col md:flex-row">
        
        {/* ================= LEFT COLUMN: HOST DETAILS & CALENDAR ================= */}
        <div className="w-full md:w-[60%] p-6 sm:p-8 border-b md:border-b-0 md:border-r border-[#d8dce0] flex flex-col justify-between">
          <div>
            {/* Host Profile Info */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-[#071a31] text-[#fcfbf8] font-bold text-lg flex items-center justify-center shrink-0">
                {host.name.charAt(0)}
              </div>
              <div>
                <p className="text-xs font-semibold text-[#5f6d77] uppercase tracking-wider">
                  {host.name}
                </p>
                <h1 className="text-xl sm:text-2xl font-bold text-[#071a31] tracking-tight">
                  {eventType.title}
                </h1>
              </div>
            </div>

            {/* Duration Badge & Details */}
            <div className="flex items-center gap-4 text-xs font-medium text-[#5f6d77] mb-6">
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-[#5f6d77]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {eventType.durationMinutes} min
              </span>
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-[#5f6d77]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                Web conferencing details provided upon confirmation
              </span>
            </div>

            {eventType.description && (
              <p className="text-xs text-[#5f6d77] leading-relaxed mb-6">
                {eventType.description}
              </p>
            )}

            {/* If in booking form mode, display selected slot summary on left column */}
            {viewMode === "booking-form" && selectedSlot ? (
              <div className="p-4 bg-[#f4f9ff] border border-[#c1defe] rounded-xl space-y-2 mt-4">
                <p className="text-xs font-semibold text-[#1e5ea7] uppercase tracking-wider">
                  Selected Time
                </p>
                <div className="flex items-center gap-2 text-sm font-semibold text-[#071a31]">
                  <svg className="w-4 h-4 text-[#1e5ea7]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>
                    {selectedSlot.localStartTime} - {selectedSlot.localEndTime}, {formattedSelectedDateHeader}
                  </span>
                </div>
                <p className="text-xs text-[#5f6d77]">
                  Timezone: {inviteeTimezone}
                </p>
              </div>
            ) : (
              /* Monthly Calendar Date Picker */
              <div className="space-y-4">
                {/* Month & Navigation Header */}
                <div className="flex items-center justify-between">
                  <h2 className="text-base font-semibold text-[#071a31]">
                    {monthNames[viewMonth]} {viewYear}
                  </h2>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      disabled={isPrevMonthDisabled}
                      onClick={handlePrevMonth}
                      className={`w-9 h-9 flex items-center justify-center rounded-full text-[#071a31] transition-colors focus:outline-none focus:ring-2 focus:ring-[#6bb1ff] ${
                        isPrevMonthDisabled
                          ? "opacity-30 cursor-not-allowed"
                          : "hover:bg-[#f4f9ff] cursor-pointer"
                      }`}
                      aria-label="Previous month"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <button
                      type="button"
                      onClick={handleNextMonth}
                      className="w-9 h-9 flex items-center justify-center rounded-full text-[#071a31] hover:bg-[#f4f9ff] transition-colors focus:outline-none focus:ring-2 focus:ring-[#6bb1ff]"
                      aria-label="Next month"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Day of Week Headers */}
                <div className="grid grid-cols-7 text-center text-[11px] font-semibold text-[#5f6d77] uppercase tracking-wider py-1">
                  <div>Mon</div>
                  <div>Tue</div>
                  <div>Wed</div>
                  <div>Thu</div>
                  <div>Fri</div>
                  <div>Sat</div>
                  <div>Sun</div>
                </div>

                {/* Date Cells Grid */}
                <div className="grid grid-cols-7 gap-1 text-center text-xs">
                  {calendarDays.map((day, idx) => {
                    if (!day.dayNumber) {
                      return <div key={`empty-${idx}`} className="h-10" />;
                    }

                    const isCurrentSelection = day.dateString === selectedDate;

                    return (
                      <button
                        key={day.dateString}
                        type="button"
                        disabled={!day.isSelectable}
                        onClick={() => {
                          if (day.dateString) {
                            setSelectedDate(day.dateString);
                            setSelectedSlot(null);
                          }
                        }}
                        className={`h-10 w-10 mx-auto rounded-full font-semibold flex items-center justify-center transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-[#6bb1ff] ${
                          isCurrentSelection
                            ? "bg-[#071a31] text-[#fcfbf8] shadow-sm"
                            : day.isSelectable
                            ? "text-[#071a31] hover:bg-[#f4f9ff] hover:text-[#1e5ea7] cursor-pointer"
                            : "text-[#93a0aa] opacity-40 cursor-not-allowed"
                        }`}
                      >
                        {day.dayNumber}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Timezone Selector Dropdown at bottom */}
          <div className="pt-6 mt-6 border-t border-[#d8dce0] flex items-center gap-2">
            <svg className="w-4 h-4 text-[#5f6d77] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div className="flex-1">
              <label htmlFor="tz-select" className="sr-only">Time zone</label>
              <select
                id="tz-select"
                value={inviteeTimezone}
                onChange={(e) => handleTimezoneChange(e.target.value)}
                suppressHydrationWarning
                className="w-full text-xs font-medium text-[#071a31] bg-transparent border-0 focus:ring-1 focus:ring-[#6bb1ff] rounded py-1 px-1 cursor-pointer truncate"
              >
                {timezoneOptions.map((tz) => (
                  <option key={tz} value={tz}>
                    Time zone: {tz}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* ================= RIGHT COLUMN: TIME SLOTS OR BOOKING FORM ================= */}
        <div className="w-full md:w-[40%] p-6 sm:p-8 flex flex-col justify-between bg-white">
          {viewMode === "select-slot" ? (
            <div>
              {/* Header: Selected Date or Month overview */}
              <div className="mb-4">
                <h3 className="text-sm font-semibold text-[#071a31]" suppressHydrationWarning>
                  {selectedDate ? formattedSelectedDateHeader : `${monthNames[viewMonth]} ${viewYear}`}
                </h3>
                <p className="text-xs text-[#5f6d77]" suppressHydrationWarning>
                  {selectedDate ? `${availableSlots.length} available slots` : "No slots available in this month"}
                </p>
              </div>

              {/* Time Slots List */}
              <div className="max-h-[460px] overflow-y-auto space-y-2 pr-1 scrollbar-thin">
                {!selectedDate || availableSlots.length === 0 ? (
                  <div className="p-8 text-center text-xs text-[#5f6d77]">
                    <p className="font-semibold text-[#071a31] mb-1">
                      {!selectedDate
                        ? `No times available in ${monthNames[viewMonth]} ${viewYear}`
                        : "No times available"}
                    </p>
                    <p>
                      {!selectedDate
                        ? "Please navigate to another month to find open availability."
                        : "Please select another date on the calendar."}
                    </p>
                  </div>
                ) : (
                  availableSlots.map((slot) => {
                    const isSelected =
                      selectedSlot?.utcStartTime === slot.utcStartTime;

                    return (
                      <div key={slot.utcStartTime} className="flex gap-2">
                        {/* Time Slot Pill Button */}
                        <button
                          type="button"
                          onClick={() => setSelectedSlot(slot)}
                          className={`min-h-[48px] px-4 py-2 text-sm font-semibold rounded-2xl border transition-all duration-150 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-[#6bb1ff] ${
                            isSelected
                              ? "w-1/2 bg-[#5f6d77] text-white border-[#5f6d77]"
                              : "w-full text-[#1e5ea7] border-[#c1defe] hover:border-[#1e5ea7] hover:bg-[#f4f9ff]"
                          }`}
                        >
                          {slot.localStartTime}
                        </button>

                        {/* Confirmation "Next" button shown when slot is clicked */}
                        {isSelected && (
                          <button
                            type="button"
                            onClick={() => setViewMode("booking-form")}
                            className="w-1/2 min-h-[48px] px-4 py-2 text-sm font-semibold rounded-2xl bg-[#071a31] text-[#fcfbf8] hover:bg-[#0e396a] transition-all duration-150 flex items-center justify-center shadow-sm focus:outline-none focus:ring-2 focus:ring-[#6bb1ff]"
                          >
                            Next
                          </button>
                        )}
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          ) : (
            /* ================= BOOKING DETAILS FORM ================= */
            <div>
              {/* Back to slot selection button (only displayed when not yet confirmed) */}
              {!confirmedBooking && (
                <button
                  type="button"
                  onClick={() => {
                    setErrorMessage(null);
                    setIsSlotConflict(false);
                    setViewMode("select-slot");
                  }}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1e5ea7] hover:text-[#0e396a] mb-6 focus:outline-none cursor-pointer"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  <span>Back to times</span>
                </button>
              )}

              {confirmedBooking && confirmedDetails ? (
                /* ================= CONFIRMED SUCCESS STATE ================= */
                <div className="p-6 bg-[#fcfbf8] border border-[#d8dce0] rounded-2xl text-center space-y-4">
                  {/* Success Check Badge */}
                  <div className="w-12 h-12 rounded-full bg-[#1e5ea7] text-white flex items-center justify-center mx-auto text-xl font-bold shadow-sm">
                    ✓
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#071a31] mb-1">You are scheduled</h3>
                    <p className="text-xs text-[#5f6d77]">
                      A calendar invitation has been scheduled with {host.name}. Details have been confirmed and saved.
                    </p>
                  </div>

                  {/* Confirmed Meeting Details Card */}
                  <div className="p-4 bg-white border border-[#d8dce0] rounded-xl text-left space-y-3 text-xs shadow-sm">
                    {/* Event Title & Duration */}
                    <div className="flex items-center justify-between pb-2 border-b border-[#eef1f4]">
                      <div className="flex items-center gap-2">
                        <span
                          className="w-2.5 h-2.5 rounded-full shrink-0"
                          style={{ backgroundColor: eventType.color || "#071a31" }}
                        />
                        <span className="font-bold text-sm text-[#071a31]">{eventType.title}</span>
                      </div>
                      <span className="px-2 py-0.5 text-[11px] font-semibold bg-[#eef5fc] text-[#1e5ea7] rounded-full">
                        {eventType.durationMinutes} min
                      </span>
                    </div>

                    {/* Host Name */}
                    <div className="text-[#071a31] font-medium flex items-center gap-2.5">
                      <svg className="w-4 h-4 text-[#5f6d77] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      <span>
                        Host: <strong className="font-semibold text-[#071a31]">{host.name}</strong> (@{host.username})
                      </span>
                    </div>

                    {/* Confirmed Date & Time in Invitee Timezone */}
                    <div className="text-[#071a31] font-medium flex items-center gap-2.5">
                      <svg className="w-4 h-4 text-[#5f6d77] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span>
                        {confirmedDetails.startTimeFormatted} – {confirmedDetails.endTimeFormatted}, {confirmedDetails.formattedDate}
                      </span>
                    </div>

                    {/* Timezone */}
                    <div className="text-[#5f6d77] flex items-center gap-2.5">
                      <svg className="w-4 h-4 text-[#5f6d77] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>Timezone: {confirmedDetails.tz}</span>
                    </div>

                    {/* Invitee Details */}
                    <div className="text-[#5f6d77] flex items-center gap-2.5">
                      <svg className="w-4 h-4 text-[#5f6d77] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <span>
                        Invitee: <span className="font-semibold text-[#071a31]">{confirmedBooking.inviteeName}</span> ({confirmedBooking.inviteeEmail})
                      </span>
                    </div>

                    {/* Invitee Notes (if provided) */}
                    {confirmedBooking.inviteeNotes && (
                      <div className="pt-2 border-t border-[#eef1f4] text-[11px] text-[#5f6d77] flex items-start gap-2.5">
                        <svg className="w-4 h-4 text-[#5f6d77] shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <span className="italic leading-relaxed">
                          &ldquo;{confirmedBooking.inviteeNotes}&rdquo;
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Actions: Download Calendar Invite (.ics) and Schedule Another */}
                  <div className="space-y-2 pt-2">
                    <button
                      type="button"
                      id="download-ics-btn"
                      onClick={handleDownloadCalendarInvite}
                      className="w-full inline-flex items-center justify-center gap-2 min-h-[48px] px-5 py-3 text-sm font-semibold rounded-2xl bg-[#071a31] text-[#fcfbf8] hover:bg-[#0e396a] transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-[#6bb1ff] cursor-pointer"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      <span>Download calendar invite (.ics)</span>
                    </button>

                    <button
                      type="button"
                      id="schedule-another-btn"
                      onClick={() => {
                        setConfirmedBooking(null);
                        setSelectedSlot(null);
                        setInviteeName("");
                        setInviteeEmail("");
                        setInviteeNotes("");
                        setErrorMessage(null);
                        setIsSlotConflict(false);
                        setViewMode("select-slot");
                      }}
                      className="w-full inline-flex items-center justify-center min-h-[44px] px-5 py-2 text-xs font-semibold text-[#5f6d77] hover:text-[#071a31] transition-colors focus:outline-none cursor-pointer"
                    >
                      Schedule another meeting
                    </button>
                  </div>
                </div>
              ) : (
                /* ================= DETAILS ENTRY FORM ================= */
                <div>
                  <h3 className="text-lg font-bold text-[#071a31] mb-1">
                    Enter Details
                  </h3>
                  <p className="text-xs text-[#5f6d77] mb-6">
                    {selectedSlot?.localStartTime} – {selectedSlot?.localEndTime},{" "}
                    {selectedSlot ? formatDisplayDate(selectedSlot.localDate) : ""}
                  </p>

                  {/* Slot Conflict Banner */}
                  {isSlotConflict && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-2xl text-xs text-red-800 space-y-2">
                      <div className="flex items-center gap-2 font-bold text-red-900">
                        <svg className="w-4 h-4 text-red-600 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        <span>Time Slot Unavailable</span>
                      </div>
                      <p>{errorMessage}</p>
                      <button
                        type="button"
                        onClick={() => {
                          setErrorMessage(null);
                          setIsSlotConflict(false);
                          setSelectedSlot(null);
                          setViewMode("select-slot");
                        }}
                        className="inline-block mt-1 font-semibold text-red-900 underline hover:text-red-700"
                      >
                        Choose another time
                      </button>
                    </div>
                  )}

                  {/* General Validation / Server Error Banner */}
                  {errorMessage && !isSlotConflict && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-800 flex items-center gap-2">
                      <svg className="w-4 h-4 text-red-600 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <form
                    onSubmit={async (e) => {
                      e.preventDefault();
                      if (!selectedSlot) return;

                      const trimmedName = inviteeName.trim();
                      const trimmedEmail = inviteeEmail.trim();

                      if (!trimmedName) {
                        setErrorMessage("Please enter your name.");
                        return;
                      }

                      if (!trimmedEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
                        setErrorMessage("Please enter a valid email address.");
                        return;
                      }

                      setIsSubmitting(true);
                      setErrorMessage(null);
                      setIsSlotConflict(false);

                      try {
                        const response = await fetch("/api/bookings", {
                          method: "POST",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({
                            eventTypeId: eventType.id,
                            startTime: selectedSlot.utcStartTime,
                            endTime: selectedSlot.utcEndTime,
                            inviteeName: trimmedName,
                            inviteeEmail: trimmedEmail,
                            inviteeTimezone,
                            inviteeNotes: inviteeNotes.trim() || undefined,
                          }),
                        });

                        const data = await response.json();

                        if (!response.ok) {
                          if (response.status === 409) {
                            setIsSlotConflict(true);
                            setErrorMessage(
                              data.error || "This time slot is no longer available. Please select another time."
                            );
                            // Mark slot booked locally so calendar updates immediately
                            setBookings((prev) => [
                              ...prev,
                              {
                                startTime: new Date(selectedSlot.utcStartTime),
                                endTime: new Date(selectedSlot.utcEndTime),
                                status: "confirmed",
                              },
                            ]);
                          } else {
                            setErrorMessage(data.error || "Failed to schedule booking.");
                          }
                          setIsSubmitting(false);
                          return;
                        }

                        // Success!
                        setConfirmedBooking(data.booking);
                        setBookings((prev) => [
                          ...prev,
                          {
                            startTime: new Date(data.booking.startTime),
                            endTime: new Date(data.booking.endTime),
                            status: "confirmed",
                          },
                        ]);
                        setIsSubmitting(false);
                      } catch {
                        setErrorMessage("A network error occurred. Please try again.");
                        setIsSubmitting(false);
                      }
                    }}
                    className="space-y-4"
                  >
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#071a31] mb-1">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        disabled={isSubmitting}
                        value={inviteeName}
                        onChange={(e) => setInviteeName(e.target.value)}
                        placeholder="Jane Doe"
                        className="w-full min-h-[48px] px-4 py-2.5 text-sm rounded-2xl border border-[#c6ccd2] text-[#071a31] placeholder:text-[#93a0aa] focus:outline-none focus:ring-2 focus:ring-[#6bb1ff] focus:border-[#071a31] disabled:opacity-60"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#071a31] mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        disabled={isSubmitting}
                        value={inviteeEmail}
                        onChange={(e) => setInviteeEmail(e.target.value)}
                        placeholder="jane@example.com"
                        className="w-full min-h-[48px] px-4 py-2.5 text-sm rounded-2xl border border-[#c6ccd2] text-[#071a31] placeholder:text-[#93a0aa] focus:outline-none focus:ring-2 focus:ring-[#6bb1ff] focus:border-[#071a31] disabled:opacity-60"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#071a31] mb-1">
                        Please share anything that will help prepare for our meeting
                      </label>
                      <textarea
                        rows={3}
                        disabled={isSubmitting}
                        value={inviteeNotes}
                        onChange={(e) => setInviteeNotes(e.target.value)}
                        placeholder="Discussion topics, questions, etc."
                        className="w-full p-3 text-sm rounded-2xl border border-[#c6ccd2] text-[#071a31] placeholder:text-[#93a0aa] focus:outline-none focus:ring-2 focus:ring-[#6bb1ff] focus:border-[#071a31] disabled:opacity-60"
                      />
                    </div>

                    <p className="text-[11px] text-[#5f6d77] leading-relaxed">
                      By proceeding, you confirm that you agree to the meeting terms and automated notification reminders.
                    </p>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full min-h-[48px] px-5 py-3 text-sm font-semibold rounded-2xl bg-[#071a31] text-[#fcfbf8] hover:bg-[#0e396a] transition-all duration-150 flex items-center justify-center shadow-sm focus:outline-none focus:ring-2 focus:ring-[#6bb1ff] disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24" fill="none">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                          </svg>
                          Scheduling...
                        </span>
                      ) : (
                        "Schedule Event"
                      )}
                    </button>
                  </form>
                </div>
              )}
            </div>
          )}

          {/* Footer note */}
          <div className="pt-6 mt-6 border-t border-[#d8dce0] text-center">
            <span className="text-[11px] text-[#93a0aa]">
              Powered by <span className="font-semibold text-[#5f6d77]">Plany</span>
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}
