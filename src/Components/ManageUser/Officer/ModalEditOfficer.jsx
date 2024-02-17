import { Button, Flex, Modal, Select, SimpleGrid, TextInput } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconDeviceFloppy, IconEdit } from "@tabler/icons-react";
import axios from "axios";
import React from "react";
import { API } from "../../Config/ConfigApi";

function ModalEditOfficer({ customerid }) {
  const [opened, { open, close }] = useDisclosure(false);
  const FetchDataEmploy = (params) => {
    axios.get(API+"/index/showcustomer/"+customerid).then((res)=>{
      console.log(res.data)
    })
  }
  
  return (
    <>
      <Modal title="แก้ไขข้อมูลพนักงาน" opened={opened} onClose={close}>
        <SimpleGrid>
          <TextInput disabled label="เลขบัตรประชาชน/รหัสพนักงาน" />
          <SimpleGrid cols={2}>
            <TextInput readOnly label="ชื่อ" />
            <TextInput readOnly label="นามสกุล" />
          </SimpleGrid>
          <SimpleGrid cols={2}>
            <Select readOnly disabled label="ประเภท" />
            <Select allowDeselect={false} label="สถานะ" />
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
      <Button onClick={()=>{
        FetchDataEmploy()
        open()
      }} leftSection={<IconEdit />} size="xs" color="var(--warning)">
        แก้ไข
      </Button>
    </>
  );
}

export default ModalEditOfficer;
