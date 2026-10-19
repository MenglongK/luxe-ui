import React from "react";
import { Truck, Sparkles, RefreshCw, ShieldCheck } from "lucide-react";
import { storePerks } from "@/data";

const iconMap = {
  truck: Truck,
  sparkles: Sparkles,
  refresh: RefreshCw,
  shield: ShieldCheck,
};

export default function TrustFeatures() {
  return (
    <section aria-label="Store guarantees" className="w-full bg-[#faf9f6] dark:bg-[#121212] border-b border-[#eae5de] dark:border-neutral-800 py-10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {storePerks.map((perk) => {
            const Icon = iconMap[perk.iconName] || Sparkles;
            return (
              <div
                key={perk.id}
                className="flex items-start gap-4 p-4 rounded-xl bg-white/70 dark:bg-neutral-900/60 border border-[#eae5de] dark:border-neutral-800 hover:border-[#c5a880]/60 transition-colors shadow-2xs"
              >
                <div className="p-2.5 rounded-lg bg-[#f4ece1] dark:bg-neutral-800 text-[#121212] dark:text-[#c5a880] shrink-0">
                  <Icon size={20} className="text-[#9e7d53] dark:text-[#c5a880]" />
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-semibold text-neutral-900 dark:text-white tracking-tight">
                    {perk.title}
                  </h3>
                  <p className="mt-1 text-[11px] sm:text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
                    {perk.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
