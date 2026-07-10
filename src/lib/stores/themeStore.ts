import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type Theme = 'light' | 'dark' | 'system';

interface ThemeStore {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void; // toggles between light/dark (explicit override)
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set, get) => ({
      // Default to system preference
      theme: 'system',
      setTheme: (theme: Theme) => {
        set({ theme });
        updateTheme(theme);
      },
      toggleTheme: () => {
        const current = get().theme;
        // When in system mode, first toggle explicitly to light
        const newTheme = current === 'dark' ? 'light' : 'dark';
        set({ theme: newTheme });
        updateTheme(newTheme);
      },
    }),
    {
      name: 'theme-storage',
      storage: createJSONStorage(() => {
        if (typeof window !== 'undefined') {
          return localStorage;
        }
        return {
          getItem: () => null,
          setItem: () => { },
          removeItem: () => { },
        };
      }),
    }
  )
);

function getSystemPrefersDark(): boolean {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return false;
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

// Check if current time is after 10 PM Beijing time (UTC+8)
function isBeijingNightTime(): boolean {
  try {
    const now = new Date();
    // Get current time in Beijing (UTC+8)
    const beijingHour = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Shanghai' })).getHours();
    // Dark mode from 22:00 (10 PM) to 06:00 (6 AM)
    return beijingHour >= 22 || beijingHour < 6;
  } catch {
    return false;
  }
}

export function resolveTheme(theme: Theme): 'light' | 'dark' {
  if (theme === 'system') {
    // If it's Beijing night time, prefer dark; otherwise follow system preference
    if (isBeijingNightTime()) return 'dark';
    return getSystemPrefersDark() ? 'dark' : 'light';
  }
  return theme;
}

function updateTheme(theme: Theme) {
  const effective = resolveTheme(theme);
  // Update DOM
  const root = document.documentElement;
  root.classList.remove('light', 'dark');
  root.classList.add(effective);
  root.setAttribute('data-theme', effective);
}
