"use client";

import React, { useRef } from "react";
import {
  Zap, Wrench, Sparkles, Hammer, PaintRoller, HeartHandshake, Sprout, PlugZap,
  ShieldCheck, Home, Navigation, Check, type LucideIcon,
} from "lucide-react";
import { cn, inr, split, WORKER_SHARE } from "@/lib/utils";
import { ServiceSlug } from "@/lib/data";

/* --------------------------- Service icons ------------------------- */
export const SERVICE_ICONS: Record<ServiceSlug, LucideIcon> = {
  electrical: Zap,
  plumbing: Wrench,
  cleaning: Sparkles,
  carpentry: Hammer,
  painting: PaintRoller,
  caregiving: HeartHandshake,
  gardening: Sprout,
  "appliance-repair": PlugZap,
};

export function ServiceIcon({
  slug,
  size = 22,
  className,
}: {
  slug: ServiceSlug;
  size?: number;
  className?: string;
}) {
  const Icon = SERVICE_ICONS[slug] ?? Wrench;
  return <Icon style={{ width: size, height: size }} className={className} />;
}

/* ------------------------------ OTP -------------------------------- */
export function OtpInput({ value, onChange, error }: { value: string; onChange: (v: string) => void; error?: boolean }) {
  const refs = useRef<(HTMLInputElement | null)[]>([]);
  const digits = value.padEnd(6, " ").slice(0, 6).split("");

  const handle = (i: number, ch: string) => {
    const clean = ch.replace(/\D/g, "");
    if (!clean) return;
    const next = (value.slice(0, i) + clean + value.slice(i + clean.length)).slice(0, 6);
    onChange(next);
    const focusIdx = Math.min(i + clean.length, 5);
    refs.current[focusIdx]?.focus();
  };

  return (
    <div className="flex gap-2.5" dir="ltr">
      {digits.map((d, i) => (
        <input
          key={i}
          ref={(el) => { refs.current[i] = el; }}
          inputMode="numeric"
          aria-label={`OTP digit ${i + 1}`}
          value={d.trim()}
          onChange={(e) => handle(i, e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Backspace") {
              if (digits[i].trim()) onChange(value.slice(0, i) + value.slice(i + 1));
              else refs.current[i - 1]?.focus();
              e.preventDefault();
            }
            if (e.key === "ArrowLeft") refs.current[i - 1]?.focus();
            if (e.key === "ArrowRight") refs.current[i + 1]?.focus();
          }}
          onPaste={(e) => {
            e.preventDefault();
            const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
            if (pasted) {
              onChange(pasted);
              refs.current[Math.min(pasted.length, 5)]?.focus();
            }
          }}
          className={cn(
            "w-12 h-14 rounded-xl border-2 text-center text-xl font-bold transition-all focus:outline-none",
            error ? "border-red-300 bg-red-50 text-red-600" : "border-line-strong bg-white focus:border-forest-500 focus:shadow-glow"
          )}
        />
      ))}
    </div>
  );
}

/* ------------------------- Price breakdown ------------------------- */
export function PriceBreakdown({ amount, compact = false }: { amount: number; compact?: boolean }) {
  const { worker, welfare } = split(amount);
  return (
    <div className={cn("rounded-2xl border border-line overflow-hidden", compact ? "text-sm" : "")}>
      <div className="bg-white divide-y divide-line">
        <div className="flex justify-between items-center px-5 py-3.5">
          <span className="text-mist">Service charge</span>
          <span className="font-semibold">{inr(amount)}</span>
        </div>
        <div className="flex justify-between items-center px-5 py-3.5">
          <span className="text-mist">Platform fee</span>
          <span className="font-semibold text-leaf-600">₹0</span>
        </div>
        <div className="flex justify-between items-center px-5 py-3.5 bg-leaf-50/60">
          <span className="inline-flex items-center gap-1.5 font-medium text-forest-700">
            <ShieldCheck className="w-4 h-4 text-leaf-500" /> Worker earnings (85%)
          </span>
          <span className="font-bold text-forest-700">{inr(worker)}</span>
        </div>
        <div className="flex justify-between items-center px-5 py-3.5 bg-azure-50/50">
          <span className="text-azure-700 font-medium">Cooperative welfare fund (15%)</span>
          <span className="font-semibold text-azure-700">{inr(welfare)}</span>
        </div>
        <div className="flex justify-between items-center px-5 py-4">
          <span className="font-bold text-[15px]">Total payable</span>
          <span className="font-extrabold text-lg tracking-tight">{inr(amount)}</span>
        </div>
      </div>
      <p className="px-5 py-3 text-xs text-mist bg-paper border-t border-line leading-relaxed">
        <span className="font-semibold text-forest-700">{Math.round(WORKER_SHARE * 100)}% of your service fee goes directly to the worker.</span>{" "}
        The remainder funds insurance, training and welfare through the worker&apos;s cooperative society.
      </p>
    </div>
  );
}

/* --------------------------- Booking timeline ---------------------- */
export function BookingTimeline({ status }: { status: string }) {
  const order = ["confirmed", "accepted", "started", "completed"];
  const current =
    status === "requested" ? 0 : status === "accepted" ? 1 : status === "started" ? 2 : status === "completed" ? 3 : status === "cancelled" ? -1 : 1;
  const steps = [
    { key: "confirmed", label: "Booking confirmed", desc: "Payment received (demo)" },
    { key: "accepted", label: "Worker accepted", desc: "Worker is on the way" },
    { key: "started", label: "Job started", desc: "Work in progress" },
    { key: "completed", label: "Job completed", desc: "Service finished" },
  ];
  return (
    <ol className="space-y-0">
      {steps.map((s, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <li key={s.key} className="flex gap-4">
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center border-2 shrink-0 transition-colors",
                  done
                    ? "bg-leaf-500 border-leaf-500 text-white"
                    : active
                      ? "bg-white border-leaf-500 text-leaf-600 anim-ping-dot"
                      : "bg-white border-line-strong text-mist"
                )}
              >
                {done ? <Check className="w-4 h-4" /> : <span className={cn("w-2.5 h-2.5 rounded-full", active ? "bg-leaf-500" : "bg-line-strong")} />}
              </div>
              {i < steps.length - 1 && <div className={cn("w-0.5 h-9 my-1", i < current ? "bg-leaf-400" : "bg-line")} />}
            </div>
            <div className="pb-8 -mt-0.5">
              <p className={cn("font-semibold text-sm", done || active ? "text-ink" : "text-mist")}>{s.label}</p>
              <p className="text-xs text-mist mt-0.5">{s.desc}</p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}

/* ------------------------------ Map mock --------------------------- */
export function MapMock({ status, eta }: { status: string; eta: number }) {
  const progress =
    status === "requested" ? 12 : status === "accepted" ? 55 : status === "started" ? 100 : status === "completed" ? 100 : 55;
  return (
    <div className="relative h-64 rounded-2xl overflow-hidden border border-line bg-[#e9f0ea]">
      {/* dot terrain */}
      <div className="absolute inset-0 dot-grid-ink opacity-60" />
      {/* streets */}
      <div className="absolute left-0 right-0 top-[30%] h-9 bg-white/80 border-y border-line" />
      <div className="absolute left-0 right-0 bottom-[14%] h-6 bg-white/60" />
      <div className="absolute top-0 bottom-0 left-[24%] w-8 bg-white/80 border-x border-line" />
      <div className="absolute top-0 bottom-0 right-[18%] w-6 bg-white/60" />
      {/* park */}
      <div className="absolute right-[6%] top-[8%] w-20 h-16 rounded-xl bg-leaf-100 border border-leaf-200 flex items-center justify-center">
        <Sprout className="w-5 h-5 text-leaf-500" />
      </div>
      {/* route */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 256" preserveAspectRatio="none" aria-hidden>
        <path
          d="M 28 214 L 96 214 L 96 122 L 300 122 L 300 74 L 336 74"
          fill="none"
          stroke="#22a06b"
          strokeWidth="4"
          strokeLinecap="round"
          className="map-route"
        />
      </svg>
      {/* destination */}
      <div className="absolute" style={{ left: "82%", top: "14%" }}>
        <div className="flex flex-col items-center -translate-x-1/2 -translate-y-1/2">
          <div className="w-9 h-9 rounded-full bg-azure-500 text-white flex items-center justify-center shadow-lift ring-4 ring-white">
            <Home className="w-4 h-4" />
          </div>
          <span className="mt-1 text-[10px] font-bold bg-white/90 rounded-full px-2 py-0.5 shadow-soft text-ink">Your home</span>
        </div>
      </div>
      {/* worker marker */}
      <div
        className="absolute transition-all duration-1000 ease-in-out"
        style={{ left: `${7 + progress * 0.72}%`, top: `${76 - progress * 0.5}%` }}
      >
        <div className="flex flex-col items-center -translate-x-1/2 -translate-y-1/2">
          <div className="relative">
            <span className="absolute inset-0 rounded-full bg-leaf-400/40 anim-ping-dot" />
            <div className="relative w-10 h-10 rounded-full bg-forest-600 text-white flex items-center justify-center shadow-lift ring-4 ring-white">
              <Navigation className="w-4 h-4" />
            </div>
          </div>
          <span className="mt-1 text-[10px] font-bold bg-forest-700 text-white rounded-full px-2 py-0.5 shadow-soft">
            {status === "completed" || status === "started" ? "Arrived" : `${eta} min`}
          </span>
        </div>
      </div>
      <div className="absolute left-3 top-3 rounded-full bg-white/90 backdrop-blur px-3 py-1.5 text-[11px] font-bold text-forest-700 shadow-soft border border-line">
        Live tracking · demo map
      </div>
    </div>
  );
}
