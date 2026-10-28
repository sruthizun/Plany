import { PrismaClient } from "@prisma/client";
import {
  createBooking,
  SlotConflictError,
  ValidationError,
  NotFoundError,
} from "../../src/lib/booking-coordinator";

async function main() {
  const rawArg = process.argv[2];
  const jsonStr = Buffer.from(rawArg, "base64").toString("utf-8");
  const args = JSON.parse(jsonStr);
  const {
    dbUrl,
    eventTypeId,
    startTime,
    endTime,
    inviteeName,
    inviteeEmail,
    inviteeTimezone,
    referenceNow,
  } = args;

  const client = new PrismaClient({
    datasources: { db: { url: dbUrl } },
  });

  try {
    const booking = await createBooking(
      {
        eventTypeId,
        startTime: new Date(startTime),
        endTime: new Date(endTime),
        inviteeName,
        inviteeEmail,
        inviteeTimezone,
      },
      {
        client,
        referenceNow: new Date(referenceNow),
        skipMemoryMutex: true, // Guarantees we test pure database-level locking across processes
      }
    );

    console.log(
      JSON.stringify({
        success: true,
        statusCode: 201,
        bookingId: booking.id,
      })
    );
  } catch (err: any) {
    let statusCode = 500;
    if (err instanceof SlotConflictError) statusCode = 409;
    else if (err instanceof ValidationError) statusCode = 400;
    else if (err instanceof NotFoundError) statusCode = 404;

    console.log(
      JSON.stringify({
        success: false,
        statusCode,
        error: err.message,
      })
    );
  } finally {
    await client.$disconnect();
  }
}

main().catch((err) => {
  console.log(
    JSON.stringify({
      success: false,
      statusCode: 500,
      error: err.message,
    })
  );
  process.exit(1);
});
