import React from 'react';
import { useDemo, LogoDirection } from '../../context/DemoContext';

export interface LogoProps {
  direction?: LogoDirection;
  variant?: 'light' | 'dark' | 'monochrome-navy' | 'monochrome-white';
  layout?: 'horizontal' | 'stacked' | 'icon-only';
  size?: 'sm' | 'md' | 'lg' | 'xl' | number;
  className?: string;
  onClick?: () => void;
}

export const LogoIcon: React.FC<{
  direction: LogoDirection;
  colorMode?: 'color' | 'navy' | 'white';
  size?: number;
  className?: string;
}> = ({ direction, colorMode = 'color', size = 32, className = '' }) => {
  const roofNavy = colorMode === 'white' ? '#FFFFFF' : '#0B1B33';
  const amberColor = colorMode === 'white' ? '#FFFFFF' : (colorMode === 'navy' ? '#0B1B33' : '#F2A33A');
  const clockHands = colorMode === 'white' ? '#0B1B33' : (colorMode === 'navy' ? '#FFFFFF' : '#0B1B33');
  const houseColor = colorMode === 'white' ? '#0B1B33' : (colorMode === 'navy' ? '#FFFFFF' : '#0B1B33');

  if (direction === 'a') {
    // Direction A: Clock under a roofline
    // Amber circle with clock hands, gable roof shape above.
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        {/* Gable roof shape */}
        <path
          d="M3 13.5L16 3.5L29 13.5"
          stroke={roofNavy}
          strokeWidth="2.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Amber circle clock */}
        <circle cx="16" cy="19.5" r="8" fill={amberColor} />
        {/* Clock hands showing 3 o'clock / 24h cycle */}
        <path
          d="M16 19.5V14.5M16 19.5H19.5"
          stroke={clockHands}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="16" cy="19.5" r="1.25" fill={clockHands} />
      </svg>
    );
  }

  if (direction === 'b') {
    // Direction B: Magnifier with house inside
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        {/* Magnifier lens ring */}
        <circle cx="13.5" cy="13.5" r="9" stroke={amberColor} strokeWidth="2.75" />
        {/* Handle */}
        <path d="M20 20L28.5 28.5" stroke={amberColor} strokeWidth="3.25" strokeLinecap="round" />
        {/* House inside lens */}
        <path d="M13.5 7.5L8 12.5H19L13.5 7.5Z" fill={houseColor} />
        <path d="M9.5 12.5H17.5V17.5H9.5V12.5Z" fill={houseColor} />
        <rect x="12" y="14.5" width="3" height="3" fill="#FFFFFF" />
      </svg>
    );
  }

  // Direction C: Bold "1" in an amber rounded square with roof slope flag
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect x="2.5" y="2.5" width="27" height="27" rx="6" fill={amberColor} />
      <path
        d="M9 13.5L16 7V22.5M12 22.5H20"
        stroke={houseColor}
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const Logo: React.FC<LogoProps> = ({
  direction: explicitDirection,
  variant = 'light',
  layout = 'horizontal',
  size = 'md',
  className = '',
  onClick,
}) => {
  const { logoDirection: contextDirection } = useDemo();
  const dir = explicitDirection || contextDirection;

  let pixelSize = 32;
  let textClass = 'text-xl tracking-tight';

  if (typeof size === 'number') {
    pixelSize = size;
  } else {
    switch (size) {
      case 'sm':
        pixelSize = 24;
        textClass = 'text-base tracking-tight';
        break;
      case 'md':
        pixelSize = 32;
        textClass = 'text-xl tracking-tight';
        break;
      case 'lg':
        pixelSize = 44;
        textClass = 'text-2xl tracking-tight';
        break;
      case 'xl':
        pixelSize = 56;
        textClass = 'text-3xl tracking-tight';
        break;
    }
  }

  // Determine colors based on variant & rules
  // Rule: On navy backgrounds, "OneDay" is white and "Search" is amber.
  // Rule: On white/light backgrounds, the whole wordmark is navy and only the icon is amber.
  let colorMode: 'color' | 'navy' | 'white' = 'color';
  if (variant === 'monochrome-navy') colorMode = 'navy';
  if (variant === 'monochrome-white') colorMode = 'white';

  const isDark = variant === 'dark' || variant === 'monochrome-white';

  const iconElement = (
    <LogoIcon
      direction={dir}
      colorMode={colorMode}
      size={pixelSize}
      className="shrink-0 transition-transform duration-150 group-hover:scale-105"
    />
  );

  if (layout === 'icon-only') {
    return (
      <div
        className={`inline-flex items-center justify-center cursor-pointer select-none ${className}`}
        onClick={onClick}
      >
        {iconElement}
      </div>
    );
  }

  const wordmark = (
    <span className={`font-sans font-extrabold select-none leading-none ${textClass}`}>
      {variant === 'dark' ? (
        <>
          <span className="text-white">OneDay</span>
          <span className="text-[#F2A33A]">Search</span>
        </>
      ) : variant === 'monochrome-white' ? (
        <span className="text-white">OneDaySearch</span>
      ) : (
        <span className="text-[#0B1B33]">OneDaySearch</span>
      )}
    </span>
  );

  if (layout === 'stacked') {
    return (
      <div
        className={`group inline-flex flex-col items-center gap-2 cursor-pointer ${className}`}
        onClick={onClick}
      >
        {iconElement}
        {wordmark}
      </div>
    );
  }

  return (
    <div
      className={`group inline-flex items-center gap-2.5 cursor-pointer ${className}`}
      onClick={onClick}
    >
      {iconElement}
      {wordmark}
    </div>
  );
};
