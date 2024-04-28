'use client'
import React from "react";
import { Anchor, Box, Table } from "@mantine/core";
import { ConfigContext } from "@/providers/ConfigProvider";

export const Listing = () => {
  const config = React.useContext(ConfigContext);

  return (
    <Box pos="relative">
      <Table horizontalSpacing="md" verticalSpacing="xs" miw={700} highlightOnHover stickyHeader stickyHeaderOffset={60}>
        <Table.Thead>
          <Table.Tr>
            <Table.Th w={100}>ISO code</Table.Th>
            <Table.Th>Language</Table.Th>
            <Table.Th>Own name</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {Object.keys(config.languages).map((key) => (
            <Table.Tr key={key}>
              <Table.Td><Anchor size="sm" component="a" href={`/language/${key}`}>{key}</Anchor></Table.Td>
              <Table.Td>{config.languages[key].name}</Table.Td>
              <Table.Td>{config.languages[key].ownname}</Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </Box>
  );
}
