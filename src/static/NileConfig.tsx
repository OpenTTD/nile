
interface LanguageInfo {
  name: string;
  ownname: string;
  isocode: string;
  plural: number;
  textdir: string;
  digitsep: string;
  digitsepcur: string;
  decimalsep: string;
  winlangid: number;
  grflangid: number;
  gender: string[];
  case: string[];
}

interface ProjectInfo {
  name: string;
  format: string;
  upstream: string;
  languages: string[];
}

interface PluralInfo {
  forms: string[];
}

/**
 * Build time we fetch all information from the configuration store.
 *
 * This is needed, as we need to generate several URLs based on this information.
 * As such, it is used in the rest of the application too, to avoid clients
 * having to fetch this data again.
 */
export const getNileConfig = async () => {
  const projects: Record<string, ProjectInfo> = {};
  const languages: Record<string, LanguageInfo> = {};
  const plurals: Record<string, PluralInfo> = {};

  {
    const response = await fetch(`${process.env.LOCATION_NILE_CONFIG}/plurals.json`);
    const pluralsData = await response.json();

    for (const [pluralName, pluralData] of Object.entries(pluralsData)) {
      plurals[pluralName] = {
        forms: pluralData as string[],
      }
    }
  }

  const response = await fetch(`${process.env.LOCATION_NILE_CONFIG}/projects.json`);
  const projectsData = await response.json();

  for (const projectName of projectsData) {
    const response = await fetch(`${process.env.LOCATION_NILE_CONFIG}/projects/${projectName}.json`);
    const projectData = await response.json();

    projects[projectName] = projectData;

    for (const languageName of projectData.languages) {
      if (languages[languageName] !== undefined) continue;

      const response = await fetch(`${process.env.LOCATION_NILE_CONFIG}/languages/${languageName}.json`);
      const languageData = await response.json();

      languages[languageName] = languageData;
    }
  }

  return {
    projects,
    languages,
    plurals,
  };
}
