'use client'
import React from "react";
import { Breadcrumbs, Button, Menu } from "@mantine/core";
import { IconChevronDown } from "@tabler/icons-react";
import { usePathname } from "next/navigation";
import { LanguageContext } from "@/providers/LanguageProvider";
import { ConfigContext } from "@/providers/ConfigProvider";
import { ProjectContext } from "@/providers/ProjectProvider";


export const Header = () => {
  const config = React.useContext(ConfigContext);
  const project = React.useContext(ProjectContext);
  const language = React.useContext(LanguageContext);

  const pathname = usePathname();

  return (
    <>
      <Breadcrumbs h="100%" px="md">
        <Button component="a" variant="subtle" radius="xl" size="xs" href="/">Home</Button>

        {pathname.startsWith("/languages") && (
          <Button component="a" variant="subtle" radius="xl" size="xs" href="/languages">
            Languages
          </Button>
        )}

        {pathname.startsWith("/projects") && (
          <Button component="a" variant="subtle" radius="xl" size="xs" href="/projects">
            Projects
          </Button>
        )}

        {pathname.startsWith("/language/") && (
          <Button component="a" variant="subtle" radius="xl" size="xs" href={`/language/${language.language}`}>
            All Projects
          </Button>
        )}

        {pathname.startsWith("/language/") && (
          <Menu>
            <Menu.Target>
              <Button variant="subtle" radius="xl" size="xs" rightSection={<IconChevronDown size={14} />}>
                {config.languages[language.language].name} ({language.language})
              </Button>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item component="a" href={`/languages`}>
                All languages
              </Menu.Item>
              {Object.keys(config.languages ?? {}).map((key) => (
                <Menu.Item key={key} component="a" href={`/language/${key}`}>
                  {config.languages?.[key]?.name ?? ""} ({key})
                </Menu.Item>
              ))}
            </Menu.Dropdown>
          </Menu>
        )}

        {pathname.startsWith("/project/") && (
          <Menu>
            <Menu.Target>
              <Button variant="subtle" radius="xl" size="xs" rightSection={<IconChevronDown size={14} />}>
                {config.projects[project.project].name}
              </Button>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item component="a" href={`/projects`}>
                All projects
              </Menu.Item>
              {Object.keys(config.projects ?? {}).map((key) => (
                <Menu.Item key={key} component="a" href={`/project/${key}`}>
                  {config.projects?.[key]?.name ?? ""}
                </Menu.Item>
              ))}
            </Menu.Dropdown>
          </Menu>
        )}

        {pathname.startsWith("/project/") && (
          <Button component="a" variant="subtle" radius="xl" size="xs" href={`/project/${project.project}`}>
            All languages
          </Button>
        )}

        {(pathname.startsWith("/translation/") || pathname.startsWith("/string/")) && (
          <Menu>
            <Menu.Target>
              <Button variant="subtle" radius="xl" size="xs" rightSection={<IconChevronDown size={14} />}>
                {config.projects[project.project].name}
              </Button>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item component="a" href={`/language/${language.language}`}>
                All projects
              </Menu.Item>
              {Object.keys(config.projects ?? {}).map((key) => (
                <Menu.Item key={key} component="a" href={`/translation/${key}/${language.language}`}>
                  {config.projects?.[key]?.name ?? ""}
                </Menu.Item>
              ))}
            </Menu.Dropdown>
          </Menu>
        )}

        {(pathname.startsWith("/translation/") || pathname.startsWith("/string/")) && language.language !== undefined && (
          <Menu>
            <Menu.Target>
              <Button variant="subtle" radius="xl" size="xs" rightSection={<IconChevronDown size={14} />}>
                {config.languages[language.language].name} ({language.language})
              </Button>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item component="a" href={`/project/${project.project}`}>
                All languages
              </Menu.Item>
              {Object.keys(config.languages ?? {}).map((key) => (
                <Menu.Item key={key} component="a" href={`/translation/${project.project}/${key}`}>
                  {config.languages?.[key]?.name ?? ""} ({key})
                </Menu.Item>
              ))}
            </Menu.Dropdown>
          </Menu>
        )}

        {pathname.startsWith("/string/") && (
          <Button component="a" variant="subtle" radius="xl" size="xs" href={`/translation/${project.project}/${language.language}`}>
            Strings
          </Button>
        )}
      </Breadcrumbs>
    </>
  );
}
