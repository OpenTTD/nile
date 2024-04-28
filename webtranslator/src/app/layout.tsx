import React from "react";
import type { Metadata } from "next";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { CssBaseline } from "@mui/material";
import { ThemeDarkLightProvider } from "@/components/ThemeProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "OpenTTD Web Translator",
  description: "Translate OpenTTD into your language",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider>
          <ThemeDarkLightProvider>
            <CssBaseline />
            {children}
          </ThemeDarkLightProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
