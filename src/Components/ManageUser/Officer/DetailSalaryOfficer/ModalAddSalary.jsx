import { Button, Flex, Modal, NumberInput, Select, SimpleGrid, TextInput } from "@mantine/core";
import { IconDeviceFloppy, IconPlus, IconSearch } from "@tabler/icons-react";
import React, { useState } from "react";
import { API } from "../../../Config/ConfigApi";
import axios from "axios";
import { useForm } from "@mantine/form";
import Swal from "sweetalert2";

function ModalAddSalary({ Month, YearSelect, DataYear, DataMonth, DataBudget,LastSalary,idbudget,citizenid ,customers_type,fetch}) {
  const [Open, setOpen] = useState(false);
  const form = useForm({
    initialValues: {
      year: "",
      month: "",
      idbudget: null,
      salary: null,
      citizenid: "",
      customers_type:""
    },
  });
  const AddSalary = (value) => {
    const fmdata = new FormData()
    fmdata.append("customers_citizent",value.citizenid)
    fmdata.append("history_salary_year",value.year)
    fmdata.append("history_salary_month",value.month)
    fmdata.append("customers_type",value.customers_type)
    fmdata.append("history_salary_salary",value.salary)
    fmdata.append("idbudget",value.idbudget)
    axios.post(API+"/index/Inserthistorysalary",fmdata).then((res)=>{
      if(res.data === "200"){
        Swal.fire({
          icon:"success",
          title:'เพิ่มข้อมูลเงินเดือนสำเร็จ',
          timer:1200,
          timerProgressBar:true,
          showConfirmButton:false
        }).then((res)=>{
          fetch()
          setOpen(false)
        })
      }else if(res.data === "have"){
        Swal.fire({
          icon:"warning",
          title:'ไม่สามารถเพิ่มได้',
          text:'มีรายการเงินของเดือนนี้ในระบบแล้ว',
          timer:1200,
          timerProgressBar:true,
          showConfirmButton:false
        }).then((res)=>{
          fetch()
          setOpen(false)
        })
      }else{
         console.log(res.data)
      }
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
            customers_type:customers_type
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
          <Select searchable data={DataYear} {...form.getInputProps("year")} readOnly label="ปีล่าสุด" />
          <Select searchable data={DataMonth} {...form.getInputProps("month")} allowDeselect={false} label="เดือน" />
          <Select searchable
            data={DataBudget}
            allowDeselect={false}
            label="ประเภทงบประมาณล่าสุด"
            {...form.getInputProps("idbudget")}
          />
          <NumberInput {...form.getInputProps("salary")} thousandSeparator suffix=" ฿" label="เงินเดือนล่าสุด" />
        </SimpleGrid>{" "}
        <Flex justify={"flex-end"} py={10}>
          <Button type="submit" color="var(--success)" leftSection={<IconDeviceFloppy />}>
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
