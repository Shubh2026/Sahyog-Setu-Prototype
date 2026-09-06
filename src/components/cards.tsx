"use client";

import React from "react";
import Link from "next/link";
import {
  MapPin, Star, Navigation, Wallet, CalendarDays, ArrowRight,
  BellRing, CreditCard, ShieldCheck, Info, type LucideIcon,
} from "lucide-react";
import { Avatar, Badge, Button, Card, StatusBadge, Stars, VerifiedBadge } from "@/components/ui";
import { AppNotification, Booking, WorkerProfile } from "@/lib/data";
import { cn, inr, split } from "@/lib/utils";

/* ---------------------------- Worker card -------------------------- */
export function WorkerCard({ worker, className }: { worker: WorkerProfile; className?: string }) {
  return (
    <Card className={cn("p-5 hover:shadow-lift hover:-translate-y-0.5 transition-all duration-300", className)}>
      <div className="flex gap-4">
        <Avatar name={worker.name} photo={worker.photo} initials={worker.initials} color={worker.color} size={64} />
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-bold text-[15px] leading-tight truncate">{worker.name}</h3>
              <p className="text-[13px] text-mist mt-0.5">
                {worker.skill} · {worker.experience} yrs
              </p>
            </div>
            <span className="inline-flex items-center gap-1 text-sm font-bold shrink-0">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              {worker.rating}
            </span>
          </div>
          <div className="flex items-center gap-3 text-xs text-mist mt-1.5">
            <span className="inline-flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" /> {worker.distance} km
            </span>
            <span>{worker.reviews} reviews</span>
            <span className="font-semibold text-ink">from {inr(worker.price)}</span>
          </div>
          <div className="flex flex-wrap items-center gap-1.5 mt-3">
            <VerifiedBadge />
            {worker.availableToday && (
              <Badge tone="azure">
                <span className="w-1.5 h-1.5 rounded-full bg-azure-500 anim-ping-dot" /> Available today
              </Badge>
            )}
          </div>
        </div>
      </div>
      <div className="flex gap-2.5 mt-4">
        <Link href={`/customer/workers/${worker.id}`} className="flex-1">
          <Button variant="secondary" className="w-full" size="sm">
            View Profile
          </Button>
        </Link>
        <Link href={`/customer/book/${worker.id}`} className="flex-1">
          <Button className="w-full" size="sm">
            Book
          </Button>
        </Link>
      </div>
    </Card>
  );
}

/* --------------------------- Job request --------------------------- */
export function JobRequestCard({
  booking,
  onAccept,
  onDecline,
}: {
  booking: Booking;
  onAccept?: (id: string) => void;
  onDecline?: (id: string) => void;
}) {
  const earning = split(booking.amount).worker;
  return (
    <Card className="p-5 border-l-4 border-l-sun-400">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-bold text-[15px]">{booking.customerName}</h3>
            <Badge tone="amber">New request</Badge>
          </div>
          <p className="text-sm text-mist mt-1">
            {booking.service} · {booking.date}, {booking.time}
          </p>
        </div>
        <div className="text-right">
          <p className="text-[11px] uppercase tracking-wide font-semibold text-mist">You earn</p>
          <p className="text-xl font-extrabold text-forest-700 tracking-tight">{inr(earning)}</p>
          <p className="text-[11px] text-mist">of {inr(booking.amount)} · 85%</p>
        </div>
      </div>
      {booking.notes && (
        <p className="mt-3 text-[13px] text-ink/80 bg-paper border border-line rounded-xl px-3.5 py-2.5">
          “{booking.notes}”
        </p>
      )}
      <div className="flex items-center gap-4 mt-3 text-xs text-mist">
        <span className="inline-flex items-center gap-1.5">
          <Navigation className="w-3.5 h-3.5" /> {booking.distanceKm ?? 2.0} km away
        </span>
        <span className="inline-flex items-center gap-1.5">
          <MapPin className="w-3.5 h-3.5" /> {booking.address}
        </span>
      </div>
      {(onAccept || onDecline) && (
        <div className="flex gap-2.5 mt-4">
          <Button size="sm" className="flex-1" onClick={() => onAccept?.(booking.id)}>
            Accept
          </Button>
          <Button size="sm" variant="secondary" className="flex-1" onClick={() => onDecline?.(booking.id)}>
            Decline
          </Button>
        </div>
      )}
    </Card>
  );
}

/* ------------------------ Customer booking row --------------------- */
export function BookingListCard({ booking }: { booking: Booking }) {
  const active = ["requested", "accepted", "started", "scheduled"].includes(booking.status);
  return (
    <Card className="p-5 hover:shadow-lift transition-shadow">
      <div className="flex flex-wrap items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-forest-50 text-forest-600 flex items-center justify-center shrink-0">
          <CalendarDays className="w-5 h-5" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-bold text-[15px]">{booking.service}</h3>
            <StatusBadge status={booking.status} />
          </div>
          <p className="text-[13px] text-mist mt-0.5">
            {booking.workerName} · {booking.date}, {booking.time}
          </p>
          <p className="text-xs text-mist mt-0.5 truncate">{booking.address}</p>
        </div>
        <div className="text-right shrink-0">
          <p className="font-extrabold text-lg tracking-tight">{inr(booking.amount)}</p>
          <p className="text-[11px] text-mist">worker gets {inr(split(booking.amount).worker)}</p>
        </div>
      </div>
      <div className="flex items-center gap-2.5 mt-4 justify-end">
        {active && (
          <Link href={`/customer/booking/${booking.id}/track`}>
            <Button size="sm" variant={booking.status === "requested" ? "secondary" : "primary"}>
              Track
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </Link>
        )}
        {booking.status === "completed" && !booking.rating && (
          <Link href={`/customer/booking/${booking.id}/review`}>
            <Button size="sm" variant="azure">
              <Star className="w-3.5 h-3.5" /> Rate service
            </Button>
          </Link>
        )}
        {booking.status === "completed" && booking.rating && (
          <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-mist">
            Your rating <Stars value={booking.rating} size={13} />
          </span>
        )}
      </div>
    </Card>
  );
}

/* --------------------------- Notification -------------------------- */
const NOTIF_ICONS: Record<AppNotification["kind"], LucideIcon> = {
  booking: BellRing,
  payment: CreditCard,
  verify: ShieldCheck,
  info: Info,
};
const NOTIF_TONES: Record<AppNotification["kind"], string> = {
  booking: "bg-azure-50 text-azure-500",
  payment: "bg-leaf-50 text-leaf-600",
  verify: "bg-forest-50 text-forest-600",
  info: "bg-sun-50 text-sun-500",
};

export function NotificationItem({ n }: { n: AppNotification }) {
  const Icon = NOTIF_ICONS[n.kind];
  return (
    <div className={cn("flex gap-4 px-5 py-4 transition-colors", !n.read && "bg-forest-50/40")}>
      <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center shrink-0", NOTIF_TONES[n.kind])}>
        <Icon className="w-[18px] h-[18px]" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <p className="font-semibold text-sm truncate">{n.title}</p>
          {!n.read && <span className="w-2 h-2 rounded-full bg-azure-500 shrink-0" aria-label="unread" />}
        </div>
        <p className="text-[13px] text-mist mt-0.5 leading-relaxed">{n.body}</p>
        <p className="text-xs text-mist/70 mt-1">{n.time}</p>
      </div>
    </div>
  );
}

/* ------------------------- Fair-wage verse ------------------------- */
export function FairWagePill({ amount, className }: { amount: number; className?: string }) {
  const { worker } = split(amount);
  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-full bg-leaf-50 border border-leaf-200 text-leaf-700 px-2.5 py-1 text-xs font-bold", className)}>
      <Wallet className="w-3.5 h-3.5" /> worker gets {inr(worker)}
    </span>
  );
}
