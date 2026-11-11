import React from 'react';
import { INITIAL_AUDIT_LOG } from '../../mock/data';
import { History, Shield, CheckCircle2 } from 'lucide-react';

export const AdminAuditLogPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-[#E3E8F0]">
        <h1 className="text-xl sm:text-2xl font-extrabold text-[#1C2733]">
          Chronological Audit Log
        </h1>
        <p className="text-xs text-[#5A6B7F]">
          Immutable record of dispatch lifecycle events, authorization timestamps, abstractor handoffs, and report deliveries.
        </p>
      </div>

      <div className="bg-white rounded-card border border-[#E3E8F0] shadow-soft overflow-hidden">
        <div className="divide-y divide-[#E3E8F0]">
          {INITIAL_AUDIT_LOG.map((log) => (
            <div key={log.id} className="p-4 sm:p-5 flex items-start justify-between gap-4 hover:bg-[#F8FAFC]">
              <div className="flex items-start gap-3">
                <span className="font-mono text-xs font-bold text-[#5A6B7F] bg-[#F4F6FA] px-2 py-1 rounded border border-[#E3E8F0] shrink-0 mt-0.5">
                  {log.timestamp}
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-[#1C2733]">
                      {log.orderId}
                    </span>
                    <span className="text-[10px] font-mono uppercase bg-[#1C2733] text-white px-1.5 py-0.2 rounded font-bold">
                      {log.eventType}
                    </span>
                  </div>
                  <p className="text-xs text-[#1C2733] font-medium mt-1">
                    {log.details}
                  </p>
                  <span className="text-[10px] text-[#5A6B7F] mt-0.5 block">
                    Actor: {log.actor}
                  </span>
                </div>
              </div>

              <div className="text-right shrink-0">
                <span className="text-[10px] text-[#00BC82] font-mono font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Logged
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
