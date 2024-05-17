import { Badge, Button, Container, Paper, Select, SimpleGrid, Flex, NumberFormatter, Grid } from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { IconSearch, IconPrinter } from "@tabler/icons-react";
import { MDBDataTableV5 } from "mdbreact";
import { useEffect, useState } from "react";
import { API } from "../../Config/ConfigApi";
import axios from "axios";
import Swal from "sweetalert2";
import { Text } from "@mantine/core";
import SkeletonTable from "../../Publicc-user/SkeletonTable";
import ExcelJs from "exceljs";

function Reportexpenditure() {
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
      label: "รายจ่ายใน",
      field: "total_in",
      minimal: "lg",
    },
    {
      label: "รายจ่ายนอก",
      field: "total_out",
      minimal: "lg",
    },
    {
      label: "ยอดสุทธิ",
      field: "total",
      minimal: "lg",
    },
  ];
  // const [TableSalary, setTableSalary] = useState({
  //     columns: column,
  //     rows: [],
  // });
  const [LoadTable, setLoadTable] = useState(false);
  const [DataBudget, setDataBudget] = useState([]);
  const [DataYear, setDataYear] = useState([]);
  const [DataTotalsummary, setDataTotalsummary] = useState([]);
  const [Dataexpenditurelist, setDataexpenditurelist] = useState([]);
  const [Payout, setPayout] = useState(0);
  const [Payin, setPayin] = useState(0);
  const [Total, setTotal] = useState(0);
  const [Tablelist, setTablelist] = useState({
    columns: column,
    rows: [],
  });

  const ExcelExport = () => {
    const workbook = new ExcelJs.Workbook();
    const sheet = workbook.addWorksheet("Mysheet");
    sheet.properties.defaultRowHeight = 15;

    sheet.columns = [
      {
        header: "เลขบัตร",
        key: "customers_citizent",
        width: 20,
      },
      {
        header: "ชื่อ-นามสกุล",
        key: "customers_pname",
        width: 20,
      },
      {
        header: "ประเภทบุคลากร",
        key: "customer_type_name",
        width: 20,
      },
      {
        header: "รายจ่ายใน",
        key: "total_in",
        width: 20,
      },
      {
        header: "รายจ่ายนอก",
        key: "total_out",
        width: 20,
      },
      {
        header: "ยอดสุทธิ",
        key: "total",
        width: 20,
      },
    ];

    DataTotalsummary.map((i) =>
      sheet.addRow({
        customers_citizent: i.customers_citizent,
        customers_pname: i.customers_pname + i.customers_name + "  " + i.customers_lname,
        customer_type_name: i.customer_type_name,
        total_in: i.total_in,
        total_out: i.total_out,
        total: i.total,
      })
    );

    workbook.xlsx.writeBuffer().then((data) => {
      const blob = new Blob([data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheet.sheet",
      });
      const url = window.URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = "รายจ่ายแยกประเภท.xlsx";
      anchor.click();
      window.URL.revokeObjectURL(url);
    });
  };

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

  const FetchTypeshowBudget = () => {
    setLoadTable(true);
    setTimeout(() => {
      axios.get(API + "/index/showBudget").then((res) => {
        //    console.log(res.data);
        const data = res.data;
        if (data.length !== 0) {
          setLoadTable(false);
          const select = data.map((i) => ({
            value: i.idbudget,
            label: i.namebudget,
          }));
          setDataBudget(select);
        }
      });
    }, 400);
  };

  const FetchTshowexpenditurelist = () => {
    setLoadTable(true);
    setTimeout(() => {
      axios.get(API + "/index/showexpenditurelist").then((res) => {
        //    console.log(res.data);
        const data = res.data;
        if (data.length !== 0) {
          setLoadTable(false);
          const select = data.map((i) => ({
            value: i.expenditure_name,
            label: i.expenditure_name,
          }));
          setDataexpenditurelist(select);
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

  const searchdata = (value) => {
    setLoadTable(true);
    //   axios.get(API + "/index/showhTotalsummarytypelist/"+value.year+"/"+value.month+"/"+value.type+"/"+value.idbudget).then((res) => {
    axios
      .post(API + "/index/showhTotalsummarytypelist", {
        month: value.month,
        year: value.year,
        type: value.type,
        idbudget: value.idbudget,
      })
      .then((res) => {
        setLoadTable(false);
        console.log(res.data);
        const data = res.data;
        if (data.length !== 0) {
          setTablelist({
            columns: column,
            rows: [
              ...data.map((i, key) => ({
                no: key + 1,
                citizen: i.customers_citizent,
                name: i.customers_pname + i.customers_name + " " + i.customers_lname,
                type_employ: i.customer_type_name,
                total_in: (
                  <Text c="teal.8">
                    <NumberFormatter thousandSeparator value={i.total_in} />
                  </Text>
                ),
                total_out: (
                  <Text c="blue">
                    <NumberFormatter thousandSeparator value={i.total_out} />
                  </Text>
                ),
                total: (
                  <Text c="red.9">
                    <NumberFormatter thousandSeparator value={i.total} />
                  </Text>
                ),
              })),
            ],
          });

          setDataTotalsummary(res.data);
          // const sum = Dataipay.filter(
          //   (Dataipay) =>
          //     Dataipay.expenditure_name !== "ธนาคารกรุงไทย" &&
          //     Dataipay.expenditure_name !== "ธนาคารกรุงเทพ"
          // ).reduce((sum, currentItem) => (sum = sum + Number(currentItem.sum)), 0);
          const sumin = data.reduce((sum, current) => (sum = sum + Number(current.total_in)), 0);
          const sumout = data.reduce((sum, current) => (sum = sum + Number(current.total_out)), 0);
          const total = Number(sumin + sumout);
          setPayin(sumin);
          setPayout(sumout);
          setTotal(total);
        }
      });
  };

  // const submitdata = (value) => {
  //   // console.log(value.type_employ);
  //   // console.log(value.month);
  //   // console.log(value.year);
  //   // console.log(value.monthend);
  //   // console.log(value.yearend);

  //   const form = Datasalarystart;
  //   console.log(value.values);
  //   console.log(form);
  //   axios
  //     .post(API + "/index/Addhistorysalarymonth", {
  //       month: value.values.monthend,
  //       year: value.values.yearend,
  //       check: form,
  //     })
  //     .then((res) => {
  //       Swal.fire({
  //         title: "อัพเดทข้อมูลสำเร็จ",
  //         icon: "success",
  //         // showCancelButton: true,
  //         confirmButtonText: "ตกลง",
  //         // cancelButtonText: 'No, keep it'
  //       }).then((result) => {
  //         //  this.toggle();
  //         // close();
  //       });
  //       console.log(res.data);
  //     });
  // };

  useEffect(() => {
    FetchTypeshowBudget();
    FetchTshowexpenditurelist();
    FetchYear();
  }, []);

  const formSearch = useForm({
    initialValues: {
      idbudget: "",
      month: (new Date().getMonth().toString().length === 1 ? "0" + new Date().getMonth() : new Date().getMonth()).toString(),
      year: new Date().getFullYear().toString(),
      type: "",
      //  yearend: (new Date().getFullYear()).toString(),
    },

    validate: {
      idbudget: isNotEmpty("กรุณาเลือกประเภทงบประมาณ"),
      month: isNotEmpty("กรุณาเลือกเดือน"),
      year: isNotEmpty("กรุณาเลือกปี"),
      type: isNotEmpty("กรุณาเลือกประเภทรายจ่าย"),
      //  yearend: isNotEmpty("กรุณาเลือกปี"),
    },
  });
  return (
    <>
      <Container p={0} bg={"white"} fluid>
        <Badge color="var(--primary)" variant="light" size="md" radius={8}>
          รายงานรายจ่ายแยกประเภท
        </Badge>
        <Paper mt={20} mb={20}>
          <form
            onSubmit={formSearch.onSubmit((v) => {
              searchdata(v);
              // console.log(v);
            })}
          >
            <Grid>
              <Grid.Col span={8}>
                <Select searchable data={DataBudget} {...formSearch.getInputProps("idbudget")} label="งบประมาณ" />
              </Grid.Col>
            </Grid>
            <Grid gutter={{ base: 5, xs: "md", md: "xl", xl: 50 }}>
              <Grid.Col span={2}>
                <Select searchable label="เดือน" data={selectmount} {...formSearch.getInputProps("month")} />
              </Grid.Col>
              <Grid.Col span={2}>
                <Select searchable label="ปี" data={DataYear} {...formSearch.getInputProps("year")} />
                {/* <Select searchable label="เลือกเดือนที่จะนำข้อมูลเข้า " data={selectmount} {...formSearch.getInputProps("monthend")}  />
                                <Select searchable label="ปี" data={DataYear} {...formSearch.getInputProps("yearend")} mt={10} /> */}
              </Grid.Col>
              <Grid.Col span={4}>
                <Select searchable label="ประเภทรายจ่าย" data={Dataexpenditurelist} {...formSearch.getInputProps("type")} />
                {/* <Select searchable label="เลือกเดือนที่จะนำข้อมูลเข้า " data={selectmount} {...formSearch.getInputProps("monthend")}  />
                                <Select searchable label="ปี" data={DataYear} {...formSearch.getInputProps("yearend")} mt={10} /> */}
              </Grid.Col>
              <Grid.Col span={4}>
                <Button type="submit" mt={33} leftSection={<IconSearch />}>
                  ค้นหา
                </Button>
              </Grid.Col>
            </Grid>
          </form>
        </Paper>

        <Paper pt={20} shadow="xl" p="xl">
          <Grid justify="center">
            <Grid.Col span={4}>
              <Text size="xl">พบข้อมูลเงินเดือน {DataTotalsummary.length} รายการ</Text>
              {/* <Button onClick={()=>submitdata(formSearch)} mt={33} leftSection={<IconSearch />}  color="var(--purpel)">
                                    อัพเดท
                                </Button> */}
              {DataTotalsummary.length !== 0 ? (
                <>
                  <Button
                    onClick={() => {
                      ExcelExport();
                    }}
                    color="green"
                    mt={20}
                  >
                    ดาวน์โหลดรายจ่ายแยกประเภท
                  </Button>
                </>
              ) : (
                <></>
              )}
            </Grid.Col>
          </Grid>

          <Paper p={10} shadow="none">
            {}
            <Flex justify={"flex-end"} gap={10} direction={"column"} align={"flex-end"}>
              <Text size="md">
                รวมจ่ายใน : <NumberFormatter value={Payin} thousandSeparator suffix=" ฿" />
              </Text>
              <Text size="md">
                รวมจ่ายนอก : <NumberFormatter value={Payout} thousandSeparator suffix=" ฿" />
              </Text>
              <Text size="md">
                รวมจ่ายสุทธิ : <NumberFormatter value={Total} thousandSeparator suffix=" ฿" />
              </Text>
            </Flex>
          </Paper>
          {LoadTable ? <SkeletonTable /> : <MDBDataTableV5 data={Tablelist} responsive striped searchLabel="ค้นหาจากเลขบัตร หรือ ชื่อ" barReverse searchTop searchBottom={false} noRecordsFoundLabel="ไม่พบรายการ" />}
        </Paper>
      </Container>
    </>
  );
}

export default Reportexpenditure;
