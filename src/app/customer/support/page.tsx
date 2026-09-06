"use client";

import React, { useState } from "react";
import { ChevronDown, Headset, LifeBuoy, Mail, MessageSquareText, Phone, Send } from "lucide-react";
import { Button, Card, Field, Input, SectionHeader, Textarea } from "@/components/ui";
import { useDemo } from "@/lib/demo-context";
import { cn } from "@/lib/utils";

const FAQS = [
  { q: "How are workers verified?", a: "Every worker on SahyogSetu is a member of a registered Labour Cooperative Society. Their identity, skills and certificates are verified by their cooperative before they can accept bookings." },
  { q: "What is the 85% fair wage promise?", a: "Of every payment, 85% goes directly to the worker and 15% goes to their cooperative's welfare fund, which finances insurance, training and emergency support. SahyogSetu charges no platform commission in this prototype model." },
  { q: "Can I reschedule or cancel a booking?", a: "Yes — free cancellation up to 2 hours before the scheduled visit. You can reschedule from My Bookings → Track." },
  { q: "Which payment methods are supported?", a: "The prototype demonstrates UPI, QR, card and net-banking flows. All payments in this demo are mocked and no real money moves." },
  { q: "What if I'm unhappy with a service?", a: "Raise a ticket here or call the helpline. The worker's cooperative mediates disputes and can arrange a re-visit at no cost within 48 hours." },
];

export default function SupportPage() {
  const { toast } = useDemo();
  const [open, setOpen] = useState(0);
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");

  return (
    <div className="anim-fade-up max-w-3xl mx-auto space-y-6">
      <div className="text-center">
        <span className="mx-auto w-14 h-14 rounded-2xl bg-forest-50 text-forest-600 flex items-center justify-center">
          <LifeBuoy className="w-7 h-7" />
        </span>
        <h1 className="text-3xl font-extrabold tracking-tight mt-4">Help & Support</h1>
        <p className="text-mist mt-1">We — and your local cooperative — are here to help.</p>
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        {[
          { icon: Phone, label: "Helpline", value: "1800-266-2608", sub: "Toll-free · 8 AM – 10 PM" },
          { icon: MessageSquareText, label: "WhatsApp", value: "+91 98765 00000", sub: "Chat in Hindi or English" },
          { icon: Mail, label: "Email", value: "care@sahyogsetu.demo", sub: "Replies within 24 hrs" },
        ].map((c) => (
          <Card key={c.label} className="p-5 text-center hover:shadow-lift transition-shadow cursor-pointer" onClick={() => toast(`${c.label} channel would open (demo)`, "info")}>
            <span className="mx-auto w-11 h-11 rounded-xl bg-azure-50 text-azure-500 flex items-center justify-center">
              <c.icon className="w-5 h-5" />
            </span>
            <p className="font-bold mt-3 text-sm">{c.label}</p>
            <p className="text-forest-700 font-bold text-sm mt-0.5">{c.value}</p>
            <p className="text-xs text-mist mt-1">{c.sub}</p>
          </Card>
        ))}
      </div>

      <Card className="p-6 sm:p-7">
        <SectionHeader title="Frequently asked questions" />
        <div className="divide-y divide-line">
          {FAQS.map((f, i) => (
            <div key={i}>
              <button
                className="w-full flex items-center justify-between gap-4 py-4 text-left cursor-pointer"
                onClick={() => setOpen(open === i ? -1 : i)}
                aria-expanded={open === i}
              >
                <span className="font-bold text-[15px]">{f.q}</span>
                <ChevronDown className={cn("w-5 h-5 text-mist shrink-0 transition-transform", open === i && "rotate-180 text-forest-600")} />
              </button>
              {open === i && <p className="pb-5 text-sm text-mist leading-relaxed anim-fade-in max-w-2xl">{f.a}</p>}
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-6 sm:p-7">
        <SectionHeader title="Raise a ticket" sub="A cooperative coordinator will respond within one working day" />
        <div className="space-y-4">
          <Field label="Subject">
            <Input placeholder="e.g. Issue with booking SS-2301" value={subject} onChange={(e) => setSubject(e.target.value)} />
          </Field>
          <Field label="Describe the issue">
            <Textarea placeholder="Tell us what happened…" value={body} onChange={(e) => setBody(e.target.value)} />
          </Field>
          <Button
            onClick={() => {
              if (!subject.trim()) return toast("Please add a subject", "error");
              setSubject("");
              setBody("");
              toast("Ticket raised — ref TKT-1042 (demo)");
            }}
          >
            <Send className="w-4 h-4" /> Submit ticket
          </Button>
        </div>
        <p className="mt-4 text-xs text-mist flex items-center gap-1.5">
          <Headset className="w-3.5 h-3.5" /> Prototype only — tickets are not sent to any real system.
        </p>
      </Card>
    </div>
  );
}
