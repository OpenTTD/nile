'use client'
import React from "react";
import { LanguageContext } from "./LanguageProvider";
import Link from "next/link";
import { Breadcrumbs, Button, Group, Menu } from "@mantine/core";
import { IconChevronDown, IconDownload } from "@tabler/icons-react";


export const Header = ({setLanguage} : {setLanguage: (language: string) => void}) => {
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
          <Button variant="subtle" radius="xl" size="xs" rightSection={<IconChevronDown size={14} />}>{language.displayName}</Button>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item onClick={() => setLanguage("nl_NL")}>Dutch</Menu.Item>
            <Menu.Item onClick={() => setLanguage("de_DE")}>German</Menu.Item>
            <Menu.Item onClick={() => setLanguage("la_VA")}>Latin</Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Breadcrumbs>
    </>
  );
}
