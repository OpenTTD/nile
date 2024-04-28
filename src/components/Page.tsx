'use client';
import { AppShell, Container } from "@mantine/core"
import { Header } from "./Header"
import { Listing } from "./Listing"

export const Page = () => {
  return (
    <AppShell header={{ height: 60 }} padding="md">
      <AppShell.Header>
        <Header />
      </AppShell.Header>
      <AppShell.Main>
        <Container>
          <Listing />
        </Container>
      </AppShell.Main>
    </AppShell>
  )
}
