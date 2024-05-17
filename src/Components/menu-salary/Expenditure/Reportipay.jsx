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
  Table,
} from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import {
  IconSearch,
  IconPrinter,
  IconCircleCheck,
  IconCircleDashed,
} from "@tabler/icons-react";
import { MDBDataTableV5 } from "mdbreact";
import { useEffect, useState } from "react";
import { API } from "../../Config/ConfigApi";
import axios from "axios";
import Swal from "sweetalert2";
import { Text } from "@mantine/core";
import SkeletonTable from "../../Publicc-user/SkeletonTable";
import ExcelJs from "exceljs";
import Btndownloadtobank from "./Btndownloadtobank";

function Reportipay() {
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
      label: "รายจ่าย",
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

  const [TableSalary, setTableSalary] = useState({
    columns: column,
    rows: [],
  });
  const [LoadTable, setLoadTable] = useState(false);
  const [DataBudget, setDataBudget] = useState([]);
  const [DataYear, setDataYear] = useState([]);
  const [DataTotalsummary, setDataTotalsummary] = useState([]);
  const [Dataexpenditurelist, setDataexpenditurelist] = useState([]);
  const [Dataipay, setDataipay] = useState({
    columns: column,
    rows: [],
  });

  const [Datarevenueipay, setDatarevenueipay] = useState({
    columns: column,
    rows: [],
  });

  const ExcelExport = () => {
    const workbook = new ExcelJs.Workbook();
    const sheet = workbook.addWorksheet("รายหัก");
    sheet.properties.defaultRowHeight = 15;

    sheet.columns = [
      {
        header: "ชื่อ",
        key: "name",
        width: 20,
      },
      {
        header: "เงิน",
        key: "names",
        width: 20,
      },
      {
        header: "จ่ายนอก",
        key: "namesout",
        width: 20,
      },
      {
        header: "ยอดส่ง",
        key: "namestotal",
        width: 20,
      },
    ];

    Dataipay.map((i) =>
      sheet.addRow({
        name: i.expenditure_name,
        names: Number(i.sum),
        namesout: Number(i.sumout),
        namestotal: Number(i.totalfinal),
      })
    );
    const sum = Dataipay.filter(
      (Dataipay) =>
        Dataipay.expenditure_name !== "ธนาคารกรุงไทย" &&
        Dataipay.expenditure_name !== "ธนาคารกรุงเทพ"
    ).reduce((sum, currentItem) => (sum = sum + Number(currentItem.sum)), 0);
    
    const sumout = Dataipay.filter(
      (Dataipay) =>
        Dataipay.expenditure_name !== "ธนาคารกรุงไทย" &&
        Dataipay.expenditure_name !== "ธนาคารกรุงเทพ"
    ).reduce(
      (sumout, currentItem) => (sumout = sumout + Number(currentItem.sumout)),
      0
    );
    const total = sum + sumout;

    sheet.addRow({
      name: "รวมเงินรายจ่าย ",
      names: sum,
      namesout: sumout,
      namestotal: total,
    });

    const sheet2 = workbook.addWorksheet("รายได้");
    sheet2.properties.defaultRowHeight = 15;

    sheet2.columns = [
      {
        header: "รายการ",
        key: "name",
        width: 20,
      },
      {
        header: "เงินรวม",
        key: "names",
        width: 20,
      },
      {
        header: "ยอดส่ง",
        key: "namestotal",
        width: 20,
      },
    ];

    Datarevenueipay.map((i) =>
      sheet2.addRow({
        name: i.revenue_name,
        names: Number(i.sumrevenue),
        namestotal: Number(i.sumrevenue),
      })
    );
    const sumrevenue = Datarevenueipay.filter(
      (Datarevenueipay) => Datarevenueipay.revenue_name !== "null"
    ).reduce(
      (sumrevenue, currentItem) =>
        (sumrevenue = sumrevenue + Number(currentItem.sumrevenue)),
      0
    );

    const total2 = sumrevenue;
    sheet2.addRow({
      name: "รวมเงินรายรับ ",
      names: total2,
      namestotal: total2,
    });

    workbook.xlsx.writeBuffer().then((data) => {
      const blob = new Blob([data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheet.sheet",
      });
      const url = window.URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download =
        "รายงาน ipay" +
        formSearch.values.year +
        "-" +
        formSearch.values.month +
        "-ประเภทงบ" +
        formSearch.values.idbudget +
        ".xlsx";
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
      axios.get(API + "/index/showrevenuelist").then((res) => {
        //    console.log(res.data);
        const data = res.data;
        if (data.length !== 0) {
          setLoadTable(false);
          const select = data.map((i) => ({
            value: i.revenue_name,
            label: i.revenue_name,
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
    // console.log(value.idbudget);
    // console.log(value.month);
    // console.log(value.year);

    axios
      .get(
        API +
          "/index/showhTotalsummarybank/" +
          value.year +
          "/" +
          value.month +
          "/" +
          value.idbudget
      )
      .then((res) => {
        console.log(res.data);
        const data = res.data;
        if (data.length !== 0) {
          //  setLoadTable(false);

          setDataTotalsummary(res.data);
        }
      });

    axios
      .get(
        API +
          "/index/showipayall/" +
          value.year +
          "/" +
          value.month +
          "/" +
          value.idbudget
      )
      .then((res) => {
        console.log(res.data);
        const data = res.data;
        if (data.length !== 0) {
          //  setLoadTable(false);

          setDataipay(res.data);
          // console.log((res.data.reduce((a,v) =>  a = a + v.totalfinal , 0 )))

          const total = res.data.reduce(
            (total, currentItem) =>
              (total = total + Number(currentItem.totalfinal)),
            0
          );
          console.log(total);
        }
      });

    axios
      .get(
        API +
          "/index/showrevenuelistipay/" +
          value.year +
          "/" +
          value.month +
          "/" +
          value.idbudget
      )
      .then((res) => {
        console.log(res.data);
        const data = res.data;
        if (data.length !== 0) {
          //  setLoadTable(false);

          setDatarevenueipay(res.data);
        }
      });
  };

  const submitdata = (value) => {
    const form = Datasalarystart;
    console.log(value.values);
    console.log(form);
    axios
      .post(API + "/index/Addhistorysalarymonth", {
        month: value.values.monthend,
        year: value.values.yearend,
        check: form,
      })
      .then((res) => {
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
    FetchTypeshowBudget();
    FetchTshowexpenditurelist();
    FetchYear();
  }, []);

  const formSearch = useForm({
    initialValues: {
      idbudget: "",
      month: (new Date().getMonth().toString().length === 1
        ? "0" + new Date().getMonth()
        : new Date().getMonth()
      ).toString(),
      year: new Date().getFullYear().toString(),
    },

    validate: {
      idbudget: isNotEmpty("กรุณาเลือกประเภทงบประมาณ"),
      month: isNotEmpty("กรุณาเลือกเดือน"),
      year: isNotEmpty("กรุณาเลือกปี"),
    },
  });

  const rows = DataTotalsummary.map((element) => (
    <Table.Tr>
      <Table.Td>{element.bank_name}</Table.Td>
      <Table.Td>{element.MonneyFull}</Table.Td>
      <Table.Td>
        <Btndownloadtobank
          year={formSearch.values.year}
          month={formSearch.values.month}
          idbudget={formSearch.values.idbudget}
          bank_id={element.bank_id}
          bank_name={element.bank_name}
        />
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <>
      <Container p={0} bg={"white"} fluid>
        <Badge color="var(--primary)" variant="light" size="md" radius={8}>
          รายงาน IPAY
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
                <Select searchable
                  data={DataBudget}
                  {...formSearch.getInputProps("idbudget")}
                  label="งบประมาณ"
                />
              </Grid.Col>
            </Grid>
            <Grid gutter={{ base: 5, xs: "md", md: "xl", xl: 50 }}>
              <Grid.Col span={4}>
                <Select searchable
                  label="เดือน"
                  data={selectmount}
                  {...formSearch.getInputProps("month")}
                />
              </Grid.Col>
              <Grid.Col span={4}>
                <Select searchable
                  label="ปี"
                  data={DataYear}
                  {...formSearch.getInputProps("year")}
                />
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
            <Grid.Col span={8}>
              <Text size="xl">
                พบข้อมูลเงินเดือน {DataTotalsummary.length} รายการ
              </Text>

              <List
                spacing="xs"
                size="sm"
                mt={10}
                center
                icon={
                  <ThemeIcon color="teal" size={24} radius="xl">
                    <IconCircleCheck
                      style={{ width: rem(16), height: rem(16) }}
                    />
                  </ThemeIcon>
                }
              >
                {/* {DataTotalsummary.map((i, key) => (

                                        <List.Item>{i.bank_name}  {i.MonneyFull}</List.Item> 
                                    ))} */}
                <Table>
                  <Table.Thead>
                    <Table.Tr>
                      <Table.Th>ชื่อธนาคาร</Table.Th>
                      <Table.Th>จำนวน</Table.Th>
                      <Table.Th>ดาวน์โหลด</Table.Th>
                    </Table.Tr>
                  </Table.Thead>
                  <Table.Tbody>{rows}</Table.Tbody>
                </Table>
              </List>
              {DataTotalsummary.length !== 0 ? (
                <>
                  <Button
                    onClick={() => {
                      ExcelExport();
                    }}
                    color="green"
                    mt={20}
                  >
                    รายงานหักเงินเดือนทั้งหมด
                  </Button>
                </>
              ) : (
                <></>
              )}

              {/* <Button onClick={()=>submitdata(formSearch)} mt={33} leftSection={<IconSearch />}  color="var(--purpel)">
                                    อัพเดท
                                </Button> */}
            </Grid.Col>
          </Grid>
          {/* {LoadTable ? (
                        <SkeletonTable />
                    ) : (
                        <MDBDataTableV5
                            data={TableSalary}
                            responsive
                            striped
                            searchLabel="ค้นหาจากเลขบัตร หรือ ชื่อ"
                            barReverse
                            searchTop
                            searchBottom={false}
                            noRecordsFoundLabel="ไม่พบรายการ"
                        />
                    )} */}
        </Paper>
      </Container>
    </>
  );
}

export default Reportipay;
