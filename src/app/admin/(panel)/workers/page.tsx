"use client";

import React, { useMemo, useState } from "react";
import { BadgeCheck, Eye, Search, Star } from "lucide-react";
import { Avatar, Badge, Button, Card, Modal, Select } from "@/components/ui";
import { useDemo } from "@/lib/demo-context";
import { COOPERATIVES, WORKERS, type WorkerProfile } from "@/lib/data";

export default function WorkersPage() {
  const { adminDecisions, toast } = useDemo();
  const [q, setQ] = useState("");
  const [society, setSociety] = useState("all");
  const [view, setView] = useState<WorkerProfile | null>(null);

  const list = useMemo(
    () =>
      WORKERS.filter(
        (w) =>
          w.name.toLowerCase().includes(q.toLowerCase()) &&
          (society === "all" || w.societyShort === society)
      ),
    [q, society]
  );

  return (
    <div className="space-y-6 anim-fade-up">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Worker Management</h1>
          <p className="text-mist text-sm mt-1">{WORKERS.length} verified members across 4 cooperatives (demo subset)</p>
        </div>
        <Button onClick={() => toast("Onboarding form would open (demo)", "info")}>+ Onboard worker</Button>
      </div>

      <Card className="p-4 flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[220px]">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-mist" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search by name…"
            className="w-full h-11 rounded-xl border border-line bg-paper pl-10 pr-4 text-sm focus:border-forest-500 focus:outline-none focus:bg-white"
          />
        </div>
        <Select value={society} onChange={(e) => setSociety(e.target.value)} className="h-11 w-72 text-sm">
          <option value="all">All cooperatives</option>
          {COOPERATIVES.map((c) => (
            <option key={c.short} value={c.short}>{c.short}</option>
          ))}
        </Select>
      </Card>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[900px]">
            <thead>
              <tr className="text-left text-xs uppercase tracking-wider text-mist bg-paper border-b border-line">
                <th className="px-6 py-3.5 font-bold">Worker</th>
                <th className="px-6 py-3.5 font-bold">Skill</th>
                <th className="px-6 py-3.5 font-bold">Cooperative</th>
                <th className="px-6 py-3.5 font-bold">Rating</th>
                <th className="px-6 py-3.5 font-bold">Jobs</th>
                <th className="px-6 py-3.5 font-bold">Area</th>
                <th className="px-6 py-3.5 font-bold">Status</th>
                <th className="px-6 py-3.5 font-bold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {list.map((w) => {
                const dec = adminDecisions[w.id];
                return (
                  <tr key={w.id} className="hover:bg-forest-50/40 transition-colors">
                    <td className="px-6 py-3.5">
                      <div className="flex items-center gap-3">
                        <Avatar name={w.name} photo={w.photo} initials={w.initials} color={w.color} size={38} />
                        <div>
                          <p className="font-bold">{w.name}</p>
                          <p className="text-xs text-mist">{w.membershipId}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-3.5 text-mist font-medium">{w.skill}</td>
                    <td className="px-6 py-3.5 text-mist">{w.societyShort}</td>
                    <td className="px-6 py-3.5">
                      <span className="inline-flex items-center gap-1 font-bold">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />{w.rating}
                      </span>
                    </td>
                    <td className="px-6 py-3.5 text-mist">{w.jobsDone}</td>
                    <td className="px-6 py-3.5 text-mist">{w.area}</td>
                    <td className="px-6 py-3.5">
                      {dec === "approved" ? (
                        <Badge tone="green" icon={BadgeCheck}>Approved</Badge>
                      ) : dec === "rejected" ? (
                        <Badge tone="red">Suspended</Badge>
                      ) : (
                        <Badge tone={w.availableToday ? "green" : "grey"} icon={BadgeCheck}>
                          {w.availableToday ? "Active" : "On leave"}
                        </Badge>
                      )}
                    </td>
                    <td className="px-6 py-3.5 text-right">
                      <Button size="sm" variant="secondary" onClick={() => setView(w)}>
                        <Eye className="w-3.5 h-3.5" /> View
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      <Modal open={!!view} onClose={() => setView(null)} title="Worker profile" wide>
        {view && (
          <div className="flex flex-col sm:flex-row gap-6">
            <div className="sm:w-48 shrink-0 text-center">
              <Avatar name={view.name} photo={view.photo} initials={view.initials} color={view.color} size={96} className="mx-auto" />
              <p className="font-extrabold text-lg mt-3">{view.name}</p>
              <p className="text-sm text-mist">{view.skill} · {view.experience} yrs</p>
              <Badge tone="green" icon={BadgeCheck} className="mt-2">Cooperative Verified</Badge>
            </div>
            <dl className="flex-1 divide-y divide-line text-sm border border-line rounded-2xl overflow-hidden self-start w-full">
              {[
                ["Cooperative", view.society],
                ["Membership ID", view.membershipId],
                ["Member since", view.joined],
                ["Skills", view.skills.join(", ")],
                ["Rating", `${view.rating} · ${view.reviews} reviews`],
                ["Jobs completed", String(view.jobsDone)],
                ["Area", `${view.area}, ${view.city}`],
              ].map(([k, v]) => (
                <div key={k} className="flex gap-4 px-5 py-3 odd:bg-paper/60">
                  <dt className="w-32 shrink-0 text-mist font-medium">{k}</dt>
                  <dd className="font-semibold">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        )}
      </Modal>
    </div>
  );
}
