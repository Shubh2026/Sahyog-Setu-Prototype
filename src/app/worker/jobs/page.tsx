"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Briefcase, Star } from "lucide-react";
import { Button, Card, EmptyState, StatusBadge, Tabs } from "@/components/ui";
import { JobRequestCard } from "@/components/cards";
import { useDemo } from "@/lib/demo-context";
import { inr, split } from "@/lib/utils";

export default function WorkerJobs() {
  const { bookings, acceptJob, declineJob, toast } = useDemo();
  const [tab, setTab] = useState("requests");

  const mine = useMemo(() => bookings.filter((b) => b.workerId === "w1"), [bookings]);
  const requests = mine.filter((b) => b.status === "requested");
  const active = mine.filter((b) => ["accepted", "started"].includes(b.status));
  const done = mine.filter((b) => b.status === "completed");

  return (
    <div className="anim-fade-up max-w-4xl mx-auto">
      <h1 className="text-3xl font-extrabold tracking-tight">My Jobs</h1>
      <p className="text-mist mt-1">Requests, active work and completed history</p>

      <Tabs
        className="mt-6"
        active={tab}
        onChange={setTab}
        tabs={[
          { id: "requests", label: "Requests", count: requests.length },
          { id: "active", label: "Active", count: active.length },
          { id: "completed", label: "Completed", count: done.length },
        ]}
      />

      <div className="mt-5 space-y-4">
        {tab === "requests" &&
          (requests.length === 0 ? (
            <Card><EmptyState icon={Briefcase} title="No new requests" sub="New booking requests from customers appear here instantly." /></Card>
          ) : (
            requests.map((b) => (
              <div key={b.id} className="space-y-2">
                <JobRequestCard
                  booking={b}
                  onAccept={(id) => { acceptJob(id); toast("Job accepted"); }}
                  onDecline={(id) => { declineJob(id); toast("Request declined", "info"); }}
                />
                <div className="flex justify-end">
                  <Link href={`/worker/jobs/${b.id}`} className="text-sm font-bold text-forest-700 hover:underline inline-flex items-center gap-1">
                    View full details <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))
          ))}

        {tab === "active" &&
          (active.length === 0 ? (
            <Card><EmptyState icon={Briefcase} title="Nothing in progress" sub="Accept a request to start working." /></Card>
          ) : (
            active.map((b) => (
              <Card key={b.id} className="p-5 border-l-4 border-l-azure-500">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="font-bold">{b.customerName}</p>
                      <StatusBadge status={b.status} />
                    </div>
                    <p className="text-sm text-mist mt-1">{b.service} · {b.date}, {b.time} · {b.address}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[11px] uppercase font-semibold text-mist">You earn</p>
                    <p className="font-extrabold text-forest-700 text-lg">{inr(split(b.amount).worker)}</p>
                  </div>
                </div>
                <Link href={`/worker/jobs/${b.id}`}>
                  <Button size="sm" className="mt-4">{b.status === "started" ? "Continue job" : "Open job"} <ArrowRight className="w-3.5 h-3.5" /></Button>
                </Link>
              </Card>
            ))
          ))}

        {tab === "completed" &&
          (done.length === 0 ? (
            <Card><EmptyState icon={Briefcase} title="No completed jobs yet" sub="Finished jobs and their payments appear here." /></Card>
          ) : (
            done.map((b) => (
              <Card key={b.id} className="p-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="font-bold">{b.customerName}</p>
                      {b.rating && (
                        <span className="inline-flex items-center gap-1 text-xs font-bold bg-sun-50 border border-sun-200 text-sun-600 rounded-full px-2 py-0.5">
                          <Star className="w-3 h-3 fill-amber-400 text-amber-400" /> {b.rating}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-mist mt-1">{b.service} · {b.date}, {b.time}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-extrabold text-lg text-leaf-700">+{inr(split(b.amount).worker)}</p>
                    <p className="text-[11px] text-mist">settled via {b.paymentMethod ?? "UPI"}</p>
                  </div>
                </div>
              </Card>
            ))
          ))}
      </div>
    </div>
  );
}
