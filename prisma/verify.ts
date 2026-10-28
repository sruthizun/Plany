import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function verify() {
  const users = await prisma.user.findMany({
    include: {
      eventTypes: true,
      availabilitySchedules: {
        include: {
          rules: {
            orderBy: { dayOfWeek: "asc" },
          },
        },
      },
    },
  });

  console.log("=== USERS COUNT ===", users.length);
  for (const u of users) {
    console.log(`User: ${u.name} (@${u.username}) | Timezone: ${u.timezone} | Email: ${u.email}`);
    console.log(`Event Types (${u.eventTypes.length}):`);
    for (const et of u.eventTypes) {
      console.log(`  - Title: "${et.title}" | Slug: /${et.slug} | Duration: ${et.durationMinutes}m | Active: ${et.isActive}`);
    }
    console.log(`Schedules (${u.availabilitySchedules.length}):`);
    for (const s of u.availabilitySchedules) {
      console.log(`  - Schedule: "${s.name}" (Default: ${s.isDefault}, TZ: ${s.timezone})`);
      console.log(`    Rules (${s.rules.length}):`);
      const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      for (const r of s.rules) {
        console.log(`      * ${days[r.dayOfWeek]} (${r.dayOfWeek}): ${r.startTime} - ${r.endTime}`);
      }
    }
  }

  const bookingCount = await prisma.booking.count();
  console.log("=== BOOKINGS COUNT ===", bookingCount);
}

verify()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
