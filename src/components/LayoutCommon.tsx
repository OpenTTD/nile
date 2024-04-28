'use client';
import { AppShell, Container } from "@mantine/core"
import { Header } from "./Header"

export const LayoutCommon = ({ navigation, ref, children }: { navigation?: React.ReactNode, ref?: React.RefObject<any>, children: React.ReactNode }) => {
  return (
    <AppShell header={{ height: 60 }} padding="md" ref={ref}>
      <AppShell.Header>
        <Header />
      </AppShell.Header>
      {navigation !== undefined && <AppShell.Navbar p="md" w={300}>
        {navigation}
      </AppShell.Navbar>}
      <AppShell.Main>
        <Container>
          {children}
        </Container>
      </AppShell.Main>
    </AppShell>
  )
}
