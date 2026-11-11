import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { StepIndicator } from '../components/common/StepIndicator';
import { useDemo } from '../context/DemoContext';
import { PropertyType, CustomerRole } from '../mock/types';
import { ArrowLeft, ArrowRight, MapPin } from 'lucide-react';

export const DetailsPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { allow12h, allow6h } = useDemo();

  const addressState = (location.state as any) || {
    address: '10400 Fernwood Rd, Bethesda, MD 20817',
    county: 'Montgomery County',
    state: 'MD',
    city: 'Bethesda',
    zip: '20817',
    propertyType: 'single_family',
  };

  const [propertyType, setPropertyType] = useState<PropertyType>(addressState.propertyType || 'single_family');
  const [role, setRole] = useState<CustomerRole>('buyer');
  const [fullName, setFullName] = useState<string>('Jane Doe');
  const [email, setEmail] = useState<string>('jane.doe@example.com');
  const [mobile, setMobile] = useState<string>('(301) 555-0192');
  const [smsConsent, setSmsConsent] = useState<boolean>(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const orderData = {
      property: {
        address: addressState.address,
        county: addressState.county,
        city: addressState.city,
        state: addressState.state,
        zip: addressState.zip,
        propertyType,
      },
      customer: {
        fullName,
        email,
        mobile,
        role,
        smsConsent,
      },
    };

    // If neither 12h nor 6h is available, skip speed screen and go directly to payment with 24h default
    if (!allow12h && !allow6h) {
      navigate('/pay', {
        state: {
          ...orderData,
          tier: '24h',
        },
      });
    } else {
      navigate('/speed', {
        state: orderData,
      });
    }
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 py-8">
      <div className="w-full max-w-[520px]">
        {/* Progress Indicator */}
        <StepIndicator currentStep={2} />

        {/* Card */}
        <div className="bg-white rounded-card border border-white/80 shadow-[0_16px_40px_rgba(28,39,51,0.18)] p-6 sm:p-8 text-left">
          {/* Card Header */}
          <div className="mb-6">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#5A6B7F] hover:text-[#1C2733] mb-3 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Change address
            </Link>
            <h1 className="text-2xl font-extrabold tracking-tight text-[#1C2733]">
              Property &amp; Contact Details
            </h1>
            <p className="text-xs text-[#5A6B7F] mt-1 leading-relaxed">
              Guest checkout. We&apos;ll use this information to pull the right records and deliver your report.
            </p>
          </div>

          {/* Selected Address Box */}
          <div className="mb-6 p-3 bg-[#E2EFF1]/60 rounded-xl border border-[#D1E2E5] flex items-center justify-between">
            <div className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-[#1E535E] shrink-0 mt-0.5" />
              <div>
                <span className="text-xs font-bold text-[#1C2733] block">
                  {addressState.address}
                </span>
                <span className="text-[11px] text-[#5A6B7F]">
                  {addressState.county}, {addressState.state}
                </span>
              </div>
            </div>
            <Link
              to="/"
              className="text-xs font-semibold text-[#1E535E] hover:underline shrink-0 ml-2"
            >
              Edit
            </Link>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Property Type Dropdown */}
            <div>
              <label className="block text-xs font-bold text-[#1C2733] mb-1.5">
                Property Type
              </label>
              <div className="relative">
                <select
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value as PropertyType)}
                  className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-lg border border-[#D1E2E5] bg-white text-[#1C2733] focus:outline-none focus:ring-2 focus:ring-[#1E535E] appearance-none cursor-pointer"
                >
                  <option value="single_family">Single Family Home</option>
                  <option value="townhouse">Townhouse</option>
                  <option value="condominium">Condominium</option>
                  <option value="multi_family">Multi-Family Residential (2-4 Units)</option>
                  <option value="commercial">Commercial / Mixed Use</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-[#5A6B7F]">
                  ▼
                </div>
              </div>
            </div>

            {/* "I am a" Role Selector */}
            <div>
              <label className="block text-xs font-bold text-[#1C2733] mb-1.5">
                I am a...
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'buyer' as const, label: 'Buyer' },
                  { id: 'seller' as const, label: 'Seller' },
                  { id: 'real_estate_agent' as const, label: 'Agent' },
                  { id: 'mortgage_lender' as const, label: 'Lender' },
                  { id: 'title_attorney' as const, label: 'Attorney' },
                  { id: 'other' as const, label: 'Other' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setRole(item.id)}
                    className={`py-2 px-2.5 rounded-lg border text-xs font-semibold transition-all ${
                      role === item.id
                        ? 'border-[#1C2733] bg-[#1C2733] text-white shadow-sm'
                        : 'border-[#D1E2E5] bg-white text-[#5A6B7F] hover:border-[#1E535E]'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Contact Information */}
            <div className="pt-2 border-t border-[#D1E2E5]/70 space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#1C2733] mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Jane Doe"
                  className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-lg border border-[#D1E2E5] text-[#1C2733] focus:outline-none focus:ring-2 focus:ring-[#1E535E]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1C2733] mb-1">
                  Email Address (Report delivered here)
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="jane.doe@example.com"
                  className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-lg border border-[#D1E2E5] text-[#1C2733] focus:outline-none focus:ring-2 focus:ring-[#1E535E]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1C2733] mb-1">
                  Mobile Number (for order updates)
                </label>
                <input
                  type="tel"
                  required
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  placeholder="(301) 555-0192"
                  className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-lg border border-[#D1E2E5] text-[#1C2733] focus:outline-none focus:ring-2 focus:ring-[#1E535E]"
                />
              </div>

              {/* SMS Consent Checkbox */}
              <label className="flex items-start gap-2.5 cursor-pointer pt-1">
                <input
                  type="checkbox"
                  checked={smsConsent}
                  onChange={(e) => setSmsConsent(e.target.checked)}
                  className="accent-[#1E535E] w-4 h-4 mt-0.5 rounded cursor-pointer"
                />
                <span className="text-[11px] text-[#5A6B7F] leading-tight">
                  Send real-time order status and download link via SMS. (No promotional texts. Msg rates may apply.)
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                className="btn-cta w-full py-3 text-sm font-bold shadow-soft flex items-center justify-center gap-2"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
