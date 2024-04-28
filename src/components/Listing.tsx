'use client'
import React from "react";
import { LanguageContext } from "./LanguageProvider";
import { ValidatorContext } from "./ValidatorProvider";
import { Accordion, Box, LoadingOverlay } from "@mantine/core";

const ListingItem = ({ items, id, name } : { items?: string[], id: string, name: string }) => {
  return (
    <Accordion.Item value={id}>
      <Accordion.Control disabled={items?.length === 0}>
        {name} ({items?.length ?? 0})
      </Accordion.Control>
      <Accordion.Panel>
        {items?.map((item) => (
          <div key={item}>{item}</div>
        ))}
      </Accordion.Panel>
    </Accordion.Item>
  )
}

export const Listing = () => {
  const language = React.useContext(LanguageContext);
  const validator = React.useContext(ValidatorContext);

  const [outdatedKeys, setOutdatedKeys] = React.useState<string[] | undefined>(undefined);
  const [missingKeys, setMissingKeys] = React.useState<string[] | undefined>(undefined);
  const [invalidKeys, setInvalidKeys] = React.useState<string[] | undefined>(undefined);

  React.useEffect(() => {
    if (language.current.language === undefined || language.current.base === undefined || language.current.strings === undefined || validator.validator === undefined) return;

    setOutdatedKeys(Object.keys(language.current.base).filter(key => language.current.strings?.[key] !== undefined && language.current.base?.[key].version !== language.current.strings?.[key].version));
    setMissingKeys(Object.keys(language.current.base).filter(key => language.current.strings?.[key] === undefined));

    const languageConfig = {
      dialect: "openttd",
      cases: language.languages[language.current.language].case ?? [],
      genders: language.languages[language.current.language].gender ?? [],
      plural_count: language.plurals[language.languages[language.current.language].plural].forms.length,
    }

    const newInvalidKeys = [];
    for (const key in language.current.base) {
      const base = language.current.base[key].cases["default"];

      for (const tcase in language.current.strings[key]?.cases) {
        const translation = language.current.strings[key].cases[tcase];

        const result = validator.validator.validate_translation(languageConfig, base, tcase, translation);
        if (result.errors.length !== 0) {
          newInvalidKeys.push(key);
        }
      }
    }

    setInvalidKeys(newInvalidKeys);
  }, [language, validator]);

  return (
    <Box pos="relative">
      <LoadingOverlay visible={outdatedKeys === undefined} loaderProps={{ type: "dots" }} />
      <Accordion>
        <ListingItem items={outdatedKeys} id="outdated-strings" name="Outdated Strings" />
        <ListingItem items={missingKeys} id="missing-strings" name="Missing Strings" />
        <ListingItem items={invalidKeys} id="invalid-strings" name="Invalid Strings" />
      </Accordion>
    </Box>
  );
}
