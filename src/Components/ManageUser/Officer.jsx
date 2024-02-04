import { Badge, Box, Button, Container, Flex, Paper, Select, SimpleGrid, Text } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { MDBDataTableV5 } from "mdbreact";
import { useEffect, useState } from "react";
function Officer() {
  const [TableUser, setTableUser] = useState([]);
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

  return (
    <>
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
          <Flex justify={"flex-end"} gap={10}>
            <Button variant="light" color="var(--success)">
              อัพเดทบุคลากรเพิ่มใหม่
            </Button>
            <Button variant="light" color="var(--danger)">
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
