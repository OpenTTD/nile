import React from "react";
import { LayoutCommon } from "@/components/LayoutCommon";
import { Listing } from "./Listing";

export default async function Home() {
  return (
    <main>
      <LayoutCommon>
        <Listing />
      </LayoutCommon>
    </main>
  );
}
