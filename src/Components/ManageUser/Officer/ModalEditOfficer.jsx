import { Button, Flex, Modal, Select, SimpleGrid, TextInput } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconDeviceFloppy, IconEdit } from "@tabler/icons-react";
import axios from "axios";
import React, { useState } from "react";
import { API } from "../../Config/ConfigApi";
import { isNotEmpty, useForm } from "@mantine/form";
import Swal from "sweetalert2";

function ModalEditOfficer({ customerid, fn,cname }) {
  const [opened, { open, close }] = useDisclosure(false);
  const [DataSelectTypeCustomer, setDataSelectTypeCustomer] = useState([]);
  const [DataStatus, setDataStatus] = useState([]);
  const [DataBudget, setDataBudget] = useState([]);
  const formEmploy = useForm({
    initialValues: {
      customers_citizent: "",
      fname: "",
      lname: "",
      customer_type_id: "",
      customer_status_id: "",
      customer_budget_id: "",
    },
    validate: {
      customer_status_id: isNotEmpty("ว่าง"),
      fname: isNotEmpty("ว่าง"),
      lname: isNotEmpty("ว่าง"),
      customer_type_id: isNotEmpty("ว่าง"),
      customers_citizent: isNotEmpty("ว่าง"),
      customer_budget_id: isNotEmpty("ว่าง"),
    },
  });
  const FetchTypeCustomer = async () => {
  const fetch = await  axios.get(API + "/index/showcustomertype")
      const data = fetch.data;
      if (data.length !== 0) {
        const menu = data.map((i) => ({
          value: i.customer_type_id,
          label: i.customer_type_name,
        }));
        setDataSelectTypeCustomer(menu);
      }
  };
  const FetchStatusCustomer = async () => {
 const fetch =await  axios.get(API + "/index/showstatuswork")
      const data = fetch.data;
      if (data.length !== 0) {
        const menu = data.map((i) => ({
          value: i.customer_status_id,
          label: i.customer_status_name,
        }));
        setDataStatus(menu);
      }

  };

  const FetchDataEmploy = async () => {
 const fetch = await  axios.get(API + "/index/showcustomerdetail/" + customerid)
      const data = fetch.data;
      if (data.length !== 0) {
        const value = data[0];
        formEmploy.setValues({
          customer_status_id: value.customers_status,
          customer_type_id: value.customers_type,
          customer_budget_id: value.customers_budget,
          fname: value.customers_pname + value.customers_name,
          lname: value.customers_lname,
        });
      }
  };
  const FetchBudget = async () => {
    const fetch = await axios.get(API + "/index/showBudget");
    const data = fetch.data;
    if (data.length !== 0) {
      const select = data.map((i) => ({
        value: i.idbudget,
        label: i.namebudget,
      }));
      setDataBudget(select);
    }
  };
  const Submit = (value) => {
    const frmData = new FormData();
    frmData.append("customer_status_id", value.customer_status_id);
    frmData.append("customers_citizent", value.customers_citizent);
    frmData.append("customers_type_id", value.customer_type_id);
    frmData.append("customers_budget_id", value.customer_budget_id);
    axios.post(API + "/index/updatestatuswork", frmData).then((res) => {
      if (res.data === "200") {
        Swal.fire({
          icon: "success",
          title: "อัพเดทเสร็จสิ้น",
          timer: 1200,
          timerProgressBar: true,
          showConfirmButton: false,
        }).then((res) => {
          fn();
          close();
        });
      }
    });
  };

  return (
    <>
      <Modal title="แก้ไขข้อมูลพนักงาน" opened={opened} onClose={close}>
        <form
          onSubmit={formEmploy.onSubmit((value) => {
            Submit(value);
          })}
        >
          <SimpleGrid>
            <TextInput {...formEmploy.getInputProps("customers_citizent")} disabled label="เลขบัตรประชาชน/รหัสพนักงาน" />
            <SimpleGrid cols={2}>
              <TextInput {...formEmploy.getInputProps("fname")} readOnly label="ชื่อ" />
              <TextInput {...formEmploy.getInputProps("lname")} readOnly label="นามสกุล" />
            </SimpleGrid>
            <SimpleGrid cols={2}>
              <Select searchable data={DataSelectTypeCustomer} {...formEmploy.getInputProps("customer_type_id")} label="ประเภท" />
              <Select searchable data={DataStatus} {...formEmploy.getInputProps("customer_status_id")} allowDeselect={false} label="สถานะ" />
            </SimpleGrid>
            <SimpleGrid cols={2}>
              <Select searchable data={DataBudget} {...formEmploy.getInputProps("customer_budget_id")} label="ประเภท" />
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
        </form>
      </Modal>
      <Button
        onClick={() => {
          formEmploy.setValues({
            customers_citizent: customerid,
          });
          FetchStatusCustomer();
          FetchTypeCustomer();
          FetchDataEmploy();
          FetchBudget();
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
