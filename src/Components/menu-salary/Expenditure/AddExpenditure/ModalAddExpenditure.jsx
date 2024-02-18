import { Button, Flex, Modal, NumberInput, Select, SimpleGrid, Text, TextInput } from "@mantine/core";
import { IconDeviceFloppy, IconEdit, IconPlus } from "@tabler/icons-react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { API } from "../../../Config/ConfigApi";
import { isNotEmpty, useForm } from "@mantine/form";

function ModalAddExpenditure({ expend_name_title, expend_name, budget_id, citiid, payslip_total, expend_id, Serch }) {
  const [OpenModal, setOpenModal] = useState(false);
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
  const formAddExpendCustomer = useForm({
    initialValues: {
      customer_id: citiid,
      payslip_total: payslip_total,
      idbudget: budget_id,
      expend_id: expend_id,
    },
    validate: {
      idbudget: isNotEmpty("กรุณาเลือกงบประมาณที่ใช้"),
      payslip_total: isNotEmpty("กรุณากรอกข้อมูล"),
    },
  });
  const SaveExpendNew = () => {
    Serch()
  };

  return (
    <div>
      <Button
        onClick={() => {
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
          <Flex direction={"column"} >
            <Text  fz={14}>{"เพิ่ม/แก้ไขรายจ่าย "}</Text>
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
            <NumberInput defaultValue={0} {...formAddExpendCustomer.getInputProps("payslip_total")} label="จำนวน" />
          </SimpleGrid>
          <SimpleGrid pt={10} cols={1}>
            <Select
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
