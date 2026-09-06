"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Logo } from "@/components/logo";
import { useDemo } from "@/lib/demo-context";

export default function AdminIndex() {
  const router = useRouter();
  const { adminAuthed, hydrated } = useDemo();

  useEffect(() => {
    if (!hydrated) return;
    router.replace(adminAuthed ? "/admin/dashboard" : "/admin/login");
  }, [adminAuthed, hydrated, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-paper">
      <Logo size="lg" className="animate-pulse" />
    </div>
  );
}
