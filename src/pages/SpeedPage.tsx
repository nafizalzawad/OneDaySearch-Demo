import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { StepIndicator } from '../components/common/StepIndicator';
import { useDemo } from '../context/DemoContext';
import { TierId } from '../mock/types';
import { computeDueTime } from '../mock/clock';
import { mockMarketplace } from '../mock/service';
import { ArrowLeft, ArrowRight, Clock, Zap, Shield, CheckCircle2, Moon } from 'lucide-react';

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
    }, 450);
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

        <div className="bg-white rounded-card border border-[#E3E8F0] shadow-soft p-6 sm:p-8 text-left">
          <Link
            to="/details"
            state={prevData}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#4F5F78] hover:text-[#0B1B33] mb-3 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to details
          </Link>

          <div className="mb-6">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#0B1B33]">
              Need it sooner?
            </h1>
            <p className="text-xs sm:text-sm text-[#4F5F78] mt-1">
              Guaranteed turnaround delivered strictly by Eastern Time SLA. Choose your required delivery window.
            </p>
          </div>

          {/* After Hours Notice Banner if active */}
          {isAfterHours && (
            <div className="mb-6 p-3.5 bg-[#FDEBD0]/70 rounded-xl border border-[#F2A33A]/50 flex items-start gap-2.5">
              <Moon className="w-4 h-4 text-amber-900 mt-0.5 shrink-0" />
              <div className="text-xs text-[#0B1B33]">
                <strong className="font-bold">After-Hours Notice: </strong>
                Courthouse land record search officially opens at 9:00 AM ET tomorrow. All delivery targets are calculated from the 9:00 AM dispatch bell.
              </div>
            </div>
          )}

          {loading ? (
            <div className="py-16 text-center">
              <div className="w-8 h-8 border-3 border-[#E3E8F0] border-t-[#F2A33A] rounded-full animate-spin mx-auto mb-3" />
              <p className="text-xs font-medium text-[#4F5F78]">
                Checking abstractor dispatch capacity in {prevData.property.county}...
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Tier 1: 24h Standard */}
              <label
                onClick={() => setSelectedTier('24h')}
                className={`block p-4 sm:p-5 rounded-card border-2 cursor-pointer transition-all ${
                  selectedTier === '24h'
                    ? 'border-[#0B1B33] bg-[#F4F6FA]/60 shadow-sm'
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
                      className="accent-[#0B1B33] w-4 h-4 mt-1 cursor-pointer"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-base font-bold text-[#0B1B33]">
                          Standard 24 Hours
                        </span>
                        <span className="text-[10px] font-bold uppercase tracking-wider bg-white border border-[#E3E8F0] text-[#4F5F78] px-2 py-0.5 rounded-pill">
                          Included
                        </span>
                      </div>
                      <p className="text-xs text-[#4F5F78] mt-1">
                        Our benchmark title abstract. Ideal for standard purchase contingencies and routine closings.
                      </p>
                    </div>
                  </div>
                  <div className="text-right shrink-0 font-mono">
                    <div className="text-lg font-bold text-[#0B1B33]">$229</div>
                    <div className="text-[11px] text-[#4F5F78]">Flat fee</div>
                  </div>
                </div>

                <div className="mt-3.5 pt-3 border-t border-[#E3E8F0]/70 flex items-center justify-between text-xs">
                  <span className="text-[#4F5F78] flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#0B1B33]" /> Guaranteed delivery:
                  </span>
                  <span className="font-mono font-bold text-[#0B1B33]">
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
                      ? 'border-[#0B1B33] bg-[#F4F6FA]/60 shadow-sm'
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
                        className="accent-[#0B1B33] w-4 h-4 mt-1 cursor-pointer"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-base font-bold text-[#0B1B33]">
                            Express 12 Hours
                          </span>
                          <span className="text-[10px] font-bold uppercase tracking-wider bg-[#FDEBD0] text-[#0B1B33] px-2 py-0.5 rounded-pill">
                            Express Priority
                          </span>
                        </div>
                        <p className="text-xs text-[#4F5F78] mt-1">
                          Expedited search queue routed to dedicated priority abstractors.
                        </p>
                      </div>
                    </div>
                    <div className="text-right shrink-0 font-mono">
                      <div className="text-lg font-bold text-[#0B1B33]">$249</div>
                      <div className="text-[11px] text-[#4F5F78]">+$20 rush</div>
                    </div>
                  </div>

                  <div className="mt-3.5 pt-3 border-t border-[#E3E8F0]/70 flex items-center justify-between text-xs">
                    <span className="text-[#4F5F78] flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5 text-[#F2A33A]" /> Guaranteed delivery:
                    </span>
                    <span className="font-mono font-bold text-[#0B1B33]">
                      {due12.formattedLong}
                    </span>
                  </div>
                </label>
              )}

              {/* Tier 3: 6h Same-Day Rush (conditional on allow6h) */}
              {allow6h && (
                <label
                  onClick={() => setSelectedTier('6h')}
                  className={`block p-4 sm:p-5 rounded-card border-2 cursor-pointer transition-all animate-in fade-in-50 duration-200 ${
                    selectedTier === '6h'
                      ? 'border-[#0B1B33] bg-[#F4F6FA]/60 shadow-sm'
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
                        className="accent-[#0B1B33] w-4 h-4 mt-1 cursor-pointer"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-base font-bold text-[#0B1B33]">
                            Same-Day 6 Hours
                          </span>
                          <span className="text-[10px] font-bold uppercase tracking-wider bg-[#F2A33A]/20 text-[#0B1B33] px-2 py-0.5 rounded-pill font-mono">
                            ⚡ Urgent
                          </span>
                        </div>
                        <p className="text-xs text-[#4F5F78] mt-1">
                          Direct instant dispatch to active on-call abstractors in this county.
                        </p>
                      </div>
                    </div>
                    <div className="text-right shrink-0 font-mono">
                      <div className="text-lg font-bold text-[#0B1B33]">$299</div>
                      <div className="text-[11px] text-[#4F5F78]">+$70 rush</div>
                    </div>
                  </div>

                  <div className="mt-3.5 pt-3 border-t border-[#E3E8F0]/70 flex items-center justify-between text-xs">
                    <span className="text-[#4F5F78] flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#17824F]" /> Guaranteed delivery:
                    </span>
                    <span className="font-mono font-bold text-[#0B1B33]">
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
              className="btn-primary w-full sm:w-auto px-8 py-3 text-sm font-bold shadow-soft flex items-center justify-center gap-2"
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
