import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { StepIndicator } from '../components/common/StepIndicator';
import { useDemo } from '../context/DemoContext';
import { TierId } from '../mock/types';
import { computeDueTime } from '../mock/clock';
import { ArrowLeft, ArrowRight, Clock, Zap, Moon } from 'lucide-react';

export const SpeedPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { allow12h, allow6h, isAfterHours } = useDemo();

  const prevData = (location.state as any) || {
    property: {
      address: '10400 Fernwood Rd, Bethesda, MD 20817',
      county: 'Montgomery County',
      city: 'Bethesda',
      state: 'MD',
      zip: '20817',
      propertyType: 'single_family',
    },
    customer: {
      fullName: 'Jane Doe',
      email: 'jane.doe@example.com',
      mobile: '(301) 555-0192',
      role: 'buyer',
      smsConsent: true,
    },
  };

  const [loading, setLoading] = useState<boolean>(true);
  const [selectedTier, setSelectedTier] = useState<TierId>('24h');
  const now = new Date();

  // If neither 12h nor 6h is enabled, auto-redirect to payment
  useEffect(() => {
    if (!allow12h && !allow6h) {
      navigate('/pay', {
        state: { ...prevData, tier: '24h' },
        replace: true,
      });
      return;
    }

    const timer = setTimeout(() => {
      setLoading(false);
    }, 400);
    return () => clearTimeout(timer);
  }, [allow12h, allow6h]);

  const due24 = computeDueTime('24h', now, isAfterHours);
  const due12 = computeDueTime('12h', now, isAfterHours);
  const due6 = computeDueTime('6h', now, isAfterHours);

  const handleContinue = () => {
    navigate('/pay', {
      state: {
        ...prevData,
        tier: selectedTier,
      },
    });
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 py-8">
      <div className="w-full max-w-2xl">
        <StepIndicator currentStep={3} />

        <div className="bg-white rounded-card border border-white/80 shadow-[0_16px_40px_rgba(28,39,51,0.18)] p-6 sm:p-8 text-left">
          <Link
            to="/details"
            state={prevData}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#5A6B7F] hover:text-[#1C2733] mb-3 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to details
          </Link>

          <div className="mb-6">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#1C2733]">
              Need it sooner?
            </h1>
            <p className="text-xs sm:text-sm text-[#5A6B7F] mt-1">
              Pick your delivery speed. All turnaround times are calculated in Eastern Time.
            </p>
          </div>

          {/* After Hours Notice Banner if active */}
          {isAfterHours && (
            <div className="mb-6 p-3.5 bg-[#DBFCC5]/70 rounded-xl border border-[#00BC82]/40 flex items-start gap-2.5">
              <Moon className="w-4 h-4 text-[#00BC82] mt-0.5 shrink-0" />
              <div className="text-xs text-[#1C2733]">
                <strong className="font-bold">After-hours notice: </strong>
                County land records offices open at 9:00 AM ET tomorrow. Due times are calculated from the 9:00 AM opening.
              </div>
            </div>
          )}

          {loading ? (
            <div className="py-16 text-center">
              <div className="w-8 h-8 border-3 border-[#E3E8F0] border-t-[#00BC82] rounded-full animate-spin mx-auto mb-3" />
              <p className="text-xs font-medium text-[#5A6B7F]">
                Checking availability in {prevData.property.county}...
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Tier 1: 24h Standard */}
              <label
                onClick={() => setSelectedTier('24h')}
                className={`block p-4 sm:p-5 rounded-card border-2 cursor-pointer transition-all ${
                  selectedTier === '24h'
                    ? 'border-[#00BC82] bg-[#DBFCC5]/15 shadow-sm'
                    : 'border-[#E3E8F0] hover:border-[#CBD5E1] bg-white'
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <input
                      type="radio"
                      name="tier"
                      checked={selectedTier === '24h'}
                      onChange={() => setSelectedTier('24h')}
                      className="accent-[#00BC82] w-4 h-4 mt-1 cursor-pointer"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-base font-bold text-[#1C2733]">
                          Standard 24 Hours
                        </span>
                        <span className="text-[10px] font-bold uppercase tracking-wider bg-white border border-[#E3E8F0] text-[#5A6B7F] px-2 py-0.5 rounded-pill">
                          Included
                        </span>
                      </div>
                      <p className="text-xs text-[#5A6B7F] mt-1">
                        Standard turnaround for most purchase contingencies and routine title searches.
                      </p>
                    </div>
                  </div>
                  <div className="text-right shrink-0 font-mono">
                    <div className="text-lg font-bold text-[#1C2733]">$229</div>
                    <div className="text-[11px] text-[#5A6B7F]">Flat fee</div>
                  </div>
                </div>

                <div className="mt-3.5 pt-3 border-t border-[#E3E8F0]/70 flex items-center justify-between text-xs">
                  <span className="text-[#5A6B7F] flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#00BC82]" /> Guaranteed delivery:
                  </span>
                  <span className="font-mono font-bold text-[#1C2733]">
                    {due24.formattedLong}
                  </span>
                </div>
              </label>

              {/* Tier 2: 12h Express (conditional on allow12h) */}
              {allow12h && (
                <label
                  onClick={() => setSelectedTier('12h')}
                  className={`block p-4 sm:p-5 rounded-card border-2 cursor-pointer transition-all animate-in fade-in-50 duration-200 ${
                    selectedTier === '12h'
                      ? 'border-[#00BC82] bg-[#DBFCC5]/15 shadow-sm'
                      : 'border-[#E3E8F0] hover:border-[#CBD5E1] bg-white'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <input
                        type="radio"
                        name="tier"
                        checked={selectedTier === '12h'}
                        onChange={() => setSelectedTier('12h')}
                        className="accent-[#00BC82] w-4 h-4 mt-1 cursor-pointer"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-base font-bold text-[#1C2733]">
                            Express 12 Hours
                          </span>
                          <span className="text-[10px] font-bold uppercase tracking-wider bg-[#DBFCC5] text-[#00BC82] px-2 py-0.5 rounded-pill font-mono">
                            Priority
                          </span>
                        </div>
                        <p className="text-xs text-[#5A6B7F] mt-1">
                          Faster delivery with prioritized abstractor queue.
                        </p>
                      </div>
                    </div>
                    <div className="text-right shrink-0 font-mono">
                      <div className="text-lg font-bold text-[#1C2733]">$249</div>
                      <div className="text-[11px] text-[#5A6B7F]">+$20 rush</div>
                    </div>
                  </div>

                  <div className="mt-3.5 pt-3 border-t border-[#E3E8F0]/70 flex items-center justify-between text-xs">
                    <span className="text-[#5A6B7F] flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5 text-[#00BC82]" /> Guaranteed delivery:
                    </span>
                    <span className="font-mono font-bold text-[#1C2733]">
                      {due12.formattedLong}
                    </span>
                  </div>
                </label>
              )}

              {/* Tier 3: 6h Same-Day Rush (Uses Orange for rush elements) */}
              {allow6h && (
                <label
                  onClick={() => setSelectedTier('6h')}
                  className={`block p-4 sm:p-5 rounded-card border-2 cursor-pointer transition-all animate-in fade-in-50 duration-200 ${
                    selectedTier === '6h'
                      ? 'border-[#F97316] bg-orange-50/40 shadow-sm'
                      : 'border-[#E3E8F0] hover:border-[#CBD5E1] bg-white'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <input
                        type="radio"
                        name="tier"
                        checked={selectedTier === '6h'}
                        onChange={() => setSelectedTier('6h')}
                        className="accent-[#F97316] w-4 h-4 mt-1 cursor-pointer"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-base font-bold text-[#1C2733]">
                            Same-Day 6 Hours
                          </span>
                          <span className="text-[10px] font-bold uppercase tracking-wider bg-[#F97316]/15 text-[#F97316] px-2 py-0.5 rounded-pill font-mono">
                            ⚡ Rush
                          </span>
                        </div>
                        <p className="text-xs text-[#5A6B7F] mt-1">
                          Direct immediate dispatch to available abstractors in this county.
                        </p>
                      </div>
                    </div>
                    <div className="text-right shrink-0 font-mono">
                      <div className="text-lg font-bold text-[#1C2733]">$299</div>
                      <div className="text-[11px] text-[#F97316] font-semibold">+$70 rush</div>
                    </div>
                  </div>

                  <div className="mt-3.5 pt-3 border-t border-[#E3E8F0]/70 flex items-center justify-between text-xs">
                    <span className="text-[#5A6B7F] flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#F97316]" /> Guaranteed delivery:
                    </span>
                    <span className="font-mono font-bold text-[#1C2733]">
                      {due6.formattedLong}
                    </span>
                  </div>
                </label>
              )}
            </div>
          )}

          {/* Action buttons */}
          <div className="mt-8 pt-6 border-t border-[#E3E8F0] flex flex-col-reverse sm:flex-row items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => {
                setSelectedTier('24h');
                navigate('/pay', { state: { ...prevData, tier: '24h' } });
              }}
              className="btn-secondary w-full sm:w-auto px-5 py-2.5 text-xs font-semibold"
            >
              Keep 24 hours ($229)
            </button>

            <button
              type="button"
              onClick={handleContinue}
              className="btn-cta w-full sm:w-auto px-8 py-3 text-sm font-bold shadow-soft flex items-center justify-center gap-2"
            >
              <span>Continue to Payment</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
