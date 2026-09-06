import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

/** Format a number as INR with Indian digit grouping, e.g. ₹24,850 */
export function inr(n: number): string {
  return "₹" + n.toLocaleString("en-IN");
}

/** Worker share — the core fair-wage promise of SahyogSetu */
export const WORKER_SHARE = 0.85;

export function split(amount: number) {
  const worker = Math.round(amount * WORKER_SHARE);
  return { worker, welfare: amount - worker };
}

export function maskMobile(m: string): string {
  if (m.length < 10) return m;
  return `+91 ${m.slice(0, 2)}••• ••${m.slice(8)}`;
}

export function bookingRef(id: string): string {
  return "SS-" + id.replace(/\D/g, "").padStart(4, "0").slice(-6);
}

export function greeting(): string {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

/** Next `n` days as selectable date chips */
export function nextDays(n: number): { key: string; label: string; sub: string }[] {
  const out = [];
  const today = new Date();
  for (let i = 0; i < n; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    const label = i === 0 ? "Today" : i === 1 ? "Tomorrow" : d.toLocaleDateString("en-IN", { weekday: "short" });
    const sub = d.toLocaleDateString("en-IN", { day: "numeric", month: "short" });
    out.push({ key: d.toDateString(), label, sub });
  }
  return out;
}

export function uid(): string {
  return Math.floor(1000 + Math.random() * 9000).toString();
}
