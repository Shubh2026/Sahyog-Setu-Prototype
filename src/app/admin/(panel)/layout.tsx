"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  ArrowLeftRight, BadgeCheck, Bell, Building2, ChartNoAxesCombined, ClipboardList,
  CreditCard, LayoutDashboard, Search, Settings, Users,
} from "lucide-react";
import { Logo } from "@/components/logo";
import { Avatar } from "@/components/ui";
import { useDemo } from "@/lib/demo-context";
import { VERIFICATION_QUEUE } from "@/lib/data";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/workers", label: "Workers", icon: Users },
  { href: "/admin/verification", label: "Verification", icon: BadgeCheck, badge: true },
  { href: "/admin/bookings", label: "Bookings", icon: ClipboardList },
  { href: "/admin/payments", label: "Payments", icon: CreditCard },
  { href: "/admin/analytics", label: "Analytics", icon: ChartNoAxesCombined },
  { href: "/admin/cooperatives", label: "Cooperatives", icon: Building2 },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { adminAuthed, hydrated, adminDecisions, toast } = useDemo();
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    if (!hydrated) return;
    if (!adminAuthed) router.replace("/admin/login");
    else setAllowed(true);
  }, [adminAuthed, hydrated, router]);

  const pendingCount = VERIFICATION_QUEUE.filter((r) => !adminDecisions[r.id]).length;

  if (!allowed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-paper">
        <Logo size="lg" className="animate-pulse" />
      </div>
    );
  }

  return (
    <div className="min-h-screen lg:grid lg:grid-cols-[264px_1fr]">
      {/* Sidebar */}
      <aside className="hidden lg:flex flex-col bg-forest-950 text-white sticky top-0 h-screen">
        <div className="px-6 pt-6 pb-5 border-b border-white/10">
          <Logo size="sm" light />
          <p className="text-[11px] text-white/50 font-medium mt-2">Cooperative Admin Console</p>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {NAV.map((item) => {
            const active = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-colors",
                  active ? "bg-white/12 text-white shadow-inner" : "text-white/60 hover:text-white hover:bg-white/5"
                )}
              >
                <item.icon className="w-[18px] h-[18px]" />
                {item.label}
                {item.badge && pendingCount > 0 && (
                  <span className="ml-auto min-w-[20px] h-5 px-1.5 rounded-full bg-sun-400 text-forest-950 text-[11px] font-extrabold flex items-center justify-center">
                    {pendingCount}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-white/10">
          <div className="rounded-xl bg-white/5 border border-white/10 px-4 py-3">
            <p className="text-xs font-bold text-white/85">Chandigarh Shramik LCS</p>
            <p className="text-[11px] text-white/50 mt-0.5">Federation · UT Chapter</p>
          </div>
          <button
            onClick={() => {
              toast("Switched to app login", "info");
              router.push("/login");
            }}
            className="mt-3 w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-sm font-semibold text-white/60 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
          >
            <ArrowLeftRight className="w-4 h-4" /> Exit console
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="min-w-0">
        {/* top bar */}
        <header className="sticky top-0 z-40 bg-white/85 backdrop-blur-md border-b border-line">
          <div className="px-4 sm:px-7 h-[68px] flex items-center gap-4">
            <Link href="/admin/dashboard" className="lg:hidden">
              <Logo size="sm" />
            </Link>
            <div className="relative hidden md:block w-full max-w-sm">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-mist" />
              <input
                placeholder="Search workers, bookings, societies…"
                className="w-full h-10 rounded-xl border border-line bg-paper pl-10 pr-4 text-sm focus:border-forest-500 focus:outline-none focus:bg-white transition-colors"
                onKeyDown={(e) => e.key === "Enter" && toast("Search is illustrative in the demo", "info")}
              />
            </div>
            <div className="flex-1" />
            <button
              className="relative w-10 h-10 rounded-xl hover:bg-black/5 flex items-center justify-center text-mist cursor-pointer"
              aria-label="Admin notifications"
              onClick={() => toast(`${pendingCount} verification requests pending`, "info")}
            >
              <Bell className="w-[18px] h-[18px]" />
              {pendingCount > 0 && <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-red-500" />}
            </button>
            <div className="flex items-center gap-2.5 pl-1">
              <Avatar name="Gurpreet Kaur" initials="GK" color="from-forest-500 to-azure-500" size={36} />
              <div className="hidden sm:block leading-tight">
                <p className="text-[13px] font-bold">Gurpreet Kaur</p>
                <p className="text-[11px] text-mist">Federation Admin</p>
              </div>
            </div>
          </div>
          {/* mobile nav scroller */}
          <nav className="lg:hidden flex gap-1.5 px-4 pb-3 overflow-x-auto">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "shrink-0 inline-flex items-center gap-1.5 h-9 px-3.5 rounded-full text-[13px] font-bold border",
                  pathname.startsWith(item.href)
                    ? "bg-forest-600 border-forest-600 text-white"
                    : "bg-white border-line text-mist"
                )}
              >
                <item.icon className="w-3.5 h-3.5" />
                {item.label}
              </Link>
            ))}
          </nav>
        </header>
        <main className="px-4 sm:px-7 py-7 max-w-[1280px]">{children}</main>
      </div>
    </div>
  );
}
