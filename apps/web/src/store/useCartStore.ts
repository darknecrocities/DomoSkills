import { create } from 'zustand';
import { AgentTarget, CartItem, TrustLevel, CategorySlug } from '@domoskills/validators';

interface CartState {
  skills: CartItem[];
  targetAgent: AgentTarget;
  isDrawerOpen: boolean;
  isInstallModalOpen: boolean;
  
  // Actions
  addSkill: (skill: { id: string; slug: string; name: string; category: CategorySlug; license: string; trustLevel: TrustLevel }) => void;
  removeSkill: (slug: string) => void;
  toggleSkill: (skill: { id: string; slug: string; name: string; category: CategorySlug; license: string; trustLevel: TrustLevel }) => void;
  hasSkill: (slug: string) => boolean;
  clearCart: () => void;
  setTargetAgent: (target: AgentTarget) => void;
  setDrawerOpen: (open: boolean) => void;
  setInstallModalOpen: (open: boolean) => void;
}

const STORAGE_KEY = 'domoskills_cart_state';

// Safe localStorage sync
function loadStoredState(): { skills: CartItem[]; targetAgent: AgentTarget } {
  if (typeof window === 'undefined') {
    return { skills: [], targetAgent: 'universal' };
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return {
        skills: Array.isArray(parsed.skills) ? parsed.skills : [],
        targetAgent: parsed.targetAgent || 'universal',
      };
    }
  } catch {
    // Ignore storage parse error
  }
  return { skills: [], targetAgent: 'universal' };
}

function saveState(state: { skills: CartItem[]; targetAgent: AgentTarget }) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Ignore storage write error
  }
}

export const useCartStore = create<CartState>((set, get) => {
  const initial = loadStoredState();

  return {
    skills: initial.skills,
    targetAgent: initial.targetAgent,
    isDrawerOpen: false,
    isInstallModalOpen: false,

    addSkill: (skill) => {
      const current = get().skills;
      if (current.some((s) => s.slug === skill.slug)) return;

      const newItem: CartItem = {
        skillId: skill.id,
        slug: skill.slug,
        name: skill.name,
        category: skill.category,
        license: skill.license,
        trustLevel: skill.trustLevel,
        addedAt: Date.now(),
      };

      const updated = [...current, newItem];
      set({ skills: updated, isDrawerOpen: true });
      saveState({ skills: updated, targetAgent: get().targetAgent });
    },

    removeSkill: (slug) => {
      const updated = get().skills.filter((s) => s.slug !== slug);
      set({ skills: updated });
      saveState({ skills: updated, targetAgent: get().targetAgent });
    },

    toggleSkill: (skill) => {
      const { hasSkill, addSkill, removeSkill } = get();
      if (hasSkill(skill.slug)) {
        removeSkill(skill.slug);
      } else {
        addSkill(skill);
      }
    },

    hasSkill: (slug) => {
      return get().skills.some((s) => s.slug === slug);
    },

    clearCart: () => {
      set({ skills: [] });
      saveState({ skills: [], targetAgent: get().targetAgent });
    },

    setTargetAgent: (targetAgent) => {
      set({ targetAgent });
      saveState({ skills: get().skills, targetAgent });
    },

    setDrawerOpen: (isDrawerOpen) => set({ isDrawerOpen }),
    setInstallModalOpen: (isInstallModalOpen) => set({ isInstallModalOpen }),
  };
});
