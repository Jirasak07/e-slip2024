import { Button, Flex, Modal, Select, SimpleGrid, TextInput } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconDeviceFloppy, IconEdit } from "@tabler/icons-react";
import axios from "axios";
import React, { useState } from "react";
import { API } from "../../Config/ConfigApi";
import { useForm } from "@mantine/form";

function ModalEditOfficer({ customerid }) {
  const [opened, { open, close }] = useDisclosure(false);
  const [DataSelectTypeCustomer, setDataSelectTypeCustomer] = useState([]);
  const formEmploy = useForm({
    initialValues: {
      customers_citizent: customerid,
      fname: "",
      lname: "",
      customer_type_id: "",
      customer_status_id: "",
    },
    validate: {},
  });
  const FetchTypeCustomer = (params) => {
    axios.get(API + "/index/showcustomertype").then((res) => {
      const data = res.data;
      if (data.length !== 0) {
        const menu = data.map((i) => ({
          value: i.customer_type_id,
          label: i.customer_type_name,
        }));
        setDataSelectTypeCustomer(menu);
      }
    });
  };
  const FetchDataEmploy = (params) => {
    axios.get(API + "/index/showcustomerdetail/" + customerid).then((res) => {
      console.log(res.data);
      const data = res.data;
      if (data.length !== 0) {
        const value = data[0];
        formEmploy.setValues({
          customer_status_id: value.customers_status,
          customer_type_id: value.customers_type,
          fname: value.customers_pname + value.customers_name,
          lname: value.customers_lname,
        });
      }
    });
  };

  return (
    <>
      <Modal title="แก้ไขข้อมูลพนักงาน" opened={opened} onClose={close}>
        <SimpleGrid>
          <TextInput {...formEmploy.getInputProps("customers_citizent")} disabled label="เลขบัตรประชาชน/รหัสพนักงาน" />
          <SimpleGrid cols={2}>
            <TextInput {...formEmploy.getInputProps("fname")} readOnly label="ชื่อ" />
            <TextInput {...formEmploy.getInputProps("lname")} readOnly label="นามสกุล" />
          </SimpleGrid>
          <SimpleGrid cols={2}>
            <Select data={DataSelectTypeCustomer} {...formEmploy.getInputProps("customer_type_id")} readOnly disabled label="ประเภท" />
            <Select {...formEmploy.getInputProps("customer_status_id")} allowDeselect={false} label="สถานะ" />
          </SimpleGrid>
        </SimpleGrid>
        <Flex justify={"flex-end"} pt={10} gap={5}>
          <Button type="submit" color="var(--success)" leftSection={<IconDeviceFloppy />}>
            บันทึก
          </Button>
          <Button color="var(--danger)" variant="transparent" onClick={close}>
            ยกเลิก
          </Button>
        </Flex>
      </Modal>
      <Button
        onClick={() => {
          FetchTypeCustomer()
          FetchDataEmploy();
          open();
        }}
        leftSection={<IconEdit />}
        size="xs"
        color="var(--warning)"
      >
        แก้ไข
      </Button>
    </>
  );
}

export default ModalEditOfficer;
