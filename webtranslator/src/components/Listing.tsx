'use client'
import React from "react";
import { LanguageContext } from "./LanguageProvider";
import { Divider, List, ListItem, ListItemText } from "@mui/material";
import { ValidatorContext } from "./ValidatorProvider";


export const Listing = () => {
  const language = React.useContext(LanguageContext);
  const validator = React.useContext(ValidatorContext);

  const [outdatedKeys, setOutdatedKeys] = React.useState<string[]>([]);
  const [missingKeys, setMissingKeys] = React.useState<string[]>([]);
  const [invalidKeys, setInvalidKeys] = React.useState<string[]>([]);

  React.useEffect(() => {
    if (language.base === undefined || language.strings === undefined) return;

    setOutdatedKeys(Object.keys(language.strings).filter(key => language.base?.[key].version !== language.strings?.[key].version));
    setMissingKeys(Object.keys(language.base).filter(key => language.strings?.[key] === undefined));

    if (validator.validator === undefined) return;

    const invalidKeys = [];
    for (const key in language.strings) {
      const base = language.base[key].cases["default"];

      for (const tcase in language.strings[key].cases) {
        const translation = language.strings[key].cases[tcase];
        if (validator.validator.validate(base, tcase, translation) !== undefined) {
          invalidKeys.push(key);
        }
      }
    }
    setInvalidKeys(invalidKeys);
  }, [language, validator]);

  return (
    <div>
      <Divider>Outdated Strings ({outdatedKeys.length})</Divider>
      <List dense={true}>
        {outdatedKeys.map((key) => (
          <ListItem key={key}>
            <ListItemText primary={key} />
          </ListItem>
        ))}
      </List>
      <Divider>Missing Strings ({missingKeys.length})</Divider>
      <List dense={true}>
        {missingKeys.map((key) => (
          <ListItem key={key}>
            <ListItemText primary={key} />
          </ListItem>
        ))}
      </List>
      <Divider>Invalid Strings ({invalidKeys.length})</Divider>
      <List dense={true}>
        {invalidKeys.map((key) => (
          <ListItem key={key}>
            <ListItemText primary={key} />
          </ListItem>
        ))}
      </List>
    </div>
  );
}
