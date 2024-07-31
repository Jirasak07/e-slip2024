import { Badge, Button, Container, Paper, Select, SimpleGrid, Flex, NumberFormatter } from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { IconSearch, IconPrinter } from "@tabler/icons-react";
import { MDBDataTableV5 } from "mdbreact";
import { useEffect, useState } from "react";
import { API } from "../../Config/ConfigApi";
import axios from "axios";
import Swal from "sweetalert2";
import { Text } from "@mantine/core";
import SkeletonTable from "../../Publicc-user/SkeletonTable";
import ModalAddrevenue from "./ModalAddrevenue";
import ModalExpenditure from "./ModalExpenditure";
import React from "react";
import ExcelJs from "exceljs";
function Salary() {
  const [Expenditure_true, setExpenditure_true] = useState(0);
  const [Revenue_true, setRevenue_true] = useState(0);
  const [History_salary, setHistory_salary] = useState(0);
  const [Salary_true, setSalary_true] = useState(0);
  const ExcelExport = () => {
    const workbook = new ExcelJs.Workbook();
    const sheet = workbook.addWorksheet("Mysheet");
    sheet.properties.defaultRowHeight = 15;

    sheet.columns = [
      {
        header: "ชื่อ",
        key: "name",
        width: 20,
      },
      {
        header: "เลขบัตร",
        key: "names",
        width: 20,
      },
    ];
    sheet.addRow({
      name: "สวัสดีครับ",
      names: "ครับผม",
    });

    workbook.xlsx.writeBuffer().then((data) => {
      const blob = new Blob([data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheet.sheet",
      });
      const url = window.URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = "HHH.xlsx";
      anchor.click();
      window.URL.revokeObjectURL(url);
    });
  };

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
    // {
    //   label: "ประเภทบุคลากร",
    //   field: "type_employ",
    //   minimal: "lg",
    // },
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
  const See = () => {
    submitdata(formSearch.values);
  };

  const submitdata = (value) => {
    setLoadTable(true);
    axios.get(API + "/index/showrevenueandexpenditure/" + value.type_employ + "/" + value.year + "/" + value.month).then((res) => {
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
              salary: (
                <Text c="teal.8">
                  <NumberFormatter thousandSeparator value={i.history_salary_salary} />
                </Text>
              ),
              revenue: (
                <Text c="blue">
                  <NumberFormatter thousandSeparator value={i.revenue} />
                </Text>
              ),
              expenses: (
                <Text c="red.9">
                  <NumberFormatter thousandSeparator value={i.expenditure} />
                </Text>
              ),
              total: (
                <Text c="dark.9">
                  <NumberFormatter thousandSeparator value={i.salary_true} />
                </Text>
              ),
              manage: (
                <Flex direction={"row"} gap={5}>
                  <ModalAddrevenue fn={See} idbudget={i.idbudget} year={i.history_salary_year} month={i.history_salary_month} citizent={i.customers_citizent} type={i.customers_type} />
                  <ModalExpenditure fn={See} idbudget={i.idbudget} year={i.history_salary_year} month={i.history_salary_month} citizent={i.customers_citizent} type={i.customers_type} />
                  <Button
                    onClick={() => {
                      window.open(API + "/PDF/SalarySlip.php?id=" + (parseInt(i.customers_citizent) + 33) + "&year=" + i.history_salary_year + "&month=" + i.history_salary_month + "&type=" + i.customers_type);
                    }}
                    color="var(--info)"
                    leftSection={<IconPrinter />}
                    size="xs"
                  >
                    พิมพ์
                  </Button>
                </Flex>
              ),
            })),
          ],
        });
      }
      setLoadTable(false);
      const expenditure = data.reduce((sum, current) => (sum = sum + Number(current.expenditure)), 0);
      const revenue = data.reduce((sum, current) => (sum = sum + Number(current.revenue)), 0);
      const history_salary_salary = data.reduce((sum, current) => (sum = sum + Number(current.history_salary_salary)), 0);
      const salary_true = data.reduce((sum, current) => (sum = sum + Number(current.salary_true)), 0);
      setExpenditure_true(expenditure);
      setRevenue_true(revenue);
      setHistory_salary(history_salary_salary);
      setSalary_true(salary_true);
    });
  };

  useEffect(() => {
    FetchTypeEmploy();
    FetchYear();
  }, []);

  const formSearch = useForm({
    initialValues: {
      type_employ: "",
      month: (new Date().getMonth().toString().length === 1 ? "0" + new Date().getMonth() : new Date().getMonth()).toString(),
      year: new Date().getFullYear().toString(),
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
            <SimpleGrid cols={{ base: 2, md: 4 }}>
              <Select searchable data={DataTypeEmploy} {...formSearch.getInputProps("type_employ")} label="ประเภทบุคลากร" />
              <Select searchable label="เดือน" data={selectmount} {...formSearch.getInputProps("month")} />
              <Select searchable label="ปี" data={DataYear} {...formSearch.getInputProps("year")} />
              <Button type="submit" mt={33} color="var(--primary)" leftSection={<IconSearch />}>
                ค้นหา
              </Button>
            </SimpleGrid>
          </form>
        </Paper>
        <Paper p={10} shadow="none">
          {}
          <Flex justify={"flex-end"} gap={10} direction={"column"} align={"flex-end"}>
            <Text c={"teal.9"} size="md">
              รวมเงินเดือน : <NumberFormatter value={History_salary} thousandSeparator suffix=" ฿" />
            </Text>
            <Text c={"blue"} size="md">
              รวมรายรับ : <NumberFormatter value={Revenue_true} thousandSeparator suffix=" ฿" />
            </Text>
            <Text c={"red.9"} size="md">
              รวมรายจ่าย : <NumberFormatter value={Expenditure_true} thousandSeparator suffix=" ฿" />
            </Text>
            <Text  size="md">
              รวมเงินเดือนสุทธิ : <NumberFormatter value={Salary_true} thousandSeparator suffix=" ฿" />
            </Text>
          </Flex>
        </Paper>
        <Paper pt={20}>{LoadTable ? <SkeletonTable /> : <MDBDataTableV5 entries={100} data={TableSalary} responsive striped searchLabel="ค้นหาจากเลขบัตร หรือ ชื่อ" barReverse searchTop searchBottom={false} noRecordsFoundLabel="ไม่พบรายการ" />}</Paper>
      </Container>
      {/* <Button onClick={()=>{ExcelExport()}} color="green" >ExcelExport</Button> */}
    </>
  );
}

export default Salary;
