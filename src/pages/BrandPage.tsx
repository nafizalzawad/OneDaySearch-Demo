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
      <header className="bg-white border-b border-[#E3E8F0] sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2 text-sm font-semibold text-[#1C2733] hover:text-[#00BC82] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
          <div className="flex items-center gap-3">
            <span className="text-xs text-[#5A6B7F] hidden sm:inline">Active Logo:</span>
            <div className="flex items-center bg-[#F4F6FA] p-1 rounded-pill border border-[#E3E8F0]">
              {(['a', 'b', 'c'] as LogoDirection[]).map((d) => (
                <button
                  key={d}
                  onClick={() => setLogoDirection(d)}
                  className={`px-3 py-1 rounded-pill text-xs font-semibold uppercase transition-all ${
                    logoDirection === d
                      ? 'bg-[#00BC82] text-white shadow-sm'
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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-pill bg-[#DBFCC5] text-[#00BC82] text-xs font-bold mb-4">
            Brand Identity &amp; Design System
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#1C2733] mb-3">
            OneDaySearch Brand Specifications
          </h1>
          <p className="text-base sm:text-lg text-[#5A6B7F] leading-relaxed">
            The &ldquo;Vibrant Freedom&rdquo; design system: signature bright green, accessible workhorse deep green,
            crisp white base, charcoal typography, and an intentional pop of orange reserved exclusively for action.
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
                      ? 'border-[#00BC82] shadow-elevated ring-1 ring-[#00BC82]'
                      : 'border-[#E3E8F0] shadow-soft'
                  } p-6 sm:p-8`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-[#E3E8F0]">
                    <div>
                      <div className="flex items-center gap-2.5">
                        <h3 className="text-xl font-extrabold text-[#1C2733]">{dir.name}</h3>
                        {isSelected && (
                          <span className="px-2.5 py-0.5 rounded-pill bg-[#DBFCC5] text-[#00BC82] text-xs font-bold">
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
                            : 'bg-[#F4F6FA] text-[#1C2733] hover:bg-[#E3E8F0]'
                        }`}
                      >
                        {isSelected ? 'Selected' : 'Set as Active'}
                      </button>
                      <a
                        href={`/brand/logo-${dir.id}-horizontal.svg`}
                        download
                        className="px-3 py-2 rounded-pill bg-white border border-[#E3E8F0] hover:bg-[#F4F6FA] text-xs font-semibold text-[#1C2733] inline-flex items-center gap-1.5"
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
                    <div className="bg-[#F8FAFC] border border-[#E3E8F0] p-6 rounded-card flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-xs font-bold text-[#1C2733] uppercase tracking-wider">
                            Light Background (Primary)
                          </span>
                          <span className="text-[11px] font-mono text-[#5A6B7F] bg-white px-2 py-0.5 rounded border border-[#E3E8F0]">
                            Charcoal #1C2733 + Bright Green #6AE878
                          </span>
                        </div>
                        <div className="py-8 flex items-center justify-center bg-white rounded-lg border border-[#E3E8F0]">
                          <Logo direction={dir.id} variant="light" size="lg" />
                        </div>
                      </div>
                      <p className="text-[11px] text-[#5A6B7F] mt-3">
                        Rule: On light surfaces, wordmark is Charcoal #1C2733; icon carries signature Bright Green #6AE878.
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
                            White + Bright Green Split
                          </span>
                        </div>
                        <div className="py-8 flex items-center justify-center bg-[#111D27] rounded-lg border border-white/10">
                          <Logo direction={dir.id} variant="dark" size="lg" />
                        </div>
                      </div>
                      <p className="text-[11px] text-gray-400 mt-3">
                        Rule: &ldquo;OneDay&rdquo; in pure white, &ldquo;Search&rdquo; in signature Bright Green #6AE878.
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

        {/* SECTION 2: "VIBRANT FREEDOM" COLOR SYSTEM */}
        <section className="bg-white rounded-card border border-[#E3E8F0] p-6 sm:p-8 shadow-soft">
          <div className="border-b border-[#E3E8F0] pb-3 mb-6">
            <h2 className="text-xl font-bold tracking-tight text-[#1C2733]">
              2. Vibrant Freedom Color System
            </h2>
            <p className="text-xs sm:text-sm text-[#5A6B7F]">
              Strictly calibrated color roles to balance energy, clarity, and WCAG AA accessibility.
            </p>
          </div>

          {/* Color Palettes Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 mb-8">
            <div className="p-3 rounded-lg border border-[#E3E8F0] bg-white">
              <div className="h-14 rounded bg-[#6AE878] mb-2 shadow-inner" />
              <div className="text-xs font-bold text-[#1C2733]">Bright Green</div>
              <div className="font-mono text-[11px] text-[#5A6B7F]">#6AE878</div>
              <div className="text-[10px] text-[#5A6B7F] mt-1">Signature brand mark</div>
            </div>

            <div className="p-3 rounded-lg border border-[#E3E8F0] bg-white">
              <div className="h-14 rounded bg-[#00BC82] mb-2 shadow-inner" />
              <div className="text-xs font-bold text-[#1C2733]">Deep Green</div>
              <div className="font-mono text-[11px] text-[#5A6B7F]">#00BC82</div>
              <div className="text-[10px] text-[#5A6B7F] mt-1">Workhorse buttons &amp; SLA</div>
            </div>

            <div className="p-3 rounded-lg border border-[#E3E8F0] bg-white">
              <div className="h-14 rounded bg-[#DBFCC5] mb-2 shadow-inner border border-[#E3E8F0]" />
              <div className="text-xs font-bold text-[#1C2733]">Pale Green</div>
              <div className="font-mono text-[11px] text-[#5A6B7F]">#DBFCC5</div>
              <div className="text-[10px] text-[#5A6B7F] mt-1">Soft callouts &amp; badges</div>
            </div>

            <div className="p-3 rounded-lg border border-[#E3E8F0] bg-white">
              <div className="h-14 rounded bg-[#F97316] mb-2 shadow-inner" />
              <div className="text-xs font-bold text-[#1C2733]">Orange</div>
              <div className="font-mono text-[11px] text-[#5A6B7F]">#F97316</div>
              <div className="text-[10px] text-[#F97316] font-semibold mt-1">Place Order / Rush only</div>
            </div>

            <div className="p-3 rounded-lg border border-[#E3E8F0] bg-white">
              <div className="h-14 rounded bg-[#1C2733] mb-2 shadow-inner" />
              <div className="text-xs font-bold text-[#1C2733]">Charcoal</div>
              <div className="font-mono text-[11px] text-[#5A6B7F]">#1C2733</div>
              <div className="text-[10px] text-[#5A6B7F] mt-1">Primary text &amp; headers</div>
            </div>

            <div className="p-3 rounded-lg border border-[#E3E8F0] bg-white">
              <div className="h-14 rounded bg-[#5A6B7F] mb-2 shadow-inner" />
              <div className="text-xs font-bold text-[#1C2733]">Muted Text</div>
              <div className="font-mono text-[11px] text-[#5A6B7F]">#5A6B7F</div>
              <div className="text-[10px] text-[#5A6B7F] mt-1">Subheads &amp; metadata</div>
            </div>

            <div className="p-3 rounded-lg border border-[#E3E8F0] bg-white">
              <div className="h-14 rounded bg-[#FFFFFF] mb-2 shadow-inner border border-[#E3E8F0]" />
              <div className="text-xs font-bold text-[#1C2733]">White Base</div>
              <div className="font-mono text-[11px] text-[#5A6B7F]">#FFFFFF</div>
              <div className="text-[10px] text-[#5A6B7F] mt-1">Canvas &amp; cards</div>
            </div>
          </div>

          {/* Strict Role Rule */}
          <div className="bg-[#DBFCC5]/60 border border-[#00BC82]/40 rounded-xl p-4 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-[#00BC82] shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm text-[#1C2733] leading-relaxed">
              <strong className="font-bold">The Orange Rule: </strong>
              Orange (<code className="font-mono text-xs text-[#F97316]">#F97316</code>) is green&apos;s opposite on the color wheel,
              which is exactly why it pops. It has <strong>one job only</strong>: the &ldquo;Search / Place Order&rdquo; action and rush elements.
              Deep green (<code className="font-mono text-xs text-[#00BC82]">#00BC82</code>) is the workhorse for all navigation, progress steps, and secondary buttons.
            </div>
          </div>
        </section>

        {/* SECTION 3: TYPOGRAPHY HIERARCHY */}
        <section className="bg-white rounded-card border border-[#E3E8F0] p-6 sm:p-8 shadow-soft">
          <div className="border-b border-[#E3E8F0] pb-3 mb-6">
            <h2 className="text-xl font-bold tracking-tight text-[#1C2733]">
              3. Typography System
            </h2>
            <p className="text-xs sm:text-sm text-[#5A6B7F]">
              Hanken Grotesk for interface copy, JetBrains Mono for order numbers, prices, and countdowns.
            </p>
          </div>

          <div className="space-y-6">
            <div className="p-4 rounded-lg bg-[#F4F6FA] border border-[#E3E8F0]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-[#1C2733] uppercase">Hanken Grotesk 800 ExtraBold</span>
                <span className="text-[11px] font-mono text-[#5A6B7F]">Headlines &amp; Brand Wordmark</span>
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-[#1C2733]">
                Accuracy no human can match, in one-tenth the time.
              </div>
            </div>

            <div className="p-4 rounded-lg bg-[#F4F6FA] border border-[#E3E8F0]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-[#1C2733] uppercase">Hanken Grotesk 400-600 Regular &amp; Medium</span>
                <span className="text-[11px] font-mono text-[#5A6B7F]">Interface Copy &amp; Subheads</span>
              </div>
              <p className="text-sm text-[#5A6B7F] leading-relaxed max-w-3xl">
                An assistant searches. A real person approves every report. OneDaySearch connects buyers, lenders, and real estate attorneys with licensed county abstractors in MD, VA, and DC.
              </p>
            </div>

            <div className="p-4 rounded-lg bg-[#F4F6FA] border border-[#E3E8F0]">
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
                  <span className="text-lg font-bold text-[#00BC82]">14h 22m 18s</span>
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
