import { useEffect, useState } from "react";

export function useTheme() {
  const [theme, setTheme] = useState(() => localStorage.getItem("aurora-theme") || "dark");

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    localStorage.setItem("aurora-theme", theme);
  }, [theme]);

  return { theme, setTheme, isDark: theme === "dark" };
}
