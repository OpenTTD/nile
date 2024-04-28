'use client'
import React from "react";
import { LanguageContext } from "./LanguageProvider";
import { ValidatorContext } from "./ValidatorProvider";
import { Accordion } from "@mantine/core";


export const Listing = () => {
  const language = React.useContext(LanguageContext);
  const validator = React.useContext(ValidatorContext);

  const [outdatedKeys, setOutdatedKeys] = React.useState<string[]>([]);
  const [missingKeys, setMissingKeys] = React.useState<string[]>([]);
  const [invalidKeys, setInvalidKeys] = React.useState<string[]>([]);

  React.useEffect(() => {
    if (language.current.base === undefined || language.current.strings === undefined) return;

    setOutdatedKeys(Object.keys(language.current.strings).filter(key => language.current.base?.[key].version !== language.current.strings?.[key].version));
    setMissingKeys(Object.keys(language.current.base).filter(key => language.current.strings?.[key] === undefined));

    if (validator.validator === undefined) return;

    const languageConfig = {
      cases: [],
      genders: [],
      plural_count: 1,
    }

    const invalidKeys = [];
    for (const key in language.current.strings) {
      const base = language.current.base[key].cases["default"];

      for (const tcase in language.current.strings[key].cases) {
        const translation = language.current.strings[key].cases[tcase];
        if (validator.validator.validate(languageConfig, base, tcase, translation) !== null) {
          invalidKeys.push(key);
        }
      }
    }
    setInvalidKeys(invalidKeys);
  }, [language, validator]);

  return (
    <div>
      <Accordion>
        <Accordion.Item key="outdated-strings" value="Outdated Strings">
          <Accordion.Control disabled={outdatedKeys.length === 0}>
            Outdated Strings ({outdatedKeys.length})
          </Accordion.Control>
          <Accordion.Panel>
            {outdatedKeys.map((key) => (
              <div key={key}>{key}</div>
            ))}
          </Accordion.Panel>
        </Accordion.Item>
        <Accordion.Item key="missing-strings" value="Missing Strings">
          <Accordion.Control disabled={missingKeys.length === 0}>
            Missing Strings ({missingKeys.length})
          </Accordion.Control>
          <Accordion.Panel>
            {missingKeys.map((key) => (
              <div key={key}>{key}</div>
            ))}
          </Accordion.Panel>
        </Accordion.Item>
        <Accordion.Item key="invalid-strings" value="Invalid Strings">
          <Accordion.Control disabled={invalidKeys.length === 0}>
            Invalid Strings ({invalidKeys.length})
          </Accordion.Control>
          <Accordion.Panel>
            {invalidKeys.map((key) => (
              <div key={key}>{key}</div>
            ))}
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    </div>
  );
}
