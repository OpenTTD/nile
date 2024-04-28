"use client";

import React from "react";

import { Header } from "@/components/Header";
import { LanguageProvider } from "@/components/LanguageProvider";
import { Listing } from "@/components/Listing";
import { AppShell, Container } from "@mantine/core";

export default function Home() {
  const [language, setLanguage] = React.useState("nl_NL");

  return (
    <main>
      <LanguageProvider language={language}>
        <AppShell header={{ height: 60 }} padding="md">
          <AppShell.Header>
            <Header setLanguage={setLanguage} />
          </AppShell.Header>
          <AppShell.Main>
            <Container>
              <Listing />
            </Container>
          </AppShell.Main>
        </AppShell>
      </LanguageProvider>
    </main>
  );
}
