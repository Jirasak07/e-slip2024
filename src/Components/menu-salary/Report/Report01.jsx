import { Button, Container, Flex, Grid, LoadingOverlay, NumberFormatter, Paper, Select, SimpleGrid, Text } from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { IconSearch } from "@tabler/icons-react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { API } from "../../Config/ConfigApi";

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
      month: (new Date().getMonth().toString().length === 1 ? "0" + new Date().getMonth() : new Date().getMonth()).toString(),
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
    setLoad(true)
    axios
      .post(API + "/index/Show01", {
        idbudget: value.idbudget,
        month: value.month,
        year: value.year,
      })
      .then((res) => {
        setLoad(false)
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
          label: i.namebudget,
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
  return (
    <Container fluid p={0}>
        <LoadingOverlay visible={Load} w={"100vw"} h={"100vh"}  pos={"fixed"}/>
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
      <SimpleGrid pt={30} cols={2}>
        {formSearch.values.data.length > 0 && (
          <>
            <Paper withBorder p={20} shadow="lg">
              <Text>ยอดสุทธิเงินเดือน 0.1 </Text>
              <Text c={"green"} fz={30}>
                {" "}
                <NumberFormatter thousandSeparator suffix=" ฿" value={formSearch.values.data[0].sum01} />
              </Text>
            </Paper>
            <Paper withBorder p={20} shadow="lg">
              <Text>ยอดสุทธิเงินเดือนตกเบิก 0.1 </Text>
              <Text c="blue" fz={30}>
                {" "}
                <NumberFormatter thousandSeparator suffix=" ฿" value={formSearch.values.data[0].backpay01} />{" "}
              </Text>
            </Paper>
          </>
        )}
      </SimpleGrid>
    </Container>
  );
}

export default Report01;
