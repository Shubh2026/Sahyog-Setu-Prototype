"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Search, Users } from "lucide-react";
import { Card } from "@/components/ui";
import { ServiceIcon } from "@/components/misc";
import { SERVICES, WORKERS } from "@/lib/data";
import { inr } from "@/lib/utils";

export default function ServicesIndex() {
  const [q, setQ] = useState("");
  const list = SERVICES.filter((s) => s.name.toLowerCase().includes(q.toLowerCase()));

  return (
    <div className="anim-fade-up">
      <h1 className="text-3xl font-extrabold tracking-tight">All services</h1>
      <p className="text-mist mt-1.5">Every professional is a verified member of a labour cooperative society.</p>

      <div className="relative mt-6 max-w-md">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-mist" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search services…"
          className="w-full h-12 rounded-xl border border-line-strong bg-white pl-11 pr-4 text-[15px] focus:border-forest-500 focus:outline-none focus:shadow-glow"
        />
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-7">
        {list.map((s) => {
          const count = WORKERS.filter((w) => w.skillSlug === s.slug).length;
          return (
            <Link key={s.slug} href={`/customer/services/${s.slug}`}>
              <Card className="p-6 h-full hover:shadow-lift hover:-translate-y-1 hover:border-forest-200 transition-all duration-300 group cursor-pointer">
                <span className="w-14 h-14 rounded-2xl bg-forest-50 text-forest-600 flex items-center justify-center group-hover:bg-forest-600 group-hover:text-white transition-colors">
                  <ServiceIcon slug={s.slug} size={26} />
                </span>
                <h3 className="font-bold text-lg mt-4">{s.name}</h3>
                <p className="text-sm text-mist mt-1">{s.desc}</p>
                <div className="flex items-center justify-between mt-5">
                  <span className="text-xs text-mist inline-flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5" /> {count} verified
                  </span>
                  <span className="text-sm font-extrabold text-forest-700">from {inr(s.base)}</span>
                </div>
                <div className="mt-4 pt-4 border-t border-line flex items-center justify-between text-sm font-bold text-forest-700">
                  Browse {s.name.toLowerCase()}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
