import React from "react";
import { getNileConfig } from "@/static/NileConfig";
import { LanguageProvider } from "@/components/LanguageProvider";
import { ValidatorProvider } from "@/components/ValidatorProvider";
import { LayoutCommon } from "@/components/LayoutCommon";
import { Listing } from "@/components/Listing";

export default async function Home({ params }: { params: { project: string, language: string } }) {
  const { project, language } = params;
  const nileConfig = await getNileConfig();

  return (
    <main>
      <ValidatorProvider>
        <LanguageProvider languages={nileConfig.languages} plurals={nileConfig.plurals} initialLanguage={language}>
          <LayoutCommon>
            <Listing />
          </LayoutCommon>
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
