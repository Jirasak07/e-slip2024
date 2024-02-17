import { Button, Flex, Modal, NumberInput, Select, SimpleGrid, TextInput } from "@mantine/core";
import { IconDeviceFloppy, IconEdit, IconPlus } from "@tabler/icons-react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { API } from "../../../Config/ConfigApi";
import { isNotEmpty, useForm } from "@mantine/form";

function ModalAddRevenue({ revenue_name_title, revenue_name, budget_id, citiid, payslip_total, revenue_id, Serch }) {
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
  const formAddrevenueCustomer = useForm({
    initialValues: {
      customer_id: citiid,
      payslip_total: payslip_total,
      idbudget: budget_id,
      revenue_id: revenue_id,
    },
    validate: {
      idbudget: isNotEmpty("กรุณาเลือกงบประมาณที่ใช้"),
      payslip_total: isNotEmpty("กรุณากรอกข้อมูล"),
    },
  });
  const SaverevenueNew = () => {
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
        แก้ไขรายรับ
      </Button>
      <Modal
        opened={OpenModal}
        onClose={() => {
          setOpenModal(false);
        }}
        title={"เพิ่มรายรับ" + revenue_name_title}
      >
        <form
          onSubmit={formAddrevenueCustomer.onSubmit((v) => {
            SaverevenueNew(v);
          })}
        >
          <SimpleGrid cols={{ base: 1, sm: 2 }}>
            <TextInput label="ประเภทรายรับ" value={revenue_name} readOnly disabled />
            <NumberInput defaultValue={0} {...formAddrevenueCustomer.getInputProps("payslip_total")} label="จำนวน" />
          </SimpleGrid>
          <SimpleGrid pt={10} cols={1}>
            <Select
              {...formAddrevenueCustomer.getInputProps("idbudget")}
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

export default ModalAddRevenue;
