"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowUpDown, SlidersHorizontal, Sparkles, Users } from "lucide-react";
import { Badge, Card, Select, Toggle } from "@/components/ui";
import { WorkerCard } from "@/components/cards";
import { ServiceIcon } from "@/components/misc";
import { SERVICES, WORKERS, type ServiceSlug } from "@/lib/data";

const PROFESSION: Record<ServiceSlug, string> = {
  electrical: "Electrician",
  plumbing: "Plumber",
  cleaning: "Cleaner",
  carpentry: "Carpenter",
  painting: "Painter",
  caregiving: "Caregiver",
  gardening: "Gardener",
  "appliance-repair": "Appliance Repair Technician",
};

const plural = (p: string) => (p === "Appliance Repair Technician" ? p + "s" : p + "s");

export default function ServiceListing({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = React.use(params);
  const service = SERVICES.find((s) => s.slug === slug);
  const [sort, setSort] = useState("smart");
  const [onlyAvailable, setOnlyAvailable] = useState(false);
  const [minExp, setMinExp] = useState("0");

  const workers = useMemo(() => {
    let list = WORKERS.filter((w) => w.skillSlug === slug);
    if (onlyAvailable) list = list.filter((w) => w.availableToday);
    list = list.filter((w) => w.experience >= Number(minExp));
    const sorted = [...list];
    if (sort === "distance") sorted.sort((a, b) => a.distance - b.distance);
    if (sort === "rating") sorted.sort((a, b) => b.rating - a.rating);
    if (sort === "price-low") sorted.sort((a, b) => a.price - b.price);
    if (sort === "price-high") sorted.sort((a, b) => b.price - a.price);
    if (sort === "experience") sorted.sort((a, b) => b.experience - a.experience);
    if (sort === "smart")
      sorted.sort(
        (a, b) =>
          b.rating * 2 + (b.availableToday ? 1.5 : 0) - b.distance * 0.4 - (a.rating * 2 + (a.availableToday ? 1.5 : 0) - a.distance * 0.4)
      );
    return sorted;
  }, [slug, sort, onlyAvailable, minExp]);

  if (!service) {
    return (
      <div className="text-center py-20">
        <p className="font-bold text-lg">Unknown service</p>
        <Link href="/customer/services" className="text-forest-700 font-semibold text-sm hover:underline">
          Browse all services
        </Link>
      </div>
    );
  }

  return (
    <div className="anim-fade-up">
      <Link href="/customer" className="inline-flex items-center gap-1.5 text-sm font-semibold text-mist hover:text-ink">
        <ArrowLeft className="w-4 h-4" /> Home
      </Link>

      <div className="flex items-center gap-4 mt-4">
        <span className="w-14 h-14 rounded-2xl bg-forest-600 text-white flex items-center justify-center shadow-lift shrink-0">
          <ServiceIcon slug={service.slug} size={26} />
        </span>
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">{plural(PROFESSION[service.slug])} near you</h1>
          <p className="text-mist text-sm mt-0.5 inline-flex items-center gap-1.5">
            <Users className="w-4 h-4" /> {workers.length} verified cooperative professionals · Chandigarh
          </p>
        </div>
      </div>

      {/* filters */}
      <Card className="mt-6 p-4 flex flex-wrap items-center gap-x-6 gap-y-3">
        <span className="inline-flex items-center gap-2 text-sm font-bold text-ink">
          <SlidersHorizontal className="w-4 h-4 text-forest-600" /> Filters
        </span>
        <label className="inline-flex items-center gap-2.5 text-sm font-semibold text-mist cursor-pointer">
          <ArrowUpDown className="w-4 h-4" /> Sort
          <Select value={sort} onChange={(e) => setSort(e.target.value)} className="h-10 w-44 text-[13px]">
            <option value="smart">Smart match (AI)</option>
            <option value="distance">Distance</option>
            <option value="rating">Rating</option>
            <option value="price-low">Price: low → high</option>
            <option value="price-high">Price: high → low</option>
            <option value="experience">Experience</option>
          </Select>
        </label>
        <label className="inline-flex items-center gap-2.5 text-sm font-semibold text-mist">
          Min. experience
          <Select value={minExp} onChange={(e) => setMinExp(e.target.value)} className="h-10 w-32 text-[13px]">
            <option value="0">Any</option>
            <option value="3">3+ yrs</option>
            <option value="5">5+ yrs</option>
            <option value="8">8+ yrs</option>
          </Select>
        </label>
        <label className="inline-flex items-center gap-2.5 text-sm font-semibold text-mist cursor-pointer">
          <Toggle on={onlyAvailable} onChange={setOnlyAvailable} label="Available today only" />
          Available today
        </label>
      </Card>

      <div className="mt-4 rounded-2xl bg-azure-50 border border-azure-100 px-5 py-3.5 flex items-start gap-3 text-[13px] text-azure-700">
        <Sparkles className="w-4 h-4 mt-0.5 shrink-0" />
        <p>
          <span className="font-bold">Smart Matching (prototype):</span> workers are ranked by distance, verified skills,
          availability, rating and experience. Only cooperative-verified professionals appear here.
        </p>
      </div>

      {workers.length === 0 ? (
        <Card className="mt-6 p-12 text-center text-mist">
          <p className="font-semibold">No workers match these filters.</p>
          <p className="text-sm mt-1">Try relaxing the availability or experience filter.</p>
        </Card>
      ) : (
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4 mt-6">
          {workers.map((w) => (
            <WorkerCard key={w.id} worker={w} />
          ))}
        </div>
      )}

      <div className="mt-6 flex items-center justify-center">
        <Badge tone="grey">All {workers.length} professionals shown are cooperative-verified members</Badge>
      </div>
    </div>
  );
}
