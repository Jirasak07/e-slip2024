import { Button, Flex, Modal, Select, SimpleGrid, TextInput } from "@mantine/core";
import { IconDeviceFloppy, IconEdit } from "@tabler/icons-react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { API } from "../../Config/ConfigApi";
import { isNotEmpty, useForm } from "@mantine/form";

function ModalEditRevenue({ FetchRevenue, revenue_id, selectType }) {
  const [openModal, setopenModal] = useState(false);
  const formEditRevenue = useForm({
    initialValues: {
      revenue_id: revenue_id,
      revenue_name: "",
      customer_type_id: null,
      use_tax: 0,
    },
    validate: {
      revenue_name: isNotEmpty("กรุณากรอกข้อมูล"),
    },
  });

  const FetchData = () => {
    axios
      .post(API + "/index/RevenueDetail", {
        revenue_id: revenue_id,
      })
      .then((res) => {
        const data = res.data;
        console.log(data);
        if (data.length !== 0) {
          formEditRevenue.setValues({
            revenue_name: data[0].revenue_name,
            customer_type_id: data[0].customer_type_id,
          });
          setopenModal(true);
          // console.log(data[0].customer_type_id)
        } else {
          console.log("null");
        }
      });
  };
  return (
    <>
      <Button
        onClick={() => {
          FetchData();
        }}
        color="var(--warning)"
        leftSection={<IconEdit />}
        size="xs"
      >
        แก้ไขข้อมูลรายรับ
      </Button>
      <Modal
        opened={openModal}
        onClose={() => {
          setopenModal(false);
        }}
      >
        <form>
          <SimpleGrid>
            <TextInput label="ชื่อรายการรายรับ" {...formEditRevenue.getInputProps("revenue_name")} />
            <Select
              allowDeselect={false}
              label="ประเภทพนักงาน"
              data={selectType}
              {...formEditRevenue.getInputProps("customer_type_id")}
            />
          </SimpleGrid>
          <Flex justify={"flex-end"} py={10} gap={10} px={0}>
            <Button leftSection={<IconDeviceFloppy />} color="var(--success)">
              บันทึก
            </Button>
            <Button color="var(--danger)" variant="transparent">
              ยกเลิก
            </Button>
          </Flex>
        </form>
      </Modal>
    </>
  );
}

export default ModalEditRevenue;
