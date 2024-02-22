import { Badge, Button, Container, Paper, Select, SimpleGrid, Flex } from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { IconSearch } from "@tabler/icons-react";
import { MDBDataTableV5 } from "mdbreact";
import { useEffect, useState } from "react";
import { API } from "../../Config/ConfigApi";
import axios from "axios";
import Swal from "sweetalert2";
import { Text } from "@mantine/core";
import SkeletonTable from "../../Publicc-user/SkeletonTable";
import ModalAddrevenue from "./ModalAddrevenue";
import ModalExpenditure from "./ModalExpenditure";



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
  const [LoadTable, setLoadTable] = useState(false);
  const [DataTypeEmploy, setDataTypeEmploy] = useState([]);
  const [DataYear, setDataYear] = useState([]);

  const selectmount = [
    {
      value: "01",
      label: "มกราคม",
    },
    {
      value: "02",
      label: "กุมภาพันธ์",
    },
    {
      value: "03",
      label: "มีนาคม",
    },
    {
      value: "04",
      label: "เมษายน",
    },
    {
      value: "05",
      label: "พฤษภาคม",
    },
    {
      value: "06",
      label: "มิถุนายน",
    },
    {
      value: "07",
      label: "กรกฎาคม",
    },
    {
      value: "08",
      label: "สิงหาคม",
    },
    {
      value: "09",
      label: "กันยายน",
    },
    {
      value: "10",
      label: "ตุลาคม",
    },
    {
      value: "11",
      label: "พฤศจิกายน",
    },
    {
      value: "12",
      label: "ธันวาคม",
    },
  ];

  const FetchTypeEmploy = () => {
    setLoadTable(true);
    setTimeout(() => {
      axios.get(API + "/index/showcustomertype").then((res) => {
        //    console.log(res.data);
        const data = res.data;
        if (data.length !== 0) {
          setLoadTable(false);
          const select = data.map((i) => ({
            value: i.customer_type_id,
            label: i.customer_type_name,
          }));
          setDataTypeEmploy(select);
        }
      });
    }, 400);
  };

  const FetchYear = () => {
    // setLoadTable(true);
    setTimeout(() => {
      axios.get(API + "/index/showyear").then((res) => {
        // console.log(res.data);
        const data = res.data;
        if (data.length !== 0) {
          setLoadTable(false);
          const select = data.map((i) => ({
            value: i.name_year,
            label: i.name_year_th,
          }));
          setDataYear(select);
        }
      });
    }, 400);
  };

  const submitdata = (value) => {
    console.log(value.type_employ);
    console.log(value.month);
    console.log(value.year);
    // const datafrm = new FormData(); //สร้างฟอร์มสำหรับการส่งข้อมูล
    // datafrm.append("namebudget", initialValues.name);
    // datafrm.append("levelbudget", initialValues.levelbudget);

    setLoadTable(true);

    axios
      .get(API + "/index/showrevenueandexpenditure/" + value.type_employ + "/" + value.year + "/" + value.month)
      .then((res) => {
        console.warn(res);
        const data = res.data;
        if (data.lenth !== 0) {
          setTableSalary({
            columns: column,
            rows: [
              ...data.map((i, key) => ({
                no: key + 1,
                citizen: i.customers_citizent,
                name: i.customers_pname + i.customers_name + " " + i.customers_lname,
                type_employ: i.customer_type_name,
                salary: <Text c="teal.8">{i.history_salary_salary}</Text>,
                revenue: <Text c="blue">{i.revenue}</Text>,
                expenses: <Text c="red.9">{i.expenditure}</Text>,
                total: <Text c="dark.9">{i.salary_true}</Text>,
                manage: (<Flex direction={"row"} gap={5}>
                        <ModalAddrevenue year={i.history_salary_year} month={i.history_salary_month} citizent={i.customers_citizent} type={i.customers_type}/> 
                        <ModalExpenditure year={i.history_salary_year} month={i.history_salary_month} citizent={i.customers_citizent} type={i.customers_type}/>
                        </Flex>)
                ,
              })),
            ],
          });
        }
        setLoadTable(false);
      });
  };

  useEffect(() => {
    FetchTypeEmploy();
    FetchYear();
  }, []);

  const formSearch = useForm({
    initialValues: {
      type_employ: "",
      month: (new Date().getMonth().toString().length === 1
        ? "0" + new Date().getMonth()
        : new Date().getMonth()
      ).toString(),
      year:(new Date().getFullYear()).toString(),
    },

    validate: {
      type_employ: isNotEmpty("กรุณาเลือกประเภทบุคลากร"),
      month: isNotEmpty("กรุณาเลือกเดือน"),
      year: isNotEmpty("กรุณาเลือกปี"),
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
              submitdata(v);
              // console.log(v);
            })}
          >
            <SimpleGrid cols={4}>
              <Select data={DataTypeEmploy} {...formSearch.getInputProps("type_employ")} label="ประเภทบุคลากร" />
              <Select label="เดือน" data={selectmount} {...formSearch.getInputProps("month")} />
              <Select label="ปี" data={DataYear} {...formSearch.getInputProps("year")} />
              <Button type="submit" mt={33} leftSection={<IconSearch />}>
                ค้นหา
              </Button>
            </SimpleGrid>
          </form>
        </Paper>
        <Paper pt={20}>
          {LoadTable ? (
            <SkeletonTable />
          ) : (
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
          )}
        </Paper>
      </Container>
    </>
  );
}

export default Salary;
