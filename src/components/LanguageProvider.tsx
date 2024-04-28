'use client';
import React from "react";

interface LanguageEntry {
  cases: Record<string, string>;
  version: string;
};

interface LanguageData {
  languages: Record<string, LanguageInfo>;
  current: {
    language?: string;
    base?: Record<string, LanguageEntry>;
    strings?: Record<string, LanguageEntry>;
  }
  changeLanguage: (language: string) => void;
};

interface LanguageInfo {
  name: string;
}

export const LanguageContext = React.createContext<LanguageData>({
  languages: {},
  current: {},
  changeLanguage: () => {},
});

export const LanguageProvider = ({ languages, children }: { languages: Record<string, LanguageInfo>, children: React.ReactNode }) => {
  const [language, setLanguage] = React.useState("nl_NL");
  const [languageData, setLanguageData] = React.useState<LanguageData>({
    languages: languages,
    current: {},
    changeLanguage: (language: string) => setLanguage(language),
  });

  React.useEffect(() => {
    setLanguageData((prev) => ({
      ...prev,
      current: {
        language: language,
        base: {},
        strings: {},
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
