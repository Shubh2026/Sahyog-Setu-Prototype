"use client";

import React, { useState } from "react";
import {
  BadgeCheck, CheckCircle2, Eye, FileCheck2, Fingerprint, ShieldCheck, XCircle,
} from "lucide-react";
import { Avatar, Badge, Button, Card, Modal } from "@/components/ui";
import { useDemo } from "@/lib/demo-context";
import { VERIFICATION_QUEUE, WORKERS, type AdminWorkerRow } from "@/lib/data";
import { cn } from "@/lib/utils";

export default function VerificationPage() {
  const { adminDecisions, setDecision, toast } = useDemo();
  const [review, setReview] = useState<AdminWorkerRow | null>(null);

  const approve = (row: AdminWorkerRow) => {
    setDecision(row.id, "approved");
    toast(`${row.name} approved — can now accept bookings`);
  };
  const reject = (row: AdminWorkerRow) => {
    setDecision(row.id, "rejected");
    toast(`${row.name}'s application rejected`, "info");
  };

  const Doc = ({ ok, label }: { ok: boolean; label: string }) => (
    <span className={cn("inline-flex items-center gap-1.5 text-[13px] font-semibold", ok ? "text-leaf-700" : "text-sun-600")}>
      {ok ? <CheckCircle2 className="w-4 h-4" /> : <ShieldCheck className="w-4 h-4" />}
      {label}
    </span>
  );

  return (
    <div className="space-y-6 anim-fade-up">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Worker Verification</h1>
        <p className="text-mist text-sm mt-1">
          Identity + certificate checks before workers go live · {VERIFICATION_QUEUE.filter((r) => !adminDecisions[r.id]).length} pending
        </p>
      </div>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[860px]">
            <thead>
              <tr className="text-left text-xs uppercase tracking-wider text-mist bg-paper border-b border-line">
                <th className="px-6 py-3.5 font-bold">Worker</th>
                <th className="px-6 py-3.5 font-bold">Skill</th>
                <th className="px-6 py-3.5 font-bold">Society</th>
                <th className="px-6 py-3.5 font-bold">ID status</th>
                <th className="px-6 py-3.5 font-bold">Certificates</th>
                <th className="px-6 py-3.5 font-bold">Decision</th>
                <th className="px-6 py-3.5 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {VERIFICATION_QUEUE.map((row) => {
                const w = WORKERS.find((x) => x.id === row.id);
                const decision = adminDecisions[row.id];
                return (
                  <tr key={row.id} className="hover:bg-forest-50/40 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <Avatar name={row.name} photo={w?.photo} initials={w?.initials ?? row.name.slice(0, 2)} color={w?.color} size={38} />
                        <div>
                          <p className="font-bold">{row.name}</p>
                          <p className="text-xs text-mist">applied {row.applied}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-mist font-medium">{row.skill}</td>
                    <td className="px-6 py-4 text-mist">{row.society}</td>
                    <td className="px-6 py-4"><Doc ok={row.idStatus === "verified"} label={row.idStatus === "verified" ? "Verified" : "Pending"} /></td>
                    <td className="px-6 py-4"><Doc ok={row.certStatus === "verified"} label={row.certStatus === "verified" ? "Verified" : "Pending"} /></td>
                    <td className="px-6 py-4">
                      {decision === "approved" ? (
                        <Badge tone="green" icon={BadgeCheck}>Approved</Badge>
                      ) : decision === "rejected" ? (
                        <Badge tone="red" icon={XCircle}>Rejected</Badge>
                      ) : (
                        <Badge tone="amber">Pending</Badge>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-end gap-2">
                        <Button size="sm" variant="secondary" onClick={() => setReview(row)}>
                          <Eye className="w-3.5 h-3.5" /> Review
                        </Button>
                        {!decision && (
                          <>
                            <Button size="sm" onClick={() => approve(row)}>Approve</Button>
                            <Button size="sm" variant="danger" onClick={() => reject(row)}>Reject</Button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      <p className="text-xs text-mist">
        Prototype workflow — document checks are simulated. In production this connects to cooperative records and
        consent-based identity verification. No UIDAI or government system is used in this demo.
      </p>

      {/* Review modal */}
      <Modal open={!!review} onClose={() => setReview(null)} title="Review application" wide>
        {review && (
          <div>
            {(() => {
              const w = WORKERS.find((x) => x.id === review.id);
              const decision = adminDecisions[review.id];
              return (
                <div>
                  <div className="flex items-center gap-4">
                    <Avatar name={review.name} photo={w?.photo} initials={w?.initials ?? "W"} color={w?.color} size={72} />
                    <div>
                      <p className="text-xl font-extrabold tracking-tight">{review.name}</p>
                      <p className="text-sm text-mist">{review.skill} · {w?.experience ?? 5} years · {review.society}</p>
                      <div className="flex gap-2 mt-2">
                        <Badge tone={review.idStatus === "verified" ? "green" : "amber"} icon={Fingerprint}>
                          ID {review.idStatus}
                        </Badge>
                        <Badge tone={review.certStatus === "verified" ? "green" : "amber"} icon={FileCheck2}>
                          Certificate {review.certStatus}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <dl className="mt-6 divide-y divide-line text-sm border border-line rounded-2xl overflow-hidden">
                    {[
                      ["Membership ID", w?.membershipId ?? "GLCS-2026-0114"],
                      ["Id document", "•••• •••• 4821 (masked for demo)"],
                      ["Skills declared", w?.skills.join(", ") ?? review.skill],
                      ["Certificates", w?.certificates.map((c) => c.name).join(", ") ?? "Trade certificate"],
                      ["Service area", w ? `${w.area}, ${w.city}` : "Sector 17, Chandigarh"],
                    ].map(([k, v]) => (
                      <div key={k} className="flex gap-4 px-5 py-3 odd:bg-paper/60">
                        <dt className="w-36 shrink-0 text-mist font-medium">{k}</dt>
                        <dd className="font-semibold">{v}</dd>
                      </div>
                    ))}
                  </dl>
                  {!decision ? (
                    <div className="flex gap-3 mt-6">
                      <Button className="flex-1" size="lg" onClick={() => { approve(review); setReview(null); }}>
                        <CheckCircle2 className="w-4 h-4" /> Approve worker
                      </Button>
                      <Button className="flex-1" size="lg" variant="danger" onClick={() => { reject(review); setReview(null); }}>
                        <XCircle className="w-4 h-4" /> Reject
                      </Button>
                    </div>
                  ) : (
                    <p className={cn("mt-6 rounded-xl px-4 py-3 text-sm font-bold text-center", decision === "approved" ? "bg-leaf-50 text-leaf-700" : "bg-red-50 text-red-600")}>
                      Decision recorded: {decision === "approved" ? "Approved ✓" : "Rejected"}
                    </p>
                  )}
                </div>
              );
            })()}
          </div>
        )}
      </Modal>
    </div>
  );
}
