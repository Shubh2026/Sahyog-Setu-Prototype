"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Award, BadgeCheck, Building2, MapPin, Pencil, ShieldCheck, Star, Wallet } from "lucide-react";
import { Avatar, Badge, Button, Card, SectionHeader } from "@/components/ui";
import { useDemo } from "@/lib/demo-context";
import { DEMO, WORKERS } from "@/lib/data";
import { maskMobile } from "@/lib/utils";

export default function WorkerProfile() {
  const { worker, toast } = useDemo();
  const base = WORKERS[0]; // Ramesh demo identity

  const name = worker?.name || base.name;
  const skills = worker?.skills?.length ? worker.skills : base.skills;
  const society = worker?.society || base.society;
  const membershipId = worker?.membershipId || base.membershipId;
  const area = worker?.serviceArea || `${base.area}, ${base.city}`;

  return (
    <div className="anim-fade-up max-w-4xl mx-auto space-y-6">
      <Card className="overflow-hidden">
        <div className="h-28 brand-gradient dot-grid" />
        <div className="px-6 sm:px-8 pb-7">
          <div className="flex flex-wrap items-end gap-5 -mt-12">
            <div className="ring-4 ring-white rounded-full shadow-lift">
              <Avatar name={name} photo="/avatars/ramesh.jpg" initials="RK" size={104} />
            </div>
            <div className="flex-1 min-w-[200px] pb-1">
              <h1 className="text-2xl font-extrabold tracking-tight">{name}</h1>
              <p className="text-mist text-sm mt-0.5">
                {skills[0] ?? "Electrician"} · {worker?.experience || `${base.experience} years experience`}
              </p>
              <div className="flex flex-wrap gap-2 mt-2.5">
                <Badge tone="green" icon={ShieldCheck}>Identity Verified</Badge>
                <Badge tone="green" icon={BadgeCheck}>Cooperative Verified</Badge>
              </div>
            </div>
            <Button variant="secondary" onClick={() => toast("Edit profile (demo)", "info")}>
              <Pencil className="w-4 h-4" /> Edit Profile
            </Button>
          </div>
        </div>
      </Card>

      <div className="grid sm:grid-cols-3 gap-4">
        {[
          { icon: Star, k: "Rating", v: String(base.rating), s: `${base.reviews} reviews` },
          { icon: BadgeCheck, k: "Jobs completed", v: `${base.jobsDone}`, s: `${base.completionRate}% completion` },
          { icon: MapPin, k: "Service area", v: area, s: maskMobile(worker?.mobile || DEMO.workerMobile) },
        ].map((s) => (
          <Card key={s.k} className="p-5">
            <s.icon className="w-5 h-5 text-forest-600" />
            <p className="text-xs font-bold uppercase tracking-widest text-mist mt-3">{s.k}</p>
            <p className="font-extrabold text-lg mt-1 tracking-tight truncate">{s.v}</p>
            <p className="text-xs text-mist mt-0.5">{s.s}</p>
          </Card>
        ))}
      </div>

      <Card className="p-6">
        <SectionHeader
          title="Skills"
          action={
            <Link href="/worker/skills" className="text-sm font-bold text-forest-700 hover:underline inline-flex items-center gap-1">
              Manage <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          }
        />
        <div className="flex flex-wrap gap-2.5">
          {skills.map((s) => (
            <span key={s} className="inline-flex items-center gap-1.5 rounded-full bg-forest-50 border border-forest-100 text-forest-700 px-3.5 py-2 text-sm font-semibold">
              <Award className="w-4 h-4" /> {s}
            </span>
          ))}
        </div>
      </Card>

      <div className="grid sm:grid-cols-2 gap-4">
        <Card className="p-6">
          <div className="flex items-center gap-3">
            <span className="w-11 h-11 rounded-xl bg-forest-50 text-forest-600 flex items-center justify-center">
              <Building2 className="w-5 h-5" />
            </span>
            <div>
              <p className="font-bold">Cooperative membership</p>
              <p className="text-xs text-mist">Member since {base.joined}</p>
            </div>
          </div>
          <p className="text-sm font-semibold mt-4">{society}</p>
          <p className="text-sm text-mist mt-1">Membership ID · <span className="font-bold text-ink">{membershipId}</span></p>
          <Link href="/worker/cooperative">
            <Button variant="secondary" size="sm" className="mt-4 w-full">View membership</Button>
          </Link>
        </Card>
        <Card className="p-6">
          <div className="flex items-center gap-3">
            <span className="w-11 h-11 rounded-xl bg-azure-50 text-azure-500 flex items-center justify-center">
              <Wallet className="w-5 h-5" />
            </span>
            <div>
              <p className="font-bold">Payments</p>
              <p className="text-xs text-mist">Where your earnings go</p>
            </div>
          </div>
          <p className="text-sm font-semibold mt-4">{worker?.upi || "ramesh.k@upi"}</p>
          <p className="mt-1"><Badge tone="green" icon={BadgeCheck}>UPI verified (demo)</Badge></p>
          <Button variant="secondary" size="sm" className="mt-4 w-full" onClick={() => toast("UPI change flow (demo)", "info")}>Change UPI</Button>
        </Card>
      </div>
    </div>
  );
}
