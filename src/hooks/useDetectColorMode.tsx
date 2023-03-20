import { useEffect, useState } from "react";

export function useDetectDarkTheme(): boolean {
  const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");
  const getCurrentTheme = (): boolean => darkThemeMq.matches;
  const [isDarkTheme, setIsDarkTheme] = useState(getCurrentTheme());

  const mqListener = (e: MediaQueryListEvent): void => {
    setIsDarkTheme(e.matches);
  };

  useEffect(() => {
    darkThemeMq.addEventListener("change", mqListener);
    return () => {
      darkThemeMq.removeEventListener("change", mqListener);
    };
  }, []);
  return isDarkTheme;
}
