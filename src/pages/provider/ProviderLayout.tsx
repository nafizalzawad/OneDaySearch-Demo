import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Logo } from '../../components/brand/Logo';
import { useDemo } from '../../context/DemoContext';
import { DemoDock } from '../../components/demo/DemoDock';
import {
  LayoutDashboard,
  FileSpreadsheet,
  MessageSquare,
  DollarSign,
  ShieldCheck,
  ExternalLink,
} from 'lucide-react';

export const ProviderLayout: React.FC = () => {
  const { logoDirection } = useDemo();
  const location = useLocation();
  const [isOnline, setIsOnline] = useState<boolean>(true);

  const navItems = [
    { path: '/provider', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/provider/orders/OD-48213', label: 'Workbench', icon: FileSpreadsheet },
    { path: '/provider/questions', label: 'Questions', icon: MessageSquare },
    { path: '/provider/earnings', label: 'Earnings', icon: DollarSign },
    { path: '/provider/onboarding', label: 'E&O Credentials', icon: ShieldCheck },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#F4F6FA] text-[#1C2733]">
      <DemoDock />

      {/* Provider Header Bar */}
      <header className="bg-[#1C2733] text-white border-b border-white/10 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/provider" className="flex items-center gap-2">
              <Logo direction={logoDirection} variant="dark" size="sm" />
              <span className="px-2 py-0.5 rounded bg-[#1E535E] text-white text-[10px] font-extrabold uppercase tracking-wider">
                PROVIDER
              </span>
            </Link>
          </div>

          {/* Right controls: Online switch & Abstractor Info */}
          <div className="flex items-center gap-4">
            {/* Online/Offline Toggle */}
            <button
              onClick={() => setIsOnline(!isOnline)}
              className={`px-3 py-1.5 rounded-pill text-xs font-bold flex items-center gap-2 border transition-all ${
                isOnline
                  ? 'bg-[#1E535E]/40 border-[#1E535E] text-[#68AAB7]'
                  : 'bg-white/5 border-white/20 text-gray-400'
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  isOnline ? 'bg-[#68AAB7] animate-pulse' : 'bg-gray-400'
                }`}
              />
              <span>{isOnline ? 'Online (Accepting)' : 'Offline (Paused)'}</span>
            </button>

            {/* Abstractor Avatar */}
            <div className="hidden sm:flex items-center gap-2 pl-3 border-l border-white/15 text-left text-xs">
              <div className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center font-bold text-[#68AAB7] text-xs">
                MV
              </div>
              <div>
                <div className="font-bold text-white leading-tight">Marcus Vance</div>
                <div className="text-[10px] text-gray-400">MD &amp; DC Certified Abstractor</div>
              </div>
            </div>

            <Link
              to="/"
              className="text-xs text-gray-400 hover:text-white flex items-center gap-1 pl-2 border-l border-white/15"
              title="Return to Customer Site"
            >
              <span>Customer Site</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
          </div>
        </div>

        {/* Secondary Subnav */}
        <div className="bg-[#111D27] border-t border-white/5">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center gap-1 overflow-x-auto text-xs py-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                item.path === '/provider'
                  ? location.pathname === '/provider'
                  : location.pathname.startsWith(item.path);

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-3 py-2 rounded-lg font-medium flex items-center gap-2 whitespace-nowrap transition-colors ${
                    isActive
                      ? 'bg-white/15 text-white font-bold'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#68AAB7]' : 'text-gray-400'}`} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6 text-left">
        <Outlet />
      </main>

      <footer className="border-t border-[#E3E8F0] bg-white py-4 text-xs text-[#5A6B7F]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>OneDaySearch Provider Portal · Maryland, Virginia &amp; DC</span>
          <span className="font-mono text-[11px]">E&amp;O Verified on file</span>
        </div>
      </footer>
    </div>
  );
};
