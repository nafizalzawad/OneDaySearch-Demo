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

  return (
    <div
      className={`min-h-screen flex flex-col transition-colors duration-200 ${
        isGreenTheme
          ? 'bg-[#6AE878] text-[#1C2733]'
          : isDarkTheme
          ? 'bg-[#111D27] text-white'
          : 'bg-[#F4F6FA] text-[#1C2733]'
      }`}
    >
      {/* Signature Brand Spectrum Ribbon */}
      <div className="h-1.5 w-full bg-gradient-to-r from-[#DBFCC5] via-[#6AE878] to-[#00BC82] shrink-0" />

      {/* SMS Simulator Notification */}
      <SmsBubble />

      {/* Floating Demo Dock */}
      <DemoDock />

      {/* Header */}
      <header
        className={`w-full transition-colors duration-150 sticky top-0 z-40 backdrop-blur-md ${
          isGreenTheme
            ? 'bg-[#6AE878]/90 text-[#1C2733] border-b border-[#1C2733]/15'
            : isDarkTheme
            ? 'bg-[#1C2733]/90 text-white border-b border-white/10'
            : 'bg-white/90 text-[#1C2733] border-b border-[#E3E8F0]'
        }`}
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
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
                  ? 'text-gray-200 hover:text-[#6AE878]'
                  : 'text-[#5A6B7F] hover:text-[#1C2733]'
              }`}
            >
              Track an order
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        <Outlet />
      </main>

      {/* Customer Footer */}
      <footer
        className={`w-full py-8 text-xs transition-colors z-10 relative ${
          isGreenTheme
            ? 'bg-[#1C2733] text-gray-300 border-t border-[#1C2733]'
            : isDarkTheme
            ? 'bg-[#0B151F] text-gray-400 border-t border-white/10'
            : 'bg-white text-[#5A6B7F] border-t border-[#E3E8F0]'
        }`}
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pl-0 sm:pl-28">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-6 gap-y-2">
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
              <Link to="/brand" className="text-[#6AE878] hover:underline font-bold transition-colors">
                Brand specs
              </Link>
            </div>
            <div className="text-[11px] text-gray-400 text-center sm:text-right">
              © {new Date().getFullYear()} OneDaySearch LLC. Title search marketplace.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
