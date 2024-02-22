import { Button, Flex, LoadingOverlay, Modal, Select, SimpleGrid, TextInput } from "@mantine/core";
import { IconDeviceFloppy, IconEdit, IconPlaylistAdd } from "@tabler/icons-react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { API } from "../../Config/ConfigApi";
import { isNotEmpty, useForm } from "@mantine/form";
import Swal from "sweetalert2";

function ModalEditExpenditure({ FetchExpenditure, expenditure_id, selectType }) {
  const [openModal, setopenModal] = useState(false);
  const [OverLay, setOverLay] = useState(false);
  const formEditExpenditure = useForm({
    initialValues: {
      expenditure_id: expenditure_id,
      expenditure_name: "",
      customer_type_id: null,
      use_tax: 0,
    },
    validate: {
      expenditure_name: isNotEmpty("กรุณากรอกข้อมูล"),
    },
  });

  const FetchData = () => {
    axios
      .post(API + "/index/ExpenditureDetail", {
        expenditure_id: expenditure_id,
      })
      .then((res) => {
        const data = res.data;
        console.log(data);
        if (data.length !== 0) {
          formEditExpenditure.setValues({
            expenditure_name: data[0].expenditure_name,
            customer_type_id: data[0].customer_type_id,
          });
          setopenModal(true);
          // console.log(data[0].customer_type_id)
        } else {
          console.log("null");
        }
      });
  };
  const UpdateExpenditure = (value) => {
    setOverLay(true)
    const data = new FormData();
    data.append("expenditure_id", value.expenditure_id)
    data.append("expenditure_name", value.expenditure_name)
    data.append("customer_type_id", value.customer_type_id)
    data.append("use_tax", 0)
    axios.post(API + "/index/updateexpenditure", data).then((res) => {
      if (res.data === "200") {
        setOverLay(false)
        Swal.fire({
          icon: 'success',
          title: 'อัพเดทข้อมูลรายจ่ายสำเร็จ',
          timer: 1000,
          timerProgressBar: true,
          showConfirmButton: false
        }).then((res) => {
          FetchExpenditure(value.customer_type_id)
          setopenModal(false)
        })
      }
    })
  }

  return (
    <>

      <Button
        onClick={() => {
          FetchData();
        }}
        color="var(--warning)"
        leftSection={<IconPlaylistAdd />}
        size="xs"
      >
        แก้ไขข้อมูลรายจ่าย
      </Button>
      <Modal
        opened={openModal}
        onClose={() => {
          setopenModal(false);
        }}
        closeOnClickOutside={false}
      >
        <LoadingOverlay visible={OverLay} loaderProps={{ type: 'dots' }} />
        <form onSubmit={formEditExpenditure.onSubmit((value) => {
          UpdateExpenditure(value)
        })} >
          <SimpleGrid>
            <TextInput label="ชื่อรายการรายรับ" {...formEditExpenditure.getInputProps("expenditure_name")} />
            <Select
              allowDeselect={false}
              label="ประเภทพนักงาน"
              data={selectType}
              {...formEditExpenditure.getInputProps("customer_type_id")}
            />
          </SimpleGrid>
          <Flex justify={"flex-end"} py={10} gap={10} px={0}>
            <Button type="submit" leftSection={<IconDeviceFloppy />} color="var(--success)">
              บันทึก
            </Button>
            <Button onClick={() => {
              setopenModal(false)
            }} color="var(--danger)" variant="transparent">
              ยกเลิก
            </Button>
          </Flex>
        </form>
      </Modal>
    </>
  );
}

export default ModalEditExpenditure;
