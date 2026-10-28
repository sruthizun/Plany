import { NextRequest, NextResponse } from "next/server";
import {
  createBooking,
  ValidationError,
  NotFoundError,
  SlotConflictError,
} from "@/lib/booking-coordinator";

export const instant = false;

export async function POST(request: NextRequest) {
  try {
    let body;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: "Invalid JSON request body." },
        { status: 400 }
      );
    }

    const booking = await createBooking(body);

    return NextResponse.json(
      {
        success: true,
        booking,
      },
      { status: 201 }
    );
  } catch (error: any) {
    if (error instanceof ValidationError) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    if (error instanceof NotFoundError) {
      return NextResponse.json({ error: error.message }, { status: 404 });
    }
    if (error instanceof SlotConflictError) {
      return NextResponse.json({ error: error.message }, { status: 409 });
    }

    console.error("Booking creation error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred while scheduling your booking." },
      { status: 500 }
    );
  }
}
