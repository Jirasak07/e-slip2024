import { Button, Container, Grid, NumberFormatter, Select, Text } from "@mantine/core";
import { IconFileSpreadsheet, IconSearch, IconSettings } from "@tabler/icons-react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import ExcelJs from "exceljs";
import { API } from "../../Config/ConfigApi";
import { isNotEmpty, useForm } from "@mantine/form";
import { MDBDataTableV5 } from "mdbreact";
import EditIncrease from "./EditIncrease";

function HistoryImport() {
  const [DataYear, setDataYear] = useState([]);
  const column = [
    {
      label: "เลขบัตร",
      field: "customers_citizent",
      minimal: "lg",
    },
    {
      label: "สายงาน",
      field: "customers_line",
      minimal: "sm",
    },
    {
      label: "ชื่อ-นามสกุล",
      field: "customers_name",
      minimal: "lg",
    },
    {
      label: "เงินเดือนปัจจุบัน",
      field: "history_salary_salary",
      minimal: "sm",
    },
    {
      label: "เงินเดือน1.7/1.5",
      field: "history_salary_salary1715",
      minimal: "sm",
    },
    {
      label: "เงินเดือน 0.1",
      field: "history_salary_salary01",
      minimal: "sm",
    },
    {
      label: "เงินเลื่อนขั้น",
      field: "promotionmoney",
      minimal: "sm",
    },
    {
      label: "จำนวนเดือนตกเบิก",
      field: "numberofmonths",
      minimal: "sm",
    },
    {
      label: "เงินตกเบิก",
      field: "backpay",
      minimal: "sm",
    },
    {
      label: "เงินตกเบิก1.7/1.5",
      field: "backpay1715",
      minimal: "sm",
    },
    {
      label: "เงินตกเบิก01",
      field: "backpay01",
      minimal: "sm",
    },
    {
      label: "เงินตอบแทนพิเศษ",
      field: "compensation",
      minimal: "sm",
    },
    {
      label: <IconSettings />,
      field: "manage",
      minimal: "sm",
    },
  ];
  const [DataExport, setDataExport] = useState([]);
  const [Table, setTable] = useState({
    columns: column,
    rows: [],
  });
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
  const formSearch = useForm({
    initialValues: {
      idbudget: "",
      month:
        (new Date().getMonth() + 1).toString().length === 1
          ? "0" + (new Date().getMonth() + 1)
          : (new Date().getMonth() + 1).toString(),
      year: new Date().getFullYear().toString(),
      //    type: "",
      //  yearend: (new Date().getFullYear()).toString(),
    },

    validate: {
      idbudget: isNotEmpty("กรุณาเลือกประเภทงบประมาณ"),
      month: isNotEmpty("กรุณาเลือกเดือน"),
      year: isNotEmpty("กรุณาเลือกปี"),
      //  type: isNotEmpty("กรุณาเลือกประเภทรายจ่าย"),
      //  yearend: isNotEmpty("กรุณาเลือกปี"),
    },
  });
  const FetchYear = () => {
    // setLoadTable(true);
    setTimeout(() => {
      axios.get(API + "/index/showyear").then((res) => {
        // console.log(res.data);
        const data = res.data;
        if (data.length !== 0) {
          //   setLoadTable(false);
          const select = data.map((i) => ({
            value: i.name_year,
            label: i.name_year_th,
          }));
          setDataYear(select);
        }
      });
    }, 400);
  };
  const [DataBudget, setDataBudget] = useState([]);
  const FetchTypeshowBudget = () => {
    // setTimeout(() => {
    axios.get(API + "/index/showBudget").then((res) => {
      //    console.log(res.data);
      const data = res.data;
      if (data.length !== 0) {
        const select = data.map((i) => ({
          value: i.idbudget,
          label: i.namebudget + " ( " + i.idbudget + " ) ",
        }));
        setDataBudget(select);
      }
    });
    // }, 400);
  };
  useEffect(() => {
    FetchYear();
    FetchTypeshowBudget();
  }, []);
  const Sub = (value) => {
    axios
      .post(API + "/index/historyuploadsalary1715", {
        idbudget: value.idbudget,
        month: value.month,
        year: value.year,
      })
      .then((res) => {
        const data = res.data;
        setDataExport(data);
        console.log(data);
        if (data.length > 0) {
          setTable({
            columns: column,
            rows: [
              ...data.map((i) => ({
                customers_citizent: i.customers_citizent,
                customers_type: i.customers_type,
                customers_line:
                  i.customers_line === 1 || i.customers_line === "1" ? (
                    <Text c="blue">สายวิชาการ</Text>
                  ) : (
                    <Text c="red.9">สายสนับสนุน</Text>
                  ),
                customers_name: i.customers_pname + "" + i.customers_name + " " + i.customers_lname,
                history_salary_salary: (
                  <Text c="teal.8">
                    <NumberFormatter
                      thousandSeparator
                      value={i.history_salary_salary}
                      decimalScale={2}
                    />
                  </Text>
                ),
                history_salary_salary1715: i.history_salary_salary1715,
                history_salary_salary01: i.history_salary_salary01,

                promotionmoney: i.promotionmoney,
                numberofmonths: i.numberofmonths,
                backpay: i.backpay,
                backpay1715: i.backpay1715, //ตกเบิก1715
                backpay01: i.backpay01, //ตกเบิก1715
                compensation: (
                  <NumberFormatter thousandSeparator value={i.compensation} decimalScale={2} />
                ),
                manage: (
                  <>
                    <EditIncrease
                      Fetch={Fetch}
                      data={i}
                      name={i.customers_pname + "" + i.customers_name + " " + i.customers_lname}
                    />
                  </>
                ),
              })),
            ],
          });
        } else {
          setTable({
            columns: column,
            rows: [],
          });
        }
      });
  };
  const Fetch = () => {
    Sub(formSearch.values);
  };

  const ExcelExport = () => {
    const workbook = new ExcelJs.Workbook();
    const sheet = workbook.addWorksheet("Mysheet");
    sheet.properties.defaultRowHeight = 20;
    sheet.columns = [
      {
        header: "เลขบัตร",
        key: "customers_citizent",
        width: 20,
      },
      {
        header: "สายงาน",
        key: "customers_line",
        width: 20,
      },

      {
        header: "ชื่อ-นามสกุล",
        key: "customers_name",
        width: 20,
      },
      {
        header: "เงินเดือนปัจจุบัน",
        key: "history_salary_salary",
        width: 20,
      },

      {
        header: "เงินเดือน1.7/1.5",
        key: "history_salary_salary1715",
        width: 20,
      },
      {
        header: "เงินเดือน 0.1",
        key: "history_salary_salary01",
        width: 20,
      },
      {
        header: "เงินเดือนเลื่อนขั้น",
        key: "promotionmoney",
        width: 20,
      },
      {
        header: "จำนวนเดือนตกเบิก",
        key: "numberofmonths",
        width: 20,
      },
      {
        header: "เงินตกเบิก",
        key: "backpay",
        width: 20,
      },
      {
        header: "เงินตกเบิก1.7/1.5",
        key: "backpay1715",
        width: 20,
      },
      {
        header: "เงินตกเบิก01",
        key: "backpay01",
        width: 20,
      },
      {
        header: "เงินตอบแทนพิเศษ",
        key: "compensation",
        width: 20,
      },
    ];
    const data = DataExport;
    console.log(data);
    data.map((i, rowIndex) => {
      const rowNumber = rowIndex + 2;
      sheet.addRow({
        customers_citizent: i.customers_citizent,
        customers_line: i.customers_line === "1" ? "สายวิชาการ" : "สายสนับสนุน",
        customers_name: i.customers_pname + i.customers_name + " " + i.customers_lname,
        history_salary_salary: Number(i.history_salary_salary),
        history_salary_salary1715: Number(i.history_salary_salary1715),
        history_salary_salary01: Number(i.history_salary_salary01),
        promotionmoney: i.promotionmoney,
        numberofmonths: i.numberofmonths,
        backpay: i.backpay,
        backpay1715: i.backpay1715,
        backpay01: i.backpay01,
        compensation: i.compensation,
      });
      sheet.getCell(rowNumber, 1).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "BC6C25" }, // เปลี่ยนเป็นสีที่ต้องการ เช่น สีเหลือง
      };
      sheet.getCell(rowNumber, 2).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "BC6C25" },
      };
      for (let col = 1; col <= 3; col++) {
        sheet.getCell(rowNumber, col).fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "c7f9cc" },
        };
        sheet.getCell(1, col).fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "38b000" },
        };
      }
    });
    workbook.xlsx.writeBuffer().then((datas) => {
      const blob = new Blob([datas], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheet.sheet",
      });
      const url = window.URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download =
        "รายงานประวัติการนำเข้าเงินเดือนเลื่อน" +
        data[0].history_salary_year +
        "-" +
        data[0].history_salary_month +
        ".xlsx";
      DataYear;
      anchor.click();
      window.URL.revokeObjectURL(url);
    });
  };
  // "history_salary_year": "2025",
  // "history_salary_month": "01",
  // "customers_type": "4",
  return (
    <Container fluid p={0}>
      <form
        onSubmit={formSearch.onSubmit((v) => {
          Sub(v);
          // console.log(v);
        })}
      >
        <Grid gutter={{ base: 5, xs: "md", md: "xl", xl: 50 }}>
          <Grid.Col span={2}>
            <Select
              searchable
              label="งบประมาณ"
              data={DataBudget}
              {...formSearch.getInputProps("idbudget")}
            />
          </Grid.Col>
          <Grid.Col span={2}>
            <Select
              searchable
              label="เดือน"
              data={selectmount}
              {...formSearch.getInputProps("month")}
            />
          </Grid.Col>
          <Grid.Col span={2}>
            <Select searchable label="ปี" data={DataYear} {...formSearch.getInputProps("year")} />
          </Grid.Col>

          <Grid.Col span={4}>
            <Button type="submit" mt={33} leftSection={<IconSearch />}>
              ค้นหา
            </Button>
            <Button
              disabled={DataExport.length === 0}
              color="green.7"
              mt={33}
              leftSection={<IconFileSpreadsheet />}
              onClick={() => {
                ExcelExport();
              }}
            >
              Export
            </Button>
          </Grid.Col>
        </Grid>
      </form>

      <MDBDataTableV5 entries={100} responsive data={Table} />
    </Container>
  );
}

export default HistoryImport;
