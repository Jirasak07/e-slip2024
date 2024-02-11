import { Button, Modal, Select, SimpleGrid, TextInput } from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { IconEdit } from "@tabler/icons-react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { API } from "../../Config/ConfigApi";

function ModalEditRevenue({ revenue_id }) {
  const [Opend, setOpend] = useState(false);
  const [DataTypeEmploy, setDataTypeEmploy] = useState([]);
  const formEditRevenue = useForm({
    initialValues:{
      revenue_id : revenue_id,
    revenue_name : '',
    customer_type_id : '',
    use_tax :0
    },
    validate:{
      revenue_name:isNotEmpty('กรุณากรอกข้อมูล')
    }
  })
  const GetDataRevenue = () => {
    axios.get(API+"/index/getrevenue/"+revenue_id).then((res)=>{
      console.log(res.data)
    })
  }
  
  const SaveEdit = () => {

    
  }
  useEffect(()=>{
GetDataRevenue()
  },[])
  return (
    <>
      <Modal
        opened={Opend}
        onClose={() => {
          setOpend(false);
        }}
      >
        <form onSubmit={formEditRevenue.onSubmit((val)=>{
          SaveEdit(val)
        })} >
<SimpleGrid>
  <TextInput/>
  <Select  />
</SimpleGrid>
        </form>
      </Modal>
      <Button
        color="var(--warning)"
        size="xs"
        onClick={() => {
          setOpend(true);
        }}
        leftSection={<IconEdit/>}
      >
        แก้ไขข้อมูลรายรับ
      </Button>
    </>
  );
}

export default ModalEditRevenue;
