import { Button, Flex, Modal, Paper, Select, SimpleGrid } from "@mantine/core";
import { IconCoin, IconSearch } from "@tabler/icons-react";
import { MDBDataTableV5 } from "mdbreact";
import React, { useState } from "react";
import ModalAddSalary from "./DetailSalaryOfficer/ModalAddSalary";
import axios from "axios";
import { API } from "../../Config/ConfigApi";

function ModalManageSalaryOfficer() {
  const [Open, setOpen] = useState(false);
  const column = [
    {
      label:'ลำดับ',
      field:'no',
      minimal:'sm'
    },
    {
      label:'ปี',
      field:'year',
      minimal:'sm'
    },
    {
      label:'เดือน',
      field:'month',
      minimal:'sm'
    },
    {
      label:'เงินเดือน',
      field:'salary',
      minimal:'md'
    },
    {
      label:'ประเภทงบประมาณ',
      field:'budget',
      minimal:'lg'
    },
    {
      label:'จัดการ',
      field:'manage',
      minimal:'lg'
    },
  ]
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
    columns:column,
    rows:[]
  });
  const [YearNow, setYearNow] = useState((new Date().getFullYear().toString()));
  const [DataYear, setDataYear] = useState([]);
  const FetchYear = () => {
    // setLoadTable(true);
    setTimeout(() => {
      axios.get(API + "/index/showyear").then((res) => {
        // console.log(res.data);
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
  }
  const [SelectDataBudget, setSelectDataBudget] = useState([]);
  const FetchBudget = (params) => {
   axios.get(API+"/index/showBudget").then((res)=>{
    const data = res.data;
    if (data.length !== 0) {
    //   setLoadTable(false);
      const select = data.map((i) => ({
        value: i.idbudget,
        label: i.namebudget,
      }));
      setSelectDataBudget(select);
    }
   }) 
  }
  return (
    <>
      <Button
        onClick={() => {
          FetchBudget()
          FetchYear()
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
          <SimpleGrid cols={3} >
            <Select allowDeselect={false} searchable label="เลือกปี" value={YearNow} onChange={(v)=>setYearNow(v)} data={DataYear} />
            <Flex pt={33} >
              <Button color="var(--primary)" leftSection={<IconSearch/>}  >เลือก</Button>
            </Flex>
            <Flex pt={33} justify={"flex-end"} >
              <ModalAddSalary DataBudget={SelectDataBudget} YearSelect={YearNow} Month={"01"} DataYear={DataYear} DataMonth={selectmount} />
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
