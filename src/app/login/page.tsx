import type { Metadata } from "next";
import { LoginForm } from "./LoginForm";

export const metadata: Metadata = {
  title: "Log in to Plany — Easy Scheduling Ahead",
  description:
    "Log in to your Plany account to manage your event types, availability schedules, and meeting bookings.",
};

export default function LoginPage() {
  return (
    <main className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-[#fcfbf8]">
      <LoginForm />
    </main>
  );
}
