"use client";

import { WorkerNavbar } from "@/components/navbars";

export default function WorkerLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <WorkerNavbar />
      <main className="max-w-[1280px] mx-auto px-4 sm:px-6 py-8">{children}</main>
    </div>
  );
}
