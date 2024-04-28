'use client'
import React from "react";
import Link from 'next/link';
import { Anchor, Box, Table } from "@mantine/core";
import { ConfigContext } from "@/providers/ConfigProvider";

export const Listing = () => {
  const config = React.useContext(ConfigContext);

  return (
    <Box pos="relative">
      <Table horizontalSpacing="md" verticalSpacing="xs" miw={700} highlightOnHover stickyHeader stickyHeaderOffset={60}>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Project name</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {Object.keys(config.projects).map((key) => (
            <Table.Tr key={key}>
              <Table.Td><Anchor size="sm" component={Link} href={`/project/${key}`}>{config.projects[key].name}</Anchor></Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </Box>
  );
}
