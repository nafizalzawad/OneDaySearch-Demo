import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Logo } from '../components/brand/Logo';
import { useDemo } from '../context/DemoContext';
import { SAMPLE_ADDRESSES } from '../mock/data';
import { mockMarketplace } from '../mock/service';
import { Search, MapPin, CheckCircle2, AlertCircle, ArrowRight, ShieldCheck, Clock } from 'lucide-react';

export const HomePage: React.FC = () => {
  const { logoDirection } = useDemo();
  const navigate = useNavigate();

  const [addressInput, setAddressInput] = useState<string>('');
  const [isOpenDropdown, setIsOpenDropdown] = useState<boolean>(false);
  const [selectedAddress, setSelectedAddress] = useState<typeof SAMPLE_ADDRESSES[0] | null>(null);
  const [coverageState, setCoverageState] = useState<'IDLE' | 'CHECKING' | 'COVERED' | 'OUT_OF_COVERAGE'>('IDLE');
  const [waitlistEmail, setWaitlistEmail] = useState<string>('');
  const [waitlistSubmitted, setWaitlistSubmitted] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpenDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectSample = (sample: typeof SAMPLE_ADDRESSES[0]) => {
    setAddressInput(`${sample.address}, ${sample.city}, ${sample.state} ${sample.zip}`);
    setSelectedAddress(sample);
    setIsOpenDropdown(false);
    validateCoverage(sample.address, sample);
  };

  const handleSearchSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!addressInput.trim()) return;
    setIsOpenDropdown(false);
    validateCoverage(addressInput, selectedAddress);
  };

  const validateCoverage = async (rawText: string, existingSample: typeof SAMPLE_ADDRESSES[0] | null) => {
    setCoverageState('CHECKING');
    setWaitlistSubmitted(false);

    if (existingSample) {
      if (existingSample.inCoverage) {
        setCoverageState('COVERED');
      } else {
        setCoverageState('OUT_OF_COVERAGE');
      }
      return;
    }

    const result = await mockMarketplace.checkCoverage(rawText);
    if (result.inCoverage) {
      setCoverageState('COVERED');
    } else {
      setCoverageState('OUT_OF_COVERAGE');
    }
  };

  const proceedToDetails = () => {
    const addressToPass = addressInput.trim() || '10400 Fernwood Rd, Bethesda, MD 20817';
    navigate('/details', {
      state: {
        address: addressToPass,
        county: selectedAddress?.county || 'Montgomery County',
        state: selectedAddress?.state || 'MD',
        city: selectedAddress?.city || 'Bethesda',
        zip: selectedAddress?.zip || '20817',
        propertyType: selectedAddress?.propertyType || 'single_family',
      },
    });
  };

  return (
    <div className="relative flex-1 flex flex-col items-center justify-center px-4 sm:px-6 py-10 sm:py-16 min-h-[calc(100vh-140px)] overflow-hidden">
      {/* Signature Radiant Halo: Electric Bright Green #6AE878 ambient aura */}
      <div 
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[850px] h-[480px] bg-[radial-gradient(ellipse_75%_55%_at_50%_0%,rgba(106,232,120,0.30),rgba(219,252,197,0.18),transparent)] -z-10"
        aria-hidden="true"
      />

      <div className="w-full max-w-2xl flex flex-col items-center text-center">
        {/* Brand Logo */}
        <div className="mb-6 sm:mb-8">
          <Logo
            direction={logoDirection}
            variant="light"
            layout="stacked"
            size="lg"
            onClick={() => {
              setAddressInput('');
              setCoverageState('IDLE');
            }}
          />
        </div>

        {/* Brand Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#6AE878]/20 border border-[#6AE878]/50 text-[#1C2733] text-xs font-bold mb-4 shadow-sm backdrop-blur-sm">
          <span className="w-2 h-2 rounded-full bg-[#6AE878] shadow-[0_0_8px_#6AE878]" />
          <span>Title Search Marketplace · Maryland, Virginia &amp; DC</span>
        </div>

        {/* Client-Requested Tagline: Google Senior UI/UX Treatment */}
        <div className="mb-7 max-w-xl px-2">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1C2733] tracking-tight leading-tight sm:leading-snug">
            Accuracy no human can match, in one-tenth the time.
          </h1>
          <p className="text-sm sm:text-base text-[#5A6B7F] font-normal mt-2.5 leading-relaxed">
            An assistant searches. A real person approves every report.
          </p>
        </div>

        {/* Address Search Form */}
        <div ref={containerRef} className="w-full relative mb-4">
          <form
            onSubmit={handleSearchSubmit}
            className="w-full flex items-center bg-white rounded-pill border border-[#E3E8F0] shadow-card hover:border-[#6AE878] focus-within:border-[#6AE878] focus-within:ring-4 focus-within:ring-[#6AE878]/30 transition-all p-1.5"
          >
            <div className="pl-3.5 pr-2 text-[#5A6B7F]">
              <Search className="w-5 h-5 text-[#5A6B7F]" />
            </div>

            <input
              type="text"
              value={addressInput}
              onChange={(e) => {
                setAddressInput(e.target.value);
                setCoverageState('IDLE');
                setIsOpenDropdown(true);
              }}
              onFocus={() => setIsOpenDropdown(true)}
              placeholder="Enter property address in MD, VA, or DC..."
              className="w-full py-2.5 px-1 text-sm sm:text-base text-[#1C2733] bg-transparent focus:outline-none placeholder:text-[#5A6B7F]"
              autoComplete="off"
            />

            {/* Signature Main Brand Button in Bright Green #6AE878 */}
            <button
              type="submit"
              className="btn-brand px-6 sm:px-8 py-2.5 text-sm sm:text-base shrink-0"
            >
              Search
            </button>
          </form>

          {/* Autocomplete Sample Dropdown */}
          {isOpenDropdown && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-card border border-[#E3E8F0] shadow-elevated overflow-hidden z-30 text-left animate-in fade-in-50 duration-150">
              <div className="p-2.5 bg-[#F4F6FA] border-b border-[#E3E8F0] text-[11px] font-semibold text-[#5A6B7F] uppercase tracking-wider flex items-center justify-between">
                <span>Sample Properties (MD · VA · DC)</span>
                <span className="text-[10px] text-[#5A6B7F]">Click to preview</span>
              </div>
              <div className="divide-y divide-[#E3E8F0]/60 max-h-64 overflow-y-auto">
                {SAMPLE_ADDRESSES.map((sample, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSelectSample(sample)}
                    className="w-full px-4 py-3 text-left hover:bg-[#F4F6FA] flex items-center justify-between transition-colors group"
                  >
                    <div className="flex items-start gap-2.5">
                      <MapPin className="w-4 h-4 text-[#5A6B7F] group-hover:text-[#6AE878] mt-0.5 shrink-0 transition-colors" />
                      <div>
                        <div className="text-sm font-semibold text-[#1C2733]">
                          {sample.address}
                        </div>
                        <div className="text-xs text-[#5A6B7F]">
                          {sample.city}, {sample.county}, {sample.state} {sample.zip}
                        </div>
                      </div>
                    </div>
                    <div>
                      {sample.inCoverage ? (
                        <span className="text-[11px] font-bold text-[#1C2733] bg-[#6AE878] px-2.5 py-0.5 rounded-pill shrink-0 shadow-sm">
                          Covered
                        </span>
                      ) : (
                        <span className="text-[11px] font-medium text-[#5A6B7F] bg-[#F4F6FA] border border-[#E3E8F0] px-2 py-0.5 rounded-pill shrink-0">
                          Waitlist
                        </span>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Reassurance Subline */}
        <div className="flex items-center justify-center gap-2 text-xs text-[#5A6B7F] mb-6 font-medium">
          <span>From <strong className="font-mono text-[#1C2733] font-semibold">$229</strong></span>
          <span>·</span>
          <span>24-hour turnaround</span>
          <span>·</span>
          <span>MD, VA &amp; DC</span>
        </div>

        {/* S2 Address Check Transition / Results Box */}
        {coverageState === 'CHECKING' && (
          <div className="w-full max-w-lg p-4 bg-white rounded-card border border-[#E3E8F0] text-xs text-[#5A6B7F] flex items-center justify-center gap-2.5 shadow-soft">
            <span className="w-2.5 h-2.5 rounded-full bg-[#6AE878] shadow-[0_0_8px_#6AE878]" />
            <span>Checking county land records coverage...</span>
          </div>
        )}

        {coverageState === 'COVERED' && (
          <div className="w-full max-w-lg p-5 bg-white rounded-card border-2 border-[#6AE878] shadow-elevated text-left animate-in slide-in-from-bottom-2 duration-150">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-[#00BC82] shrink-0 mt-0.5" />
              <div className="flex-1">
                <h4 className="text-sm font-bold text-[#1C2733]">
                  {selectedAddress ? `${selectedAddress.city}, ${selectedAddress.county}, ${selectedAddress.state}` : 'Montgomery County, MD'} — covered area
                </h4>
                <p className="text-xs text-[#5A6B7F] mt-1 leading-relaxed">
                  Active abstractors available in this jurisdiction. Standard 24-hour delivery window.
                </p>
                <div className="mt-4 flex items-center justify-end">
                  <button
                    onClick={proceedToDetails}
                    className="btn-brand px-5 py-2 text-xs font-bold inline-flex items-center gap-1.5 shadow-md"
                  >
                    <span>Continue to property details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {coverageState === 'OUT_OF_COVERAGE' && (
          <div className="w-full max-w-lg p-5 bg-white rounded-card border border-[#E3E8F0] shadow-soft text-left animate-in slide-in-from-bottom-2 duration-150">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-[#F97316] shrink-0 mt-0.5" />
              <div className="flex-1">
                <h4 className="text-sm font-bold text-[#1C2733]">
                  Richmond City, VA — outside active 24-hour footprint
                </h4>
                <p className="text-xs text-[#5A6B7F] mt-1.5 leading-relaxed">
                  We guarantee 24-hour coverage across all 24 Maryland counties, Washington DC, and Northern/Central Virginia. Richmond coverage is coming soon.
                </p>

                {!waitlistSubmitted ? (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (waitlistEmail) setWaitlistSubmitted(true);
                    }}
                    className="mt-3.5 flex items-center gap-2"
                  >
                    <input
                      type="email"
                      value={waitlistEmail}
                      onChange={(e) => setWaitlistEmail(e.target.value)}
                      placeholder="Enter email for Richmond launch"
                      required
                      className="flex-1 text-xs px-3 py-2 rounded-lg border border-[#E3E8F0] text-[#1C2733] focus:outline-none focus:ring-1 focus:ring-[#6AE878]"
                    />
                    <button
                      type="submit"
                      className="btn-secondary px-3.5 py-2 text-xs font-bold shrink-0"
                    >
                      Join waitlist
                    </button>
                  </form>
                ) : (
                  <div className="mt-3 p-2 bg-[#DBFCC5]/60 rounded-lg text-xs font-medium text-[#1C2733] flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#00BC82]" />
                    <span>Thanks! We will notify you when Richmond is online.</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* 3 Real Product Pillars (Eliminates AI empty-screen look) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-2xl mt-12 pt-8 border-t border-[#E3E8F0]/80 text-left">
          <div className="p-4 rounded-xl bg-white/80 backdrop-blur-sm border border-[#E3E8F0] shadow-soft hover:border-[#6AE878] transition-colors">
            <div className="w-8 h-8 rounded-lg bg-[#6AE878]/20 flex items-center justify-center mb-2.5">
              <Clock className="w-4 h-4 text-[#00BC82]" />
            </div>
            <h3 className="text-xs font-bold text-[#1C2733]">24-Hour SLA Delivery</h3>
            <p className="text-[11px] text-[#5A6B7F] mt-1 leading-relaxed">
              Guaranteed turnaround in Eastern Time. Search starts promptly upon dispatch.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white/80 backdrop-blur-sm border border-[#E3E8F0] shadow-soft hover:border-[#6AE878] transition-colors">
            <div className="w-8 h-8 rounded-lg bg-[#6AE878]/20 flex items-center justify-center mb-2.5">
              <ShieldCheck className="w-4 h-4 text-[#00BC82]" />
            </div>
            <h3 className="text-xs font-bold text-[#1C2733]">Human Verified Abstract</h3>
            <p className="text-[11px] text-[#5A6B7F] mt-1 leading-relaxed">
              Assisted research examined and certified by licensed, $1M+ E&amp;O insured abstractors.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white/80 backdrop-blur-sm border border-[#E3E8F0] shadow-soft hover:border-[#6AE878] transition-colors">
            <div className="w-8 h-8 rounded-lg bg-[#6AE878]/20 flex items-center justify-center mb-2.5">
              <MapPin className="w-4 h-4 text-[#00BC82]" />
            </div>
            <h3 className="text-xs font-bold text-[#1C2733]">Regional Courthouse Access</h3>
            <p className="text-[11px] text-[#5A6B7F] mt-1 leading-relaxed">
              Direct coverage across all 24 Maryland counties, DC, and Northern/Central Virginia.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
