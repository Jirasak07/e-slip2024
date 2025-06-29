import {
  Badge,
  Button,
  Container,
  Paper,
  Select,
  SimpleGrid,
  Flex,
  NumberFormatter,
} from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { IconSearch, IconPrinter } from "@tabler/icons-react";
import { MDBDataTableV5 } from "mdbreact";
import { useEffect, useState } from "react";
import { API } from "../../Config/ConfigApi";
import axios from "axios";
import Swal from "sweetalert2";
import { Text, Grid } from "@mantine/core";
import SkeletonTable from "../../Publicc-user/SkeletonTable";
import ModalAddrevenue from "./ModalAddrevenue";
import ModalExpenditure from "./ModalExpenditure";
import React from "react";
import ExcelJs from "exceljs";
import {
  IconChartBubble,
  IconCoin,
  IconDeviceFloppy,
  IconEdit,
  IconPlaylistAdd,
} from "@tabler/icons-react";
import { mb, yb } from "../../Config/AllowDate";
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

  const [Datatype, setDatatype] = useState([]);

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
  const [Data, setData] = useState([]);
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

  const Updatetypesave = (value) => {
    // setBtnLoad(true);
    const form = Datatype;
    axios
      .post(API + "/index/Addrevenuefortype", {
        type_employ: value.type_employ,
        year: value.year,
        month: value.month,
        idbudget: value.idbudget,
        check: form,
      })
      .then((res) => {
        // setBtnLoad(false);
        if (res.data === "200") {
          Swal.fire({
            icon: "success",
            title: "อัพเดท ประกันสังคมเสร็จสิ้น",
            timer: 600,
            timerProgressBar: true,
            showConfirmButton: false,
          }).then((res) => {});
        }
        console.log(res.data);
      });
  };

  const Updatetypesavejk = (value) => {
    // setBtnLoad(true);
    const form = Datatype;
    axios
      .post(API + "/index/Addrevenuefortypekj", {
        type_employ: value.type_employ,
        year: value.year,
        month: value.month,
        idbudget: value.idbudget,
        check: form,
      })
      .then((res) => {
        // setBtnLoad(false);
        if (res.data === "200") {
          Swal.fire({
            icon: "success",
            title: "อัพเดท ก.ส.จ เสร็จสิ้น",
            timer: 600,
            timerProgressBar: true,
            showConfirmButton: false,
          }).then((res) => {});
        }
        console.log(res.data);
      });
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
    axios
      .get(
        API +
          "/index/showrevenueandexpenditure/" +
          value.type_employ +
          "/" +
          value.year +
          "/" +
          value.month +
          "/" +
          value.idbudget
      )
      .then((res) => {
        const data = res.data;

        setDatatype(data);

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
                    <ModalAddrevenue
                      cname={i.customers_pname + i.customers_name + " " + i.customers_lname}
                      fn={See}
                      idbudget={i.idbudget}
                      year={i.history_salary_year}
                      month={i.history_salary_month}
                      citizent={i.customers_citizent}
                      type={i.customers_type}
                    />
                    <ModalExpenditure
                      cname={i.customers_pname + i.customers_name + " " + i.customers_lname}
                      fn={See}
                      idbudget={i.idbudget}
                      year={i.history_salary_year}
                      month={i.history_salary_month}
                      citizent={i.customers_citizent}
                      type={i.customers_type}
                    />
                    <Button
                      onClick={() => {
                        window.open(
                          API +
                            "/PDF/SalarySlip.php?id=" +
                            i.customers_citizent +
                            "&year=" +
                            i.history_salary_year +
                            "&month=" +
                            i.history_salary_month +
                            "&type=" +
                            i.customers_type
                        );
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
        const expenditure = data.reduce(
          (sum, current) => (sum = sum + Number(current.expenditure)),
          0
        );
        const revenue = data.reduce((sum, current) => (sum = sum + Number(current.revenue)), 0);
        const history_salary_salary = data.reduce(
          (sum, current) => (sum = sum + Number(current.history_salary_salary)),
          0
        );
        console.log(history_salary_salary);
        const salary_true = data.reduce(
          (sum, current) => (sum = sum + Number(current.salary_true)),
          0
        );
        let formattedNumber = Math.round(expenditure * 100) / 100;
        // let formattedNumber = Math.floor(expenditure * 100) / 100;
        let formattedrevenue = Math.round(revenue * 100) / 100;
        // let formattedhistory_salary_salary = history_salary_salary;
        let formattedhistory_salary_salary = Math.round(history_salary_salary * 100) / 100;
        let formattedsalary_true = Math.round(salary_true * 100) / 100;
        setExpenditure_true(formattedNumber.toFixed(2));
        setRevenue_true(formattedrevenue.toFixed(2));
        setHistory_salary(formattedhistory_salary_salary.toFixed(2));
        setSalary_true(formattedsalary_true.toFixed(2));
        const salaryMinus = data.filter((val) => Number(val.salary_true) < 0);
        console.log(salaryMinus);
        setData(salaryMinus);
      });
  };

  useEffect(() => {
    FetchTypeEmploy();
    FetchYear();
    FetchBudget();
  }, []);

  const FetchBudget = (params) => {
    axios.get(API + "/index/showBudget").then((res) => {
      const data = res.data;
      if (data.length !== 0) {
        //   setLoadTable(false);
        const select = data.map((i) => ({
          value: i.idbudget,
          label: i.namebudget + " ( " + i.idbudget + " ) ",
        }));

        formSearch.setValues({ DATABUDGET: select });
      }
    });
  };
  const formSearch = useForm({
    initialValues: {
      type_employ: "",
      idbudget: "",
      month:
        (new Date().getMonth() + 1).toString().length === 1
          ? "0" + (new Date().getMonth() + 1)
          : (new Date().getMonth() + 1).toString(),
      year: new Date().getFullYear().toString(),
      DATABUDGET: [],
    },

    validate: {
      type_employ: isNotEmpty("กรุณาเลือกประเภทบุคลากร"),
      month: isNotEmpty("กรุณาเลือกเดือน"),
      year: isNotEmpty("กรุณาเลือกปี"),
    },
  });
  const Chk = () => {
    const mc = mb;
    const yc = yb;
    const ma = formSearch.values.month;
    const ya = formSearch.values.year;
    console.log(ya);
    console.log(yc);
    console.log(ma);
    console.log(mc);
    if (ya === yc && mc === ma) {
      return false;
    } else {
      return true;
    }
  };
  useEffect(() => {
    Chk();
  }, [formSearch.values.month, formSearch.values.year]);
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
              <Select
                searchable
                data={formSearch.values.DATABUDGET}
                {...formSearch.getInputProps("idbudget")}
                label="ประเภทงบประมาณ"
              />
              <Select
                searchable
                data={DataTypeEmploy}
                {...formSearch.getInputProps("type_employ")}
                label="ประเภทบุคลากร"
              />
              <Select
                searchable
                label="เดือน"
                data={selectmount}
                {...formSearch.getInputProps("month")}
              />
              <Select searchable label="ปี" data={DataYear} {...formSearch.getInputProps("year")} />
              <Button type="submit" mt={33} color="var(--primary)" leftSection={<IconSearch />}>
                ค้นหา
              </Button>
            </SimpleGrid>
          </form>
        </Paper>

        <Paper p={10} shadow="none">
          {}

          <Grid>
            <Grid.Col span={6}></Grid.Col>
            <Grid.Col span={3}>
              {Datatype.length > 0 ? (
                <>
                  <form
                    onSubmit={formSearch.onSubmit((v) => {
                      Updatetypesave(v);
                      // console.log(v);
                    })}
                  >
                    <Button
                      leftSection={<IconDeviceFloppy />}
                      color="var(--success)"
                      type="submit"
                      disabled={Chk()}
                    >
                      อัพเดทประกันสังคม
                    </Button>
                  </form>
                </>
              ) : (
                <>
                  {" "}
                  <Button
                    leftSection={<IconDeviceFloppy />}
                    color="var(--success)"
                    type="submit"
                    disabled
                  >
                    อัพเดทประกันสังคม
                  </Button>
                </>
              )}

              {Datatype.length > 0 ? (
                <>
                  <form
                    onSubmit={formSearch.onSubmit((v) => {
                      Updatetypesavejk(v);
                      // console.log(v);
                    })}
                  >
                    <Button
                      leftSection={<IconDeviceFloppy />}
                      disabled={Chk()}
                      color="var(--purpel)"
                      type="submit"
                    >
                      อัพเดท ก.ส.จ
                    </Button>
                  </form>
                </>
              ) : (
                <>
                  <Button
                    leftSection={<IconDeviceFloppy />}
                    color="var(--purpel)"
                    type="submit"
                    disabled
                  >
                    อัพเดท ก.ส.จ
                  </Button>
                </>
              )}
            </Grid.Col>
            <Grid.Col span={3}>
              <Flex justify={"flex-end"} gap={10} direction={"column"} align={"flex-end"}>
                <Text c={"teal.9"} size="md">
                  รวมเงินเดือน :{" "}
                  <NumberFormatter value={History_salary} thousandSeparator suffix=" ฿" />
                </Text>
                <Text c={"blue"} size="md">
                  รวมรายรับ : <NumberFormatter value={Revenue_true} thousandSeparator suffix=" ฿" />
                </Text>
                <Text c={"red.9"} size="md">
                  รวมรายจ่าย :{" "}
                  <NumberFormatter value={Expenditure_true} thousandSeparator suffix=" ฿" />
                </Text>
                <Text size="md">
                  รวมเงินเดือนสุทธิ :{" "}
                  <NumberFormatter value={Salary_true} thousandSeparator suffix=" ฿" />
                </Text>
              </Flex>
            </Grid.Col>
          </Grid>
        </Paper>
        {Data.length > 0 && (
          <Paper p={20}>
            <Text>รายการติดลบ</Text>
            <SimpleGrid>
              {Data.map((i, key) => (
                <Text c={"red"} key={key}>
                  {i.customers_pname + i.customers_name + "  " + i.customers_lname} {i.salary_true}
                </Text>
              ))}
            </SimpleGrid>
          </Paper>
        )}

        <Paper pt={20}>
          {LoadTable ? (
            <SkeletonTable />
          ) : (
            <MDBDataTableV5
              // entries={100}

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
      {/* <Button onClick={()=>{ExcelExport()}} color="green" >ExcelExport</Button> */}
    </>
  );
}

export default Salary;
