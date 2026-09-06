"use client";

import React from "react";
import { BadgeCheck, Building2, HandCoins, Info, Landmark, Loader2, Wallet } from "lucide-react";
import { Badge, Card, SectionHeader, StatCard } from "@/components/ui";
import { SETTLEMENTS } from "@/lib/data";
import { inr } from "@/lib/utils";

export default function PaymentsPage() {
  const totals = SETTLEMENTS.reduce(
    (acc, s) => ({ gross: acc.gross + s.gross, workers: acc.workers + s.workers, welfare: acc.welfare + s.welfare, jobs: acc.jobs + s.jobs }),
    { gross: 0, workers: 0, welfare: 0, jobs: 0 }
  );

  return (
    <div className="space-y-6 anim-fade-up">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Earnings & Settlements</h1>
        <p className="text-mist text-sm mt-1">Weekly cooperative settlements · transparent 85 / 15 split on every booking</p>
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        <StatCard icon={Landmark} label="Gross volume (this week)" value={inr(totals.gross)} sub={`${totals.jobs} jobs across 4 societies`} />
        <StatCard icon={Wallet} label="Paid to workers (85%)" value={inr(totals.workers)} sub="settled via UPI" tone="leaf" />
        <StatCard icon={Building2} label="Welfare pool (15%)" value={inr(totals.welfare)} sub="insurance, training, emergency fund" tone="azure" />
      </div>

      <Card className="p-5 border-l-4 border-l-leaf-500 flex items-start gap-3">
        <HandCoins className="w-5 h-5 text-leaf-600 shrink-0 mt-0.5" />
        <p className="text-sm text-ink/80 leading-relaxed">
          <span className="font-bold text-forest-700">Zero platform commission.</span> SahyogSetu&apos;s cooperative model routes
          85% of every payment to the worker within 24 hours and 15% to their society&apos;s audited welfare fund. Operational
          costs are covered by the societies themselves.
        </p>
      </Card>

      <Card className="overflow-hidden">
        <div className="px-6 pt-6">
          <SectionHeader title="Society settlements" sub="Weekly payout cycle · 1–7 Jan 2026" />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[880px]">
            <thead>
              <tr className="text-left text-xs uppercase tracking-wider text-mist bg-paper border-y border-line">
                <th className="px-6 py-3 font-bold">Settlement</th>
                <th className="px-6 py-3 font-bold">Society</th>
                <th className="px-6 py-3 font-bold text-right">Jobs</th>
                <th className="px-6 py-3 font-bold text-right">Gross</th>
                <th className="px-6 py-3 font-bold text-right">To workers (85%)</th>
                <th className="px-6 py-3 font-bold text-right">Welfare (15%)</th>
                <th className="px-6 py-3 font-bold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {SETTLEMENTS.map((s) => (
                <tr key={s.id} className="hover:bg-forest-50/40 transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-bold text-forest-700">{s.id}</p>
                    <p className="text-xs text-mist">{s.period}</p>
                  </td>
                  <td className="px-6 py-4 font-medium">{s.society}</td>
                  <td className="px-6 py-4 text-right text-mist">{s.jobs}</td>
                  <td className="px-6 py-4 text-right font-bold">{inr(s.gross)}</td>
                  <td className="px-6 py-4 text-right font-bold text-leaf-700">{inr(s.workers)}</td>
                  <td className="px-6 py-4 text-right font-semibold text-azure-700">{inr(s.welfare)}</td>
                  <td className="px-6 py-4">
                    {s.status === "settled" ? (
                      <Badge tone="green" icon={BadgeCheck}>Settled</Badge>
                    ) : (
                      <Badge tone="amber" icon={Loader2}>Processing</Badge>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <p className="text-xs text-mist flex items-center gap-1.5">
        <Info className="w-3.5 h-3.5" /> Prototype figures — settlements are illustrative. No real money movement occurs in this demo.
      </p>
    </div>
  );
}
