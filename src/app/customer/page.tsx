"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, HandCoins, MapPin, Search, ShieldCheck, Sparkles, TrendingUp } from "lucide-react";
import { Button, Card, StatusBadge } from "@/components/ui";
import { WorkerCard } from "@/components/cards";
import { ServiceIcon } from "@/components/misc";
import { Logo } from "@/components/logo";
import { useDemo } from "@/lib/demo-context";
import { SERVICES, WORKERS } from "@/lib/data";
import { greeting, inr } from "@/lib/utils";

export default function CustomerHome() {
  const router = useRouter();
  const { customer, bookings, t } = useDemo();
  const [q, setQ] = useState("");
  const [greet, setGreet] = useState("Welcome");
  useEffect(() => setGreet(greeting()), []);
  const name = customer?.name?.split(" ")[0] || "Rahul";
  const city = customer?.city || "Chandigarh";

  const filtered = SERVICES.filter((s) => s.name.toLowerCase().includes(q.toLowerCase()));
  const activeBooking = bookings.find(
    (b) => b.customerId === "c-demo" && ["requested", "accepted", "started", "scheduled"].includes(b.status)
  );

  return (
    <div className="space-y-10">
      {/* header + search */}
      <section className="anim-fade-up">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-[28px] sm:text-[34px] font-extrabold tracking-tight">
              {greet}, {name}
            </h1>
            <p className="text-mist mt-1 inline-flex items-center gap-1.5 text-[15px]">
              <MapPin className="w-4 h-4 text-forest-600" /> {city} · Services by verified cooperative workers
            </p>
          </div>
          <div className="hidden md:flex items-center gap-2 text-xs font-semibold text-forest-700 bg-forest-50 border border-forest-100 rounded-full px-3.5 py-2">
            <ShieldCheck className="w-4 h-4" /> {t("poweredBy")}
          </div>
        </div>

        <div className="relative mt-6 max-w-2xl">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-mist" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && q && router.push(`/customer/services/${filtered[0]?.slug ?? ""}`)}
            placeholder={t("searchPh")}
            aria-label="Search services"
            className="w-full h-[60px] rounded-2xl border border-line-strong bg-white pl-14 pr-5 text-[16px] shadow-soft placeholder:text-mist/60 focus:border-forest-500 focus:outline-none focus:shadow-glow transition-all"
          />
          {q && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-line rounded-2xl shadow-lift z-20 overflow-hidden anim-fade-up">
              {filtered.length === 0 && <p className="px-5 py-4 text-sm text-mist">No matching service — try “electrician” or “cleaning”.</p>}
              {filtered.map((s) => (
                <button
                  key={s.slug}
                  onClick={() => router.push(`/customer/services/${s.slug}`)}
                  className="w-full flex items-center gap-3.5 px-5 py-3.5 hover:bg-forest-50 text-left transition-colors cursor-pointer"
                >
                  <span className="w-10 h-10 rounded-xl bg-forest-50 text-forest-600 flex items-center justify-center">
                    <ServiceIcon slug={s.slug} size={19} />
                  </span>
                  <span className="flex-1">
                    <span className="block font-bold text-sm">{s.name}</span>
                    <span className="block text-xs text-mist">{s.desc}</span>
                  </span>
                  <span className="text-xs font-bold text-forest-700">from {inr(s.base)}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* active booking */}
      {activeBooking && (
        <Card className="p-5 sm:p-6 border-l-4 border-l-azure-500 anim-fade-up">
          <div className="flex flex-wrap items-center gap-4 justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-azure-600">Active booking</p>
              <h3 className="font-bold text-lg mt-1">
                {activeBooking.service} · {activeBooking.workerName}
              </h3>
              <p className="text-sm text-mist mt-0.5">
                {activeBooking.date}, {activeBooking.time} · {inr(activeBooking.amount)}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <StatusBadge status={activeBooking.status} />
              <Link href={`/customer/booking/${activeBooking.id}/track`}>
                <Button>
                  Track worker <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </Card>
      )}

      {/* categories */}
      <section className="anim-fade-up stagger-1">
        <div className="flex items-end justify-between mb-5">
          <h2 className="text-xl font-bold tracking-tight">{t("categories")}</h2>
          <Link href="/customer/services" className="text-sm font-bold text-forest-700 hover:underline inline-flex items-center gap-1">
            {t("viewAll")} <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
          {SERVICES.map((s) => (
            <Link key={s.slug} href={`/customer/services/${s.slug}`}>
              <Card className="p-5 h-full hover:shadow-lift hover:-translate-y-1 hover:border-forest-200 transition-all duration-300 group cursor-pointer">
                <span className="w-12 h-12 rounded-2xl bg-forest-50 text-forest-600 flex items-center justify-center group-hover:bg-forest-600 group-hover:text-white transition-colors">
                  <ServiceIcon slug={s.slug} size={22} />
                </span>
                <h3 className="font-bold mt-3.5 text-[15px]">{s.name}</h3>
                <p className="text-xs text-mist mt-0.5">{s.hi}</p>
                <p className="text-xs font-bold text-forest-700 mt-2">from {inr(s.base)}</p>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* fair wage banner */}
      <section className="anim-fade-up stagger-2">
        <div className="relative overflow-hidden rounded-3xl brand-gradient dot-grid text-white p-8 sm:p-10">
          <div className="absolute -right-16 -bottom-24 w-72 h-72 rounded-full bg-white/10 blur-2xl" />
          <div className="relative flex flex-col lg:flex-row lg:items-center gap-8">
            <div className="flex-1">
              <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest bg-white/15 border border-white/20 rounded-full px-3 py-1.5">
                <HandCoins className="w-3.5 h-3.5" /> The SahyogSetu promise
              </span>
              <h2 className="text-2xl sm:text-[30px] font-extrabold tracking-tight mt-4 leading-snug">
                85% of every payment goes<br className="hidden sm:block" /> directly to the worker.
              </h2>
              <p className="text-white/80 mt-3 max-w-xl leading-relaxed text-[15px]">
                No hidden commissions. The 15% cooperative share funds insurance, training and welfare — you see exactly where every rupee goes before you pay.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-3 sm:gap-4 shrink-0">
              {[
                { icon: ShieldCheck, big: "100%", small: "cooperative verified" },
                { icon: TrendingUp, big: "85%", small: "worker share" },
                { icon: Sparkles, big: "0", small: "platform fee" },
              ].map((s, i) => (
                <div key={i} className="rounded-2xl bg-white/12 border border-white/15 backdrop-blur px-4 py-5 text-center">
                  <s.icon className="w-5 h-5 mx-auto mb-2 opacity-90" />
                  <p className="text-xl sm:text-2xl font-extrabold">{s.big}</p>
                  <p className="text-[11px] text-white/75 mt-1 leading-tight">{s.small}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* nearby workers */}
      <section className="anim-fade-up stagger-3 pb-4">
        <div className="flex items-end justify-between mb-5">
          <div>
            <h2 className="text-xl font-bold tracking-tight">{t("nearYou")}</h2>
            <p className="text-sm text-mist mt-1">Smart-matched by distance, rating & availability (prototype)</p>
          </div>
          <Link href="/customer/services" className="text-sm font-bold text-forest-700 hover:underline inline-flex items-center gap-1 shrink-0">
            {t("viewAll")} <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {WORKERS.filter((w) => w.photo).slice(0, 4).map((w) => (
            <WorkerCard key={w.id} worker={w} />
          ))}
        </div>
      </section>

      {/* footer strip */}
      <footer className="border-t border-line pt-6 pb-2 flex flex-wrap items-center justify-between gap-3 text-xs text-mist">
        <Logo size="sm" />
        <span>SahyogSetu · SIH 2026 prototype · SIH26089, Ministry of Cooperation</span>
      </footer>
    </div>
  );
}
