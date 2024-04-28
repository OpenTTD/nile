'use client'
import React from "react";
import Link from "next/link";
import { Button, Group, List, Text, ThemeIcon, Title, rem } from "@mantine/core";
import { IconCheck } from "@tabler/icons-react";

export const MainPage = () => {
  return (
    <div>
      <div>
        <Title>
          Nile - The translation tool for OpenTTD
        </Title>
        <Text c="dimmed" mt="md">
          Translate OpenTTD in your native language.
        </Text>

        <List
          mt={30}
          spacing="sm"
          size="sm"
          icon={
            <ThemeIcon size={20} radius="xl">
              <IconCheck style={{ width: rem(12), height: rem(12) }} stroke={1.5} />
            </ThemeIcon>
          }
        >
          <List.Item>
            <b>Web-based</b> – from the comfort of your own browser
          </List.Item>
          <List.Item>
            <b>Fast</b> – quickly go through all 4000+ strings in OpenTTD
          </List.Item>
          <List.Item>
            <b>Responsive</b> – whether you are on your desktop or mobile, we got you covered
          </List.Item>
        </List>

        <Group mt={30}>
          <Button radius="xl" size="md">
            Get started
          </Button>
          <Button variant="default" radius="xl" size="md" component={Link} href="/languages">
            Supported languages
          </Button>
        </Group>
      </div>
    </div>
  );
}
