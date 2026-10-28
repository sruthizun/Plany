import type { Metadata } from "next";
import { SignUpForm } from "./SignUpForm";

export const metadata: Metadata = {
  title: "Create your free Plany account — Plany",
  description:
    "No credit card required. Get started with Plany today for effortless meeting scheduling and calendar coordination.",
};

export default function SignUpPage() {
  return (
    <main className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-[#fcfbf8]">
      <SignUpForm />
    </main>
  );
}
