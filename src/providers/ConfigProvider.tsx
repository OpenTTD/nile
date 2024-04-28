'use client';
import React from "react";
import { LanguageInfo, PluralInfo, ProjectInfo } from "@/static/NileConfig";

interface NileConfig {
  projects: Record<string, ProjectInfo>;
  languages: Record<string, LanguageInfo>;
  plurals: Record<string, PluralInfo>;
};

export const ConfigContext = React.createContext<NileConfig>({
  projects: {},
  languages: {},
  plurals: {},
});

export const ConfigProvider = ({ config, children }: { config: NileConfig, children: React.ReactNode }) => {
  const [configData, _] = React.useState<NileConfig>(config);

  return <ConfigContext.Provider value={configData}>{children}</ConfigContext.Provider>;
}
