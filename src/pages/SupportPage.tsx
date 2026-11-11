import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';

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
        <h1 className="text-3xl font-extrabold tracking-tight text-[#1C2733]">
          Support &amp; Inquiries
        </h1>
        <p className="text-xs sm:text-sm text-[#5A6B7F] mt-1">
          Have questions about your report or turnaround deadline? We respond within 1 business hour.
        </p>
      </div>

      <div className="bg-white rounded-card border border-[#D1E2E5] shadow-soft p-6 sm:p-8">
        {ticketSent ? (
          <div className="p-4 bg-[#E2EFF1]/80 border border-[#1E535E]/30 rounded-xl space-y-3">
            <div className="flex items-center gap-2 text-sm font-bold text-[#1E535E]">
              <CheckCircle2 className="w-5 h-5" />
              <span>Inquiry Received</span>
            </div>
            <p className="text-xs text-[#1C2733]">
              We received your inquiry regarding order {orderId}. A specialist will follow up at {email || 'your email'} shortly.
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
              <label className="block text-xs font-bold text-[#1C2733] mb-1">
                Order ID (if applicable)
              </label>
              <input
                type="text"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                placeholder="e.g. OD-48213"
                className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-lg border border-[#D1E2E5] text-[#1C2733] focus:outline-none focus:ring-2 focus:ring-[#1E535E] font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#1C2733] mb-1">
                Your Contact Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-lg border border-[#D1E2E5] text-[#1C2733] focus:outline-none focus:ring-2 focus:ring-[#1E535E]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#1C2733] mb-1">
                Inquiry or Question
              </label>
              <textarea
                required
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="How can we assist you with this search report?"
                className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-lg border border-[#D1E2E5] text-[#1C2733] focus:outline-none focus:ring-2 focus:ring-[#1E535E]"
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
