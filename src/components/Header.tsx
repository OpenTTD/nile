'use client'
import React from "react";
import { Breadcrumbs, Button, Menu, Text } from "@mantine/core";
import { IconChevronDown } from "@tabler/icons-react";
import { LanguageContext } from "./LanguageProvider";
import { usePathname } from "next/navigation";


export const Header = () => {
  const language = React.useContext(LanguageContext);
  const [project, setProject] = React.useState("OpenTTD");
  const pathname = usePathname();

  return (
    <>
      <Breadcrumbs h="100%" px="md">
        <Button component="a" variant="subtle" radius="xl" size="xs" href="/">Home</Button>

        {pathname === "/languages" && (
          <Button component="a" variant="subtle" radius="xl" size="xs" href="/languages">
            Languages
          </Button>
        )}

        {pathname.startsWith("/translation") && (
          <Menu>
            <Menu.Target>
              <Button variant="subtle" radius="xl" size="xs" rightSection={<IconChevronDown size={14} />}>
                {project}
              </Button>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item onClick={() => setProject("OpenTTD")}>OpenTTD</Menu.Item>
              <Menu.Item onClick={() => setProject("OpenGFX")}>OpenGFX</Menu.Item>
            </Menu.Dropdown>
          </Menu>
        )}

        {pathname.startsWith("/translation") && language.current.language !== undefined && (
          <Menu>
            <Menu.Target>
              <Button variant="subtle" radius="xl" size="xs" rightSection={<IconChevronDown size={14} />}>
                {language.languages[language.current.language].name} ({language.current.language})
              </Button>
            </Menu.Target>
            <Menu.Dropdown>
              {Object.keys(language.languages ?? {}).map((key) => (
                <Menu.Item key={key} component="a" href={`/translation/openttd-vanilla/${key}`}>
                  {language.languages?.[key]?.name ?? ""} ({key})
                </Menu.Item>
              ))}
            </Menu.Dropdown>
          </Menu>
        )}
      </Breadcrumbs>
    </>
  );
}
