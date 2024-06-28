import { Button, Grid, Select } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { API } from "../../Config/ConfigApi";
import { isNotEmpty, useForm } from "@mantine/form";

function HistoryImport() {
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
            label: i.namebudget,
          }));
          setDataBudget(select);
        }
      });
    // }, 400);
  };
  useEffect(() => {
    FetchYear();
    FetchTypeshowBudget()
  }, []);
const Sub = (value) => {
  console.log(value)
}

  return (
    <>
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
    </>
  );
}

export default HistoryImport;
