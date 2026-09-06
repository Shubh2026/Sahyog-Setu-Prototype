"use client";

import { CustomerNavbar } from "@/components/navbars";

export default function CustomerLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <CustomerNavbar />
      <main className="max-w-[1280px] mx-auto px-4 sm:px-6 py-8">{children}</main>
    </div>
  );
}
