import { Badge, Box, Button, Container, Divider, Flex, Image, Paper, SimpleGrid, Text, TextInput } from "@mantine/core";
import React, { useState } from "react";
import Logo from "../../assets/image/kpru.png";
import browser from "../../assets/image/browser.png";
import { IconKey } from "@tabler/icons-react";
import { useForm } from "@mantine/form";
import { useNavigate } from "react-router-dom";
function Login() {
  const [LoadingButton, setLoadingButton] = useState(false);
  const nav = useNavigate()
  const formlogin = useForm({
    initialValues: {
      username: "",
      password: "",
    },
    validate: {
      username: (v) => (v === "" ? "กรุณากรอกข้อมูล" : null),
      password: (v) => (v === "" ? "กรุณากรอกข้อมูล" : null),
    },
  });
  const onLogin = (v) => {
    setLoadingButton(true);
    setTimeout(() => {
      setLoadingButton(false);
      formlogin.reset()
      nav('/main-page')
    }, 1200);
  };

  return (
    <Container fluid w={"100dvw"} h={"100dvh"} bg={"#e5e5e5"}>
      <Flex align={"center"} direction={"column"} h={"100%"} justify={"center"}>
        <Paper shadow="xl" h={550} w={"clamp(350px,95vw,600px)"}>
          <Flex pt={15} align={"center"} direction={"column"} justify={"center"}>
            <Image src={Logo} maw={80} />
            <Text c={"var(--primary)"} fz={20} fw={600} ff={"Kanit"}>
              E-Pay Slip Online KPRU
            </Text>
            <Text c={"var(--secondary)"} fz={14} fw={500} ff={"Kanit"}>
              ระบบออกใบสลิปเงินเดือน
            </Text>
          </Flex>
          <Divider mx={"auto"} mt={"sm"} maw={300} variant="dashed" />
          <form
            onSubmit={formlogin.onSubmit((v) => {
              onLogin(v);
            })}
          >
            <Flex pt={15} align={"center"} direction={"column"} justify={"center"}>
              <SimpleGrid w={"100%"} maw={300}>
                <TextInput label="ชื่อผู้ใช้" {...formlogin.getInputProps("username")} />
                <TextInput type="password" label="รหัสผ่าน" {...formlogin.getInputProps("password")} />
                <Button
                  loading={LoadingButton}
                  loaderProps={{ type: "dots" }}
                  type="submit"
                  leftSection={<IconKey />}
                  color="var(--primary)"
                >
                  เข้าสู่ระบบ
                </Button>
              </SimpleGrid>
            </Flex>{" "}
          </form>
          <Flex justify={"center"}>
            <Box w={"100%"} maw={300}>
              <Flex pt={5} gap={10} direction={"column"} align={"start"}>
                <Badge variant="light" color="orange" radius={4}>
                  supported browser
                </Badge>{" "}
                <>
                  <Image src={browser} w={80} />
                </>
              </Flex>
            </Box>
          </Flex>
        </Paper>
      </Flex>
    </Container>
  );
}

export default Login;
