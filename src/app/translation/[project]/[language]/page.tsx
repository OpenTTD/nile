import { Page } from "@/components/Page";
import { LanguageProvider } from "@/components/LanguageProvider";
import React from "react";
import { getNileConfig } from "@/static/NileConfig";
import { ValidatorProvider } from "@/components/ValidatorProvider";

export default async function Home({ params }: { params: { project: string, language: string } }) {
  const { project, language } = params;
  const nileConfig = await getNileConfig();

  return (
    <main>
      <ValidatorProvider>
        <LanguageProvider languages={nileConfig.languages} initialLanguage={language}>
          <Page />
        </LanguageProvider>
      </ValidatorProvider>
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
