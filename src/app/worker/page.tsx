"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowRight, Briefcase, CalendarCheck2, HandCoins, Sparkles, Star, TrendingUp, Wallet,
} from "lucide-react";
import { Badge, Button, Card, SectionHeader, StatCard, Toggle } from "@/components/ui";
import { JobRequestCard } from "@/components/cards";
import { useDemo } from "@/lib/demo-context";
import { greeting, inr, split } from "@/lib/utils";

export default function WorkerDashboard() {
  const { worker, bookings, acceptJob, declineJob, toast, workerAvailable, setWorkerAvailable } = useDemo();
  const name = worker?.name?.split(" ")[0] || "Ramesh";
  const [greet, setGreet] = useState("Welcome");
  useEffect(() => setGreet(greeting()), []);

  const requests = bookings.filter((b) => b.workerId === "w1" && b.status === "requested");
  const upcoming = bookings.filter((b) => b.workerId === "w1" && ["accepted", "started"].includes(b.status));
  const completedNow = bookings.filter((b) => b.workerId === "w1" && b.status === "completed" && b.createdAt === "Just now");
  const sessionExtra = completedNow.reduce((s, b) => s + split(b.amount).worker, 0);

  return (
    <div className="space-y-8">
      {/* header */}
      <div className="flex flex-wrap items-center justify-between gap-4 anim-fade-up">
        <div>
          <h1 className="text-[28px] sm:text-[34px] font-extrabold tracking-tight">
            {greet}, {name}
          </h1>
          <p className="text-mist mt-1">Sector 17, Chandigarh · Chandigarh Shramik LCS</p>
        </div>
        <div className="flex items-center gap-3 rounded-2xl border border-line bg-white px-4 py-3 shadow-soft">
          <span className={`relative flex h-3 w-3 ${workerAvailable ? "" : "opacity-40"}`}>
            {workerAvailable && <span className="absolute inline-flex h-full w-full rounded-full bg-leaf-400 anim-ping-dot" />}
            <span className={`relative inline-flex h-3 w-3 rounded-full ${workerAvailable ? "bg-leaf-500" : "bg-mist"}`} />
          </span>
          <span className="text-sm font-bold">{workerAvailable ? "Available for jobs" : "Offline"}</span>
          <Toggle on={workerAvailable} onChange={(v) => { setWorkerAvailable(v); toast(v ? "You're now visible to customers" : "You went offline", "info"); }} label="Availability" />
        </div>
      </div>

      {/* earnings hero */}
      <div className="grid lg:grid-cols-3 gap-5 anim-fade-up stagger-1">
        <div className="lg:col-span-1 relative overflow-hidden rounded-3xl brand-gradient dot-grid text-white p-7">
          <div className="absolute -right-10 -bottom-14 w-44 h-44 rounded-full bg-white/10 blur-2xl" />
          <div className="relative">
            <p className="text-[13px] font-semibold text-white/75 inline-flex items-center gap-1.5">
              <Wallet className="w-4 h-4" /> Today&apos;s earnings
            </p>
            <p className="text-[40px] font-extrabold tracking-tight mt-1">{inr(1275 + sessionExtra)}</p>
            <div className="flex items-center gap-2 mt-3">
              <Badge tone="forest" className="bg-white/15 border-white/20 text-white">This week {inr(8450 + sessionExtra)}</Badge>
            </div>
            <div className="mt-6 rounded-2xl bg-white/12 border border-white/15 px-4 py-3 backdrop-blur">
              <p className="text-xs font-bold uppercase tracking-widest text-white/70">Your share on every job</p>
              <p className="text-2xl font-extrabold mt-0.5">85%</p>
              <div className="h-2 rounded-full bg-white/20 mt-2 overflow-hidden">
                <div className="h-full w-[85%] rounded-full bg-gradient-to-r from-leaf-300 to-white" />
              </div>
            </div>
          </div>
        </div>
        <div className="lg:col-span-2 grid sm:grid-cols-2 xl:grid-cols-3 gap-4 content-start">
          <StatCard icon={Briefcase} label="Jobs today" value="3" sub="2 completed · 1 upcoming" />
          <StatCard icon={Star} label="Rating" value="4.9" sub="128 reviews" tone="sun" />
          <StatCard icon={CalendarCheck2} label="Completion rate" value="98%" sub="412 jobs done" tone="azure" />
          <StatCard icon={TrendingUp} label="This month" value={inr(24850 + sessionExtra)} sub="vs ₹21,300 last month" tone="leaf" />
          <div className="sm:col-span-2 rounded-2xl border border-azure-100 bg-azure-50 px-5 py-4 flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-azure-500 shrink-0 mt-0.5" />
            <p className="text-[13px] text-azure-700 leading-relaxed">
              <span className="font-bold">Demand forecast (prototype):</span> electrician requests are expected to rise
              <span className="font-bold"> ↑ 24%</span> tomorrow, 4–7 PM in Sector 17–22. Stay available to earn ~₹1,200 more.
            </p>
          </div>
        </div>
      </div>

      {/* requests */}
      <section className="anim-fade-up stagger-2">
        <SectionHeader
          title="New job requests"
          sub={requests.length ? `${requests.length} customer${requests.length > 1 ? "s" : ""} waiting for your response` : "No pending requests right now"}
          action={
            <Link href="/worker/jobs" className="text-sm font-bold text-forest-700 hover:underline inline-flex items-center gap-1">
              All jobs <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          }
        />
        {requests.length === 0 ? (
          <Card className="p-10 text-center text-mist">
            <p className="font-semibold">You&apos;re all caught up.</p>
            <p className="text-sm mt-1">New requests appear here instantly — book a demo service from the customer app to see one.</p>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {requests.map((b) => (
              <JobRequestCard
                key={b.id}
                booking={b}
                onAccept={(id) => {
                  acceptJob(id);
                  toast("Job accepted — the customer has been notified");
                }}
                onDecline={(id) => {
                  declineJob(id);
                  toast("Request declined", "info");
                }}
              />
            ))}
          </div>
        )}
      </section>

      {/* upcoming */}
      {upcoming.length > 0 && (
        <section className="anim-fade-up stagger-3">
          <SectionHeader title="Upcoming / ongoing jobs" />
          <div className="grid md:grid-cols-2 gap-4">
            {upcoming.map((b) => (
              <Card key={b.id} className="p-5 border-l-4 border-l-azure-500">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-bold">{b.customerName}</p>
                    <p className="text-sm text-mist mt-0.5">{b.service} · {b.date}, {b.time}</p>
                    {b.notes && <p className="text-xs text-mist mt-2 bg-paper border border-line rounded-lg px-3 py-2">“{b.notes}”</p>}
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-[11px] uppercase tracking-wide font-semibold text-mist">You earn</p>
                    <p className="font-extrabold text-forest-700">{inr(split(b.amount).worker)}</p>
                  </div>
                </div>
                <div className="flex gap-2.5 mt-4">
                  <Link href={`/worker/jobs/${b.id}`} className="flex-1">
                    <Button size="sm" className="w-full">
                      {b.status === "started" ? "Continue job" : "Open job"} <ArrowRight className="w-3.5 h-3.5" />
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* quick links */}
      <section className="grid sm:grid-cols-3 gap-4 anim-fade-up stagger-4 pb-4">
        {[
          { href: "/worker/earnings", icon: Wallet, title: "Earnings", desc: "Payments, charts & history" },
          { href: "/worker/fair-wage", icon: HandCoins, title: "Fair Wage Report", desc: "See your 85% share transparently" },
          { href: "/worker/welfare", icon: Sparkles, title: "Welfare Benefits", desc: "Insurance, training & support" },
        ].map((q) => (
          <Link key={q.href} href={q.href}>
            <Card className="p-5 h-full hover:shadow-lift hover:-translate-y-0.5 transition-all flex items-center gap-4">
              <span className="w-11 h-11 rounded-xl bg-forest-50 text-forest-600 flex items-center justify-center shrink-0">
                <q.icon className="w-5 h-5" />
              </span>
              <div className="min-w-0">
                <p className="font-bold text-[15px]">{q.title}</p>
                <p className="text-xs text-mist mt-0.5">{q.desc}</p>
              </div>
              <ArrowRight className="w-4 h-4 text-mist ml-auto shrink-0" />
            </Card>
          </Link>
        ))}
      </section>
    </div>
  );
}
