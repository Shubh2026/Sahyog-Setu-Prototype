"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft, ArrowRight, Award, BadgeCheck, Building2, CalendarCheck2, CheckCircle2,
  HandCoins, MapPin, ShieldCheck, Star,
} from "lucide-react";
import { Avatar, Badge, Button, Card, Stars, VerifiedBadge } from "@/components/ui";
import { WORKERS } from "@/lib/data";
import { inr, split, WORKER_SHARE } from "@/lib/utils";

export default function WorkerProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params);
  const router = useRouter();
  const w = WORKERS.find((x) => x.id === id);

  if (!w) {
    return (
      <div className="text-center py-20">
        <p className="font-bold text-lg">Worker not found</p>
        <Button className="mt-4" onClick={() => router.push("/customer")}>
          Back to home
        </Button>
      </div>
    );
  }

  const { worker, welfare } = split(w.price);
  const others = WORKERS.filter((x) => x.skillSlug === w.skillSlug && x.id !== w.id).slice(0, 3);

  return (
    <div className="anim-fade-up pb-24 lg:pb-0">
      <Link href={`/customer/services/${w.skillSlug}`} className="inline-flex items-center gap-1.5 text-sm font-semibold text-mist hover:text-ink">
        <ArrowLeft className="w-4 h-4" /> Back to {w.skill}s
      </Link>

      <div className="grid lg:grid-cols-[1fr_380px] gap-6 mt-5 items-start">
        {/* left column */}
        <div className="space-y-6 min-w-0">
          {/* hero card */}
          <Card className="overflow-hidden">
            <div className="h-28 sm:h-36 brand-gradient dot-grid relative">
              <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/15 to-transparent" />
            </div>
            <div className="px-6 sm:px-8 pb-7">
              <div className="flex flex-wrap items-end gap-5 -mt-12 sm:-mt-14 relative">
                <div className="ring-4 ring-white rounded-full shadow-lift">
                  <Avatar name={w.name} photo={w.photo} initials={w.initials} color={w.color} size={112} />
                </div>
                <div className="flex-1 min-w-[200px] pb-1">
                  <VerifiedBadge />
                  <h1 className="text-[26px] font-extrabold tracking-tight mt-2">{w.name}</h1>
                  <p className="text-mist font-medium">
                    {w.skill} · {w.experience} years experience
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-7">
                {[
                  { icon: Star, label: "Rating", value: `${w.rating} / 5`, sub: `${w.reviews} reviews` },
                  { icon: MapPin, label: "Distance", value: `${w.distance} km`, sub: w.area },
                  { icon: CalendarCheck2, label: "Jobs done", value: `${w.jobsDone}+`, sub: `${w.completionRate}% completion` },
                  { icon: ShieldCheck, label: "Identity", value: "Verified", sub: "by cooperative" },
                ].map((s) => (
                  <div key={s.label} className="rounded-2xl border border-line bg-paper px-4 py-3.5">
                    <p className="text-[11px] uppercase tracking-wide font-bold text-mist inline-flex items-center gap-1">
                      <s.icon className="w-3.5 h-3.5" /> {s.label}
                    </p>
                    <p className="font-extrabold text-lg mt-1 tracking-tight">{s.value}</p>
                    <p className="text-xs text-mist">{s.sub}</p>
                  </div>
                ))}
              </div>

              <p className="text-[15px] leading-relaxed text-ink/80 mt-6">{w.about}</p>
              <div className="flex flex-wrap gap-2 mt-4">
                {w.languages.map((l) => (
                  <Badge key={l} tone="grey">{l}</Badge>
                ))}
                {w.availableToday ? (
                  <Badge tone="azure">
                    <span className="w-1.5 h-1.5 rounded-full bg-azure-500 anim-ping-dot" /> Available today
                  </Badge>
                ) : (
                  <Badge tone="amber">Next slot: tomorrow</Badge>
                )}
              </div>
            </div>
          </Card>

          {/* cooperative membership */}
          <Card className="p-6 sm:p-7">
            <div className="flex items-start gap-4">
              <span className="w-12 h-12 rounded-2xl bg-forest-50 text-forest-600 flex items-center justify-center shrink-0">
                <Building2 className="w-6 h-6" />
              </span>
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2.5">
                  <h2 className="font-bold text-lg tracking-tight">Cooperative Membership</h2>
                  <Badge tone="green" icon={BadgeCheck}>Verified member</Badge>
                </div>
                <p className="text-[15px] font-semibold mt-2">{w.society}</p>
                <div className="grid sm:grid-cols-3 gap-3 mt-4 text-sm">
                  <div className="rounded-xl bg-paper border border-line px-4 py-3">
                    <p className="text-xs text-mist font-medium">Membership ID</p>
                    <p className="font-bold mt-0.5">{w.membershipId}</p>
                  </div>
                  <div className="rounded-xl bg-paper border border-line px-4 py-3">
                    <p className="text-xs text-mist font-medium">Member since</p>
                    <p className="font-bold mt-0.5">{w.joined}</p>
                  </div>
                  <div className="rounded-xl bg-paper border border-line px-4 py-3">
                    <p className="text-xs text-mist font-medium">Skill verification</p>
                    <p className="font-bold mt-0.5 text-leaf-700">✓ By cooperative</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* skills & certs */}
          <Card className="p-6 sm:p-7">
            <h2 className="font-bold text-lg tracking-tight flex items-center gap-2.5">
              <Award className="w-5 h-5 text-forest-600" /> Skills & Certificates
            </h2>
            <div className="flex flex-wrap gap-2.5 mt-4">
              {w.skills.map((s) => (
                <span key={s} className="inline-flex items-center gap-1.5 rounded-full bg-forest-50 border border-forest-100 text-forest-700 px-3.5 py-2 text-sm font-semibold">
                  <CheckCircle2 className="w-4 h-4" /> {s}
                </span>
              ))}
            </div>
            <div className="grid sm:grid-cols-3 gap-3 mt-5">
              {w.certificates.map((c) => (
                <div key={c.name} className="rounded-xl border border-line p-4 hover:border-forest-200 transition-colors">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-leaf-500" />
                    <span className="text-[11px] font-bold uppercase tracking-wide text-leaf-700">Verified</span>
                  </div>
                  <p className="font-bold text-sm mt-2 leading-snug">{c.name}</p>
                  <p className="text-xs text-mist mt-1">{c.issuer}</p>
                </div>
              ))}
            </div>
          </Card>

          {/* reviews */}
          <Card className="p-6 sm:p-7">
            <div className="flex items-center justify-between">
              <h2 className="font-bold text-lg tracking-tight">Reviews</h2>
              <span className="inline-flex items-center gap-1.5 font-extrabold text-lg">
                <Star className="w-5 h-5 fill-amber-400 text-amber-400" /> {w.rating}
                <span className="text-sm font-semibold text-mist">· {w.reviews} reviews</span>
              </span>
            </div>
            <div className="divide-y divide-line mt-2">
              {w.reviewsList.map((r, i) => (
                <div key={i} className="py-5 first:pt-4">
                  <div className="flex items-center justify-between">
                    <p className="font-bold text-sm">{r.name}</p>
                    <span className="text-xs text-mist">{r.date}</span>
                  </div>
                  <Stars value={r.rating} className="mt-1.5" />
                  <p className="text-sm text-ink/80 mt-2 leading-relaxed">{r.text}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* right column — booking + fair wage */}
        <div className="space-y-5 lg:sticky lg:top-24">
          <Card className="p-6 border-forest-200 bg-gradient-to-b from-forest-50/60 to-white">
            <div className="flex items-baseline justify-between">
              <p className="text-sm font-semibold text-mist">Starting at</p>
              <p className="text-3xl font-extrabold tracking-tight">
                {inr(w.price)}<span className="text-sm font-semibold text-mist"> / visit</span>
              </p>
            </div>
            <Link href={`/customer/book/${w.id}`}>
              <Button size="lg" className="w-full mt-4">
                Book Now <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <p className="text-xs text-mist text-center mt-3">Free cancellation up to 2 hours before the visit</p>
          </Card>

          {/* fair wage card */}
          <Card className="overflow-hidden border-2 border-leaf-200">
            <div className="bg-leaf-50 px-6 py-4 flex items-center gap-2.5 border-b border-leaf-100">
              <HandCoins className="w-5 h-5 text-leaf-600" />
              <h3 className="font-bold text-leaf-700">Fair wage transparency</h3>
            </div>
            <div className="p-6">
              <p className="text-sm text-mist leading-relaxed">Your payment supports fair worker earnings:</p>
              <div className="mt-4 space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-mist">Customer pays</span>
                  <span className="font-bold">{inr(w.price)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-forest-700">Worker receives</span>
                  <span className="font-extrabold text-forest-700 text-lg">{inr(worker)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-azure-700">Cooperative welfare</span>
                  <span className="font-semibold text-azure-700">{inr(welfare)}</span>
                </div>
              </div>
              {/* split bar */}
              <div className="mt-5">
                <div className="h-3.5 rounded-full overflow-hidden flex shadow-inner">
                  <div className="bg-gradient-to-r from-leaf-400 to-forest-600" style={{ width: `${WORKER_SHARE * 100}%` }} />
                  <div className="bg-azure-400 flex-1" />
                </div>
                <div className="flex justify-between mt-2 text-[11px] font-bold">
                  <span className="text-forest-700">Worker share {Math.round(WORKER_SHARE * 100)}%</span>
                  <span className="text-azure-600">Welfare {100 - Math.round(WORKER_SHARE * 100)}%</span>
                </div>
              </div>
              <p className="mt-4 text-xs text-mist leading-relaxed bg-paper border border-line rounded-xl px-3.5 py-2.5">
                Welfare funds insurance, training and emergency support — managed by {w.societyShort}.
              </p>
            </div>
          </Card>

          {/* similar workers */}
          {others.length > 0 && (
            <Card className="p-5">
              <h3 className="font-bold text-sm text-mist uppercase tracking-wide">Similar verified {w.skill}s</h3>
              <div className="mt-3 space-y-1">
                {others.map((o) => (
                  <Link key={o.id} href={`/customer/workers/${o.id}`} className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-forest-50 transition-colors">
                    <Avatar name={o.name} photo={o.photo} initials={o.initials} color={o.color} size={40} />
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-sm truncate">{o.name}</p>
                      <p className="text-xs text-mist">{o.distance} km · {inr(o.price)}</p>
                    </div>
                    <span className="inline-flex items-center gap-1 text-sm font-bold shrink-0">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" /> {o.rating}
                    </span>
                  </Link>
                ))}
              </div>
            </Card>
          )}
        </div>
      </div>

      {/* mobile sticky CTA */}
      <div className="fixed bottom-0 inset-x-0 lg:hidden bg-white border-t border-line px-5 py-3.5 flex items-center gap-4 z-40">
        <div>
          <p className="text-[11px] text-mist font-semibold">Starting at</p>
          <p className="font-extrabold text-lg leading-none">{inr(w.price)}</p>
        </div>
        <Link href={`/customer/book/${w.id}`} className="flex-1">
          <Button size="lg" className="w-full">Book Now</Button>
        </Link>
      </div>
    </div>
  );
}
