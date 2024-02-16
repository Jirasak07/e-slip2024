import { Button, Flex, Modal, Select, SimpleGrid, TextInput } from "@mantine/core";
import { IconDeviceFloppy, IconEdit } from "@tabler/icons-react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { API } from "../../Config/ConfigApi";
import { isNotEmpty, useForm } from "@mantine/form";
import Swal from "sweetalert2";

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
  const UpdateRevenue = (value) => {
    const data = new FormData();
    data.append("revenue_id",value.revenue_id)
    data.append("revenue_name",value.revenue_name)
    data.append("customer_type_id",value.customer_type_id)
    data.append("use_tax",0)
   axios.post(API+"/index/updaterevenue",data).then((res)=>{
    if(res.data === "200"){
      Swal.fire({
        icon:'success',
        title:'อัพเดทข้อมูลรายรับสำเร็จ',
        timer:1000,
        timerProgressBar:true,
        showConfirmButton:false
      }).then((res)=>{
        FetchRevenue(value.customer_type_id)
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
        <form onSubmit={formEditRevenue.onSubmit((value)=>{
          UpdateRevenue(value)
        })} >
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
            <Button type="submit" leftSection={<IconDeviceFloppy />} color="var(--success)">
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
