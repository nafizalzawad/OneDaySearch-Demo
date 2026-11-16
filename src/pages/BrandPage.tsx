import React from 'react';
import { Logo, LogoIcon } from '../components/brand/Logo';
import { useDemo, LogoDirection } from '../context/DemoContext';
import { Link } from 'react-router-dom';
import { ArrowLeft, Download, ShieldCheck } from 'lucide-react';

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
      subtitle: 'Primary Brand Direction · Default in System',
      rationale:
        'Combines a gable roof silhouette with a 24-hour clock face. Signals both real estate and rapid turnaround with clean, architectural geometry.',
      keywords: ['24-Hour SLA', 'Property Gable', 'Precision & Punctuality'],
    },
    {
      id: 'b',
      name: 'Direction B: Magnifier With House',
      subtitle: 'Search & Title Examination Direction',
      rationale:
        'Embeds a clean architectural home within a precision lens. Focuses on land records examination and search integrity.',
      keywords: ['Chain of Title', 'Deep Investigation', 'Clear Boundary'],
    },
    {
      id: 'c',
      name: 'Direction C: Bold "1" With Roof Slope',
      subtitle: 'Speed & Authority Direction',
      rationale:
        'A bold numeral "1" enclosed in a squircle container, where the flag extends into a 35-degree roofline pitch. Highly memorable for app icons.',
      keywords: ['One Day', 'Marketplace', 'Modern Monogram'],
    },
  ];

  return (
    <div className="min-h-screen bg-[#F4F6FA] text-[#1C2733] pb-24">
      {/* Top Bar */}
      <header className="bg-white border-b border-[#D1E5DE] sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2 text-sm font-semibold text-[#1C2733] hover:text-[#0B5844] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
          <div className="flex items-center gap-3">
            <span className="text-xs text-[#5A6B7F] hidden sm:inline">Active Logo:</span>
            <div className="flex items-center bg-[#F4F8F9] p-1 rounded-pill border border-[#D1E5DE]">
              {(['a', 'b', 'c'] as LogoDirection[]).map((d) => (
                <button
                  key={d}
                  onClick={() => setLogoDirection(d)}
                  className={`px-3 py-1 rounded-pill text-xs font-semibold uppercase transition-all ${
                    logoDirection === d
                      ? 'bg-[#0B5844] text-white shadow-sm'
                      : 'text-[#5A6B7F] hover:text-[#1C2733]'
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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-pill bg-[#E6F7F2] text-[#0B5844] text-xs font-bold mb-4">
            Brand Identity &amp; Design System
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#1C2733] mb-3">
            OneDaySearch Brand Specifications
          </h1>
          <p className="text-base sm:text-lg text-[#5A6B7F] leading-relaxed">
            The Emerald Green luxury color palette: signature primary emerald (#187E5F), workhorse deep forest emerald (#0B5844),
            midnight grounding emerald (#00381F), soft seafoam mint (#E6F7F2), crisp white base, and an intentional pop of sunset orange (#F97316) reserved exclusively for order actions.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
        {/* SECTION 1: THREE DIRECTIONS SHOWCASE */}
        <section className="space-y-8">
          <div className="border-b border-[#E3E8F0] pb-3">
            <h2 className="text-xl font-bold tracking-tight text-[#1C2733]">
              1. Three Geometric Logo Directions
            </h2>
            <p className="text-xs sm:text-sm text-[#5A6B7F]">
              Drawn on a 32×32 grid with minimum 2.5px stroke weight to ensure legibility from 16px favicons to full-size headers.
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
                      ? 'border-[#0B5844] shadow-elevated ring-1 ring-[#0B5844]'
                      : 'border-[#D1E5DE] shadow-soft'
                  } p-6 sm:p-8`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-[#D1E5DE]">
                    <div>
                      <div className="flex items-center gap-2.5">
                        <h3 className="text-xl font-extrabold text-[#1C2733]">{dir.name}</h3>
                        {isSelected && (
                          <span className="px-2.5 py-0.5 rounded-pill bg-[#E6F7F2] text-[#0B5844] text-xs font-bold">
                            Active in Demo
                          </span>
                        )}
                      </div>
                      <p className="text-xs font-medium text-[#5A6B7F] mt-0.5">{dir.subtitle}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setLogoDirection(dir.id)}
                        className={`px-4 py-2 rounded-pill text-xs font-bold transition-all ${
                          isSelected
                            ? 'bg-[#1C2733] text-white'
                            : 'bg-[#F4F8F9] text-[#1C2733] hover:bg-[#D1E5DE]'
                        }`}
                      >
                        {isSelected ? 'Selected' : 'Set as Active'}
                      </button>
                      <a
                        href={`/brand/logo-${dir.id}-horizontal.svg`}
                        download
                        className="px-3 py-2 rounded-pill bg-white border border-[#D1E5DE] hover:bg-[#F4F8F9] text-xs font-semibold text-[#1C2733] inline-flex items-center gap-1.5"
                        title="Download SVG Lockup"
                      >
                        <Download className="w-3.5 h-3.5" /> SVG
                      </a>
                    </div>
                  </div>

                  <p className="text-sm text-[#5A6B7F] mb-6 max-w-3xl leading-relaxed">
                    {dir.rationale}
                  </p>

                  {/* Visual Test Matrix: Light vs Dark vs Sizes */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Light Background Lockup */}
                    <div className="bg-[#F8FAFC] border border-[#D1E5DE] p-6 rounded-card flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-xs font-bold text-[#1C2733] uppercase tracking-wider">
                            Light Background (Primary)
                          </span>
                          <span className="text-[11px] font-mono text-[#5A6B7F] bg-white px-2 py-0.5 rounded border border-[#D1E5DE]">
                            Charcoal #1C2733 + Primary Emerald #187E5F
                          </span>
                        </div>
                        <div className="py-8 flex items-center justify-center bg-white rounded-lg border border-[#D1E5DE]">
                          <Logo direction={dir.id} variant="light" size="lg" />
                        </div>
                      </div>
                      <p className="text-[11px] text-[#5A6B7F] mt-3">
                        Rule: On light surfaces, wordmark is Charcoal #1C2733; icon carries signature Primary Emerald #187E5F.
                      </p>
                    </div>

                    {/* Dark Background Lockup */}
                    <div className="bg-[#1C2733] p-6 rounded-card flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-xs font-bold text-white uppercase tracking-wider">
                            Dark Panel (Theme 2)
                          </span>
                          <span className="text-[11px] font-mono text-gray-300 bg-white/10 px-2 py-0.5 rounded">
                            White + Sunlit Teal Split
                          </span>
                        </div>
                        <div className="py-8 flex items-center justify-center bg-[#111D27] rounded-lg border border-white/10">
                          <Logo direction={dir.id} variant="dark" size="lg" />
                        </div>
                      </div>
                      <p className="text-[11px] text-gray-400 mt-3">
                        Rule: &ldquo;OneDay&rdquo; in pure white, &ldquo;Search&rdquo; in sunlit teal #2DD4A0.
                      </p>
                    </div>
                  </div>

                  {/* Sizing & Monochrome Row */}
                  <div className="mt-6 pt-6 border-t border-[#E3E8F0] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* Size scaling */}
                    <div className="bg-[#F4F6FA] p-4 rounded-lg border border-[#E3E8F0]">
                      <span className="text-[11px] font-bold text-[#1C2733] block mb-3">
                        Size Scaling (16, 24, 32, 48px)
                      </span>
                      <div className="flex items-end gap-3 py-2">
                        <div className="text-center">
                          <div className="w-4 h-4 border border-dashed border-[#5A6B7F] flex items-center justify-center mx-auto mb-1">
                            <LogoIcon direction={dir.id} size={16} />
                          </div>
                          <span className="text-[10px] font-mono text-[#5A6B7F]">16px</span>
                        </div>
                        <div className="text-center">
                          <div className="w-6 h-6 border border-dashed border-[#5A6B7F] flex items-center justify-center mx-auto mb-1">
                            <LogoIcon direction={dir.id} size={24} />
                          </div>
                          <span className="text-[10px] font-mono text-[#5A6B7F]">24px</span>
                        </div>
                        <div className="text-center">
                          <div className="w-8 h-8 border border-dashed border-[#5A6B7F] flex items-center justify-center mx-auto mb-1">
                            <LogoIcon direction={dir.id} size={32} />
                          </div>
                          <span className="text-[10px] font-mono text-[#5A6B7F]">32px</span>
                        </div>
                        <div className="text-center">
                          <div className="w-12 h-12 border border-dashed border-[#5A6B7F] flex items-center justify-center mx-auto mb-1">
                            <LogoIcon direction={dir.id} size={48} />
                          </div>
                          <span className="text-[10px] font-mono text-[#5A6B7F]">48px</span>
                        </div>
                      </div>
                    </div>

                    {/* App Icon Mockup */}
                    <div className="bg-[#F4F6FA] p-4 rounded-lg border border-[#E3E8F0]">
                      <span className="text-[11px] font-bold text-[#1C2733] block mb-3">
                        Mobile App Icon Mock
                      </span>
                      <div className="flex items-center gap-3">
                        <div className="w-14 h-14 rounded-2xl bg-[#1C2733] shadow-md flex items-center justify-center border border-white/20 p-2">
                          <LogoIcon direction={dir.id} size={36} />
                        </div>
                        <div className="text-xs">
                          <p className="font-bold text-[#1C2733]">OneDaySearch</p>
                          <p className="text-[11px] text-[#5A6B7F]">Title Search</p>
                        </div>
                      </div>
                    </div>

                    {/* One-Color Charcoal */}
                    <div className="bg-[#F4F6FA] p-4 rounded-lg border border-[#E3E8F0]">
                      <span className="text-[11px] font-bold text-[#1C2733] block mb-3">
                        One-Color Charcoal #1C2733
                      </span>
                      <div className="py-2 flex items-center justify-center bg-white rounded border border-[#E3E8F0]">
                        <Logo direction={dir.id} variant="monochrome-charcoal" size="sm" />
                      </div>
                    </div>

                    {/* One-Color White */}
                    <div className="bg-[#1C2733] p-4 rounded-lg border border-white/10">
                      <span className="text-[11px] font-bold text-white block mb-3">
                        One-Color White #FFFFFF
                      </span>
                      <div className="py-2 flex items-center justify-center bg-[#111D27] rounded border border-white/10">
                        <Logo direction={dir.id} variant="monochrome-white" size="sm" />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* SECTION 2: "ARCHITECTURAL COLONNADE" COLOR SYSTEM */}
        <section className="bg-white rounded-card border border-[#D1E5DE] p-6 sm:p-8 shadow-soft">
          <div className="border-b border-[#D1E5DE] pb-3 mb-6">
            <h2 className="text-xl font-bold tracking-tight text-[#1C2733]">
              2. Emerald Green Color System
            </h2>
            <p className="text-xs sm:text-sm text-[#5A6B7F]">
              Directly calibrated from the client&apos;s emerald green reference palette (#187E5F, #0B5844, #00381F). Strict calibrated color roles ensure aesthetic prestige and WCAG AAA accessibility.
            </p>
          </div>

          {/* The Client's Signature Swatch Strip (Directly mirrors client reference) */}
          <div className="mb-6 p-4 rounded-xl bg-[#F4FBF8] border border-[#D1E5DE]">
            <div className="text-xs font-bold text-[#1C2733] mb-2 flex items-center justify-between">
              <span>Signature Emerald Green Palette Spectrum (Client Reference)</span>
              <span className="text-[10px] font-mono text-[#0B5844] font-semibold">Primary: #187E5F</span>
            </div>
            <div className="h-16 rounded-lg overflow-hidden flex border border-[#D1E5DE] shadow-sm text-center">
              <div className="w-[12%] bg-[#E6F7F2] flex items-center justify-center font-mono text-[10px] text-[#0B5844] font-bold border-r border-[#D1E5DE]">
                #E6F7F2
              </div>
              <div className="w-[16%] bg-[#2DD4A0] flex items-center justify-center font-mono text-[11px] text-[#00381F] font-bold border-r border-white/20">
                #2DD4A0
              </div>
              <div className="w-[42%] bg-[#187E5F] flex items-center justify-center font-mono text-sm sm:text-base text-white font-extrabold tracking-wide">
                #187E5F — Primary Signature Emerald
              </div>
              <div className="w-[18%] bg-[#0B5844] flex items-center justify-center font-mono text-[11px] text-white font-bold border-l border-[#00381F]">
                #0B5844
              </div>
              <div className="w-[12%] bg-[#00381F] flex items-center justify-center font-mono text-[10px] text-white font-bold border-l border-black">
                #00381F
              </div>
            </div>
          </div>

          {/* Color Palettes Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 mb-8">
            <div className="p-3 rounded-lg border border-[#D1E5DE] bg-white">
              <div className="h-14 rounded bg-[#187E5F] mb-2 shadow-inner" />
              <div className="text-xs font-bold text-[#1C2733]">Primary Emerald</div>
              <div className="font-mono text-[11px] text-[#5A6B7F]">#187E5F</div>
              <div className="text-[10px] text-[#5A6B7F] mt-1">Signature canvas &amp; icon</div>
            </div>

            <div className="p-3 rounded-lg border border-[#D1E5DE] bg-white">
              <div className="h-14 rounded bg-[#0B5844] mb-2 shadow-inner" />
              <div className="text-xs font-bold text-[#1C2733]">Deep Emerald</div>
              <div className="font-mono text-[11px] text-[#5A6B7F]">#0B5844</div>
              <div className="text-[10px] text-[#5A6B7F] mt-1">Workhorse buttons &amp; SLA</div>
            </div>

            <div className="p-3 rounded-lg border border-[#D1E5DE] bg-white">
              <div className="h-14 rounded bg-[#00381F] mb-2 shadow-inner" />
              <div className="text-xs font-bold text-[#1C2733]">Midnight Emerald</div>
              <div className="font-mono text-[11px] text-[#5A6B7F]">#00381F</div>
              <div className="text-[10px] text-[#5A6B7F] mt-1">High-contrast dark footer</div>
            </div>

            <div className="p-3 rounded-lg border border-[#D1E5DE] bg-white">
              <div className="h-14 rounded bg-[#E6F7F2] mb-2 shadow-inner border border-[#D1E5DE]" />
              <div className="text-xs font-bold text-[#1C2733]">Pale Mint</div>
              <div className="font-mono text-[11px] text-[#5A6B7F]">#E6F7F2</div>
              <div className="text-[10px] text-[#5A6B7F] mt-1">Soft callouts &amp; icon box</div>
            </div>

            <div className="p-3 rounded-lg border border-[#D1E5DE] bg-white">
              <div className="h-14 rounded bg-[#F97316] mb-2 shadow-inner" />
              <div className="text-xs font-bold text-[#1C2733]">Sunset Orange</div>
              <div className="font-mono text-[11px] text-[#5A6B7F]">#F97316</div>
              <div className="text-[10px] text-[#F97316] font-semibold mt-1">Place Order / Rush only</div>
            </div>

            <div className="p-3 rounded-lg border border-[#D1E5DE] bg-white">
              <div className="h-14 rounded bg-[#1C2733] mb-2 shadow-inner" />
              <div className="text-xs font-bold text-[#1C2733]">Charcoal</div>
              <div className="font-mono text-[11px] text-[#5A6B7F]">#1C2733</div>
              <div className="text-[10px] text-[#5A6B7F] mt-1">Primary text in cards</div>
            </div>

            <div className="p-3 rounded-lg border border-[#D1E5DE] bg-white">
              <div className="h-14 rounded bg-[#FFFFFF] mb-2 shadow-inner border border-[#D1E5DE]" />
              <div className="text-xs font-bold text-[#1C2733]">White Base</div>
              <div className="font-mono text-[11px] text-[#5A6B7F]">#FFFFFF</div>
              <div className="text-[10px] text-[#5A6B7F] mt-1">Floating cards &amp; base</div>
            </div>
          </div>

          {/* Strict Blueish-Green Background & Color Combination Rules */}
          <div className="space-y-4 pt-2">
            <div className="bg-[#187E5F] rounded-xl p-5 border border-black/10 shadow-sm text-left">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2.5 h-2.5 rounded-full bg-white" />
                <h4 className="text-sm font-extrabold text-white uppercase tracking-wider">
                  Blueish-Green Architecture &amp; WCAG Contrast Rules
                </h4>
              </div>
              <p className="text-xs text-white/90 font-medium leading-relaxed max-w-3xl mb-4">
                When <strong>#187E5F</strong> serves as the primary canvas background, strict mathematical contrast rules govern all overlapping elements:
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="bg-white p-3.5 rounded-lg border border-white/60 shadow-sm">
                  <div className="font-extrabold text-[#1C2733] flex items-center justify-between mb-1">
                    <span>1. Floating White Cards</span>
                    <span className="text-[10px] font-mono text-[#0B5844] bg-[#E6F7F2] px-1.5 py-0.2 rounded font-bold">15.1:1 AAA</span>
                  </div>
                  <p className="text-[11px] text-[#5A6B7F] leading-tight">
                    Charcoal (#1C2733) text inside floating white cards delivers a pristine 15.1:1 contrast ratio for effortless readability.
                  </p>
                </div>

                <div className="bg-white p-3.5 rounded-lg border border-white/60 shadow-sm">
                  <div className="font-extrabold text-[#1C2733] flex items-center justify-between mb-1">
                    <span>2. Deep Emerald Workhorse</span>
                    <span className="text-[10px] font-mono text-[#0B5844] bg-[#E6F7F2] px-1.5 py-0.2 rounded font-bold">8.5:1 AAA</span>
                  </div>
                  <p className="text-[11px] text-[#5A6B7F] leading-tight">
                    Deep Emerald (#0B5844) buttons with white text deliver an 8.5:1 ratio, providing complete WCAG AAA compliance.
                  </p>
                </div>

                <div className="bg-white p-3.5 rounded-lg border border-white/60 shadow-sm">
                  <div className="font-extrabold text-[#1C2733] flex items-center justify-between mb-1">
                    <span>3. Sunset Orange Pop</span>
                    <span className="text-[10px] font-mono text-[#F97316] bg-orange-50 px-1.5 py-0.2 rounded font-bold">Complement</span>
                  </div>
                  <p className="text-[11px] text-[#5A6B7F] leading-tight">
                    Orange (#F97316) sits opposite teal (192°) on the color wheel, matching the warm terracotta arches in the reference artwork.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-[#E6F7F2]/80 border border-[#0B5844]/30 rounded-xl p-4 flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-[#0B5844] shrink-0 mt-0.5" />
              <div className="text-xs sm:text-sm text-[#1C2733] leading-relaxed">
                <strong className="font-bold">Floating Content Card Principle: </strong>
                All dense contract data, form inputs, courthouse land records, and legal disclosures sit within pure White (<code className="font-mono text-xs">#FFFFFF</code>) elevated cards. This anchors the interface with calm 15:1 contrast while preserving the serene architectural blueish-green brand environment.
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: TYPOGRAPHY HIERARCHY */}
        <section className="bg-white rounded-card border border-[#D1E5DE] p-6 sm:p-8 shadow-soft">
          <div className="border-b border-[#D1E5DE] pb-3 mb-6">
            <h2 className="text-xl font-bold tracking-tight text-[#1C2733]">
              3. Typography System
            </h2>
            <p className="text-xs sm:text-sm text-[#5A6B7F]">
              Hanken Grotesk for interface copy, JetBrains Mono for order numbers, prices, and countdowns.
            </p>
          </div>

          <div className="space-y-6">
            <div className="p-4 rounded-lg bg-[#F4F8F9] border border-[#D1E5DE]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-[#1C2733] uppercase">Hanken Grotesk 800 ExtraBold</span>
                <span className="text-[11px] font-mono text-[#5A6B7F]">Headlines &amp; Brand Wordmark</span>
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-[#1C2733]">
                Accuracy no human can match, in one-tenth the time.
              </div>
            </div>

            <div className="p-4 rounded-lg bg-[#F4F8F9] border border-[#D1E5DE]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-[#1C2733] uppercase">Hanken Grotesk 400-600 Regular &amp; Medium</span>
                <span className="text-[11px] font-mono text-[#5A6B7F]">Interface Copy &amp; Subheads</span>
              </div>
              <p className="text-sm text-[#5A6B7F] leading-relaxed max-w-3xl">
                An assistant searches. A real person approves every report. OneDaySearch connects buyers, lenders, and real estate attorneys with licensed county abstractors in MD, VA, and DC.
              </p>
            </div>

            <div className="p-4 rounded-lg bg-[#F4F8F9] border border-[#D1E5DE]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-[#1C2733] uppercase">JetBrains Mono</span>
                <span className="text-[11px] font-mono text-white bg-[#1C2733] px-2 py-0.5 rounded font-bold">
                  Order Numbers · Countdowns · Prices
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-6 pt-2 font-mono">
                <div>
                  <span className="text-[10px] text-[#5A6B7F] block">Order Identifier</span>
                  <span className="text-lg font-bold text-[#1C2733]">OD-48213</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#5A6B7F] block">Live SLA Countdown</span>
                  <span className="text-lg font-bold text-[#0B5844]">14h 22m 18s</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#5A6B7F] block">Standard Search Price</span>
                  <span className="text-lg font-bold text-[#1C2733]">$229.00</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
