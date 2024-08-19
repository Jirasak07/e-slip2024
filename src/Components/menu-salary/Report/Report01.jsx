import {
  Button,
  Container,
  Flex,
  Grid,
  LoadingOverlay,
  NumberFormatter,
  Paper,
  Select,
  SimpleGrid,
  Text,
} from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { IconFileSpreadsheet, IconSearch } from "@tabler/icons-react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { API } from "../../Config/ConfigApi";
import ExcelJs from "exceljs";
function Report01() {
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
      month: (new Date().getMonth().toString().length === 1
        ? "0" + new Date().getMonth()
        : new Date().getMonth()
      ).toString(),
      year: new Date().getFullYear().toString(),
      data: [],
      //    type: "",
      //  yearend: (new Date().getFullYear()).toString(),
    },

    validate: {
      idbudget: isNotEmpty("กรุณาเลือกประเภทงบประมาณ"),
      month: isNotEmpty("กรุณาเลือกเดือน"),
      year: isNotEmpty("กรุณาเลือกปี"),
    },
  });
  const Sub = (value) => {
    setLoad(true);
    axios
      .post(API + "/index/Show01", {
        idbudget: value.idbudget,
        month: value.month,
        year: value.year,
      })
      .then((res) => {
        setLoad(false);
        formSearch.setValues({ data: res.data });
      });
  };
  const [DataYear, setDataYear] = useState([]);
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
  const [Load, setLoad] = useState(false);
  useEffect(() => {
    FetchYear();
    FetchTypeshowBudget();
  }, []);
  const ExcelExport = () => {
    axios
      .post(API + "/index/historyuploadsalary1715s", {
        idbudget: formSearch.values.idbudget,
        month: formSearch.values.month,
        year: formSearch.values.year,
      })
      .then((res) => {
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
        ];
        const data = res.data;

        // const revenue = data.reduce((sum, current) => (sum = sum + Number(current.revenue)), 0);
        // const history_salary_salary = data.reduce(
        //   (sum, current) => (sum = sum + Number(current.history_salary_salary)),
        //   0
        // );
        // const salary_true = data.reduce(
        //   (sum, current) => (sum = sum + Number(current.salary_true)),
        //   0
        // );
        // let formattedNumber = Math.floor(expenditure * 100) / 100;
        // let formattedrevenue = Math.floor(revenue * 100) / 100;
        // let formattedhistory_salary_salary = Math.floor(history_salary_salary * 100) / 100;
        // let formattedsalary_true = Math.floor(salary_true * 100) / 100;
        // setExpenditure_true(formattedNumber.toFixed(2));
        // setRevenue_true(formattedrevenue.toFixed(2));
        // setHistory_salary(formattedhistory_salary_salary.toFixed(2));
        // setSalary_true(formattedsalary_true.toFixed(2));

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
        const sumsalary = data.reduce(
          (sum, current) => (sum = sum + Number(current.history_salary_salary)),
          0
        );
        const sumsalary1715 = data.reduce(
          (sum, current) => (sum = sum + Number(current.history_salary_salary1715)),
          0
        );
        const sumsalary01 = data.reduce(
          (sum, current) => (sum = sum + Number(current.history_salary_salary01)),
          0
        );
        let formattedsumsalary = Math.floor(sumsalary * 100) / 100;
        const formattedsumsalarytrue = formattedsumsalary.toFixed(2);
        let formattedsumsalary1715 = Math.floor(sumsalary1715 * 100) / 100;
        const formattedsumsalarytrue1715 = formattedsumsalary1715.toFixed(2);
        let formattedsumsalary01 = Math.floor(sumsalary01 * 100) / 100;
        const formattedsumsalarytrue01 = formattedsumsalary01.toFixed(2);
        sheet.addRow({
          customers_citizent: 'รวม',
          customers_line: '',
          customers_name: '',
          history_salary_salary: formattedsumsalarytrue,
          history_salary_salary1715: formattedsumsalarytrue1715,
          history_salary_salary01: formattedsumsalarytrue01,
        });
        workbook.xlsx.writeBuffer().then((data) => {
          const blob = new Blob([data], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheet.sheet",
          });
          const url = window.URL.createObjectURL(blob);
          const anchor = document.createElement("a");
          anchor.href = url;
          anchor.download = "รายงาน0.1.xlsx";
          DataYear;
          anchor.click();
          window.URL.revokeObjectURL(url);
        });
      });
  };
  return (
    <Container fluid p={0}>
      <LoadingOverlay visible={Load} w={"100vw"} h={"100vh"} pos={"fixed"} />
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
            {/* <Select searchable label="เลือกเดือนที่จะนำข้อมูลเข้า " data={selectmount} {...formSearch.getInputProps("monthend")}  />
                              <Select searchable label="ปี" data={DataYear} {...formSearch.getInputProps("yearend")} mt={10} /> */}
          </Grid.Col>
          {/* <Grid.Col span={4}>
                               <Select searchable label="ประเภทรายจ่าย" data={Dataexpenditurelist} {...formSearch.getInputProps("type")}  />
                             
                          </Grid.Col> */}
          <Grid.Col span={4}>
            <Button type="submit" mt={33} leftSection={<IconSearch />}>
              ค้นหา
            </Button>
            <Button
              onClick={() => {
                ExcelExport();
              }}
              disabled={formSearch.values.data.length === 0}
              color="green.9"
              ml={5}
              mt={33}
              leftSection={<IconFileSpreadsheet />}
            >
              Export
            </Button>
          </Grid.Col>
        </Grid>
      </form>
      <SimpleGrid pt={30} cols={2}>
        {formSearch.values.data.length > 0 && (
          <>
            <Paper withBorder p={20} shadow="lg">
              <Text>ยอดสุทธิเงินเดือน 0.1 </Text>
              <Text c={"green"} fz={30}>
                {" "}
                <NumberFormatter
                  thousandSeparator
                  suffix=" ฿"
                  value={formSearch.values.data[0].sum01}
                />
              </Text>
            </Paper>
            <Paper withBorder p={20} shadow="lg">
              <Text>ยอดสุทธิเงินเดือนตกเบิก 0.1 </Text>
              <Text c="blue" fz={30}>
                {" "}
                <NumberFormatter
                  thousandSeparator
                  suffix=" ฿"
                  value={formSearch.values.data[0].backpay01}
                />{" "}
              </Text>
            </Paper>
          </>
        )}
      </SimpleGrid>
    </Container>
  );
}

export default Report01;
