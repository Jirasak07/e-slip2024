import { Button, Flex, Grid, Modal, Select, SimpleGrid, TextInput } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconDeviceFloppy, IconUserPlus } from "@tabler/icons-react";
import axios from "axios";
import React, { useEffect } from "react";
import { API } from "../../../Config/ConfigApi";
import { useForm } from "@mantine/form";

function ManageOfficer() {
  const [opened, { open, close }] = useDisclosure();
  const form = useForm({
    initialValues: {
      DATA_TYPE_USER: [],
      DATA_STATUS_USER: [],
      customer_type_id: "1",
      customer_status_id: "1",
      customers_citizent: "",
      customers_pname: "",
      customers_name: "",
      customers_lname: "",
      customers_type: "",
      customers_status: "",
    },
  });
  const FetchTypeCustomer = (params) => {
    axios.get(API + "/index/showcustomertype").then((res) => {
      const data = res.data;
      if (data.length !== 0) {
        const menu = data.map((i) => ({
          value: i.customer_type_id,
          label: i.customer_type_name,
        }));
        // setDataSelectTypeCustomer(menu);
        form.setValues({ DATA_TYPE_USER: menu });
      }
    });
  };
  const FetchStatusCustomer = (params) => {
    axios.get(API + "/index/showstatuswork").then((res) => {
      const data = res.data;
      if (data.length !== 0) {
        const menu = data.map((i) => ({
          value: i.customer_status_id,
          label: i.customer_status_name,
        }));
        // setDataStatus(menu);
        form.setValues({ DATA_STATUS_USER: menu });
      }
    });
  };
  useEffect(() => {
    FetchTypeCustomer();
    FetchStatusCustomer();
  }, []);
  return (
    <div>
      <Button
        onClick={() => {
          open();
        }}
        leftSection={<IconUserPlus />}
        color="green"
      >
        เพิ่มบุคลากรใหม่
      </Button>
      <Modal size={"lg"} title="เพิ่มบุคลากรใหม่" opened={opened} onClose={close}>
        <SimpleGrid>
          <TextInput label="รหัสประจำตัวประชาชน" {...form.getInputProps("customers_citizent")} />
          <Grid>
            <Grid.Col span={2}>
              <TextInput label="คำนำหน้า" {...form.getInputProps("customers_pname")} />
            </Grid.Col>
            <Grid.Col span={5}>
              <TextInput label="ชื่อ" {...form.getInputProps("customers_name")} />
            </Grid.Col>
            <Grid.Col span={5}>
              <TextInput label="นามสกุล" {...form.getInputProps("customers_lname")} />
            </Grid.Col>
          </Grid>
          <Select
            data={form.values.DATA_TYPE_USER}
            {...form.getInputProps("customer_type_id")}
            allowDeselect={false}
            label="เลือกประเภทบุคลากร"
          />
          <Select
            data={form.values.DATA_STATUS_USER}
            {...form.getInputProps("customer_status_id")}
            allowDeselect={false}
            label="สถานะการทำงาน"
          />
          <Flex justify={"flex-end"} pt={10}>
            <Button color="green.6" leftSection={<IconDeviceFloppy />}>
              บันทึกข้อมูล
            </Button>
          </Flex>
        </SimpleGrid>
      </Modal>
    </div>
  );
}

export default ManageOfficer;
