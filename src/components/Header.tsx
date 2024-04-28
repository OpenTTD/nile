'use client'
import React from "react";
import { LanguageContext } from "./LanguageProvider";
import Link from "next/link";
import { Breadcrumbs, Button, Group, Menu } from "@mantine/core";
import { IconChevronDown, IconDownload } from "@tabler/icons-react";


export const Header = () => {
  const language = React.useContext(LanguageContext);
  const [project, setProject] = React.useState("OpenTTD");

  return (
    <>
      <Breadcrumbs h="100%" px="md">
        <Button variant="subtle" radius="xl" size="xs">Home</Button>

        <Menu>
          <Menu.Target>
            <Button variant="subtle" radius="xl" size="xs" rightSection={<IconChevronDown size={14} />}>{project}</Button>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item onClick={() => setProject("OpenTTD")}>OpenTTD</Menu.Item>
            <Menu.Item onClick={() => setProject("OpenGFX")}>OpenGFX</Menu.Item>
          </Menu.Dropdown>
        </Menu>
        <Menu>
          <Menu.Target>
          <Button variant="subtle" radius="xl" size="xs" rightSection={<IconChevronDown size={14} />}>{language.current.language && language.languages[language.current.language].name}</Button>
          </Menu.Target>
          <Menu.Dropdown>
            {Object.keys(language.languages ?? {}).map((key) => (
              <Menu.Item key={key} onClick={() => language.changeLanguage(key)}>{language.languages?.[key]?.name ?? ""}</Menu.Item>
            ))}
          </Menu.Dropdown>
        </Menu>
      </Breadcrumbs>
    </>
  );
}
