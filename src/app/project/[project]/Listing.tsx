'use client'
import React from "react";
import { Anchor, Box, Progress, Table, Tooltip } from "@mantine/core";
import { ConfigContext } from "@/providers/ConfigProvider";
import { LanguageStatistics, ProjectContext } from "@/providers/ProjectProvider";

const Statistics = ({ statistics }: { statistics: LanguageStatistics }) => {
  if (statistics === undefined) return null;

  const total = statistics.errors + statistics.warnings + statistics.outdated + statistics.missing + statistics.finished;
  const minimalWidth = 0.02;

  /* Ensure that the progress bar is at least a minimal width. */
  const finished = statistics.finished / total < minimalWidth ? total * minimalWidth : statistics.finished;
  const missing = statistics.missing / total < minimalWidth ? total * minimalWidth : statistics.missing;
  const outdated = statistics.outdated / total < minimalWidth ? total * minimalWidth : statistics.outdated;
  const warnings = statistics.warnings / total < minimalWidth ? total * minimalWidth : statistics.warnings;
  const errors = statistics.errors / total < minimalWidth ? total * minimalWidth : statistics.errors;

  return (
    <Progress.Root size="xl">
      {statistics.errors !== 0 && <Tooltip label={`Errors - ${statistics.errors}`}>
        <Progress.Section value={errors} color="red" />
      </Tooltip>}
      {statistics.warnings !== 0 && <Tooltip label={`Warnings - ${statistics.warnings}`}>
        <Progress.Section value={warnings} color="orange" />
      </Tooltip>}
      {statistics.outdated !== 0 && <Tooltip label={`Outdated - ${statistics.outdated}`}>
        <Progress.Section value={outdated} color="yellow" />
      </Tooltip>}
      {statistics.missing !== 0 && <Tooltip label={`Missing - ${statistics.missing}`}>
        <Progress.Section value={missing} color="cyan" />
      </Tooltip>}
      {statistics.finished !== 0 && <Tooltip label={`Finished - ${statistics.finished}`}>
        <Progress.Section value={finished} color="green" />
      </Tooltip>}
    </Progress.Root>
  )
}

export const Listing = () => {
  const config = React.useContext(ConfigContext);
  const project = React.useContext(ProjectContext);

  return (
    <Box pos="relative">
      <Table horizontalSpacing="md" verticalSpacing="xs" miw={700} highlightOnHover stickyHeader stickyHeaderOffset={60}>
        <Table.Thead>
          <Table.Tr>
            <Table.Th w={100}>ISO code</Table.Th>
            <Table.Th w={250}>Language</Table.Th>
            <Table.Th>Statistics</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {Object.keys(config.languages).map((key) => (
            <Table.Tr key={key}>
              <Table.Td><Anchor size="sm" component="a" href={`/translation/${project.project}/${key}`}>{key}</Anchor></Table.Td>
              <Table.Td>{config.languages[key].name}</Table.Td>
              <Table.Td><Statistics statistics={project.statistics[key]} /></Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </Box>
  );
}
