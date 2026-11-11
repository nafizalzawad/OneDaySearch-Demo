import React, { createContext, useContext, useState, useEffect } from 'react';
import { OrderStatus } from '../mock/types';
import { mockMarketplace } from '../mock/service';

export type LogoDirection = 'a' | 'b' | 'c';
export type ThemeMode = 'vibrant-green' | 'clean-light' | 'dark-brand';
export type SurfaceMode = 'customer' | 'provider' | 'admin';

interface DemoContextType {
  logoDirection: LogoDirection;
  setLogoDirection: (dir: LogoDirection) => void;
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  allow12h: boolean;
  setAllow12h: (allowed: boolean) => void;
  allow6h: boolean;
  setAllow6h: (allowed: boolean) => void;
  isAfterHours: boolean;
  setIsAfterHours: (afterHours: boolean) => void;
  currentStage: OrderStatus;
  setCurrentStage: (stage: OrderStatus) => void;
  showSmsPreview: boolean;
  setShowSmsPreview: (show: boolean) => void;
  isDemoDockVisible: boolean;
  setIsDemoDockVisible: (visible: boolean) => void;
  isDemoDockOpen: boolean;
  setIsDemoDockOpen: (open: boolean) => void;
  currentSurface: SurfaceMode;
  setCurrentSurface: (surface: SurfaceMode) => void;
  activeOrderToken: string;
  setActiveOrderToken: (token: string) => void;
  getSmsTextForStage: (stage: OrderStatus) => string;
}

const DemoContext = createContext<DemoContextType | undefined>(undefined);

export const DemoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [logoDirection, setLogoDirection] = useState<LogoDirection>('a');
  const [theme, setTheme] = useState<ThemeMode>('vibrant-green');
  const [allow12h, setAllow12h] = useState<boolean>(true);
  const [allow6h, setAllow6h] = useState<boolean>(true);
  const [isAfterHours, setIsAfterHours] = useState<boolean>(false);
  const [currentStage, setCurrentStageState] = useState<OrderStatus>('IN_PROGRESS');
  const [showSmsPreview, setShowSmsPreview] = useState<boolean>(false);
  const [isDemoDockVisible, setIsDemoDockVisible] = useState<boolean>(true);
  const [isDemoDockOpen, setIsDemoDockOpen] = useState<boolean>(false);
  const [currentSurface, setCurrentSurface] = useState<SurfaceMode>('customer');
  const [activeOrderToken, setActiveOrderToken] = useState<string>('d9f82a17c4b03e89');

  // Check URL query ?demo=off
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('demo') === 'off') {
      setIsDemoDockVisible(false);
    }
  }, []);

  // Keyboard shortcut: Press 'd' or 'D' to toggle demo dock visibility
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input or textarea
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }
      if (e.key === 'd' || e.key === 'D') {
        setIsDemoDockVisible((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Synchronize HTML data-theme attribute
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const setCurrentStage = (stage: OrderStatus) => {
    setCurrentStageState(stage);
    mockMarketplace.updateOrderStatus(activeOrderToken, stage);
  };

  const getSmsTextForStage = (stage: OrderStatus): string => {
    switch (stage) {
      case 'MATCHING':
        return `OneDaySearch: We received your order OD-48213 for 10400 Fernwood Rd. Matching with an available abstractor now. Track: onedaysearch.example/order/${activeOrderToken}`;
      case 'ASSIGNED':
        return `OneDaySearch: Abstractor assigned to OD-48213. Your report is due by Thu 3:42 PM ET. Track: onedaysearch.example/order/${activeOrderToken}`;
      case 'IN_PROGRESS':
        return `OneDaySearch: Courthouse and land records search is currently underway for OD-48213. Guaranteed delivery by Thu 3:42 PM ET.`;
      case 'READY':
        return `OneDaySearch: Your title search report for 10400 Fernwood Rd is ready for download. View report: onedaysearch.example/order/${activeOrderToken}`;
      case 'QUESTIONS':
        return `OneDaySearch: You received a clarification note regarding OD-48213. Reply securely: onedaysearch.example/order/${activeOrderToken}`;
      case 'CLOSED':
        return `OneDaySearch: Order OD-48213 48-hour clarification window is complete and archived. Thanks for choosing OneDaySearch.`;
    }
  };

  return (
    <DemoContext.Provider
      value={{
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
        currentSurface,
        setCurrentSurface,
        activeOrderToken,
        setActiveOrderToken,
        getSmsTextForStage,
      }}
    >
      {children}
    </DemoContext.Provider>
  );
};

export const useDemo = (): DemoContextType => {
  const context = useContext(DemoContext);
  if (!context) {
    throw new Error('useDemo must be used within a DemoProvider');
  }
  return context;
};
