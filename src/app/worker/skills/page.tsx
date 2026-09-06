"use client";

import React from "react";
import { Award, BadgeCheck, Plus, ShieldCheck } from "lucide-react";
import { Badge, Button, Card, SectionHeader } from "@/components/ui";
import { useDemo } from "@/lib/demo-context";
import { WORKERS } from "@/lib/data";

export default function SkillsPage() {
  const { worker, toast } = useDemo();
  const base = WORKERS[0];
  const skills = worker?.skills?.length
    ? worker.skills.map((s) => ({ name: s, verified: true }))
    : base.skills.map((s) => ({ name: s, verified: true }));

  return (
    <div className="anim-fade-up max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight">Skills & Certificates</h1>
        <p className="text-mist mt-1">Verified by your cooperative — this builds customer trust.</p>
      </div>

      <Card className="p-6 sm:p-7">
        <SectionHeader
          title="Verified skills"
          action={<Button size="sm" variant="secondary" onClick={() => toast("Add-skill request sent to cooperative (demo)", "info")}><Plus className="w-4 h-4" /> Add skill</Button>}
        />
        <div className="grid sm:grid-cols-2 gap-3">
          {skills.map((s) => (
            <div key={s.name} className="flex items-center gap-3.5 rounded-xl border border-line px-4 py-3.5 hover:border-forest-200 transition-colors">
              <span className="w-10 h-10 rounded-xl bg-forest-50 text-forest-600 flex items-center justify-center shrink-0">
                <Award className="w-5 h-5" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-bold text-sm truncate">{s.name}</p>
                <p className="text-xs text-leaf-700 font-semibold inline-flex items-center gap-1 mt-0.5">
                  <ShieldCheck className="w-3.5 h-3.5" /> Verified by Cooperative
                </p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-6 sm:p-7">
        <SectionHeader title="Certificates" />
        <div className="grid sm:grid-cols-3 gap-4">
          {base.certificates.map((c) => (
            <div key={c.name} className="rounded-2xl border border-line p-5 bg-paper/50">
              <Badge tone="green" icon={BadgeCheck}>Verified</Badge>
              <p className="font-bold text-sm mt-3 leading-snug">{c.name}</p>
              <p className="text-xs text-mist mt-1.5">Issued by {c.issuer}</p>
              <p className="text-[11px] text-mist mt-3">Verified by {base.societyShort}</p>
            </div>
          ))}
        </div>
        <div className="mt-6 rounded-xl bg-azure-50 border border-azure-100 px-5 py-4 flex items-start gap-3 text-[13px] text-azure-700">
          <BadgeCheck className="w-4.5 h-4.5 shrink-0 mt-0.5" />
          <p>
            <span className="font-bold">Add more certificates:</span> upload NSDC / ITI / Skill India certificates — your
            cooperative verifies them within 2–3 days and they appear on your public profile.
          </p>
        </div>
        <Button variant="secondary" className="mt-4" onClick={() => toast("Certificate upload (demo)", "info")}>
          <Plus className="w-4 h-4" /> Upload certificate
        </Button>
      </Card>
    </div>
  );
}
