import React from 'react';

export const LegalTermsPage: React.FC = () => {
  return (
    <div className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-12 text-left">
      <div className="mb-8 pb-6 border-b border-[#E3E8F0]">
        <h1 className="text-3xl font-extrabold tracking-tight text-[#1C2733]">
          Terms of Service &amp; Privacy Policy
        </h1>
        <p className="text-xs text-[#5A6B7F] mt-1">
          Effective Date: November 1, 2026 · OneDaySearch Marketplace Platform
        </p>
      </div>

      <div className="bg-white rounded-card border border-[#E3E8F0] shadow-soft p-6 sm:p-8 space-y-6 text-xs sm:text-sm text-[#5A6B7F] leading-relaxed">
        <section>
          <h2 className="text-sm sm:text-base font-bold text-[#1C2733] mb-2">
            1. Nature of the Service
          </h2>
          <p>
            OneDaySearch operates an online coordination and dispatch platform connecting property purchasers, sellers, lenders, and real estate professionals with certified independent title abstractors. OneDaySearch is not a title insurance underwriter, title insurance agency, or law firm.
          </p>
        </section>

        <section>
          <h2 className="text-sm sm:text-base font-bold text-[#1C2733] mb-2">
            2. Independent Contractor Relationship &amp; E&amp;O Coverage
          </h2>
          <p>
            Reports provided through the platform are compiled by independent certified abstractors. Each abstractor maintains individual Errors and Omissions (E&amp;O) liability insurance coverage. The customer acknowledges that the abstractor&apos;s professional policy stands behind the factual accuracy of the search.
          </p>
        </section>

        <section>
          <h2 className="text-sm sm:text-base font-bold text-[#1C2733] mb-2">
            3. Privacy &amp; Marketplace Identity Isolation
          </h2>
          <p>
            To maintain marketplace neutrality, customer identity (name, personal phone number, email address) is permanently masked and never disclosed to abstractors. Similarly, provider names and internal routing variables are shielded from customer-facing portals.
          </p>
        </section>

        <section>
          <h2 className="text-sm sm:text-base font-bold text-[#1C2733] mb-2">
            4. Eastern Time SLA &amp; Delivery Commitments
          </h2>
          <p>
            Turnaround guarantees are governed exclusively by Eastern Time (ET). Search timers for orders placed outside county courthouse hours commence at 9:00 AM ET of the following business day.
          </p>
        </section>
      </div>
    </div>
  );
};
