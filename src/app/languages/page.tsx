import React from "react";
import { getNileConfig } from "@/static/NileConfig";
import { LayoutCommon } from "@/components/LayoutCommon";

export default async function Home() {
  const nileConfig = await getNileConfig();

  return (
    <main>
      <LayoutCommon>
        Test
      </LayoutCommon>
    </main>
  );
}
