import React from 'react';
import { Download, DollarSign, Calendar, TrendingUp } from 'lucide-react';

export const ProviderEarningsPage: React.FC = () => {
  const payouts = [
    { date: 'Nov 4, 2026', orderId: 'OD-48213', property: '10400 Fernwood Rd, Bethesda MD', tier: '24h', amount: 145.00, status: 'PROCESSING' },
    { date: 'Nov 4, 2026', orderId: 'OD-48214', property: '812 7th St NW, Washington DC', tier: '6h Rush', amount: 195.00, status: 'QUEUED' },
    { date: 'Nov 3, 2026', orderId: 'OD-48188', property: '7200 Wisconsin Ave, Bethesda MD', tier: '12h Express', amount: 165.00, status: 'PAID' },
    { date: 'Nov 2, 2026', orderId: 'OD-48160', property: '100 Courthouse Sq, Rockville MD', tier: '24h', amount: 145.00, status: 'PAID' },
    { date: 'Nov 1, 2026', orderId: 'OD-48142', property: '9201 Corporate Blvd, Rockville MD', tier: '24h', amount: 145.00, status: 'PAID' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#D1E2E5]">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-[#1C2733]">
            Abstractor Earnings &amp; Payouts
          </h1>
          <p className="text-xs text-[#5A6B7F]">
            Direct ACH bank transfer settlements initiated within 24 hours of report delivery.
          </p>
        </div>

        <button
          onClick={() => alert('Demo Mode: 1099 summary download simulation.')}
          className="btn-secondary px-4 py-2 text-xs font-bold inline-flex items-center gap-1.5"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Download 2026 1099 Summary</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-card border border-[#D1E2E5] shadow-soft">
          <span className="text-xs font-bold text-[#5A6B7F] uppercase tracking-wider block mb-1">
            Pending / In-Transit Payouts
          </span>
          <div className="text-2xl font-extrabold font-mono text-[#1C2733]">$340.00</div>
          <span className="text-[11px] text-[#5A6B7F]">ACH batch releases tonight at 11:59 PM ET</span>
        </div>

        <div className="bg-white p-5 rounded-card border border-[#D1E2E5] shadow-soft">
          <span className="text-xs font-bold text-[#5A6B7F] uppercase tracking-wider block mb-1">
            Month-to-Date (November)
          </span>
          <div className="text-2xl font-extrabold font-mono text-[#1C2733]">$1,420.00</div>
          <span className="text-[11px] text-[#1E535E] font-semibold">9 completed title searches</span>
        </div>

        <div className="bg-white p-5 rounded-card border border-[#D1E2E5] shadow-soft">
          <span className="text-xs font-bold text-[#5A6B7F] uppercase tracking-wider block mb-1">
            Lifetime Abstract Payouts
          </span>
          <div className="text-2xl font-extrabold font-mono text-[#1C2733]">$42,800.00</div>
          <span className="text-[11px] text-[#5A6B7F]">284 verified searches delivered</span>
        </div>
      </div>

      <div className="bg-white rounded-card border border-[#D1E2E5] shadow-soft overflow-hidden">
        <div className="p-4 bg-[#F8FAFC] border-b border-[#D1E2E5] text-xs font-bold text-[#1C2733]">
          Recent Search Settlements
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-[#D1E2E5] text-[#5A6B7F] text-[10px] uppercase font-bold tracking-wider">
              <tr>
                <th className="p-3.5">Settlement Date</th>
                <th className="p-3.5">Order ID</th>
                <th className="p-3.5">Property Location</th>
                <th className="p-3.5">Turnaround Tier</th>
                <th className="p-3.5">Payout Amount</th>
                <th className="p-3.5 text-right">ACH Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#D1E2E5]">
              {payouts.map((p, idx) => (
                <tr key={idx} className="hover:bg-[#F4F6FA]/60">
                  <td className="p-3.5 text-[#5A6B7F] font-mono">{p.date}</td>
                  <td className="p-3.5 font-mono font-bold text-[#1C2733]">{p.orderId}</td>
                  <td className="p-3.5 font-bold text-[#1C2733]">{p.property}</td>
                  <td className="p-3.5">{p.tier}</td>
                  <td className="p-3.5 font-mono font-bold text-[#1C2733]">${p.amount.toFixed(2)}</td>
                  <td className="p-3.5 text-right">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      p.status === 'PAID' ? 'bg-[#1E535E]/10 text-[#1E535E]' : 'bg-[#E2EFF1] text-[#1C2733]'
                    }`}>
                      {p.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
