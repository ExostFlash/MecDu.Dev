import { asset } from "@/lib/site";

/**
 * Le logo (TV noire) disparaît sur fond noir : on le pose sur une pastille claire
 * avec un liseré et un halo rouges pour qu'il ressorte.
 */
export default function Logo({ size = "md" }: { size?: "md" | "lg" }) {
  const box = size === "lg" ? "size-14 rounded-2xl" : "size-11 rounded-xl";
  return (
    <span
      className={`relative inline-flex shrink-0 items-center justify-center bg-gradient-to-br from-white to-neutral-300 ring-1 ring-accent/70 shadow-[0_0_18px_rgba(195,3,0,0.45)] transition-shadow group-hover:shadow-[0_0_26px_rgba(255,42,31,0.7)] ${box}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={asset("/images/New.png")}
        alt="Logo MecDu.Dev"
        className="size-full scale-125 object-contain"
      />
    </span>
  );
}
