import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, ArrowRight } from 'lucide-react';

export const HowItWorksPage: React.FC = () => {
  return (
    <div className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-12 text-left">
      <div className="mb-10 pb-6 border-b border-[#E3E8F0]">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#1C2733]">
          How OneDaySearch Works
        </h1>
        <p className="text-sm sm:text-base text-[#5A6B7F] mt-2">
          An automated title search marketplace built for speed, transparency, and accuracy across Maryland, Virginia, and Washington DC.
        </p>
      </div>

      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-card border border-[#E3E8F0] shadow-soft">
            <div className="w-10 h-10 rounded-full bg-[#DBFCC5] flex items-center justify-center text-[#00BC82] font-extrabold text-sm mb-4">
              1
            </div>
            <h3 className="text-base font-bold text-[#1C2733] mb-2">1. Enter Address &amp; Pay</h3>
            <p className="text-xs text-[#5A6B7F] leading-relaxed">
              No account creation or subscription required. Enter the property address, select your needed delivery speed, and check out as a guest.
            </p>
          </div>

          <div className="bg-white p-6 rounded-card border border-[#E3E8F0] shadow-soft">
            <div className="w-10 h-10 rounded-full bg-[#DBFCC5] flex items-center justify-center text-[#00BC82] font-extrabold text-sm mb-4">
              2
            </div>
            <h3 className="text-base font-bold text-[#1C2733] mb-2">2. Automated Match</h3>
            <p className="text-xs text-[#5A6B7F] leading-relaxed">
              Our system matches your order with an available, insured abstractor who specializes in that specific county&apos;s land records.
            </p>
          </div>

          <div className="bg-white p-6 rounded-card border border-[#E3E8F0] shadow-soft">
            <div className="w-10 h-10 rounded-full bg-[#DBFCC5] flex items-center justify-center text-[#00BC82] font-extrabold text-sm mb-4">
              3
            </div>
            <h3 className="text-base font-bold text-[#1C2733] mb-2">3. Download Certified PDF</h3>
            <p className="text-xs text-[#5A6B7F] leading-relaxed">
              Receive your certified title abstract by your guaranteed Eastern Time deadline. Includes chain of title, open liens, deeds of trust, and easements.
            </p>
          </div>
        </div>

        {/* Eastern Time SLA Guarantee */}
        <div className="bg-white p-6 sm:p-8 rounded-card border border-[#E3E8F0] shadow-soft">
          <h2 className="text-lg font-bold text-[#1C2733] mb-2 flex items-center gap-2">
            <Clock className="w-5 h-5 text-[#00BC82]" />
            Strict Eastern Time Deadlines
          </h2>
          <p className="text-xs sm:text-sm text-[#5A6B7F] leading-relaxed mb-4">
            Every order gets an exact deadline in Eastern Time — for example, &ldquo;Report due by Thu 3:42 PM ET.&rdquo; No vague promises. If an order is placed after county land records offices close, searches start promptly at 9:00 AM ET the next morning.
          </p>
          <div className="pt-2">
            <Link to="/" className="btn-cta px-6 py-2.5 text-xs font-bold inline-flex items-center gap-1.5">
              <span>Start your search</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
