import {
  Badge,
  Button,
  Container,
  Flex,
  NumberFormatter,
  Paper,
  Select,
  SimpleGrid,
} from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { IconSearch } from "@tabler/icons-react";
import { MDBDataTableV5 } from "mdbreact";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Text } from "@mantine/core";
import { API } from "../../../Config/ConfigApi";
import SkeletonTable from "../../../Publicc-user/SkeletonTable";
import ModalAddRevenue from "./ModalAddRevenue";
import ModalAddRevenueDifBudget from "./ModalAddRevenueDifBudget";

function AddRevenue() {
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
      label: "รายการรายรับ",
      field: "revenue",
      minimal: "lg",
    },
    {
      label: "งบประมาณ",
      field: "budget",
      minimal: "lg",
    },
    {
      label: "จำนวน",
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
  const [SelectDatarevenue, setSelectDatarevenue] = useState([]);

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
  const Selectrevenue = (id) => {
    axios.get(API + "/index/showrevenue/" + id).then((res) => {
      const data = res.data;
      if (data.length !== 0) {
        const select = data.map((i) => ({
          value: i.revenue_id,
          label: i.revenue_name,
        }));
        setSelectDatarevenue(select);
      }
    });
  };

  const submitdata = (value) => {
    setLoadTable(true);
    setAdded(true);
    axios
      .get(
        API +
          "/index/showrevenuewhereid/" +
          value.type_employ +
          "/" +
          value.revenue_id +
          "/" +
          value.year +
          "/" +
          value.month
      )
      .then((res) => {
        console.warn(res);
        const data = res.data;
        if (data.lenth !== 0) {
          setLoadTable(false);
          setTableSalary({
            columns: column,
            rows: [
              ...data.map((i, key) => ({
                no: key + 1,
                citizen: i.customers_citizent,
                name: i.customers_pname + i.customers_name + " " + i.customers_lname,
                type_employ: (DataTypeEmploy.find((val) => val.value === i.customers_type) || {})
                  .label,
                revenue: (
                  <Text c="green" fz={14}>
                    {i.revenue_name}
                  </Text>
                ),
                budget: (
                  <Text fz={14} c={i.namebudget === null ? "red.5" : "blue.5"}>
                    {i.namebudget === null ? "ไม่ได้ระบุ" : i.namebudget}
                  </Text>
                ),
                total: (
                  <Text fz={14} c="dark.9">
                    {" "}
                    <NumberFormatter suffix=" ฿" value={i.payslip_total} thousandSeparator />{" "}
                  </Text>
                ),
                manage: (
                  <>
                    <ModalAddRevenue
                      revenue_id={i.revenue_id}
                      budget_id={i.idbudget}
                      citiid={i.customers_citizent}
                      payslip_total={i.payslip_total}
                      month={i.payslip_month}
                      payslip_status_out={i.payslip_status_out}
                      revenue_name={i.revenue_name}
                      revenue_name_title={
                        i.revenue_name +
                        "  " +
                        i.customers_pname +
                        i.customers_name +
                        " " +
                        i.customers_lname
                      }
                      Serch={Serch}
                      payslip_year={i.payslip_year}
                    />
                  </>
                ),
              })),
            ],
          });
          const total = data.reduce(
            (sum, current) => (sum = sum + Number(current.payslip_total)),
            0
          );
          let totals = Math.floor(total * 100) / 100;
          setTotal(totals);
        }else{

          setLoadTable(false);
        }

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
      });
  };
  const [Total, setTotal] = useState(0);
  useEffect(() => {
    FetchTypeEmploy();

    FetchYear();
  }, []);
  const Serch = (data) => {
    submitdata(formSearch.values);
  };

  const formSearch = useForm({
    initialValues: {
      type_employ: "",
      month:
        (new Date().getMonth() + 1).toString().length === 1
          ? "0" + (new Date().getMonth() + 1).toString()
          : (new Date().getMonth() + 1).toString(),
      year: new Date().getFullYear().toString(),
      revenue_id: "",
    },

    validate: {
      type_employ: (v) => (v !== "" ? null : "กรุณาเลือกประเภทบุคลากร"),
      month: (v) => (v !== "" ? null : "กรุณาเลือกเดือน"),
      year: (v) => (v !== "" ? null : "กรุณาเลือกปี"),
      revenue_id: isNotEmpty("กรุณาเลือกประเภทรายรับ"),
    },
  });
  const [Added, setAdded] = useState(false);
  const FN = (params) => {
    submitdata(formSearch.values);
  };

  return (
    <>
      <Container p={0} bg={"white"} fluid>
        <Badge color="var(--primary)" variant="light" size="md" radius={8}>
          เพิ่มรายรับแยกตามประเภท
        </Badge>
        <Paper mt={20}>
          <form
            onSubmit={formSearch.onSubmit((v) => {
              submitdata(v);
              // console.log(v);
            })}
          >
            <SimpleGrid cols={{ base: 1, md: 4, sm: 2 }}>
              <Select
                searchable
                allowDeselect={false}
                data={DataTypeEmploy}
                value={formSearch.values.type_employ}
                error={formSearch.errors.type_employ}
                //   {...formSearch.getInputProps("type_employ")}
                onChange={(val) => {
                  formSearch.setValues({
                    type_employ: val,
                    revenue_id: null,
                  });
                  Selectrevenue(val);
                }}
                label="ประเภทบุคลากร"
              />
              <Select
                searchable
                allowDeselect={false}
                label="ประเภทรายรับ"
                data={SelectDatarevenue}
                {...formSearch.getInputProps("revenue_id")}
              />

              <SimpleGrid cols={{ base: 1, sm: 2 }}>
                <Select
                  searchable
                  allowDeselect={false}
                  label="เดือน"
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

              <Button type="submit" mt={33} leftSection={<IconSearch />}>
                ค้นหา
              </Button>
            </SimpleGrid>
          </form>
        </Paper>
        <Paper p={10}>
          <Flex justify={"flex-end"}>
            <Text px={10} fz={20} my={10}>
              ยอดรวม{" "}
              <Badge fz={20} radius={4} size="md" color="green" variant="light">
                <NumberFormatter value={Total} thousandSeparator />
              </Badge>{" "}
              บาท
            </Text>
          </Flex>
        </Paper>
        <Paper>
          <ModalAddRevenueDifBudget
            customer_type={formSearch.values.type_employ}
            revenue={formSearch.values.revenue_id}
            month={formSearch.values.month}
            years={formSearch.values.year}
            DATEMONTH={selectmount}
            DATAYEAR={DataYear}
            DATAEMP={DataTypeEmploy}
            disable={!Added}
            FN={FN}
          />
        </Paper>
        <Paper pt={20}>
          {LoadTable ? (
            <SkeletonTable />
          ) : (
            <MDBDataTableV5
              entries={100}
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
    </>
  );
}

export default AddRevenue;
