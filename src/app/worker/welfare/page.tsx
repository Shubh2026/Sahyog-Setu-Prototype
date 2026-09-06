"use client";

import React from "react";
import { BadgeCheck, BookOpenCheck, GraduationCap, HeartPulse, Landmark, PiggyBank, ShieldPlus, Sparkles } from "lucide-react";
import { Badge, Card, SectionHeader } from "@/components/ui";
import { WELFARE } from "@/lib/data";
import { inr } from "@/lib/utils";

export default function WelfarePage() {
  return (
    <div className="anim-fade-up max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight">Worker Welfare</h1>
        <p className="text-mist mt-1">Funded by the 15% cooperative pool — security beyond daily wages.</p>
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        <Card className="p-6 border-2 border-leaf-200 bg-leaf-50/40">
          <span className="w-11 h-11 rounded-xl bg-leaf-500 text-white flex items-center justify-center">
            <ShieldPlus className="w-5 h-5" />
          </span>
          <div className="flex items-center gap-2 mt-4">
            <h2 className="font-extrabold text-lg">Insurance</h2>
            <Badge tone="green" icon={BadgeCheck}>Active</Badge>
          </div>
          <p className="text-sm text-mist mt-1.5 leading-relaxed">{WELFARE.insurance.cover}</p>
          <p className="text-xs text-mist mt-2">{WELFARE.insurance.provider}</p>
          <p className="text-xs font-semibold text-leaf-700 mt-1">{WELFARE.insurance.premium}</p>
        </Card>

        <Card className="p-6">
          <span className="w-11 h-11 rounded-xl bg-azure-50 text-azure-500 flex items-center justify-center">
            <GraduationCap className="w-5 h-5" />
          </span>
          <h2 className="font-extrabold text-lg mt-4">Skill Development</h2>
          <p className="text-sm text-mist mt-1.5">2 courses completed · 1 in progress</p>
          <p className="text-xs text-mist mt-2">Next batch: Smart-meter installation, Feb 2026</p>
          <p className="text-xs font-semibold text-azure-600 mt-1">Free for cooperative members</p>
        </Card>

        <Card className="p-6">
          <span className="w-11 h-11 rounded-xl bg-sun-50 text-sun-500 flex items-center justify-center">
            <PiggyBank className="w-5 h-5" />
          </span>
          <h2 className="font-extrabold text-lg mt-4">Welfare Contribution</h2>
          <p className="text-3xl font-extrabold tracking-tight mt-2">{inr(WELFARE.contribution)}</p>
          <p className="text-xs text-mist mt-1.5">your share in the welfare pool (this month)</p>
          <div className="h-2 rounded-full bg-black/5 mt-3 overflow-hidden">
            <div className="h-full w-2/3 rounded-full bg-sun-400" />
          </div>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-5">
        <Card className="p-6 sm:p-7">
          <SectionHeader title="Training & courses" />
          <div className="space-y-3">
            {WELFARE.courses.map((c) => (
              <div key={c.name} className="flex items-center gap-4 rounded-xl border border-line px-4 py-3.5">
                <span className="w-10 h-10 rounded-xl bg-forest-50 text-forest-600 flex items-center justify-center shrink-0">
                  <BookOpenCheck className="w-5 h-5" />
                </span>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-sm truncate">{c.name}</p>
                  <p className="text-xs text-mist">{c.provider} · {c.year}</p>
                </div>
                <Badge tone={c.status === "Completed" ? "green" : "azure"}>{c.status}</Badge>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6 sm:p-7">
          <SectionHeader title="Cooperative benefits" />
          <ul className="space-y-3">
            {WELFARE.benefits.map((b) => (
              <li key={b} className="flex items-start gap-3 text-sm">
                <span className="w-6 h-6 rounded-lg bg-leaf-100 text-leaf-700 flex items-center justify-center shrink-0 mt-0.5">
                  <Sparkles className="w-3.5 h-3.5" />
                </span>
                <span className="font-medium leading-relaxed">{b}</span>
              </li>
            ))}
          </ul>
          <div className="mt-6 rounded-xl bg-paper border border-line px-4 py-3.5 flex items-center gap-3 text-[13px]">
            <Landmark className="w-4.5 h-4.5 text-forest-600" />
            <p className="text-mist">Welfare fund balance across the society: <span className="font-bold text-ink">{inr(1842600)}</span> · audited quarterly (demo)</p>
          </div>
        </Card>
      </div>

      <Card className="p-6 sm:p-7 brand-gradient-soft border-forest-100 flex items-center gap-4">
        <HeartPulse className="w-8 h-8 text-forest-600 shrink-0" />
        <p className="text-sm leading-relaxed text-ink/80">
          <span className="font-bold text-forest-700">Why it matters:</span> conventional gig work leaves workers uninsured.
          On SahyogSetu, every completed job automatically strengthens your safety net — that&apos;s the cooperative difference.
        </p>
      </Card>
    </div>
  );
}
