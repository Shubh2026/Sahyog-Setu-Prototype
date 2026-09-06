"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft, BadgeCheck, CalendarDays, CheckCircle2, Clock3, HandCoins, MapPin, Navigation, Phone, Play, Wallet,
} from "lucide-react";
import { Avatar, Badge, Button, Card, StatusBadge } from "@/components/ui";
import { MapMock } from "@/components/misc";
import { useDemo } from "@/lib/demo-context";
import { bookingRef, inr, split } from "@/lib/utils";

export default function JobDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params);
  const router = useRouter();
  const { getBooking, acceptJob, declineJob, startJob, completeJob, toast } = useDemo();
  const booking = getBooking(id);

  if (!booking) {
    return (
      <div className="text-center py-20">
        <p className="font-bold">Job not found</p>
        <Button className="mt-4" onClick={() => router.push("/worker/jobs")}>My jobs</Button>
      </div>
    );
  }

  const { worker, welfare } = split(booking.amount);

  return (
    <div className="max-w-4xl mx-auto anim-fade-up pb-10">
      <Link href="/worker/jobs" className="inline-flex items-center gap-1.5 text-sm font-semibold text-mist hover:text-ink">
        <ArrowLeft className="w-4 h-4" /> My jobs
      </Link>

      <div className="flex flex-wrap items-center justify-between gap-3 mt-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">{booking.service}</h1>
          <p className="text-sm text-mist mt-1">Job {bookingRef(booking.id)} · booked {booking.createdAt}</p>
        </div>
        <StatusBadge status={booking.status} />
      </div>

      <div className="grid lg:grid-cols-[1fr_360px] gap-5 mt-6 items-start">
        <div className="space-y-5">
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <Avatar name={booking.customerName} initials={booking.customerName.split(" ").map((x) => x[0]).join("")} color="from-azure-400 to-azure-600" size={56} />
              <div className="flex-1 min-w-0">
                <p className="font-bold text-lg">{booking.customerName}</p>
                <p className="text-sm text-mist">Customer · verified household</p>
              </div>
              <Button variant="secondary" size="sm" onClick={() => toast("Calling customer… (demo)", "info")}>
                <Phone className="w-4 h-4" /> Contact
              </Button>
            </div>
            <dl className="grid sm:grid-cols-2 gap-3 mt-6 text-sm">
              {[
                { icon: CalendarDays, k: "Scheduled", v: `${booking.date}, ${booking.time}` },
                { icon: Navigation, k: "Distance", v: `${booking.distanceKm ?? 2.4} km away` },
                { icon: MapPin, k: "Location", v: booking.address },
                { icon: Clock3, k: "Est. duration", v: "1–1.5 hours" },
              ].map((row) => (
                <div key={row.k} className="rounded-xl bg-paper border border-line px-4 py-3 flex items-center gap-3">
                  <row.icon className="w-4.5 h-4.5 text-forest-600 shrink-0" />
                  <div className="min-w-0">
                    <p className="text-xs text-mist">{row.k}</p>
                    <p className="font-semibold truncate">{row.v}</p>
                  </div>
                </div>
              ))}
            </dl>
            {booking.notes && (
              <div className="mt-4 rounded-xl bg-sun-50 border border-sun-200 px-4 py-3 text-sm text-sun-700">
                <span className="font-bold">Customer note:</span> “{booking.notes}”
              </div>
            )}
          </Card>

          <div>
            <h2 className="font-bold mb-3">Customer location</h2>
            <MapMock status={booking.status} eta={Math.round((booking.distanceKm ?? 2.4) * 5)} />
          </div>
        </div>

        {/* earnings + actions */}
        <div className="space-y-5">
          <Card className="overflow-hidden">
            <div className="bg-forest-50/60 border-b border-forest-100 px-6 py-4 flex items-center gap-2">
              <HandCoins className="w-5 h-5 text-forest-600" />
              <h3 className="font-bold">Your earnings</h3>
            </div>
            <div className="p-6 space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-mist">Customer pays</span>
                <span className="font-semibold">{inr(booking.amount)}</span>
              </div>
              <div className="flex justify-between items-center py-3 border-y border-line">
                <span className="font-bold text-forest-700">You receive (85%)</span>
                <span className="font-extrabold text-2xl text-forest-700 tracking-tight">{inr(worker)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-azure-700">Cooperative welfare (15%)</span>
                <span className="font-semibold text-azure-700">{inr(welfare)}</span>
              </div>
              <p className="text-xs text-mist bg-paper border border-line rounded-xl px-3.5 py-2.5 leading-relaxed">
                Settled to your UPI within 24 hours of completion. Zero platform commission.
              </p>
            </div>
          </Card>

          {booking.status === "completed" ? (
            <Card className="p-6 text-center border-2 border-leaf-300 bg-leaf-50/60">
              <span className="mx-auto w-16 h-16 rounded-full bg-leaf-500 text-white flex items-center justify-center shadow-lift">
                <BadgeCheck className="w-8 h-8" />
              </span>
              <p className="font-extrabold text-lg text-leaf-700 mt-4">Payment received</p>
              <p className="text-3xl font-extrabold tracking-tight mt-1">+{inr(worker)}</p>
              <p className="text-xs text-mist mt-1.5">Settled via {booking.paymentMethod ?? "UPI"} · demo</p>
              {booking.rating && (
                <p className="mt-3 text-sm font-semibold text-sun-600 bg-sun-50 border border-sun-200 rounded-xl px-3 py-2">
                  Customer rated you {booking.rating} ★
                </p>
              )}
              <Link href="/worker/earnings">
                <Button variant="secondary" className="w-full mt-5">
                  <Wallet className="w-4 h-4" /> View earnings
                </Button>
              </Link>
            </Card>
          ) : (
            <Card className="p-6 space-y-3">
              {booking.status === "requested" && (
                <>
                  <Button
                    size="lg"
                    className="w-full"
                    onClick={() => { acceptJob(booking.id); toast("Job accepted — customer notified"); }}
                  >
                    <CheckCircle2 className="w-5 h-5" /> Accept Job
                  </Button>
                  <Button
                    size="lg"
                    variant="secondary"
                    className="w-full"
                    onClick={() => { declineJob(booking.id); toast("Job declined", "info"); router.push("/worker/jobs"); }}
                  >
                    Decline
                  </Button>
                </>
              )}
              {booking.status === "accepted" && (
                <>
                  <Button
                    size="lg"
                    className="w-full"
                    onClick={() => { startJob(booking.id); toast("Job started — timer on (demo)"); }}
                  >
                    <Play className="w-5 h-5" /> Start Job
                  </Button>
                  <Button size="lg" variant="secondary" className="w-full" onClick={() => toast("Opening navigation… (demo)", "info")}>
                    <Navigation className="w-4 h-4" /> Navigate
                  </Button>
                </>
              )}
              {booking.status === "started" && (
                <Button
                  size="lg"
                  className="w-full"
                  onClick={() => { completeJob(booking.id); toast(`Job completed — ${inr(worker)} credited (demo)`); }}
                >
                  <BadgeCheck className="w-5 h-5" /> Complete Job
                </Button>
              )}
              <p className="text-[11px] text-mist text-center leading-relaxed">
                The customer sees your status live in their tracking screen.
              </p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
