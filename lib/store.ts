import { create } from 'zustand';
import { AppStateSchema, type ActivityEvent, type ChatMessage, type UserProfile, type UserPlan, type FutureSelfProfile } from './schemas';
import { generatePlan } from './planning';

const seedProfile: UserProfile = {
  id: 'user_1',
  name: 'Alex',
  age: 30,
  sex: 'male',
  heightCm: 176,
  weightKg: 86,
  primaryGoal: 'muscle_gain',
  targetWeightKg: 90,
  experienceLevel: 'beginner',
  activityLevel: 'moderate',
  trainingDaysPerWeek: 3,
  trainingLocation: 'gym',
  equipment: [],
  dietaryPreferences: [],
  injuriesLimitations: []
};

const seedPlan = generatePlan(seedProfile);

export const INITIAL_SEED: {
  version: number;
  profile: UserProfile;
  plan: UserPlan;
  events: ActivityEvent[];
  messages: ChatMessage[];
  futureSelf: FutureSelfProfile | null;
  seedApplied: boolean;
} = {
  version: 1,
  profile: seedProfile,
  plan: seedPlan,
  events: [
    {
      id: 'seed_workout_1',
      type: 'workout',
      timestamp: Date.now() - 4 * 24 * 60 * 60 * 1000,
      rawMessage: 'Bench press: 80 kg, 4 sets of 8',
      status: 'confirmed',
      data: { exercise: 'bench_press', loadKg: 80, sets: 4, reps: 8, completed: true, pain: false },
    },
    {
      id: 'seed_workout_2',
      type: 'workout',
      timestamp: Date.now() - 2 * 24 * 60 * 60 * 1000,
      rawMessage: 'Bench press: 80 kg, 4 sets of 8',
      status: 'confirmed',
      data: { exercise: 'bench_press', loadKg: 80, sets: 4, reps: 8, completed: true, pain: false },
    }
  ],
  messages: [],
  futureSelf: null,
  seedApplied: true
};

const STORE_KEY = 'future_you_demo_state';

export const DemoStore = {
  load: () => {
    if (typeof window === 'undefined') return null;
    try {
      const stored = localStorage.getItem(STORE_KEY);
      if (!stored) return null;
      
      const parsed = JSON.parse(stored);
      
      const result = AppStateSchema.safeParse(parsed);
      if (!result.success) {
        console.warn('Corrupted state detected. Reseeding...', result.error);
        return INITIAL_SEED;
      }
      
      // Migration for older clients without messages
      if (!result.data.messages) {
        result.data.messages = INITIAL_SEED.messages;
      }
      
      // Migration for older clients without plan
      if (!result.data.plan && result.data.profile) {
        result.data.plan = generatePlan(result.data.profile);
      }

      return result.data;
    } catch (e) {
      console.warn('Failed to load state. Reseeding...');
      return INITIAL_SEED;
    }
  },
  save: (state: any) => {
    if (typeof window === 'undefined') return;
    try {
      const uniqueEvents = Array.from(new Map(state.events.map((e: any) => [e.id, e])).values());
      const stateToSave = { ...state, events: uniqueEvents };
      localStorage.setItem(STORE_KEY, JSON.stringify(stateToSave));
    } catch (e) {
      console.error('Failed to save state:', e);
    }
  }
};

interface StoreState {
  isHydrated: boolean;
  version: number;
  profile: UserProfile | null;
  plan: UserPlan | null;
  events: ActivityEvent[];
  messages: any[]; // Using any to avoid import cycles in inference, properly typed in AppState
  futureSelf: FutureSelfProfile | null;
  pendingClarification: any | null;
  setHydrated: () => void;
  reseed: () => void;
  updateProfile: (profile: UserProfile) => void;
  updatePlan: (plan: UserPlan) => void;
  setPendingClarification: (entry: any | null) => void;
  addEvent: (event: ActivityEvent) => void;
  updateEvent: (id: string, updates: Partial<ActivityEvent>) => void;
  updateFutureSelf: (state: FutureSelfProfile) => void;
  addMessage: (msg: any) => void;
}

export const useAppStore = create<StoreState>((set, get) => ({
  isHydrated: false,
  version: 1,
  profile: null,
  plan: null,
  events: [],
  messages: [],
  futureSelf: null,
  pendingClarification: null,
  
  setHydrated: () => set({ isHydrated: true }),
  
  reseed: () => {
    const newState = { ...INITIAL_SEED, isHydrated: true, pendingClarification: null };
    set(newState);
    DemoStore.save(newState);
  },
  
  updateProfile: (profile) => {
    set({ profile });
    DemoStore.save(get());
  },

  updatePlan: (plan) => {
    set({ plan });
    DemoStore.save(get());
  },
  
  setPendingClarification: (entry) => {
    set({ pendingClarification: entry });
    DemoStore.save(get());
  },

  addEvent: (event) => {
    if (get().events.find(e => e.id === event.id)) return;
    const events = [...get().events, event];
    set({ events });
    DemoStore.save(get());
  },
  
  updateEvent: (id, updates) => {
    set({ events: get().events.map(e => e.id === id ? { ...e, ...updates } : e) });
    DemoStore.save(get());
  },
  
  updateFutureSelf: (state) => {
    set({ futureSelf: state });
    DemoStore.save(get());
  },

  addMessage: (msg) => {
    set({ messages: [...get().messages, msg] });
    DemoStore.save(get());
  }
}));

// SSR-safe hydration
if (typeof window !== 'undefined') {
  const loadedState = DemoStore.load();
  if (loadedState) {
    useAppStore.setState({ ...loadedState, isHydrated: true });
  } else {
    useAppStore.setState({ ...INITIAL_SEED, isHydrated: true });
    DemoStore.save(INITIAL_SEED);
  }
}
