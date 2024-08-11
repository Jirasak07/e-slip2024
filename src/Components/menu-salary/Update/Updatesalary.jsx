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
  LoadingOverlay,
} from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { IconSearch, IconPrinter, IconArrowDown } from "@tabler/icons-react";
import { MDBDataTableV5 } from "mdbreact";
import { useEffect, useState } from "react";
import { API } from "../../Config/ConfigApi";
import axios from "axios";
import Swal from "sweetalert2";
import { Text } from "@mantine/core";
import SkeletonTable from "../../Publicc-user/SkeletonTable";

function Updatesalary() {
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
  const [Datasalarystart, setDatasalarystart] = useState([]);

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

  const [OverLay, setOverLay] = useState(false);
  const searchdata = (value) => {
    setOverLay(true);
    console.log(value.type_employ);
    console.log(value.month);
    console.log(value.year);

    setTimeout(() => {
      axios
        .get(
          API +
            "/index/showhistorysalarymount/" +
            value.year +
            "/" +
            value.month +
            "/" +
            value.type_employ
        )
        .then((res) => {
          setOverLay(false);
          console.log(res.data);
          const data = res.data;
          if (data.length !== 0) {
            setLoadTable(false);

            setDatasalarystart(res.data);
          }
        });
    }, 400);
  };

  const submitdata = (value) => {
    setOverLay(true);
    // console.log(value.type_employ);
    // console.log(value.month);
    // console.log(value.year);
    // console.log(value.monthend);
    // console.log(value.yearend);

    const form = Datasalarystart;
    console.log(value.values);
    console.log(form);
    axios
      .post(API + "/index/updatehistorysalarymonthtomount", {
        month: value.values.monthend,
        year: value.values.yearend,
        check: form,
      })
      .then((res) => {
        setOverLay(false);
        Swal.fire({
          title: "อัพเดทข้อมูลสำเร็จ",
          icon: "success",
          // showCancelButton: true,
          confirmButtonText: "ตกลง",
          // cancelButtonText: 'No, keep it'
        }).then((result) => {
          //  this.toggle();
          // close();
        });
        console.log(res.data);
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
      year: new Date().getFullYear().toString(),
      monthend: (new Date().getMonth().toString().length === 1
        ? "0" + (new Date().getMonth() + 1)
        : new Date().getMonth() + 1
      ).toString(),
      yearend: new Date().getFullYear().toString(),
    },

    validate: {
      type_employ: isNotEmpty("กรุณาเลือกประเภทบุคลากร"),
      month: isNotEmpty("กรุณาเลือกเดือน"),
      year: isNotEmpty("กรุณาเลือกปี"),
      monthend: isNotEmpty("กรุณาเลือกเดือน"),
      yearend: isNotEmpty("กรุณาเลือกปี"),
    },
  });
  return (
    <>
      <LoadingOverlay visible={OverLay} />
      <Container p={0} bg={"white"} fluid>
        <Badge color="var(--primary)" variant="light" size="md" radius={8}>
          อัพเดทข้อมูล รายรับ-รายจ่าย จากเดือนก่อนหน้า
        </Badge>

        <form
          onSubmit={formSearch.onSubmit((v) => {
            searchdata(v);
          })}
        >
          <Flex justify={"center"}>
            <Paper mt={20} mb={20} w={"100%"}>
              <SimpleGrid>
                <Select
                  searchable
                  allowDeselect={false}
                  data={DataTypeEmploy}
                  {...formSearch.getInputProps("type_employ")}
                  label="ประเภทบุคลากร"
                />
              </SimpleGrid>
              <SimpleGrid cols={2} pt={15}>
                <Select
                  searchable
                  allowDeselect={false}
                  label="เลือกเดือนที่จะใช้ข้อมูลเข้าเดือนใหม่"
                  data={selectmount}
                  {...formSearch.getInputProps("month")}
                />
                <Select
                  searchable
                  allowDeselect={false}
                  label="ปี"
                  data={DataYear}
                  {...formSearch.getInputProps("year")}
                />
              </SimpleGrid>
              <Flex justify={"center"} my={"xl"}>
                <IconArrowDown />
              </Flex>

              <SimpleGrid cols={2}>
                <Select
                  searchable
                  allowDeselect={false}
                  label="เลือกเดือนที่จะนำข้อมูลเข้า "
                  data={selectmount}
                  {...formSearch.getInputProps("monthend")}
                />
                <Select
                  searchable
                  allowDeselect={false}
                  label="ปี"
                  data={DataYear}
                  {...formSearch.getInputProps("yearend")}
                />
              </SimpleGrid>
              <SimpleGrid>
                <Button w={"100%"} type="submit" mt={33} leftSection={<IconSearch />}>
                  ค้นหา
                </Button>
              </SimpleGrid>
            </Paper>
          </Flex>
        </form>
        <Flex justify={"center"}>
          <Paper w={"100%"} pt={20}>
            <SimpleGrid cols={1}>
              <Text fz="h1">
                พบข้อมูลรายรับ/รายจ่าย จำนวน : <IconArrowDown />{" "}
              </Text>
              <Paper shadow="sm" p={10}>
                <Flex justify={"center"} align={"center"} gap={10}>
                  <Text fz={"150"} c={"green"}>
                    <NumberFormatter thousandSeparator value={Datasalarystart.length} />
                  </Text>
                  <Text size="md">รายการ</Text>
                </Flex>
              </Paper>
              <Button
                disabled={Datasalarystart.length != 0 ? false : true}
                onClick={() => submitdata(formSearch)}
                mt={33}
                color="violet.8"
                size="lg"
                h={110}
                fz={90}
              >
                อัพเดทเงินเดือน
              </Button>
            </SimpleGrid>
          </Paper>
        </Flex>
        {/* ไม่รวมเงินตอบแทนพิเศษ(20),ตกเบิกเงินเดือน(15),ตกเบิกเงินเดือน 1.7/1.5(99),ตกเบิกเงินเดือน 0.1(100) */}
      </Container>
    </>
  );
}

export default Updatesalary;
