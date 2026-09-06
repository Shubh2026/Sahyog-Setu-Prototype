"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Check, ClipboardList, MapPin, PartyPopper } from "lucide-react";
import { Avatar, Button, Card } from "@/components/ui";
import { useDemo } from "@/lib/demo-context";
import { bookingRef, inr, split } from "@/lib/utils";

export default function BookingConfirmed({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params);
  const router = useRouter();
  const { getBooking } = useDemo();
  const booking = getBooking(id);

  if (!booking) {
    return (
      <div className="text-center py-20">
        <p className="font-bold">Booking not found</p>
        <Button className="mt-4" onClick={() => router.push("/customer/bookings")}>View my bookings</Button>
      </div>
    );
  }

  const { worker } = split(booking.amount);

  return (
    <div className="max-w-xl mx-auto text-center anim-fade-up py-6">
      <div className="relative mx-auto w-24 h-24">
        <span className="absolute inset-0 rounded-full bg-leaf-200 anim-ping-dot" />
        <span className="relative anim-pop w-24 h-24 rounded-full bg-gradient-to-br from-leaf-400 to-forest-600 text-white flex items-center justify-center shadow-lift">
          <Check className="w-12 h-12" strokeWidth={3} />
        </span>
      </div>
      <h1 className="text-[30px] font-extrabold tracking-tight mt-6">Booking Confirmed!</h1>
      <p className="text-mist mt-2 inline-flex items-center gap-1.5 justify-center">
        <PartyPopper className="w-4 h-4 text-forest-600" />
        {booking.workerName} has been notified and will confirm shortly.
      </p>

      <Card className="mt-8 text-left overflow-hidden">
        <div className="brand-gradient px-6 py-4 flex items-center justify-between text-white">
          <span className="text-sm font-bold">Booking ID · {bookingRef(booking.id)}</span>
          <span className="text-xs bg-white/20 rounded-full px-3 py-1 font-semibold">Paid · {booking.paymentMethod ?? "UPI"}</span>
        </div>
        <div className="p-6">
          <div className="flex items-center gap-4 pb-5 border-b border-line">
            <Avatar name={booking.workerName} photo={booking.workerId === "w1" ? "/avatars/ramesh.jpg" : undefined} initials={booking.workerName.split(" ").map((x) => x[0]).join("")} size={52} />
            <div>
              <p className="font-bold">{booking.workerName}</p>
              <p className="text-sm text-mist">{booking.service}</p>
            </div>
          </div>
          <dl className="divide-y divide-line text-sm">
            {[
              ["Date", booking.date],
              ["Time", booking.time],
              ["Amount", `${inr(booking.amount)} (worker receives ${inr(worker)})`],
              ["Booking ID", bookingRef(booking.id)],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between gap-4 py-3">
                <dt className="text-mist">{k}</dt>
                <dd className="font-semibold text-right">{v}</dd>
              </div>
            ))}
            <div className="py-3 flex gap-3">
              <MapPin className="w-4 h-4 text-azure-500 mt-0.5 shrink-0" />
              <dd className="font-semibold">{booking.address}</dd>
            </div>
          </dl>
        </div>
      </Card>

      <div className="flex flex-col sm:flex-row gap-3 mt-7">
        <Link href={`/customer/booking/${booking.id}/track`} className="flex-1">
          <Button size="lg" className="w-full">
            Track Worker <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
        <Link href="/customer/bookings" className="flex-1">
          <Button size="lg" variant="secondary" className="w-full">
            <ClipboardList className="w-4 h-4" /> View Booking
          </Button>
        </Link>
      </div>
    </div>
  );
}
