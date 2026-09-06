"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, Lock, Search, ShieldCheck, User, Wrench } from "lucide-react";
import { AuthShell } from "@/components/auth-shell";
import { Button, Card, Field, Input } from "@/components/ui";
import { OtpInput } from "@/components/misc";
import { useDemo, type Role } from "@/lib/demo-context";
import { DEMO } from "@/lib/data";
import { cn, maskMobile } from "@/lib/utils";

export default function LoginPage() {
  const router = useRouter();
  const { setRole, setMobile: saveMobile, resolveAccount, toast, setLang } = useDemo();
  const [roleSel, setRoleSel] = useState<"customer" | "worker">("customer");
  const [step, setStep] = useState<"identify" | "otp">("identify");
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState(false);
  const [sending, setSending] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [resendIn, setResendIn] = useState(0);

  useEffect(() => {
    if (resendIn <= 0) return;
    const t = window.setTimeout(() => setResendIn((r) => r - 1), 1000);
    return () => window.clearTimeout(t);
  }, [resendIn]);

  const sendOtp = () => {
    if (!/^\d{10}$/.test(mobile)) {
      toast("Enter a valid 10-digit mobile number", "error");
      return;
    }
    setSending(true);
    window.setTimeout(() => {
      setSending(false);
      setStep("otp");
      setOtp("");
      setOtpError(false);
      setResendIn(30);
      toast(`OTP sent to ${maskMobile(mobile)} (demo)`, "info");
    }, 900);
  };

  const verify = () => {
    if (otp.length !== 6) return;
    setVerifying(true);
    window.setTimeout(() => {
      setVerifying(false);
      if (otp !== DEMO.otp) {
        setOtpError(true);
        toast("Incorrect OTP — demo OTP is 123456", "error");
        return;
      }
      setRole(roleSel);
      saveMobile(mobile);
      toast("Signed in successfully");
      const dest = resolveAccount(mobile, roleSel);
      router.push(
        dest === "customer-home" ? "/customer"
        : dest === "worker-home" ? "/worker"
        : dest === "register-worker" ? "/register/worker"
        : "/register/customer"
      );
    }, 900);
  };

  const quick = (m: string, r: "customer" | "worker") => {
    setRoleSel(r);
    setMobile(m);
  };

  return (
    <AuthShell stepBadge="Sign in · लॉगिन">
      {step === "identify" ? (
        <Card className="p-6 sm:p-8 anim-fade-up">
          <h2 className="text-[26px] font-extrabold tracking-tight">Welcome</h2>
          <p className="text-sm text-mist mt-1">Choose how you want to use SahyogSetu</p>

          <div className="grid grid-cols-2 gap-3 mt-6" role="radiogroup" aria-label="Select role">
            {(
              [
                { id: "customer", icon: Search, title: "Customer", desc: "Book trusted local services" },
                { id: "worker", icon: Wrench, title: "Worker", desc: "Find work & earn fairly" },
              ] as const
            ).map((r) => (
              <button
                key={r.id}
                role="radio"
                aria-checked={roleSel === r.id}
                onClick={() => setRoleSel(r.id)}
                className={cn(
                  "relative text-left rounded-2xl border-2 p-4 sm:p-5 transition-all cursor-pointer group",
                  roleSel === r.id
                    ? "border-forest-600 bg-forest-50/70 shadow-glow"
                    : "border-line hover:border-forest-300 bg-white"
                )}
              >
                <span
                  className={cn(
                    "absolute top-3 right-3 w-5 h-5 rounded-full flex items-center justify-center transition-all",
                    roleSel === r.id ? "bg-forest-600 text-white" : "bg-line text-transparent"
                  )}
                >
                  <Check className="w-3 h-3" strokeWidth={3.5} />
                </span>
                <span
                  className={cn(
                    "w-11 h-11 rounded-xl flex items-center justify-center mb-3 transition-colors",
                    roleSel === r.id ? "bg-forest-600 text-white" : "bg-forest-50 text-forest-600 group-hover:bg-forest-100"
                  )}
                >
                  <r.icon className="w-5 h-5" />
                </span>
                <span className="block font-bold text-[15px]">{r.title}</span>
                <span className="block text-xs text-mist mt-1 leading-snug">{r.desc}</span>
              </button>
            ))}
          </div>

          <div className="mt-6">
            <Field label="Mobile number">
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[15px] font-semibold text-mist border-r border-line pr-3">
                  +91
                </span>
                <Input
                  inputMode="numeric"
                  maxLength={10}
                  placeholder="10-digit mobile number"
                  className="pl-[72px]"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value.replace(/\D/g, "").slice(0, 10))}
                  onKeyDown={(e) => e.key === "Enter" && sendOtp()}
                />
              </div>
            </Field>
            <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2.5">
              <button onClick={() => quick(DEMO.customerMobile, "customer")} className="text-xs font-semibold text-azure-600 hover:underline cursor-pointer">
                Demo customer · 9876543210
              </button>
              <button onClick={() => quick(DEMO.workerMobile, "worker")} className="text-xs font-semibold text-azure-600 hover:underline cursor-pointer">
                Demo worker · 9876543211
              </button>
            </div>
          </div>

          <Button size="lg" className="w-full mt-6" onClick={sendOtp} loading={sending}>
            Get OTP
            <ArrowRight className="w-4 h-4" />
          </Button>

          <div className="flex items-center justify-between mt-5 pt-5 border-t border-line text-xs text-mist">
            <span className="inline-flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-leaf-500" /> Your data is secure
            </span>
            <Link href="/admin/login" className="inline-flex items-center gap-1 font-semibold text-forest-700 hover:underline">
              <ShieldCheck className="w-3.5 h-3.5" /> Cooperative admin
            </Link>
          </div>
        </Card>
      ) : (
        <Card className="p-6 sm:p-8 anim-fade-up">
          <button
            onClick={() => setStep("identify")}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-mist hover:text-ink cursor-pointer mb-5"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
          <h2 className="text-[26px] font-extrabold tracking-tight">Enter OTP</h2>
          <p className="text-sm text-mist mt-1">
            Sent to <span className="font-semibold text-ink">{maskMobile(mobile)}</span> · signing in as{" "}
            <span className="font-semibold text-forest-700 capitalize">{roleSel}</span>
          </p>

          <div className="mt-7 flex flex-col items-center">
            <OtpInput value={otp} onChange={(v) => { setOtp(v); setOtpError(false); }} error={otpError} />
            <p className="mt-3 text-xs text-mist">
              Demo OTP: <span className="font-bold text-forest-700 tracking-wider">1 2 3 4 5 6</span>
            </p>
          </div>

          <Button size="lg" className="w-full mt-7" onClick={verify} loading={verifying} disabled={otp.length !== 6}>
            Verify & Continue
          </Button>

          <div className="mt-4 text-center text-sm text-mist">
            {resendIn > 0 ? (
              <span>
                Resend OTP in <span className="font-semibold text-ink">{resendIn}s</span>
              </span>
            ) : (
              <button onClick={sendOtp} className="font-semibold text-forest-700 hover:underline cursor-pointer">
                Resend OTP
              </button>
            )}
          </div>

          <p className="mt-6 pt-4 border-t border-line text-[11px] text-mist/80 text-center leading-relaxed">
            Prototype flow — OTP is mocked for demonstration. No real SMS or identity systems are involved.
          </p>
        </Card>
      )}
    </AuthShell>
  );
}
