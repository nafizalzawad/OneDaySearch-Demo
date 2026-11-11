import React, { useState } from 'react';
import { Settings, Save, CheckCircle2 } from 'lucide-react';

export const AdminConfigPage: React.FC = () => {
  const [standardPrice, setStandardPrice] = useState<number>(229);
  const [expressPrice, setExpressPrice] = useState<number>(249);
  const [rushPrice, setRushPrice] = useState<number>(299);
  const [standardPayout, setStandardPayout] = useState<number>(145);
  const [expressPayout, setExpressPayout] = useState<number>(165);
  const [rushPayout, setRushPayout] = useState<number>(195);
  const [offerTimeout, setOfferTimeout] = useState<number>(45);
  const [minProviders, setMinProviders] = useState<number>(2);
  const [businessStart, setBusinessStart] = useState<string>('09:00');
  const [businessEnd, setBusinessEnd] = useState<string>('17:00');
  const [saved, setSaved] = useState<boolean>(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="max-w-4xl space-y-6">
      <div className="pb-4 border-b border-[#D1E2E5]">
        <h1 className="text-xl sm:text-2xl font-extrabold text-[#1C2733]">
          Marketplace Operational Configuration
        </h1>
        <p className="text-xs text-[#5A6B7F]">
          Configure turnaround tier flat fees, abstractor payout splits, offer timeout thresholds, and courthouse operating windows.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Tier Pricing & Payout Config */}
        <div className="bg-white p-6 rounded-card border border-[#D1E2E5] shadow-soft space-y-4">
          <h2 className="text-sm font-extrabold uppercase tracking-wider text-[#1C2733] pb-2 border-b border-[#D1E2E5]">
            1. Tier Pricing &amp; Abstractor Revenue Share
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            {/* Standard 24h */}
            <div className="p-3 bg-[#F8FAFC] rounded-lg border border-[#D1E2E5]">
              <span className="font-bold text-[#1C2733] block mb-2">Standard 24-Hour Tier</span>
              <div className="space-y-2">
                <div>
                  <label className="text-[#5A6B7F] block text-[10px]">Customer Price ($)</label>
                  <input
                    type="number"
                    value={standardPrice}
                    onChange={(e) => setStandardPrice(Number(e.target.value))}
                    className="w-full p-2 rounded border border-[#D1E2E5] font-mono text-[#1C2733] font-bold"
                  />
                </div>
                <div>
                  <label className="text-[#5A6B7F] block text-[10px]">Abstractor Payout ($)</label>
                  <input
                    type="number"
                    value={standardPayout}
                    onChange={(e) => setStandardPayout(Number(e.target.value))}
                    className="w-full p-2 rounded border border-[#D1E2E5] font-mono text-[#1E535E] font-bold"
                  />
                </div>
              </div>
            </div>

            {/* Express 12h */}
            <div className="p-3 bg-[#F8FAFC] rounded-lg border border-[#D1E2E5]">
              <span className="font-bold text-[#1C2733] block mb-2">Express 12-Hour Tier</span>
              <div className="space-y-2">
                <div>
                  <label className="text-[#5A6B7F] block text-[10px]">Customer Price ($)</label>
                  <input
                    type="number"
                    value={expressPrice}
                    onChange={(e) => setExpressPrice(Number(e.target.value))}
                    className="w-full p-2 rounded border border-[#D1E2E5] font-mono text-[#1C2733] font-bold"
                  />
                </div>
                <div>
                  <label className="text-[#5A6B7F] block text-[10px]">Abstractor Payout ($)</label>
                  <input
                    type="number"
                    value={expressPayout}
                    onChange={(e) => setExpressPayout(Number(e.target.value))}
                    className="w-full p-2 rounded border border-[#D1E2E5] font-mono text-[#1E535E] font-bold"
                  />
                </div>
              </div>
            </div>

            {/* Rush 6h */}
            <div className="p-3 bg-[#F8FAFC] rounded-lg border border-[#D1E2E5]">
              <span className="font-bold text-[#1C2733] block mb-2">Same-Day 6-Hour Rush</span>
              <div className="space-y-2">
                <div>
                  <label className="text-[#5A6B7F] block text-[10px]">Customer Price ($)</label>
                  <input
                    type="number"
                    value={rushPrice}
                    onChange={(e) => setRushPrice(Number(e.target.value))}
                    className="w-full p-2 rounded border border-[#D1E2E5] font-mono text-[#1C2733] font-bold"
                  />
                </div>
                <div>
                  <label className="text-[#5A6B7F] block text-[10px]">Abstractor Payout ($)</label>
                  <input
                    type="number"
                    value={rushPayout}
                    onChange={(e) => setRushPayout(Number(e.target.value))}
                    className="w-full p-2 rounded border border-[#D1E2E5] font-mono text-[#1E535E] font-bold"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dispatch Rules & Business Hours */}
        <div className="bg-white p-6 rounded-card border border-[#D1E2E5] shadow-soft space-y-4">
          <h2 className="text-sm font-extrabold uppercase tracking-wider text-[#1C2733] pb-2 border-b border-[#D1E2E5]">
            2. Routing Thresholds &amp; Eastern Time Operating Hours
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="font-bold text-[#1C2733] block mb-1">
                Dispatch Offer Auto-Timeout (Seconds)
              </label>
              <input
                type="number"
                value={offerTimeout}
                onChange={(e) => setOfferTimeout(Number(e.target.value))}
                className="w-full p-2.5 rounded-lg border border-[#D1E2E5] font-mono"
              />
              <span className="text-[10px] text-[#5A6B7F]">Re-routes to next available abstractor when timer hits 0.</span>
            </div>

            <div>
              <label className="font-bold text-[#1C2733] block mb-1">
                Minimum Active Abstractors Required Per County
              </label>
              <input
                type="number"
                value={minProviders}
                onChange={(e) => setMinProviders(Number(e.target.value))}
                className="w-full p-2.5 rounded-lg border border-[#D1E2E5] font-mono"
              />
              <span className="text-[10px] text-[#5A6B7F]">If below this threshold, 6h rush tier is automatically throttled.</span>
            </div>

            <div>
              <label className="font-bold text-[#1C2733] block mb-1">
                Land Records Opening Hour (ET)
              </label>
              <input
                type="time"
                value={businessStart}
                onChange={(e) => setBusinessStart(e.target.value)}
                className="w-full p-2.5 rounded-lg border border-[#D1E2E5] font-mono"
              />
            </div>

            <div>
              <label className="font-bold text-[#1C2733] block mb-1">
                Land Records Cutoff / Closing Hour (ET)
              </label>
              <input
                type="time"
                value={businessEnd}
                onChange={(e) => setBusinessEnd(e.target.value)}
                className="w-full p-2.5 rounded-lg border border-[#D1E2E5] font-mono"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          {saved ? (
            <span className="text-xs font-bold text-[#1E535E] flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" /> Parameters saved successfully!
            </span>
          ) : <div />}
          <button type="submit" className="btn-primary px-8 py-3 text-xs font-bold shadow-soft">
            Save Platform Settings
          </button>
        </div>
      </form>
    </div>
  );
};
