"use client";

import React, { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Camera, UserRound } from "lucide-react";
import { AuthShell } from "@/components/auth-shell";
import { Button, Card, Field, Input, Select } from "@/components/ui";
import { useDemo } from "@/lib/demo-context";
import type { Lang } from "@/lib/i18n";

export default function CustomerRegister() {
  const router = useRouter();
  const { mobile, registerCustomer, setRole, setLang, toast } = useDemo();
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("Chandigarh");
  const [lang, setLangSel] = useState<Lang>("en");
  const [photo, setPhoto] = useState<string>();
  const fileRef = useRef<HTMLInputElement>(null);

  const submit = () => {
    if (name.trim().length < 3 || !address.trim()) {
      toast("Please fill your name and address", "error");
      return;
    }
    registerCustomer({ name: name.trim(), gender: gender || "Not specified", mobile, address: address.trim(), city, lang });
    setRole("customer");
    setLang(lang);
    toast(`Welcome to SahyogSetu, ${name.split(" ")[0]}!`);
    router.push("/customer");
  };

  return (
    <AuthShell stepBadge="Customer registration">
      <Card className="p-6 sm:p-8 anim-fade-up">
        <h2 className="text-[26px] font-extrabold tracking-tight">Create your account</h2>
        <p className="text-sm text-mist mt-1">Tell us a little about yourself to start booking services.</p>

        <div className="flex items-center gap-4 mt-6">
          <button
            onClick={() => fileRef.current?.click()}
            className="relative w-20 h-20 rounded-2xl bg-forest-50 border-2 border-dashed border-forest-200 flex items-center justify-center overflow-hidden hover:border-forest-400 transition-colors cursor-pointer group"
            aria-label="Upload profile photo (optional)"
          >
            {photo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={photo} alt="Profile preview" className="w-full h-full object-cover" />
            ) : (
              <UserRound className="w-7 h-7 text-forest-300" />
            )}
            <span className="absolute bottom-1 right-1 w-6 h-6 rounded-full bg-forest-600 text-white flex items-center justify-center shadow-soft group-hover:scale-110 transition-transform">
              <Camera className="w-3 h-3" />
            </span>
          </button>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) setPhoto(URL.createObjectURL(f));
            }}
          />
          <div className="text-sm">
            <p className="font-semibold">Profile photo</p>
            <p className="text-mist text-xs mt-0.5">Optional · helps workers recognise you</p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 mt-6">
          <Field label="Full name" required className="sm:col-span-2">
            <Input placeholder="e.g. Rahul Sharma" value={name} onChange={(e) => setName(e.target.value)} />
          </Field>
          <Field label="Gender">
            <Select value={gender} onChange={(e) => setGender(e.target.value)}>
              <option value="">Select</option>
              <option>Female</option>
              <option>Male</option>
              <option>Prefer not to say</option>
            </Select>
          </Field>
          <Field label="Mobile number">
            <Input value={mobile || "—"} readOnly className="bg-paper text-mist" />
          </Field>
          <Field label="Address" required className="sm:col-span-2">
            <Input placeholder="House / flat, street, sector" value={address} onChange={(e) => setAddress(e.target.value)} />
          </Field>
          <Field label="City">
            <Select value={city} onChange={(e) => setCity(e.target.value)}>
              <option>Chandigarh</option>
              <option>Mohali</option>
              <option>Panchkula</option>
              <option>Lucknow</option>
              <option>Gorakhpur</option>
              <option>Delhi</option>
            </Select>
          </Field>
          <Field label="Preferred language">
            <Select value={lang} onChange={(e) => setLangSel(e.target.value as Lang)}>
              <option value="en">English</option>
              <option value="hi">हिन्दी</option>
            </Select>
          </Field>
        </div>

        <Button size="lg" className="w-full mt-7" onClick={submit}>
          Create Account
          <ArrowRight className="w-4 h-4" />
        </Button>
      </Card>
    </AuthShell>
  );
}
