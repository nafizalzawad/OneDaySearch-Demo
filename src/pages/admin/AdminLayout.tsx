import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Logo } from '../../components/brand/Logo';
import { useDemo } from '../../context/DemoContext';
import { DemoDock } from '../../components/demo/DemoDock';
import {
  Layers,
  AlertTriangle,
  Users,
  Settings,
  History,
  ExternalLink,
} from 'lucide-react';
import { INITIAL_ALERTS, INITIAL_ORDERS, MOCK_PROVIDERS } from '../../mock/data';

export const AdminLayout: React.FC = () => {
  const { logoDirection } = useDemo();
  const location = useLocation();

  const activeAlertsCount = INITIAL_ALERTS.filter((a) => !a.resolved).length;
  const highRiskOrdersCount = INITIAL_ORDERS.filter((o) => o.lateRisk === 'HIGH').length;

  const navItems = [
    { path: '/admin', label: 'Order Board', icon: Layers },
    { path: '/admin/alerts', label: `Alerts (${activeAlertsCount})`, icon: AlertTriangle, hasAlert: activeAlertsCount > 0 },
    { path: '/admin/providers', label: 'Abstractor Roster', icon: Users },
    { path: '/admin/config', label: 'Marketplace Config', icon: Settings },
    { path: '/admin/audit', label: 'Audit Log', icon: History },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#F4F6FA] text-[#1C2733]">
      <DemoDock />

      {/* Admin Dark Header */}
      <header className="bg-[#1C2733] text-white border-b border-white/10 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/admin" className="flex items-center gap-2">
              <Logo direction={logoDirection} variant="dark" size="sm" />
              <span className="px-2 py-0.5 rounded bg-red-500 text-white text-[10px] font-extrabold uppercase tracking-wider">
                ADMIN
              </span>
            </Link>
          </div>

          <div className="flex items-center gap-4 text-xs">
            {/* Quick Metrics Bar */}
            <div className="hidden md:flex items-center gap-4 pr-4 border-r border-white/15 text-gray-300 font-mono text-[11px]">
              <div>
                Active: <span className="text-white font-bold">{INITIAL_ORDERS.length}</span>
              </div>
              <div>
                Rush (6h): <span className="text-[#F97316] font-bold">1</span>
              </div>
              <div>
                At-Risk: <span className="text-amber-400 font-bold">{highRiskOrdersCount}</span>
              </div>
              <div>
                Providers: <span className="text-white font-bold">{MOCK_PROVIDERS.length}</span>
              </div>
            </div>

            <Link
              to="/"
              className="text-xs text-gray-300 hover:text-white flex items-center gap-1.5"
              title="Return to Customer Site"
            >
              <span>Customer Site</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
          </div>
        </div>

        {/* Tab Subnavigation */}
        <div className="bg-[#111D27] border-t border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center gap-1 overflow-x-auto text-xs py-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                item.path === '/admin'
                  ? location.pathname === '/admin'
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
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#6AE878]' : 'text-gray-400'}`} />
                  <span>{item.label}</span>
                  {item.hasAlert && (
                    <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      </header>

      {/* Main Admin View */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 text-left">
        <Outlet />
      </main>

      <footer className="border-t border-[#E3E8F0] bg-white py-4 text-xs text-[#5A6B7F]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>OneDaySearch Admin Console</span>
          <span className="font-mono text-[11px]">Demo Environment</span>
        </div>
      </footer>
    </div>
  );
};
