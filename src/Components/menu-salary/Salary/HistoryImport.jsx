import { Button, Container, Grid, NumberFormatter, Select, Text } from "@mantine/core";
import { IconSearch, IconSettings } from "@tabler/icons-react";
import axios from "axios";
import React, { useEffect, useState } from "react";
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
      month: (new Date().getMonth().toString().length === 1 ? "0" + new Date().getMonth() : new Date().getMonth()).toString(),
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
          label: i.namebudget+" ( "+i.idbudget+" ) ",
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
        idbudget: value.idbudget, month: value.month, year: value.year
      })
      .then((res) => {
        const data = res.data;
        console.log(data);
        if (data.length > 0) {
          setTable({
            columns: column,
            rows: [
              ...data.map((i) => ({
                customers_citizent: i.customers_citizent,
                customers_type: i.customers_type,
                customers_line: i.customers_line ===  1 ? <Text c="blue">สายวิชาการ</Text> : <Text c="red.9">สายสนับสนุน</Text>,
                customers_name: i.customers_pname + "" + i.customers_name + " " + i.customers_lname,
                history_salary_salary: (
                  <Text c="teal.8">
                    <NumberFormatter thousandSeparator value={i.history_salary_salary} decimalScale={2} />
                  </Text>
                ),
                history_salary_salary1715: i.history_salary_salary1715,
                history_salary_salary01: i.history_salary_salary01,

                promotionmoney: i.promotionmoney,
                numberofmonths: i.numberofmonths,
                backpay: i.backpay,
                backpay1715: i.backpay1715, //ตกเบิก1715
                backpay01: i.backpay01, //ตกเบิก1715
                compensation: <NumberFormatter thousandSeparator value={i.compensation} decimalScale={2} />,
                manage: (
                  <>
                    <EditIncrease Fetch={Fetch} data={i} name={i.customers_pname + "" + i.customers_name + " " + i.customers_lname} />
                  </>
                ),
              })),
            ],
          });
        }else{
          setTable({
            columns:column,
            rows:[]
          })
        }
      });
  };
const Fetch  = (params) => {
  Sub(formSearch.values)
}

  return (
    <Container  fluid p={0}>
      <form
        onSubmit={formSearch.onSubmit((v) => {
          Sub(v);
          // console.log(v);
        })}
      >
        <Grid gutter={{ base: 5, xs: "md", md: "xl", xl: 50 }}>
          <Grid.Col span={2}>
            <Select searchable label="งบประมาณ" data={DataBudget} {...formSearch.getInputProps("idbudget")} />
          </Grid.Col>
          <Grid.Col span={2}>
            <Select searchable label="เดือน" data={selectmount} {...formSearch.getInputProps("month")} />
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
          </Grid.Col>
        </Grid>
      </form>

      <MDBDataTableV5 entries={100} responsive  data={Table} />
    </Container>
  );
}

export default HistoryImport;
