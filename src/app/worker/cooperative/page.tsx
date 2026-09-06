"use client";

import React from "react";
import { BadgeCheck, Building2, CalendarDays, HeartHandshake, Mail, MapPin, Phone, Users } from "lucide-react";
import { Badge, Button, Card, SectionHeader } from "@/components/ui";
import { useDemo } from "@/lib/demo-context";
import { COOPERATIVES, WORKERS } from "@/lib/data";

export default function CooperativePage() {
  const { worker, toast } = useDemo();
  const base = WORKERS[0];
  const coop = COOPERATIVES[0];

  return (
    <div className="anim-fade-up max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight">Cooperative Membership</h1>
        <p className="text-mist mt-1">You are part of something bigger — a worker-owned society.</p>
      </div>

      <Card className="overflow-hidden">
        <div className="brand-gradient dot-grid px-7 py-6 text-white flex items-center gap-4">
          <span className="w-14 h-14 rounded-2xl bg-white/15 border border-white/20 backdrop-blur flex items-center justify-center shrink-0">
            <Building2 className="w-7 h-7" />
          </span>
          <div>
            <p className="text-lg font-extrabold tracking-tight leading-snug">{worker?.society || base.society}</p>
            <p className="text-white/75 text-sm mt-0.5">Registered Labour Cooperative · {coop.regNo}</p>
          </div>
        </div>
        <div className="p-6 sm:p-7 grid sm:grid-cols-2 gap-x-8 gap-y-4 text-sm">
          {[
            { icon: BadgeCheck, k: "Membership ID", v: worker?.membershipId || base.membershipId },
            { icon: CalendarDays, k: "Member since", v: base.joined },
            { icon: MapPin, k: "Operating area", v: coop.area },
            { icon: Users, k: "Worker members", v: `${coop.members}` },
          ].map((r) => (
            <div key={r.k} className="flex items-center gap-3 border-b border-line pb-3.5">
              <r.icon className="w-4.5 h-4.5 text-forest-600 shrink-0" />
              <div>
                <p className="text-xs text-mist">{r.k}</p>
                <p className="font-bold">{r.v}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="px-6 sm:px-7 pb-7 flex flex-wrap items-center gap-3">
          <Badge tone="green" icon={BadgeCheck}>Membership verified & active</Badge>
          <Badge tone="azure">{coop.rating} ★ cooperative rating</Badge>
        </div>
      </Card>

      <Card className="p-6 sm:p-7">
        <SectionHeader title="Member benefits" sub="What your 15% welfare contribution makes possible" />
        <ul className="grid sm:grid-cols-2 gap-3 text-sm">
          {[
            "Accident insurance (₹2 lakh cover)",
            "Free quarterly skill-upgradation courses",
            "Annual health check-up camp",
            "Emergency loan facility at low interest",
            "Festival advance & savings scheme",
            "Legal aid for worker disputes",
          ].map((b) => (
            <li key={b} className="flex items-start gap-2.5 rounded-xl bg-leaf-50/60 border border-leaf-100 px-4 py-3">
              <HeartHandshake className="w-4.5 h-4.5 text-leaf-600 shrink-0 mt-0.5" />
              <span className="font-medium">{b}</span>
            </li>
          ))}
        </ul>
      </Card>

      <Card className="p-6 sm:p-7">
        <SectionHeader title="Cooperative contact" />
        <div className="flex flex-wrap gap-4 text-sm">
          <button className="inline-flex items-center gap-2 font-semibold text-forest-700 hover:underline cursor-pointer" onClick={() => toast("Calling office… (demo)", "info")}>
            <Phone className="w-4 h-4" /> 0172-261-0000
          </button>
          <button className="inline-flex items-center gap-2 font-semibold text-forest-700 hover:underline cursor-pointer" onClick={() => toast("Email compose (demo)", "info")}>
            <Mail className="w-4 h-4" /> {coop.contact}
          </button>
          <span className="inline-flex items-center gap-2 text-mist">
            <MapPin className="w-4 h-4" /> Cooperative Bhawan, Sector 17, Chandigarh
          </span>
        </div>
        <Button variant="secondary" className="mt-5" onClick={() => toast("Membership card download (demo)", "info")}>
          Download membership card
        </Button>
      </Card>
    </div>
  );
}
