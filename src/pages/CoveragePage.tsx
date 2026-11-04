import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, CheckCircle2, ArrowRight } from 'lucide-react';

export const CoveragePage: React.FC = () => {
  const mdCounties = [
    'Allegany County', 'Anne Arundel County', 'Baltimore City', 'Baltimore County',
    'Calvert County', 'Caroline County', 'Carroll County', 'Cecil County',
    'Charles County', 'Dorchester County', 'Frederick County', 'Garrett County',
    'Harford County', 'Howard County', 'Kent County', 'Montgomery County',
    "Prince George's County", "Queen Anne's County", "St. Mary's County",
    'Somerset County', 'Talbot County', 'Washington County', 'Wicomico County', 'Worcester County'
  ];

  const vaCounties = [
    'Arlington County', 'Alexandria City', 'Fairfax County', 'Fairfax City',
    'Falls Church City', 'Loudoun County', 'Prince William County', 'Manassas City',
    'Manassas Park City', 'Fauquier County', 'Stafford County', 'Spotsylvania County'
  ];

  return (
    <div className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-12 text-left">
      <div className="mb-10 pb-6 border-b border-[#E3E8F0]">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0B1B33]">
          Regional Coverage: MD, VA &amp; DC
        </h1>
        <p className="text-sm sm:text-base text-[#4F5F78] mt-2">
          We maintain dedicated independent abstractors across all 24 Maryland jurisdictions, the District of Columbia, and Northern/Central Virginia.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {/* Maryland */}
        <div className="bg-white p-6 rounded-card border border-[#E3E8F0] shadow-soft">
          <div className="flex items-center justify-between pb-3 border-b border-[#E3E8F0] mb-4">
            <h3 className="text-base font-extrabold text-[#0B1B33]">Maryland (24/24)</h3>
            <span className="text-[10px] font-bold text-[#17824F] bg-[#17824F]/10 px-2 py-0.5 rounded-pill">
              100% Covered
            </span>
          </div>
          <div className="grid grid-cols-1 gap-1 text-xs text-[#4F5F78]">
            {mdCounties.map((c) => (
              <div key={c} className="flex items-center gap-1.5 py-0.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#17824F] shrink-0" />
                <span>{c}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Washington DC */}
        <div className="bg-white p-6 rounded-card border border-[#E3E8F0] shadow-soft">
          <div className="flex items-center justify-between pb-3 border-b border-[#E3E8F0] mb-4">
            <h3 className="text-base font-extrabold text-[#0B1B33]">District of Columbia</h3>
            <span className="text-[10px] font-bold text-[#17824F] bg-[#17824F]/10 px-2 py-0.5 rounded-pill">
              All 8 Wards
            </span>
          </div>
          <p className="text-xs text-[#4F5F78] mb-4 leading-relaxed">
            Direct access to the District of Columbia Recorder of Deeds, Superior Court land and tax dockets, and assessment rolls.
          </p>
          <div className="space-y-1.5 text-xs text-[#0B1B33]">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#17824F]" />
              <span>DC Recorder of Deeds</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#17824F]" />
              <span>DC Superior Court Judgments</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#17824F]" />
              <span>OTR Real Property Tax Rolls</span>
            </div>
          </div>
        </div>

        {/* Virginia */}
        <div className="bg-white p-6 rounded-card border border-[#E3E8F0] shadow-soft">
          <div className="flex items-center justify-between pb-3 border-b border-[#E3E8F0] mb-4">
            <h3 className="text-base font-extrabold text-[#0B1B33]">Northern &amp; Central VA</h3>
            <span className="text-[10px] font-bold text-[#17824F] bg-[#17824F]/10 px-2 py-0.5 rounded-pill">
              High Density
            </span>
          </div>
          <div className="grid grid-cols-1 gap-1 text-xs text-[#4F5F78]">
            {vaCounties.map((c) => (
              <div key={c} className="flex items-center gap-1.5 py-0.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#17824F] shrink-0" />
                <span>{c}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="text-center">
        <Link to="/" className="btn-primary px-8 py-3 text-xs font-bold inline-flex items-center gap-2">
          <span>Search your property address</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};
