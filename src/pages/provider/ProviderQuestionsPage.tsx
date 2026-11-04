import React, { useState } from 'react';
import { MessageSquare, Send, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { INITIAL_ORDERS } from '../../mock/data';
import { mockMarketplace } from '../../mock/service';

export const ProviderQuestionsPage: React.FC = () => {
  const [activeOrderId, setActiveOrderId] = useState<string>('OD-48213');
  const [replyText, setReplyText] = useState<string>('');
  const [messages, setMessages] = useState(INITIAL_ORDERS[0].messages);

  const handleSendReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim()) return;

    const newMsg = await mockMarketplace.addMessage(activeOrderId, 'abstractor', replyText.trim());
    setMessages((prev) => [...prev, newMsg]);
    setReplyText('');
  };

  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-[#E3E8F0]">
        <h1 className="text-xl sm:text-2xl font-extrabold text-[#0B1B33]">
          Customer Clarification Inbox
        </h1>
        <p className="text-xs text-[#4F5F78]">
          Two-way anonymous clarification thread for active and delivered title searches.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Order Selector Sidebar */}
        <div className="md:col-span-4 space-y-2">
          {INITIAL_ORDERS.map((ord) => (
            <button
              key={ord.id}
              onClick={() => {
                setActiveOrderId(ord.id);
                setMessages(ord.messages);
              }}
              className={`w-full p-4 rounded-xl border text-left transition-all ${
                activeOrderId === ord.id
                  ? 'border-[#0B1B33] bg-white shadow-soft ring-1 ring-[#0B1B33]'
                  : 'border-[#E3E8F0] bg-white hover:bg-[#F8FAFC]'
              }`}
            >
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-mono font-bold text-[#0B1B33]">{ord.id}</span>
                <span className="text-[10px] text-[#4F5F78]">{ord.tier.toUpperCase()}</span>
              </div>
              <div className="text-xs font-bold text-[#0B1B33] truncate">
                {ord.property.address}
              </div>
              <div className="text-[11px] text-[#4F5F78] mt-0.5">
                {ord.property.county}, {ord.property.state}
              </div>
            </button>
          ))}
        </div>

        {/* Active Thread */}
        <div className="md:col-span-8 bg-white rounded-card border border-[#E3E8F0] shadow-soft p-6 flex flex-col h-[520px]">
          <div className="flex items-center justify-between pb-3 border-b border-[#E3E8F0] mb-4">
            <div>
              <div className="text-xs font-mono font-bold text-[#0B1B33]">Order {activeOrderId}</div>
              <div className="text-[11px] text-[#4F5F78]">Anonymous Customer Communication Thread</div>
            </div>
            <span className="text-[10px] font-mono text-[#17824F] bg-[#17824F]/10 px-2 py-0.5 rounded font-bold">
              48h Window
            </span>
          </div>

          <div className="flex-1 overflow-y-auto space-y-3 pr-2 mb-4">
            {messages.map((m) => {
              const isMe = m.senderRole === 'abstractor';
              const isSys = m.senderRole === 'system';

              if (isSys) {
                return (
                  <div key={m.id} className="text-center my-2">
                    <span className="text-[10px] font-mono bg-[#F4F6FA] text-[#4F5F78] px-2 py-0.5 rounded border border-[#E3E8F0]">
                      {m.content}
                    </span>
                  </div>
                );
              }

              return (
                <div key={m.id} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                  <div className="text-[10px] font-bold text-[#4F5F78] mb-0.5 px-1">
                    {isMe ? 'You (Abstractor)' : 'Customer (Anonymous)'}
                  </div>
                  <div
                    className={`p-3 rounded-2xl max-w-[80%] text-xs leading-relaxed ${
                      isMe
                        ? 'bg-[#0B1B33] text-white rounded-br-none'
                        : 'bg-[#F4F6FA] text-[#0B1B33] border border-[#E3E8F0] rounded-bl-none'
                    }`}
                  >
                    {m.content}
                  </div>
                </div>
              );
            })}
          </div>

          <form onSubmit={handleSendReply} className="pt-3 border-t border-[#E3E8F0] mt-auto flex gap-2">
            <input
              type="text"
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder="Type your response to the customer..."
              className="flex-1 text-xs px-3.5 py-2.5 rounded-pill border border-[#E3E8F0] focus:outline-none focus:ring-2 focus:ring-[#F2A33A]"
            />
            <button type="submit" className="btn-primary w-9 h-9 rounded-full flex items-center justify-center shrink-0">
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
