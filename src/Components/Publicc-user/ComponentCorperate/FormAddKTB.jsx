import {
  Blockquote,
  Button,
  Divider,
  Fieldset,
  Flex,
  Modal,
  Paper,
  Radio,
  ScrollArea,
  SimpleGrid,
  Text,
  TextInput,
} from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { IconDeviceFloppy, IconInfoCircle, IconPlus } from "@tabler/icons-react";
import axios from "axios";
import React from "react";
import Swal from "sweetalert2";
import { API } from "../../Config/ConfigApi";

function FormAddKTB() {
  const [opend, { open, close }] = useDisclosure();
  const formEdit = useForm({
    initialValues: {
      user_pname: "",
      user_fname: "",
      user_lname: "",
      user_position: "",
      user_office: "",
      user_belong: "",
      user_department: "",
      user_add_no: "",
      user_add_soi: "",
      user_add_road: "",
      user_add_tumbon: "",
      user_add_amphoe: "",
      user_add_province: "",
      user_add_code: "",
      user_add_phone: "",
      user_emp: "",
      user_bank_name: "",
      user_bank_branch: "",
      user_bank_type: "",
      user_bank_number: "",
      user_phone_number: "",
      user_email: "",
      user_citizent: "",
    },
    validate: {
      user_pname: isNotEmpty("กรุณากรอกข้อมูล"),
      user_fname: isNotEmpty("กรุณากรอกข้อมูล"),
      user_lname: isNotEmpty("กรุณากรอกข้อมูล"),
      user_position: isNotEmpty("กรุณากรอกข้อมูล"),
      user_office: isNotEmpty("กรุณากรอกข้อมูล"),
      user_belong: isNotEmpty("กรุณากรอกข้อมูล"),
      user_department: isNotEmpty("กรุณากรอกข้อมูล"),
      user_add_no: isNotEmpty("กรุณากรอกข้อมูล"),
      user_add_soi: isNotEmpty("กรุณากรอกข้อมูล"),
      user_add_road: isNotEmpty("กรุณากรอกข้อมูล"),
      user_add_tumbon: isNotEmpty("กรุณากรอกข้อมูล"),
      user_add_amphoe: isNotEmpty("กรุณากรอกข้อมูล"),
      user_add_province: isNotEmpty("กรุณากรอกข้อมูล"),
      user_add_code: isNotEmpty("กรุณากรอกข้อมูล"),
      user_add_phone: isNotEmpty("กรุณากรอกข้อมูล"),
      user_emp: isNotEmpty("กรุณากรอกข้อมูล"),
      user_bank_name: isNotEmpty("กรุณากรอกข้อมูล"),
      user_bank_branch: isNotEmpty("กรุณากรอกข้อมูล"),
      user_bank_type: isNotEmpty("กรุณากรอกข้อมูล"),
      user_bank_number: isNotEmpty("กรุณากรอกข้อมูล"),
      user_phone_number: isNotEmpty("กรุณากรอกข้อมูล"),
      user_email: isNotEmpty("กรุณากรอกข้อมูล"),
      user_citizent: isNotEmpty("กรุณากรอกข้อมูล"),
    },
  });
  const SubMit = (data) => {
    const formdata = new FormData();
    formdata.append("user_citizent", data.user_citizent);
    formdata.append("user_pname", data.user_pname);
    formdata.append("user_lname", data.user_lname);
    formdata.append("user_fname", data.user_fname);
    formdata.append("user_position", data.user_position);
    formdata.append("user_office", data.user_office);
    formdata.append("user_belong", data.user_belong);
    formdata.append("user_department", data.user_department);
    formdata.append("user_add_no", data.user_add_no);
    formdata.append("user_add_soi", data.user_add_soi);
    formdata.append("user_add_road", data.user_add_road);
    formdata.append("user_add_tumbon", data.user_add_tumbon);
    formdata.append("user_add_amphoe", data.user_add_amphoe);
    formdata.append("user_add_province", data.user_add_province);
    formdata.append("user_add_phone", data.user_add_phone);
    formdata.append("user_emp", data.user_emp);
    formdata.append("user_bank_name", data.user_bank_name);
    formdata.append("user_bank_branch", data.user_bank_branch);
    formdata.append("user_bank_type", data.user_bank_type);
    formdata.append("user_bank_number", data.user_bank_number);
    formdata.append("user_phone_number", data.user_phone_number);
    formdata.append("user_email", data.user_email);
    formdata.append("user_add_code", data.user_add_code);
    axios.post(API + "/index/InsertCoperate", formdata).then((res) => {
      if (res.data === "success") {
        Swal.fire({
          icon: "success",
          title: "เพิ่มข้อมูลสำเร็จ",
          timer: 600,
          timerProgressBar: true,
          showConfirmButton: false,
        }).then((res) => {
          close();
          fetch();
        });
      }
    });
  };

  const FetchOldData = () => {
    const formdata = new FormData();
    formdata.append("user_citizent", parseInt(localStorage.getItem("citizen")));
    axios.post(API + "/index/ShowEditCoperate", formdata).then((res) => {
      console.log(res.data);
      const data = res.data;
      if (data.length !== 0) {
        formEdit.setValues({
          user_pname: data[0].user_pname,
          user_fname: data[0].user_fname,
          user_lname: data[0].user_lname,
          user_position: data[0].user_position,
          user_office: data[0].user_office,
          user_belong: data[0].user_belong,
          user_department: data[0].user_department,
          user_add_no: data[0].user_add_no,
          user_add_soi: data[0].user_add_soi,
          user_add_road: data[0].user_add_road,
          user_add_tumbon: data[0].user_add_tumbon,
          user_add_amphoe: data[0].user_add_amphoe,
          user_add_province: data[0].user_add_province,
          user_add_code: data[0].user_add_code,
          user_add_phone: data[0].user_add_phone,
          user_emp: data[0].user_emp,
          user_bank_name: data[0].user_bank_name,
          user_bank_branch: data[0].user_bank_branch,
          user_bank_type: data[0].user_bank_type,
          user_bank_number: data[0].user_bank_number,
          user_phone_number: data[0].user_phone_number,
          user_email: data[0].user_email,
          user_citizent: data[0].user_citizent,
        });
      } else {
        formEdit.setValues({
          user_citizent: user_citizent,
        });
      }
    });
  };

  return (
    <>
      <Button
        color="var(--success)"
        leftSection={<IconPlus />}
        onClick={() => {
          FetchOldData()
          open();
        }}
      >
        เพิ่มข้อมูลแบบฟอร์ม
      </Button>
      <Modal
        title="แบบแจ้งข้อมูลการรับเงินผ่านระบบ KTB Corporate Online"
        // onClose={() => {
        //   setOpenFormKbt(false);
        // }}
        size={"xxl"}
        closeOnClickOutside={false}
        opened={opend}
        onClose={() => {
          formEdit.reset();
          close();
        }}
      >
        <form
          onSubmit={formEdit.onSubmit((v) => {
            SubMit(v);
          })}
        >
          <ScrollArea h={515}>
            <Fieldset legend="ข้อมูลทั่วไป">
              <SimpleGrid cols={{ base: 1, sm: 3 }}>
                <TextInput label="คำนำหน้า" {...formEdit.getInputProps("user_pname")} />
                <TextInput label="ชื่อ" {...formEdit.getInputProps("user_fname")} />
                <TextInput label="นามสกุล" {...formEdit.getInputProps("user_lname")} />
              </SimpleGrid>
              <SimpleGrid cols={{ base: 1, sm: 3 }}>
                <TextInput label="เลขประจำตัวประชาชน" {...formEdit.getInputProps("user_citizent")} />
                <TextInput label="สำนัก/กอง/ศูนย์" {...formEdit.getInputProps("user_office")} />
                <TextInput label="กระทรวง" {...formEdit.getInputProps("user_belong")} />
              </SimpleGrid>
              <SimpleGrid cols={{ base: 1, sm: 3 }}>
                {" "}
                <TextInput label="สังกัดกรม" {...formEdit.getInputProps("user_department")} />
                <TextInput label="ตำแหน่ง" {...formEdit.getInputProps("user_position")} />
              </SimpleGrid>
            </Fieldset>
            <Divider my="md" variant="dashed" />
            <Fieldset legend="ข้อมูลที่อยู่">
              <SimpleGrid cols={{ base: 1, sm: 3 }}>
                <TextInput label="บ้านเลขที่" {...formEdit.getInputProps("user_add_no")} />
                <TextInput label="ซอย" {...formEdit.getInputProps("user_add_soi")} />
                <TextInput label="ถนน" {...formEdit.getInputProps("user_add_road")} />
              </SimpleGrid>
              <SimpleGrid cols={{ base: 1, sm: 3 }}>
                <TextInput label="ตำบล" {...formEdit.getInputProps("user_add_tumbon")} />
                <TextInput label="อำเภอ" {...formEdit.getInputProps("user_add_amphoe")} />
                <TextInput label="จังหวัด" {...formEdit.getInputProps("user_add_province")} />
              </SimpleGrid>
              <SimpleGrid cols={{ base: 1, sm: 3 }}>
                <TextInput label="รหัสไปรษณีย์" {...formEdit.getInputProps("user_add_code")} />
                <TextInput label="เบอร์โทรศัพท์" {...formEdit.getInputProps("user_add_phone")} />
              </SimpleGrid>
            </Fieldset>
            <Divider my="md" variant="dashed" />
            <Fieldset legend="ข้อมูลธนาคาร">
              <SimpleGrid>
                <Radio
                  error={formEdit.errors.user_emp}
                  onChange={() => {
                    formEdit.setValues({
                      user_emp: "1",
                    });
                  }}
                  checked={formEdit.values.user_emp === "1" ? true : false}
                  label="เป็นข้าราชการ ลูกจ้าง พนักงานราชการของหน่วยงาน"
                />
                <Radio
                  error={formEdit.errors.user_emp}
                  onChange={() => {
                    formEdit.setValues({
                      user_emp: "2",
                    });
                  }}
                  checked={formEdit.values.user_emp === "2" ? true : false}
                  label="เป็นบุคคลภายนอก เพื่อเข้าบัญชีเงินฝากธนคาร"
                />
              </SimpleGrid>
              <SimpleGrid cols={{ base: 1, sm: 3 }}>
                <TextInput label="บัญชีเงินฝากธนาคาร" {...formEdit.getInputProps("user_bank_name")} />
                <TextInput label="สาขา" {...formEdit.getInputProps("user_bank_branch")} />
                <TextInput label="ประเภทธนาคาร" {...formEdit.getInputProps("user_bank_type")} />
              </SimpleGrid>
              <SimpleGrid cols={{ base: 1, sm: 3 }}>
                <TextInput label="เลขที่บัญชีเงินฝากธนาคาร" {...formEdit.getInputProps("user_bank_number")} />
                <TextInput
                  label="เบอร์โทรศัพท์ สำหรับแจ้งเตือนผ่านมือถือ"
                  {...formEdit.getInputProps("user_phone_number")}
                />
                <TextInput label="E-mail" {...formEdit.getInputProps("user_email")} />
              </SimpleGrid>
            </Fieldset>
            <Blockquote icon={<IconInfoCircle />}>
              <Text c={"blue"}>
                หากกรอกและบันทึกข้อมูลนี้แล้ว ให้พิมพ์แบบฟอร์มนี้ แล้วเตรียมสำเนาหน้าสมุดบัญชี
                จากนั้นนำมาส่งที่งานการเงิน
              </Text>
            </Blockquote>
          </ScrollArea>{" "}
          <Flex py={10} justify={"flex-end"}>
            <Button type="submit" leftSection={<IconDeviceFloppy />} color="var(--success)" variant="filled">
              บันทึกข้อมูล
            </Button>
            <Button
              onClick={() => {
                formEdit.reset();
                close();
              }}
              color="var(--danger)"
              variant="subtle"
            >
              ยกเลิก
            </Button>
          </Flex>
        </form>
      </Modal>
    </>
  );
}

export default FormAddKTB;
