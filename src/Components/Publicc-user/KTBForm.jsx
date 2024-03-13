import React from "react";
import FormAddKTB from "./ComponentCorperate/FormAddKTB";
import { Blockquote, Button, Flex, Text } from "@mantine/core";
import { IconDownload, IconInfoCircle, IconSearch } from "@tabler/icons-react";

function KTBForm() {
  return (
    <div>
      <Blockquote icon={<IconInfoCircle />}>
        <Text c={"blue"}>
        หากกรอกและบันทึกข้อมูลนี้แล้ว ให้พิมพ์แบบฟอร์มนี้ แล้วเตรียมสำเนาหน้าสมุดบัญชี จากนั้นนำมาส่งที่งานการเงิน 
        </Text>
        <Text c={"red"}>
        *สำหรับคนที่ยังไม่ได้ส่งเท่านั้น
        </Text>
      </Blockquote>
      <Flex py={20} justify={"flex-start"} gap={10}>
        <FormAddKTB />
        <Button color="violet" leftSection={<IconSearch />}>ตรวจสอบแบบฟอร์ม</Button>
        <Button color="green" leftSection={<IconDownload />}>ดาวน์โหลดแบบฟอร์ม</Button>
      </Flex>
    </div>
  );
}

export default KTBForm;
