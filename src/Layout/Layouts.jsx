import {
  AppShell,
  Avatar,
  Badge,
  Burger,
  Button,
  Flex,
  LoadingOverlay,
  NavLink,
  ScrollArea,
  Text,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconLogout2, IconWallet } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { NavLink as Nl, Outlet, useNavigate } from "react-router-dom";
import { menus } from "./MenuData";
export function Layouts() {
  const [opened, { toggle }] = useDisclosure();
  const [IndexMenu, setIndexMenu] = useState(0);
  const [INdexSub, setINdexSub] = useState(0);
  const [menu, setmenu] = useState([]);
  const nav = useNavigate();
  useEffect(() => {
    // const menu2 = menus.findIndex((menu) => menu.type === localStorage.getItem("bee"));
    const menu2 = menus.findIndex((menu) => menu.type === "1");
    const menu = menus[menu2].data;
    const indexmenu = menu.findIndex((menu) => menu.path === window.location.pathname);
    console.log(indexmenu);
    if (indexmenu === -1) {
      const indexmenus = menu.findIndex((menu) => menu.path === "/" + window.location.pathname.split("/")[1]);
      if (indexmenus === -1) {
        console.log("ไม่ใช่");
        nav("/login");
      } else {
        const indexsub = menu[indexmenus].sub.findIndex((sub) => sub.path === window.location.pathname);
        setIndexMenu(indexmenus);
        setINdexSub(indexsub);
      }
    } else {
      setIndexMenu(indexmenu);
    }
    setmenu(menu);
  }, []);
  const [LoadLogout, setLoadLogout] = useState(false);
  const [OverLay, setOverLay] = useState(false);
  return (
    <AppShell
      header={{ height: { base: 50, sm: 0 } }}
      navbar={{ width: 350, breakpoint: "sm", collapsed: { mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header hiddenFrom="sm" bg={"var(--primary)"}>
        <Flex h="100%" align={"center"} justify={"space-between"} pr={10}>
          <Flex justify={"center"} w={"95%"}>
            <IconWallet color="white" /> <Text c="white">PAY-SLIP KPRU</Text>
          </Flex>
          <Burger color="white" opened={opened} onClick={toggle} hiddenFrom="sm" size="md" />
        </Flex>
      </AppShell.Header>
      <AppShell.Navbar>
        {" "}
        <Flex visibleFrom="sm" direction={"column"}>
          <Flex pb={0} mih={50} align={"flex-end"} justify={"center"} gap={10}>
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
        <ScrollArea>
          {" "}
          <Flex direction={"column"} pb={10}>
            <Flex direction={"column"} pt={20} gap={10} px={10}>
              {" "}
              <Flex justify={"flex-start"} gap={5} align={"center"}>
                <Avatar color="var(--primary)" size={"md"}>
                  จิ
                </Avatar>
                <Badge variant="white" color="var(--primary)" size="lg" radius={8}>
                  จิรศักดิ์ สิงหบุตร
                </Badge>
              </Flex>
              {Array.isArray(menu) &&
                menu.map((menu, keymenu) =>
                  menu.sub.length === 0 ? (
                    <NavLink
                      variant="filled"
                      color="var(--primary)"
                      leftSection={menu.icon}
                      active={keymenu === IndexMenu}
                      component={Nl}
                      key={keymenu}
                      label={menu.title}
                      to={menu.path}
                      onClick={() => {
                        toggle();
                        setIndexMenu(keymenu);
                      }}
                    />
                  ) : (
                    <>
                      <NavLink
                        color="var(--primary)"
                        variant="filled"
                        active={"/" + window.location.pathname.split("/")[1] === menu.path ? true : false}
                        defaultOpened={"/" + window.location.pathname.split("/")[1] === menu.path ? true : false}
                        label={menu.title}
                        leftSection={menu.icon}
                      >
                        {Array.isArray(menu.sub) &&
                          menu.sub.map((sub, keysub) => (
                            <NavLink
                              color="var(--primary)"
                              key={keysub}
                              component={Nl}
                              label={sub.title}
                              leftSection={sub.icon}
                              to={sub.path}
                              onClick={() => {
                                toggle();
                                setIndexMenu(keymenu);
                                setINdexSub(keysub);
                              }}
                              active={keymenu === IndexMenu && keysub === INdexSub ? true : false}
                            />
                          ))}
                      </NavLink>
                    </>
                  )
                )}
              <Button
                loading={LoadLogout}
                loaderProps={{ type: "dots" }}
                onClick={() => {
                  setLoadLogout(true);
                  setTimeout(() => {
                    setLoadLogout(false);
                    setOverLay(true);
                    setTimeout(() => {
                      setOverLay(false);
                      nav("/login");
                    }, 800);
                  }, 800);
                }}
                fw={500}
                leftSection={<IconLogout2 />}
                color="red"
                variant="light"
              >
                ออกจากระบบ
              </Button>
            </Flex>{" "}
          </Flex>
        </ScrollArea>
      </AppShell.Navbar>
      <AppShell.Main>
        <LoadingOverlay loaderProps={{ type: "oval", color: "var(--primary)" }} visible={OverLay} />
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}
