"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { BadgeCheck, Check, Clock3, Eye, Loader2, Play, Send } from "lucide-react";
import { Badge, Button, Card, Modal } from "@/components/ui";
import { useDemo } from "@/lib/demo-context";
import { cn } from "@/lib/utils";

export default function PendingPage() {
  const router = useRouter();
  const { worker, workerApproved, approveWorker, toast } = useDemo();
  const [viewOpen, setViewOpen] = useState(false);
  const [approving, setApproving] = useState(false);

  const simulate = () => {
    setApproving(true);
    window.setTimeout(() => {
      approveWorker();
      toast("Cooperative approved your profile (demo)");
      router.push("/worker");
    }, 1200);
  };

  const rows = [
    { label: "Identity verification", sub: worker?.idLast4 ? `ID •••• ${worker.idLast4} verified (demo)` : "Verified (demo)", done: true },
    { label: "Profile submitted", sub: worker ? `${worker.name} · ${worker.serviceArea}` : "Submitted", done: true },
    { label: "Skills submitted", sub: worker?.skills?.join(", ") || "Submitted", done: true },
    { label: "Cooperative verification", sub: workerApproved ? "Approved by cooperative" : "Pending review by cooperative", done: workerApproved },
  ];

  return (
    <div className="max-w-xl mx-auto py-10">
      <Card className="p-8 text-center anim-fade-up">
        <div className={cn("mx-auto w-20 h-20 rounded-full flex items-center justify-center", workerApproved ? "bg-leaf-100" : "bg-sun-100")}>
          {workerApproved ? <BadgeCheck className="w-10 h-10 text-leaf-600" /> : <Clock3 className="w-10 h-10 text-sun-500" />}
        </div>
        <h1 className="text-2xl font-extrabold tracking-tight mt-5">
          {workerApproved ? "You're approved!" : "Application submitted"}
        </h1>
        <div className="mt-3 flex justify-center">
          {workerApproved ? (
            <Badge tone="green" icon={BadgeCheck}>Approved by Cooperative</Badge>
          ) : (
            <Badge tone="amber" icon={Clock3}>Pending Cooperative Verification</Badge>
          )}
        </div>

        <div className="mt-7 text-left rounded-2xl border border-line divide-y divide-line overflow-hidden">
          {rows.map((r) => (
            <div key={r.label} className="flex items-center gap-3.5 px-5 py-3.5 bg-white">
              <span
                className={cn(
                  "w-7 h-7 rounded-full flex items-center justify-center shrink-0",
                  r.done ? "bg-leaf-500 text-white" : "bg-sun-100 text-sun-600"
                )}
              >
                {r.done ? <Check className="w-4 h-4" strokeWidth={3} /> : <Loader2 className="w-4 h-4 animate-spin" />}
              </span>
              <div className="min-w-0">
                <p className="font-semibold text-sm">{r.label}</p>
                <p className="text-xs text-mist truncate">{r.sub}</p>
              </div>
            </div>
          ))}
        </div>

        <p className="text-sm text-mist mt-5 leading-relaxed">
          Your cooperative will review your profile before you can accept customer bookings. This usually takes 1–2 working days.
        </p>

        <div className="flex flex-col gap-3 mt-6">
          <Button variant="secondary" onClick={() => setViewOpen(true)}>
            <Eye className="w-4 h-4" /> View Application
          </Button>
          {!workerApproved && (
            <Button onClick={simulate} loading={approving} variant="azure">
              <Play className="w-4 h-4" /> Simulate Approval (demo)
            </Button>
          )}
          {workerApproved && (
            <Button size="lg" onClick={() => router.push("/worker")}>
              Go to Worker Dashboard
            </Button>
          )}
        </div>
      </Card>

      <Modal open={viewOpen} onClose={() => setViewOpen(false)} title="Application summary">
        <dl className="divide-y divide-line text-sm">
          {[
            ["Name", worker?.name ?? "—"],
            ["Mobile", worker?.mobile ? `+91 ${worker.mobile}` : "—"],
            ["Skills", worker?.skills?.join(", ") ?? "—"],
            ["Experience", worker?.experience ?? "—"],
            ["Cooperative", worker?.society ?? "—"],
            ["Membership ID", worker?.membershipId ?? "—"],
            ["Service area", worker?.serviceArea ?? "—"],
            ["UPI", worker?.upi ?? "Not added"],
          ].map(([k, v]) => (
            <div key={k} className="flex gap-4 py-3">
              <dt className="w-32 shrink-0 text-mist font-medium">{k}</dt>
              <dd className="font-semibold">{v}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-4 rounded-xl bg-paper border border-line px-4 py-3 text-xs text-mist flex items-center gap-2">
          <Send className="w-3.5 h-3.5" /> Submitted to {worker?.society ?? "cooperative"} for verification (demo).
        </div>
      </Modal>
    </div>
  );
}
