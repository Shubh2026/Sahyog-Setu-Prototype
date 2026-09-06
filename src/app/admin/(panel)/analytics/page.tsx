"use client";

import React from "react";
import { ArrowRight, BrainCircuit, MapPin, Minus, Sparkles, TrendingUp, Users } from "lucide-react";
import { Badge, Card, SectionHeader } from "@/components/ui";
import { AreaBarChart, DemandLineChart, ServiceDemandChart } from "@/components/charts";
import { DEMAND_BY_AREA, DEMAND_BY_TIME, DEMAND_FORECAST, SERVICE_DEMAND } from "@/lib/data";

export default function AnalyticsPage() {
  return (
    <div className="space-y-6 anim-fade-up">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Demand Analytics</h1>
          <p className="text-mist text-sm mt-1">AI-assisted forecasting for workforce planning</p>
        </div>
        <Badge tone="azure" icon={Sparkles}>Prototype Forecast</Badge>
      </div>

      {/* forecast banner */}
      <div className="rounded-3xl brand-gradient dot-grid text-white p-7 sm:p-8 relative overflow-hidden">
        <div className="absolute -right-10 -bottom-16 w-56 h-56 rounded-full bg-white/10 blur-2xl" />
        <div className="relative flex flex-col lg:flex-row lg:items-center gap-6">
          <span className="w-14 h-14 rounded-2xl bg-white/15 border border-white/20 flex items-center justify-center shrink-0">
            <BrainCircuit className="w-7 h-7" />
          </span>
          <div className="flex-1">
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">AI-Assisted Demand Forecast</h2>
            <p className="text-white/80 text-sm mt-1.5 max-w-2xl leading-relaxed">
              Predicts service demand by category, locality and time so cooperatives can plan worker availability.
              <span className="font-semibold"> This is a demonstration of the planned AI feature — mock data, no real model.</span>
            </p>
          </div>
          <Badge className="bg-white/15 border-white/25 text-white self-start">Updated 1h ago</Badge>
        </div>
      </div>

      {/* forecast cards */}
      <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {DEMAND_FORECAST.map((f) => (
          <Card key={f.service} className="p-5">
            <div className="flex items-center justify-between">
              <p className="font-bold">{f.service}</p>
              {f.change > 0 ? (
                <Badge tone="green" icon={TrendingUp}>↑ {f.change}%</Badge>
              ) : (
                <Badge tone="grey" icon={Minus}>Stable</Badge>
              )}
            </div>
            <p className="text-3xl font-extrabold tracking-tight mt-3">{f.tomorrow}</p>
            <p className="text-xs text-mist">expected requests tomorrow</p>
            <p className="text-xs text-mist mt-3 leading-relaxed border-t border-line pt-3">{f.note}</p>
          </Card>
        ))}
      </div>

      {/* workforce allocation */}
      <Card className="p-6 border-l-4 border-l-azure-500">
        <div className="flex flex-wrap items-start gap-4 justify-between">
          <div className="flex items-start gap-4">
            <span className="w-11 h-11 rounded-xl bg-azure-50 text-azure-500 flex items-center justify-center shrink-0">
              <Users className="w-5 h-5" />
            </span>
            <div>
              <p className="font-bold">Workforce allocation recommendation (prototype)</p>
              <p className="text-sm text-mist mt-1 leading-relaxed max-w-2xl">
                3 additional electricians are likely to be needed in <span className="font-semibold text-ink">Sector 17</span> tomorrow
                between <span className="font-semibold text-ink">4–7 PM</span>. Notify available members to accept jobs in that window.
              </p>
            </div>
          </div>
          <Badge tone="azure" icon={MapPin}>Sector 17–22 cluster</Badge>
        </div>
      </Card>

      <div className="grid xl:grid-cols-2 gap-5">
        <Card className="p-6">
          <SectionHeader title="Demand by time of day" sub="Average requests · this week" />
          <DemandLineChart data={DEMAND_BY_TIME} />
        </Card>
        <Card className="p-6">
          <SectionHeader title="Demand by locality" sub="Request hotspots · this week" />
          <AreaBarChart data={DEMAND_BY_AREA} />
        </Card>
      </div>

      <Card className="p-6">
        <SectionHeader
          title="Demand by service"
          sub="This week across all cooperatives"
          action={
            <span className="text-xs font-bold text-forest-700 inline-flex items-center gap-1">
              Electrical leads <ArrowRight className="w-3.5 h-3.5" />
            </span>
          }
        />
        <ServiceDemandChart data={SERVICE_DEMAND} />
      </Card>
    </div>
  );
}
