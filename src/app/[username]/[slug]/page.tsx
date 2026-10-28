import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { BookingCalendarView } from "@/components/booking/BookingCalendarView";

export const instant = false;

interface BookingPageProps {
  params: Promise<{
    username: string;
    slug: string;
  }>;
}

export default async function BookingPage({ params }: BookingPageProps) {
  const { username, slug } = await params;

  const host = await prisma.user.findUnique({
    where: { username },
    include: {
      eventTypes: {
        where: { slug, isActive: true },
        include: {
          bookings: {
            where: { status: "confirmed" },
            select: {
              startTime: true,
              endTime: true,
              status: true,
            },
          },
        },
      },
      availabilitySchedules: {
        where: { isDefault: true },
        include: { rules: true },
      },
    },
  });

  if (!host || host.eventTypes.length === 0 || host.availabilitySchedules.length === 0) {
    notFound();
  }

  const eventType = host.eventTypes[0]!;
  const schedule = host.availabilitySchedules[0]!;

  // Fetch all confirmed bookings across all event types for this host
  const hostBookings = await prisma.booking.findMany({
    where: {
      eventType: {
        userId: host.id,
      },
      status: "confirmed",
    },
    select: {
      startTime: true,
      endTime: true,
      status: true,
    },
  });

  return (
    <main>
      <BookingCalendarView
        host={{
          name: host.name,
          username: host.username,
          email: host.email,
          avatarUrl: host.avatarUrl,
        }}
        eventType={{
          id: eventType.id,
          title: eventType.title,
          durationMinutes: eventType.durationMinutes,
          description: eventType.description,
          color: eventType.color,
          bufferBeforeMinutes: eventType.bufferBeforeMinutes,
          bufferAfterMinutes: eventType.bufferAfterMinutes,
        }}
        schedule={{
          timezone: schedule.timezone,
          rules: schedule.rules.map((r) => ({
            dayOfWeek: r.dayOfWeek,
            startTime: r.startTime,
            endTime: r.endTime,
          })),
        }}
        initialBookings={hostBookings.map((b) => ({
          startTime: b.startTime.toISOString(),
          endTime: b.endTime.toISOString(),
          status: b.status,
        }))}
      />
    </main>
  );
}
