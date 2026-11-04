import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Logo } from '../components/brand/Logo';
import { useDemo } from '../context/DemoContext';
import { SAMPLE_ADDRESSES } from '../mock/data';
import { mockMarketplace } from '../mock/service';
import { Search, MapPin, CheckCircle2, AlertCircle, ArrowRight, Mail } from 'lucide-react';

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
    // Store property address in session or pass via state
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
    <div className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 py-12 min-h-[calc(100vh-140px)]">
      <div className="w-full max-w-2xl flex flex-col items-center text-center">
        {/* Centered Logo ("The Google screen") */}
        <div className="mb-8">
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

        {/* Address Search Form */}
        <div ref={containerRef} className="w-full relative mb-4">
          <form
            onSubmit={handleSearchSubmit}
            className="w-full flex items-center bg-white rounded-pill border border-[#E3E8F0] shadow-card hover:shadow-elevated transition-shadow p-1.5 focus-within:ring-2 focus-within:ring-[#F2A33A] focus-within:border-transparent"
          >
            <div className="pl-3.5 pr-2 text-[#4F5F78]">
              <Search className="w-5 h-5 text-[#4F5F78]" />
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
              className="w-full py-2.5 px-1 text-sm sm:text-base text-[#0B1B33] bg-transparent focus:outline-none placeholder:text-[#4F5F78]"
              autoComplete="off"
            />

            <button
              type="submit"
              className="btn-primary px-6 sm:px-8 py-2.5 text-sm sm:text-base shrink-0"
            >
              Search
            </button>
          </form>

          {/* Autocomplete Sample Dropdown */}
          {isOpenDropdown && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-card border border-[#E3E8F0] shadow-elevated overflow-hidden z-30 text-left animate-in fade-in-50 duration-150">
              <div className="p-2.5 bg-[#F4F6FA] border-b border-[#E3E8F0] text-[11px] font-semibold text-[#4F5F78] uppercase tracking-wider flex items-center justify-between">
                <span>Sample Properties (MD, VA & DC)</span>
                <span className="text-[10px] text-[#4F5F78]">Click to test</span>
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
                      <MapPin className="w-4 h-4 text-[#4F5F78] group-hover:text-[#F2A33A] mt-0.5 shrink-0" />
                      <div>
                        <div className="text-sm font-semibold text-[#0B1B33]">
                          {sample.address}
                        </div>
                        <div className="text-xs text-[#4F5F78]">
                          {sample.city}, {sample.county}, {sample.state} {sample.zip}
                        </div>
                      </div>
                    </div>
                    <div>
                      {sample.inCoverage ? (
                        <span className="text-[11px] font-medium text-[#17824F] bg-[#17824F]/10 px-2 py-0.5 rounded-pill shrink-0">
                          Covered
                        </span>
                      ) : (
                        <span className="text-[11px] font-medium text-amber-800 bg-[#FDEBD0] px-2 py-0.5 rounded-pill shrink-0">
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

        {/* Muted Subline: "From $229 · Report in 24 hours" */}
        <p className="text-xs text-[#4F5F78] font-medium mb-6">
          From <span className="font-mono text-[#0B1B33] font-semibold">$229</span> · Search report in 24 hours
        </p>

        {/* S2 Address Check Transition / Results Box */}
        {coverageState === 'CHECKING' && (
          <div className="w-full max-w-lg p-4 bg-white rounded-card border border-[#E3E8F0] text-xs text-[#4F5F78] flex items-center justify-center gap-2 animate-pulse shadow-soft">
            <span className="w-2 h-2 rounded-full bg-[#F2A33A] animate-ping" />
            Verifying county land records coverage...
          </div>
        )}

        {coverageState === 'COVERED' && (
          <div className="w-full max-w-lg p-4 sm:p-5 bg-white rounded-card border border-[#17824F]/30 shadow-soft text-left animate-in slide-in-from-bottom-2 duration-150">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-[#17824F] shrink-0 mt-0.5" />
              <div className="flex-1">
                <h4 className="text-sm font-bold text-[#0B1B33]">
                  {selectedAddress ? `${selectedAddress.city}, ${selectedAddress.county}, ${selectedAddress.state}` : 'Montgomery County, MD'} — we cover this area
                </h4>
                <p className="text-xs text-[#4F5F78] mt-1">
                  Independent abstractors are active in this jurisdiction. Standard 24-hour turnaround available.
                </p>
                <div className="mt-4 flex items-center justify-end">
                  <button
                    onClick={proceedToDetails}
                    className="btn-primary px-5 py-2 text-xs font-bold inline-flex items-center gap-1.5"
                  >
                    Continue to property details <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {coverageState === 'OUT_OF_COVERAGE' && (
          <div className="w-full max-w-lg p-5 bg-white rounded-card border border-[#E3E8F0] shadow-soft text-left animate-in slide-in-from-bottom-2 duration-150">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-[#e09228] shrink-0 mt-0.5" />
              <div className="flex-1">
                <h4 className="text-sm font-bold text-[#0B1B33]">
                  Richmond City, VA — outside active 24-hour footprint
                </h4>
                <p className="text-xs text-[#4F5F78] mt-1.5 leading-relaxed">
                  We currently guarantee 24-hour coverage across all 24 Maryland counties, Washington DC, and Northern/Central Virginia. Richmond coverage is coming soon.
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
                      className="flex-1 text-xs px-3 py-2 rounded-lg border border-[#E3E8F0] focus:outline-none focus:ring-1 focus:ring-[#F2A33A]"
                    />
                    <button
                      type="submit"
                      className="btn-secondary px-3.5 py-2 text-xs font-bold shrink-0"
                    >
                      Join waitlist
                    </button>
                  </form>
                ) : (
                  <div className="mt-3 p-2 bg-[#FDEBD0]/60 rounded-lg text-xs font-medium text-[#0B1B33] flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#17824F]" />
                    <span>Thanks! We will notify you when Richmond is online.</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
