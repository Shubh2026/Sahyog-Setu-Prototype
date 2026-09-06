"use client";

import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import {
  AppNotification, Booking, DEMO, SEED_BOOKINGS, SEED_NOTIFICATIONS,
} from "@/lib/data";
import { Lang, translate } from "@/lib/i18n";
import { uid } from "@/lib/utils";

export type Role = "customer" | "worker" | "admin";

export interface CustomerAccount {
  name: string;
  gender: string;
  mobile: string;
  address: string;
  city: string;
  lang: Lang;
  photo?: string;
}

export interface WorkerAccount {
  name: string;
  mobile: string;
  skills: string[];
  experience: string;
  society: string;
  membershipId: string;
  serviceArea: string;
  address: string;
  lang: Lang;
  identityVerified: boolean;
  idLast4?: string;
  upi?: string;
}

interface PersistedState {
  lang: Lang;
  role: Role | null;
  mobile: string;
  customer: CustomerAccount | null;
  worker: WorkerAccount | null;
  workerApproved: boolean;
  workerAvailable: boolean;
  bookings: Booking[];
  notifications: AppNotification[];
  adminDecisions: Record<string, "approved" | "rejected">;
  adminAuthed: boolean;
}

export interface Toast {
  id: number;
  message: string;
  type: "success" | "info" | "error";
}

interface DemoContextType extends PersistedState {
  hydrated: boolean;
  toasts: Toast[];
  t: (key: string) => string;
  setLang: (l: Lang) => void;
  setRole: (r: Role | null) => void;
  setMobile: (m: string) => void;
  /** After OTP: decide where the flow goes */
  resolveAccount: (mobile: string, role: Role) => "customer-home" | "worker-home" | "register-customer" | "register-worker";
  registerCustomer: (c: CustomerAccount) => void;
  registerWorker: (w: WorkerAccount) => void;
  updateWorker: (patch: Partial<WorkerAccount>) => void;
  approveWorker: () => void;
  setWorkerAvailable: (v: boolean) => void;
  adminLogin: () => void;
  logout: () => void;
  createBooking: (b: Omit<Booking, "id" | "customerId" | "customerName" | "status" | "createdAt">) => Booking;
  getBooking: (id: string) => Booking | undefined;
  acceptJob: (id: string) => void;
  declineJob: (id: string) => void;
  startJob: (id: string) => void;
  completeJob: (id: string) => void;
  submitReview: (id: string, rating: number, text: string) => void;
  workerEarnings: () => number;
  markAllRead: (role: Role) => void;
  unreadCount: (role: Role) => number;
  setDecision: (workerId: string, d: "approved" | "rejected") => void;
  resetDemo: () => void;
  toast: (message: string, type?: Toast["type"]) => void;
}

const DEFAULTS: PersistedState = {
  lang: "en",
  role: null,
  mobile: "",
  customer: null,
  worker: null,
  workerApproved: false,
  workerAvailable: true,
  bookings: SEED_BOOKINGS,
  notifications: SEED_NOTIFICATIONS,
  adminDecisions: {},
  adminAuthed: false,
};

const STORAGE_KEY = "sahyogsetu-demo-v1";
const DemoContext = createContext<DemoContextType | null>(null);

export function DemoProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<PersistedState>(DEFAULTS);
  const [hydrated, setHydrated] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const toastId = useRef(0);

  /* hydrate once */
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as PersistedState;
        setState({ ...DEFAULTS, ...parsed });
      }
    } catch {
      /* fresh demo */
    }
    setHydrated(true);
  }, []);

  /* persist */
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* ignore quota */
    }
  }, [state, hydrated]);

  const toast = useCallback((message: string, type: Toast["type"] = "success") => {
    const id = ++toastId.current;
    setToasts((t) => [...t, { id, message, type }]);
    window.setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3600);
  }, []);

  const t = useCallback((key: string) => translate(state.lang, key), [state.lang]);

  const resolveAccount = useCallback(
    (mobile: string, role: Role): ReturnType<DemoContextType["resolveAccount"]> => {
      if (role === "customer") {
        return mobile === DEMO.customerMobile ? "customer-home" : "register-customer";
      }
      if (role === "worker") {
        return mobile === DEMO.workerMobile ? "worker-home" : "register-worker";
      }
      return "register-customer";
    },
    []
  );

  const registerCustomer = useCallback((customer: CustomerAccount) => {
    setState((s) => ({ ...s, customer }));
  }, []);

  const registerWorker = useCallback((worker: WorkerAccount) => {
    setState((s) => ({ ...s, worker, workerApproved: false }));
  }, []);

  const updateWorker = useCallback((patch: Partial<WorkerAccount>) => {
    setState((s) => (s.worker ? { ...s, worker: { ...s.worker, ...patch } } : s));
  }, []);

  const approveWorker = useCallback(() => setState((s) => ({ ...s, workerApproved: true })), []);
  const setWorkerAvailable = useCallback((v: boolean) => setState((s) => ({ ...s, workerAvailable: v })), []);
  const adminLogin = useCallback(() => setState((s) => ({ ...s, adminAuthed: true, role: "admin" })), []);

  const logout = useCallback(() => {
    setState((s) => ({ ...s, role: null, adminAuthed: false }));
  }, []);

  const createBooking = useCallback(
    (input: Omit<Booking, "id" | "customerId" | "customerName" | "status" | "createdAt">): Booking => {
      const booking: Booking = {
        ...input,
        id: uid(),
        customerId: "c-demo",
        customerName: state.customer?.name || "Rahul Sharma",
        status: "requested",
        createdAt: "Just now",
      };
      setState((s) => ({
        ...s,
        bookings: [booking, ...s.bookings],
        notifications: [
          {
            id: `n-${booking.id}`,
            role: "worker",
            title: "New job request",
            body: `${booking.customerName} needs ${booking.service.toLowerCase()} · ${booking.date} ${booking.time} · Est. ${input.amount}.`,
            time: "Just now",
            read: false,
            kind: "booking",
          },
          ...s.notifications,
        ],
      }));
      return booking;
    },
    [state.customer?.name]
  );

  const getBooking = useCallback((id: string) => state.bookings.find((b) => b.id === id), [state.bookings]);

  const patchBooking = useCallback((id: string, patch: Partial<Booking>) => {
    setState((s) => ({
      ...s,
      bookings: s.bookings.map((b) => (b.id === id ? { ...b, ...patch } : b)),
    }));
  }, []);

  const acceptJob = useCallback(
    (id: string) => {
      patchBooking(id, { status: "accepted" });
      setState((s) => ({
        ...s,
        notifications: [
          { id: `na-${id}`, role: "customer", title: "Worker on the way", body: `${getBooking(id)?.workerName ?? "Your worker"} accepted your booking and is heading over.`, time: "Just now", read: false, kind: "booking" },
          ...s.notifications,
        ],
      }));
    },
    [getBooking, patchBooking]
  );

  const declineJob = useCallback((id: string) => {
    patchBooking(id, { status: "cancelled" });
  }, [patchBooking]);

  const startJob = useCallback((id: string) => patchBooking(id, { status: "started" }), [patchBooking]);

  const completeJob = useCallback(
    (id: string) => {
      patchBooking(id, { status: "completed", paymentMethod: getBooking(id)?.paymentMethod ?? "UPI" });
      setState((s) => ({
        ...s,
        notifications: [
          { id: `nc-${id}`, role: "customer", title: "Job completed", body: "Your service is complete. Please rate your experience.", time: "Just now", read: false, kind: "booking" },
          { id: `nw-${id}`, role: "worker", title: "Payment credited", body: `Earnings settled for job SS-${id}. Check your Earnings tab.`, time: "Just now", read: false, kind: "payment" },
          ...s.notifications,
        ],
      }));
    },
    [getBooking, patchBooking]
  );

  const submitReview = useCallback(
    (id: string, rating: number, reviewText: string) => {
      patchBooking(id, { rating, reviewText });
    },
    [patchBooking]
  );

  const workerEarnings = useCallback(() => {
    return state.bookings
      .filter((b) => b.workerId === "w1" && b.status === "completed")
      .reduce((sum, b) => sum + Math.round(b.amount * 0.85), 0);
  }, [state.bookings]);

  const markAllRead = useCallback((role: Role) => {
    setState((s) => ({
      ...s,
      notifications: s.notifications.map((n) => (n.role === role ? { ...n, read: true } : n)),
    }));
  }, []);

  const unreadCount = useCallback(
    (role: Role) => state.notifications.filter((n) => n.role === role && !n.read).length,
    [state.notifications]
  );

  const setDecision = useCallback((workerId: string, d: "approved" | "rejected") => {
    setState((s) => ({ ...s, adminDecisions: { ...s.adminDecisions, [workerId]: d } }));
  }, []);

  const resetDemo = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch { /* ignore */ }
    setState(DEFAULTS);
  }, []);

  const value: DemoContextType = {
    ...state,
    hydrated,
    toasts,
    t,
    setLang: (lang) => setState((s) => ({ ...s, lang })),
    setRole: (role) => setState((s) => ({ ...s, role })),
    setMobile: (mobile) => setState((s) => ({ ...s, mobile })),
    resolveAccount,
    registerCustomer,
    registerWorker,
    updateWorker,
    approveWorker,
    setWorkerAvailable,
    adminLogin,
    logout,
    createBooking,
    getBooking,
    acceptJob,
    declineJob,
    startJob,
    completeJob,
    submitReview,
    workerEarnings,
    markAllRead,
    unreadCount,
    setDecision,
    resetDemo,
    toast,
  };

  return <DemoContext.Provider value={value}>{children}</DemoContext.Provider>;
}

export function useDemo() {
  const ctx = useContext(DemoContext);
  if (!ctx) throw new Error("useDemo must be used inside DemoProvider");
  return ctx;
}
