"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { CalendarX, Plus } from "lucide-react";
import { Button, Card, EmptyState, Tabs } from "@/components/ui";
import { BookingListCard } from "@/components/cards";
import { useDemo } from "@/lib/demo-context";

export default function MyBookings() {
  const { bookings } = useDemo();
  const [tab, setTab] = useState("all");

  const mine = useMemo(() => bookings.filter((b) => b.customerId === "c-demo"), [bookings]);
  const groups = useMemo(() => {
    const active = mine.filter((b) => ["requested", "accepted", "started", "scheduled"].includes(b.status));
    const completed = mine.filter((b) => b.status === "completed");
    const cancelled = mine.filter((b) => b.status === "cancelled");
    return { all: mine, active, completed, cancelled };
  }, [mine]);

  const list = groups[tab as keyof typeof groups] ?? mine;

  return (
    <div className="anim-fade-up max-w-3xl mx-auto">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">My Bookings</h1>
          <p className="text-mist mt-1">{mine.length} booking{mine.length === 1 ? "" : "s"} with cooperative workers</p>
        </div>
        <Link href="/customer/services">
          <Button><Plus className="w-4 h-4" /> Book a service</Button>
        </Link>
      </div>

      <Tabs
        className="mt-6"
        active={tab}
        onChange={setTab}
        tabs={[
          { id: "all", label: "All", count: groups.all.length },
          { id: "active", label: "Active", count: groups.active.length },
          { id: "completed", label: "Completed", count: groups.completed.length },
          { id: "cancelled", label: "Cancelled", count: groups.cancelled.length },
        ]}
      />

      {list.length === 0 ? (
        <Card className="mt-6">
          <EmptyState
            icon={CalendarX}
            title="No bookings here yet"
            sub="Book a verified cooperative worker for any household or community service."
            action={
              <Link href="/customer/services">
                <Button>Browse services</Button>
              </Link>
            }
          />
        </Card>
      ) : (
        <div className="mt-5 space-y-4">
          {list.map((b) => (
            <BookingListCard key={b.id} booking={b} />
          ))}
        </div>
      )}
    </div>
  );
}
