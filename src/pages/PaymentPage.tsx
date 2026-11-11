import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { StepIndicator } from '../components/common/StepIndicator';
import { useDemo } from '../context/DemoContext';
import { TierId } from '../mock/types';
import { computeDueTime } from '../mock/clock';
import { mockMarketplace } from '../mock/service';
import { TIERS } from '../mock/data';
import {
  ArrowLeft,
  CreditCard,
  Lock,
  MapPin,
  Clock,
} from 'lucide-react';

export const PaymentPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAfterHours, setActiveOrderToken, setCurrentStage } = useDemo();

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
    tier: '24h',
  };

  const selectedTierId: TierId = prevData.tier || '24h';
  const tierInfo = TIERS.find((t) => t.id === selectedTierId) || TIERS[0];
  const now = new Date();
  const dueResult = computeDueTime(selectedTierId, now, isAfterHours);

  const [cardNumber, setCardNumber] = useState<string>('4242 •••• •••• 4242');
  const [expiry, setExpiry] = useState<string>('12/28');
  const [cvc, setCvc] = useState<string>('382');
  const [termsAgreed, setTermsAgreed] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handlePay = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!termsAgreed || isSubmitting) return;

    setIsSubmitting(true);

    try {
      const createdOrder = await mockMarketplace.createOrder(
        prevData.property,
        prevData.customer,
        selectedTierId,
        isAfterHours
      );

      setActiveOrderToken(createdOrder.token);
      setCurrentStage('MATCHING');

      // Navigate to customer status page S6
      navigate(`/order/${createdOrder.token}`, {
        state: { order: createdOrder },
      });
    } catch (err) {
      console.error(err);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 py-8">
      <div className="w-full max-w-4xl">
        <StepIndicator currentStep={4} />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 text-left">
          {/* Left Column: Order Summary */}
          <div className="md:col-span-5 order-2 md:order-1">
            <div className="bg-white rounded-card border border-white/80 shadow-[0_16px_40px_rgba(28,39,51,0.18)] p-5 sm:p-6 sticky top-20">
              <h2 className="text-sm font-bold uppercase tracking-wider text-[#1C2733] mb-4 pb-3 border-b border-[#E3E8F0] flex items-center justify-between">
                <span>Order Summary</span>
                <span className="text-[10px] font-mono bg-[#F4F6FA] text-[#5A6B7F] px-2 py-0.5 rounded border border-[#E3E8F0]">
                  Guest order
                </span>
              </h2>

              <div className="space-y-4 text-xs">
                <div>
                  <span className="text-[#5A6B7F] block text-[11px]">Subject Property</span>
                  <div className="font-bold text-[#1C2733] mt-0.5 flex items-start gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#00BC82] shrink-0 mt-0.5" />
                    <span>{prevData.property.address}</span>
                  </div>
                  <div className="text-[#5A6B7F] pl-5 mt-0.5">
                    {prevData.property.county}, {prevData.property.state}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#E3E8F0]/70">
                  <div>
                    <span className="text-[#5A6B7F] block text-[11px]">Property Type</span>
                    <span className="font-semibold text-[#1C2733] capitalize">
                      {prevData.property.propertyType.replace('_', ' ')}
                    </span>
                  </div>
                  <div>
                    <span className="text-[#5A6B7F] block text-[11px]">Ordering As</span>
                    <span className="font-semibold text-[#1C2733] capitalize">
                      {prevData.customer.role.replace('_', ' ')}
                    </span>
                  </div>
                </div>

                <div className="pt-2 border-t border-[#E3E8F0]/70">
                  <span className="text-[#5A6B7F] block text-[11px]">Turnaround Window</span>
                  <div className="flex items-center justify-between mt-0.5">
                    <span className="font-bold text-[#1C2733]">{tierInfo.name}</span>
                    <span className="font-mono text-[#1C2733] font-bold">${tierInfo.price}.00</span>
                  </div>
                  <div className="mt-1 flex items-center gap-1.5 text-[11px] text-[#00BC82] font-semibold">
                    <Clock className="w-3 h-3" />
                    <span>Guaranteed due: {dueResult.formatted}</span>
                  </div>
                </div>

                {/* Price Breakdown */}
                <div className="pt-3 border-t border-[#E3E8F0] space-y-1.5">
                  <div className="flex justify-between text-[#5A6B7F]">
                    <span>Title Search Fee</span>
                    <span className="font-mono text-[#1C2733]">${tierInfo.price}.00</span>
                  </div>
                  <div className="flex justify-between text-[#5A6B7F]">
                    <span>Land Records Access</span>
                    <span className="font-mono text-[#00BC82] font-medium">Included ($0)</span>
                  </div>
                  <div className="flex justify-between text-[#5A6B7F]">
                    <span>Electronic Delivery</span>
                    <span className="font-mono text-[#00BC82] font-medium">Included ($0)</span>
                  </div>

                  <div className="pt-2 border-t border-[#E3E8F0] flex justify-between items-baseline font-mono text-[#1C2733]">
                    <span className="text-sm font-bold font-sans">Total Due Today</span>
                    <span className="text-xl font-extrabold">${tierInfo.price}.00</span>
                  </div>
                </div>
              </div>

              {/* Demo Badge */}
              <div className="mt-5 p-2.5 bg-[#DBFCC5]/60 rounded-xl border border-[#00BC82]/30 text-center">
                <span className="text-[11px] font-bold text-[#1C2733] tracking-wide uppercase">
                  ⚡ Demo Mode — No real payment required
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Checkout Form */}
          <div className="md:col-span-7 order-1 md:order-2">
            <div className="bg-white rounded-card border border-white/80 shadow-[0_16px_40px_rgba(28,39,51,0.18)] p-6 sm:p-8">
              <Link
                to="/speed"
                state={prevData}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#5A6B7F] hover:text-[#1C2733] mb-4 transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back to speed selection
              </Link>

              <h1 className="text-2xl font-extrabold tracking-tight text-[#1C2733] mb-1">
                Payment &amp; Authorization
              </h1>
              <p className="text-xs text-[#5A6B7F] mb-6">
                Instant authorization. Your order will be matched with an available certified abstractor immediately.
              </p>

              {/* Apple Pay Button */}
              <div className="mb-6">
                <button
                  type="button"
                  onClick={handlePay}
                  className="w-full py-3 px-4 bg-black text-white hover:bg-neutral-800 rounded-pill font-semibold text-sm flex items-center justify-center gap-2 shadow-sm transition-all"
                >
                  <svg className="w-4 h-4 fill-current mb-0.5" viewBox="0 0 170 170">
                    <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.7-3.04-7.7-7.85-12.01-14.42-5.74-8.8-10.28-19.16-13.62-31.06-3.34-11.9-5.01-22.99-5.01-33.27 0-14.35 3.58-26.24 10.74-35.67 7.16-9.43 16.29-14.28 27.38-14.56 5.09-.12 10.59 1.25 16.51 4.12 5.92 2.87 9.8 4.36 11.64 4.48 1.48 0 5.49-1.57 12.01-4.71 6.53-3.14 12.23-4.53 17.11-4.17 12.87.87 23.01 5.63 30.41 14.28-11.13 6.74-16.59 15.89-16.37 27.46.22 9.02 3.65 16.55 10.29 22.58 6.64 6.03 14.54 9.47 23.7 10.31-2.07 6.41-4.66 13.33-7.77 20.76zM119.22 32.64c0-7.39 2.65-14.26 7.95-20.61 5.3-6.35 11.75-10.23 19.34-11.64.22 1.3.33 2.5.33 3.59 0 7.39-2.76 14.37-8.29 20.93-5.52 6.56-12.03 10.37-19.53 11.44-.11-1.09-.22-2.18-.22-3.71z"/>
                  </svg>
                  <span className="font-bold tracking-tight text-sm">Pay</span>
                </button>
                <div className="flex items-center gap-3 my-4">
                  <div className="h-px bg-[#E3E8F0] flex-1" />
                  <span className="text-[11px] font-semibold text-[#5A6B7F] uppercase">
                    Or pay with card
                  </span>
                  <div className="h-px bg-[#E3E8F0] flex-1" />
                </div>
              </div>

              <form onSubmit={handlePay} className="space-y-4">
                {/* Card Inputs */}
                <div>
                  <label className="block text-xs font-bold text-[#1C2733] mb-1">
                    Card Number
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full text-xs sm:text-sm pl-9 pr-3.5 py-2.5 rounded-lg border border-[#E3E8F0] text-[#1C2733] focus:outline-none focus:ring-2 focus:ring-[#00BC82] font-mono"
                    />
                    <CreditCard className="w-4 h-4 text-[#5A6B7F] absolute left-3 top-1/2 -translate-y-1/2" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-[#1C2733] mb-1">
                      Expires (MM/YY)
                    </label>
                    <input
                      type="text"
                      value={expiry}
                      onChange={(e) => setExpiry(e.target.value)}
                      className="w-full text-xs sm:text-sm px-3 py-2.5 rounded-lg border border-[#E3E8F0] text-[#1C2733] focus:outline-none focus:ring-2 focus:ring-[#00BC82] font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#1C2733] mb-1">
                      CVC
                    </label>
                    <input
                      type="text"
                      value={cvc}
                      onChange={(e) => setCvc(e.target.value)}
                      className="w-full text-xs sm:text-sm px-3 py-2.5 rounded-lg border border-[#E3E8F0] text-[#1C2733] focus:outline-none focus:ring-2 focus:ring-[#00BC82] font-mono"
                    />
                  </div>
                </div>

                {/* Statutory Terms Checkbox (EXACT REQUIRED CONTRACT LANGUAGE) */}
                <div className="pt-3 border-t border-[#E3E8F0]/70">
                  <label className="flex items-start gap-3 cursor-pointer p-3 rounded-xl bg-[#F4F6FA] border border-[#E3E8F0] hover:bg-[#EDF2F7] transition-colors">
                    <input
                      type="checkbox"
                      required
                      checked={termsAgreed}
                      onChange={(e) => setTermsAgreed(e.target.checked)}
                      className="accent-[#00BC82] w-4 h-4 mt-0.5 rounded cursor-pointer shrink-0"
                    />
                    <span className="text-[11px] sm:text-xs text-[#1C2733] leading-relaxed">
                      I agree to the Terms. I understand an independent abstractor prepares my report, that it is not title insurance or legal advice, and that the abstractor&apos;s E&amp;O policy stands behind its contents.
                    </span>
                  </label>
                </div>

                {/* Pay Action Button in ORANGE #F97316 (Primary CTA) */}
                <div className="pt-3">
                  <button
                    type="submit"
                    disabled={!termsAgreed || isSubmitting}
                    className="btn-cta w-full py-3.5 text-sm sm:text-base font-extrabold shadow-card disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Authorizing &amp; Starting Search...
                      </span>
                    ) : (
                      `Pay $${tierInfo.price}.00 and start my search`
                    )}
                  </button>
                </div>

                <div className="flex items-center justify-center gap-2 text-[11px] text-[#5A6B7F] pt-2">
                  <Lock className="w-3.5 h-3.5 text-[#00BC82]" />
                  <span>256-bit Encrypted Session · Guest Order Protected</span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
