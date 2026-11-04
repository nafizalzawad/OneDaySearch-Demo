import React from 'react';
import { Link } from 'react-router-dom';
import { TIERS } from '../mock/data';
import { computeDueTime } from '../mock/clock';
import { Check, Clock, Zap, ArrowRight } from 'lucide-react';

export const PricingPage: React.FC = () => {
  const now = new Date();

  return (
    <div className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-12 text-left">
      <div className="mb-10 pb-6 border-b border-[#E3E8F0]">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0B1B33]">
          Transparent Flat-Rate Pricing
        </h1>
        <p className="text-sm sm:text-base text-[#4F5F78] mt-2">
          No subscription fees, no county surcharge surprises. All prices are flat and all-inclusive.
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
                isStandard ? 'border-[#0B1B33] ring-1 ring-[#0B1B33]' : 'border-[#E3E8F0]'
              } shadow-soft p-6 flex flex-col justify-between`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-[#4F5F78] uppercase tracking-wider">
                    {tier.name}
                  </span>
                  {tier.badge && (
                    <span className="text-[10px] font-bold bg-[#FDEBD0] text-[#0B1B33] px-2 py-0.5 rounded-pill font-mono">
                      {tier.badge}
                    </span>
                  )}
                </div>

                <div className="mb-4">
                  <span className="text-3xl font-extrabold font-mono text-[#0B1B33]">${tier.price}</span>
                  <span className="text-xs text-[#4F5F78] ml-1">/ flat rate</span>
                </div>

                <p className="text-xs text-[#4F5F78] leading-relaxed mb-6">
                  {tier.description}
                </p>

                <div className="space-y-2.5 text-xs text-[#0B1B33] pt-4 border-t border-[#E3E8F0]">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#17824F]" />
                    <span>30 to 40-year chain of title</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#17824F]" />
                    <span>Open mortgages &amp; deeds of trust</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#17824F]" />
                    <span>Municipal liens &amp; tax judgements</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#17824F]" />
                    <span>Utility easements &amp; covenants</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#17824F]" />
                    <span>$1M+ Abstractor E&amp;O backing</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-[#E3E8F0]">
                <div className="text-[11px] text-[#4F5F78] mb-3">
                  Typical SLA:{' '}
                  <span className="font-mono font-bold text-[#0B1B33]">{due.formatted}</span>
                </div>
                <Link
                  to="/"
                  className="btn-primary w-full py-2.5 text-xs font-bold flex items-center justify-center gap-1.5"
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
