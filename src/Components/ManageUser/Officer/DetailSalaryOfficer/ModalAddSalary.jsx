import { Button, Flex, Modal, NumberInput, Select, SimpleGrid, TextInput } from "@mantine/core";
import { IconDeviceFloppy, IconPlus, IconSearch } from "@tabler/icons-react";
import React, { useState } from "react";
import { API } from "../../../Config/ConfigApi";
import axios from "axios";
import { useForm } from "@mantine/form";
import Swal from "sweetalert2";

function ModalAddSalary({ Month, YearSelect, DataYear, DataMonth, DataBudget, LastSalary, idbudget, citizenid, customers_type, fetch, customers_line }) {
  const [Open, setOpen] = useState(false);
  const form = useForm({
    initialValues: {
      year: "",
      month: "",
      idbudget: "",
      salary: "",
      citizenid: "",
      customers_type: "",
      line: "",
      salary1715: "",
      salary01: "",
    },
  });
  const AddSalary = (value) => {
    const fmdata = new FormData();
    fmdata.append("customers_citizent", value.citizenid);
    fmdata.append("history_salary_year", value.year);
    fmdata.append("history_salary_month", value.month);
    fmdata.append("customers_type", value.customers_type);
    fmdata.append("history_salary_salary", value.salary);
    fmdata.append("salary1715", value.salary);
    fmdata.append("salary01", value.salary1715);
    fmdata.append("idbudget", value.idbudget);
    axios.post(API + "/index/Inserthistorysalary", fmdata).then((res) => {
      if (res.data === "200") {
        Swal.fire({
          icon: "success",
          title: "เพิ่มข้อมูลเงินเดือนสำเร็จ",
          timer: 600,
          timerProgressBar: true,
          showConfirmButton: false,
        }).then((res) => {
          fetch();
          setOpen(false);
        });
      } else if (res.data === "have") {
        Swal.fire({
          icon: "warning",
          title: "ไม่สามารถเพิ่มได้",
          text: "มีรายการเงินของเดือนนี้ในระบบแล้ว",
          timer: 600,
          timerProgressBar: true,
          showConfirmButton: false,
        }).then((res) => {
          fetch();
          setOpen(false);
        });
      } else {
        console.log(res.data);
      }
    });
  };
const SalaryChane = (salary) => {
  form.setValues({salary:salary})
  function round(number, num_digits) {
    const decimalPlaces = 2;
    const result = number.toFixed(decimalPlaces);

    const factor = Math.pow(10, num_digits);
    const result1 = Math.round(result * factor) / factor;
    return result1.toFixed(decimalPlaces);
  }
  // i.customers_type === "4" ? (i.customers_line ===  1 ? round((i.เงินเดือนบัจจุบัน * 1.7) / 1.6, -1) : round((i.เงินเดือนบัจจุบัน * 1.5) / 1.4, -1)) : "0.00",
  if(customers_type === "4"){
    if(customers_line === "1"){
      const money = round((salary*1.7)/1.6,-1);
      console.log(money)
      form.setValues({salary1715:money});
      const money2 = money - salary
      form.setValues({salary01:money2});
    }else if(customers_line === "2"){
      const money = round((salary*1.5)/1.4,-1);
      form.setValues({salary1715:money});
      const money2 = money - salary
      form.setValues({salary01:money2});
      console.log(money)
    }
  }else{
    form.setValues({salary1715:0});
    form.setValues({salary01:0});
  }
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
            customers_type: customers_type,
            line: customers_line,
          });
          SalaryChane(LastSalary)
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
        <form
          onSubmit={form.onSubmit((value) => {
            AddSalary(value);
          })}
        >
          <SimpleGrid cols={{ base: 1, sm: 2 }}>
            <Select searchable data={DataYear} {...form.getInputProps("year")} readOnly label="ปีล่าสุด" />
            <Select searchable data={DataMonth} {...form.getInputProps("month")} allowDeselect={false} label="เดือน" />
            <Select searchable data={DataBudget} allowDeselect={false} label="ประเภทงบประมาณล่าสุด" {...form.getInputProps("idbudget")} />
            <NumberInput value={form.values.salary} onChange={SalaryChane} thousandSeparator suffix=" ฿" label="เงินเดือนล่าสุด" />
            <NumberInput disabled label="เงินเดือน 1.5/1.7" {...form.getInputProps("salary1715")} thousandSeparator suffix=" ฿"  />
            <NumberInput disabled label="เงินเดือน 0.1" {...form.getInputProps("salary01")} thousandSeparator suffix=" ฿"  />
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
