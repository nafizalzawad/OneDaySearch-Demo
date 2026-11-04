import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDemo } from '../context/DemoContext';
import { CustomerOrderDTO, OrderStatus, OrderMessage } from '../mock/types';
import { mockMarketplace } from '../mock/service';
import { formatCountdown } from '../mock/clock';
import {
  Clock,
  CheckCircle2,
  AlertCircle,
  Download,
  Send,
  Lock,
  Copy,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  FileText,
  Shield,
  HelpCircle,
  Bookmark,
  Share2,
} from 'lucide-react';

export const OrderStatusPage: React.FC = () => {
  const { token } = useParams<{ token: string }>();
  const { currentStage, setCurrentStage, setActiveOrderToken } = useDemo();

  const [order, setOrder] = useState<CustomerOrderDTO | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);
  const [showReceipt, setShowReceipt] = useState<boolean>(false);
  const [showSupersededExample, setShowSupersededExample] = useState<boolean>(false);
  const [countdownString, setCountdownString] = useState<string>('14h 22m 18s');
  const [newMessageText, setNewMessageText] = useState<string>('');
  const [isSendingMessage, setIsSendingMessage] = useState<boolean>(false);

  // Sync token with DemoContext
  useEffect(() => {
    if (token) {
      setActiveOrderToken(token);
    }
  }, [token]);

  // Load Order
  useEffect(() => {
    const fetchOrder = async () => {
      setLoading(true);
      const data = await mockMarketplace.getOrderByToken(token || 'd9f82a17c4b03e89');
      if (data) {
        setOrder(data);
        // If currentStage in demo dock was toggled, honor it
        if (currentStage) {
          data.status = currentStage;
        }
      }
      setLoading(false);
    };

    fetchOrder();
  }, [token, currentStage]);

  // Live countdown timer in JetBrains Mono
  useEffect(() => {
    if (!order) return;
    const interval = setInterval(() => {
      const now = new Date();
      setCountdownString(formatCountdown(order.customerDueTime, now));
    }, 1000);
    return () => clearInterval(interval);
  }, [order]);

  const stagesOrder: { key: OrderStatus; label: string; description: string }[] = [
    { key: 'MATCHING', label: 'Matching', description: 'Routing to certified county abstractor' },
    { key: 'ASSIGNED', label: 'Assigned', description: 'Abstractor accepted order scope' },
    { key: 'IN_PROGRESS', label: 'In Progress', description: 'Searching courthouse & online land records' },
    { key: 'READY', label: 'Report Ready', description: 'Title search report certified & available' },
    { key: 'QUESTIONS', label: 'Questions Open', description: '48-hour resolution thread active' },
    { key: 'CLOSED', label: 'Closed', description: 'Resolution window completed and archived' },
  ];

  const getStageIndex = (st: OrderStatus): number => {
    const idx = stagesOrder.findIndex((s) => s.key === st);
    return idx >= 0 ? idx : 0;
  };

  const activeStage = order?.status || currentStage;
  const activeStageIdx = getStageIndex(activeStage);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessageText.trim() || !order || isSendingMessage) return;

    setIsSendingMessage(true);
    try {
      const msg = await mockMarketplace.addMessage(order.token, 'customer', newMessageText.trim());
      setOrder((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          messages: [...prev.messages, msg],
        };
      });
      setNewMessageText('');
    } catch (err) {
      console.error(err);
    } finally {
      setIsSendingMessage(false);
    }
  };

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center py-20">
        <div className="text-center">
          <div className="w-8 h-8 border-3 border-[#E3E8F0] border-t-[#F2A33A] rounded-full animate-spin mx-auto mb-3" />
          <p className="text-xs text-[#4F5F78]">Loading order status...</p>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="flex-1 flex items-center justify-center py-20 px-4">
        <div className="text-center max-w-md">
          <AlertCircle className="w-8 h-8 text-[#e09228] mx-auto mb-3" />
          <h2 className="text-lg font-bold text-[#0B1B33]">Order Not Found</h2>
          <p className="text-xs text-[#4F5F78] mt-1 mb-4">
            We could not find an active title search with token <code className="font-mono text-xs">{token}</code>.
          </p>
          <Link to="/" className="btn-primary px-6 py-2 text-xs font-bold">
            Return to search
          </Link>
        </div>
      </div>
    );
  }

  const isReportAvailable = activeStageIdx >= 3; // READY, QUESTIONS, CLOSED

  return (
    <div className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-8 text-left">
      {/* Top Banner: Order ID & Support */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E3E8F0] mb-8">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[#4F5F78] uppercase tracking-wider">Title Search Order</span>
            <span className="text-xs font-mono font-bold bg-[#0B1B33] text-white px-2 py-0.5 rounded">
              {order.id}
            </span>
            <span className="text-[11px] text-[#17824F] font-semibold bg-[#17824F]/10 px-2 py-0.5 rounded-pill">
              Guaranteed SLA
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-[#0B1B33] mt-1">
            {order.property.address}
          </h1>
          <p className="text-xs text-[#4F5F78]">
            {order.property.county}, {order.property.state} {order.property.zip} · {order.tier.toUpperCase()} SLA
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyLink}
            className="btn-secondary px-3.5 py-1.5 text-xs font-semibold flex items-center gap-1.5"
            title="Bookmark or copy persistent tracking link"
          >
            {copiedLink ? <CheckCircle2 className="w-3.5 h-3.5 text-[#17824F]" /> : <Bookmark className="w-3.5 h-3.5" />}
            <span>{copiedLink ? 'Link Copied!' : 'Save This Order'}</span>
          </button>
          <Link
            to="/support"
            className="btn-secondary px-3.5 py-1.5 text-xs font-semibold flex items-center gap-1.5"
          >
            <HelpCircle className="w-3.5 h-3.5" /> Support
          </Link>
        </div>
      </div>

      {/* STAGE PROGRESS CARD */}
      <div className="bg-white rounded-card border border-[#E3E8F0] shadow-soft p-6 mb-8">
        {/* Dynamic Countdown / Due Time Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[#E3E8F0] mb-6">
          <div>
            <span className="text-xs font-semibold text-[#4F5F78] uppercase tracking-wider block">
              Guaranteed Delivery Target
            </span>
            <div className="text-lg sm:text-xl font-bold text-[#0B1B33] mt-0.5">
              Report due by {order.dueTimeFormatted}
            </div>
            {/* HARD SEPARATION RULE: NO PROVIDER IDENTITY */}
            <p className="text-xs text-[#4F5F78] mt-1">
              Assigned to certified local county abstractor · Provider identity shielded per marketplace neutrality
            </p>
          </div>

          <div className="sm:text-right bg-[#F4F6FA] p-3 sm:px-4 sm:py-2.5 rounded-xl border border-[#E3E8F0]">
            <span className="text-[10px] uppercase font-bold text-[#4F5F78] block">Time Remaining to SLA</span>
            <span className="font-mono text-xl sm:text-2xl font-bold text-[#0B1B33] tracking-tight">
              {isReportAvailable ? 'DELIVERED ON-TIME' : countdownString}
            </span>
          </div>
        </div>

        {/* 6-Stage Visual Stepper */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {stagesOrder.map((st, idx) => {
            const isDone = idx < activeStageIdx;
            const isCurrent = idx === activeStageIdx;
            return (
              <div
                key={st.key}
                className={`p-3 rounded-lg border text-left transition-all ${
                  isCurrent
                    ? 'border-[#0B1B33] bg-[#0B1B33] text-white shadow-sm ring-2 ring-[#F2A33A]'
                    : isDone
                    ? 'border-[#17824F]/30 bg-[#17824F]/5 text-[#0B1B33]'
                    : 'border-[#E3E8F0] bg-white text-[#4F5F78] opacity-75'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span
                    className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                      isCurrent
                        ? 'bg-[#F2A33A] text-[#0B1B33]'
                        : isDone
                        ? 'bg-[#17824F] text-white'
                        : 'bg-[#E3E8F0] text-[#4F5F78]'
                    }`}
                  >
                    {isDone ? '✓' : idx + 1}
                  </span>
                  {isCurrent && (
                    <span className="w-2 h-2 rounded-full bg-[#F2A33A] animate-ping" />
                  )}
                </div>
                <div className={`text-xs font-bold leading-tight ${isCurrent ? 'text-white' : 'text-[#0B1B33]'}`}>
                  {st.label}
                </div>
                <div
                  className={`text-[10px] mt-1 line-clamp-2 leading-tight ${
                    isCurrent ? 'text-gray-300' : 'text-[#4F5F78]'
                  }`}
                >
                  {st.description}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* MAIN TWO-COLUMN WORKBENCH: REPORT (S7) & QUESTIONS (S8) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: S7 Mock Report Card & Preview */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white rounded-card border border-[#E3E8F0] shadow-soft p-6">
            <div className="flex items-center justify-between pb-4 border-b border-[#E3E8F0] mb-4">
              <div>
                <h3 className="text-base font-extrabold text-[#0B1B33] flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[#F2A33A]" />
                  Title Search Report Package
                </h3>
                <span className="text-xs text-[#4F5F78]">
                  40-Year Courthouse Land Records Search · Certified Abstract
                </span>
              </div>
              <div>
                {isReportAvailable ? (
                  <span className="px-2.5 py-1 rounded-pill bg-[#17824F]/10 text-[#17824F] text-xs font-bold">
                    Official Complete
                  </span>
                ) : (
                  <span className="px-2.5 py-1 rounded-pill bg-[#FDEBD0] text-[#0B1B33] text-xs font-bold">
                    Examination Underway
                  </span>
                )}
              </div>
            </div>

            {/* Superseded example toggle (Required by prompt) */}
            <div className="mb-4 flex items-center justify-between text-xs bg-[#F4F6FA] p-2.5 rounded-lg border border-[#E3E8F0]">
              <span className="text-[#4F5F78]">Report Version Status:</span>
              <button
                onClick={() => setShowSupersededExample(!showSupersededExample)}
                className="font-bold text-[#0B1B33] hover:text-[#F2A33A] underline"
              >
                {showSupersededExample ? 'View Final v1.0' : 'Simulate Superseded Notice'}
              </button>
            </div>

            {showSupersededExample && (
              <div className="mb-5 p-3.5 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 animate-in fade-in-50">
                <div className="font-bold flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4 text-amber-700" />
                  Superseded Version Notice (Demo Example)
                </div>
                <p className="mt-1 leading-relaxed">
                  Version 0.9 was superseded on Nov 5, 2026 after the county recorded an updated Satisfaction of Mortgage. The current active version is 1.0 (Official Final).
                </p>
              </div>
            )}

            {/* S7 Mock PDF First Page Card */}
            <div className="bg-[#F8FAFC] border border-[#CBD5E1] rounded-xl p-5 font-sans relative overflow-hidden">
              {/* Document Header Seal */}
              <div className="flex items-center justify-between border-b-2 border-[#0B1B33] pb-3 mb-4">
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-widest text-[#4F5F78]">
                    CERTIFIED LAND TITLE ABSTRACT
                  </div>
                  <div className="text-base font-extrabold text-[#0B1B33]">
                    MONTGOMERY COUNTY JURISDICTION
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-mono text-[#4F5F78] block">File No.</span>
                  <span className="text-xs font-mono font-bold text-[#0B1B33]">ODS-2026-48213</span>
                </div>
              </div>

              {/* 4 Required Sections */}
              <div className="space-y-4 text-xs">
                {/* 1. Chain of Title */}
                <div>
                  <h4 className="font-bold text-[#0B1B33] uppercase text-[11px] tracking-wider flex items-center gap-1.5 mb-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0B1B33]" /> Section 1: Chain of Title (40 Years)
                  </h4>
                  <div className="bg-white p-2.5 rounded-lg border border-[#E3E8F0] space-y-1.5 font-mono text-[11px]">
                    <div className="flex justify-between">
                      <span className="text-[#0B1B33] font-bold">2012 Special Warranty Deed</span>
                      <span className="text-[#4F5F78]">Book 44102, Page 184</span>
                    </div>
                    <div className="text-[#4F5F78] text-[10px]">
                      Grantor: Potomac Crest LLC ➔ Grantee: Arthur &amp; Evelyn Sterling
                    </div>
                    <div className="flex justify-between pt-1 border-t border-[#E3E8F0]/60">
                      <span className="text-[#0B1B33]">1998 Fee Simple Deed</span>
                      <span className="text-[#4F5F78]">Book 21900, Page 045</span>
                    </div>
                  </div>
                </div>

                {/* 2. Open Mortgages */}
                <div>
                  <h4 className="font-bold text-[#0B1B33] uppercase text-[11px] tracking-wider flex items-center gap-1.5 mb-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0B1B33]" /> Section 2: Open Mortgages &amp; Deeds of Trust
                  </h4>
                  <div className="bg-white p-2.5 rounded-lg border border-[#E3E8F0] text-[11px]">
                    <div className="flex justify-between font-mono">
                      <span className="font-bold text-[#0B1B33]">First National Bank of Maryland</span>
                      <span className="font-bold text-[#0B1B33]">$485,000.00</span>
                    </div>
                    <div className="text-[#4F5F78] text-[10px] mt-0.5">
                      Rec Date: 06/14/2012 · Instrument: DOT-2012-0091823 · Status: OPEN
                    </div>
                  </div>
                </div>

                {/* 3. Recorded Liens */}
                <div>
                  <h4 className="font-bold text-[#0B1B33] uppercase text-[11px] tracking-wider flex items-center gap-1.5 mb-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0B1B33]" /> Section 3: Recorded Liens &amp; Judgments
                  </h4>
                  <div className="bg-white p-2.5 rounded-lg border border-[#E3E8F0] text-[11px]">
                    <div className="flex justify-between font-mono">
                      <span className="text-[#0B1B33] font-bold">WSSC Municipal Water &amp; Sewer Lien</span>
                      <span className="font-bold text-amber-900 bg-amber-50 px-1.5 py-0.2 rounded">$420.50</span>
                    </div>
                    <div className="text-[#4F5F78] text-[10px] mt-0.5">
                      Case #LIEN-2024-00192 · Recorded 08/03/2024
                    </div>
                  </div>
                </div>

                {/* 4. Easements and Covenants */}
                <div>
                  <h4 className="font-bold text-[#0B1B33] uppercase text-[11px] tracking-wider flex items-center gap-1.5 mb-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0B1B33]" /> Section 4: Easements, Covenants &amp; Restrictions
                  </h4>
                  <div className="bg-white p-2.5 rounded-lg border border-[#E3E8F0] text-[11px] space-y-1">
                    <div className="text-[#0B1B33]">
                      • Pepco Electric Overhead &amp; Underground Utility Right-of-Way (Book 18420, Page 312)
                    </div>
                    <div className="text-[#0B1B33]">
                      • Subdivision Plat Stormwater Drainage &amp; Slope Easement (Plat Book 112, Plat 92)
                    </div>
                  </div>
                </div>
              </div>

              {/* Watermark/Lock overlay if before ready */}
              {!isReportAvailable && (
                <div className="absolute inset-0 bg-white/70 backdrop-blur-[2px] flex flex-col items-center justify-center p-6 text-center">
                  <Lock className="w-8 h-8 text-[#0B1B33] mb-2" />
                  <div className="text-sm font-bold text-[#0B1B33]">
                    Search In Progress
                  </div>
                  <p className="text-xs text-[#4F5F78] max-w-xs mt-1">
                    Abstractor is pulling recorded documents from Montgomery County Circuit Court. Official PDF will unlock here when ready.
                  </p>
                </div>
              )}
            </div>

            {/* Inert Download Button */}
            <div className="mt-5 flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-[#E3E8F0]">
              <div className="text-xs text-[#4F5F78]">
                <span>Format: PDF (14 Pages, 1.8 MB)</span>
              </div>
              <button
                type="button"
                onClick={() => {
                  alert('Demo Mode: Report download simulation. The real system delivers a high-resolution stamped PDF.');
                }}
                disabled={!isReportAvailable}
                className={`btn-primary px-6 py-2.5 text-xs font-bold flex items-center gap-2 ${
                  !isReportAvailable ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                <Download className="w-4 h-4" />
                <span>Download Official Report (PDF)</span>
              </button>
            </div>
          </div>

          {/* Receipt & Order Metadata Accordion */}
          <div className="bg-white rounded-card border border-[#E3E8F0] shadow-soft overflow-hidden">
            <button
              onClick={() => setShowReceipt(!showReceipt)}
              className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-[#F4F6FA] transition-colors"
            >
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-[#0B1B33]">Payment Receipt &amp; Transaction Details</span>
                <span className="text-[10px] font-mono bg-[#17824F]/10 text-[#17824F] px-2 py-0.5 rounded font-semibold">
                  Paid
                </span>
              </div>
              {showReceipt ? <ChevronUp className="w-4 h-4 text-[#4F5F78]" /> : <ChevronDown className="w-4 h-4 text-[#4F5F78]" />}
            </button>

            {showReceipt && (
              <div className="px-6 pb-5 pt-2 border-t border-[#E3E8F0] text-xs space-y-2 text-[#4F5F78]">
                <div className="flex justify-between">
                  <span>Order Reference</span>
                  <span className="font-mono text-[#0B1B33] font-bold">{order.id}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tracking Token</span>
                  <span className="font-mono text-[#0B1B33]">{order.token}</span>
                </div>
                <div className="flex justify-between">
                  <span>Authorized Fee</span>
                  <span className="font-mono text-[#0B1B33] font-bold">${order.price}.00</span>
                </div>
                <div className="flex justify-between">
                  <span>Order Placed</span>
                  <span>{new Date(order.createdAt).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Guaranteed By</span>
                  <span className="font-semibold text-[#0B1B33]">{order.dueTimeFormatted}</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: S8 Questions Thread (48 Hours) */}
        <div className="lg:col-span-5">
          <div className="bg-white rounded-card border border-[#E3E8F0] shadow-soft p-5 sm:p-6 flex flex-col h-full min-h-[500px]">
            <div className="pb-4 border-b border-[#E3E8F0] mb-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-extrabold text-[#0B1B33]">
                  Order Clarifications &amp; Q&amp;A
                </h3>
                <span className="text-[10px] font-bold font-mono text-[#17824F] bg-[#17824F]/10 px-2 py-0.5 rounded">
                  48h Window Open
                </span>
              </div>
              {/* HARD SEPARATION RULE: NO CONTACT DETAILS */}
              <div className="text-[11px] text-[#4F5F78] mt-1 bg-[#FDEBD0]/50 p-2 rounded-lg border border-[#F2A33A]/30">
                <strong className="text-[#0B1B33]">Privacy Protocol: </strong>
                Messages stay on OneDaySearch. Personal phone numbers and emails are never shared with the abstractor.
              </div>
            </div>

            {/* Message Thread History */}
            <div className="flex-1 space-y-3 overflow-y-auto max-h-[380px] pr-1 mb-4">
              {order.messages.length === 0 ? (
                <div className="py-12 text-center text-xs text-[#4F5F78]">
                  No clarification notes yet. Need to clarify a boundary line or tax parcel? Post below.
                </div>
              ) : (
                order.messages.map((msg) => {
                  const isCustomer = msg.senderRole === 'customer';
                  const isSystem = msg.senderRole === 'system';

                  if (isSystem) {
                    return (
                      <div key={msg.id} className="text-center my-2">
                        <span className="text-[10px] font-mono bg-[#F4F6FA] text-[#4F5F78] px-2.5 py-1 rounded-pill border border-[#E3E8F0]">
                          {msg.content}
                        </span>
                      </div>
                    );
                  }

                  return (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${isCustomer ? 'items-end' : 'items-start'}`}
                    >
                      <div className="text-[10px] font-bold text-[#4F5F78] mb-0.5 px-1">
                        {isCustomer ? 'You (Customer)' : 'County Abstractor'} ·{' '}
                        <span className="font-normal font-mono">{msg.formattedTime || 'Today'}</span>
                      </div>
                      <div
                        className={`p-3 rounded-2xl max-w-[85%] text-xs leading-relaxed ${
                          isCustomer
                            ? 'bg-[#0B1B33] text-white rounded-br-none'
                            : 'bg-[#F4F6FA] text-[#0B1B33] border border-[#E3E8F0] rounded-bl-none'
                        }`}
                      >
                        {msg.content}
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Message Input Box */}
            <form onSubmit={handleSendMessage} className="pt-3 border-t border-[#E3E8F0] mt-auto">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={newMessageText}
                  onChange={(e) => setNewMessageText(e.target.value)}
                  placeholder="Ask abstractor a question about this property..."
                  className="flex-1 text-xs px-3.5 py-2.5 rounded-pill border border-[#E3E8F0] focus:outline-none focus:ring-2 focus:ring-[#F2A33A]"
                />
                <button
                  type="submit"
                  disabled={!newMessageText.trim() || isSendingMessage}
                  className="btn-primary w-9 h-9 rounded-full flex items-center justify-center shrink-0 disabled:opacity-50"
                  title="Send message"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
