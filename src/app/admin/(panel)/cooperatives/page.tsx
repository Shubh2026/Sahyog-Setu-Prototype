"use client";

import React from "react";
import { Building2, Mail, MapPin, Plus, Star, Users } from "lucide-react";
import { Badge, Button, Card } from "@/components/ui";
import { useDemo } from "@/lib/demo-context";
import { COOPERATIVES } from "@/lib/data";

export default function CooperativesPage() {
  const { toast } = useDemo();

  return (
    <div className="space-y-6 anim-fade-up">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Cooperatives</h1>
          <p className="text-mist text-sm mt-1">Registered labour cooperative societies on the platform</p>
        </div>
        <Button onClick={() => toast("Cooperative onboarding form (demo)", "info")}>
          <Plus className="w-4 h-4" /> Add cooperative
        </Button>
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        {COOPERATIVES.map((c) => (
          <Card key={c.short} className="p-6 hover:shadow-lift transition-shadow">
            <div className="flex items-start gap-4">
              <span className="w-13 h-13 w-14 h-14 rounded-2xl bg-forest-50 text-forest-600 flex items-center justify-center shrink-0">
                <Building2 className="w-6.5 h-6.5 w-7 h-7" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-extrabold tracking-tight leading-snug">{c.name}</p>
                <p className="text-xs text-mist mt-1">Registration {c.regNo}</p>
                <div className="flex flex-wrap gap-2 mt-3">
                  <Badge tone="green" icon={Users}>{c.members} members</Badge>
                  <Badge tone="azure" icon={MapPin}>{c.area}</Badge>
                  <Badge tone="amber" icon={Star}>{c.rating}</Badge>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between mt-5 pt-4 border-t border-line">
              <span className="inline-flex items-center gap-2 text-sm text-mist">
                <Mail className="w-4 h-4" /> {c.contact}
              </span>
              <Button size="sm" variant="secondary" onClick={() => toast(`${c.short} report would open (demo)`, "info")}>
                View report
              </Button>
            </div>
          </Card>
        ))}
      </div>

      <p className="text-xs text-mist">Prototype registry — demo societies only.</p>
    </div>
  );
}
