"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Bell, ChevronDown, LogOut, Menu, Repeat, User, X, Briefcase, Wallet, HandCoins,
  LayoutDashboard, Home as HomeIcon, LifeBuoy, ClipboardList, Grid2X2, Award, Building2, Heart,
} from "lucide-react";
import { Logo } from "@/components/logo";
import { Avatar } from "@/components/ui";
import { useDemo } from "@/lib/demo-context";
import { cn } from "@/lib/utils";

function LangToggle() {
  const { lang, setLang } = useDemo();
  return (
    <div className="hidden sm:flex items-center rounded-full border border-line bg-white p-0.5" role="group" aria-label="Language">
      {(["en", "hi"] as const).map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          className={cn(
            "h-7 px-2.5 rounded-full text-xs font-bold transition-colors cursor-pointer",
            lang === l ? "bg-forest-600 text-white" : "text-mist hover:text-ink"
          )}
        >
          {l === "en" ? "EN" : "हिं"}
        </button>
      ))}
    </div>
  );
}

interface NavItem {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

function DesktopLinks({ items }: { items: NavItem[] }) {
  const pathname = usePathname();
  return (
    <nav className="hidden md:flex items-center gap-1" aria-label="Primary">
      {items.map((item) => {
        const active = pathname === item.href || (item.href !== "/customer" && item.href !== "/worker" && pathname.startsWith(item.href));
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "relative h-10 px-3.5 rounded-xl text-sm font-semibold flex items-center gap-1.5 transition-colors",
              active ? "text-forest-700 bg-forest-50" : "text-mist hover:text-ink hover:bg-black/[0.03]"
            )}
          >
            <item.icon className="w-4 h-4" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

function TopBar({
  items,
  avatarName,
  avatarPhoto,
  avatarInitials,
  avatarColor,
  accent = "forest",
  homeHref,
  menuExtra,
  notifHref,
  role,
}: {
  items: NavItem[];
  avatarName: string;
  avatarPhoto?: string;
  avatarInitials: string;
  avatarColor?: string;
  accent?: "forest" | "azure";
  homeHref: string;
  menuExtra: { href: string; label: string; icon: React.ComponentType<{ className?: string }> }[];
  notifHref: string;
  role: "customer" | "worker";
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { unreadCount, logout, toast } = useDemo();
  const profileRef = useRef<HTMLDivElement>(null);
  const unread = unreadCount(role);

  useEffect(() => {
    setMenuOpen(false);
    setProfileOpen(false);
  }, [pathname]);

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) setProfileOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-white/85 backdrop-blur-md border-b border-line">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 h-[68px] flex items-center gap-3">
        <button
          className="md:hidden w-10 h-10 rounded-xl hover:bg-black/5 flex items-center justify-center text-ink cursor-pointer"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
        <Link href={homeHref} aria-label="SahyogSetu home">
          <Logo size="sm" />
        </Link>
        <DesktopLinks items={items} />
        <div className="flex-1" />
        <LangToggle />
        <Link
          href={notifHref}
          aria-label="Notifications"
          className="relative w-10 h-10 rounded-xl hover:bg-black/5 flex items-center justify-center text-mist hover:text-ink transition-colors"
        >
          <Bell className="w-[18px] h-[18px]" />
          {unread > 0 && (
            <span className="absolute top-1.5 right-1.5 min-w-[16px] h-4 px-1 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center">
              {unread}
            </span>
          )}
        </Link>
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center gap-2 rounded-full pl-1 pr-2 py-1 hover:bg-black/5 transition-colors cursor-pointer"
            aria-haspopup="menu"
            aria-expanded={profileOpen}
          >
            <Avatar name={avatarName} photo={avatarPhoto} initials={avatarInitials} color={avatarColor} size={34} />
            <ChevronDown className={cn("w-4 h-4 text-mist transition-transform", profileOpen && "rotate-180")} />
          </button>
          {profileOpen && (
            <div className="absolute right-0 top-full mt-2 w-60 bg-white border border-line rounded-2xl shadow-lift overflow-hidden anim-fade-up" role="menu">
              <div className="px-4 py-3 border-b border-line bg-paper">
                <p className="font-bold text-sm truncate">{avatarName}</p>
                <p className="text-xs text-mist">{role === "customer" ? "Customer account" : "Cooperative member"}</p>
              </div>
              <div className="p-1.5">
                {menuExtra.map((m) => (
                  <Link
                    key={m.href}
                    href={m.href}
                    className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium text-ink hover:bg-forest-50 hover:text-forest-700 transition-colors"
                    role="menuitem"
                  >
                    <m.icon className="w-4 h-4 text-mist" /> {m.label}
                  </Link>
                ))}
                <button
                  onClick={() => {
                    logout();
                    toast("Switched role — sign in again", "info");
                    router.push("/login");
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium text-azure-600 hover:bg-azure-50 transition-colors cursor-pointer"
                  role="menuitem"
                >
                  <Repeat className="w-4 h-4" /> Switch role (demo)
                </button>
                <button
                  onClick={() => {
                    logout();
                    router.push("/login");
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                  role="menuitem"
                >
                  <LogOut className="w-4 h-4" /> Log out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* mobile drawer */}
      {menuOpen && (
        <nav className="md:hidden border-t border-line bg-white px-4 py-3 space-y-1 anim-fade-in" aria-label="Mobile">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold",
                pathname === item.href ? "bg-forest-50 text-forest-700" : "text-mist"
              )}
            >
              <item.icon className="w-4 h-4" /> {item.label}
            </Link>
          ))}
          {menuExtra.map((m) => (
            <Link key={m.href} href={m.href} className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-mist">
              <m.icon className="w-4 h-4" /> {m.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}

export function CustomerNavbar() {
  const { customer, t } = useDemo();
  return (
    <TopBar
      homeHref="/customer"
      role="customer"
      items={[
        { href: "/customer", label: t("home"), icon: HomeIcon },
        { href: "/customer/services", label: t("services"), icon: Grid2X2 },
        { href: "/customer/bookings", label: t("bookings"), icon: ClipboardList },
        { href: "/customer/support", label: t("support"), icon: LifeBuoy },
      ]}
      avatarName={customer?.name || "Rahul Sharma"}
      avatarPhoto="/avatars/rahul.jpg"
      avatarInitials="RS"
      notifHref="/customer/notifications"
      menuExtra={[
        { href: "/customer/profile", label: t("profile"), icon: User },
        { href: "/customer/notifications", label: t("notifications"), icon: Bell },
      ]}
    />
  );
}

export function WorkerNavbar() {
  const { worker, workerApproved } = useDemo();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Registered-but-unapproved demo workers only see the pending screen
    if (worker && !workerApproved && pathname !== "/worker/pending") {
      router.replace("/worker/pending");
    }
  }, [worker, workerApproved, pathname, router]);

  return (
    <TopBar
      homeHref="/worker"
      role="worker"
      items={[
        { href: "/worker", label: "Dashboard", icon: LayoutDashboard },
        { href: "/worker/jobs", label: "My Jobs", icon: Briefcase },
        { href: "/worker/earnings", label: "Earnings", icon: Wallet },
        { href: "/worker/fair-wage", label: "Fair Wage", icon: HandCoins },
      ]}
      avatarName={worker?.name || "Ramesh Kumar"}
      avatarPhoto="/avatars/ramesh.jpg"
      avatarInitials="RK"
      avatarColor="from-forest-500 to-forest-700"
      notifHref="/worker/notifications"
      menuExtra={[
        { href: "/worker/profile", label: "Profile", icon: User },
        { href: "/worker/skills", label: "Skills & Certificates", icon: Award },
        { href: "/worker/cooperative", label: "Cooperative Membership", icon: Building2 },
        { href: "/worker/welfare", label: "Welfare Benefits", icon: Heart },
        { href: "/worker/notifications", label: "Notifications", icon: Bell },
      ]}
    />
  );
}
