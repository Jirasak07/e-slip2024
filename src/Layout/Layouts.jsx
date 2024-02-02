import {
  AppShell,
  Burger,
  Container,
  Flex,
  Group,
  Paper,
  Skeleton,
  Text,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconBrandKbin, IconWallet } from "@tabler/icons-react";

export function Layouts() {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: { base: 50, sm: 0 } }}
      navbar={{ width: 300, breakpoint: "sm", collapsed: { mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header hiddenFrom="sm" bg={"var(--primary)"}>
        <Flex h="100%" align={"center"} justify={"space-between"} pr={10}>
          <Flex justify={"center"} w={"95%"}>
            <IconWallet color="white" /> <Text c="white">PAY-SLIP KPRU</Text>
          </Flex>
          <Burger
            color="white"
            opened={opened}
            onClick={toggle}
            hiddenFrom="sm"
            size="md"
          />
        </Flex>
      </AppShell.Header>
      <AppShell.Navbar>
        <Flex direction={"column"} >
          <Flex visibleFrom="sm" direction={"column"}>
            <Flex
              pb={0}
              mih={50}
              align={"flex-end"}
              justify={"center"}
              gap={10}
            >
              <IconWallet stroke={2} size={30} color="var(--primary)" />{" "}
              <Text fw={600} fz={20} c="var(--primary)">
                PAY-SLIP KPRU
              </Text>
            </Flex>
            <Flex justify={"center"}>
              <Text c="teal">ระบบเงินเดือน</Text>
            </Flex>

            <Flex></Flex>
          </Flex>
          Menuuuuu
        </Flex>
      </AppShell.Navbar>
      <AppShell.Main>หกฟหกasdfhgsajdhg</AppShell.Main>
    </AppShell>
  );
}
