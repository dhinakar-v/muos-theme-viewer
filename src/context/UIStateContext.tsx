import { createContext, useContext, useState } from 'react';
import type { SchemeValues } from '../lib/iniParser';

interface UIState {
  viewMode: 'list' | 'grid';
  setViewMode: (m: 'list' | 'grid') => void;
  activeAltScheme: SchemeValues | null;
  setActiveAltScheme: (s: SchemeValues | null) => void;
}

const UIStateContext = createContext<UIState>({
  viewMode: 'list',
  setViewMode: () => {},
  activeAltScheme: null,
  setActiveAltScheme: () => {},
});

export function UIStateProvider({ children }: { children: React.ReactNode }) {
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [activeAltScheme, setActiveAltScheme] = useState<SchemeValues | null>(null);

  return (
    <UIStateContext.Provider value={{ viewMode, setViewMode, activeAltScheme, setActiveAltScheme }}>
      {children}
    </UIStateContext.Provider>
  );
}

export function useUIState(): UIState {
  return useContext(UIStateContext);
}
