import { Badge, Button, Container, Paper, Select, SimpleGrid } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconSearch } from "@tabler/icons-react";
import { MDBDataTableV5 } from "mdbreact";
import { useEffect, useState } from "react";

function Salary() {
  const column = [
    {
      label: "#",
      field: "no",
      minimal: "lg",
    },
    {
      label: "เลขบัตร",
      field: "citizen",
      minimal: "lg",
    },
    {
      label: "ชื่อ-นามสกุล",
      field: "name",
      minimal: "lg",
    },
    {
      label: "ประเภทบุคลากร",
      field: "type_employ",
      minimal: "lg",
    },
    {
      label: "เงินเดือน",
      field: "salary",
      minimal: "lg",
    },
    {
      label: "รายรับ",
      field: "revenue",
      minimal: "lg",
    },
    {
      label: "รายจ่าย",
      field: "expenses",
      minimal: "lg",
    },
    {
      label: "รายจ่าย/นอก",
      field: "expenses-out",
      minimal: "lg",
    },
    {
      label: "ยอดสุทธิ",
      field: "total",
      minimal: "lg",
    },
    {
      label: "จัดการ",
      field: "manage",
      minimal: "lg",
    },
  ];
  const [TableSalary, setTableSalary] = useState({
    columns: column,
    rows: [],
  });
  useEffect(() => {}, []);
  const formSearch = useForm({
    initialValues: {
      type_employ: "",
      month: "",
      year: "",
    },
    validate: {
      type_employ: (v) => (v !== "" ? null : "กรุณาเลือกประเภทบุคลากร"),
      month: (v) => (v !== "" ? null : "กรุณาเลือกเดือน"),
      year: (v) => (v !== "" ? null : "กรุณาเลือกปี"),
    },
  });
  return (
    <>
      <Container p={0} bg={"white"} fluid>
        <Badge color="var(--primary)" variant="light" size="md" radius={8}>
          จัดการข้อมูลเงินเดือน
        </Badge>
        <Paper mt={20}>
          <form
            onSubmit={formSearch.onSubmit((v) => {
              console.log(v);
            })}
          >
            <SimpleGrid cols={4}>
              <Select {...formSearch.getInputProps("type_employ")} label="ประเภทบุคลากร" />
              <Select label="เดือน" {...formSearch.getInputProps("month")} />
              <Select label="ปี" {...formSearch.getInputProps("year")} />
              <Button type="submit" mt={33} leftSection={<IconSearch />}>
                ค้นหา
              </Button>
            </SimpleGrid>
          </form>
        </Paper>
        <Paper pt={20}>
          <MDBDataTableV5
            data={TableSalary}
            responsive
            striped
            searchLabel="ค้นหาจากเลขบัตร หรือ ชื่อ"
            barReverse
            searchTop
            searchBottom={false}
            noRecordsFoundLabel="ไม่พบรายการ"
          />
        </Paper>
      </Container>
    </>
  );
}

export default Salary;
