"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowRight, BadgeCheck, Briefcase, ShieldAlert, TrendingUp, Users, Wallet,
} from "lucide-react";
import { Badge, Button, Card, SectionHeader, StatCard } from "@/components/ui";
import { BookingTrendChart, ServiceDemandChart, WorkerDistChart } from "@/components/charts";
import { useDemo } from "@/lib/demo-context";
import { ADMIN_KPIS, BOOKING_TREND, SERVICE_DEMAND, VERIFICATION_QUEUE, WORKER_DISTRIBUTION } from "@/lib/data";
import { inr } from "@/lib/utils";

export default function AdminDashboard() {
  const { adminDecisions, bookings } = useDemo();
  const pending = VERIFICATION_QUEUE.filter((r) => !adminDecisions[r.id]).length;
  const liveBookings = bookings.length;

  return (
    <div className="space-y-6 anim-fade-up">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Operations Dashboard</h1>
          <p className="text-mist text-sm mt-1">Chandigarh region · Friday, 9 January 2026 · live demo data</p>
        </div>
        <Badge tone="green" icon={BadgeCheck}>All systems normal</Badge>
      </div>

      {/* KPIs */}
      <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard icon={Users} label="Active workers" value={ADMIN_KPIS.activeWorkers.toLocaleString("en-IN")} sub="+38 this week" />
        <StatCard icon={Briefcase} label="Bookings today" value={String(ADMIN_KPIS.bookingsToday)} sub="↑ 9% vs yesterday" tone="azure" />
        <StatCard icon={Wallet} label="Worker earnings today" value={inr(ADMIN_KPIS.workerEarningsToday)} sub="85% paid out directly" tone="leaf" />
        <StatCard icon={ShieldAlert} label="Pending verification" value={String(pending)} sub="needs your review" tone="sun" />
      </div>

      {pending > 0 && (
        <Card className="p-5 border-l-4 border-l-sun-400 flex flex-wrap items-center gap-4 justify-between">
          <div>
            <p className="font-bold">{pending} workers waiting for cooperative verification</p>
            <p className="text-sm text-mist mt-0.5">Review identity and certificates before they can accept bookings.</p>
          </div>
          <Link href="/admin/verification">
            <Button>Review now <ArrowRight className="w-4 h-4" /></Button>
          </Link>
        </Card>
      )}

      {/* charts */}
      <div className="grid xl:grid-cols-[1fr_380px] gap-5">
        <Card className="p-6">
          <SectionHeader
            title="Booking trends"
            sub="Last 7 days · all cooperatives"
            action={<Badge tone="green" icon={TrendingUp}>+12% WoW</Badge>}
          />
          <BookingTrendChart data={BOOKING_TREND} />
        </Card>
        <Card className="p-6">
          <SectionHeader title="Worker distribution" sub="By operating area" />
          <WorkerDistChart data={WORKER_DISTRIBUTION} />
        </Card>
      </div>

      <div className="grid xl:grid-cols-[1fr_380px] gap-5">
        <Card className="p-6">
          <SectionHeader title="Service demand" sub="Bookings by category · this week" />
          <ServiceDemandChart data={SERVICE_DEMAND} />
        </Card>
        <Card className="p-6">
          <SectionHeader title="Live booking feed" sub={`${liveBookings} demo bookings tracked`} />
          <ul className="space-y-3">
            {bookings.slice(0, 5).map((b) => (
              <li key={b.id} className="flex items-center gap-3 text-sm">
                <span className="w-2 h-2 rounded-full bg-leaf-500 shrink-0" />
                <p className="min-w-0 truncate">
                  <span className="font-semibold">{b.customerName}</span>
                  <span className="text-mist"> booked </span>
                  <span className="font-semibold">{b.service}</span>
                  <span className="text-mist"> · {inr(b.amount)}</span>
                </p>
              </li>
            ))}
          </ul>
          <Link href="/admin/bookings">
            <Button variant="secondary" className="w-full mt-5" size="sm">
              Manage all bookings <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </Link>
        </Card>
      </div>
    </div>
  );
}
