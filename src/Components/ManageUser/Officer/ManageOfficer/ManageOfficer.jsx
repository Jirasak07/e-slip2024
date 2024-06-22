import { Button, Flex, Grid, Modal, Select, SimpleGrid, TextInput, UnstyledButton, rem } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconDeviceFloppy, IconSettings, IconUserPlus } from "@tabler/icons-react";
import axios from "axios";
import React, { useEffect } from "react";
import { API } from "../../../Config/ConfigApi";
import { isNotEmpty, useForm } from "@mantine/form";
import Swal from "sweetalert2";

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
    validate: {
      customer_type_id: isNotEmpty(""),
      customer_status_id: isNotEmpty(""),
      customers_citizent: isNotEmpty(""),
      customers_pname: isNotEmpty(""),
      customers_name: isNotEmpty(""),
      customers_lname: isNotEmpty(""),
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
  const Save = (e) => {
    const formData = new FormData();
    formData.append("customers_citizent", e.customers_citizent);
    formData.append("customers_pname", e.customers_pname);
    formData.append("customers_name", e.customers_name);
    formData.append("customers_lname", e.customers_lname);
    formData.append("customers_type", e.customer_type_id);
    formData.append("customers_status", e.customer_status_id);
    axios.post(API + "/index/AddNewCustomers", formData).then((res) => {
      console.log(res.data);
      const data = res.data;
      if (data === "success") {
        Swal.fire({
          icon: "success",
          title: "เพิ่มข้อมูลสำเร็จ",
          timer: 1200,
          timerProgressBar: true,
          showConfirmButton: false,
        }).then((res) => {
          form.reset();
          close();
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "เพิ่มไม่สำเร็จ",
          text: "พบข้อมูลผู้ใช้นี้ในระบบ",
        }).then((res) => {});
      }
    });
  };

  useEffect(() => {
    FetchTypeCustomer();
    FetchStatusCustomer();
  }, []);
  return (
    <>
      <Button
        variant="transparent"
        onClick={() => {
          open();
        }}
        // leftSection={<IconUserPlus />}
        color="gray"
        leftSection={<IconSettings style={{ width: rem(14), height: rem(14) }} />}
      >
        เพิ่มบุคลากรใหม่
      </Button>
      <Modal
        size={"lg"}
        title="เพิ่มบุคลากรใหม่"
        opened={opened}
        onClose={() => {
          form.reset();
          close();
        }}
      >
        <form
          action=""
          onSubmit={form.onSubmit((val) => {
            Save(val);
          })}
        >
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
            <Select searchable data={form.values.DATA_TYPE_USER} {...form.getInputProps("customer_type_id")} allowDeselect={false} label="เลือกประเภทบุคลากร" />
            <Select searchable data={form.values.DATA_STATUS_USER} {...form.getInputProps("customer_status_id")} allowDeselect={false} label="สถานะการทำงาน" />
            <Flex justify={"flex-end"} pt={10}>
              <Button type="submit" color="green.6" leftSection={<IconDeviceFloppy />}>
                บันทึกข้อมูล
              </Button>
            </Flex>
          </SimpleGrid>
        </form>
      </Modal>
    </>
  );
}

export default ManageOfficer;
