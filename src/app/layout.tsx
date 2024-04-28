import React from "react";
import type { Metadata } from "next";
import "./globals.css";
import '@mantine/core/styles.css';
import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import { getNileConfig } from "@/static/NileConfig";
import { ConfigProvider } from "@/providers/ConfigProvider";

export const metadata: Metadata = {
  title: "OpenTTD Web Translator",
  description: "Translate OpenTTD into your language",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const nileConfig = await getNileConfig();

  return (
    <html lang="en">
      <head>
        <ColorSchemeScript defaultColorScheme="auto" />
      </head>
      <body>
        <MantineProvider defaultColorScheme="auto">
          <ConfigProvider config={nileConfig}>
            {children}
          </ConfigProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
