import React from 'react';
import { useDemo, LogoDirection, ThemeMode, SurfaceMode } from '../../context/DemoContext';
import { OrderStatus } from '../../mock/types';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Sliders,
  X,
  ChevronUp,
  ChevronDown,
  Layers,
  Clock,
  Palette,
  MessageSquare,
  Compass,
  Zap,
  Moon,
  ExternalLink,
} from 'lucide-react';

export const DemoDock: React.FC = () => {
  const {
    logoDirection,
    setLogoDirection,
    theme,
    setTheme,
    allow12h,
    setAllow12h,
    allow6h,
    setAllow6h,
    isAfterHours,
    setIsAfterHours,
    currentStage,
    setCurrentStage,
    showSmsPreview,
    setShowSmsPreview,
    isDemoDockVisible,
    setIsDemoDockVisible,
    isDemoDockOpen,
    setIsDemoDockOpen,
    activeOrderToken,
  } = useDemo();

  const navigate = useNavigate();
  const location = useLocation();

  if (!isDemoDockVisible) {
    return (
      <button
        onClick={() => setIsDemoDockVisible(true)}
        className="fixed bottom-3 left-3 z-50 px-2.5 py-1 text-xs font-mono font-medium bg-[#0B1B33]/80 hover:bg-[#0B1B33] text-white rounded-pill shadow-lg backdrop-blur border border-white/20 transition-all opacity-40 hover:opacity-100 flex items-center gap-1.5"
        title="Demo dock hidden (Press 'D' or click to restore)"
      >
        <Sliders className="w-3 h-3 text-[#F2A33A]" />
        <span>Demo</span>
      </button>
    );
  }

  const stages: { label: string; value: OrderStatus }[] = [
    { label: 'Matching', value: 'MATCHING' },
    { label: 'Assigned', value: 'ASSIGNED' },
    { label: 'In Progress', value: 'IN_PROGRESS' },
    { label: 'Ready (S7)', value: 'READY' },
    { label: 'Questions (S8)', value: 'QUESTIONS' },
    { label: 'Closed', value: 'CLOSED' },
  ];

  const handleStageSelect = (stage: OrderStatus) => {
    setCurrentStage(stage);
    // If we're not currently on the order page, navigate there
    if (!location.pathname.startsWith('/order/')) {
      navigate(`/order/${activeOrderToken}`);
    }
  };

  const handleSurfaceSwitch = (surface: SurfaceMode) => {
    if (surface === 'customer') {
      navigate('/');
    } else if (surface === 'provider') {
      navigate('/provider');
    } else if (surface === 'admin') {
      navigate('/admin');
    }
  };

  const isCustomer = !location.pathname.startsWith('/provider') && !location.pathname.startsWith('/admin');
  const isProvider = location.pathname.startsWith('/provider');
  const isAdmin = location.pathname.startsWith('/admin');

  return (
    <div className="fixed bottom-4 left-4 z-50 font-sans text-xs">
      {!isDemoDockOpen ? (
        <div className="flex items-center gap-1 bg-[#0B1B33] text-white px-3 py-2 rounded-pill shadow-elevated border border-white/15">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setIsDemoDockOpen(true)}>
            <span className="w-2 h-2 rounded-full bg-[#F2A33A] animate-pulse" />
            <span className="font-semibold text-white">Demo Controls</span>
            <span className="text-[10px] text-gray-400 bg-white/10 px-1.5 py-0.5 rounded">Press D</span>
          </div>
          <button
            onClick={() => setIsDemoDockOpen(true)}
            className="p-1 hover:text-[#F2A33A] transition-colors ml-1"
            title="Expand Controls"
          >
            <ChevronUp className="w-4 h-4" />
          </button>
          <button
            onClick={() => setIsDemoDockVisible(false)}
            className="p-1 hover:text-red-400 transition-colors"
            title="Hide (press D to restore)"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ) : (
        <div className="bg-[#0B1B33] text-white p-4 rounded-card shadow-elevated border border-white/15 w-[340px] max-w-[92vw] max-h-[82vh] overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-3">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#F2A33A]" />
              <span className="font-bold text-sm tracking-tight text-white">Demo Control Panel</span>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setIsDemoDockOpen(false)}
                className="p-1 text-gray-400 hover:text-white rounded"
                title="Minimize"
              >
                <ChevronDown className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsDemoDockVisible(false)}
                className="p-1 text-gray-400 hover:text-white rounded"
                title="Hide completely (press D to reopen)"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {/* 1. Surface Switcher */}
            <div>
              <div className="text-[11px] font-semibold text-gray-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <Compass className="w-3 h-3 text-[#F2A33A]" /> Surface Mode
              </div>
              <div className="grid grid-cols-3 gap-1 bg-white/5 p-1 rounded-lg border border-white/10">
                <button
                  onClick={() => handleSurfaceSwitch('customer')}
                  className={`py-1.5 px-2 rounded font-medium text-center transition-all ${
                    isCustomer ? 'bg-[#F2A33A] text-[#0B1B33] font-bold shadow-sm' : 'text-gray-300 hover:bg-white/10'
                  }`}
                >
                  Customer
                </button>
                <button
                  onClick={() => handleSurfaceSwitch('provider')}
                  className={`py-1.5 px-2 rounded font-medium text-center transition-all ${
                    isProvider ? 'bg-[#F2A33A] text-[#0B1B33] font-bold shadow-sm' : 'text-gray-300 hover:bg-white/10'
                  }`}
                >
                  Provider
                </button>
                <button
                  onClick={() => handleSurfaceSwitch('admin')}
                  className={`py-1.5 px-2 rounded font-medium text-center transition-all ${
                    isAdmin ? 'bg-[#F2A33A] text-[#0B1B33] font-bold shadow-sm' : 'text-gray-300 hover:bg-white/10'
                  }`}
                >
                  Admin
                </button>
              </div>
            </div>

            {/* 2. Logo Direction */}
            <div>
              <div className="text-[11px] font-semibold text-gray-300 uppercase tracking-wider mb-1.5 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Layers className="w-3 h-3 text-[#F2A33A]" /> Logo Direction
                </span>
                <button
                  onClick={() => navigate('/brand')}
                  className="text-[10px] text-[#F2A33A] hover:underline flex items-center gap-0.5"
                >
                  Brand Specs <ExternalLink className="w-2.5 h-2.5" />
                </button>
              </div>
              <div className="grid grid-cols-3 gap-1.5">
                {[
                  { id: 'a' as const, label: 'Dir A (Roof/Clock)' },
                  { id: 'b' as const, label: 'Dir B (Magnifier)' },
                  { id: 'c' as const, label: 'Dir C (Bold 1)' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setLogoDirection(item.id)}
                    className={`p-2 rounded-lg border text-center transition-all ${
                      logoDirection === item.id
                        ? 'border-[#F2A33A] bg-[#F2A33A]/20 text-white font-bold'
                        : 'border-white/10 hover:border-white/20 text-gray-300 bg-white/5'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Theme Switcher */}
            <div>
              <div className="text-[11px] font-semibold text-gray-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <Palette className="w-3 h-3 text-[#F2A33A]" /> Theme Preset
              </div>
              <div className="grid grid-cols-2 gap-1.5">
                <button
                  onClick={() => setTheme('clean-light')}
                  className={`p-2 rounded-lg border text-center transition-all ${
                    theme === 'clean-light'
                      ? 'border-[#F2A33A] bg-[#F2A33A]/20 text-white font-bold'
                      : 'border-white/10 text-gray-300 bg-white/5 hover:border-white/20'
                  }`}
                >
                  Clean Light (Default)
                </button>
                <button
                  onClick={() => setTheme('navy-brand')}
                  className={`p-2 rounded-lg border text-center transition-all ${
                    theme === 'navy-brand'
                      ? 'border-[#F2A33A] bg-[#F2A33A]/20 text-white font-bold'
                      : 'border-white/10 text-gray-300 bg-white/5 hover:border-white/20'
                  }`}
                >
                  Navy Brand Shell
                </button>
              </div>
            </div>

            {/* 4. Speed Availability Toggles */}
            <div>
              <div className="text-[11px] font-semibold text-gray-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <Zap className="w-3 h-3 text-[#F2A33A]" /> Speed Availability
              </div>
              <div className="space-y-1.5 bg-white/5 p-2 rounded-lg border border-white/10">
                <label className="flex items-center justify-between cursor-pointer py-0.5">
                  <span className="text-gray-200">12h Express Available ($249)</span>
                  <input
                    type="checkbox"
                    checked={allow12h}
                    onChange={(e) => setAllow12h(e.target.checked)}
                    className="accent-[#F2A33A] w-4 h-4 cursor-pointer"
                  />
                </label>
                <label className="flex items-center justify-between cursor-pointer py-0.5">
                  <span className="text-gray-200">6h Same-Day Rush Available ($299)</span>
                  <input
                    type="checkbox"
                    checked={allow6h}
                    onChange={(e) => setAllow6h(e.target.checked)}
                    className="accent-[#F2A33A] w-4 h-4 cursor-pointer"
                  />
                </label>
                <label className="flex items-center justify-between cursor-pointer py-0.5 border-t border-white/10 pt-1.5">
                  <span className="text-gray-200 flex items-center gap-1">
                    <Moon className="w-3 h-3 text-amber-300" /> After-Hours (Starts 9am ET)
                  </span>
                  <input
                    type="checkbox"
                    checked={isAfterHours}
                    onChange={(e) => setIsAfterHours(e.target.checked)}
                    className="accent-[#F2A33A] w-4 h-4 cursor-pointer"
                  />
                </label>
              </div>
            </div>

            {/* 5. Order Stage Quick-Jumper */}
            <div>
              <div className="text-[11px] font-semibold text-gray-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <Clock className="w-3 h-3 text-[#F2A33A]" /> Order Stage Jumper (S6-S8)
              </div>
              <div className="grid grid-cols-3 gap-1">
                {stages.map((st) => (
                  <button
                    key={st.value}
                    onClick={() => handleStageSelect(st.value)}
                    className={`py-1 px-1.5 rounded text-[11px] font-medium transition-all ${
                      currentStage === st.value
                        ? 'bg-[#F2A33A] text-[#0B1B33] font-bold'
                        : 'bg-white/5 text-gray-300 hover:bg-white/15'
                    }`}
                  >
                    {st.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 6. SMS Simulator */}
            <div>
              <label className="flex items-center justify-between cursor-pointer bg-white/5 p-2 rounded-lg border border-white/10">
                <span className="flex items-center gap-1.5 text-gray-200 font-medium">
                  <MessageSquare className="w-3.5 h-3.5 text-[#F2A33A]" />
                  Simulate SMS Notification
                </span>
                <input
                  type="checkbox"
                  checked={showSmsPreview}
                  onChange={(e) => setShowSmsPreview(e.target.checked)}
                  className="accent-[#F2A33A] w-4 h-4 cursor-pointer"
                />
              </label>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
