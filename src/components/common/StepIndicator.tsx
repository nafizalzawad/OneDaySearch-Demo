import React from 'react';
import { Check } from 'lucide-react';

interface StepIndicatorProps {
  currentStep: 1 | 2 | 3 | 4;
}

export const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep }) => {
  const steps = [
    { number: 1, label: 'Address' },
    { number: 2, label: 'Details' },
    { number: 3, label: 'Speed' },
    { number: 4, label: 'Pay' },
  ];

  return (
    <div className="w-full max-w-md mx-auto mb-8 px-2">
      <div className="flex items-center justify-between relative">
        {/* Track Line behind steps */}
        <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 h-0.5 bg-[#E3E8F0] -z-0" />
        <div
          className="absolute top-1/2 left-0 -translate-y-1/2 h-0.5 bg-[#00BC82] -z-0 transition-all duration-300"
          style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
        />

        {steps.map((s) => {
          const isCompleted = s.number < currentStep;
          const isCurrent = s.number === currentStep;

          return (
            <div key={s.number} className="flex flex-col items-center relative z-10">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                  isCompleted
                    ? 'bg-[#1C2733] text-white'
                    : isCurrent
                    ? 'bg-[#00BC82] text-white ring-4 ring-[#DBFCC5]'
                    : 'bg-white border-2 border-[#E3E8F0] text-[#5A6B7F]'
                }`}
              >
                {isCompleted ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : s.number}
              </div>
              <span
                className={`text-[11px] font-semibold mt-1.5 transition-colors ${
                  isCurrent ? 'text-[#1C2733]' : 'text-[#5A6B7F]'
                }`}
              >
                {s.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
