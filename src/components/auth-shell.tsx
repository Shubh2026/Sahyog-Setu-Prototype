"use client";

import React from "react";
import { Lock, ShieldCheck, HandCoins, HeartHandshake } from "lucide-react";
import { Logo } from "@/components/logo";
import { useDemo } from "@/lib/demo-context";

export function AuthShell({
  children,
  stepBadge,
}: {
  children: React.ReactNode;
  stepBadge?: string;
}) {
  const { t } = useDemo();
  return (
    <div className="min-h-screen lg:grid lg:grid-cols-[minmax(420px,42%)_1fr]">
      {/* Brand panel */}
      <aside className="relative hidden lg:flex flex-col justify-between brand-gradient dot-grid p-10 xl:p-14 text-white overflow-hidden">
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-40 -left-24 w-[28rem] h-[28rem] rounded-full bg-azure-500/20 blur-3xl" />
        <div className="relative">
          <Logo size="md" light />
        </div>
        <div className="relative max-w-md">
          <h1 className="text-[40px] leading-[1.12] font-extrabold tracking-tight anim-fade-up">
            {t("tagline")}
          </h1>
          <p className="mt-4 text-lg text-white/80 leading-relaxed anim-fade-up stagger-1">{t("subtitle")}</p>
          <ul className="mt-10 space-y-4 anim-fade-up stagger-2">
            {[
              { icon: ShieldCheck, text: "Every worker is cooperative & identity verified" },
              { icon: HandCoins, text: "85% of every payment goes directly to the worker" },
              { icon: HeartHandshake, text: "Welfare, insurance & training via the cooperative" },
            ].map((f, i) => (
              <li key={i} className="flex items-center gap-3.5">
                <span className="w-10 h-10 rounded-xl bg-white/12 backdrop-blur flex items-center justify-center shrink-0 border border-white/15">
                  <f.icon className="w-5 h-5" />
                </span>
                <span className="text-[15px] font-medium text-white/90">{f.text}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="relative flex items-center justify-between text-[13px] text-white/70">
          <span className="font-semibold">{t("poweredBy")}</span>
          <span className="inline-flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5" /> {t("secure")}
          </span>
        </div>
      </aside>

      {/* Content */}
      <main className="min-h-screen flex flex-col bg-paper">
        <div className="lg:hidden px-5 pt-6 pb-2 flex items-center justify-between">
          <Logo size="sm" />
          <span className="text-[11px] font-bold text-forest-700 bg-forest-50 border border-forest-100 rounded-full px-2.5 py-1">
            SIH26089 · Demo
          </span>
        </div>
        <div className="flex-1 flex items-center justify-center px-4 sm:px-8 py-10">
          <div className="w-full max-w-[480px]">
            {stepBadge && (
              <div className="mb-5 hidden lg:flex items-center gap-2">
                <span className="text-[11px] font-bold text-forest-700 bg-forest-50 border border-forest-100 rounded-full px-2.5 py-1 uppercase tracking-wide">
                  {stepBadge}
                </span>
              </div>
            )}
            {children}
          </div>
        </div>
        <p className="pb-6 text-center text-xs text-mist px-6">
          Prototype for SIH 2026 Internal Round — SIH26089 · Ministry of Cooperation. Demo data only.
        </p>
      </main>
    </div>
  );
}
