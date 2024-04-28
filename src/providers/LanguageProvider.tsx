'use client';
import React from "react";
import { ProjectContext } from "./ProjectProvider";
import { ConfigContext } from "./ConfigProvider";
import { LanguageConfig } from "./ValidatorProvider";

interface LanguageEntry {
  cases: Record<string, string>;
  version: string;
};

interface LanguageData {
  language: string;
  base?: Record<string, LanguageEntry>;
  strings?: Record<string, LanguageEntry>;
  config?: LanguageConfig,
  changeLanguage: (language: string) => void;
};

export const LanguageContext = React.createContext<LanguageData>({
  language: "",
  changeLanguage: () => {},
});

export const LanguageProvider = ({ initialLanguage, children }: { initialLanguage: string, children: React.ReactNode }) => {
  const config = React.useContext(ConfigContext);
  const project = React.useContext(ProjectContext);

  const [language, setLanguage] = React.useState(initialLanguage);
  const [languageData, setLanguageData] = React.useState<LanguageData>({
    language,
    changeLanguage: (language: string) => setLanguage(language),
  });

  React.useEffect(() => {
    if (project.project === "") return;

    fetch(`${process.env.NEXT_PUBLIC_LOCATION_NILE_DATA}/${project.project}/base.json`).then((response) => {
      return response.json();
    }).then((data) => {
      setLanguageData((prev) => ({
        ...prev,
        base: data,
      }));
    });
  }, [project.project]);

  React.useEffect(() => {
    setLanguageData((prev) => ({
      ...prev,
      language: language,
      strings: undefined,
      config: {
        dialect: "openttd",
        cases: config.languages[language].case ?? [],
        genders: config.languages[language].gender ?? [],
        plural_count: config.plurals[config.languages[language].plural].forms.length,
      }
    }));

    if (project.project === "") return;

    fetch(`${process.env.NEXT_PUBLIC_LOCATION_NILE_DATA}/${project.project}/${language}.json`).then((response) => {
      return response.json();
    }).then((data) => {
      setLanguageData((prev) => ({
        ...prev,
        strings: data,
      }));
    });
  }, [project.project, language, config]);

  return <LanguageContext.Provider value={languageData}>{children}</LanguageContext.Provider>;
}
