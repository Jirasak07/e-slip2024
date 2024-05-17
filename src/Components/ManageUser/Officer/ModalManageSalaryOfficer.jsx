import { Button, Flex, Modal, NumberFormatter, Paper, Select, SimpleGrid, Text } from "@mantine/core";
import { IconCoin, IconSearch } from "@tabler/icons-react";
import { MDBDataTableV5 } from "mdbreact";
import React, { useState } from "react";
import ModalAddSalary from "./DetailSalaryOfficer/ModalAddSalary";
import axios from "axios";
import { API } from "../../Config/ConfigApi";
import ModalEditSalary from "./DetailSalaryOfficer/ModalEditSalary";
import ModalDeleteSalary from "./DetailSalaryOfficer/ModalDeleteSalary";

function ModalManageSalaryOfficer({ citizenid,customer_type_id }) {
  const [Open, setOpen] = useState(false);
  const column = [
    {
      label: "ลำดับ",
      field: "no",
      minimal: "sm",
    },
    {
      label: "ปี",
      field: "year",
      minimal: "sm",
    },
    {
      label: "เดือน",
      field: "month",
      minimal: "sm",
    },
    {
      label: "เงินเดือน",
      field: "salary",
      minimal: "md",
    },
    {
      label: "ประเภทงบประมาณ",
      field: "budget",
      minimal: "lg",
    },
    {
      label: "จัดการ",
      field: "manage",
      minimal: "lg",
    },
  ];
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
  const [Table, setTable] = useState({
    columns: column,
    rows: [],
  });
  const [YearNow, setYearNow] = useState(new Date().getFullYear().toString());
  const [DataYear, setDataYear] = useState([]);
  const FetchYear = () => {
    // setLoadTable(true);
    setTimeout(() => {
      axios.get(API + "/index/showyear").then((res) => {

        const data = res.data;
        if (data.length !== 0) {
          // setLoadTable(false);
          const select = data.map((i) => ({
            value: i.name_year,
            label: i.name_year_th,
          }));
          setDataYear(select);
        }
      });
    }, 400);
  };
  const [SelectDataBudget, setSelectDataBudget] = useState([]);
  const FetchBudget = (params) => {
    axios.get(API + "/index/showBudget").then((res) => {
      const data = res.data;
      if (data.length !== 0) {
        //   setLoadTable(false);
        const select = data.map((i) => ({
          value: i.idbudget,
          label: i.namebudget,
        }));
        setSelectDataBudget(select);
      }
    });
  };
  const [LastSalary, setLastSalary] = useState("");
  const [IdBudget, setIdBudget] = useState("");
  const FetchHistorySalary = (params) => {
    axios.get(API + "/index/showhistorysalary/" + citizenid + "/" + YearNow).then((res) => {
      const data = res.data;
      if (data.length !== 0) {

        setLastSalary(data[data.length-1].history_salary_salary)
        setIdBudget(data[data.length-1].idbudget)
        
        setTable({
          columns: column,
          rows: [
            ...data.map((i, key) => ({
              no: key + 1,
              year: parseInt(i.history_salary_year) + 543,
              month: (selectmount.find((val) => val.value === i.history_salary_month) || {}).label,
              salary: <NumberFormatter thousandSeparator value={i.history_salary_salary} suffix=" ฿" />,
              budget: (
                <Text fz={14} c={i.namebudget === null ? "var(--danger)" : "blue"}>
                  {i.namebudget === null ? "ไม่ได้ระบุ" : i.namebudget}{" "}
                </Text>
              ),
              manage: (
                <Flex gap={10}>
                  <ModalEditSalary
                    total={i.history_salary_salary}
                    idbudget={i.idbudget}
                    citizenid={i.customers_citizent}
                    year={i.history_salary_year}
                    month={i.history_salary_month}
                    fetch={Fetchh}
                  />
                  <ModalDeleteSalary />
                </Flex>
              ),
            })),
          ],
        });
      }
    });
  };
const Fetchh = (params) => {
  FetchHistorySalary() 
}

  return (
    <>
      <Button
        onClick={() => {
          FetchBudget();
          FetchYear();
          FetchHistorySalary();
          setOpen(true);
        }}
        leftSection={<IconCoin />}
        size="xs"
        color="var(--purple)"
      >
        เงินเดือน
      </Button>
      <Modal
        closeOnClickOutside={false}
        opened={Open}
        onClose={() => {
          setOpen(false);
        }}
        size={"xl"}
        title="จัดการเงินเดือน"
      >
        <Paper>
          <SimpleGrid cols={3}>
            <Select searchable
              allowDeselect={false}
              searchable
              label="เลือกปี"
              value={YearNow}
              onChange={(v) => setYearNow(v)}
              data={DataYear}
            />
            <Flex pt={33}>
              <Button color="var(--primary)" leftSection={<IconSearch />}>
                เลือก
              </Button>
            </Flex>
            <Flex pt={33} justify={"flex-end"}>
              <ModalAddSalary
                DataBudget={SelectDataBudget}
                YearSelect={YearNow}
                Month={Table.rows[Table.rows.length]}
                DataYear={DataYear}
                DataMonth={selectmount}
                LastSalary={LastSalary}
                idbudget={IdBudget}
                citizenid={citizenid}
                customers_type={customer_type_id}
                fetch={Fetchh}
              />
            </Flex>
          </SimpleGrid>
        </Paper>
        <Paper>
          <MDBDataTableV5 responsive data={Table} />
        </Paper>
      </Modal>
    </>
  );
}

export default ModalManageSalaryOfficer;
