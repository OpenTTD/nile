import React from "react";
import { getNileConfig } from "@/static/NileConfig";
import { LayoutCommon } from "@/components/LayoutCommon";
import { ConfigProvider } from "@/providers/ConfigProvider";
import { MainPage } from "./MainPage";

export default async function Home() {
  const nileConfig = await getNileConfig();

  return (
    <main>
      <ConfigProvider config={nileConfig}>
        <LayoutCommon>
          <MainPage />
        </LayoutCommon>
      </ConfigProvider>
    </main>
  );
}
