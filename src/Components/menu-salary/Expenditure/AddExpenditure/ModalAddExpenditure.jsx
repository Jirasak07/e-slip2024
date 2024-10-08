import { Button, Flex, Modal, NumberInput, Select, SimpleGrid, Text, TextInput } from "@mantine/core";
import { IconDeviceFloppy, IconEdit, IconPlus } from "@tabler/icons-react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { API } from "../../../Config/ConfigApi";
import { isNotEmpty, useForm } from "@mantine/form";
import Swal from "sweetalert2";

function ModalAddExpenditure({
  expend_name_title,
  expend_name,
  budget_id,
  citiid,
  payslip_total,
  expend_id,
  Serch,
  payslip_year,
  payslip_month,
  payslip_status_out,
}) {
  const [OpenModal, setOpenModal] = useState(false);
  const [SelectDataBudget, setSelectDataBudget] = useState([]);
  const FetchBudget = () => {
    axios.get(API + "/index/showBudget").then((res) => {
      const data = res.data;
      if (data.length !== 0) {
        const select = data.map((i) => ({
          value: i.idbudget,
          label: i.namebudget+" ( "+i.idbudget+" ) ",
        }));
        setSelectDataBudget(select);
      }
    });
  };
  const formAddExpendCustomer = useForm({
    initialValues: {
      payslip_citizent: "",
      payslip_year: "",
      payslip_month: "",
      payslip_total: 0,
      payslip_status_out: "",
      payslip_expenditure: "",
      idbudget: "",
      idbudgetold: "",
    },
    validate: {
      idbudget: isNotEmpty("กรุณาเลือกงบประมาณที่ใช้"),
      payslip_total: isNotEmpty("กรุณากรอกข้อมูล"),
      payslip_citizent: isNotEmpty("กรุณากรอกข้อมูล"),
      payslip_year: isNotEmpty("กรุณากรอกข้อมูล"),
      payslip_status_out: isNotEmpty("กรุณากรอกข้อมูล"),
      payslip_expenditure: isNotEmpty("กรุณากรอกข้อมูล"),
    },
  });
  const SaveExpendNew = (data) => {
    const frm = new FormData();
    frm.append("payslip_citizent", data.payslip_citizent);
    frm.append("payslip_year", data.payslip_year);
    frm.append("payslip_month", data.payslip_month);
    frm.append("payslip_total", data.payslip_total);
    frm.append("payslip_status_out", data.payslip_status_out);
    frm.append("payslip_expenditure", data.payslip_expenditure);
    frm.append("idbudget", data.idbudget);
    frm.append("idbudgetold", data.idbudgetold);
    axios.post(API+"/index/updatepayslipexpenditure",frm).then((res) => {
      if (res.data === "200") {
        Swal.fire({
          icon:'success',
          title:"อัพเดทสำเร็จ",
          timer: 600,
          timerProgressBar:true,
          showConfirmButton:false
        }).then((res)=>{
                 console.log("success");
        Serch();
        })
 
      }else{
        console.error(res.data)
      }
    });
    console.info(data)
  };
  const setForm = () => {
    formAddExpendCustomer.setValues({
      payslip_citizent: citiid,
      payslip_year: payslip_year,
      payslip_month: payslip_month,
      payslip_total: parseFloat(payslip_total),
      payslip_status_out: payslip_status_out,
      payslip_expenditure: expend_id,
      idbudget: budget_id,
      idbudgetold: budget_id,
    });
  };
  return (
    <div>
      <Button
        onClick={() => {
          setForm();
          FetchBudget();
          setOpenModal(true);
        }}
        size="xs"
        color="var(--warning)"
        leftSection={<IconEdit />}
      >
        แก้ไขรายจ่าย
      </Button>
      <Modal
        opened={OpenModal}
        onClose={() => {
          setOpenModal(false);
        }}
        title={
          <Flex direction={"column"}>
            <Text fz={14}>{"เพิ่ม/แก้ไขรายจ่าย "}</Text>
            <Text fz={14}> - {expend_name_title}</Text>
          </Flex>
        }
      >
        <form
          onSubmit={formAddExpendCustomer.onSubmit((v) => {
            SaveExpendNew(v);
          })}
        >
          <SimpleGrid cols={{ base: 1, sm: 2 }}>
            <TextInput label="ประเภทรายจ่าย" value={expend_name} readOnly disabled />
            <NumberInput thousandSeparator suffix=" ฿"  {...formAddExpendCustomer.getInputProps("payslip_total")} label="จำนวน" />
          </SimpleGrid>
          <SimpleGrid pt={10} cols={1}>
            <Select searchable
              {...formAddExpendCustomer.getInputProps("idbudget")}
              label="งบประมาณที่ใช้"
              data={SelectDataBudget}
            />
          </SimpleGrid>
          <Flex justify={"flex-end"} gap={10} pt={10}>
            <Button type="submit" leftSection={<IconDeviceFloppy />} color="var(--success)" variant="filled">
              บันทึก
            </Button>
            <Button
              color="var(--danger)"
              variant="transparent"
              onClick={() => {
                setOpenModal(false);
              }}
            >
              ยกเลิก
            </Button>
          </Flex>
        </form>
      </Modal>
    </div>
  );
}

export default ModalAddExpenditure;
