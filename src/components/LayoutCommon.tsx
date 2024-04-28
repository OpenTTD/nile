'use client';
import { AppShell, Container } from "@mantine/core"
import { Header } from "./Header"

export const LayoutCommon = ({ children }: { children: React.ReactNode }) => {
  return (
    <AppShell header={{ height: 60 }} padding="md">
      <AppShell.Header>
        <Header />
      </AppShell.Header>
      <AppShell.Main>
        <Container>
          {children}
        </Container>
      </AppShell.Main>
    </AppShell>
  )
}
