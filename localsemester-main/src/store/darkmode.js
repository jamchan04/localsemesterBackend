import { create } from "zustand";
import { persist } from "zustand/middleware";

const perfersDarkmode = () => {
  if (typeof window !== "undefined") {
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  }
  return false;
};

export const useDarkMode = create(
  persist(
    (set, get) => ({
      isDark: perfersDarkmode,
      toggleDark: () => {
        set((state) => ({ isDark: !state.isDark }));
      },
    }),
    {
      name: "dark-mode-storage",
    }
  )
);
