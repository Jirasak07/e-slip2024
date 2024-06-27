import { Button, Container, Divider, Flex, Image, LoadingOverlay, Paper, SimpleGrid, Text, TextInput } from "@mantine/core";
import { useEffect, useState } from "react";
import Logo from "../../assets/image/kpru.png";
// import browser from "../../assets/image/browser.png";
import { IconKey } from "@tabler/icons-react";
import { useForm } from "@mantine/form";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import { API } from "../../Components/Config/ConfigApi";
function Login() {
  useEffect(() => {
    localStorage.removeItem("citizen");
    localStorage.removeItem("fname");
    localStorage.removeItem("pname");
    localStorage.removeItem("lname");
    localStorage.removeItem("employee_id");
    localStorage.removeItem("organization_name");
    localStorage.removeItem("rank_name");
    localStorage.removeItem("type-user-epay");
  }, []);
  const [LoadingButton, setLoadingButton] = useState(false);
  const nav = useNavigate();
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
  const [OverLay, setOverLay] = useState(false);
  const onLogin = (v) => {
    setLoadingButton(true);
    axios
      .post("https://mua.kpru.ac.th/FrontEnd_Mis/login/login/", {
        txtemail: v.username,
        txtpass: v.password,
      })
      .then((res) => {
        setOverLay(false);
        setLoadingButton(false);
        const data = res.data;
        if (res.data[0].loginstatus === "1") {
          Swal.fire({
            icon: "success",
            title: "ยินดีต้อนรับ",
            text: data[0].prefix_name + data[0].frist_name + " " + data[0].last_name,
            showConfirmButton: false,
            timer: 1200,
            timerProgressBar: true,
          }).then((res) => {
            localStorage.setItem("citizen", 33 + parseInt(v.username));
            localStorage.setItem("fname", data[0].frist_name);
            localStorage.setItem("pname", data[0].prefix_name);
            localStorage.setItem("lname", data[0].last_name);
            localStorage.setItem("employee_id", data[0].employee_id);
            localStorage.setItem("organization_name", data[0].organization_name);
            localStorage.setItem("rank_name", data[0].rank_name);
            localStorage.setItem("type-user-epay", "2");
            nav("/user-salary");
          });
        } else {
          console.log("ผู้ดูแลระบบ");
          const datafrm = new FormData();
          datafrm.append("txtemail", v.username);
          datafrm.append("txtpass", v.password);

          axios
            .post(API + "/index/selectadmin", datafrm, {
              headers: {
                "content-type": "multipart/form-data",
              },
            })
            .then((res) => {
              const data = res.data;
              if (res.data.length !== 0) {
                setOverLay(false);
                //  setLoadingButton(false);
                Swal.fire({
                  icon: "success",
                  title: "ยินดีต้อนรับ",
                  text: data[0].admin_name + " " + data[0].admin_lname,
                  showConfirmButton: false,
                  timer: 1200,
                  timerProgressBar: true,
                }).then((res) => {
                  localStorage.setItem("citizen", data[0].employee_id);
                  localStorage.setItem("fname", data[0].admin_name);
                  localStorage.setItem("pname", "admin");
                  localStorage.setItem("lname", data[0].admin_lname);
                  localStorage.setItem("employee_id", data[0].employee_id);
                  localStorage.setItem("organization_name", "การเงิน");
                  localStorage.setItem("rank_name", "sdddfd");
                  localStorage.setItem("type-user-epay", data[0].admin_type);
                  // nav("/main-page");

                  if (data[0].admin_type === "super") {
                    nav("/manage-user/user");
                  } else if (data[0].admin_type === "hr") {
                    nav("/manage-user/user");
                  } else if (data[0].admin_type === "plan") {
                    nav("/report-plan");
                  }
                  // nav("/");
                });
              } else {
                setOverLay(false);
                setLoadingButton(false);
                Swal.fire({
                  icon: "warning",
                  title: "ไม่สามารถเข้าสู่ระบบได้",
                  text: "กรุณาลองใหม่อีกครั้ง",
                  showConfirmButton: false,
                  timer: 1200,
                  timerProgressBar: true,
                }).then((res) => {});
              }
            });
        }
      });
  };

  return (
    <Container fluid w={"100dvw"} h={"100dvh"}>
      <LoadingOverlay visible={OverLay} loaderProps={{ color: "var(--primary)", type: "dots" }} overlayProps={{ blur: 1 }} />
      <Flex align={"center"} direction={"column"} h={"100%"} justify={"center"}>
        <Paper shadow={"lg"} withBorder h={550} w={"clamp(350px,95vw,600px)"}>
          <Flex pt={15} align={"center"} direction={"column"} justify={"center"}>
            <Image src={Logo} maw={80} />
            <Text c={"var(--primary)"} fz={20} fw={600} ff={"Kanit"}>
              E-PaySlip Online KPRU
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
                <TextInput name="Username" label="ชื่อผู้ใช้" {...formlogin.getInputProps("username")} />
                <TextInput name="Password" type="password" label="รหัสผ่าน" {...formlogin.getInputProps("password")} />
                <Button loading={LoadingButton} loaderProps={{ type: "dots" }} type="submit" leftSection={<IconKey />} color="var(--primary)">
                  เข้าสู่ระบบ
                </Button>
              </SimpleGrid>
            </Flex>{" "}
          </form>
          {/* <Flex justify={"center"}>
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
          </Flex> */}
        </Paper>
      </Flex>
    </Container>
  );
}

export default Login;
