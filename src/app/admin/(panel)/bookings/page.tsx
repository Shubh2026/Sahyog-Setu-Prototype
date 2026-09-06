"use client";

import React, { useMemo, useState } from "react";
import { CalendarX, Download } from "lucide-react";
import { Badge, Button, Card, EmptyState, StatusBadge, Tabs } from "@/components/ui";
import { useDemo } from "@/lib/demo-context";
import { bookingRef, inr, split } from "@/lib/utils";

export default function AdminBookings() {
  const { bookings, toast } = useDemo();
  const [tab, setTab] = useState("all");

  const groups = useMemo(() => {
    const active = bookings.filter((b) => ["accepted", "started", "scheduled"].includes(b.status));
    const pending = bookings.filter((b) => b.status === "requested");
    const completed = bookings.filter((b) => b.status === "completed");
    const cancelled = bookings.filter((b) => b.status === "cancelled");
    return { all: bookings, pending, active, completed, cancelled };
  }, [bookings]);

  const list = groups[tab as keyof typeof groups] ?? bookings;
  const volume = list.reduce((s, b) => s + b.amount, 0);

  return (
    <div className="space-y-6 anim-fade-up">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Booking Management</h1>
          <p className="text-mist text-sm mt-1">All bookings across cooperative members · demo feed</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge tone="grey">View volume {inr(volume)}</Badge>
          <Button variant="secondary" onClick={() => toast("CSV export started (demo)", "info")}>
            <Download className="w-4 h-4" /> Export
          </Button>
        </div>
      </div>

      <Tabs
        active={tab}
        onChange={setTab}
        tabs={[
          { id: "all", label: "All", count: groups.all.length },
          { id: "pending", label: "Pending", count: groups.pending.length },
          { id: "active", label: "Active", count: groups.active.length },
          { id: "completed", label: "Completed", count: groups.completed.length },
          { id: "cancelled", label: "Cancelled", count: groups.cancelled.length },
        ]}
      />

      {list.length === 0 ? (
        <Card><EmptyState icon={CalendarX} title="No bookings in this state" sub="Bookings appear here as customers and workers interact." /></Card>
      ) : (
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[960px]">
              <thead>
                <tr className="text-left text-xs uppercase tracking-wider text-mist bg-paper border-b border-line">
                  <th className="px-5 py-3.5 font-bold">Booking ID</th>
                  <th className="px-5 py-3.5 font-bold">Customer</th>
                  <th className="px-5 py-3.5 font-bold">Worker</th>
                  <th className="px-5 py-3.5 font-bold">Service</th>
                  <th className="px-5 py-3.5 font-bold">Date</th>
                  <th className="px-5 py-3.5 font-bold text-right">Amount</th>
                  <th className="px-5 py-3.5 font-bold">Status</th>
                  <th className="px-5 py-3.5 font-bold text-right">Worker share</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {list.map((b) => (
                  <tr key={b.id} className="hover:bg-forest-50/40 transition-colors">
                    <td className="px-5 py-3.5 font-bold text-forest-700">{bookingRef(b.id)}</td>
                    <td className="px-5 py-3.5 font-medium">{b.customerName}</td>
                    <td className="px-5 py-3.5 text-mist">{b.workerName}</td>
                    <td className="px-5 py-3.5 text-mist">{b.service}</td>
                    <td className="px-5 py-3.5 text-mist whitespace-nowrap">{b.date}, {b.time}</td>
                    <td className="px-5 py-3.5 text-right font-bold">{inr(b.amount)}</td>
                    <td className="px-5 py-3.5"><StatusBadge status={b.status} /></td>
                    <td className="px-5 py-3.5 text-right font-bold text-leaf-700">{inr(split(b.amount).worker)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  );
}
