import { Button, Divider, Fieldset, Flex, Paper, Radio, SimpleGrid, TextInput } from "@mantine/core";
import { IconDeviceFloppy } from "@tabler/icons-react";
import React from "react";

function FormKTB() {
  return (
    <>
      <form>
        <Fieldset legend="ข้อมูลทั่วไป">
          <SimpleGrid cols={{ base: 1, sm: 3 }}>
            <TextInput label="คำนำหน้า" />
            <TextInput label="ชื่อ" />
            <TextInput label="นามสกุล" />
          </SimpleGrid>
          <SimpleGrid cols={{ base: 1, sm: 3 }}>
            <TextInput label="เลขประจำตัวประชาชน" />
            <TextInput label="สำนัก/กอง/ศูนย์" />
            <TextInput label="กระทรวง" />
          </SimpleGrid>
          <SimpleGrid cols={{ base: 1, sm: 3 }}>
            {" "}
            <TextInput label="สังกัดกรม" />
            <TextInput label="ตำแหน่ง" />
          </SimpleGrid>
        </Fieldset>
        <Divider my="md" variant="dashed" />
        <Fieldset legend="ข้อมูลที่อยู่">
          <SimpleGrid cols={{ base: 1, sm: 3 }}>
            <TextInput label="บ้านเลขที่" />
            <TextInput label="ซอย" />
            <TextInput label="ถนน" />
          </SimpleGrid>
          <SimpleGrid cols={{ base: 1, sm: 3 }}>
            <TextInput label="ตำบล" />
            <TextInput label="อำเภอ" />
            <TextInput label="จังหวัด" />
          </SimpleGrid>
          <SimpleGrid cols={{ base: 1, sm: 3 }}>
            <TextInput label="รหัสไปรษณีย์" />
            <TextInput label="เบอร์โทรศัพท์" />
          </SimpleGrid>
        </Fieldset>
        <Divider my="md" variant="dashed" />
        <Fieldset legend="ข้อมูลธนาคาร">
          <SimpleGrid>
            <Radio label="เป็นข้าราชการ ลูกจ้าง พนักงานราชการของหน่วยงาน" />
            <Radio label="เป็นบุคคลภายนอก เพื่อเข้าบัญชีเงินฝากธนคาร" />
          </SimpleGrid>
          <SimpleGrid cols={{ base: 1, sm: 3 }}>
            <TextInput label="บัญชีเงินฝากธนาคาร" />
            <TextInput label="สาขา" />
            <TextInput label="ประเภทธนาคาร" />
          </SimpleGrid>
          <SimpleGrid cols={{ base: 1, sm: 3 }}>
            <TextInput label="เลขที่บัญชีเงินฝากธนาคาร" />
            <TextInput label="เบอร์โทรศัพท์ สำหรับแจ้งเตือนผ่านมือถือ" />
            <TextInput label="E-mail" />
          </SimpleGrid>
        </Fieldset>
        <Flex py={10} justify={"flex-end"}>
          <Button leftSection={<IconDeviceFloppy />} color="var(--success)" variant="filled">
            บันทึกข้อมูล
          </Button>
          <Button color="var(--danger)" variant="subtle">
            ยกเลิก
          </Button>
        </Flex>
      </form>
    </>
  );
}

export default FormKTB;
