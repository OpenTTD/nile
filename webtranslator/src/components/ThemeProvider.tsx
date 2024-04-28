'use client';
import React from "react";
import { ThemeProvider, useMediaQuery } from "@mui/material";
import { themeDark, themeLight } from "@/theme";

export const ThemeDarkLightProvider = ({ children }: { children: React.ReactNode }) => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const theme = React.useMemo(() => prefersDarkMode ? themeDark : themeLight, [prefersDarkMode]);

  return (
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  );
}
