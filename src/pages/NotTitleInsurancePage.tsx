import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight } from 'lucide-react';

export const NotTitleInsurancePage: React.FC = () => {
  return (
    <div className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-12 text-left">
      <div className="mb-8 pb-6 border-b border-[#E3E8F0]">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-pill bg-[#DBFCC5] text-[#00BC82] text-xs font-semibold mb-3">
          Statutory Notice
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#1C2733]">
          Important Notice: A Title Search Report is Not Title Insurance
        </h1>
        <p className="text-sm sm:text-base text-[#5A6B7F] mt-2 leading-relaxed">
          Clear, plain-language explanation of what OneDaySearch provides, the legal distinction between an abstract of title and a title insurance policy, and how our independent abstractor network stands behind each report.
        </p>
      </div>

      <div className="space-y-8 text-xs sm:text-sm text-[#1C2733] leading-relaxed">
        {/* Callout Box */}
        <div className="bg-white p-6 rounded-card border border-[#E3E8F0] shadow-soft">
          <h2 className="text-base font-extrabold text-[#1C2733] mb-2">
            The Statutory Difference in Maryland, Virginia and the District of Columbia
          </h2>
          <p className="text-[#5A6B7F]">
            OneDaySearch delivers certified <strong>Title Search Reports (Title Abstracts)</strong>. A title search report is an objective, historical examination of recorded county land records, judicial dockets, and tax assessment rolls. It is <strong>not</strong> an insurance policy, a commitment to insure, or formal legal advice.
          </p>
        </div>

        {/* Comparison Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-card border border-[#E3E8F0] shadow-soft">
            <h3 className="text-base font-bold text-[#1C2733] mb-3 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-[#00BC82]" />
              What OneDaySearch Delivers:
            </h3>
            <ul className="space-y-2 text-[#5A6B7F]">
              <li>• Comprehensive 30 to 40-year historical chain of title examination.</li>
              <li>• Identification of all open mortgages, deeds of trust, and equity lines.</li>
              <li>• Active municipal liens, tax judgements, and mechanics liens.</li>
              <li>• Recorded covenants, conditions, restrictions, and utility easements.</li>
              <li>• Conducted by pre-vetted, licensed independent county abstractors.</li>
              <li>• Backed by individual abstractor Errors &amp; Omissions (E&amp;O) liability policies.</li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-card border border-[#E3E8F0] shadow-soft">
            <h3 className="text-base font-bold text-[#1C2733] mb-3 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-orange-100 text-[#F97316] flex items-center justify-center text-xs font-bold">!</span>
              What It Does Not Include:
            </h3>
            <ul className="space-y-2 text-[#5A6B7F]">
              <li>• Does not indemnify against undiscovered defects or forged prior instruments.</li>
              <li>• Does not substitute for an ALTA owner&apos;s or lender&apos;s title insurance policy.</li>
              <li>• Does not constitute legal advice from an attorney.</li>
              <li>• Does not perform physical boundary surveys or verify boundary monuments.</li>
            </ul>
          </div>
        </div>

        {/* E&O Insurance Explanation */}
        <div className="bg-white p-6 rounded-card border border-[#E3E8F0] shadow-soft">
          <h3 className="text-base font-bold text-[#1C2733] mb-2">
            Independent Abstractor Professional Liability (E&amp;O)
          </h3>
          <p className="text-[#5A6B7F] leading-relaxed">
            Every independent title abstractor active on OneDaySearch is required to maintain active Errors and Omissions (E&amp;O) insurance with a minimum of $1,000,000 in professional coverage. Certificates of insurance are reviewed and verified on file with the marketplace.
          </p>
        </div>

        <div className="pt-4 flex items-center gap-4">
          <Link to="/" className="btn-cta px-6 py-3 text-xs font-bold inline-flex items-center gap-2">
            <span>Start a Title Search</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <Link to="/pricing" className="btn-secondary px-6 py-3 text-xs font-semibold">
            View Pricing &amp; Tiers
          </Link>
        </div>
      </div>
    </div>
  );
};
