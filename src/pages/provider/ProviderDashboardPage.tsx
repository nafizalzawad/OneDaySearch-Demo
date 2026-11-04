import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Clock,
  Zap,
  CheckCircle2,
  AlertCircle,
  FileSpreadsheet,
  ArrowUpRight,
  Plus,
  Minus,
  X,
  ExternalLink,
  ShieldAlert,
} from 'lucide-react';
import { INITIAL_ORDERS } from '../../mock/data';
import { Offer, TierId } from '../../mock/types';
import { mockMarketplace } from '../../mock/service';

export const ProviderDashboardPage: React.FC = () => {
  const navigate = useNavigate();

  const [capacityUsed, setCapacityUsed] = useState<number>(3);
  const [capacityMax, setCapacityMax] = useState<number>(6);
  const [rushSlots, setRushSlots] = useState<number>(2);

  // New Dispatched Offer Modal State
  const [showOfferModal, setShowOfferModal] = useState<boolean>(false);
  const [offerCountdown, setOfferCountdown] = useState<number>(44);

  // Offer countdown effect
  useEffect(() => {
    if (!showOfferModal) return;
    const timer = setInterval(() => {
      setOfferCountdown((prev) => {
        if (prev <= 1) {
          setShowOfferModal(false);
          return 45;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [showOfferModal]);

  const activeOrders = INITIAL_ORDERS.filter((o) => o.status !== 'CLOSED');

  const handleAcceptOffer = async () => {
    await mockMarketplace.acceptOffer('OD-48216', 'prov-001');
    setShowOfferModal(false);
    navigate('/provider/orders/OD-48213');
  };

  return (
    <div className="space-y-6">
      {/* Top Banner: Welcome & Quick Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Capacity Meter */}
        <div className="bg-white p-5 rounded-card border border-[#E3E8F0] shadow-soft">
          <div className="flex items-center justify-between text-xs text-[#4F5F78] mb-2">
            <span className="font-bold uppercase tracking-wider text-[#0B1B33]">Daily Capacity</span>
            <span className="font-mono font-bold text-[#0B1B33]">
              {capacityUsed} of {capacityMax} Orders
            </span>
          </div>
          <div className="w-full bg-[#F4F6FA] h-2.5 rounded-pill overflow-hidden border border-[#E3E8F0] mb-3">
            <div
              className="bg-[#0B1B33] h-full rounded-pill transition-all"
              style={{ width: `${(capacityUsed / capacityMax) * 100}%` }}
            />
          </div>
          <div className="flex items-center justify-between text-[11px] text-[#4F5F78]">
            <span>Active Slots: {capacityMax - capacityUsed} Open</span>
            <button
              onClick={() => setCapacityMax((m) => Math.min(12, m + 1))}
              className="font-bold text-[#0B1B33] hover:text-[#F2A33A] underline"
            >
              Adjust Limit
            </button>
          </div>
        </div>

        {/* Rush Slot Steppers */}
        <div className="bg-white p-5 rounded-card border border-[#E3E8F0] shadow-soft">
          <div className="flex items-center justify-between text-xs text-[#4F5F78] mb-2">
            <span className="font-bold uppercase tracking-wider text-[#0B1B33]">Same-Day Rush Slots</span>
            <span className="text-[10px] bg-[#FDEBD0] text-[#0B1B33] px-2 py-0.5 rounded font-mono font-bold">
              +$50 Payout
            </span>
          </div>
          <div className="flex items-center justify-between py-1">
            <span className="text-2xl font-extrabold font-mono text-[#0B1B33]">
              {rushSlots} Available
            </span>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setRushSlots((r) => Math.max(0, r - 1))}
                className="w-7 h-7 rounded-lg border border-[#E3E8F0] hover:bg-[#F4F6FA] flex items-center justify-center text-[#0B1B33]"
                title="Decrease rush slots"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setRushSlots((r) => r + 1)}
                className="w-7 h-7 rounded-lg border border-[#E3E8F0] hover:bg-[#F4F6FA] flex items-center justify-center text-[#0B1B33]"
                title="Increase rush slots"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
          <p className="text-[11px] text-[#4F5F78] mt-1">
            Accepting 6h rush dispatch in Montgomery &amp; DC
          </p>
        </div>

        {/* Today's Earnings */}
        <div className="bg-white p-5 rounded-card border border-[#E3E8F0] shadow-soft">
          <span className="text-xs font-bold uppercase tracking-wider text-[#4F5F78] block mb-1">
            Today&apos;s Payouts
          </span>
          <div className="text-2xl font-extrabold font-mono text-[#0B1B33] mb-1">
            $310.00
          </div>
          <div className="text-[11px] text-[#17824F] font-semibold flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>2 completed, 1 in review</span>
          </div>
        </div>

        {/* Dispatch Trigger Test */}
        <div className="bg-white p-5 rounded-card border border-[#F2A33A]/60 shadow-soft flex flex-col justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#0B1B33] block mb-1">
              Dispatch Simulator
            </span>
            <p className="text-[11px] text-[#4F5F78]">
              Test incoming offer dispatch overlay with countdown ring.
            </p>
          </div>
          <button
            onClick={() => {
              setOfferCountdown(45);
              setShowOfferModal(true);
            }}
            className="btn-primary w-full py-2 text-xs font-bold mt-2"
          >
            Simulate New Order Offer
          </button>
        </div>
      </div>

      {/* Active Abstractor Queue Table */}
      <div className="bg-white rounded-card border border-[#E3E8F0] shadow-soft overflow-hidden">
        <div className="p-5 border-b border-[#E3E8F0] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-base font-extrabold text-[#0B1B33]">
              Active Abstractor Work Queue
            </h2>
            <p className="text-xs text-[#4F5F78]">
              All internal deadlines reflect marketplace safety buffers prior to customer SLA.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-[#4F5F78] bg-[#F4F6FA] px-2.5 py-1 rounded border border-[#E3E8F0]">
              {activeOrders.length} In-Progress Searches
            </span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F8FAFC] border-b border-[#E3E8F0] text-[#4F5F78] uppercase font-bold text-[10px] tracking-wider">
              <tr>
                <th className="py-3 px-4">Order ID</th>
                <th className="py-3 px-4">Property &amp; County</th>
                <th className="py-3 px-4">Scope / Tier</th>
                <th className="py-3 px-4">Internal SLA Target</th>
                <th className="py-3 px-4">Abstractor Payout</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E3E8F0]">
              {activeOrders.map((ord) => (
                <tr key={ord.id} className="hover:bg-[#F4F6FA]/70 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold text-[#0B1B33]">
                    {ord.id}
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-[#0B1B33]">{ord.property.address}</div>
                    <div className="text-[11px] text-[#4F5F78]">
                      {ord.property.county}, {ord.property.state} · {ord.property.propertyType}
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="font-semibold text-[#0B1B33]">{ord.tier.toUpperCase()}</span>
                    <span className="text-[10px] text-[#4F5F78] block">40-Yr Deed Chain</span>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-mono font-bold text-[#0B1B33]">
                      {new Intl.DateTimeFormat('en-US', {
                        weekday: 'short',
                        hour: 'numeric',
                        minute: '2-digit',
                        timeZone: 'America/New_York',
                      }).format(new Date(ord.internalDueTime))} ET
                    </div>
                    <span className="text-[10px] text-[#17824F] font-semibold">
                      Buffer protected
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-mono font-bold text-[#0B1B33]">
                    ${ord.providerPayout}.00
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`px-2.5 py-1 rounded-pill text-[10px] font-bold ${
                        ord.status === 'IN_PROGRESS'
                          ? 'bg-[#FDEBD0] text-[#0B1B33]'
                          : ord.status === 'READY'
                          ? 'bg-[#17824F]/10 text-[#17824F]'
                          : 'bg-[#0B1B33] text-white'
                      }`}
                    >
                      {ord.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <Link
                      to={`/provider/orders/${ord.id}`}
                      className="btn-secondary px-3 py-1.5 text-xs font-bold inline-flex items-center gap-1"
                    >
                      <span>Workbench</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* DISPATCH OFFER MODAL OVERLAY */}
      {showOfferModal && (
        <div className="fixed inset-0 z-50 bg-[#0B1B33]/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-card border-2 border-[#F2A33A] shadow-elevated max-w-lg w-full p-6 text-left animate-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-[#E3E8F0] mb-4">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#F2A33A] animate-ping" />
                <h3 className="text-base font-extrabold text-[#0B1B33]">
                  New Order Offer Dispatched
                </h3>
              </div>
              <div className="flex items-center gap-2">
                {/* Countdown Ring Badge */}
                <div className="px-2.5 py-1 rounded-pill bg-[#0B1B33] text-[#F2A33A] font-mono text-xs font-bold flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  <span>00:{offerCountdown.toString().padStart(2, '0')}</span>
                </div>
                <button
                  onClick={() => setShowOfferModal(false)}
                  className="p-1 text-[#4F5F78] hover:text-[#0B1B33]"
                  title="Close modal"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Offer Metadata (HARD SEPARATION: NO CUSTOMER IDENTITY) */}
            <div className="space-y-3 text-xs mb-6">
              <div className="p-3 bg-[#F4F6FA] rounded-lg border border-[#E3E8F0]">
                <span className="text-[10px] text-[#4F5F78] font-bold uppercase tracking-wider block">
                  Property Location
                </span>
                <div className="text-sm font-bold text-[#0B1B33] mt-0.5">
                  4500 East West Hwy, Bethesda, MD 20814
                </div>
                <div className="text-[11px] text-[#4F5F78]">
                  Montgomery County Jurisdiction · Commercial Office / Mixed Use
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-white rounded-lg border border-[#E3E8F0]">
                  <span className="text-[10px] text-[#4F5F78] font-bold uppercase tracking-wider block">
                    Turnaround Tier
                  </span>
                  <div className="text-xs font-bold text-[#0B1B33] mt-0.5">
                    12-Hour Express
                  </div>
                  <div className="text-[10px] text-[#4F5F78]">
                    Internal SLA: Today by 6:00 PM ET
                  </div>
                </div>

                <div className="p-3 bg-[#FDEBD0]/60 rounded-lg border border-[#F2A33A]/40">
                  <span className="text-[10px] text-[#0B1B33] font-bold uppercase tracking-wider block">
                    Abstractor Payout
                  </span>
                  <div className="text-lg font-mono font-extrabold text-[#0B1B33] mt-0.5">
                    $165.00
                  </div>
                  <div className="text-[10px] text-[#0B1B33]">
                    Instant ACH transfer on delivery
                  </div>
                </div>
              </div>

              {/* Hard Separation Notice in Modal */}
              <div className="p-2.5 bg-blue-50/60 rounded-lg border border-blue-200 text-[11px] text-blue-900 flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-blue-700 shrink-0" />
                <span>Customer contact details shielded under marketplace privacy protocol.</span>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setShowOfferModal(false)}
                className="btn-secondary py-3 text-xs font-bold"
              >
                Decline Offer
              </button>
              <button
                onClick={handleAcceptOffer}
                className="btn-primary py-3 text-xs font-extrabold shadow-card"
              >
                Accept Order ($165.00)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
