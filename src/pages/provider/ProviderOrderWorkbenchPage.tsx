import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  FileText,
  Upload,
  CheckCircle2,
  Clock,
  MapPin,
  AlertCircle,
  ShieldCheck,
  ArrowLeft,
  Send,
} from 'lucide-react';
import { INITIAL_ORDERS } from '../../mock/data';
import { mockMarketplace } from '../../mock/service';
import { useDemo } from '../../context/DemoContext';

export const ProviderOrderWorkbenchPage: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const { setCurrentStage } = useDemo();

  const order = INITIAL_ORDERS.find((o) => o.id === (orderId || 'OD-48213')) || INITIAL_ORDERS[0];

  const [notes, setNotes] = useState<string>(
    'Deed chain verified from 1986. Pepco utility right-of-way easement confirmed in Liber 18420 Folio 312.'
  );
  const [uploadedFile, setUploadedFile] = useState<string | null>('Title_Abstract_OD-48213_Montgomery_MD.pdf');
  const [isDelivering, setIsDelivering] = useState<boolean>(false);
  const [isDelivered, setIsDelivered] = useState<boolean>(order.status === 'READY');

  const handleDeliver = async () => {
    setIsDelivering(true);
    await mockMarketplace.deliverReport(order.id);
    setCurrentStage('READY');
    setIsDelivering(false);
    setIsDelivered(true);
  };

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#E3E8F0]">
        <div>
          <Link
            to="/provider"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#5A6B7F] hover:text-[#1C2733] mb-2 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to queue
          </Link>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[#5A6B7F] uppercase">Abstractor Workbench</span>
            <span className="text-xs font-mono font-bold bg-[#1C2733] text-white px-2 py-0.5 rounded">
              {order.id}
            </span>
            <span className="text-xs font-mono font-bold text-[#00BC82] bg-[#00BC82]/10 px-2 py-0.5 rounded">
              Payout: ${order.providerPayout}.00
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-[#1C2733] mt-1">
            {order.property.address}
          </h1>
        </div>

        {/* Internal SLA Timer */}
        <div className="bg-[#F8FAFC] border border-[#E3E8F0] p-3 rounded-xl sm:text-right">
          <span className="text-[10px] font-bold uppercase text-[#5A6B7F] block">
            Internal Delivery Deadline
          </span>
          <div className="font-mono text-base font-bold text-[#1C2733]">
            {new Intl.DateTimeFormat('en-US', {
              weekday: 'short',
              hour: 'numeric',
              minute: '2-digit',
              timeZone: 'America/New_York',
            }).format(new Date(order.internalDueTime))} ET
          </div>
          <span className="text-[10px] text-[#00BC82] font-semibold">
            2.5h safety buffer before customer SLA
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Property Scope & Courthouse Information */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white p-6 rounded-card border border-[#E3E8F0] shadow-soft space-y-4">
            <h2 className="text-sm font-extrabold uppercase tracking-wider text-[#1C2733] pb-3 border-b border-[#E3E8F0]">
              Search Scope &amp; Legal Parcel Details
            </h2>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-[#5A6B7F] block text-[11px]">Jurisdiction</span>
                <span className="font-bold text-[#1C2733]">{order.property.county}, {order.property.state}</span>
              </div>
              <div>
                <span className="text-[#5A6B7F] block text-[11px]">Tax Assessment ID</span>
                <span className="font-mono font-bold text-[#1C2733]">{order.property.parcelId || 'Tax Map 07-019-00281'}</span>
              </div>
              <div>
                <span className="text-[#5A6B7F] block text-[11px]">Property Class</span>
                <span className="font-bold text-[#1C2733] capitalize">{order.property.propertyType.replace('_', ' ')}</span>
              </div>
              <div>
                <span className="text-[#5A6B7F] block text-[11px]">Ordering Customer Role</span>
                <span className="font-bold text-[#1C2733] capitalize bg-[#F4F6FA] px-2 py-0.5 rounded border border-[#E3E8F0] inline-block">
                  {order.customer.role.replace('_', ' ')}
                </span>
              </div>
            </div>

            {/* HARD SEPARATION BANNER */}
            <div className="p-3 bg-[#F4F6FA] rounded-lg border border-[#E3E8F0] text-xs text-[#5A6B7F] flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-[#00BC82] shrink-0 mt-0.5" />
              <span>
                <strong>Marketplace Separation: </strong>
                Customer name, phone number, and email are shielded. Questions and delivery are handled exclusively via the platform.
              </span>
            </div>

            {/* Courthouse Record Checkpoints */}
            <div className="pt-2">
              <span className="text-xs font-bold text-[#1C2733] block mb-2">
                Mandatory Search Checkpoints:
              </span>
              <div className="space-y-2 text-xs text-[#1C2733]">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" defaultChecked className="accent-[#00BC82] w-4 h-4 rounded" />
                  <span>40-Year chain of title deeds examination (Liber / Folio verified)</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" defaultChecked className="accent-[#00BC82] w-4 h-4 rounded" />
                  <span>Circuit Court open mortgage &amp; deed of trust releases checked</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" defaultChecked className="accent-[#00BC82] w-4 h-4 rounded" />
                  <span>County property tax &amp; municipal utility lien assessment dockets</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" defaultChecked className="accent-[#00BC82] w-4 h-4 rounded" />
                  <span>Recorded covenants, subdivision easements &amp; right-of-ways</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Right: PDF Upload Dropzone & Delivery */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-6 rounded-card border border-[#E3E8F0] shadow-soft space-y-4">
            <h2 className="text-sm font-extrabold uppercase tracking-wider text-[#1C2733] pb-3 border-b border-[#E3E8F0]">
              Deliver Certified Search Package
            </h2>

            {/* PDF Upload Dropzone */}
            <div className="border-2 border-dashed border-[#CBD5E1] rounded-xl p-6 text-center hover:bg-[#F8FAFC] transition-colors cursor-pointer">
              <Upload className="w-8 h-8 text-[#5A6B7F] mx-auto mb-2" />
              <div className="text-xs font-bold text-[#1C2733]">
                {uploadedFile ? uploadedFile : 'Drag and drop completed abstract PDF'}
              </div>
              <p className="text-[11px] text-[#5A6B7F] mt-1">
                {uploadedFile ? '14 pages · 1.8 MB · Ready for delivery' : 'Upload stamped courthouse package (PDF up to 25 MB)'}
              </p>
              {!uploadedFile && (
                <button
                  type="button"
                  onClick={() => setUploadedFile('Title_Abstract_OD-48213_Montgomery_MD.pdf')}
                  className="btn-secondary px-3 py-1.5 text-xs font-bold mt-3"
                >
                  Browse Files
                </button>
              )}
            </div>

            {/* Abstractor Notes */}
            <div>
              <label className="block text-xs font-bold text-[#1C2733] mb-1">
                Abstractor Certification Notes (Visible in Report)
              </label>
              <textarea
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full text-xs p-3 rounded-lg border border-[#E3E8F0] focus:outline-none focus:ring-2 focus:ring-[#00BC82]"
              />
            </div>

            {/* Deliver Action */}
            <div className="pt-2">
              {isDelivered ? (
                <div className="p-3 bg-[#00BC82]/10 border border-[#00BC82]/30 rounded-xl flex items-center gap-2 text-xs font-bold text-[#00BC82]">
                  <CheckCircle2 className="w-5 h-5 shrink-0" />
                  <span>Delivered to Customer. Payout of ${order.providerPayout}.00 queued.</span>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={handleDeliver}
                  disabled={isDelivering}
                  className="btn-primary w-full py-3.5 text-xs font-extrabold shadow-soft"
                >
                  {isDelivering ? 'Delivering Report...' : 'Mark Delivered & Authorize Payout'}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
