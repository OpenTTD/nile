import React from "react";
import { getNileConfig } from "@/static/NileConfig";
import { ConfigProvider } from "@/providers/ConfigProvider";
import { ProjectProvider } from "@/providers/ProjectProvider";
import { LayoutCommon } from "@/components/LayoutCommon";
import { Listing } from "./Listing";

export default async function Home({ params }: { params: { project: string } }) {
  const { project } = params;
  const nileConfig = await getNileConfig();

  return (
    <main>
      <ConfigProvider config={nileConfig}>
        <ProjectProvider initialProject={project}>
          <LayoutCommon>
            <Listing />
          </LayoutCommon>
        </ProjectProvider>
      </ConfigProvider>
    </main>
  );
}

export const generateStaticParams = async () => {
  const nileConfig = await getNileConfig();

  const entries = [];

  for (const [projectName, projectInfo] of Object.entries(nileConfig.projects)) {
    entries.push({
      project: projectName,
    });
  }

  return entries;
};
