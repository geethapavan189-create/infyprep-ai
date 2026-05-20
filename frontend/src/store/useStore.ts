import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string | null;
  role: string;
  xp: number;
  streak: number;
  badges: string[];
  solvedQuestions: string[];
  bookmarks: string[];
  mockTestScores: any[];
  codingSubmissions: string[];
}

interface AppState {
  user: User | null;
  darkMode: boolean;
  sidebarOpen: boolean;
  setUser: (user: User | null) => void;
  toggleDarkMode: () => void;
  toggleSidebar: () => void;
  updateXP: (xp: number) => void;
  updateStreak: (streak: number) => void;
  addSolvedQuestion: (id: string) => void;
  toggleBookmark: (id: string) => void;
}

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      user: null,
      darkMode: false,
      sidebarOpen: false,
      setUser: (user) => set({ user }),
      toggleDarkMode: () => {
        const newMode = !get().darkMode;
        set({ darkMode: newMode });
        if (newMode) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      },
      toggleSidebar: () => set({ sidebarOpen: !get().sidebarOpen }),
      updateXP: (xp) => {
        const user = get().user;
        if (user) set({ user: { ...user, xp } });
      },
      updateStreak: (streak) => {
        const user = get().user;
        if (user) set({ user: { ...user, streak } });
      },
      addSolvedQuestion: (id) => {
        const user = get().user;
        if (user && !user.solvedQuestions.includes(id)) {
          set({ user: { ...user, solvedQuestions: [...user.solvedQuestions, id] } });
        }
      },
      toggleBookmark: (id) => {
        const user = get().user;
        if (user) {
          const bookmarks = user.bookmarks.includes(id)
            ? user.bookmarks.filter((b) => b !== id)
            : [...user.bookmarks, id];
          set({ user: { ...user, bookmarks } });
        }
      },
    }),
    { name: 'infyprep-store' }
  )
);
