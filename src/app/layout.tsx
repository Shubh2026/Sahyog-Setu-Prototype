import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { DemoProvider } from "@/lib/demo-context";
import { ToastHost } from "@/components/ui";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export const metadata: Metadata = {
  title: "SahyogSetu — Cooperative Gig Services Platform",
  description:
    "SIH26089 · Ministry of Cooperation. A cooperative-owned digital marketplace connecting households with verified local workers — fair wages, transparent pricing, worker welfare.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans bg-paper text-ink antialiased">
        <DemoProvider>
          {children}
          <ToastHost />
        </DemoProvider>
      </body>
    </html>
  );
}
