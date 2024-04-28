'use client'
import React from "react";

interface LanguageEntry {
    cases: Record<string, string>;
    version: string;
};

interface LanguageData {
    name?: string;
    displayName?: string;
    base?: Record<string, LanguageEntry>;
    strings?: Record<string, LanguageEntry>;
};

export const LanguageContext = React.createContext<LanguageData>({});

export const LanguageProvider = ({ children, language }: { children: React.ReactNode, language: string }) => {
  const [languageData, setLanguageData] = React.useState<LanguageData>({});

  React.useEffect(() => {
    setLanguageData((prev) => ({
        ...prev,
        name: language,
        displayName: language.charAt(0).toUpperCase() + language.slice(1),
    }));

    fetch("english.json").then((response) => {
        return response.json();
    }).then((data) => {
        setLanguageData((prev) => ({
            ...prev,
            base: data,
        }));
    });

    fetch(`${language}.json`).then((response) => {
        return response.json();
    }).then((data) => {
        setLanguageData((prev) => ({
            ...prev,
            strings: data,
        }));
    });
  }, [language]);

  return <LanguageContext.Provider value={languageData}>{children}</LanguageContext.Provider>;
}
