'use client'
import clsx from "clsx";
import React from "react";
import { Anchor, Box, Group, LoadingOverlay, NavLink, Table, Text, rem } from "@mantine/core";
import { LanguageContext } from "@/providers/LanguageProvider";
import { ValidatorContext } from "@/providers/ValidatorProvider";
import { LayoutCommon } from "@/components/LayoutCommon";
import { useIntersection } from "@mantine/hooks";
import classes from './Listing.module.css';
import { IconListSearch } from "@tabler/icons-react";
import { ProjectContext } from "@/providers/ProjectProvider";

const NavigationItem = ({ id, name, entries }: { id: string, name: string, entries: (IntersectionObserverEntry | null)[] }) => {
  /* Check if only the last entry is intersecting (and no other). */
  const active = entries.slice(0, -1).every(entry => !entry?.isIntersecting) && entries.slice(-1)[0]?.isIntersecting;

  return (
    <NavLink href={`#${id}`} label={name} active={active} className={clsx(classes.navlink, { [classes.navlinkActive]: active })} />
  );
}

const Navigation = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box>
      <Group mb="md">
        <IconListSearch style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
        <Text>Table of contents</Text>
      </Group>
      {children}
    </Box>
  );
}

const ListingItemRef = ({ items, id, name }: { items?: string[], id: string, name: string }, ref: React.Ref<HTMLDivElement>) => {
  const project = React.useContext(ProjectContext);
  const language = React.useContext(LanguageContext);

  const length = items?.length ?? 0;

  return (
    <div id={id} ref={ref}>
      <div>&nbsp;</div>
      <div>&nbsp;</div>
      <Table horizontalSpacing="md" verticalSpacing="xs" miw={700} highlightOnHover stickyHeader stickyHeaderOffset={60}>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>{name} ({length})</Table.Th>
          </Table.Tr>
        </Table.Thead>
        {length !== 0 && <Table.Tbody>
          {items?.map((key) => (
            <Table.Tr key={key}>
              <Table.Td><Anchor size="sm" component="a" href={`/string/${project.project}/${language.language}?id=${key}`}>{key}</Anchor></Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>}
      </Table>
    </div>
  )
}
const ListingItem = React.forwardRef(ListingItemRef);

export const Listing = () => {
  const language = React.useContext(LanguageContext);
  const validator = React.useContext(ValidatorContext);

  const [outdatedKeys, setOutdatedKeys] = React.useState<string[] | undefined>(undefined);
  const [missingKeys, setMissingKeys] = React.useState<string[] | undefined>(undefined);
  const [errorKeys, setErrorKeys] = React.useState<string[] | undefined>(undefined);
  const [warningKeys, setWarningKeys] = React.useState<string[] | undefined>(undefined);
  const [finishedKeys, setFinishedKeys] = React.useState<string[] | undefined>(undefined);

  React.useEffect(() => {
    if (language.language === undefined || language.base === undefined || language.strings === undefined || language.config === undefined || validator.validator === undefined) return;

    const newOutdatedKeys = Object.keys(language.base).filter(key => language.strings?.[key] !== undefined && language.base?.[key].version !== language.strings?.[key].version);
    const newMissingKeys = Object.keys(language.base).filter(key => language.strings?.[key] === undefined);
    const newErrorKeys: string[] = [];
    const newWarningKeys: string[] = [];

    for (const key in language.base) {
      const base = language.base[key].cases["default"];

      for (const tcase in language.strings[key]?.cases) {
        const translation = language.strings[key].cases[tcase];

        const result = validator.validator.validate_translation(language.config, base, tcase, translation);

        if (result.errors.filter(error => error.severity === "error").length > 0) newErrorKeys.push(key);
        if (result.errors.filter(error => error.severity === "warning").length > 0) newWarningKeys.push(key);
      }
    }

    setOutdatedKeys(newOutdatedKeys);
    setMissingKeys(newMissingKeys);
    setErrorKeys(newErrorKeys);
    setWarningKeys(newWarningKeys);

    setFinishedKeys(Object.keys(language.base).filter(key => !newErrorKeys.includes(key) && !newWarningKeys.includes(key) && !newMissingKeys.includes(key) && !newOutdatedKeys.includes(key)));
  }, [language, validator]);

  const navigation: JSX.Element[] = [];
  const listing: JSX.Element[] = [];
  const entries: (IntersectionObserverEntry | null)[] = [];

  const useNewSection = (items: string[] | undefined, id: string, name: string) => {
    const intersection = useIntersection({ threshold: 0.005 });
    entries.push(intersection.entry);
    const entriesClone = [...entries];

    listing.push(<ListingItem items={items} id={id} name={name} ref={intersection.ref} />);
    navigation.push(<NavigationItem id={id} name={name} entries={entriesClone} />);
  }

  useNewSection(errorKeys, "errors", "Strings with errors");
  useNewSection(warningKeys, "warnings", "Strings with warnings");
  useNewSection(outdatedKeys, "outdated", "Outdated Strings");
  useNewSection(missingKeys, "missing", "Missing Strings");
  useNewSection(finishedKeys, "finished", "Finished Strings");

  return (
    <LayoutCommon navigation={<Navigation>{navigation}</Navigation>}>
      <Box pos="relative">
        <LoadingOverlay visible={outdatedKeys === undefined} loaderProps={{ type: "dots" }} />
        {listing}
      </Box>
    </LayoutCommon>
  );
}
