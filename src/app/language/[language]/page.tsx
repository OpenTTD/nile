import React from "react";
import { getNileConfig } from "@/static/NileConfig";
import { LanguageProvider } from "@/providers/LanguageProvider";
import { LayoutCommon } from "@/components/LayoutCommon";
import { Listing } from "./Listing";

export default async function Home({ params }: { params: { language: string } }) {
  const { language } = params;

  return (
    <main>
      <LanguageProvider initialLanguage={language}>
        <LayoutCommon>
          <Listing />
        </LayoutCommon>
      </LanguageProvider>
    </main>
  );
}

export const generateStaticParams = async () => {
  const nileConfig = await getNileConfig();

  const entries = [];

  for (const [languageName, _] of Object.entries(nileConfig.languages)) {
    entries.push({
      language: languageName,
    });
  }

  return entries;
};
