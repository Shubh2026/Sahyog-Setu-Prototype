"use client";

import React from "react";
import { ArrowDownToLine, BadgeCheck, CalendarDays, TrendingUp, Wallet } from "lucide-react";
import { Badge, Card, SectionHeader, StatCard } from "@/components/ui";
import { EarningsBarChart } from "@/components/charts";
import { useDemo } from "@/lib/demo-context";
import { WEEKLY_EARNINGS } from "@/lib/data";
import { bookingRef, inr, split } from "@/lib/utils";

export default function WorkerEarnings() {
  const { bookings, toast } = useDemo();
  const completed = bookings.filter((b) => b.workerId === "w1" && b.status === "completed");
  const sessionExtra = completed.filter((b) => b.createdAt === "Just now").reduce((s, b) => s + split(b.amount).worker, 0);

  const chart = [...WEEKLY_EARNINGS];
  if (sessionExtra > 0) chart[chart.length - 1] = { day: "Sun", amount: 1275 + sessionExtra };

  return (
    <div className="anim-fade-up space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Earnings</h1>
          <p className="text-mist mt-1">100% transparent — every rupee accounted for</p>
        </div>
        <Badge tone="green" icon={BadgeCheck}>85% of every payment is yours</Badge>
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        <StatCard icon={Wallet} label="Today" value={inr(1275 + sessionExtra)} sub="3 jobs completed" />
        <StatCard icon={CalendarDays} label="This week" value={inr(8450 + sessionExtra)} sub="Mon – Sun" tone="leaf" />
        <StatCard icon={TrendingUp} label="This month" value={inr(24850 + sessionExtra)} sub="+16% vs last month" tone="azure" />
      </div>

      <Card className="p-6 sm:p-7">
        <SectionHeader title="This week at a glance" sub="Net earnings after the cooperative welfare contribution" />
        <EarningsBarChart data={chart} />
      </Card>

      <Card className="overflow-hidden">
        <div className="flex items-center justify-between px-6 py-5 border-b border-line">
          <h2 className="font-bold text-lg tracking-tight">Recent payments</h2>
          <button
            className="inline-flex items-center gap-1.5 text-sm font-bold text-forest-700 hover:underline cursor-pointer"
            onClick={() => toast("Statement download starts (demo)", "info")}
          >
            <ArrowDownToLine className="w-4 h-4" /> Statement
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[620px]">
            <thead>
              <tr className="text-left text-xs uppercase tracking-wider text-mist bg-paper">
                <th className="px-6 py-3 font-bold">Job</th>
                <th className="px-6 py-3 font-bold">Customer</th>
                <th className="px-6 py-3 font-bold">Date</th>
                <th className="px-6 py-3 font-bold text-right">You received</th>
                <th className="px-6 py-3 font-bold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {completed.map((b) => (
                <tr key={b.id} className="hover:bg-forest-50/40 transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-semibold">{b.service}</p>
                    <p className="text-xs text-mist">{bookingRef(b.id)}</p>
                  </td>
                  <td className="px-6 py-4 text-mist">{b.customerName}</td>
                  <td className="px-6 py-4 text-mist">{b.date}</td>
                  <td className="px-6 py-4 text-right font-bold text-leaf-700">+{inr(split(b.amount).worker)}</td>
                  <td className="px-6 py-4">
                    <Badge tone="green" icon={BadgeCheck}>Settled</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <p className="text-xs text-mist text-center pb-2">
        Settlements to UPI within 24 hours · handled by Chandigarh Shramik LCS · demo data
      </p>
    </div>
  );
}
