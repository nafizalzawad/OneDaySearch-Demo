import React from 'react';
import { useDemo } from '../../context/DemoContext';
import { MessageSquare, X } from 'lucide-react';
import { LogoIcon } from '../brand/Logo';

export const SmsBubble: React.FC = () => {
  const { showSmsPreview, setShowSmsPreview, currentStage, getSmsTextForStage, logoDirection } = useDemo();

  if (!showSmsPreview) return null;

  const smsText = getSmsTextForStage(currentStage);

  return (
    <div className="fixed top-4 right-4 z-50 max-w-sm w-[92vw] animate-in slide-in-from-top-4 duration-200">
      <div className="bg-[#1C2733]/95 backdrop-blur-md text-white p-3.5 rounded-2xl shadow-elevated border border-white/20 text-xs">
        <div className="flex items-center justify-between mb-1.5">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center p-0.5">
              <LogoIcon direction={logoDirection} size={14} />
            </div>
            <span className="font-semibold text-white tracking-tight">OneDaySearch SMS Dispatch</span>
            <span className="text-[10px] text-gray-400">now</span>
          </div>
          <button
            onClick={() => setShowSmsPreview(false)}
            className="text-gray-400 hover:text-white p-0.5"
            title="Dismiss notification"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
        <p className="text-gray-200 font-mono text-[11px] leading-relaxed bg-white/5 p-2 rounded-lg border border-white/5">
          {smsText}
        </p>
      </div>
    </div>
  );
};
