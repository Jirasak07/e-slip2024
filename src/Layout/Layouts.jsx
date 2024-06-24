import { AppShell, Avatar, Badge, Burger, Button, Divider, Flex, LoadingOverlay, NavLink, Paper, ScrollArea, Text } from "@mantine/core";
import { useDisclosure, useViewportSize } from "@mantine/hooks";
import { IconLogout2, IconWallet } from "@tabler/icons-react";
import { useEffect, useRef, useState } from "react";
import { NavLink as Nl, Outlet, useNavigate } from "react-router-dom";
import { menus } from "./MenuData";
import Steppers from "../Components/Publicc-user/Stepper";
import axios from "axios";
import { API } from "../Components/Config/ConfigApi";
export function Layouts() {
  const [opened, { toggle }] = useDisclosure();
  const [IndexMenu, setIndexMenu] = useState(0);
  const [INdexSub, setINdexSub] = useState(0);
  const [menu, setmenu] = useState([]);
  const nav = useNavigate();
  const type = localStorage.getItem("type-user-epay");
  const Fetch = async () => {
    try {
      if (type === null || type === "" || type === undefined) {
        nav("/login");
      }
      const menu2 = await menus.findIndex((menu) => menu.type === type);
      const menuu = await menus[menu2];
      const menu = await menuu.data;
      console.log(localStorage.getItem("type-user-epay"));
      if (menu.length !== 0) {
        const indexmenu = menu.findIndex((menu) => "/testslip" + menu.path === window.location.pathname);
        console.log("/" + window.location.pathname.split("/")[1] + "/" + window.location.pathname.split("/")[2]);
        if (indexmenu === -1) {
          const indexmenus = menu.findIndex((menu) => "/testslip" + menu.path === "/" + window.location.pathname.split("/")[1] + "/" + window.location.pathname.split("/")[2]);
          if (indexmenus === -1) {
            nav("/login");
          } else {
            const indexsub = menu[indexmenus].sub.findIndex((sub) => "/testslip" + sub.path === window.location.pathname);
            setIndexMenu(indexmenus);
            setINdexSub(indexsub);
          }
        } else {
          setIndexMenu(indexmenu);
        }
        setmenu(menu);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // const menu2 = menus.findIndex((menu) => menu.type === localStorage.getItem("bee"));
    Fetch();
  }, []);
  const { height, width } = useViewportSize();
  console.log(height);
  const [LoadLogout, setLoadLogout] = useState(false);
  const [OverLay, setOverLay] = useState(false);
  return (
    <AppShell padding={30} header={{ height: { base: 50, md: 0 } }} navbar={{ width: 300, breakpoint: "md", collapsed: { mobile: !opened } }}>
      <AppShell.Header hiddenFrom="md" bg={"var(--primary)"}>
        <Flex h="100%" align={"center"} justify={"space-between"} pr={10}>
          <Flex justify={"center"} w={"95%"}>
            <IconWallet color="white" /> <Text c="white">E-Pay Slip Online KPRU</Text>
          </Flex>
          <Burger color="white" opened={opened} onClick={toggle} hiddenFrom="md" size="md" />
        </Flex>
      </AppShell.Header>
      <AppShell.Navbar>
        {" "}
        <Flex visibleFrom="md" direction={"column"}>
          <Flex pb={0} mih={50} align={"flex-end"} justify={"center"} gap={10}>
            <IconWallet stroke={2} size={30} color="var(--primary)" />{" "}
            <Text fw={600} fz={20} c="var(--primary)">
              E-Pay Slip Online KPRU
            </Text>
          </Flex>
          <Flex justify={"center"}>
            <Text c="teal">ระบบออกใบสลิปเงินเดือน</Text>
          </Flex>
          <Divider my={"md"} variant="dashed" size={"sm"} />
        </Flex>
        <Flex direction={"column"} justify={"space-between"}>
          <ScrollArea h={"90dvh"} type="always">
            {" "}
            <Flex direction={"column"} pb={10}>
              <Flex direction={"column"} pt={0} gap={10} px={10}>
                {" "}
                <Flex justify={"flex-start"} gap={5} align={"center"}>
                  <Avatar color="var(--primary)" size={"md"}>
                    {localStorage.getItem("fname") !== null ? localStorage.getItem("fname").substring(0, 1) : ""}
                  </Avatar>
                  <Badge variant="white" color="var(--primary)" size="lg" radius={8}>
                    {localStorage.getItem("fname") + " " + localStorage.getItem("lname")}
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
                          onClick={() => {
                            console.log(keymenu);
                          }}
                          active={"/" + window.location.pathname.split("/")[2] === menu.path ? true : false}
                          defaultOpened={"/" + window.location.pathname.split("/")[2] === menu.path ? true : false}
                          label={menu.title}
                          key={keymenu}
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
              </Flex>{" "}
            </Flex>
            <Divider variant="dashed" />
            <Paper pb={10} px={10}>
              <Button
                w={"100%"}
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
            </Paper>
          </ScrollArea>{" "}
        </Flex>
      </AppShell.Navbar>
      <AppShell.Main>
        {/* <ScrollArea  scrollbars="xy" m={0}  h={height} type="always"> */}
        <Steppers />
        <LoadingOverlay loaderProps={{ type: "oval", color: "var(--primary)" }} visible={OverLay} />
        <Outlet />
        {/* </ScrollArea> */}
      </AppShell.Main>
    </AppShell>
  );
}
