"use client";

import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  BarChart, Bar, PieChart, Pie, Cell, LineChart, Line, Legend,
} from "recharts";

const tooltipStyle = {
  borderRadius: 14,
  border: "1px solid #e3eae4",
  boxShadow: "0 8px 24px -8px rgb(23 34 28 / 0.15)",
  fontSize: 13,
  fontWeight: 600,
  color: "#17221c",
};

const axisStyle = { fontSize: 12, fill: "#68756d" } as const;

export function BookingTrendChart({ data }: { data: { day: string; bookings: number }[] }) {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <AreaChart data={data} margin={{ top: 10, right: 8, left: -16, bottom: 0 }}>
        <defs>
          <linearGradient id="trend" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0d6b47" stopOpacity={0.28} />
            <stop offset="100%" stopColor="#0d6b47" stopOpacity={0.02} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#e3eae4" vertical={false} />
        <XAxis dataKey="day" tick={axisStyle} axisLine={false} tickLine={false} />
        <YAxis tick={axisStyle} axisLine={false} tickLine={false} />
        <Tooltip contentStyle={tooltipStyle} cursor={{ stroke: "#22a06b", strokeWidth: 1 }} />
        <Area type="monotone" dataKey="bookings" stroke="#0d6b47" strokeWidth={2.5} fill="url(#trend)" name="Bookings" />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export function ServiceDemandChart({ data }: { data: { service: string; bookings: number }[] }) {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <BarChart data={data} margin={{ top: 10, right: 8, left: -16, bottom: 0 }} barCategoryGap="28%">
        <CartesianGrid strokeDasharray="3 3" stroke="#e3eae4" vertical={false} />
        <XAxis dataKey="service" tick={{ ...axisStyle, fontSize: 11 }} axisLine={false} tickLine={false} interval={0} />
        <YAxis tick={axisStyle} axisLine={false} tickLine={false} />
        <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "rgb(34 160 107 / 0.06)" }} />
        <Bar dataKey="bookings" radius={[8, 8, 0, 0]} name="Bookings">
          {data.map((_, i) => (
            <Cell key={i} fill={i % 2 === 0 ? "#0d6b47" : "#22a06b"} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

const PIE_COLORS = ["#0d6b47", "#22a06b", "#2563eb", "#d97706", "#94a8a0"];

export function WorkerDistChart({ data }: { data: { area: string; workers: number }[] }) {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <PieChart>
        <Pie data={data} dataKey="workers" nameKey="area" innerRadius={58} outerRadius={92} paddingAngle={3} strokeWidth={0}>
          {data.map((_, i) => (
            <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
          ))}
        </Pie>
        <Tooltip contentStyle={tooltipStyle} />
        <Legend iconType="circle" iconSize={9} wrapperStyle={{ fontSize: 12, fontWeight: 600 }} />
      </PieChart>
    </ResponsiveContainer>
  );
}

export function EarningsBarChart({ data }: { data: { day: string; amount: number }[] }) {
  return (
    <ResponsiveContainer width="100%" height={240}>
      <BarChart data={data} margin={{ top: 10, right: 8, left: -18, bottom: 0 }} barCategoryGap="30%">
        <defs>
          <linearGradient id="earn" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#22a06b" />
            <stop offset="100%" stopColor="#0d6b47" />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#e3eae4" vertical={false} />
        <XAxis dataKey="day" tick={axisStyle} axisLine={false} tickLine={false} />
        <YAxis tick={axisStyle} axisLine={false} tickLine={false} />
        <Tooltip contentStyle={tooltipStyle} formatter={(v) => [`₹${Number(v).toLocaleString("en-IN")}`, "Earnings"]} cursor={{ fill: "rgb(34 160 107 / 0.06)" }} />
        <Bar dataKey="amount" fill="url(#earn)" radius={[8, 8, 0, 0]} name="Earnings" />
      </BarChart>
    </ResponsiveContainer>
  );
}

export function DemandLineChart({ data, dataKey = "requests", nameKey = "slot", color = "#2563eb" }: {
  data: Record<string, string | number>[];
  dataKey?: string;
  nameKey?: string;
  color?: string;
}) {
  return (
    <ResponsiveContainer width="100%" height={230}>
      <LineChart data={data} margin={{ top: 10, right: 8, left: -18, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e3eae4" vertical={false} />
        <XAxis dataKey={nameKey} tick={{ ...axisStyle, fontSize: 11 }} axisLine={false} tickLine={false} interval={0} />
        <YAxis tick={axisStyle} axisLine={false} tickLine={false} />
        <Tooltip contentStyle={tooltipStyle} />
        <Line type="monotone" dataKey={dataKey} stroke={color} strokeWidth={2.5} dot={{ r: 4, fill: color, strokeWidth: 0 }} name="Requests" />
      </LineChart>
    </ResponsiveContainer>
  );
}

export function AreaBarChart({ data }: { data: { area: string; requests: number }[] }) {
  return (
    <ResponsiveContainer width="100%" height={230}>
      <BarChart data={data} layout="vertical" margin={{ top: 4, right: 16, left: 12, bottom: 0 }} barCategoryGap="22%">
        <CartesianGrid strokeDasharray="3 3" stroke="#e3eae4" horizontal={false} />
        <XAxis type="number" hide />
        <YAxis type="category" dataKey="area" tick={{ ...axisStyle, fontSize: 11, fontWeight: 600 }} axisLine={false} tickLine={false} width={86} />
        <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "rgb(37 99 235 / 0.05)" }} />
        <Bar dataKey="requests" fill="#2563eb" radius={[0, 8, 8, 0]} name="Requests" barSize={18} />
      </BarChart>
    </ResponsiveContainer>
  );
}
