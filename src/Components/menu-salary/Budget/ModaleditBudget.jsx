import { useDisclosure } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import React, { useEffect, useState } from "react";
import { NumberInput, TextInput, Box } from "@mantine/core";
import { Modal, Button } from "@mantine/core";
import { Input } from "@mantine/core";
import { API } from "../../Config/ConfigApi";
import axios from "axios";
import Swal from "sweetalert2";
import { IconEdit } from "@tabler/icons-react";

export default function ModaleditBudget(props) {
  const [opened, { open, close }] = useDisclosure(false);
  const [datamajor, setDatamajor] = useState([
    {
      majorID: "",
      majorName: "",
    },
  ]);

  const submitdata = (initialValues) => {
  

    const datafrm = new FormData(); //สร้างฟอร์มสำหรับการส่งข้อมูล
    datafrm.append("idbudget", props.idbudget);
    datafrm.append("namebudget", initialValues.name);
    datafrm.append("levelbudget", initialValues.levelbudget);

    axios
      .post(API + "/index/updateBudget", datafrm, {
        headers: {
          "content-type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.warn(res);
        console.log("response: ", res);
        if (res.status === 200) {
          Swal.fire({
            title: "แก้ไขข้อมูลสำเร็จ",
            icon: "success",
            // showCancelButton: true,
            confirmButtonText: "ตกลง",
            // cancelButtonText: 'No, keep it'
          }).then((result) => {
            close();
            props.getshowBudget();
          });
        } else {
          // window.location.href = '/'
        }
      });
  };

  const form = useForm({
    initialValues: { name: "", levelbudget: 0 },

    validate: {
      name: (value) => (value.length < 2 ? "Name must have at least 2 letters" : null),
      levelbudget: (value) => (value < 0 ? "You must be at least 18 to register" : null),
    },
  });

  useEffect(() => {
    //  console.log(props.idbudget);

    form.setFieldValue("name", props.namebudget);
    form.setFieldValue("levelbudget", props.levelbudget);
  }, []);

  return (
    <>
      <Modal opened={opened} onClose={close} title="แก้ไขงบประมาณ">
        <Box maw={340} mx="auto">
          <form onSubmit={form.onSubmit(submitdata)}>
            <TextInput label="ชื่องบประมาณ" placeholder="ชื่องบประมาณ" {...form.getInputProps("name")} />
            <NumberInput
              mt="sm"
              label="level"
              placeholder="levelbudget"
              min={0}
              max={99}
              {...form.getInputProps("levelbudget")}
            />
            <Button type="submit" color="orange" mt="sm">
              เพิ่มแก้ไข
            </Button>
          </form>
        </Box>
      </Modal>

      <Button variant="filled" color="var(--warning)" size="xs" leftSection={<IconEdit />} onClick={open}>
        แก้ไขงบประมาณ
      </Button>
    </>
  );
}
