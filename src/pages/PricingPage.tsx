import React from 'react';
import { Link } from 'react-router-dom';
import { TIERS } from '../mock/data';
import { computeDueTime } from '../mock/clock';
import { Check, ArrowRight } from 'lucide-react';

export const PricingPage: React.FC = () => {
  const now = new Date();

  return (
    <div className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-12 text-left">
      <div className="mb-10 pb-6 border-b border-[#E3E8F0]">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#1C2733]">
          Pricing
        </h1>
        <p className="text-sm sm:text-base text-[#5A6B7F] mt-2">
          Flat rates. No subscriptions, no hidden county search surcharges.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {TIERS.map((tier) => {
          const due = computeDueTime(tier.id, now);
          const isStandard = tier.id === '24h';
          return (
            <div
              key={tier.id}
              className={`bg-white rounded-card border ${
                isStandard ? 'border-[#1E535E] ring-1 ring-[#1E535E]' : 'border-[#D1E2E5]'
              } shadow-soft p-6 flex flex-col justify-between`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-[#5A6B7F] uppercase tracking-wider">
                    {tier.name}
                  </span>
                  {tier.badge && (
                    <span className="text-[10px] font-bold bg-[#E2EFF1] text-[#1E535E] px-2 py-0.5 rounded-pill font-mono">
                      {tier.badge}
                    </span>
                  )}
                </div>

                <div className="mb-4">
                  <span className="text-3xl font-extrabold font-mono text-[#1C2733]">${tier.price}</span>
                  <span className="text-xs text-[#5A6B7F] ml-1">/ flat fee</span>
                </div>

                <p className="text-xs text-[#5A6B7F] leading-relaxed mb-6">
                  {tier.description}
                </p>

                <div className="space-y-2.5 text-xs text-[#1C2733] pt-4 border-t border-[#D1E2E5]">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#1E535E]" />
                    <span>30 to 40-year chain of title</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#1E535E]" />
                    <span>Open mortgages &amp; deeds of trust</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#1E535E]" />
                    <span>Municipal liens &amp; tax judgements</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#1E535E]" />
                    <span>Utility easements &amp; covenants</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#1E535E]" />
                    <span>$1M+ Abstractor E&amp;O backing</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-[#D1E2E5]">
                <div className="text-[11px] text-[#5A6B7F] mb-3">
                  Typical turnaround:{' '}
                  <span className="font-mono font-bold text-[#1C2733]">{due.formatted}</span>
                </div>
                <Link
                  to="/"
                  className="btn-cta w-full py-2.5 text-xs font-bold flex items-center justify-center gap-1.5"
                >
                  <span>Select {tier.name}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
