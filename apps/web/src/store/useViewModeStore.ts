import { create } from 'zustand';

export type ViewMode = 'dense' | 'standard' | 'list';
export type MobileLayout = 'dense-3x3' | 'standard';

interface ViewModeState {
  viewMode: ViewMode;
  mobileLayout: MobileLayout;
  setViewMode: (mode: ViewMode) => void;
  setMobileLayout: (layout: MobileLayout) => void;
  toggleViewMode: () => void;
}

const STORAGE_KEY = 'domoskills_view_mode';

function loadStoredState(): { viewMode: ViewMode; mobileLayout: MobileLayout } {
  if (typeof window === 'undefined') {
    return { viewMode: 'standard', mobileLayout: 'standard' };
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return {
        viewMode: ['dense', 'standard', 'list'].includes(parsed.viewMode) ? parsed.viewMode : 'standard',
        mobileLayout: ['dense-3x3', 'standard'].includes(parsed.mobileLayout) ? parsed.mobileLayout : 'standard',
      };
    }
  } catch {}
  return { viewMode: 'standard', mobileLayout: 'standard' };
}

function saveState(state: { viewMode: ViewMode; mobileLayout: MobileLayout }) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {}
}

export const useViewModeStore = create<ViewModeState>((set, get) => {
  const initial = loadStoredState();

  return {
    viewMode: initial.viewMode,
    mobileLayout: initial.mobileLayout,

    setViewMode: (mode: ViewMode) => {
      set({ viewMode: mode });
      saveState({ viewMode: mode, mobileLayout: get().mobileLayout });
    },

    setMobileLayout: (layout: MobileLayout) => {
      set({ mobileLayout: layout });
      saveState({ viewMode: get().viewMode, mobileLayout: layout });
    },

    toggleViewMode: () => {
      const current = get().viewMode;
      const next: ViewMode = current === 'standard' ? 'dense' : current === 'dense' ? 'list' : 'standard';
      set({ viewMode: next });
      saveState({ viewMode: next, mobileLayout: get().mobileLayout });
    },
  };
});
