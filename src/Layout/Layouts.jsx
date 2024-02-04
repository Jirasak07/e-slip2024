import {
  AppShell,
  Burger,
  Button,
  Container,
  Flex,
  Group,
  NavLink,
  Paper,
  SimpleGrid,
  Skeleton,
  Text,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconBrandKbin, IconHome, IconHome2, IconLogout2, IconWallet } from "@tabler/icons-react";
import {NavLink as Nl} from 'react-router-dom'
export function Layouts() {
  const [opened, { toggle }] = useDisclosure();
  const menu = [
    {
      title: "หน้าหลัก",
      path: "/main-page",
      icon: <IconHome/>,
      sub: [],
    },
  ];
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
        <Flex direction={"column"}>
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
          <Flex direction={"column"} pt={20} gap={10} px={10}>
           {menu.map((menu,keymenu)=>(
          <NavLink leftSection={menu.icon} active={keymenu===0} component={Nl} key={keymenu} label={menu.title} />
           ))}
            <Button
              fw={500}
              leftSection={<IconLogout2 />}
              color="red"
              variant="light"
            >
              ออกจากระบบ
            </Button>
          </Flex>
        </Flex>
      </AppShell.Navbar>
      <AppShell.Main>หกฟหกasdfhgsajdhg</AppShell.Main>
    </AppShell>
  );
}
