import {
  Badge,
  Button,
  Container,
  Paper,
  Select,
  SimpleGrid,
  Flex,
  NumberFormatter,
  Grid,
  List,
  ThemeIcon,
  rem,
  Switch,
} from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { IconSearch, IconPrinter, IconCircleCheck, IconCircleDashed } from "@tabler/icons-react";
import { MDBDataTableV5 } from "mdbreact";
import { useEffect, useState } from "react";
import { API } from "../../Config/ConfigApi";
import axios from "axios";
import Swal from "sweetalert2";
import { Text } from "@mantine/core";
import SkeletonTable from "../../Publicc-user/SkeletonTable";
import { monthh } from "../../Publicc-user/Month";
import AddMonthSalaryShow from "./AddMonthSalaryShow";

function Reportshowsalaryopen() {
  const column = [
    {
      label: "#",
      field: "no",
      minimal: "lg",
    },
    {
      label: "ปี",
      field: "show_year",
      minimal: "lg",
    },
    {
      label: "เดือน",
      field: "show_month",
      minimal: "lg",
    },
    {
      label: "สถานะการแสดงรายการเงินเดือน",
      field: "show_status",
      minimal: "lg",
    },
  ];

  const [TableSalary, setTableSalary] = useState({
    columns: column,
    rows: [],
  });
  const [LoadTable, setLoadTable] = useState(false);
  const [DataBudget, setDataBudget] = useState([]);
  const [DataYear, setDataYear] = useState([]);
  const [Datahistoryprint, setDatahistoryprint] = useState([]);
  const [Dataexpenditurelist, setDataexpenditurelist] = useState([]);
  const [Dataipay, setDataipay] = useState({
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

  const returnMonth = (val) => {
    const m = monthh;
    const find = m.findIndex((va) => va.value === val);
    const la = m[find].label;
    return la;
  };
  const UpdateStatus = (year, month, status) => {
    const value = new FormData();
    value.append("show_year", year);
    value.append("show_month", month);
    if (status === "1") {
      value.append("show_status", "0");
    } else if (status === "0") {
      value.append("show_status", "1");
    }

    axios.post(API + "/index/UpdateStatusShowSalary", value).then((res) => {
      if (res.data === "success") {
        
        fetch()
      } else {
        fetch()
      }
    });
  };
  const fetch = (params) => {
    searchdata()
  }
  
  const searchdata = (value) => {
    axios.get(API + "/index/showsalaryopen").then((res) => {
      const data = res.data;
      if (data.length !== 0) {
        //  setLoadTable(false);
        setTableSalary({
          columns: column,
          rows: [
            ...data.map((i, key) => ({
              no: key + 1,
              show_year: i.show_year,
              show_month: returnMonth(i.show_month),
              show_status: (
                <Flex align={"center"} gap={10}>
                  <Switch
                    color="green"
                    checked={i.show_status === "1" ? true : false}
                    onChange={() => {
                      UpdateStatus(i.show_year, i.show_month, i.show_status);
                    }}
                    // onLabel="แสดง"
                    // offLabel="ไม่แสดง"
                  />
                  <Text fz={14}>{i.show_status === "1" ? "แสดง" : "ไม่แสดง"}</Text>
                </Flex>
              ),
              //   i.show_status,
            })),
          ],
        });
        // setDatahistoryprint(res.data);
      }
    });
  };

  useEffect(() => {
    searchdata();
    //  FetchTshowexpenditurelist();
    //   FetchYear();
  }, []);

  const formSearch = useForm({
    initialValues: {
      month: (new Date().getMonth().toString().length === 1
        ? "0" + new Date().getMonth()
        : new Date().getMonth()
      ).toString(),
      year: new Date().getFullYear().toString(),
    },

    validate: {
      month: isNotEmpty("กรุณาเลือกเดือน"),
      year: isNotEmpty("กรุณาเลือกปี"),
    },
  });
  return (
    <>
      <Container p={0} bg={"white"} fluid>
        <Badge color="var(--primary)" variant="light" size="md" radius={8}>
          แสดงรายการโชว์เงินเดือน
        </Badge>
        <Flex justify={"flex-end"}>
          <AddMonthSalaryShow fetch={searchdata} />
        </Flex>
        <Paper pt={20} shadow="xl" p="xl">
          {LoadTable ? (
            <SkeletonTable />
          ) : (
            <MDBDataTableV5
              data={TableSalary}
              responsive
              striped
              searchLabel="ค้นหาจากเลขบัตร"
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

export default Reportshowsalaryopen;
