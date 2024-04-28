'use client';
import React from "react";
import { LanguageInfo, PluralInfo } from "@/static/NileConfig";

interface LanguageEntry {
  cases: Record<string, string>;
  version: string;
};

interface LanguageData {
  languages: Record<string, LanguageInfo>;
  plurals: Record<string, PluralInfo>;
  current: {
    language?: string;
    base?: Record<string, LanguageEntry>;
    strings?: Record<string, LanguageEntry>;
  }
  changeLanguage: (language: string) => void;
};

export const LanguageContext = React.createContext<LanguageData>({
  languages: {},
  plurals: {},
  current: {},
  changeLanguage: () => {},
});

export const LanguageProvider = ({ languages, plurals, initialLanguage, children }: { languages: Record<string, LanguageInfo>, plurals: Record<string, PluralInfo>, initialLanguage: string, children: React.ReactNode }) => {
  const [language, setLanguage] = React.useState(initialLanguage);
  const [languageData, setLanguageData] = React.useState<LanguageData>({
    languages,
    plurals,
    current: {
      language,
    },
    changeLanguage: (language: string) => setLanguage(language),
  });

  React.useEffect(() => {
    setLanguageData((prev) => ({
      ...prev,
      current: {
        language: language,
        base: undefined,
        strings: undefined,
      },
    }));

    fetch(`${process.env.NEXT_PUBLIC_LOCATION_NILE_DATA}/openttd-vanilla/base.json`).then((response) => {
      return response.json();
    }).then((data) => {
      setLanguageData((prev) => ({
        ...prev,
        current: {
          ...prev.current,
          base: data,
        }
      }));
    });

    fetch(`${process.env.NEXT_PUBLIC_LOCATION_NILE_DATA}/openttd-vanilla/${language}.json`).then((response) => {
      return response.json();
    }).then((data) => {
      setLanguageData((prev) => ({
        ...prev,
        current: {
          ...prev.current,
          strings: data,
        }
      }));
    });
  }, [language]);

  return <LanguageContext.Provider value={languageData}>{children}</LanguageContext.Provider>;
}
