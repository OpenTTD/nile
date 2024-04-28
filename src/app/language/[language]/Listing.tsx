'use client'
import React from "react";
import Link from "next/link";
import { Anchor, Box, Table } from "@mantine/core";
import { ConfigContext } from "@/providers/ConfigProvider";
import { LanguageContext } from "@/providers/LanguageProvider";

export const Listing = () => {
  const config = React.useContext(ConfigContext);
  const language = React.useContext(LanguageContext);

  return (
    <Box pos="relative">
      <Table horizontalSpacing="md" verticalSpacing="xs" miw={700} highlightOnHover stickyHeader stickyHeaderOffset={60}>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Project</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {Object.keys(config.projects).filter(key => config.projects[key].languages.includes(language.language)).map((key) => (
            <Table.Tr key={key}>
              <Table.Td><Anchor size="sm" component={Link} href={`/translation/${key}/${language.language}`}>{config.projects[key].name}</Anchor></Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </Box>
  );
}
