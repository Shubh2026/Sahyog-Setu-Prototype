"use client";

import React from "react";
import { Building2, HandCoins, Info, Scale, TrendingUp, Wallet } from "lucide-react";
import { Badge, Card, SectionHeader } from "@/components/ui";
import { inr } from "@/lib/utils";

export default function FairWagePage() {
  const totalCustomerPaid = 30000;
  const workerEarnings = 25500;
  const welfare = totalCustomerPaid - workerEarnings; // 4500

  return (
    <div className="anim-fade-up max-w-4xl mx-auto space-y-6">
      <div className="text-center">
        <span className="mx-auto w-14 h-14 rounded-2xl bg-leaf-50 text-leaf-600 flex items-center justify-center">
          <HandCoins className="w-7 h-7" />
        </span>
        <h1 className="text-3xl font-extrabold tracking-tight mt-4">My Fair Wage Report</h1>
        <p className="text-mist mt-1.5 max-w-lg mx-auto">
          January 2026 · complete transparency on where every customer rupee goes.
        </p>
      </div>

      {/* summary cards */}
      <div className="grid sm:grid-cols-3 gap-4">
        <Card className="p-6 text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-mist">Customers paid</p>
          <p className="text-3xl font-extrabold tracking-tight mt-2">{inr(totalCustomerPaid)}</p>
          <p className="text-xs text-mist mt-1">58 jobs this month</p>
        </Card>
        <Card className="p-6 text-center border-2 border-leaf-300 bg-leaf-50/50">
          <p className="text-xs font-bold uppercase tracking-widest text-leaf-700">You earned (85%)</p>
          <p className="text-3xl font-extrabold tracking-tight mt-2 text-leaf-700">{inr(workerEarnings)}</p>
          <p className="text-xs text-mist mt-1">settled to UPI •• ramesh.k@upi</p>
        </Card>
        <Card className="p-6 text-center bg-azure-50/40 border-azure-200">
          <p className="text-xs font-bold uppercase tracking-widest text-azure-600">Cooperative welfare (15%)</p>
          <p className="text-3xl font-extrabold tracking-tight mt-2 text-azure-700">{inr(welfare)}</p>
          <p className="text-xs text-mist mt-1">funds insurance & training</p>
        </Card>
      </div>

      {/* split visual */}
      <Card className="p-6 sm:p-8">
        <SectionHeader title="Your earnings split" sub="Applied equally to every job on SahyogSetu" />
        <div className="flex h-14 rounded-2xl overflow-hidden shadow-inner text-white text-sm font-bold">
          <div className="bg-gradient-to-r from-leaf-500 to-forest-600 flex items-center justify-center gap-2" style={{ width: "85%" }}>
            <Wallet className="w-4 h-4" /> Worker · 85%
          </div>
          <div className="bg-azure-400 flex items-center justify-center gap-2 flex-1">
            <Building2 className="w-4 h-4" /> 15%
          </div>
        </div>
        <div className="grid sm:grid-cols-2 gap-3 mt-5 text-sm">
          <div className="rounded-xl bg-leaf-50 border border-leaf-200 px-4 py-3.5">
            <p className="font-bold text-leaf-700 flex items-center gap-1.5"><Wallet className="w-4 h-4" /> Direct to you — {inr(25500)}</p>
            <p className="text-xs text-mist mt-1">Paid to your UPI after each job. No commission deducted.</p>
          </div>
          <div className="rounded-xl bg-azure-50 border border-azure-100 px-4 py-3.5">
            <p className="font-bold text-azure-700 flex items-center gap-1.5"><Building2 className="w-4 h-4" /> Welfare pool — {inr(4500)}</p>
            <p className="text-xs text-mist mt-1">Your cooperative uses this for insurance, training & emergency loans.</p>
          </div>
        </div>
      </Card>

      {/* comparison */}
      <Card className="p-6 sm:p-8">
        <SectionHeader
          title="How this compares"
          sub="Platform policy comparison — illustrative design goals, not market claims"
        />
        <div className="space-y-6">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="font-semibold text-mist inline-flex items-center gap-1.5"><Scale className="w-4 h-4" /> Typical commission-led gig platforms</span>
              <span className="font-bold text-mist">worker share ~65–70%</span>
            </div>
            <div className="h-9 rounded-xl bg-black/[0.04] overflow-hidden">
              <div className="h-full w-[67%] rounded-xl bg-gradient-to-r from-slate-300 to-slate-400 flex items-center px-4 text-xs font-bold text-white">
                65–70%
              </div>
            </div>
          </div>
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="font-bold text-forest-700 inline-flex items-center gap-1.5"><TrendingUp className="w-4 h-4" /> SahyogSetu cooperative model</span>
              <span className="font-extrabold text-forest-700">worker share 85%</span>
            </div>
            <div className="h-9 rounded-xl bg-leaf-50 border border-leaf-200 overflow-hidden">
              <div className="h-full w-[85%] rounded-xl bg-gradient-to-r from-leaf-400 to-forest-600 flex items-center px-4 text-xs font-bold text-white shadow-glow">
                85% — you keep more of what you earn
              </div>
            </div>
          </div>
        </div>
        <p className="mt-6 rounded-xl bg-paper border border-line px-4 py-3 text-xs text-mist leading-relaxed flex gap-2">
          <Info className="w-4 h-4 shrink-0 mt-0.5" />
          Comparison reflects SahyogSetu&apos;s cooperative-first platform <span className="font-semibold">design policy</span> versus
          generic commission ranges cited in public gig-economy research. It is an illustrative policy statement, not a claim about any specific company.
        </p>
      </Card>

      <Card className="p-6 sm:p-7 brand-gradient dot-grid text-white border-0">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
          <Badge className="bg-white/15 border-white/25 text-white">Month projection</Badge>
          <p className="text-[15px] leading-relaxed font-medium">
            At this rate you&apos;ll take home <span className="font-extrabold">≈ ₹30,600</span> this month while your welfare fund grows to cover
            insurance and 2 more free skill courses.
          </p>
        </div>
      </Card>
    </div>
  );
}
