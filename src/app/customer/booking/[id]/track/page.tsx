"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Clock3, MessageCircle, Phone, Star } from "lucide-react";
import { Avatar, Button, Card, StatusBadge, VerifiedBadge } from "@/components/ui";
import { BookingTimeline, MapMock } from "@/components/misc";
import { useDemo } from "@/lib/demo-context";
import { WORKERS } from "@/lib/data";
import { bookingRef, inr, split } from "@/lib/utils";

export default function TrackBooking({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params);
  const router = useRouter();
  const { getBooking, toast } = useDemo();
  const booking = getBooking(id);

  if (!booking) {
    return (
      <div className="text-center py-20">
        <p className="font-bold">Booking not found</p>
        <Button className="mt-4" onClick={() => router.push("/customer/bookings")}>My bookings</Button>
      </div>
    );
  }

  const workerProfile = WORKERS.find((x) => x.id === booking.workerId);
  const eta = booking.status === "requested" ? 18 : 12;
  const { worker: workerGets } = split(booking.amount);

  const statusLine: Record<string, string> = {
    requested: "Waiting for the worker to accept your booking…",
    accepted: `${booking.workerName} accepted and is on the way.`,
    started: "Work is in progress at your location.",
    completed: "This job is complete. We hope it went well!",
    scheduled: "Your booking is scheduled. The worker will confirm in advance.",
    cancelled: "This booking was cancelled.",
  };

  return (
    <div className="max-w-3xl mx-auto anim-fade-up pb-10">
      <Link href="/customer/bookings" className="inline-flex items-center gap-1.5 text-sm font-semibold text-mist hover:text-ink">
        <ArrowLeft className="w-4 h-4" /> My bookings
      </Link>

      <div className="flex flex-wrap items-center justify-between gap-3 mt-4">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight">Track your service</h1>
          <p className="text-sm text-mist mt-1">{bookingRef(booking.id)} · {booking.service}</p>
        </div>
        <StatusBadge status={booking.status} />
      </div>

      <div className="mt-6">
        <MapMock status={booking.status} eta={eta} />
      </div>

      <Card className="mt-5 p-5 sm:p-6">
        <div className="flex flex-wrap items-center gap-4">
          <Avatar
            name={booking.workerName}
            photo={workerProfile?.photo}
            initials={workerProfile?.initials ?? "WR"}
            color={workerProfile?.color}
            size={56}
          />
          <div className="flex-1 min-w-[180px]">
            <div className="flex items-center gap-2 flex-wrap">
              <p className="font-bold">{booking.workerName}</p>
              <VerifiedBadge />
            </div>
            <p className="text-sm text-mist mt-0.5">
              {statusLine[booking.status]}
            </p>
          </div>
          {["accepted"].includes(booking.status) && (
            <div className="text-right">
              <p className="text-[11px] uppercase tracking-wide font-bold text-mist">ETA</p>
              <p className="text-2xl font-extrabold text-forest-700 tracking-tight inline-flex items-center gap-1.5">
                <Clock3 className="w-5 h-5" /> {eta} min
              </p>
            </div>
          )}
        </div>
        <div className="flex gap-2.5 mt-5">
          <Button variant="secondary" size="sm" className="flex-1" onClick={() => toast("Calling… (demo)", "info")}>
            <Phone className="w-4 h-4" /> Contact Worker
          </Button>
          <Button variant="secondary" size="sm" className="flex-1" onClick={() => toast("Chat opens here (demo)", "info")}>
            <MessageCircle className="w-4 h-4" /> Message
          </Button>
        </div>
      </Card>

      <div className="grid sm:grid-cols-2 gap-5 mt-5">
        <Card className="p-6">
          <h2 className="font-bold mb-5">Journey</h2>
          <BookingTimeline status={booking.status} />
        </Card>
        <Card className="p-6 h-fit">
          <h2 className="font-bold mb-4">Booking summary</h2>
          <dl className="space-y-3 text-sm">
            {[
              ["Service", booking.service],
              ["Schedule", `${booking.date}, ${booking.time}`],
              ["Address", booking.address],
              ["Paid", `${inr(booking.amount)} via ${booking.paymentMethod ?? "UPI"}`],
              ["Worker receives", `${inr(workerGets)} (85%)`],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between gap-4">
                <dt className="text-mist shrink-0">{k}</dt>
                <dd className="font-semibold text-right">{v}</dd>
              </div>
            ))}
          </dl>
          {booking.status === "completed" && !booking.rating && (
            <Link href={`/customer/booking/${booking.id}/review`}>
              <Button className="w-full mt-6" variant="azure">
                <Star className="w-4 h-4" /> Rate your experience
              </Button>
            </Link>
          )}
          {booking.status === "completed" && booking.rating && (
            <p className="mt-6 text-sm font-semibold text-leaf-700 bg-leaf-50 border border-leaf-200 rounded-xl px-4 py-3 text-center">
              Thanks for your {booking.rating}-star review!
            </p>
          )}
        </Card>
      </div>
    </div>
  );
}
