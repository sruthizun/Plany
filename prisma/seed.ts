import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // 1. Seed or update default host (alex)
  const user = await prisma.user.upsert({
    where: { username: "alex" },
    update: {
      name: "Alex Morgan",
      email: "alex@plany.dev",
      timezone: "America/New_York",
    },
    create: {
      username: "alex",
      name: "Alex Morgan",
      email: "alex@plany.dev",
      timezone: "America/New_York",
    },
  });

  console.log(`Host configured: ${user.name} (@${user.username})`);

  // 2. Seed or update weekly availability schedule (Monday–Friday 9:00 AM – 5:00 PM)
  let schedule = await prisma.availabilitySchedule.findFirst({
    where: {
      userId: user.id,
      isDefault: true,
    },
  });

  if (!schedule) {
    schedule = await prisma.availabilitySchedule.create({
      data: {
        userId: user.id,
        name: "Working Hours",
        timezone: user.timezone,
        isDefault: true,
      },
    });
  }

  // Remove any stale rules for this schedule to ensure strict repeatability
  await prisma.availabilityRule.deleteMany({
    where: { scheduleId: schedule.id },
  });

  // Monday (1) through Friday (5) from 09:00 to 17:00
  const workingDays = [1, 2, 3, 4, 5];
  for (const day of workingDays) {
    await prisma.availabilityRule.create({
      data: {
        scheduleId: schedule.id,
        dayOfWeek: day,
        startTime: "09:00",
        endTime: "17:00",
      },
    });
  }

  console.log("Working hours configured: Monday–Friday, 09:00 – 17:00");

  // 3. Seed or update the 30-minute 1-on-1 event type
  const eventType = await prisma.eventType.upsert({
    where: {
      userId_slug: {
        userId: user.id,
        slug: "30-min-chat",
      },
    },
    update: {
      title: "30 Minute Meeting",
      description: "Quick 30-minute sync to connect and discuss next steps.",
      durationMinutes: 30,
      color: "#071a31",
      isActive: true,
      bufferBeforeMinutes: 0,
      bufferAfterMinutes: 0,
    },
    create: {
      userId: user.id,
      title: "30 Minute Meeting",
      slug: "30-min-chat",
      description: "Quick 30-minute sync to connect and discuss next steps.",
      durationMinutes: 30,
      color: "#071a31",
      isActive: true,
      bufferBeforeMinutes: 0,
      bufferAfterMinutes: 0,
    },
  });

  console.log(`Event type configured: "${eventType.title}" (slug: /${eventType.slug}, ${eventType.durationMinutes}m)`);
  console.log("Seeding completed successfully.");
}

main()
  .catch((e) => {
    console.error("Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
