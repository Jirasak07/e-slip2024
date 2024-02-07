import { Badge, Box, Button, Container, Flex, LoadingOverlay, Paper, Select, SimpleGrid, Text } from "@mantine/core";
import { IconRefresh, IconSearch, IconUserCancel } from "@tabler/icons-react";
import axios from "axios";
import { MDBDataTableV5 } from "mdbreact";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { API } from "../Config/ConfigApi";
import { isNotEmpty, useForm } from "@mantine/form";
function Officer() {
  const [TableUser, setTableUser] = useState([]);
  const [OverLayLoad, setOverLayLoad] = useState(false);
  const [DataSelectTypeCustomer, setDataSelectTypeCustomer] = useState([]);
  const columns = [
    {
      label: "ลำดับ",
      field: "no",
    },
    {
      label: "เลขบัตรประชาชน",
      field: "citizen",
    },
    {
      label: "ชื่อ-นามสกุล",
      field: "name",
    },
    {
      label: "ธนาคาร",
      field: "bank",
    },
    {
      label: "จัดการ",
      field: "manage",
    },
  ];
  const FetchTypeCustomer = (params) => {
    axios.get(API + "/index/showcustomertype").then((res) => {
      // console.log(res.data);
      const data = res.data;
      if (data.length !== 0) {
        const menu = data.map((i) => ({
          value: i.customer_type_id,
          label: i.customer_type_name,
        }));
        setDataSelectTypeCustomer(menu);
      }
    });
  };

  const FetchData = (v) => {
    console.log(v)
    // setOverLayLoad(true);
    // setTimeout(() => {
    //   setOverLayLoad(false);
    // }, 1200);
  };
  const formSearch = useForm({
    initialValues: {
      customer_type_id: "",
    },
    validate: {
      customer_type_id:isNotEmpty("กรุณาเลือกประเภทบุคลากร"),
    },
  });
  useEffect(() => {
    FetchTypeCustomer();
    setTableUser({
      columns: columns,
      rows: [],
    });
  }, []);
  const UpdateUserAdd = (params) => {
    Swal.fire({
      icon: "info",
      title: "ยืนยันอัพเดทบุคลากรใหม่",
      confirmButtonText: "ยืนยัน",
      confirmButtonColor: "var(--success)",
      showCancelButton: true,
      cancelButtonText: "ยกเลิก",
      cancelButtonColor: "var(--danger)",
    }).then((res) => {
      if (res.isConfirmed === true) {
        setOverLayLoad(true);
        setTimeout(() => {
          setOverLayLoad(false);
        }, 1200);
      }
    });
  };
  const UpdateStatusUserOut = (params) => {
    Swal.fire({
      icon: "warning",
      title: "ยืนยันอัพเดทสถานะบุคลากรลาออก",
      confirmButtonText: "ยืนยัน",
      confirmButtonColor: "var(--success)",
      showCancelButton: true,
      cancelButtonText: "ยกเลิก",
      cancelButtonColor: "var(--danger)",
    }).then((res) => {
      if (res.isConfirmed === true) {
        setOverLayLoad(true);
        setTimeout(() => {
          setOverLayLoad(false);
        }, 1200);
      }
    });
  };
  return (
    <>
      <LoadingOverlay
        visible={OverLayLoad}
        loaderProps={{ type: "dots", color: "var(--primary)" }}
        overlayProps={{ radius: "sm", blur: 1 }}
      />

      <Container p={0} bg={"white"} fluid>
        <Badge color="var(--primary)" variant="light" size="md" radius={8}>
          ข้อมูลบุคลากร
        </Badge>
        <Paper mt={15}>
          <form
            onSubmit={formSearch.onSubmit((v) => {
              FetchData(v);
            })}
          >
            <SimpleGrid cols={{ base: 1, sm: 2 }}>
              <Select
                withAsterisk
                label="ประเภทบุคลากร"
                {...formSearch.getInputProps("customer_type_id")}
                searchable
                data={DataSelectTypeCustomer}
              />
              <Box mt={{ base: 0, sm: 33 }}>
                <Button color="var(--info)" type="submit" leftSection={<IconSearch />}>
                  ค้นหา
                </Button>
              </Box>
            </SimpleGrid>
          </form>
        </Paper>
        <Paper shadow="xs" p={10} my={10}>
          <Flex justify={"flex-end"} direction={{ base: "column", md: "row" }} gap={10}>
            <Button
              onClick={() => UpdateUserAdd()}
              leftSection={<IconRefresh />}
              variant="light"
              color="var(--success)"
            >
              อัพเดทบุคลากรเพิ่มใหม่
            </Button>
            <Button
              onClick={() => UpdateStatusUserOut()}
              leftSection={<IconUserCancel />}
              variant="light"
              color="var(--danger)"
            >
              อัพเดทสถานะบุคลากรลาออก
            </Button>
          </Flex>
        </Paper>
        <Paper mt={10}>
          <Text>รายการบุคลากร</Text>
        </Paper>
        <Paper shadow="md" p={10} mt={10}>
          <MDBDataTableV5
            responsive
            striped
            searchLabel="ค้นหาจากเลขบัตร หรือ ชื่อ"
            barReverse
            searchTop
            searchBottom={false}
            data={TableUser}
            noRecordsFoundLabel="ไม่พบรายการ"
          />
        </Paper>
      </Container>
    </>
  );
}

export default Officer;
