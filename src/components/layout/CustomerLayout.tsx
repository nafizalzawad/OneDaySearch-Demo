import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Logo } from '../brand/Logo';
import { useDemo } from '../../context/DemoContext';
import { DemoDock } from '../demo/DemoDock';
import { SmsBubble } from '../demo/SmsBubble';

export const CustomerLayout: React.FC = () => {
  const { theme, logoDirection } = useDemo();
  const location = useLocation();

  const isGreenTheme = theme === 'vibrant-green';
  const isDarkTheme = theme === 'dark-brand';
  const isHomePage = location.pathname === '/';

  return (
    <div
      className={`transition-colors duration-200 ${
        isHomePage
          ? 'h-screen max-h-screen flex flex-col justify-between overflow-x-hidden overflow-y-auto lg:overflow-hidden'
          : 'min-h-screen flex flex-col'
      } ${
        isGreenTheme
          ? 'bg-[#6BAEB9] text-[#1C2733]'
          : isDarkTheme
          ? 'bg-[#0D2429] text-white'
          : 'bg-[#F4F8F9] text-[#1C2733]'
      }`}
    >
      {/* Signature Architectural Colonnade Ribbon */}
      <div className="h-1.5 w-full bg-gradient-to-r from-[#E8F3F5] via-[#84C2CC] to-[#1E535E] shrink-0" />

      {/* SMS Simulator Notification */}
      <SmsBubble />

      {/* Floating Demo Dock */}
      <DemoDock />

      {/* Header */}
      <header
        className={`w-full transition-colors duration-150 sticky top-0 z-40 backdrop-blur-md shrink-0 ${
          isGreenTheme
            ? 'bg-[#6BAEB9]/95 text-[#1C2733] border-b border-[#1E535E]/15 shadow-sm'
            : isDarkTheme
            ? 'bg-[#14343B]/95 text-white border-b border-white/10'
            : 'bg-white/95 text-[#1C2733] border-b border-[#D1E2E5]'
        }`}
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between">
          <Link to="/" className="focus:outline-none">
            <Logo
              direction={logoDirection}
              variant={isDarkTheme ? 'dark' : 'light'}
              size="md"
            />
          </Link>

          <div className="flex items-center gap-4">
            <Link
              to="/track"
              className={`text-sm font-bold transition-colors ${
                isGreenTheme
                  ? 'text-[#1C2733] hover:text-black hover:underline'
                  : isDarkTheme
                  ? 'text-gray-200 hover:text-[#84C2CC]'
                  : 'text-[#5A6B7F] hover:text-[#1C2733]'
              }`}
            >
              Track an order
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-0">
        <Outlet />
      </main>

      {/* Customer Footer */}
      <footer
        className={`w-full text-xs transition-colors z-10 relative shrink-0 ${
          isHomePage ? 'py-3 sm:py-4' : 'py-8'
        } ${
          isGreenTheme
            ? 'bg-[#1C2733] text-gray-300 border-t border-[#1C2733]'
            : isDarkTheme
            ? 'bg-[#0B151F] text-gray-400 border-t border-white/10'
            : 'bg-white text-[#5A6B7F] border-t border-[#D1E2E5]'
        }`}
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2.5 sm:gap-4 pl-0 sm:pl-28">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-5 gap-y-1.5 text-[11px] sm:text-xs">
              <Link to="/how-it-works" className="hover:text-white transition-colors">
                How it works
              </Link>
              <Link to="/pricing" className="hover:text-white transition-colors">
                Pricing
              </Link>
              <Link to="/coverage" className="hover:text-white transition-colors">
                Coverage (MD · VA · DC)
              </Link>
              <Link to="/not-title-insurance" className="hover:text-white transition-colors">
                Not title insurance
              </Link>
              <Link to="/legal" className="hover:text-white transition-colors">
                Terms &amp; Privacy
              </Link>
              <Link to="/support" className="hover:text-white transition-colors">
                Support
              </Link>
              <Link to="/brand" className="text-[#84C2CC] hover:underline font-bold transition-colors">
                Brand specs
              </Link>
            </div>
            <div className="text-[10px] sm:text-[11px] text-gray-400 text-center sm:text-right">
              © {new Date().getFullYear()} OneDaySearch LLC. Title search marketplace.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
