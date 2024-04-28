import React from "react";

import { Header } from "@/components/Header";
import { LanguageProvider } from "@/components/LanguageProvider";
import { Listing } from "@/components/Listing";
import { AppShell, Container } from "@mantine/core";

export default function Home() {
  return (
    <main>
      Blub
    </main>
  );
}

export const generateStaticParams = async () => {
  const response = await fetch(`${process.env.CONFIG_STORAGE}/projects.json`);
  const projects = await response.json();

  const entries = [];

  for (const projectName of projects) {
    const response = await fetch(`${process.env.CONFIG_STORAGE}/projects/${projectName}.json`);
    const project = await response.json();

    entries.push(...project.languages.map((language: string) => ({
      project: projectName,
      language: language,
    })));

  }

  return entries;
};
