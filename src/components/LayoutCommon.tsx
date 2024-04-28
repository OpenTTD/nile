'use client';
import { AppShell, Burger, Container, Group } from "@mantine/core"
import { Header } from "./Header"
import { useDisclosure } from "@mantine/hooks";

export const LayoutCommon = ({ navigation, ref, children }: { navigation?: React.ReactNode, ref?: React.RefObject<any>, children: React.ReactNode }) => {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell header={{ height: 60 }} navbar={{ width: { sm: 200, lg: 300 }, breakpoint: 'sm', collapsed: { mobile: !opened } }} padding="md" ref={ref}>
      <AppShell.Header>
        <Group h="100%">
          {navigation !== undefined && <Burger
            opened={opened}
            onClick={toggle}
            hiddenFrom="sm"
            size="sm"
            p="md"
          />}
          <Header />
        </Group>
      </AppShell.Header>
      {navigation !== undefined && <AppShell.Navbar p="md">
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
