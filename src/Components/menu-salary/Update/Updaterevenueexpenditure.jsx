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
  MultiSelect,
  Checkbox,
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

function Updaterevenueexpenditure() {
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
  const [Datarevenue, setDatarevenue] = useState([]);

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
    // setOverLay(true);
    console.log(value.type_employ);
    console.log(value.month);
    console.log(value.year);
    const value2 = value;
    let text1 = "";
    value2.EXPENDCON.forEach((i, k) => {
      if (k + 1 === value2.EXPENDCON.length) {
        text1 += "'" + i + "'";
      } else {
        text1 += "'" + i + "',";
      }
    });
    let text2 = "";
    value2.REVENUECON.forEach((i, k) => {
      if (k + 1 === value2.REVENUECON.length) {
        text2 += "'" + i + "'";
      } else {
        text2 += "'" + i + "',";
      }
    });
    setTimeout(() => {
      // const
      axios
        .post(API + "/index/showhistoryrevenueorexpenditure", {
          revenue: text2,
          expenditure: text1,
          year: value.year,
          month: value.month,
          type_employ: value.type_employ,
        })
        .then((res) => {
          setOverLay(false);
          console.log(res.data);
          const data = res.data;
          if (data.length !== 0) {
            setLoadTable(false);

            setDatarevenue(res.data);
          } else {
            setDatarevenue([]);
          }
        });
    }, 400);
  };

  const submitdata = (valuess) => {
    // setOverLay(true);
    // console.log(value.type_employ);
    // console.log(value.month);
    // console.log(value.year);
    // console.log(value.monthend);
    // console.log(value.yearend);

    const form = Datarevenue;
    // axios
    //   .post(API + "/index/Addhistoryrevenueorexpenditure", {
    //     month: value.values.monthend,
    //     year: value.values.yearend,
    //     check: form,
    //   })
    //   .then((res) => {
    //     setOverLay(false);
    //     Swal.fire({
    //       title: "อัพเดทข้อมูลสำเร็จ",
    //       icon: "success",
    //       // showCancelButton: true,
    //       confirmButtonText: "ตกลง",
    //       // cancelButtonText: 'No, keep it'
    //     }).then((result) => {
    //       //  this.toggle();
    //       // close();
    //     });
    //     console.log(res.data);
    //   });
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
      REVENUEDATA: [],
      EXPENDITUREDATA: [],
      REVENUECON: [],
      EXPENDCON: [],
    },

    validate: {
      type_employ: isNotEmpty("กรุณาเลือกประเภทบุคลากร"),
      month: isNotEmpty("กรุณาเลือกเดือน"),
      year: isNotEmpty("กรุณาเลือกปี"),
      monthend: isNotEmpty("กรุณาเลือกเดือน"),
      yearend: isNotEmpty("กรุณาเลือกปี"),
    },
  });
  const REVE = () => {
    axios.get(API + "/index/showrevenues/" + formSearch.values.type_employ).then((res) => {
      const da = res.data;
      const menu = da.map((i) => ({
        label: i.revenue_name,
        value: i.revenue_id,
      }));
      formSearch.setValues({ REVENUEDATA: menu });
    });
  };
  const EXPEN = () => {
    axios.get(API + "/index/showexpenditure/" + formSearch.values.type_employ).then((res) => {
      console.log(res.data);
      const da = res.data;
      const menu = da.map((i) => ({
        label: i.expenditure_name,
        value: i.expenditure_id,
      }));
      formSearch.setValues({ EXPENDITUREDATA: menu });
      // formSearch.setValues({EXPENDITUREDATA:})
    });
  };
  const ChangConre = (id) => {
    const data = formSearch.values.REVENUECON;

    // Check if the id is already in the array
    const index = data.indexOf(id);

    if (index !== -1) {
      // If id is found, remove it
      data.splice(index, 1);
    } else {
      // If id is not found, add it
      data.push(id);
    }

    // Update the form values
    formSearch.setValues({ REVENUECON: data });
    console.log(formSearch.values.REVENUECON);
  };
  const ChangConex = (id) => {
    const data = formSearch.values.EXPENDCON;

    // Check if the id is already in the array
    const index = data.indexOf(id);

    if (index !== -1) {
      // If id is found, remove it
      data.splice(index, 1);
    } else {
      // If id is not found, add it
      data.push(id);
    }

    // Update the form values
    formSearch.setValues({ EXPENDCON: data });
    console.log(formSearch.values.EXPENDCON);
  };

  useEffect(() => {
    formSearch.setValues({ EXPENDITUREDATA: [] });
    formSearch.setValues({ REVENUEDATA: [] });
    if (formSearch.values.type_employ !== "") {
      REVE();
      EXPEN();
    }
  }, [formSearch.values.type_employ]);
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
            <Paper mt={20} mb={20} maw={900} w={"100%"}>
              <SimpleGrid>
                <Select
                  searchable
                  allowDeselect={false}
                  data={DataTypeEmploy}
                  {...formSearch.getInputProps("type_employ")}
                  label="ประเภทบุคลากร"
                />
              </SimpleGrid>

              <SimpleGrid cols={2} mt={15}>
                <Paper shadow="sm" p={20}>
                  {" "}
                  <Text>รายการรายรับ</Text>
                  {formSearch.values.REVENUEDATA.map((i, k) => (
                    <Checkbox
                      value={formSearch.values.REVENUECON}
                      label={i.label}
                      key={k}
                      onChange={() => ChangConre(i.value)}
                    />
                  ))}
                </Paper>
                {/* <MultiSelect
                  {...formSearch.getInputProps("EXPENDCON")}
                  label="รายจ่าย"
                  data={formSearch.values.EXPENDITUREDATA}
                /> */}
                <Paper shadow="sm" p={20}>
                  <Text>รายการรายจ่าย</Text>
                  {formSearch.values.EXPENDITUREDATA.map((i, k) => (
                    <Checkbox
                      value={formSearch.values.EXPENDCON}
                      label={i.label}
                      key={k}
                      onChange={() => ChangConex(i.value)}
                    />
                  ))}
                </Paper>
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
          <Paper maw={900} w={"100%"} pt={20}>
            <SimpleGrid cols={1}>
              <Text size="xl">
                พบข้อมูลรายรับ/รายจ่าย จำนวน : <IconArrowDown />{" "}
              </Text>
              <Paper shadow="sm" p={10} maw={200}>
                <Flex justify={"center"} align={"center"} gap={10}>
                  <Text fz={"50px"} c={"green"}>
                    <NumberFormatter thousandSeparator value={Datarevenue.length} />
                  </Text>
                  <Text size="md">รายการ</Text>
                </Flex>
              </Paper>
              <Button
                disabled={Datarevenue.length != 0 ? false : true}
                onClick={() => submitdata(formSearch)}
                mt={33}
                leftSection={<IconSearch />}
                color="var(--purpel)"
              >
                อัพเดท
              </Button>
            </SimpleGrid>
          </Paper>
        </Flex>
        ไม่รวมเงินตอบแทนพิเศษ(20),ตกเบิกเงินเดือน(15),ตกเบิกเงินเดือน 1.7/1.5(99),ตกเบิกเงินเดือน
        0.1(100)
      </Container>
    </>
  );
}

export default Updaterevenueexpenditure;
