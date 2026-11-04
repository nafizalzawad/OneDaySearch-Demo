import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { mockMarketplace } from '../mock/service';
import { useDemo } from '../context/DemoContext';
import { Search, Mail, Phone, CheckCircle2, AlertCircle, ArrowRight } from 'lucide-react';

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
      // For demo convenience, let them directly view sample order if not an exact match
      setErrorMsg('No order found matching those exact credentials. You can access our live sample order below.');
    }
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 py-12">
      <div className="w-full max-w-md bg-white rounded-card border border-[#E3E8F0] shadow-soft p-6 sm:p-8 text-left">
        <h1 className="text-2xl font-extrabold tracking-tight text-[#0B1B33] mb-1">
          Track Your Order
        </h1>
        <p className="text-xs text-[#4F5F78] mb-6">
          Enter your OneDaySearch order number (OD-XXXXX) and the email or mobile phone used at guest checkout.
        </p>

        {isSent ? (
          <div className="p-4 bg-[#17824F]/10 border border-[#17824F]/30 rounded-xl space-y-3 animate-in fade-in-50">
            <div className="flex items-center gap-2 text-sm font-bold text-[#17824F]">
              <CheckCircle2 className="w-5 h-5 shrink-0" />
              <span>Secure Access Link Dispatched</span>
            </div>
            <p className="text-xs text-[#0B1B33] leading-relaxed">
              We&apos;ve sent a verified single-use access link to <strong>{contactInfo}</strong>.
            </p>
            <div className="pt-2">
              <button
                onClick={() => navigate('/order/d9f82a17c4b03e89')}
                className="btn-primary w-full py-2.5 text-xs font-bold inline-flex items-center justify-center gap-1.5"
              >
                <span>Open Order Directly (Demo)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleTrackSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#0B1B33] mb-1">
                Order ID
              </label>
              <input
                type="text"
                required
                value={orderNumber}
                onChange={(e) => setOrderNumber(e.target.value)}
                placeholder="OD-48213"
                className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-lg border border-[#E3E8F0] focus:outline-none focus:ring-2 focus:ring-[#F2A33A] font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#0B1B33] mb-1">
                Email Address or Mobile Phone
              </label>
              <input
                type="text"
                required
                value={contactInfo}
                onChange={(e) => setContactInfo(e.target.value)}
                placeholder="jane@example.com or (301) 555-0192"
                className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-lg border border-[#E3E8F0] focus:outline-none focus:ring-2 focus:ring-[#F2A33A]"
              />
            </div>

            {errorMsg && (
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-900 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <div>
                  <p>{errorMsg}</p>
                  <button
                    type="button"
                    onClick={() => navigate('/order/d9f82a17c4b03e89')}
                    className="font-bold underline text-[#0B1B33] mt-1 block"
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
                className="btn-primary w-full py-3 text-sm font-bold shadow-soft flex items-center justify-center gap-2"
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
          <Link to="/" className="text-xs font-semibold text-[#4F5F78] hover:text-[#0B1B33]">
            ← Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
};
