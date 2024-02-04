import { Badge, Box, Button, Container, Flex, LoadingOverlay, Paper, Select, SimpleGrid, Text } from "@mantine/core";
import { IconRefresh, IconSearch, IconUserCancel } from "@tabler/icons-react";
import { MDBDataTableV5 } from "mdbreact";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
function Officer() {
  const [TableUser, setTableUser] = useState([]);
  const [OverLayLoad, setOverLayLoad] = useState(false);
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
  const FetchData = (params) => {
    setTableUser({
      columns: columns,
      rows: [],
    });
  };

  useEffect(() => {
    FetchData();
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
    });
  };

  return (
    <>
      <LoadingOverlay
        visible={OverLayLoad}
        loaderProps={{ type: "dots", color: "var(--primary)" }}
        overlayProps={{ radius: "sm", blur: 1 }}
      />
      <Badge color="var(--primary)" variant="light" size="lg" radius={8}>
        ข้อมูลบุคลากร
      </Badge>
      <Container bg={"white"} fluid>
        <Paper mt={10}>
          <Text>รายการบุคลากร </Text>
        </Paper>
        <Paper>
          <SimpleGrid cols={{ base: 1, sm: 2 }}>
            <Select />
            <Box>
              <Button leftSection={<IconSearch />}>ค้นหา</Button>
            </Box>
          </SimpleGrid>
        </Paper>
        <Paper shadow="xs" p={10} my={10}>
          <Flex justify={"flex-end"} direction={{base:'column',md:'row'}}  gap={10}>
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
        <Paper shadow="md" p={10} mt={10}>
          <MDBDataTableV5
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
