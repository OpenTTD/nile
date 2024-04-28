'use client'
import React from "react";
import { LanguageContext } from "./LanguageProvider";
import { Divider, List, ListItem, ListItemText } from "@mui/material";


export const Listing = () => {
  const language = React.useContext(LanguageContext);
  const [missingKeys, setMissingKeys] = React.useState<string[]>([]);

  React.useEffect(() => {
    if (language.base === undefined || language.strings === undefined) return;

    setMissingKeys(Object.keys(language.base).filter(key => language.strings?.[key] === undefined));
  }, [language]);

  return (
    <div>
      <Divider>Missing Strings ({missingKeys.length})</Divider>
      <List dense={true}>
        {missingKeys.map((key) => (
          <ListItem key={key}>
            <ListItemText primary={key} />
          </ListItem>
        ))}
      </List>
    </div>
  );
}
