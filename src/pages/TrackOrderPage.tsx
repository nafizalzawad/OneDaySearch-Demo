import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { mockMarketplace } from '../mock/service';
import { useDemo } from '../context/DemoContext';
import { CheckCircle2, AlertCircle, ArrowRight } from 'lucide-react';

export const TrackOrderPage: React.FC = () => {
  const navigate = useNavigate();
  const { setActiveOrderToken } = useDemo();

  const [orderNumber, setOrderNumber] = useState<string>('OD-48213');
  const [contactInfo, setContactInfo] = useState<string>('jane.sterling@example.com');
  const [loading, setLoading] = useState<boolean>(false);
  const [isSent, setIsSent] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');

  const handleTrackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    const result = await mockMarketplace.trackOrder(orderNumber, contactInfo);

    setLoading(false);
    if (result) {
      setIsSent(true);
      setActiveOrderToken(result.token);
    } else {
      setErrorMsg('No order found matching those exact credentials. You can access our live sample order below.');
    }
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 py-12">
      <div className="w-full max-w-md bg-white rounded-card border border-[#E3E8F0] shadow-soft p-6 sm:p-8 text-left">
        <h1 className="text-2xl font-extrabold tracking-tight text-[#1C2733] mb-1">
          Track Your Order
        </h1>
        <p className="text-xs text-[#5A6B7F] mb-6">
          Enter your order number (OD-XXXXX) and the email or mobile phone used at checkout.
        </p>

        {isSent ? (
          <div className="p-4 bg-[#DBFCC5]/60 border border-[#00BC82]/40 rounded-xl space-y-3 animate-in fade-in-50">
            <div className="flex items-center gap-2 text-sm font-bold text-[#00BC82]">
              <CheckCircle2 className="w-5 h-5 shrink-0" />
              <span>Access link sent</span>
            </div>
            <p className="text-xs text-[#1C2733] leading-relaxed">
              We&apos;ve sent a verified single-use access link to <strong>{contactInfo}</strong>.
            </p>
            <div className="pt-2">
              <button
                onClick={() => navigate('/order/d9f82a17c4b03e89')}
                className="btn-cta w-full py-2.5 text-xs font-bold inline-flex items-center justify-center gap-1.5"
              >
                <span>Open Order Directly (Demo)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleTrackSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#1C2733] mb-1">
                Order ID
              </label>
              <input
                type="text"
                required
                value={orderNumber}
                onChange={(e) => setOrderNumber(e.target.value)}
                placeholder="OD-48213"
                className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-lg border border-[#E3E8F0] text-[#1C2733] focus:outline-none focus:ring-2 focus:ring-[#00BC82] font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#1C2733] mb-1">
                Email Address or Mobile Phone
              </label>
              <input
                type="text"
                required
                value={contactInfo}
                onChange={(e) => setContactInfo(e.target.value)}
                placeholder="jane@example.com or (301) 555-0192"
                className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-lg border border-[#E3E8F0] text-[#1C2733] focus:outline-none focus:ring-2 focus:ring-[#00BC82]"
              />
            </div>

            {errorMsg && (
              <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg text-xs text-orange-950 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-[#F97316] shrink-0 mt-0.5" />
                <div>
                  <p>{errorMsg}</p>
                  <button
                    type="button"
                    onClick={() => navigate('/order/d9f82a17c4b03e89')}
                    className="font-bold underline text-[#1C2733] mt-1 block"
                  >
                    Click here to open sample OD-48213
                  </button>
                </div>
              </div>
            )}

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="btn-cta w-full py-3 text-sm font-bold shadow-soft flex items-center justify-center gap-2"
              >
                {loading ? (
                  <span>Checking Records...</span>
                ) : (
                  <>
                    <span>Send Order Access Link</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>
        )}

        <div className="mt-6 pt-5 border-t border-[#E3E8F0] text-center">
          <Link to="/" className="text-xs font-semibold text-[#5A6B7F] hover:text-[#1C2733]">
            ← Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
};
