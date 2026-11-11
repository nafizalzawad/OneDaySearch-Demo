import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Logo } from '../components/brand/Logo';
import { useDemo } from '../context/DemoContext';
import { SAMPLE_ADDRESSES } from '../mock/data';
import { mockMarketplace } from '../mock/service';
import { Search, MapPin, CheckCircle2, AlertCircle, ArrowRight, ShieldCheck, Clock } from 'lucide-react';

export const HomePage: React.FC = () => {
  const { logoDirection, theme } = useDemo();
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

  const isGreen = theme === 'vibrant-green';

  return (
    <div
      className={`relative flex-1 flex flex-col items-center justify-center px-4 sm:px-6 py-2 sm:py-4 overflow-hidden ${
        isGreen ? 'bg-vibrant-teal-canvas' : ''
      }`}
    >
      <div className="w-full max-w-2xl flex flex-col items-center text-center my-auto">
        {/* Brand Logo */}
        <div className="mb-2 sm:mb-3">
          <Logo
            direction={logoDirection}
            variant="light"
            layout="stacked"
            size="md"
            onClick={() => {
              setAddressInput('');
              setCoverageState('IDLE');
            }}
          />
        </div>

        {/* High-Contrast Pill Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 text-[#1C2733] text-[11px] sm:text-xs font-bold mb-2.5 shadow-sm border border-white/80 backdrop-blur-sm">
          <span className="w-2 h-2 rounded-full bg-[#1E535E]" />
          <span>Title Search Marketplace · Maryland, Virginia &amp; DC</span>
        </div>

        {/* Client-Requested Tagline: Google Senior UI/UX Treatment */}
        <div className="mb-3.5 sm:mb-4 max-w-xl px-2">
          <h1 className="text-xl sm:text-2xl lg:text-[28px] font-extrabold text-[#1C2733] tracking-tight leading-tight">
            Accuracy no human can match, in one-tenth the time.
          </h1>
          <p className="text-xs sm:text-sm text-[#1C2733]/90 font-medium mt-1 leading-relaxed">
            An assistant searches. A real person approves every report.
          </p>
        </div>

        {/* Address Search Form: Floating White Pill */}
        <div ref={containerRef} className="w-full max-w-xl relative mb-2">
          <form
            onSubmit={handleSearchSubmit}
            className="w-full flex items-center bg-white rounded-pill border border-white/80 shadow-[0_12px_35px_rgba(20,52,59,0.15)] hover:shadow-[0_16px_40px_rgba(20,52,59,0.2)] focus-within:ring-4 focus-within:ring-[#1E535E]/30 transition-all p-1.5"
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
              className="w-full py-2 px-1 text-sm sm:text-base text-[#1C2733] bg-transparent focus:outline-none placeholder:text-[#5A6B7F]"
              autoComplete="off"
            />

            {/* High-Pop Orange CTA Button (Complementary contrast against blueish-green background) */}
            <button
              type="submit"
              className="btn-cta px-6 sm:px-8 py-2 text-sm sm:text-base shrink-0"
            >
              Search
            </button>
          </form>

          {/* Autocomplete Sample Dropdown */}
          {isOpenDropdown && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-card border border-[#D1E2E5] shadow-elevated overflow-hidden z-30 text-left animate-in fade-in-50 duration-150">
              <div className="p-2.5 bg-[#F4F8F9] border-b border-[#D1E2E5] text-[11px] font-semibold text-[#5A6B7F] uppercase tracking-wider flex items-center justify-between">
                <span>Sample Properties (MD · VA · DC)</span>
                <span className="text-[10px] text-[#5A6B7F]">Click to preview</span>
              </div>
              <div className="divide-y divide-[#D1E2E5]/60 max-h-64 overflow-y-auto">
                {SAMPLE_ADDRESSES.map((sample, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSelectSample(sample)}
                    className="w-full px-4 py-3 text-left hover:bg-[#F4F8F9] flex items-center justify-between transition-colors group"
                  >
                    <div className="flex items-start gap-2.5">
                      <MapPin className="w-4 h-4 text-[#5A6B7F] group-hover:text-[#1E535E] mt-0.5 shrink-0 transition-colors" />
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
                        <span className="text-[11px] font-bold text-[#1E535E] bg-[#E2EFF1] px-2.5 py-0.5 rounded-pill shrink-0">
                          Covered
                        </span>
                      ) : (
                        <span className="text-[11px] font-medium text-[#5A6B7F] bg-[#F4F8F9] border border-[#D1E2E5] px-2 py-0.5 rounded-pill shrink-0">
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
        <div className="flex items-center justify-center gap-2 text-xs text-[#1C2733] mb-3.5 sm:mb-4 font-bold tracking-tight">
          <span>From <strong className="font-mono text-[#1C2733] font-extrabold underline">$229</strong></span>
          <span>·</span>
          <span>Guaranteed 24-hour turnaround</span>
          <span>·</span>
          <span>MD, VA &amp; DC</span>
        </div>

        {/* S2 Address Check Transition / Results Box */}
        {coverageState === 'CHECKING' && (
          <div className="w-full max-w-lg p-3 bg-white rounded-card border border-white/80 text-xs text-[#1C2733] font-semibold flex items-center justify-center gap-2.5 shadow-elevated mb-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#1E535E]" />
            <span>Checking county land records coverage...</span>
          </div>
        )}

        {coverageState === 'COVERED' && (
          <div className="w-full max-w-lg p-4 bg-white rounded-card border border-white/80 shadow-[0_16px_40px_rgba(20,52,59,0.18)] text-left animate-in slide-in-from-bottom-2 duration-150 mb-3">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-[#1E535E] shrink-0 mt-0.5" />
              <div className="flex-1">
                <h4 className="text-sm font-bold text-[#1C2733]">
                  {selectedAddress ? `${selectedAddress.city}, ${selectedAddress.county}, ${selectedAddress.state}` : 'Montgomery County, MD'} — covered area
                </h4>
                <p className="text-xs text-[#5A6B7F] mt-1 leading-relaxed">
                  Active abstractors available in this jurisdiction. Standard 24-hour delivery window.
                </p>
                <div className="mt-3 flex items-center justify-end">
                  <button
                    onClick={proceedToDetails}
                    className="btn-cta px-5 py-2 text-xs font-bold inline-flex items-center gap-1.5 shadow-md"
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
          <div className="w-full max-w-lg p-4 bg-white rounded-card border border-white/80 shadow-[0_16px_40px_rgba(20,52,59,0.18)] text-left animate-in slide-in-from-bottom-2 duration-150 mb-3">
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
                    className="mt-3 flex items-center gap-2"
                  >
                    <input
                      type="email"
                      value={waitlistEmail}
                      onChange={(e) => setWaitlistEmail(e.target.value)}
                      placeholder="Enter email for Richmond launch"
                      required
                      className="flex-1 text-xs px-3 py-2 rounded-lg border border-[#D1E2E5] text-[#1C2733] focus:outline-none focus:ring-2 focus:ring-[#1E535E]"
                    />
                    <button
                      type="submit"
                      className="btn-secondary px-3.5 py-2 text-xs font-bold shrink-0"
                    >
                      Join waitlist
                    </button>
                  </form>
                ) : (
                  <div className="mt-3 p-2 bg-[#E2EFF1] rounded-lg text-xs font-medium text-[#1E535E] flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#1E535E]" />
                    <span>Thanks! We will notify you when Richmond is online.</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* 3 Real Product Pillars: Floating Pill Cluster (Fits in 100vh without vertical scroll) */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 w-full max-w-xl text-left">
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/95 border border-white/80 shadow-sm backdrop-blur-sm">
            <Clock className="w-3.5 h-3.5 text-[#1E535E] shrink-0" />
            <div className="text-[11px] font-bold text-[#1C2733]">
              24h SLA Delivery <span className="font-normal text-[#5A6B7F]">· Strict ET Clock</span>
            </div>
          </div>

          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/95 border border-white/80 shadow-sm backdrop-blur-sm">
            <ShieldCheck className="w-3.5 h-3.5 text-[#1E535E] shrink-0" />
            <div className="text-[11px] font-bold text-[#1C2733]">
              Human Verified <span className="font-normal text-[#5A6B7F]">· $1M+ Insured Abstract</span>
            </div>
          </div>

          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/95 border border-white/80 shadow-sm backdrop-blur-sm">
            <MapPin className="w-3.5 h-3.5 text-[#1E535E] shrink-0" />
            <div className="text-[11px] font-bold text-[#1C2733]">
              Courthouse Access <span className="font-normal text-[#5A6B7F]">· MD · VA · DC</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
