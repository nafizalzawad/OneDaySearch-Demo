import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { HelpCircle, Mail, MessageSquare, CheckCircle2, ArrowRight } from 'lucide-react';

export const SupportPage: React.FC = () => {
  const [ticketSent, setTicketSent] = useState<boolean>(false);
  const [orderId, setOrderId] = useState<string>('OD-48213');
  const [email, setEmail] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTicketSent(true);
  };

  return (
    <div className="flex-1 max-w-2xl w-full mx-auto px-4 sm:px-6 py-12 text-left">
      <div className="mb-8 pb-6 border-b border-[#E3E8F0]">
        <h1 className="text-3xl font-extrabold tracking-tight text-[#0B1B33]">
          Marketplace Support &amp; Order Inquiries
        </h1>
        <p className="text-xs text-[#4F5F78] mt-1">
          Have questions about your report or delivery window? Our Eastern Time support team responds within 1 hour.
        </p>
      </div>

      <div className="bg-white rounded-card border border-[#E3E8F0] shadow-soft p-6 sm:p-8">
        {ticketSent ? (
          <div className="p-4 bg-[#17824F]/10 border border-[#17824F]/30 rounded-xl space-y-3">
            <div className="flex items-center gap-2 text-sm font-bold text-[#17824F]">
              <CheckCircle2 className="w-5 h-5" />
              <span>Inquiry Received</span>
            </div>
            <p className="text-xs text-[#0B1B33]">
              We&apos;ve flagged order {orderId} for priority dispatch review. An operations specialist will follow up at {email || 'your email'} shortly.
            </p>
            <div className="pt-2">
              <Link to="/" className="btn-primary px-6 py-2 text-xs font-bold inline-block">
                Return to Home
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#0B1B33] mb-1">
                Order ID (if applicable)
              </label>
              <input
                type="text"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                placeholder="e.g. OD-48213"
                className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-lg border border-[#E3E8F0] focus:outline-none focus:ring-2 focus:ring-[#F2A33A] font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#0B1B33] mb-1">
                Your Contact Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-lg border border-[#E3E8F0] focus:outline-none focus:ring-2 focus:ring-[#F2A33A]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#0B1B33] mb-1">
                Inquiry or Issue Description
              </label>
              <textarea
                required
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="How can we assist you with this search report?"
                className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-lg border border-[#E3E8F0] focus:outline-none focus:ring-2 focus:ring-[#F2A33A]"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="btn-primary w-full py-3 text-xs sm:text-sm font-bold shadow-soft"
              >
                Submit Support Ticket
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
