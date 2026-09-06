"use client";

import React from "react";
import {
  AlertCircle, CheckCircle2, Info, Loader2, ShieldCheck, Star, X, type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useDemo } from "@/lib/demo-context";

/* ------------------------------ Button ----------------------------- */
type ButtonVariant = "primary" | "secondary" | "ghost" | "danger" | "azure" | "dark";
type ButtonSize = "sm" | "md" | "lg";

export function Button({
  variant = "primary",
  size = "md",
  loading = false,
  disabled,
  className,
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
}) {
  const base =
    "inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all duration-200 select-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap";
  const variants: Record<ButtonVariant, string> = {
    primary: "bg-forest-600 text-white hover:bg-forest-700 shadow-[0_6px_16px_-6px_rgb(13_107_71/0.5)] active:scale-[0.98]",
    secondary: "bg-white text-ink border border-line-strong hover:border-forest-400 hover:text-forest-700 hover:bg-forest-50 active:scale-[0.98]",
    ghost: "text-forest-700 hover:bg-forest-50 active:scale-[0.98]",
    danger: "bg-white text-red-600 border border-red-200 hover:bg-red-50 active:scale-[0.98]",
    azure: "bg-azure-500 text-white hover:bg-azure-600 shadow-[0_6px_16px_-6px_rgb(37_99_235/0.5)] active:scale-[0.98]",
    dark: "bg-forest-950 text-white hover:bg-forest-900 active:scale-[0.98]",
  };
  const sizes: Record<ButtonSize, string> = {
    sm: "h-9 px-3.5 text-[13px]",
    md: "h-11 px-5 text-sm",
    lg: "h-[52px] px-7 text-[15px]",
  };
  return (
    <button className={cn(base, variants[variant], sizes[size], className)} disabled={disabled || loading} {...props}>
      {loading && <Loader2 className="w-4 h-4 animate-spin" />}
      {children}
    </button>
  );
}

/* ------------------------------- Card ------------------------------ */
export function Card({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("bg-white rounded-card border border-line shadow-soft", className)} {...props}>
      {children}
    </div>
  );
}

/* ------------------------------- Badge ----------------------------- */
type Tone = "green" | "amber" | "red" | "azure" | "grey" | "forest";

const toneClasses: Record<Tone, string> = {
  green: "bg-leaf-50 text-leaf-700 border-leaf-200",
  amber: "bg-sun-50 text-sun-600 border-sun-200",
  red: "bg-red-50 text-red-600 border-red-200",
  azure: "bg-azure-50 text-azure-600 border-azure-200",
  grey: "bg-black/5 text-mist border-line",
  forest: "bg-forest-600 text-white border-forest-600",
};

export function Badge({
  tone = "grey",
  icon: Icon,
  className,
  children,
}: {
  tone?: Tone;
  icon?: LucideIcon;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold leading-none",
        toneClasses[tone],
        className
      )}
    >
      {Icon && <Icon className="w-3.5 h-3.5" />}
      {children}
    </span>
  );
}

export function VerifiedBadge({ className, label = "Cooperative Verified" }: { className?: string; label?: string }) {
  return (
    <Badge tone="green" icon={ShieldCheck} className={className}>
      {label}
    </Badge>
  );
}

/* --------------------------- booking status ------------------------ */
export function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { tone: Tone; label: string; dot: string }> = {
    requested: { tone: "amber", label: "Awaiting acceptance", dot: "bg-sun-500" },
    accepted: { tone: "azure", label: "Worker on the way", dot: "bg-azure-500" },
    started: { tone: "azure", label: "In progress", dot: "bg-azure-500" },
    scheduled: { tone: "azure", label: "Scheduled", dot: "bg-azure-500" },
    completed: { tone: "green", label: "Completed", dot: "bg-leaf-500" },
    cancelled: { tone: "red", label: "Cancelled", dot: "bg-red-500" },
  };
  const m = map[status] ?? map.requested;
  return (
    <Badge tone={m.tone}>
      <span className={cn("w-1.5 h-1.5 rounded-full", m.dot)} />
      {m.label}
    </Badge>
  );
}

/* ------------------------------ Inputs ----------------------------- */
export function Field({
  label,
  hint,
  required,
  className,
  children,
}: {
  label: string;
  hint?: string;
  required?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("space-y-1.5", className)}>
      <label className="block text-[13px] font-semibold text-ink">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      {children}
      {hint && <p className="text-xs text-mist">{hint}</p>}
    </div>
  );
}

const inputBase =
  "w-full h-12 rounded-xl border border-line-strong bg-white px-4 text-[15px] text-ink placeholder:text-mist/60 transition-colors focus:border-forest-500 focus:outline-none focus:shadow-glow";

export function Input({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cn(inputBase, className)} {...props} />;
}

export function Select({ className, children, ...props }: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select className={cn(inputBase, "appearance-none pr-10 bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2216%22 height=%2216%22 fill=%22none%22 stroke=%22%2368756d%22 stroke-width=%222%22%3E%3Cpath d=%22m4 6 4 4 4-4%22/%3E%3C/svg%3E')] bg-no-repeat bg-[center_right_1rem]", className)} {...props}>
      {children}
    </select>
  );
}

export function Textarea({ className, ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={cn(inputBase, "h-auto min-h-[96px] py-3 resize-none leading-relaxed", className)}
      {...props}
    />
  );
}

/* ------------------------------ Avatar ----------------------------- */
export function Avatar({
  name,
  photo,
  initials,
  color = "from-forest-500 to-forest-700",
  size = 48,
  className,
}: {
  name: string;
  photo?: string;
  initials: string;
  color?: string;
  size?: number;
  className?: string;
}) {
  if (photo) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={photo}
        alt={name}
        width={size}
        height={size}
        className={cn("rounded-full object-cover ring-2 ring-white shadow-soft shrink-0", className)}
        style={{ width: size, height: size }}
      />
    );
  }
  return (
    <div
      className={cn(
        "rounded-full bg-gradient-to-br text-white font-bold flex items-center justify-center ring-2 ring-white shadow-soft shrink-0",
        color,
        className
      )}
      style={{ width: size, height: size, fontSize: size * 0.36 }}
      aria-label={name}
    >
      {initials}
    </div>
  );
}

/* ------------------------------ Ratings ---------------------------- */
export function Stars({ value, size = 14, className }: { value: number; size?: number; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-0.5", className)} aria-label={`${value} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          style={{ width: size, height: size }}
          className={i <= Math.round(value) ? "fill-amber-400 text-amber-400" : "fill-line text-line"}
        />
      ))}
    </span>
  );
}

export function StarInput({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  return (
    <div className="flex items-center justify-center gap-2" role="radiogroup" aria-label="Star rating">
      {[1, 2, 3, 4, 5].map((i) => (
        <button
          key={i}
          type="button"
          onClick={() => onChange(i)}
          aria-label={`${i} star${i > 1 ? "s" : ""}`}
          className="p-1.5 rounded-full transition-transform hover:scale-110 cursor-pointer"
        >
          <Star className={cn("w-9 h-9 transition-colors", i <= value ? "fill-amber-400 text-amber-400" : "fill-line/60 text-line")} />
        </button>
      ))}
    </div>
  );
}

/* ----------------------------- Stat card --------------------------- */
export function StatCard({
  icon: Icon,
  label,
  value,
  sub,
  tone = "forest",
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  sub?: string;
  tone?: "forest" | "azure" | "sun" | "leaf";
}) {
  const tones = {
    forest: "bg-forest-50 text-forest-600",
    azure: "bg-azure-50 text-azure-500",
    sun: "bg-sun-50 text-sun-500",
    leaf: "bg-leaf-50 text-leaf-600",
  };
  return (
    <Card className="p-5 flex items-start gap-4">
      <div className={cn("w-11 h-11 rounded-xl flex items-center justify-center shrink-0", tones[tone])}>
        <Icon className="w-5 h-5" />
      </div>
      <div className="min-w-0">
        <p className="text-[13px] font-medium text-mist">{label}</p>
        <p className="text-[22px] font-bold tracking-tight leading-7 mt-0.5">{value}</p>
        {sub && <p className="text-xs text-mist mt-1">{sub}</p>}
      </div>
    </Card>
  );
}

/* --------------------------- Section header ------------------------ */
export function SectionHeader({
  title,
  sub,
  action,
  className,
}: {
  title: string;
  sub?: string;
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex items-end justify-between gap-4 mb-5", className)}>
      <div>
        <h2 className="text-xl font-bold tracking-tight">{title}</h2>
        {sub && <p className="text-sm text-mist mt-1">{sub}</p>}
      </div>
      {action}
    </div>
  );
}

/* ------------------------------- Chips ----------------------------- */
export function Chip({
  active,
  children,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { active?: boolean }) {
  return (
    <button
      type="button"
      className={cn(
        "h-10 px-4 rounded-full border text-[13px] font-semibold transition-all cursor-pointer active:scale-[0.97]",
        active
          ? "bg-forest-600 border-forest-600 text-white shadow-[0_4px_12px_-4px_rgb(13_107_71/0.5)]"
          : "bg-white border-line-strong text-mist hover:border-forest-400 hover:text-forest-700",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

/* ------------------------------- Tabs ------------------------------ */
export function Tabs({
  tabs,
  active,
  onChange,
  className,
}: {
  tabs: { id: string; label: string; count?: number }[];
  active: string;
  onChange: (id: string) => void;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center gap-1 p-1 bg-black/[0.04] rounded-xl w-fit max-w-full overflow-x-auto", className)}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={cn(
            "h-9 px-4 rounded-lg text-[13px] font-semibold whitespace-nowrap transition-all cursor-pointer",
            active === tab.id ? "bg-white text-ink shadow-soft" : "text-mist hover:text-ink"
          )}
        >
          {tab.label}
          {typeof tab.count === "number" && (
            <span className={cn("ml-1.5 text-xs rounded-full px-1.5 py-0.5", active === tab.id ? "bg-forest-50 text-forest-700" : "bg-black/5")}>
              {tab.count}
            </span>
          )}
        </button>
      ))}
    </div>
  );
}

/* ------------------------------- Modal ----------------------------- */
export function Modal({
  open,
  onClose,
  title,
  children,
  wide,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  wide?: boolean;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center p-0 sm:p-6" role="dialog" aria-modal>
      <div className="absolute inset-0 bg-forest-950/40 backdrop-blur-[2px] anim-fade-in" onClick={onClose} />
      <div className={cn("relative bg-white w-full rounded-t-3xl sm:rounded-2xl shadow-lift anim-fade-up max-h-[88vh] overflow-y-auto", wide ? "sm:max-w-2xl" : "sm:max-w-md")}>
        <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-line sticky top-0 bg-white rounded-t-3xl sm:rounded-t-2xl z-10">
          <h3 className="font-bold text-lg tracking-tight">{title}</h3>
          <button onClick={onClose} aria-label="Close" className="w-9 h-9 rounded-full hover:bg-black/5 flex items-center justify-center text-mist cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}

/* ----------------------------- Empty state ------------------------- */
export function EmptyState({ icon: Icon, title, sub, action }: { icon: LucideIcon; title: string; sub?: string; action?: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-6">
      <div className="w-16 h-16 rounded-2xl bg-forest-50 text-forest-400 flex items-center justify-center mb-4">
        <Icon className="w-8 h-8" />
      </div>
      <h3 className="font-bold text-lg">{title}</h3>
      {sub && <p className="text-sm text-mist mt-1 max-w-sm">{sub}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}

/* ------------------------------ Toggle ----------------------------- */
export function Toggle({ on, onChange, label }: { on: boolean; onChange: (v: boolean) => void; label?: string }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      aria-label={label ?? "toggle"}
      onClick={() => onChange(!on)}
      className={cn("relative w-12 h-7 rounded-full transition-colors cursor-pointer", on ? "bg-leaf-500" : "bg-line-strong")}
    >
      <span
        className={cn(
          "absolute top-1 w-5 h-5 rounded-full bg-white shadow transition-all",
          on ? "left-6" : "left-1"
        )}
      />
    </button>
  );
}

/* ----------------------------- Toast host -------------------------- */
export function ToastHost() {
  const { toasts } = useDemo();
  const icons = { success: CheckCircle2, info: Info, error: AlertCircle };
  const tones = {
    success: "border-leaf-200 text-leaf-700",
    info: "border-azure-200 text-azure-600",
    error: "border-red-200 text-red-600",
  };
  return (
    <div className="fixed bottom-5 right-5 z-[90] flex flex-col gap-2.5 items-end pointer-events-none" aria-live="polite">
      {toasts.map((t) => {
        const Icon = icons[t.type];
        return (
          <div
            key={t.id}
            className={cn(
              "anim-toast pointer-events-auto flex items-center gap-3 bg-white border rounded-2xl shadow-lift pl-3.5 pr-5 py-3 max-w-sm",
              tones[t.type]
            )}
          >
            <Icon className="w-5 h-5 shrink-0" />
            <p className="text-sm font-semibold text-ink">{t.message}</p>
          </div>
        );
      })}
    </div>
  );
}
