import { cn } from "@/lib/utils";

export function Logo({
  size = "md",
  light = false,
  className,
  hrefless,
}: {
  size?: "sm" | "md" | "lg";
  light?: boolean;
  className?: string;
  hrefless?: boolean;
}) {
  const dims = { sm: 34, md: 40, lg: 56 }[size];
  const text = { sm: "text-[17px]", md: "text-lg", lg: "text-[26px]" }[size];
  return (
    <span className={cn("inline-flex items-center gap-2.5 select-none", className)} aria-label="SahyogSetu">
      <span
        className="rounded-[10px] bg-white shadow-soft ring-1 ring-line overflow-hidden shrink-0 flex items-center justify-center"
        style={{ width: dims, height: dims }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/brand/logo.png" alt="SahyogSetu logo mark" width={dims} height={dims} className="object-cover" />
      </span>
      <span className="flex flex-col leading-none">
        <span className={cn("font-extrabold tracking-tight", text, light ? "text-white" : "text-ink")}>
          Sahyog<span className={light ? "text-leaf-300" : "text-forest-600"}>Setu</span>
        </span>
        {size === "lg" && (
          <span className={cn("text-[11px] font-medium mt-1 tracking-wide", light ? "text-white/70" : "text-mist")}>
            सहयोग सेतु · Cooperative Services
          </span>
        )}
      </span>
    </span>
  );
}
