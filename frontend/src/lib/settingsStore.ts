import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type ColorTheme = 'Larache Blue' | 'Forest Green' | 'Royal Purple'
export type Density = 'Compact' | 'Normal' | 'Spacieux'

interface SettingsState {
  theme: ColorTheme
  density: Density
  isDarkMode: boolean
  setTheme: (theme: ColorTheme) => void
  setDensity: (density: Density) => void
  toggleDarkMode: () => void
  setDarkMode: (isDark: boolean) => void
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      theme: 'Larache Blue',
      density: 'Normal',
      isDarkMode: false,
      setTheme: (theme) => set({ theme }),
      setDensity: (density) => set({ density }),
      toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
      setDarkMode: (isDark) => set({ isDarkMode: isDark }),
    }),
    {
      name: 'erh-settings',
    }
  )
)
