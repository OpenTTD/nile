'use client'
import { AppBar, Breadcrumbs, Chip, Menu, MenuItem, Toolbar } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React from "react";
import { LanguageContext } from "./LanguageProvider";
import Link from "next/link";


export const Header = ({setLanguage} : {setLanguage: (language: string) => void}) => {
  const language = React.useContext(LanguageContext);
  const [project, setProject] = React.useState("OpenTTD");
  const [anchorProject, setAnchorProject] = React.useState<null | HTMLElement>(null);
  const [anchorLanguage, setAnchorLanguage] = React.useState<null | HTMLElement>(null);

  const closeProjectMenu = (project?: string) => {
    if (project !== undefined) setProject(project);
    setAnchorProject(null);
  };
  const closeLanguageMenu = (language?: string) => {
    if (language !== undefined) setLanguage(language);
    setAnchorLanguage(null);
  }

  const openProjectMenu = () => {
    setAnchorProject(document.getElementById("projectAnchor"));
  };
  const openLanguageMenu = () => {
    setAnchorLanguage(document.getElementById("languageAnchor"));
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <Breadcrumbs>
          <Link href="#">Home</Link>
          <Chip id="projectAnchor" label={project} deleteIcon={<ExpandMoreIcon />} onDelete={openProjectMenu} onClick={openProjectMenu} variant="outlined" />
          <Chip id="languageAnchor" label={language.displayName} deleteIcon={<ExpandMoreIcon />} onDelete={openLanguageMenu} onClick={openLanguageMenu} variant="outlined" />
        </Breadcrumbs>

        <Menu id="project" anchorEl={anchorProject} open={Boolean(anchorProject)} onClose={() => closeProjectMenu()}>
          <MenuItem onClick={() => closeProjectMenu("OpenTTD")}>OpenTTD</MenuItem>
          <MenuItem onClick={() => closeProjectMenu("OpenSFX")}>OpenSFX</MenuItem>
          <MenuItem onClick={() => closeProjectMenu("OpenMSX")}>OpenMSX</MenuItem>
          <MenuItem onClick={() => closeProjectMenu("OpenGFX")}>OpenGFX</MenuItem>
        </Menu>

        <Menu id="language" anchorEl={anchorLanguage} open={Boolean(anchorLanguage)} onClose={() => closeLanguageMenu()}>
          <MenuItem onClick={() => closeLanguageMenu("dutch")}>Dutch</MenuItem>
          <MenuItem onClick={() => closeLanguageMenu("german")}>German</MenuItem>
          <MenuItem onClick={() => closeLanguageMenu("latin")}>Latin</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}
