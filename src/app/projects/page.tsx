import React from "react";
import { getNileConfig } from "@/static/NileConfig";
import { LayoutCommon } from "@/components/LayoutCommon";
import { ConfigProvider } from "@/providers/ConfigProvider";
import { Listing } from "./Listing";

export default async function Home() {
  const nileConfig = await getNileConfig();

  return (
    <main>
      <ConfigProvider config={nileConfig}>
        <LayoutCommon>
          <Listing />
        </LayoutCommon>
      </ConfigProvider>
    </main>
  );
}
