"use client";
import { Header } from "@/components/Header";
import { LanguageProvider } from "@/components/LanguageProvider";
import { Listing } from "@/components/Listing";
import { Container } from "@mui/material";
import React from "react";

export default function Home() {
  const [language, setLanguage] = React.useState("dutch");

  return (
    <main>
      <LanguageProvider language={language}>
        <Container>
          <Header setLanguage={setLanguage} />
          <Listing />
        </Container>
      </LanguageProvider>
    </main>
  );
}
