import { create } from 'zustand';

interface ComparatorState {
  compareSlugs: string[];
  isOpen: boolean;
  addForCompare: (slug: string) => boolean;
  removeFromCompare: (slug: string) => void;
  toggleCompare: (slug: string) => void;
  clearCompare: () => void;
  setOpen: (open: boolean) => void;
  hasSkill: (slug: string) => boolean;
}

const STORAGE_KEY = 'domoskills_compare_state';

function loadStoredState(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed.slice(0, 3);
    }
  } catch {}
  return [];
}

function saveState(slugs: string[]) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(slugs.slice(0, 3)));
  } catch {}
}

export const useComparatorStore = create<ComparatorState>((set, get) => {
  return {
    compareSlugs: loadStoredState(),
    isOpen: false,

    addForCompare: (slug: string) => {
      const current = get().compareSlugs;
      if (current.includes(slug)) return true;
      if (current.length >= 3) {
        // Max 3 items
        return false;
      }
      const next = [...current, slug];
      set({ compareSlugs: next });
      saveState(next);
      return true;
    },

    removeFromCompare: (slug: string) => {
      const next = get().compareSlugs.filter((s) => s !== slug);
      set({ compareSlugs: next });
      saveState(next);
    },

    toggleCompare: (slug: string) => {
      const current = get().compareSlugs;
      if (current.includes(slug)) {
        get().removeFromCompare(slug);
      } else {
        get().addForCompare(slug);
      }
    },

    clearCompare: () => {
      set({ compareSlugs: [], isOpen: false });
      saveState([]);
    },

    setOpen: (open: boolean) => set({ isOpen: open }),

    hasSkill: (slug: string) => get().compareSlugs.includes(slug),
  };
});
