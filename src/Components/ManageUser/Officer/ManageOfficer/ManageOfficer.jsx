import { ActionIcon, Button, Flex, Grid, Modal, Select, SimpleGrid, TextInput, Tooltip, UnstyledButton, rem } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconDeviceFloppy, IconSearch, IconSettings, IconUserPlus } from "@tabler/icons-react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { API } from "../../../Config/ConfigApi";
import { isNotEmpty, useForm } from "@mantine/form";
import Swal from "sweetalert2";

function ManageOfficer() {
  const [opened, { open, close }] = useDisclosure();
  const form = useForm({
    initialValues: {
      DATA_TYPE_USER: [],
      DATA_STATUS_USER: [],
      DATA_TYPE_BUDGET: [],
      customer_type_id: "1",
      customer_status_id: "1",
      customers_citizent: "",
      customers_pname: "",
      customers_name: "",
      customers_lname: "",
      customers_type: "",
      customers_status: "",
      customers_budget: "",
    },
    validate: {
      customer_type_id: isNotEmpty(""),
      customer_status_id: isNotEmpty(""),
      customers_citizent: isNotEmpty(""),
      customers_pname: isNotEmpty(""),
      customers_name: isNotEmpty(""),
      customers_lname: isNotEmpty(""),
      customers_budget: isNotEmpty(""),
    },
  });
  const FetchBudget = (params) => {
    axios.get(API + "/index/showBudget").then((res) => {
      const data = res.data;
      if (data.length !== 0) {
        //   setLoadTable(false);
        const select = data.map((i) => ({
          value: i.idbudget,
          label: i.namebudget,
        }));
        form.setValues({ DATA_TYPE_BUDGET: select });
      }
    });
  };
  const FetchTypeCustomer = (params) => {
    axios.get(API + "/index/showcustomertype").then((res) => {
      const data = res.data;
      if (data.length !== 0) {
        const menu = data.map((i) => ({
          value: i.customer_type_id,
          label: i.customer_type_name,
        }));
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
    FetchBudget();
  }, []);
  return (
    <>
      <Tooltip label="เพิ่มบุคลากรใหม่">
        <ActionIcon
          onClick={() => {
            open();
          }}
          color="green"
          size={"lg"}
          mt={{ base: 0, sm: 0, md: 33 }}
        >
          <IconUserPlus />
        </ActionIcon>
      </Tooltip>

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
            <Grid>
              <Grid.Col span={8}>
                <TextInput  label="รหัสประจำตัวประชาชน" {...form.getInputProps("customers_citizent")} />
              </Grid.Col>
              <Grid.Col span={4}>
                <ActionIcon color="var(--primary)" size={"lg"} mt={32}>
                  <IconSearch stroke={1.5} />
                </ActionIcon>
              </Grid.Col>
            </Grid>
            <Grid>
              <Grid.Col span={2}>
                <TextInput label="คำนำหน้า" {...form.getInputProps("customers_pname")} disabled />
              </Grid.Col>
              <Grid.Col span={5}>
                <TextInput label="ชื่อ" {...form.getInputProps("customers_name")} disabled />
              </Grid.Col>
              <Grid.Col span={5}>
                <TextInput label="นามสกุล" {...form.getInputProps("customers_lname")} disabled />
              </Grid.Col>
            </Grid>
            <Select searchable data={form.values.DATA_TYPE_USER} {...form.getInputProps("customer_type_id")} allowDeselect={false} label="เลือกประเภทบุคลากร" />
            <Select searchable data={form.values.DATA_STATUS_USER} {...form.getInputProps("customer_status_id")} allowDeselect={false} label="สถานะการทำงาน" />
            <Select searchable data={form.values.DATA_TYPE_BUDGET} {...form.getInputProps("customer_budget")} allowDeselect={false} label="ประเภทงบประมาณ" />
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
