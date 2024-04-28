import { Page } from "@/components/Page";
import { LanguageProvider } from "@/components/LanguageProvider";
import React from "react";
import { getNileConfig } from "@/static/NileConfig";

export default async function Home() {
  const nileConfig = await getNileConfig();

  return (
    <main>
      <LanguageProvider languages={nileConfig.languages}>
        <Page />
      </LanguageProvider>
    </main>
  );
}

export const generateStaticParams = async () => {
  const nileConfig = await getNileConfig();

  const entries = [];

  for (const [projectName, projectInfo] of Object.entries(nileConfig.projects)) {
    for (const language of projectInfo.languages) {
      entries.push({
        project: projectName,
        language: language,
      });
    }
  }

  return entries;
};
