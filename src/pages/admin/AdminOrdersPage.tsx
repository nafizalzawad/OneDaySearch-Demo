import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { INITIAL_ORDERS } from '../../mock/data';
import { InternalOrder, OrderStatus } from '../../mock/types';
import {
  Search,
  Filter,
  AlertCircle,
  Clock,
  ArrowUpRight,
  ShieldAlert,
  UserCheck,
} from 'lucide-react';

export const AdminOrdersPage: React.FC = () => {
  const [orders, setOrders] = useState<InternalOrder[]>(INITIAL_ORDERS);
  const [filterStatus, setFilterStatus] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredOrders = orders.filter((o) => {
    if (filterStatus !== 'ALL' && o.status !== filterStatus) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        o.id.toLowerCase().includes(q) ||
        o.property.address.toLowerCase().includes(q) ||
        o.customer.fullName.toLowerCase().includes(q) ||
        (o.assignedProviderName && o.assignedProviderName.toLowerCase().includes(q))
      );
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Top Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#D1E2E5]">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-[#1C2733]">
            Live Marketplace Order Board
          </h1>
          <p className="text-xs text-[#5A6B7F]">
            Complete internal visibility across guest customers, dispatched abstractors, and Eastern Time delivery windows.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-[#5A6B7F] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter by OD#, address, abstractor..."
              className="text-xs pl-8 pr-3 py-2 rounded-lg border border-[#D1E2E5] focus:outline-none focus:ring-1 focus:ring-[#1E535E] w-64"
            />
          </div>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="text-xs py-2 px-3 rounded-lg border border-[#D1E2E5] bg-white text-[#1C2733]"
          >
            <option value="ALL">All Statuses</option>
            <option value="MATCHING">Matching</option>
            <option value="ASSIGNED">Assigned</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="READY">Ready</option>
          </select>
        </div>
      </div>

      {/* Orders Matrix Table */}
      <div className="bg-white rounded-card border border-[#D1E2E5] shadow-soft overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F8FAFC] border-b border-[#D1E2E5] text-[#5A6B7F] text-[10px] uppercase font-bold tracking-wider">
              <tr>
                <th className="py-3 px-4">Order ID &amp; Placed</th>
                <th className="py-3 px-4">Property &amp; County</th>
                <th className="py-3 px-4">Customer (Internal)</th>
                <th className="py-3 px-4">Assigned Abstractor</th>
                <th className="py-3 px-4">Tier &amp; Price</th>
                <th className="py-3 px-4">Customer Due (ET)</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-center">Late Risk</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#D1E2E5]">
              {filteredOrders.map((ord) => {
                return (
                  <tr key={ord.id} className="hover:bg-[#F4F6FA]/70 transition-colors">
                    <td className="py-3 px-4">
                      <div className="font-mono font-bold text-[#1C2733]">{ord.id}</div>
                      <div className="text-[10px] text-[#5A6B7F] font-mono">
                        {new Date(ord.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} ET
                      </div>
                    </td>

                    <td className="py-3 px-4">
                      <div className="font-bold text-[#1C2733] max-w-[180px] truncate">
                        {ord.property.address}
                      </div>
                      <div className="text-[10px] text-[#5A6B7F]">
                        {ord.property.county}, {ord.property.state}
                      </div>
                    </td>

                    <td className="py-3 px-4">
                      <div className="font-bold text-[#1C2733]">{ord.customer.fullName}</div>
                      <div className="text-[10px] text-[#5A6B7F]">{ord.customer.email}</div>
                    </td>

                    <td className="py-3 px-4">
                      {ord.assignedProviderName ? (
                        <div>
                          <span className="font-bold text-[#1C2733] flex items-center gap-1">
                            <UserCheck className="w-3 h-3 text-[#1E535E]" />
                            {ord.assignedProviderName}
                          </span>
                          <span className="text-[10px] text-[#5A6B7F] font-mono">
                            Payout: ${ord.providerPayout}
                          </span>
                        </div>
                      ) : (
                        <span className="text-amber-800 bg-amber-50 px-2 py-0.5 rounded font-mono text-[10px] font-bold">
                          Unassigned (Routing)
                        </span>
                      )}
                    </td>

                    <td className="py-3 px-4">
                      <div className="font-bold font-mono text-[#1C2733]">${ord.price}</div>
                      <div className="text-[10px] text-[#5A6B7F]">{ord.tier.toUpperCase()} SLA</div>
                    </td>

                    <td className="py-3 px-4">
                      <div className="font-mono font-bold text-[#1C2733]">
                        {new Intl.DateTimeFormat('en-US', {
                          weekday: 'short',
                          hour: 'numeric',
                          minute: '2-digit',
                          timeZone: 'America/New_York',
                        }).format(new Date(ord.customerDueTime))} ET
                      </div>
                    </td>

                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-0.5 rounded-pill text-[10px] font-bold ${
                          ord.status === 'READY'
                            ? 'bg-[#1E535E]/10 text-[#1E535E]'
                            : ord.status === 'IN_PROGRESS'
                            ? 'bg-[#1C2733] text-white'
                            : 'bg-[#E2EFF1] text-[#1C2733]'
                        }`}
                      >
                        {ord.status}
                      </span>
                    </td>

                    <td className="py-3 px-4 text-center">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold inline-flex items-center gap-1 ${
                          ord.lateRisk === 'HIGH'
                            ? 'bg-red-100 text-red-800 ring-1 ring-red-400'
                            : ord.lateRisk === 'MEDIUM'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-green-100 text-green-800'
                        }`}
                      >
                        {ord.lateRisk === 'HIGH' && '⚠️ '}
                        {ord.lateRisk}
                      </span>
                    </td>

                    <td className="py-3 px-4 text-right">
                      <Link
                        to={`/order/${ord.token}`}
                        target="_blank"
                        className="text-xs font-bold text-[#1C2733] hover:text-[#1E535E] inline-flex items-center gap-1 underline"
                        title="Inspect customer view"
                      >
                        <span>Customer URL</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
