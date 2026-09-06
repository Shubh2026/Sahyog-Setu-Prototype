"use client";

import React, { useState } from "react";
import { BadgeCheck, Save } from "lucide-react";
import { Badge, Button, Card, Field, Input, SectionHeader, Toggle } from "@/components/ui";
import { useDemo } from "@/lib/demo-context";

export default function SettingsPage() {
  const { toast } = useDemo();
  const [autoAssign, setAutoAssign] = useState(true);
  const [sms, setSms] = useState(true);
  const [publicPricing, setPublicPricing] = useState(true);

  return (
    <div className="space-y-6 anim-fade-up max-w-3xl">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Settings</h1>
        <p className="text-mist text-sm mt-1">Federation console preferences · prototype</p>
      </div>

      <Card className="p-6 sm:p-7">
        <SectionHeader title="Cooperative profile" />
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Society name" className="sm:col-span-2">
            <Input defaultValue="Chandigarh Shramik Labour Cooperative Society" />
          </Field>
          <Field label="Contact email">
            <Input defaultValue="office@cslcs.coop" />
          </Field>
          <Field label="Helpline">
            <Input defaultValue="1800-266-2608" />
          </Field>
          <Field label="Operating area" className="sm:col-span-2">
            <Input defaultValue="Chandigarh (Sectors 8–48), Mohali, Panchkula" />
          </Field>
        </div>
      </Card>

      <Card className="p-6 sm:p-7 space-y-5">
        <SectionHeader title="Platform behaviour" />
        {[
          { label: "Smart auto-assignment", desc: "Suggest best-matched workers to customers (prototype AI)", on: autoAssign, set: setAutoAssign },
          { label: "SMS alerts to workers", desc: "Notify members about new job requests by SMS", on: sms, set: setSms },
          { label: "Public 85/15 pricing display", desc: "Show the fair-wage breakdown on every booking", on: publicPricing, set: setPublicPricing },
        ].map((s) => (
          <div key={s.label} className="flex items-center justify-between gap-4 border-b border-line pb-5 last:border-0 last:pb-0">
            <div>
              <p className="font-bold text-sm">{s.label}</p>
              <p className="text-xs text-mist mt-0.5">{s.desc}</p>
            </div>
            <Toggle on={s.on} onChange={s.set} label={s.label} />
          </div>
        ))}
      </Card>

      <div className="flex items-center gap-4">
        <Button size="lg" onClick={() => toast("Settings saved (demo)")}>
          <Save className="w-4 h-4" /> Save settings
        </Button>
        <Badge tone="green" icon={BadgeCheck}>All changes stay in this demo session</Badge>
      </div>
    </div>
  );
}
