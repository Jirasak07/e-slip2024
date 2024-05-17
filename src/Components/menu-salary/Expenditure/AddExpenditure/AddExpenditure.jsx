import { Badge, Button, Container, NumberFormatter, Paper, Select, SimpleGrid } from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { IconSearch } from "@tabler/icons-react";
import { MDBDataTableV5 } from "mdbreact";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Text } from "@mantine/core";
import { API } from "../../../Config/ConfigApi";
import SkeletonTable from "../../../Publicc-user/SkeletonTable";
import ModalAddExpenditure from "./ModalAddExpenditure";

function AddExpenditure() {
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
      label: "รายการรายจ่าย",
      field: "expenditure",
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
  const [SelectDataExpend, setSelectDataExpend] = useState([]);

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
  const SelectExpenditure = (id) => {
    axios.get(API + "/index/showexpenditure/" + id).then((res) => {
      const data = res.data;
      if (data.length !== 0) {
        const select = data.map((i) => ({
          value: i.expenditure_id,
          label: i.expenditure_name,
        }));
        setSelectDataExpend(select);
      }
    });
  };

  const submitdata = (value) => {
    setLoadTable(true);
    axios
      .get(
        API +
          "/index/showexpenditurewhereid/" +
          value.type_employ +
          "/" +
          value.expenditure_id +
          "/" +
          value.year +
          "/" +
          value.month
      )
      .then((res) => {
        console.warn(res);
        const data = res.data;
        if (data.lenth !== 0) {
          setTableSalary({
            columns: column,
            rows: [
              ...data.map((i, key) => ({
                no: key + 1,
                citizen: i.customers_citizent,
                name: i.customers_pname + i.customers_name + " " + i.customers_lname,
                type_employ: (DataTypeEmploy.find((val) => val.value === i.customers_type) || {}).label,
                expenditure: (
                  <Text c="blue" fz={14}>
                    {i.expenditure_name}
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
                    <ModalAddExpenditure
                      expend_id={i.expenditure_id}
                      budget_id={i.idbudget}
                      citiid={i.customers_citizent}
                      payslip_total={i.payslip_total}
                      expend_name={i.expenditure_name}
                      payslip_month={i.payslip_month}
                      payslip_status_out={i.payslip_status_out}
                      payslip_year={i.payslip_year}
                      expend_name_title={
                        i.expenditure_name + "  " + i.customers_pname + i.customers_name + " " + i.customers_lname
                      }
                      Serch={Serch}
                    />
                  </>
                ),
              })),
            ],
          });
        }
        setLoadTable(false);
      });
  };
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
      expenditure_id: "",
    },

    validate: {
      type_employ: (v) => (v !== "" ? null : "กรุณาเลือกประเภทบุคลากร"),
      month: (v) => (v !== "" ? null : "กรุณาเลือกเดือน"),
      year: (v) => (v !== "" ? null : "กรุณาเลือกปี"),
      expenditure_id: isNotEmpty("กรุณาเลือกประเภทรายจ่าย"),
    },
  });
  return (
    <>
      <Container p={0} bg={"white"} fluid>
        <Badge color="var(--primary)" variant="light" size="md" radius={8}>
        เพิ่มรายจ่ายแยกตามประเภท
        </Badge>
        <Paper mt={20}>
          <form
            onSubmit={formSearch.onSubmit((v) => {
              submitdata(v);
              // console.log(v);
            })}
          >
 <SimpleGrid cols={{base:1,md:4,sm:2}}>
              <Select searchable
                allowDeselect={false}
                searchable
                data={DataTypeEmploy}
                value={formSearch.values.type_employ}
                error={formSearch.errors.type_employ}
                //   {...formSearch.getInputProps("type_employ")}
                onChange={(val) => {
                  formSearch.setValues({
                    type_employ: val,
                    expenditure_id: null,
                  });
                  SelectExpenditure(val);
                }}
                label="ประเภทบุคลากร"
              />
              <Select searchable
                searchable
                allowDeselect={false}
                label="ประเภทรายจ่าย"
                data={SelectDataExpend}
                {...formSearch.getInputProps("expenditure_id")}
              />
 <SimpleGrid cols={{base:1,md:2,sm:2}}>
                <Select searchable allowDeselect={false} label="เดือน" data={selectmount} {...formSearch.getInputProps("month")} />
                <Select searchable allowDeselect={false} label="ปี" data={DataYear} {...formSearch.getInputProps("year")} />
              </SimpleGrid>

              <Button type="submit" mt={33} leftSection={<IconSearch />}>
                ค้นหา
              </Button>
            </SimpleGrid>
          </form>
        </Paper>
        <Paper pt={20}>
          {LoadTable ? (
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
          )}
        </Paper>
      </Container>
    </>
  );
}

export default AddExpenditure;
