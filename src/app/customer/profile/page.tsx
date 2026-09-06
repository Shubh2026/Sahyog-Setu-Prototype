"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { BadgeCheck, Home, Landmark, MapPin, Pencil, Plus, RotateCcw, Trash2 } from "lucide-react";
import { Avatar, Badge, Button, Card, Field, Input, Modal, SectionHeader, Select } from "@/components/ui";
import { useDemo } from "@/lib/demo-context";
import { DEMO } from "@/lib/data";
import type { Lang } from "@/lib/i18n";
import { maskMobile } from "@/lib/utils";

const SAVED = [
  { label: "Home", value: "H.No. 1247, Sector 17, Chandigarh", icon: Home },
  { label: "Parents' home", value: "Flat 62B, Sector 45, Chandigarh", icon: Landmark },
  { label: "Office", value: "IT Park, Phase 8B, Mohali", icon: MapPin },
];

export default function CustomerProfile() {
  const router = useRouter();
  const { customer, registerCustomer, lang, setLang, resetDemo, toast } = useDemo();
  const [editOpen, setEditOpen] = useState(false);
  const [form, setForm] = useState({ name: "", gender: "", address: "", city: "Chandigarh", lang: "en" as Lang });

  const name = customer?.name || "Rahul Sharma";

  const openEdit = () => {
    setForm({
      name: customer?.name || "Rahul Sharma",
      gender: customer?.gender || "Male",
      address: customer?.address || "H.No. 1247, Sector 17",
      city: customer?.city || "Chandigarh",
      lang: customer?.lang || "en",
    });
    setEditOpen(true);
  };

  const save = () => {
    registerCustomer({
      name: form.name,
      gender: form.gender,
      address: form.address,
      city: form.city,
      lang: form.lang,
      mobile: customer?.mobile || DEMO.customerMobile,
    });
    setLang(form.lang);
    setEditOpen(false);
    toast("Profile updated");
  };

  return (
    <div className="anim-fade-up max-w-3xl mx-auto space-y-6">
      <Card className="overflow-hidden">
        <div className="h-24 brand-gradient dot-grid" />
        <div className="px-6 sm:px-8 pb-7 flex flex-wrap items-end gap-5 -mt-10">
          <div className="ring-4 ring-white rounded-full shadow-lift">
            <Avatar name={name} photo="/avatars/rahul.jpg" initials="RS" size={88} />
          </div>
          <div className="flex-1 min-w-[180px] pb-1">
            <h1 className="text-2xl font-extrabold tracking-tight">{name}</h1>
            <p className="text-mist text-sm mt-0.5">{maskMobile(customer?.mobile || DEMO.customerMobile)} · {customer?.city || "Chandigarh"}</p>
            <div className="flex gap-2 mt-2.5">
              <Badge tone="green" icon={BadgeCheck}>Verified customer</Badge>
              <Badge tone="grey">Member since Jan 2026</Badge>
            </div>
          </div>
          <Button variant="secondary" onClick={openEdit} className="pb-0.5">
            <Pencil className="w-4 h-4" /> Edit Profile
          </Button>
        </div>
      </Card>

      <Card className="p-6">
        <SectionHeader title="Account details" />
        <dl className="grid sm:grid-cols-2 gap-x-8 gap-y-4 text-sm">
          {[
            ["Full name", name],
            ["Gender", customer?.gender || "—"],
            ["Mobile", maskMobile(customer?.mobile || DEMO.customerMobile)],
            ["Default address", customer?.address || "H.No. 1247, Sector 17"],
            ["City", customer?.city || "Chandigarh"],
            ["Preferred language", (customer?.lang || lang) === "hi" ? "हिन्दी" : "English"],
          ].map(([k, v]) => (
            <div key={k} className="flex justify-between gap-4 border-b border-line pb-3">
              <dt className="text-mist">{k}</dt>
              <dd className="font-semibold text-right">{v}</dd>
            </div>
          ))}
        </dl>
      </Card>

      <Card className="p-6">
        <SectionHeader
          title="Saved addresses"
          action={<Button size="sm" variant="secondary" onClick={() => toast("Address form would open (demo)", "info")}><Plus className="w-4 h-4" /> Add</Button>}
        />
        <div className="space-y-2.5">
          {SAVED.map((a) => (
            <div key={a.label} className="flex items-center gap-4 rounded-xl border border-line px-4 py-3.5">
              <span className="w-10 h-10 rounded-xl bg-forest-50 text-forest-600 flex items-center justify-center shrink-0">
                <a.icon className="w-4.5 h-4.5" />
              </span>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-sm">{a.label}</p>
                <p className="text-xs text-mist truncate">{a.value}</p>
              </div>
              <button className="text-mist hover:text-red-500 transition-colors cursor-pointer" aria-label={`Remove ${a.label}`} onClick={() => toast("Address removed (demo)", "info")}>
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-6">
        <SectionHeader title="Demo controls" sub="Utilities for the SIH presentation" />
        <div className="flex flex-wrap gap-3">
          <Button variant="secondary" onClick={() => router.push("/login")}>Switch role</Button>
          <Button
            variant="danger"
            onClick={() => {
              resetDemo();
              toast("Demo data reset", "info");
              router.push("/login");
            }}
          >
            <RotateCcw className="w-4 h-4" /> Reset demo data
          </Button>
        </div>
      </Card>

      <Modal open={editOpen} onClose={() => setEditOpen(false)} title="Edit profile">
        <div className="space-y-4">
          <Field label="Full name">
            <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </Field>
          <Field label="Gender">
            <Select value={form.gender} onChange={(e) => setForm({ ...form, gender: e.target.value })}>
              <option>Female</option>
              <option>Male</option>
              <option>Prefer not to say</option>
            </Select>
          </Field>
          <Field label="Default address">
            <Input value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="City">
              <Select value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })}>
                <option>Chandigarh</option>
                <option>Mohali</option>
                <option>Panchkula</option>
                <option>Lucknow</option>
              </Select>
            </Field>
            <Field label="Language">
              <Select value={form.lang} onChange={(e) => setForm({ ...form, lang: e.target.value as Lang })}>
                <option value="en">English</option>
                <option value="hi">हिन्दी</option>
              </Select>
            </Field>
          </div>
          <Button className="w-full" size="lg" onClick={save}>Save changes</Button>
        </div>
      </Modal>
    </div>
  );
}
