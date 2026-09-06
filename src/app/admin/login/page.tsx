"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Building2, Lock } from "lucide-react";
import { Logo } from "@/components/logo";
import { Button, Card, Field, Input } from "@/components/ui";
import { useDemo } from "@/lib/demo-context";
import { DEMO } from "@/lib/data";

export default function AdminLoginPage() {
  const router = useRouter();
  const { adminLogin, toast } = useDemo();
  const [email, setEmail] = useState<string>(DEMO.adminEmail);
  const [password, setPassword] = useState<string>(DEMO.adminPassword);
  const [loading, setLoading] = useState(false);

  const signIn = () => {
    if (!email.includes("@") || password.length < 4) {
      toast("Enter valid demo credentials", "error");
      return;
    }
    setLoading(true);
    window.setTimeout(() => {
      adminLogin();
      toast("Welcome, Cooperative Administrator");
      router.push("/admin/dashboard");
    }, 900);
  };

  return (
    <div className="min-h-screen brand-gradient dot-grid flex items-center justify-center p-5 relative overflow-hidden">
      <div className="absolute -top-40 -right-32 w-[30rem] h-[30rem] rounded-full bg-white/10 blur-3xl" />
      <div className="absolute -bottom-48 -left-32 w-[32rem] h-[32rem] rounded-full bg-azure-500/20 blur-3xl" />
      <div className="w-full max-w-[440px] relative anim-fade-up">
        <div className="flex flex-col items-center text-white mb-7">
          <Logo size="lg" light />
          <p className="mt-4 text-white/80 text-sm font-medium flex items-center gap-2">
            <Building2 className="w-4 h-4" /> Cooperative Administrator Console
          </p>
        </div>
        <Card className="p-7 sm:p-8 shadow-lift">
          <h1 className="text-2xl font-extrabold tracking-tight">Admin sign in</h1>
          <p className="text-sm text-mist mt-1">Labour Cooperative Society / Federation portal</p>
          <div className="mt-6 space-y-4">
            <Field label="Official email">
              <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="admin@sahyogsetu.demo" />
            </Field>
            <Field label="Password">
              <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" onKeyDown={(e) => e.key === "Enter" && signIn()} />
            </Field>
          </div>
          <Button size="lg" className="w-full mt-6" onClick={signIn} loading={loading}>
            Sign in to dashboard
            <ArrowRight className="w-4 h-4" />
          </Button>
          <div className="mt-4 rounded-xl bg-azure-50 border border-azure-100 px-4 py-3 text-xs text-azure-700 leading-relaxed">
            <span className="font-bold">Demo credentials are pre-filled.</span> This is a prototype console — no real authentication or cooperative records are connected.
          </div>
        </Card>
        <div className="flex items-center justify-between mt-5 text-white/80 text-[13px]">
          <Link href="/login" className="inline-flex items-center gap-1.5 font-semibold hover:text-white">
            <ArrowLeft className="w-4 h-4" /> Back to app login
          </Link>
          <span className="inline-flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5" /> Secure console (demo)
          </span>
        </div>
      </div>
    </div>
  );
}
