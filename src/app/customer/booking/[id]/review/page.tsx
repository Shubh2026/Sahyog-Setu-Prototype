"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, HandCoins } from "lucide-react";
import { Avatar, Button, Card, Chip, StarInput, Textarea } from "@/components/ui";
import { useDemo } from "@/lib/demo-context";
import { WORKERS } from "@/lib/data";
import { bookingRef, inr, split } from "@/lib/utils";

const TAGS = ["Professional", "On time", "Skilled", "Friendly", "Good value", "Neat work"];

export default function ReviewPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params);
  const router = useRouter();
  const { getBooking, submitReview, toast } = useDemo();
  const booking = getBooking(id);
  const [rating, setRating] = useState(5);
  const [tags, setTags] = useState<string[]>([]);
  const [text, setText] = useState("");

  if (!booking) {
    return (
      <div className="text-center py-20">
        <p className="font-bold">Booking not found</p>
        <Button className="mt-4" onClick={() => router.push("/customer/bookings")}>My bookings</Button>
      </div>
    );
  }

  const workerProfile = WORKERS.find((x) => x.id === booking.workerId);
  const { worker: workerGets } = split(booking.amount);

  const submit = () => {
    submitReview(booking.id, rating, text || tags.join(", "));
    toast("Thank you! Your review supports the worker's cooperative.");
    router.push("/customer/bookings");
  };

  return (
    <div className="max-w-xl mx-auto anim-fade-up py-6">
      <Card className="p-7 sm:p-9 text-center">
        <Avatar
          name={booking.workerName}
          photo={workerProfile?.photo}
          initials={workerProfile?.initials ?? "WR"}
          color={workerProfile?.color}
          size={84}
          className="mx-auto"
        />
        <p className="text-xs font-bold uppercase tracking-widest text-mist mt-5">{bookingRef(booking.id)} · {booking.service}</p>
        <h1 className="text-[26px] font-extrabold tracking-tight mt-2">How was your experience?</h1>
        <p className="text-sm text-mist mt-1">with {booking.workerName}</p>

        <div className="mt-6">
          <StarInput value={rating} onChange={setRating} />
          <p className="text-sm font-bold text-forest-700 mt-2">{["", "Poor", "Fair", "Good", "Very good", "Excellent"][rating]}</p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mt-6">
          {TAGS.map((t) => (
            <Chip
              key={t}
              active={tags.includes(t)}
              onClick={() => setTags((prev) => (prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]))}
            >
              {t}
            </Chip>
          ))}
        </div>

        <Textarea
          className="mt-6 text-left"
          placeholder="Share your experience (optional)…"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <div className="mt-5 rounded-2xl bg-leaf-50 border border-leaf-200 px-5 py-4 flex items-center gap-3 text-left">
          <HandCoins className="w-5 h-5 text-leaf-600 shrink-0" />
          <p className="text-[13px] text-leaf-700 leading-relaxed">
            <span className="font-bold">{inr(workerGets)} of your {inr(booking.amount)}</span> went directly to {booking.workerName.split(" ")[0]}. Reviews help cooperative members get more work.
          </p>
        </div>

        <Button size="lg" className="w-full mt-6" onClick={submit}>
          Submit Review <ArrowRight className="w-4 h-4" />
        </Button>
        <button onClick={() => router.push("/customer/bookings")} className="mt-3 text-sm font-semibold text-mist hover:text-ink cursor-pointer">
          Maybe later
        </button>
      </Card>
    </div>
  );
}
