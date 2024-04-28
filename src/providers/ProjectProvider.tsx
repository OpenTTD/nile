'use client';
import React from "react";
import { ConfigContext } from "./ConfigProvider";

export interface LanguageStatistics {
  errors: number;
  finished: number;
  missing: number;
  outdated: number;
  warnings: number;
}

interface ProjectData {
  project: string;
  statistics: Record<string, LanguageStatistics>,
  languages: string[];
  changeProject: (project: string) => void;
};

export const ProjectContext = React.createContext<ProjectData>({
  project: "",
  statistics: {},
  languages: [],
  changeProject: () => {},
});

export const ProjectProvider = ({ initialProject, children }: { initialProject: string, children: React.ReactNode }) => {
  const config = React.useContext(ConfigContext);

  const [project, setProject] = React.useState(initialProject);
  const [projectData, setProjectData] = React.useState<ProjectData>({
    project,
    statistics: {},
    languages: config.projects[project].languages,
    changeProject: (language: string) => setProject(language),
  });

  React.useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_LOCATION_NILE_DATA}/${project}/statistics.json`).then((response) => {
      return response.json();
    }).then((data) => {
      setProjectData((prev) => ({
        ...prev,
        statistics: data,
      }));
    });
  }, [project]);

  React.useEffect(() => {
    setProjectData((prev) => ({
      ...prev,
      project: project,
      languages: config.projects[project].languages,
    }));
  }, [project, config.projects]);

  return <ProjectContext.Provider value={projectData}>{children}</ProjectContext.Provider>;
}
