import { Button, Flex, Modal, NumberInput, Select, SimpleGrid, TextInput } from "@mantine/core";
import { IconDeviceFloppy, IconPlus, IconSearch } from "@tabler/icons-react";
import React, { useState } from "react";
import { API } from "../../../Config/ConfigApi";
import axios from "axios";
import { useForm } from "@mantine/form";

function ModalAddSalary({ Month, YearSelect, DataYear, DataMonth, DataBudget,LastSalary,idbudget,citizenid ,customers_type}) {
  const [Open, setOpen] = useState(false);
  const form = useForm({
    initialValues: {
      year: "",
      month: "",
      idbudget: null,
      salary: null,
      citizenid: "",
    },
  });
  const AddSalary = (value) => {
    const fmdata = new FormData()
    fmdata.append("customers_citizent",value.citizenid)
    fmdata.append("history_salary_year",value.year)
    fmdata.append("history_salary_month",value.month)
    fmdata.append("customers_type",value.month)
    fmdata.append("history_salary",value.salary)
    fmdata.append("idbudget",value.idbudget)

    // history_salary_year : 2023,
    // history_salary_month : 01,
    // customers_type : 4,
    // history_salary :22000,
    // idbudget:1
    axios.post().then((res)=>{

    })
  }
  
  return (
    <div>
      <Button
        onClick={() => {
          form.setValues({
            year: YearSelect,
            month: Month,
            idbudget: idbudget,
            salary: LastSalary,
            citizenid: citizenid,
          })
          setOpen(true);
        }}
        color="var(--success)"
        leftSection={<IconPlus />}
      > 
        เพิ่มข้อมูลเงินเดือน 
      </Button>
      <Modal
        opened={Open}
        onClose={() => {
          setOpen(false);
        }}
        title="เพิ่มข้อมูลเงินเดือน"
      >
        <form onSubmit={form.onSubmit((value)=>{
          AddSalary(value)
        })}>
            <SimpleGrid cols={{ base: 1, sm: 2 }}>
          <Select data={DataYear} {...form.getInputProps("year")} readOnly label="ปีล่าสุด" />
          <Select data={DataMonth} {...form.getInputProps("month")} allowDeselect={false} label="เดือน" />
          <Select
            data={DataBudget}
            allowDeselect={false}
            label="ประเภทงบประมาณล่าสุด"
            {...form.getInputProps("idbudget")}
          />
          <NumberInput {...form.getInputProps("salary")} thousandSeparator suffix=" ฿" label="เงินเดือนล่าสุด" />
        </SimpleGrid>{" "}
        <Flex justify={"flex-end"} py={10}>
          <Button color="var(--success)" leftSection={<IconDeviceFloppy />}>
            บันทึก 
          </Button>
          <Button onClick={() => setOpen(false)} color="var(--danger)" variant="transparent">
            ยกเลิก
          </Button>
        </Flex>
        </form>
      
      </Modal>
    </div>
  );
}

export default ModalAddSalary;
