import { Theme } from "@/app/theme";
import React from "react";

const useTheme = () => {
  const [theme, setTheme] = React.useState<Theme>(() => {
    const savedTheme = localStorage.theme;
    return savedTheme ? savedTheme : Theme.LIGHT;
  });

  const toggleTheme = () => {
    setTheme((prev) => {
      const newTheme = prev === Theme.LIGHT ? Theme.DARK : Theme.LIGHT;
      localStorage.theme = newTheme;
      return newTheme;
    });
  };

  React.useEffect(() => {
    document.documentElement.setAttribute("data-bs-theme", theme);
  }, [theme]);

  return [theme, toggleTheme] as const;
};

export default useTheme;
