import React, { useState } from 'react';
import { MOCK_PROVIDERS } from '../../mock/data';
import { Provider } from '../../mock/types';
import { ShieldCheck, AlertCircle, Phone, Mail, CheckCircle2 } from 'lucide-react';

export const AdminProvidersPage: React.FC = () => {
  const [providers, setProviders] = useState<Provider[]>(MOCK_PROVIDERS);

  const isExpiringSoon = (expiryDate: string): boolean => {
    const diffDays = (new Date(expiryDate).getTime() - Date.now()) / (1000 * 3600 * 24);
    return diffDays < 30;
  };

  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-[#E3E8F0]">
        <h1 className="text-xl sm:text-2xl font-extrabold text-[#1C2733]">
          Abstractor Network &amp; E&amp;O Compliance Roster
        </h1>
        <p className="text-xs text-[#5A6B7F]">
          Registry of certified independent title abstractors across Maryland, DC, and Virginia jurisdictions.
        </p>
      </div>

      <div className="bg-white rounded-card border border-[#E3E8F0] shadow-soft overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F8FAFC] border-b border-[#E3E8F0] text-[#5A6B7F] text-[10px] uppercase font-bold tracking-wider">
              <tr>
                <th className="py-3 px-4">Abstractor Name</th>
                <th className="py-3 px-4">Covered Counties</th>
                <th className="py-3 px-4">E&amp;O Policy &amp; Expiry</th>
                <th className="py-3 px-4">Coverage Limit</th>
                <th className="py-3 px-4">Active / Capacity</th>
                <th className="py-3 px-4">Lifetime Searches</th>
                <th className="py-3 px-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E3E8F0]">
              {providers.map((p) => {
                const expiring = isExpiringSoon(p.eoExpiryDate);
                return (
                  <tr key={p.id} className="hover:bg-[#F4F6FA]/70 transition-colors">
                    <td className="py-3 px-4">
                      <div className="font-bold text-[#1C2733]">{p.name}</div>
                      <div className="text-[10px] text-[#5A6B7F]">{p.phone}</div>
                    </td>

                    <td className="py-3 px-4">
                      <div className="flex flex-wrap gap-1 max-w-[200px]">
                        {p.countiesCovered.map((c, i) => (
                          <span
                            key={i}
                            className="text-[10px] bg-[#F4F6FA] text-[#1C2733] px-1.5 py-0.5 rounded border border-[#E3E8F0]"
                          >
                            {c}
                          </span>
                        ))}
                      </div>
                    </td>

                    <td className="py-3 px-4">
                      <div className="font-mono text-[#1C2733]">{p.eoPolicyNumber}</div>
                      <div
                        className={`text-[10px] font-bold ${
                          expiring ? 'text-red-700 bg-red-50 px-1.5 py-0.2 rounded inline-block' : 'text-[#5A6B7F]'
                        }`}
                      >
                        Exp: {p.eoExpiryDate} {expiring && '(Expires in 12 days!)'}
                      </div>
                    </td>

                    <td className="py-3 px-4 font-mono font-bold text-[#1C2733]">
                      ${(p.eoCoverageAmount / 1000000).toFixed(1)}M
                    </td>

                    <td className="py-3 px-4 font-mono">
                      <span className="font-bold text-[#1C2733]">{p.activeOrdersCount}</span>
                      <span className="text-[#5A6B7F]"> / {p.dailyCapacity} orders</span>
                    </td>

                    <td className="py-3 px-4 font-mono font-bold text-[#1C2733]">
                      {p.completedSearchesCount}
                    </td>

                    <td className="py-3 px-4 text-right">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          p.isOnline
                            ? 'bg-[#00BC82]/10 text-[#00BC82]'
                            : 'bg-gray-100 text-[#5A6B7F]'
                        }`}
                      >
                        {p.isOnline ? 'ONLINE' : 'OFFLINE'}
                      </span>
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
