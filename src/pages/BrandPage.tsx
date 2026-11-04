import React from 'react';
import { Logo, LogoIcon } from '../components/brand/Logo';
import { useDemo, LogoDirection } from '../context/DemoContext';
import { Link } from 'react-router-dom';
import { ArrowLeft, Check, Download, ShieldCheck, Eye, Sparkles } from 'lucide-react';

export const BrandPage: React.FC = () => {
  const { logoDirection, setLogoDirection } = useDemo();

  const directions: {
    id: LogoDirection;
    name: string;
    subtitle: string;
    rationale: string;
    keywords: string[];
  }[] = [
    {
      id: 'a',
      name: 'Direction A: Clock Under Roofline',
      subtitle: 'Client Preferred Direction · Default in System',
      rationale:
        'Combines a gable roof silhouette with a 24-hour clock face. Immediately signals both property ownership and rapid turnaround without relying on generic generic icons.',
      keywords: ['24-Hour SLA', 'Property Gable', 'Precision & Punctuality'],
    },
    {
      id: 'b',
      name: 'Direction B: Magnifier With House',
      subtitle: 'Search & Title Examination Direction',
      rationale:
        'Embeds a clean architectural home within an amber precision lens. Focuses on rigorous land records examination and thorough search integrity.',
      keywords: ['Chain of Title', 'Deep Investigation', 'Clear Boundary'],
    },
    {
      id: 'c',
      name: 'Direction C: Bold "1" With Roof Slope',
      subtitle: 'Speed & Authority Direction',
      rationale:
        'A bold, confident numeral "1" enclosed in a squircle container, where the flag extends into a 35-degree roofline pitch. Highly memorable, app-store optimized.',
      keywords: ['One Day', 'Number One Marketplace', 'Modern Monogram'],
    },
  ];

  return (
    <div className="min-h-screen bg-[#F4F6FA] text-[#0B1B33] pb-24">
      {/* Top Bar */}
      <header className="bg-white border-b border-[#E3E8F0] sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2 text-sm font-semibold text-[#0B1B33] hover:text-[#F2A33A] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
          <div className="flex items-center gap-3">
            <span className="text-xs text-[#4F5F78] hidden sm:inline">Active Logo Direction:</span>
            <div className="flex items-center bg-[#F4F6FA] p-1 rounded-pill border border-[#E3E8F0]">
              {(['a', 'b', 'c'] as LogoDirection[]).map((d) => (
                <button
                  key={d}
                  onClick={() => setLogoDirection(d)}
                  className={`px-3 py-1 rounded-pill text-xs font-semibold uppercase transition-all ${
                    logoDirection === d
                      ? 'bg-[#F2A33A] text-[#0B1B33] shadow-sm'
                      : 'text-[#4F5F78] hover:text-[#0B1B33]'
                  }`}
                >
                  Dir {d.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Header */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-10 pb-8">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-pill bg-[#FDEBD0] text-[#0B1B33] text-xs font-bold mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#e09228]" />
            Brand System & Visual Identity
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0B1B33] mb-3">
            OneDaySearch Brand Identity Specifications
          </h1>
          <p className="text-base sm:text-lg text-[#4F5F78] leading-relaxed">
            Crafted for absolute clarity, trustworthiness, and high-contrast legibility. Designed with three clean,
            geometric, hand-built vector directions, strict WCAG AAA contrast rules, and a restrained color palette.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
        {/* SECTION 1: THREE DIRECTIONS SHOWCASE */}
        <section className="space-y-8">
          <div className="border-b border-[#E3E8F0] pb-3">
            <h2 className="text-xl font-bold tracking-tight text-[#0B1B33]">
              1. The Three Logo Directions
            </h2>
            <p className="text-xs sm:text-sm text-[#4F5F78]">
              Each direction is mathematically drawn on a 32x32 grid with minimum 2.5px stroke weight to ensure 16px favicon legibility.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8">
            {directions.map((dir) => {
              const isSelected = logoDirection === dir.id;
              return (
                <div
                  key={dir.id}
                  className={`bg-white rounded-card border transition-all ${
                    isSelected
                      ? 'border-[#F2A33A] shadow-elevated ring-1 ring-[#F2A33A]'
                      : 'border-[#E3E8F0] shadow-soft'
                  } p-6 sm:p-8`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-[#E3E8F0]">
                    <div>
                      <div className="flex items-center gap-2.5">
                        <h3 className="text-xl font-extrabold text-[#0B1B33]">{dir.name}</h3>
                        {isSelected && (
                          <span className="px-2.5 py-0.5 rounded-pill bg-[#F2A33A] text-[#0B1B33] text-xs font-bold">
                            Active in Demo
                          </span>
                        )}
                      </div>
                      <p className="text-xs font-medium text-[#4F5F78] mt-0.5">{dir.subtitle}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setLogoDirection(dir.id)}
                        className={`px-4 py-2 rounded-pill text-xs font-bold transition-all ${
                          isSelected
                            ? 'bg-[#0B1B33] text-white'
                            : 'bg-[#F4F6FA] text-[#0B1B33] hover:bg-[#E3E8F0]'
                        }`}
                      >
                        {isSelected ? 'Selected' : 'Set as Active'}
                      </button>
                      <a
                        href={`/brand/logo-${dir.id}-horizontal.svg`}
                        download
                        className="px-3 py-2 rounded-pill bg-white border border-[#E3E8F0] hover:bg-[#F4F6FA] text-xs font-semibold text-[#0B1B33] inline-flex items-center gap-1.5"
                        title="Download SVG Lockup"
                      >
                        <Download className="w-3.5 h-3.5" /> SVG
                      </a>
                    </div>
                  </div>

                  <p className="text-sm text-[#4F5F78] mb-6 max-w-3xl leading-relaxed">
                    {dir.rationale}
                  </p>

                  {/* Visual Test Matrix: Light vs Dark vs Sizes */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Light Background Lockup */}
                    <div className="bg-[#F8FAFC] border border-[#E3E8F0] p-6 rounded-card flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-xs font-bold text-[#0B1B33] uppercase tracking-wider">
                            Light Background (Primary)
                          </span>
                          <span className="text-[11px] font-mono text-[#4F5F78] bg-white px-2 py-0.5 rounded border border-[#E3E8F0]">
                            Navy Wordmark #0B1B33
                          </span>
                        </div>
                        <div className="py-8 flex items-center justify-center bg-white rounded-lg border border-[#E3E8F0]">
                          <Logo direction={dir.id} variant="light" size="lg" />
                        </div>
                      </div>
                      <p className="text-[11px] text-[#4F5F78] mt-3">
                        Rule: On light surfaces, wordmark is 100% Navy to avoid amber contrast failure.
                      </p>
                    </div>

                    {/* Dark Background Lockup */}
                    <div className="bg-[#0B1B33] p-6 rounded-card flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-xs font-bold text-white uppercase tracking-wider">
                            Dark Navy Shell (Theme 2)
                          </span>
                          <span className="text-[11px] font-mono text-gray-300 bg-white/10 px-2 py-0.5 rounded">
                            White + Amber Split
                          </span>
                        </div>
                        <div className="py-8 flex items-center justify-center bg-[#071324] rounded-lg border border-white/10">
                          <Logo direction={dir.id} variant="dark" size="lg" />
                        </div>
                      </div>
                      <p className="text-[11px] text-gray-400 mt-3">
                        Rule: "OneDay" in pure white, "Search" in high-visibility amber #F2A33A.
                      </p>
                    </div>
                  </div>

                  {/* Sizing & Monochrome Row */}
                  <div className="mt-6 pt-6 border-t border-[#E3E8F0] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* Size scaling */}
                    <div className="bg-[#F4F6FA] p-4 rounded-lg border border-[#E3E8F0]">
                      <span className="text-[11px] font-bold text-[#0B1B33] block mb-3">
                        Size Scaling (16, 24, 32, 48px)
                      </span>
                      <div className="flex items-end gap-3 py-2">
                        <div className="text-center">
                          <div className="w-4 h-4 border border-dashed border-[#4F5F78] flex items-center justify-center mx-auto mb-1">
                            <LogoIcon direction={dir.id} size={16} />
                          </div>
                          <span className="text-[10px] font-mono text-[#4F5F78]">16px</span>
                        </div>
                        <div className="text-center">
                          <div className="w-6 h-6 border border-dashed border-[#4F5F78] flex items-center justify-center mx-auto mb-1">
                            <LogoIcon direction={dir.id} size={24} />
                          </div>
                          <span className="text-[10px] font-mono text-[#4F5F78]">24px</span>
                        </div>
                        <div className="text-center">
                          <div className="w-8 h-8 border border-dashed border-[#4F5F78] flex items-center justify-center mx-auto mb-1">
                            <LogoIcon direction={dir.id} size={32} />
                          </div>
                          <span className="text-[10px] font-mono text-[#4F5F78]">32px</span>
                        </div>
                        <div className="text-center">
                          <div className="w-12 h-12 border border-dashed border-[#4F5F78] flex items-center justify-center mx-auto mb-1">
                            <LogoIcon direction={dir.id} size={48} />
                          </div>
                          <span className="text-[10px] font-mono text-[#4F5F78]">48px</span>
                        </div>
                      </div>
                    </div>

                    {/* App Icon Mockup */}
                    <div className="bg-[#F4F6FA] p-4 rounded-lg border border-[#E3E8F0]">
                      <span className="text-[11px] font-bold text-[#0B1B33] block mb-3">
                        Mobile App Icon Mock
                      </span>
                      <div className="flex items-center gap-3">
                        <div className="w-14 h-14 rounded-2xl bg-[#0B1B33] shadow-md flex items-center justify-center border border-white/20 p-2">
                          <LogoIcon direction={dir.id} size={36} />
                        </div>
                        <div className="text-xs">
                          <p className="font-bold text-[#0B1B33]">OneDaySearch</p>
                          <p className="text-[11px] text-[#4F5F78]">Title Marketplace</p>
                        </div>
                      </div>
                    </div>

                    {/* One-Color Navy */}
                    <div className="bg-[#F4F6FA] p-4 rounded-lg border border-[#E3E8F0]">
                      <span className="text-[11px] font-bold text-[#0B1B33] block mb-3">
                        One-Color Navy #0B1B33
                      </span>
                      <div className="py-2 flex items-center justify-center bg-white rounded border border-[#E3E8F0]">
                        <Logo direction={dir.id} variant="monochrome-navy" size="sm" />
                      </div>
                    </div>

                    {/* One-Color White */}
                    <div className="bg-[#0B1B33] p-4 rounded-lg border border-white/10">
                      <span className="text-[11px] font-bold text-white block mb-3">
                        One-Color White #FFFFFF
                      </span>
                      <div className="py-2 flex items-center justify-center bg-[#071324] rounded border border-white/10">
                        <Logo direction={dir.id} variant="monochrome-white" size="sm" />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* SECTION 2: COLOR SYSTEM & CONTRAST */}
        <section className="bg-white rounded-card border border-[#E3E8F0] p-6 sm:p-8 shadow-soft">
          <div className="border-b border-[#E3E8F0] pb-3 mb-6">
            <h2 className="text-xl font-bold tracking-tight text-[#0B1B33]">
              2. Clean, Calm Color System & WCAG Rules
            </h2>
            <p className="text-xs sm:text-sm text-[#4F5F78]">
              Calibrated to reduce anxiety during time-sensitive real estate transactions.
            </p>
          </div>

          {/* Color Palettes Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 mb-8">
            <div className="p-3 rounded-lg border border-[#E3E8F0] bg-white">
              <div className="h-14 rounded bg-[#0B1B33] mb-2 shadow-inner" />
              <div className="text-xs font-bold text-[#0B1B33]">Navy</div>
              <div className="font-mono text-[11px] text-[#4F5F78]">#0B1B33</div>
              <div className="text-[10px] text-[#4F5F78] mt-1">Text, Dark Shell</div>
            </div>

            <div className="p-3 rounded-lg border border-[#E3E8F0] bg-white">
              <div className="h-14 rounded bg-[#F2A33A] mb-2 shadow-inner" />
              <div className="text-xs font-bold text-[#0B1B33]">Amber</div>
              <div className="font-mono text-[11px] text-[#4F5F78]">#F2A33A</div>
              <div className="text-[10px] text-[#4F5F78] mt-1">Single Primary Action</div>
            </div>

            <div className="p-3 rounded-lg border border-[#E3E8F0] bg-white">
              <div className="h-14 rounded bg-[#FDEBD0] mb-2 shadow-inner" />
              <div className="text-xs font-bold text-[#0B1B33]">Pale Amber</div>
              <div className="font-mono text-[11px] text-[#4F5F78]">#FDEBD0</div>
              <div className="text-[10px] text-[#4F5F78] mt-1">Subtle Badges</div>
            </div>

            <div className="p-3 rounded-lg border border-[#E3E8F0] bg-white">
              <div className="h-14 rounded bg-[#F4F6FA] mb-2 shadow-inner border border-[#E3E8F0]" />
              <div className="text-xs font-bold text-[#0B1B33]">Page Background</div>
              <div className="font-mono text-[11px] text-[#4F5F78]">#F4F6FA</div>
              <div className="text-[10px] text-[#4F5F78] mt-1">Soft Backdrop</div>
            </div>

            <div className="p-3 rounded-lg border border-[#E3E8F0] bg-white">
              <div className="h-14 rounded bg-[#4F5F78] mb-2 shadow-inner" />
              <div className="text-xs font-bold text-[#0B1B33]">Muted Text</div>
              <div className="font-mono text-[11px] text-[#4F5F78]">#4F5F78</div>
              <div className="text-[10px] text-[#4F5F78] mt-1">Body, Secondary</div>
            </div>

            <div className="p-3 rounded-lg border border-[#E3E8F0] bg-white">
              <div className="h-14 rounded bg-[#17824F] mb-2 shadow-inner" />
              <div className="text-xs font-bold text-[#0B1B33]">Success</div>
              <div className="font-mono text-[11px] text-[#4F5F78]">#17824F</div>
              <div className="text-[10px] text-[#4F5F78] mt-1">Ready, Clear SLA</div>
            </div>

            <div className="p-3 rounded-lg border border-[#E3E8F0] bg-white">
              <div className="h-14 rounded bg-[#E3E8F0] mb-2 shadow-inner" />
              <div className="text-xs font-bold text-[#0B1B33]">Border</div>
              <div className="font-mono text-[11px] text-[#4F5F78]">#E3E8F0</div>
              <div className="text-[10px] text-[#4F5F78] mt-1">Crisp Dividers</div>
            </div>
          </div>

          {/* Hard Guardrail Note */}
          <div className="bg-[#FDEBD0]/60 border border-[#F2A33A]/40 rounded-xl p-4 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-[#0B1B33] shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm text-[#0B1B33]">
              <strong className="font-bold">Strict Accessibility Guardrail: </strong>
              Amber (<code className="font-mono text-xs">#F2A33A</code>) text is strictly prohibited on white or light backgrounds
              because it fails WCAG AA 4.5:1 contrast requirements. Primary buttons use an Amber background with high-contrast{' '}
              <strong className="underline">Navy (#0B1B33)</strong> text (Contrast ratio 7.8:1, exceeding AAA rating).
            </div>
          </div>
        </section>

        {/* SECTION 3: TYPOGRAPHY HIERARCHY */}
        <section className="bg-white rounded-card border border-[#E3E8F0] p-6 sm:p-8 shadow-soft">
          <div className="border-b border-[#E3E8F0] pb-3 mb-6">
            <h2 className="text-xl font-bold tracking-tight text-[#0B1B33]">
              3. Strict Typographic Hierarchy
            </h2>
            <p className="text-xs sm:text-sm text-[#4F5F78]">
              Combining humanistic geometry for copy with fixed-pitch precision for contract data.
            </p>
          </div>

          <div className="space-y-6">
            <div className="p-4 rounded-lg bg-[#F4F6FA] border border-[#E3E8F0]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-[#0B1B33] uppercase">Hanken Grotesk 800 ExtraBold</span>
                <span className="text-[11px] font-mono text-[#4F5F78]">Headlines & Brand Wordmarks</span>
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-[#0B1B33]">
                24-Hour Title Search Reports in MD, VA and DC.
              </div>
            </div>

            <div className="p-4 rounded-lg bg-[#F4F6FA] border border-[#E3E8F0]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-[#0B1B33] uppercase">Hanken Grotesk 400-600 Regular & Medium</span>
                <span className="text-[11px] font-mono text-[#4F5F78]">Interface Copy & Descriptions</span>
              </div>
              <p className="text-sm text-[#4F5F78] leading-relaxed max-w-3xl">
                OneDaySearch is an automated marketplace connecting buyers, lenders, and real estate attorneys directly
                with licensed county abstractors. Reports are certified title abstracts and not title insurance policies.
              </p>
            </div>

            <div className="p-4 rounded-lg bg-[#F4F6FA] border border-[#E3E8F0]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-[#0B1B33] uppercase">JetBrains Mono</span>
                <span className="text-[11px] font-mono text-[#F2A33A] bg-[#0B1B33] px-2 py-0.5 rounded font-bold">
                  Strictly For: Order # · Countdowns · Prices
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-6 pt-2 font-mono">
                <div>
                  <span className="text-[10px] text-[#4F5F78] block">Order Identifier</span>
                  <span className="text-lg font-bold text-[#0B1B33]">OD-48213</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#4F5F78] block">Live SLA Countdown</span>
                  <span className="text-lg font-bold text-[#0B1B33]">14h 22m 18s</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#4F5F78] block">Standard Search Price</span>
                  <span className="text-lg font-bold text-[#0B1B33]">$229.00</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
