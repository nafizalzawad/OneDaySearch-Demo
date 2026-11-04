import React, { useState } from 'react';
import { INITIAL_ALERTS } from '../../mock/data';
import { SystemAlert } from '../../mock/types';
import { mockMarketplace } from '../../mock/service';
import { AlertTriangle, CheckCircle2, Clock, ShieldAlert, ArrowRight, RotateCcw } from 'lucide-react';

export const AdminAlertsPage: React.FC = () => {
  const [alerts, setAlerts] = useState<SystemAlert[]>(INITIAL_ALERTS);

  const handleResolve = async (id: string) => {
    await mockMarketplace.resolveAlert(id);
    setAlerts((prev) =>
      prev.map((a) => (a.id === id ? { ...a, resolved: true } : a))
    );
  };

  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-[#E3E8F0]">
        <h1 className="text-xl sm:text-2xl font-extrabold text-[#0B1B33]">
          Real-Time Marketplace Alerts &amp; Incidents
        </h1>
        <p className="text-xs text-[#4F5F78]">
          Automated escalation feed monitoring 30-minute unaccepted dispatch timeouts, approaching SLA deadlines, and abstractor credential expirations.
        </p>
      </div>

      <div className="space-y-4">
        {alerts.map((alt) => (
          <div
            key={alt.id}
            className={`p-5 rounded-card border shadow-soft transition-all ${
              alt.resolved
                ? 'bg-white opacity-60 border-[#E3E8F0]'
                : alt.severity === 'critical'
                ? 'bg-red-50/50 border-red-200'
                : 'bg-amber-50/50 border-amber-200'
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                    alt.resolved
                      ? 'bg-gray-100 text-[#4F5F78]'
                      : alt.severity === 'critical'
                      ? 'bg-red-100 text-red-700'
                      : 'bg-amber-100 text-amber-700'
                  }`}
                >
                  <AlertTriangle className="w-4 h-4" />
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded ${
                        alt.severity === 'critical'
                          ? 'bg-red-200 text-red-900'
                          : 'bg-amber-200 text-amber-900'
                      }`}
                    >
                      {alt.type.replace(/_/g, ' ')}
                    </span>
                    <span className="text-[11px] text-[#4F5F78] font-mono">{alt.timestamp}</span>
                  </div>

                  <p className="text-xs sm:text-sm font-semibold text-[#0B1B33]">
                    {alt.message}
                  </p>

                  <div className="flex items-center gap-4 mt-2 text-[11px] text-[#4F5F78]">
                    {alt.orderId && (
                      <span>
                        Target Order: <strong className="font-mono text-[#0B1B33]">{alt.orderId}</strong>
                      </span>
                    )}
                    {alt.providerName && (
                      <span>
                        Abstractor: <strong className="text-[#0B1B33]">{alt.providerName}</strong>
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {alt.resolved ? (
                  <span className="text-xs font-bold text-[#17824F] flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" /> Resolved
                  </span>
                ) : (
                  <>
                    <button
                      onClick={() => handleResolve(alt.id)}
                      className="btn-primary px-3.5 py-1.5 text-xs font-bold"
                    >
                      Acknowledge &amp; Clear
                    </button>
                    {alt.orderId && (
                      <button
                        onClick={() => alert(`Simulating auto-reassignment dispatch for order ${alt.orderId}`)}
                        className="btn-secondary px-3 py-1.5 text-xs font-bold inline-flex items-center gap-1"
                      >
                        <RotateCcw className="w-3 h-3" /> Re-Dispatch
                      </button>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
