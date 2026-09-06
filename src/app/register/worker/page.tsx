"use client";

import React, { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft, ArrowRight, BadgeCheck, Check, Fingerprint, ShieldCheck, SkipForward, Wallet,
} from "lucide-react";
import { AuthShell } from "@/components/auth-shell";
import { Badge, Button, Card, Chip, Field, Input, Select } from "@/components/ui";
import { useDemo } from "@/lib/demo-context";
import { COOPERATIVES } from "@/lib/data";
import type { Lang } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const SKILL_OPTIONS = ["Plumber", "Electrician", "Carpenter", "Painter", "Cleaner", "Caregiver", "Gardener", "Technician", "Appliance Repair"];
const STEPS = ["Details", "Identity", "Payments", "Review"];

export default function WorkerRegister() {
  const router = useRouter();
  const { mobile, registerWorker, setRole, setLang, toast } = useDemo();
  const [step, setStep] = useState(0);

  // step 1
  const [name, setName] = useState("");
  const [skills, setSkills] = useState<string[]>([]);
  const [experience, setExperience] = useState("");
  const [society, setSociety] = useState(COOPERATIVES[0].name);
  const [membershipId, setMembershipId] = useState("");
  const [serviceArea, setServiceArea] = useState("");
  const [address, setAddress] = useState("");
  const [lang, setLangSel] = useState<Lang>("en");

  // step 2
  const [idNumber, setIdNumber] = useState("");
  const [idName, setIdName] = useState("");
  const [verifying, setVerifying] = useState(false);
  const [idVerified, setIdVerified] = useState(false);

  // step 3
  const [upi, setUpi] = useState("");
  const [upiSaved, setUpiSaved] = useState(false);

  const toggleSkill = (s: string) =>
    setSkills((prev) => (prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]));

  const step1Valid = useMemo(
    () => name.trim().length >= 3 && skills.length > 0 && experience !== "" && membershipId.trim() !== "" && serviceArea.trim() !== "" && address.trim() !== "",
    [name, skills, experience, membershipId, serviceArea, address]
  );

  const verifyIdentity = () => {
    if (idNumber.replace(/\s/g, "").length !== 12 || idName.trim().length < 3) {
      toast("Enter your 12-digit ID number and name as per ID", "error");
      return;
    }
    setVerifying(true);
    window.setTimeout(() => {
      setVerifying(false);
      setIdVerified(true);
      toast("Identity verified (demo)");
    }, 1600);
  };

  const saveUpi = () => {
    if (!/^[\w.\-]{2,}@[a-zA-Z]{2,}$/.test(upi)) {
      toast("Enter a valid UPI ID like yourname@upi", "error");
      return;
    }
    setUpiSaved(true);
    toast("UPI ID saved (demo)");
  };

  const submit = () => {
    registerWorker({
      name: name.trim(),
      mobile,
      skills,
      experience,
      society,
      membershipId: membershipId.trim(),
      serviceArea: serviceArea.trim(),
      address: address.trim(),
      lang,
      identityVerified: idVerified,
      idLast4: idNumber.replace(/\s/g, "").slice(-4),
      upi: upiSaved ? upi : undefined,
    });
    setRole("worker");
    setLang(lang);
    toast("Application submitted to your cooperative");
    router.push("/worker/pending");
  };

  return (
    <AuthShell stepBadge="Worker registration · श्रमिक पंजीकरण">
      {/* step indicator */}
      <ol className="flex items-center gap-2 mb-5">
        {STEPS.map((s, i) => (
          <li key={s} className="flex items-center gap-2 flex-1 last:flex-none">
            <span
              className={cn(
                "w-8 h-8 rounded-full text-[13px] font-bold flex items-center justify-center shrink-0 transition-colors",
                i < step ? "bg-leaf-500 text-white" : i === step ? "bg-forest-600 text-white shadow-glow" : "bg-white border border-line-strong text-mist"
              )}
            >
              {i < step ? <Check className="w-4 h-4" /> : i + 1}
            </span>
            <span className={cn("text-xs font-semibold hidden sm:block", i === step ? "text-ink" : "text-mist")}>{s}</span>
            {i < STEPS.length - 1 && <span className={cn("flex-1 h-0.5 rounded", i < step ? "bg-leaf-400" : "bg-line")} />}
          </li>
        ))}
      </ol>

      {step === 0 && (
        <Card className="p-6 sm:p-8 anim-fade-up">
          <h2 className="text-2xl font-extrabold tracking-tight">Your details</h2>
          <p className="text-sm text-mist mt-1">This helps customers and your cooperative know your craft.</p>
          <div className="grid sm:grid-cols-2 gap-4 mt-6">
            <Field label="Full name" required>
              <Input placeholder="e.g. Ramesh Kumar" value={name} onChange={(e) => setName(e.target.value)} />
            </Field>
            <Field label="Mobile number">
              <Input value={mobile || "—"} readOnly className="bg-paper text-mist" />
            </Field>
            <Field label="Skills" required className="sm:col-span-2" hint="Select all that apply">
              <div className="flex flex-wrap gap-2 pt-1">
                {SKILL_OPTIONS.map((s) => (
                  <Chip key={s} active={skills.includes(s)} onClick={() => toggleSkill(s)}>
                    {s}
                  </Chip>
                ))}
              </div>
            </Field>
            <Field label="Years of experience" required>
              <Select value={experience} onChange={(e) => setExperience(e.target.value)}>
                <option value="">Select</option>
                <option>0–2 years</option>
                <option>3–5 years</option>
                <option>6–10 years</option>
                <option>10+ years</option>
              </Select>
            </Field>
            <Field label="Cooperative society" required>
              <Select value={society} onChange={(e) => setSociety(e.target.value)}>
                {COOPERATIVES.map((c) => (
                  <option key={c.short}>{c.name}</option>
                ))}
              </Select>
            </Field>
            <Field label="Membership ID" required>
              <Input placeholder="e.g. CSLCS-2026-1042" value={membershipId} onChange={(e) => setMembershipId(e.target.value)} />
            </Field>
            <Field label="Service area" required hint="Sectors / localities you can serve">
              <Input placeholder="e.g. Sector 17–22, Chandigarh" value={serviceArea} onChange={(e) => setServiceArea(e.target.value)} />
            </Field>
            <Field label="Address" required className="sm:col-span-2">
              <Input placeholder="House / street / locality" value={address} onChange={(e) => setAddress(e.target.value)} />
            </Field>
            <Field label="Preferred language" className="sm:col-span-2">
              <Select value={lang} onChange={(e) => setLangSel(e.target.value as Lang)}>
                <option value="en">English</option>
                <option value="hi">हिन्दी</option>
              </Select>
            </Field>
          </div>
          <Button size="lg" className="w-full mt-7" disabled={!step1Valid} onClick={() => setStep(1)}>
            Continue to Identity Verification
            <ArrowRight className="w-4 h-4" />
          </Button>
        </Card>
      )}

      {step === 1 && (
        <Card className="p-6 sm:p-8 anim-fade-up">
          <div className="w-14 h-14 rounded-2xl bg-forest-50 text-forest-600 flex items-center justify-center mb-4">
            <Fingerprint className="w-7 h-7" />
          </div>
          <h2 className="text-2xl font-extrabold tracking-tight">Verify your identity</h2>
          <p className="text-sm text-mist mt-1.5 leading-relaxed">
            Identity verification helps customers and cooperatives trust verified service professionals.
          </p>
          {!idVerified ? (
            <>
              <div className="space-y-4 mt-6">
                <Field label="Aadhaar / Government ID number" required>
                  <Input
                    inputMode="numeric"
                    placeholder="XXXX XXXX XXXX"
                    value={idNumber}
                    onChange={(e) => {
                      const digits = e.target.value.replace(/\D/g, "").slice(0, 12);
                      setIdNumber(digits.replace(/(\d{4})(?=\d)/g, "$1 "));
                    }}
                  />
                </Field>
                <Field label="Name as per ID" required>
                  <Input placeholder="Exactly as printed on the ID" value={idName} onChange={(e) => setIdName(e.target.value)} />
                </Field>
              </div>
              <Button size="lg" className="w-full mt-6" onClick={verifyIdentity} loading={verifying}>
                {verifying ? "Verifying (demo)…" : "Verify Identity"}
              </Button>
              <div className="mt-4 rounded-xl bg-sun-50 border border-sun-200 px-4 py-3 text-xs text-sun-700 leading-relaxed">
                <span className="font-bold">Prototype note:</span> this is a mock verification for the SIH demo. It is{" "}
                <span className="font-semibold">not connected to UIDAI</span> or any government system.
              </div>
            </>
          ) : (
            <div className="mt-6 rounded-2xl border-2 border-leaf-300 bg-leaf-50 p-6 flex flex-col items-center text-center anim-pop">
              <span className="w-16 h-16 rounded-full bg-leaf-500 text-white flex items-center justify-center shadow-lift">
                <BadgeCheck className="w-8 h-8" />
              </span>
              <p className="mt-4 text-lg font-extrabold text-leaf-700">Identity Verified</p>
              <p className="text-sm text-mist mt-1">
                {idName || name} · ID •••• {idNumber.replace(/\s/g, "").slice(-4)} · verified for demo
              </p>
              <Badge tone="green" icon={ShieldCheck} className="mt-3">Demo verification complete</Badge>
            </div>
          )}
          <div className="flex gap-3 mt-6">
            <Button variant="secondary" onClick={() => setStep(0)}>
              <ArrowLeft className="w-4 h-4" /> Back
            </Button>
            <Button className="flex-1" size="lg" disabled={!idVerified} onClick={() => setStep(2)}>
              Continue
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </Card>
      )}

      {step === 2 && (
        <Card className="p-6 sm:p-8 anim-fade-up">
          <div className="w-14 h-14 rounded-2xl bg-azure-50 text-azure-500 flex items-center justify-center mb-4">
            <Wallet className="w-7 h-7" />
          </div>
          <h2 className="text-2xl font-extrabold tracking-tight">Set up payments</h2>
          <p className="text-sm text-mist mt-1.5 leading-relaxed">
            Add your UPI ID to receive your earnings directly. Optional — but recommended.
          </p>
          {!upiSaved ? (
            <>
              <Field label="UPI ID" className="mt-6" hint="Example: ramesh.kumar@upi">
                <Input placeholder="yourname@upi" value={upi} onChange={(e) => setUpi(e.target.value.trim())} />
              </Field>
              <div className="flex flex-col gap-3 mt-6">
                <Button size="lg" onClick={saveUpi}>Save UPI ID</Button>
                <Button size="lg" variant="ghost" onClick={() => setStep(3)}>
                  <SkipForward className="w-4 h-4" /> Skip for now
                </Button>
              </div>
              <p className="mt-4 text-xs text-mist text-center">Payments are mocked in this prototype. No real UPI network is involved.</p>
            </>
          ) : (
            <div className="mt-6 rounded-2xl border-2 border-leaf-300 bg-leaf-50 p-6 text-center anim-pop">
              <span className="mx-auto w-14 h-14 rounded-full bg-leaf-500 text-white flex items-center justify-center">
                <Check className="w-7 h-7" />
              </span>
              <p className="mt-3 font-extrabold text-leaf-700">UPI ID verified for demo</p>
              <p className="text-sm font-semibold text-ink mt-1">{upi}</p>
              <Button size="lg" className="w-full mt-5" onClick={() => setStep(3)}>
                Continue
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          )}
          <div className="mt-4">
            <Button variant="secondary" onClick={() => setStep(1)}>
              <ArrowLeft className="w-4 h-4" /> Back
            </Button>
          </div>
        </Card>
      )}

      {step === 3 && (
        <Card className="p-6 sm:p-8 anim-fade-up">
          <h2 className="text-2xl font-extrabold tracking-tight">Review & submit</h2>
          <p className="text-sm text-mist mt-1">Your cooperative will verify these details before you start receiving jobs.</p>
          <dl className="mt-6 divide-y divide-line rounded-2xl border border-line overflow-hidden text-sm">
            {[
              ["Name", name],
              ["Skills", skills.join(", ")],
              ["Experience", experience],
              ["Cooperative society", society],
              ["Membership ID", membershipId],
              ["Service area", serviceArea],
              ["Identity", idVerified ? `✓ Verified (demo · ID •••• ${idNumber.replace(/\s/g, "").slice(-4)})` : "Not verified"],
              ["UPI", upiSaved ? upi : "Skipped — can add later"],
            ].map(([k, v]) => (
              <div key={k} className="flex gap-4 px-5 py-3 bg-white even:bg-paper/60">
                <dt className="w-36 shrink-0 text-mist font-medium">{k}</dt>
                <dd className="font-semibold">{v}</dd>
              </div>
            ))}
          </dl>
          <div className="flex gap-3 mt-7">
            <Button variant="secondary" onClick={() => setStep(2)}>
              <ArrowLeft className="w-4 h-4" /> Back
            </Button>
            <Button size="lg" className="flex-1" onClick={submit}>
              Submit Application
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </Card>
      )}
    </AuthShell>
  );
}
