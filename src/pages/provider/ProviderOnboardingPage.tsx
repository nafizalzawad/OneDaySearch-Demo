import React, { useState } from 'react';
import { ShieldCheck, Upload, CheckCircle2, FileText, ArrowRight } from 'lucide-react';

export const ProviderOnboardingPage: React.FC = () => {
  const [eoUploaded, setEoUploaded] = useState<boolean>(true);
  const [eoPolicy, setEoPolicy] = useState<string>('TRV-EO-9844120-04');
  const [eoExpiry, setEoExpiry] = useState<string>('2027-08-15');
  const [coverageAmt, setCoverageAmt] = useState<string>('$1,000,000');
  const [saved, setSaved] = useState<boolean>(false);

  const counties = [
    { name: 'Montgomery County, MD', checked: true },
    { name: 'District of Columbia', checked: true },
    { name: 'Frederick County, MD', checked: true },
    { name: 'Howard County, MD', checked: false },
    { name: 'Fairfax County, VA', checked: false },
    { name: 'Arlington County, VA', checked: false },
  ];

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="pb-4 border-b border-[#D1E2E5]">
        <h1 className="text-xl sm:text-2xl font-extrabold text-[#1C2733]">
          Abstractor Verification &amp; E&amp;O Credentials
        </h1>
        <p className="text-xs text-[#5A6B7F]">
          All active title abstractors must maintain verified Errors and Omissions insurance and specify county courthouse footprints.
        </p>
      </div>

      <div className="bg-white p-6 sm:p-8 rounded-card border border-[#D1E2E5] shadow-soft space-y-6">
        {/* E&O Insurance Section */}
        <div>
          <h2 className="text-sm font-extrabold uppercase tracking-wider text-[#1C2733] mb-3 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#1E535E]" />
            1. Professional Liability (E&amp;O) Insurance
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs mb-4">
            <div>
              <label className="block text-[#5A6B7F] font-bold mb-1">Policy / Certificate #</label>
              <input
                type="text"
                value={eoPolicy}
                onChange={(e) => setEoPolicy(e.target.value)}
                className="w-full p-2.5 rounded-lg border border-[#D1E2E5] font-mono"
              />
            </div>
            <div>
              <label className="block text-[#5A6B7F] font-bold mb-1">Expiration Date</label>
              <input
                type="date"
                value={eoExpiry}
                onChange={(e) => setEoExpiry(e.target.value)}
                className="w-full p-2.5 rounded-lg border border-[#D1E2E5] font-mono"
              />
            </div>
            <div>
              <label className="block text-[#5A6B7F] font-bold mb-1">Per Claim Coverage</label>
              <input
                type="text"
                value={coverageAmt}
                onChange={(e) => setCoverageAmt(e.target.value)}
                className="w-full p-2.5 rounded-lg border border-[#D1E2E5] font-mono"
              />
            </div>
          </div>

          <div className="p-4 bg-[#F4F6FA] border border-[#D1E2E5] rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-2.5 text-xs text-[#1C2733]">
              <FileText className="w-5 h-5 text-[#1E535E]" />
              <div>
                <span className="font-bold block">Travelers_Casualty_EO_2026_2027.pdf</span>
                <span className="text-[10px] text-[#5A6B7F]">Verified Active · 1.4 MB · Exp: Aug 15, 2027</span>
              </div>
            </div>
            <button
              type="button"
              className="text-xs font-bold text-[#1C2733] hover:text-[#1E535E] underline"
            >
              Replace Certificate
            </button>
          </div>
        </div>

        {/* Coverage Footprint */}
        <div className="pt-4 border-t border-[#D1E2E5]">
          <h2 className="text-sm font-extrabold uppercase tracking-wider text-[#1C2733] mb-3">
            2. Covered Counties &amp; Municipal Jurisdictions
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            {counties.map((c, i) => (
              <label key={i} className="flex items-center gap-2 p-2 rounded-lg border border-[#D1E2E5] hover:bg-[#F8FAFC] cursor-pointer">
                <input type="checkbox" defaultChecked={c.checked} className="accent-[#1C2733] w-4 h-4 rounded" />
                <span className="font-semibold text-[#1C2733]">{c.name}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Terms Agreement */}
        <div className="pt-4 border-t border-[#D1E2E5]">
          <label className="flex items-start gap-2.5 cursor-pointer text-xs text-[#5A6B7F]">
            <input type="checkbox" defaultChecked className="accent-[#1C2733] w-4 h-4 mt-0.5 rounded" />
            <span>
              I certify that I am a licensed or qualified independent title abstractor in good standing, that my E&amp;O policy remains in full force, and that all reports conform to 30/40-year statutory title search standards.
            </span>
          </label>
        </div>

        <div className="pt-2 flex items-center justify-between">
          {saved ? (
            <span className="text-xs font-bold text-[#1E535E] flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4" /> Credentials saved successfully
            </span>
          ) : <div />}
          <button
            type="button"
            onClick={() => setSaved(true)}
            className="btn-primary px-6 py-2.5 text-xs font-bold"
          >
            Save &amp; Update Profile
          </button>
        </div>
      </div>
    </div>
  );
};
