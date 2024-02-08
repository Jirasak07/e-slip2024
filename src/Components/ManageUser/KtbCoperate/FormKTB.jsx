import { Button, Divider, Fieldset, Flex, Paper, Radio, SimpleGrid, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconDeviceFloppy } from "@tabler/icons-react";
import React from "react";

function FormKTB({ close }) {
  const formCoperate = useForm({
    initialValues: {
      pname: "",
      fname: "",
      lname: "",
      citizen: "",
      office: "",
      user_emp: "",
      belong: "",
      department: "",
      home_no: "",
      soi: "",
      road: "",
      sub_district: "",
      district: "",
      province: "",
      zipcode: "",
      tel: "",
      type_bank: "1",
      bank_name: "",
      bank_branch: "",
      bank_type: "",
      bank_number: "",
      phone_number_bank: "",
      bank_email: "",
    },
    validate: {
      pname: (val) => (val === "" ? "กรุณากรอกข้อมูล" : null),
      fname: (val) => (val === "" ? "กรุณากรอกข้อมูล" : null),
      lname: (val) => (val === "" ? "กรุณากรอกข้อมูล" : null),
      citizen: (val) => (val === "" ? "กรุณากรอกข้อมูล" : null),
      office: (val) => (val === "" ? "กรุณากรอกข้อมูล" : null),
      user_emp: (val) => (val === "" ? "กรุณากรอกข้อมูล" : null),
      belong: (val) => (val === "" ? "กรุณากรอกข้อมูล" : null),
      department: (val) => (val === "" ? "กรุณากรอกข้อมูล" : null),
      home_no: (val) => (val === "" ? "กรุณากรอกข้อมูล" : null),
      soi: (val) => (val === "" ? "กรุณากรอกข้อมูล" : null),
      road: (val) => (val === "" ? "กรุณากรอกข้อมูล" : null),
      sub_district: (val) => (val === "" ? "กรุณากรอกข้อมูล" : null),
      district: (val) => (val === "" ? "กรุณากรอกข้อมูล" : null),
      province: (val) => (val === "" ? "กรุณากรอกข้อมูล" : null),
      zipcode: (val) => (val === "" ? "กรุณากรอกข้อมูล" : null),
      tel: (val) => (val === "" ? "กรุณากรอกข้อมูล" : null),
      bank_type: (val) => (val === "" ? "กรุณากรอกข้อมูล" : null),
      type_bank: (val) => (val === "" ? "กรุณากรอกข้อมูล" : null),
      bank_branch: (val) => (val === "" ? "กรุณากรอกข้อมูล" : null),
      bank_name: (val) => (val === "" ? "กรุณากรอกข้อมูล" : null),
      bank_number: (val) => (val === "" ? "กรุณากรอกข้อมูล" : null),
      bank_email: (val) => (val === "" ? "กรุณากรอกข้อมูล" : null),
      phone_number_bank: (val) => (val === "" ? "กรุณากรอกข้อมูล" : null),
    },
  });
  const SubMit = (params) => {};

  return (
    <>
      <form
        onSubmit={formCoperate.onSubmit((v) => {
          SubMit(v);
        })}
      >
        <Fieldset legend="ข้อมูลทั่วไป">
          <SimpleGrid cols={{ base: 1, sm: 3 }}>
            <TextInput label="คำนำหน้า" {...formCoperate.getInputProps("pname")} />
            <TextInput label="ชื่อ" {...formCoperate.getInputProps("fname")} />
            <TextInput label="นามสกุล" {...formCoperate.getInputProps("lname")} />
          </SimpleGrid>
          <SimpleGrid cols={{ base: 1, sm: 3 }}>
            <TextInput label="เลขประจำตัวประชาชน" {...formCoperate.getInputProps("citizen")} />
            <TextInput label="สำนัก/กอง/ศูนย์" {...formCoperate.getInputProps("office")} />
            <TextInput label="กระทรวง" {...formCoperate.getInputProps("belong")} />
          </SimpleGrid>
          <SimpleGrid cols={{ base: 1, sm: 3 }}>
            {" "}
            <TextInput label="สังกัดกรม" {...formCoperate.getInputProps("department")} />
            <TextInput label="ตำแหน่ง" {...formCoperate.getInputProps("user_emp")} />
          </SimpleGrid>
        </Fieldset>
        <Divider my="md" variant="dashed" />
        <Fieldset legend="ข้อมูลที่อยู่">
          <SimpleGrid cols={{ base: 1, sm: 3 }}>
            <TextInput label="บ้านเลขที่" {...formCoperate.getInputProps("home_no")} />
            <TextInput label="ซอย" {...formCoperate.getInputProps("soi")} />
            <TextInput label="ถนน" {...formCoperate.getInputProps("road")} />
          </SimpleGrid>
          <SimpleGrid cols={{ base: 1, sm: 3 }}>
            <TextInput label="ตำบล" {...formCoperate.getInputProps("sub_district")} />
            <TextInput label="อำเภอ" {...formCoperate.getInputProps("district")} />
            <TextInput label="จังหวัด" {...formCoperate.getInputProps("province")} />
          </SimpleGrid>
          <SimpleGrid cols={{ base: 1, sm: 3 }}>
            <TextInput label="รหัสไปรษณีย์" {...formCoperate.getInputProps("zipcode")} />
            <TextInput label="เบอร์โทรศัพท์" {...formCoperate.getInputProps("tel")} />
          </SimpleGrid>
        </Fieldset>
        <Divider my="md" variant="dashed" />
        <Fieldset legend="ข้อมูลธนาคาร">
          <SimpleGrid>
            <Radio
              // value={}
              onChange={()=>{
                formCoperate.setValues({
                  type_bank:'1'
                })
              }}
              checked={formCoperate.values.type_bank === "1" ? true : false}
              label="เป็นข้าราชการ ลูกจ้าง พนักงานราชการของหน่วยงาน"
            />
            <Radio
             onChange={()=>{
              formCoperate.setValues({
                type_bank:'2'
              })
            }}
              checked={formCoperate.values.type_bank === "2" ? true : false}
              label="เป็นบุคคลภายนอก เพื่อเข้าบัญชีเงินฝากธนคาร"
            />
          </SimpleGrid>
          <SimpleGrid cols={{ base: 1, sm: 3 }}>
            <TextInput label="บัญชีเงินฝากธนาคาร" {...formCoperate.getInputProps("bank_name")} />
            <TextInput label="สาขา" {...formCoperate.getInputProps("bank_branch")} />
            <TextInput label="ประเภทธนาคาร" {...formCoperate.getInputProps("bank_type")} />
          </SimpleGrid>
          <SimpleGrid cols={{ base: 1, sm: 3 }}>
            <TextInput label="เลขที่บัญชีเงินฝากธนาคาร" {...formCoperate.getInputProps("bank_number")} />
            <TextInput
              label="เบอร์โทรศัพท์ สำหรับแจ้งเตือนผ่านมือถือ"
              {...formCoperate.getInputProps("phone_number_bank")}
            />
            <TextInput label="E-mail" {...formCoperate.getInputProps("bank_email")} />
          </SimpleGrid>
        </Fieldset>
        <Flex py={10} justify={"flex-end"}>
          <Button type="submit" leftSection={<IconDeviceFloppy />} color="var(--success)" variant="filled">
            บันทึกข้อมูล
          </Button>
          <Button onClick={close} color="var(--danger)" variant="subtle">
            ยกเลิก
          </Button>
        </Flex>
      </form>
    </>
  );
}

export default FormKTB;
