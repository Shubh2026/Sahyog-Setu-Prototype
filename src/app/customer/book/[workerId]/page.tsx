"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft, ArrowRight, CalendarDays, Check, CreditCard, Landmark, MapPin, Pencil,
  QrCode, ScanLine, Smartphone, Star, Wallet,
} from "lucide-react";
import { Avatar, Badge, Button, Card, Field, Input, Modal, Select, Textarea, VerifiedBadge } from "@/components/ui";
import { PriceBreakdown, ServiceIcon } from "@/components/misc";
import { useDemo } from "@/lib/demo-context";
import { WORKERS } from "@/lib/data";
import { cn, inr, nextDays } from "@/lib/utils";

const SLOT_GROUPS = [
  { label: "Morning", slots: ["9:00 AM", "10:30 AM", "12:00 PM"] },
  { label: "Afternoon", slots: ["2:00 PM", "3:30 PM", "5:00 PM"] },
  { label: "Evening", slots: ["6:30 PM", "8:00 PM"] },
];

const STEPS = ["Schedule", "Price", "Payment"];

export default function BookingFlow({ params }: { params: Promise<{ workerId: string }> }) {
  const { workerId } = React.use(params);
  const router = useRouter();
  const { customer, createBooking, toast } = useDemo();
  const w = WORKERS.find((x) => x.id === workerId);
  const days = useMemo(() => nextDays(5), []);

  const [step, setStep] = useState(0);
  const [date, setDate] = useState<string>("");
  const [time, setTime] = useState("");
  const [address, setAddress] = useState("");
  const [addrOpen, setAddrOpen] = useState(false);
  const [addrDraft, setAddrDraft] = useState("");
  const [notes, setNotes] = useState("");
  const [method, setMethod] = useState<"upi" | "qr" | "card" | "netbanking">("upi");
  const [paying, setPaying] = useState(false);

  React.useEffect(() => {
    if (days.length && !date) setDate(days[0].key);
    if (!address) setAddress(customer?.address ? `${customer.address}, ${customer.city}` : "H.No. 1247, Sector 17, Chandigarh");
  }, [days, date, address, customer]);

  if (!w) {
    return (
      <div className="text-center py-20">
        <p className="font-bold">Worker not found</p>
        <Button className="mt-4" onClick={() => router.push("/customer")}>Back home</Button>
      </div>
    );
  }

  const dateLabel = days.find((d) => d.key === date);

  const pay = () => {
    setPaying(true);
    window.setTimeout(() => {
      const booking = createBooking({
        workerId: w.id,
        workerName: w.name,
        serviceSlug: w.skillSlug,
        service: w.skill,
        date: dateLabel ? `${dateLabel.label}, ${dateLabel.sub}` : "Today",
        time,
        address,
        notes: notes || undefined,
        distanceKm: w.distance,
        amount: w.price,
        paymentMethod: { upi: "UPI", qr: "UPI (QR)", card: "Card", netbanking: "Net Banking" }[method],
      });
      toast("Payment successful (demo)");
      router.push(`/customer/booking/${booking.id}/confirmed`);
    }, 1700);
  };

  return (
    <div className="max-w-3xl mx-auto anim-fade-up pb-10">
      <Link href={`/customer/workers/${w.id}`} className="inline-flex items-center gap-1.5 text-sm font-semibold text-mist hover:text-ink">
        <ArrowLeft className="w-4 h-4" /> Back to profile
      </Link>

      <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-3">Book {w.skill}</h1>

      {/* stepper */}
      <ol className="flex items-center gap-2 mt-5 mb-6">
        {STEPS.map((s, i) => (
          <li key={s} className="flex items-center gap-2 flex-1 last:flex-none">
            <span className={cn(
              "w-8 h-8 rounded-full text-[13px] font-bold flex items-center justify-center shrink-0",
              i < step ? "bg-leaf-500 text-white" : i === step ? "bg-forest-600 text-white shadow-glow" : "bg-white border border-line-strong text-mist"
            )}>
              {i < step ? <Check className="w-4 h-4" /> : i + 1}
            </span>
            <span className={cn("text-xs font-bold hidden sm:block", i === step ? "text-ink" : "text-mist")}>{s}</span>
            {i < STEPS.length - 1 && <span className={cn("flex-1 h-0.5 rounded", i < step ? "bg-leaf-400" : "bg-line")} />}
          </li>
        ))}
      </ol>

      {/* selected worker card */}
      <Card className="p-4 sm:p-5 flex items-center gap-4 mb-6">
        <Avatar name={w.name} photo={w.photo} initials={w.initials} color={w.color} size={56} />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <p className="font-bold">{w.name}</p>
            <VerifiedBadge />
          </div>
          <p className="text-[13px] text-mist mt-0.5 inline-flex items-center gap-2">
            <span className="inline-flex items-center gap-1 font-bold text-ink"><Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />{w.rating}</span>
            {w.skill} · {w.experience} yrs · {w.distance} km
          </p>
        </div>
        <span className="w-11 h-11 rounded-xl bg-forest-50 text-forest-600 hidden sm:flex items-center justify-center shrink-0">
          <ServiceIcon slug={w.skillSlug} size={20} />
        </span>
      </Card>

      {step === 0 && (
        <Card className="p-6 sm:p-7 anim-fade-up">
          <h2 className="font-bold text-lg tracking-tight flex items-center gap-2">
            <CalendarDays className="w-5 h-5 text-forest-600" /> Choose date & time
          </h2>
          <div className="flex gap-2.5 mt-5 overflow-x-auto pb-1">
            {days.map((d) => (
              <button
                key={d.key}
                onClick={() => setDate(d.key)}
                className={cn(
                  "shrink-0 w-[86px] rounded-2xl border-2 py-3.5 text-center transition-all cursor-pointer",
                  date === d.key ? "border-forest-600 bg-forest-50 shadow-glow" : "border-line hover:border-forest-300 bg-white"
                )}
              >
                <p className={cn("text-[13px] font-bold", date === d.key ? "text-forest-700" : "text-ink")}>{d.label}</p>
                <p className="text-xs text-mist mt-0.5">{d.sub}</p>
              </button>
            ))}
          </div>

          <div className="mt-6 space-y-5">
            {SLOT_GROUPS.map((g) => (
              <div key={g.label}>
                <p className="text-xs font-bold uppercase tracking-wider text-mist mb-2.5">{g.label}</p>
                <div className="flex flex-wrap gap-2.5">
                  {g.slots.map((s) => (
                    <button
                      key={s}
                      onClick={() => setTime(s)}
                      className={cn(
                        "h-11 px-5 rounded-xl border-2 text-sm font-bold transition-all cursor-pointer",
                        time === s ? "border-forest-600 bg-forest-600 text-white shadow-glow" : "border-line bg-white hover:border-forest-300 text-ink"
                      )}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-7 rounded-2xl border border-line bg-paper px-5 py-4 flex items-center gap-4">
            <span className="w-10 h-10 rounded-xl bg-azure-50 text-azure-500 flex items-center justify-center shrink-0">
              <MapPin className="w-5 h-5" />
            </span>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold uppercase tracking-wide text-mist">Service address</p>
              <p className="font-semibold text-sm truncate mt-0.5">{address}</p>
            </div>
            <Button variant="secondary" size="sm" onClick={() => { setAddrDraft(address); setAddrOpen(true); }}>
              <Pencil className="w-3.5 h-3.5" /> Change
            </Button>
          </div>

          <Field label="Anything specific? (optional)" className="mt-5">
            <Textarea placeholder="e.g. Switchboard has been sparking since morning…" value={notes} onChange={(e) => setNotes(e.target.value)} />
          </Field>

          <Button size="lg" className="w-full mt-7" disabled={!time} onClick={() => setStep(1)}>
            Review transparent pricing <ArrowRight className="w-4 h-4" />
          </Button>
        </Card>
      )}

      {step === 1 && (
        <Card className="p-6 sm:p-7 anim-fade-up">
          <h2 className="font-bold text-lg tracking-tight">Transparent price breakdown</h2>
          <p className="text-sm text-mist mt-1">
            {w.skill} · {dateLabel?.label}, {dateLabel?.sub} · {time}
          </p>
          <div className="mt-6">
            <PriceBreakdown amount={w.price} />
          </div>
          <div className="flex gap-3 mt-7">
            <Button variant="secondary" onClick={() => setStep(0)}>
              <ArrowLeft className="w-4 h-4" /> Back
            </Button>
            <Button size="lg" className="flex-1" onClick={() => setStep(2)}>
              Continue to payment
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </Card>
      )}

      {step === 2 && (
        <Card className="p-6 sm:p-7 anim-fade-up">
          <h2 className="font-bold text-lg tracking-tight">Payment</h2>
          <p className="text-sm text-mist mt-1">Mock payment for the prototype — no real transaction happens.</p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
            {(
              [
                { id: "upi", icon: Smartphone, label: "UPI" },
                { id: "qr", icon: QrCode, label: "QR Code" },
                { id: "card", icon: CreditCard, label: "Card" },
                { id: "netbanking", icon: Landmark, label: "Net Banking" },
              ] as const
            ).map((m) => (
              <button
                key={m.id}
                onClick={() => setMethod(m.id)}
                className={cn(
                  "rounded-2xl border-2 py-4 flex flex-col items-center gap-2 transition-all cursor-pointer",
                  method === m.id ? "border-forest-600 bg-forest-50 shadow-glow text-forest-700" : "border-line hover:border-forest-300 text-mist"
                )}
              >
                <m.icon className="w-6 h-6" />
                <span className="text-[13px] font-bold">{m.label}</span>
              </button>
            ))}
          </div>

          <div className="mt-5 rounded-2xl border border-line bg-paper px-5 py-4 min-h-[86px] flex items-center">
            {method === "upi" && (
              <p className="text-sm text-mist leading-relaxed">
                A collect request will be sent to your UPI app — <span className="font-semibold text-ink">demo only, nothing is charged</span>.
              </p>
            )}
            {method === "qr" && (
              <div className="flex items-center gap-4">
                <span className="w-14 h-14 rounded-xl bg-white border border-line flex items-center justify-center">
                  <ScanLine className="w-6 h-6 text-forest-600" />
                </span>
                <p className="text-sm text-mist">Scan with any UPI app to pay — <span className="font-semibold text-ink">demo QR</span>.</p>
              </div>
            )}
            {method === "card" && (
              <p className="text-sm text-mist">A secure card form would appear here — <span className="font-semibold text-ink">demo only</span>.</p>
            )}
            {method === "netbanking" && (
              <p className="text-sm text-mist">You'd be redirected to your bank — <span className="font-semibold text-ink">demo only</span>.</p>
            )}
          </div>

          <div className="mt-6">
            <PriceBreakdown amount={w.price} compact />
          </div>

          <div className="flex gap-3 mt-7">
            <Button variant="secondary" onClick={() => setStep(1)}>
              <ArrowLeft className="w-4 h-4" /> Back
            </Button>
            <Button size="lg" className="flex-1" onClick={pay} loading={paying}>
              {!paying && <Wallet className="w-4 h-4" />}
              {paying ? "Processing payment…" : `Pay ${inr(w.price)}`}
            </Button>
          </div>
        </Card>
      )}

      {/* change address modal */}
      <Modal open={addrOpen} onClose={() => setAddrOpen(false)} title="Change address">
        <Field label="Saved addresses">
          <div className="space-y-2">
            {[
              { label: "Home", value: "H.No. 1247, Sector 17, Chandigarh" },
              { label: "Parents' home", value: "Flat 62B, Sector 45, Chandigarh" },
              { label: "Office", value: "IT Park, Phase 8B, Mohali" },
            ].map((a) => (
              <button
                key={a.label}
                onClick={() => { setAddress(a.value); setAddrOpen(false); }}
                className="w-full text-left rounded-xl border border-line hover:border-forest-400 px-4 py-3 transition-colors cursor-pointer"
              >
                <p className="font-bold text-sm">{a.label}</p>
                <p className="text-xs text-mist">{a.value}</p>
              </button>
            ))}
          </div>
        </Field>
        <Field label="Or type a new address" className="mt-4">
          <Input value={addrDraft} onChange={(e) => setAddrDraft(e.target.value)} placeholder="House, street, sector, city" />
        </Field>
        <Button className="w-full mt-5" onClick={() => { if (addrDraft.trim()) setAddress(addrDraft.trim()); setAddrOpen(false); }}>
          Use this address
        </Button>
      </Modal>
    </div>
  );
}
