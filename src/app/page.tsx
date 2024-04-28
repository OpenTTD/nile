import React from "react";
import { LayoutCommon } from "@/components/LayoutCommon";
import { MainPage } from "./MainPage";

export default async function Home() {
  return (
    <main>
      <LayoutCommon>
        <MainPage />
      </LayoutCommon>
    </main>
  );
}
