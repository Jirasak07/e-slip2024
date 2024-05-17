import { Button, Flex, Modal, NumberInput, Select, SimpleGrid, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { IconCoin, IconDeviceFloppy, IconEdit } from "@tabler/icons-react";
import axios from "axios";
import React, { useState } from "react";
import { API } from "../../../Config/ConfigApi";
import Swal from "sweetalert2";

function ModalEditSalary({ total, idbudget, citizenid, year, month,fetch }) {
  const [opened, { open, close }] = useDisclosure();
  const formEditSalary = useForm({
    initialValues: {
      customer_citizent: "",
      history_salary_salary: "",
      history_salary_year: "",
      history_salary_month: "",
      idbudget: "",
    },
    validate: {},
  });
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
  const Submit = (val) => {
    const body = new FormData();
    body.append("customers_citizent", val.customer_citizent);
    body.append("history_salary_year", val.history_salary_year);
    body.append("history_salary_month", val.history_salary_month);
    body.append("history_salary", val.history_salary_salary);
    body.append("idbudget", val.idbudget);
    axios.post(API + "/index/updatehistorysalary", body).then((res) => {
     if(res.data === "200"){
      Swal.fire({
        icon:"success",
        title:'อัพเดทข้อมูลเงินเดือนสำเร็จ',
        timer:1200,
        timerProgressBar:true,
        showConfirmButton:false
      }).then((res)=>{
        fetch()
        close()
      })
     }
    });
  };

  return (
    <div>
      <Button
        onClick={() => {
          FetchBudget();
          formEditSalary.setValues({
            customer_citizent: citizenid,
            history_salary_salary: total,
            history_salary_year: year,
            history_salary_month: month,
            idbudget: idbudget,
          });
          open();
        }}
        leftSection={<IconEdit />}
        color="var(--warning)"
        size="xs"
      >
        แก้ไข
      </Button>
      <Modal title="แก้ไขข้อมูลเงินเดือน" opened={opened} onClose={close}>
        <form onSubmit={formEditSalary.onSubmit((val) => {Submit(val)})}>
          <SimpleGrid>
            <Select searchable data={SelectDataBudget} label="ประเภทงบประมาณ" {...formEditSalary.getInputProps("idbudget")} />
            <TextInput
              type="number"
              rightSection={<IconCoin />}
              rightSectionPointerEvents="none"
              suffix=" ฿"
              {...formEditSalary.getInputProps("history_salary_salary")}
              label="จำนวนเงิน"
              thousandSeparator
            />
          </SimpleGrid>
          <Flex justify={"flex-end"} pt={10}>
            <Button type="submit" leftSection={<IconDeviceFloppy />} color="var(--success)">
              บันทึก
            </Button>
            <Button onClick={close} leftSection={<IconDeviceFloppy />} color="var(--danger)" variant="transparent">
              ยกเลิก
            </Button>
          </Flex>
        </form>
      </Modal>
    </div>
  );
}

export default ModalEditSalary;
