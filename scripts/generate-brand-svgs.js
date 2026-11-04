import fs from 'fs';
import path from 'path';

const outDir = path.resolve('public/brand');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// Icon A: Clock under roofline
// Amber circle with clock hands, gable roof shape above.
function getIconA(colorMode = 'color') {
  // colorMode: 'color' | 'navy' | 'white'
  const roofColor = colorMode === 'white' ? '#FFFFFF' : '#0B1B33';
  const clockFill = colorMode === 'white' ? '#FFFFFF' : (colorMode === 'navy' ? '#0B1B33' : '#F2A33A');
  const handColor = colorMode === 'white' ? '#0B1B33' : (colorMode === 'navy' ? '#FFFFFF' : '#0B1B33');

  return `
    <g id="icon-a">
      <!-- Gable roofline -->
      <path d="M3 13.5L16 3.5L29 13.5" stroke="${roofColor}" stroke-width="2.75" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
      <!-- Clock under roof -->
      <circle cx="16" cy="19.5" r="8" fill="${clockFill}"/>
      <!-- Clock hands: 12 and 3 -->
      <path d="M16 19.5V14.5M16 19.5H19.5" stroke="${handColor}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <circle cx="16" cy="19.5" r="1.25" fill="${handColor}"/>
    </g>
  `.trim();
}

// Icon B: Magnifier with house inside
function getIconB(colorMode = 'color') {
  const primary = colorMode === 'white' ? '#FFFFFF' : (colorMode === 'navy' ? '#0B1B33' : '#F2A33A');
  const secondary = colorMode === 'white' ? '#0B1B33' : (colorMode === 'navy' ? '#FFFFFF' : '#0B1B33');

  return `
    <g id="icon-b">
      <!-- Magnifier lens ring -->
      <circle cx="13.5" cy="13.5" r="9" stroke="${primary}" stroke-width="2.75" fill="none"/>
      <!-- Magnifier handle -->
      <path d="M20 20L28.5 28.5" stroke="${primary}" stroke-width="3.25" stroke-linecap="round"/>
      <!-- House inside lens -->
      <path d="M13.5 7.5L8 12.5H19L13.5 7.5Z" fill="${secondary}"/>
      <path d="M9.5 12.5H17.5V17.5H9.5V12.5Z" fill="${secondary}"/>
      <rect x="12" y="14.5" width="3" height="3" fill="${colorMode === 'white' ? '#FFFFFF' : '#FFFFFF'}"/>
    </g>
  `.trim();
}

// Icon C: Bold "1" in amber rounded square with roof slope flag
function getIconC(colorMode = 'color') {
  const bg = colorMode === 'white' ? '#FFFFFF' : (colorMode === 'navy' ? '#0B1B33' : '#F2A33A');
  const fg = colorMode === 'white' ? '#0B1B33' : (colorMode === 'navy' ? '#FFFFFF' : '#0B1B33');

  return `
    <g id="icon-c">
      <!-- Amber rounded square -->
      <rect x="2.5" y="2.5" width="27" height="27" rx="6" fill="${bg}"/>
      <!-- Bold 1 with roof slope flag -->
      <path d="M9 13.5L16 7V22.5M12 22.5H20" stroke="${fg}" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
    </g>
  `.trim();
}

function generateSvgFiles() {
  const directions = [
    { key: 'a', name: 'Direction A: Clock Under Roofline', getIcon: getIconA },
    { key: 'b', name: 'Direction B: Magnifier with House', getIcon: getIconB },
    { key: 'c', name: 'Direction C: Bold 1 with Roof Slope', getIcon: getIconC }
  ];

  for (const dir of directions) {
    // 1. Icon Only (32x32)
    const iconOnly = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" fill="none">
  ${dir.getIcon('color')}
</svg>`;
    fs.writeFileSync(path.join(outDir, `logo-${dir.key}-icon.svg`), iconOnly);

    // 2. Favicon (16x16 / 32x32)
    const favicon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" fill="none">
  ${dir.getIcon('color')}
</svg>`;
    fs.writeFileSync(path.join(outDir, `logo-${dir.key}-favicon.svg`), favicon);

    // 3. Horizontal Lockup (240x48) - Light background
    // Rule: On white/light backgrounds, the whole wordmark is navy and only the icon is amber
    const horizontalLight = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 48" width="240" height="48" fill="none">
  <g transform="translate(6, 8)">
    ${dir.getIcon('color')}
  </g>
  <text x="48" y="31" font-family="'Hanken Grotesk', system-ui, sans-serif" font-weight="800" font-size="22" letter-spacing="-0.02em" fill="#0B1B33">OneDaySearch</text>
</svg>`;
    fs.writeFileSync(path.join(outDir, `logo-${dir.key}-horizontal.svg`), horizontalLight);

    // 4. Stacked Lockup (160x100) - Light background
    const stackedLight = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 100" width="160" height="100" fill="none">
  <g transform="translate(56, 10) scale(1.5)">
    ${dir.getIcon('color')}
  </g>
  <text x="80" y="82" text-anchor="middle" font-family="'Hanken Grotesk', system-ui, sans-serif" font-weight="800" font-size="18" letter-spacing="-0.02em" fill="#0B1B33">OneDaySearch</text>
</svg>`;
    fs.writeFileSync(path.join(outDir, `logo-${dir.key}-stacked.svg`), stackedLight);

    // 5. One-Color Navy (Horizontal Lockup on light)
    const oneColorNavy = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 48" width="240" height="48" fill="none">
  <g transform="translate(6, 8)">
    ${dir.getIcon('navy')}
  </g>
  <text x="48" y="31" font-family="'Hanken Grotesk', system-ui, sans-serif" font-weight="800" font-size="22" letter-spacing="-0.02em" fill="#0B1B33">OneDaySearch</text>
</svg>`;
    fs.writeFileSync(path.join(outDir, `logo-${dir.key}-navy.svg`), oneColorNavy);

    // 6. One-Color White (Horizontal Lockup on dark)
    // Rule: On navy backgrounds, "OneDay" is white and "Search" is amber, but in one-color white both are white.
    const oneColorWhite = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 48" width="240" height="48" fill="none">
  <g transform="translate(6, 8)">
    ${dir.getIcon('white')}
  </g>
  <text x="48" y="31" font-family="'Hanken Grotesk', system-ui, sans-serif" font-weight="800" font-size="22" letter-spacing="-0.02em" fill="#FFFFFF">OneDaySearch</text>
</svg>`;
    fs.writeFileSync(path.join(outDir, `logo-${dir.key}-white.svg`), oneColorWhite);
  }

  // Also copy default favicon (Direction A) to /public/favicon.svg
  fs.copyFileSync(path.join(outDir, 'logo-a-favicon.svg'), path.resolve('public/favicon.svg'));
  console.log('Successfully generated all brand SVG assets in public/brand/');
}

generateSvgFiles();
