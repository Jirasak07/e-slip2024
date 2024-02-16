import { Button, Flex, Modal, NumberInput, Select, SimpleGrid, TextInput } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { API } from "../../../Config/ConfigApi";
import { useForm } from "@mantine/form";

function ModalAddExpenditure({ expend_name_title, expend_name ,budget_id ,citiid,payslip_total,expend_id}) {
  const [OpenModal, setOpenModal] = useState(false);
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
  const formAddExpendCustomer = useForm({
    initialValues:{
        customer_id:citiid,
        payslip_total:payslip_total,
        idbudget:budget_id,
        expend_id:expend_id

    },
    validate:{

    }
  })
  return (
    <div>
      <Button
        onClick={() => {
            FetchBudget();
          setOpenModal(true);
        }}
        size="xs"
        color="var(--success)"
        leftSection={<IconPlus />}
      >
        เพิ่มรายจ่าย
      </Button>
      <Modal
        opened={OpenModal}
        onClose={() => {
          setOpenModal(false);
        }}
        title={"เพิ่มรายจ่าย" + expend_name_title}
      >
        <SimpleGrid cols={{base:1,sm:2}}>
          <TextInput label="ประเภทรายจ่าย" value={expend_name} readOnly disabled />
          <NumberInput defaultValue={0} {...formAddExpendCustomer.getInputProps("payslip_total")} label="จำนวน" />
        </SimpleGrid>
        <SimpleGrid pt={10} cols={1}>
          <Select {...formAddExpendCustomer.getInputProps("idbudget")} label="งบประมาณที่ใช้" data={SelectDataBudget} />
        </SimpleGrid>
        <Flex justify={"flex-end"} gap={10} pt={10} >
            <Button color="var(--success)" variant="filled"  >บันทึก</Button>
            <Button color="var(--danger)" variant="transparent" onClick={()=>{
                setOpenModal(false)
            }} >ยกเลิก</Button>
        </Flex>
      </Modal>
    </div>
  );
}

export default ModalAddExpenditure;
