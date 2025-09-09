import {
  Button,
  Divider,
  LoadingOverlay,
  Modal,
  NumberInput,
  Select,
  SimpleGrid,
  Textarea,
  TextInput,
} from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import axios from "axios";
import { API } from "../../Config/ConfigApi";
import Swal from "sweetalert2";
import { useState } from "react";

function AddDebtor({FN}) {
  const [opened, { open, close }] = useDisclosure();
  const form = useForm({
    initialValues: {
      DATAEMPLOY: [],
      DEBTOR_CITIZEN: "", //เลขบัตรผู้ยืม
      DEBTOR_FISICALYEAR: "", //ปีงบประมาณ
      DEBTOR_DATE: "", //วัน เดือน ปี ยืม
      DEBTOR_DATEEND: "", //วัน เดือน ปี ครบกำหนด
      DEBTOR_PURPOSE: "", //วัตถุประสงค์การยืม
      DEBTOR_AMOUNT: "", //จำนวนเงินค้าง
      DEBTOR_TOTAL: "", //จำนวนเงินค้างคงเหลือ
      DEBTOR_BILL: "", //ใบยืมที่
      DEBTOR_NOTE: "", //หมายเหตุ
      DEBTOR_TYPENOTIFY: "", //ประเภทระยะเวลาการแจ้งเตือน
    },
    validate: {
      DEBTOR_CITIZEN: isNotEmpty("กรุณากรอกข้อมูล"),
      DEBTOR_FISICALYEAR: isNotEmpty("กรุณากรอกข้อมูล"),
      DEBTOR_DATE: isNotEmpty("กรุณากรอกข้อมูล"),
      DEBTOR_DATEEND: isNotEmpty("กรุณากรอกข้อมูล"),
      DEBTOR_PURPOSE: isNotEmpty("กรุณากรอกข้อมูล"),
      DEBTOR_AMOUNT: isNotEmpty("กรุณากรอกข้อมูล"),
      DEBTOR_TOTAL: isNotEmpty("กรุณากรอกข้อมูล"),
      DEBTOR_BILL: isNotEmpty("กรุณากรอกข้อมูล"),
      DEBTOR_NOTE: isNotEmpty("กรุณากรอกข้อมูล"),
      DEBTOR_TYPENOTIFY: isNotEmpty("กรุณากรอกข้อมูล"),
    },
  });
  const FindEmploy = async () => {
    try {
      // const "/room/findemploy"
      const fetch = await axios.get("https://mua.kpru.ac.th/apiexamcheck/room/findemploy");
      const data = fetch.data;
      if (data.length !== 0) {
        form.setValues({ DATAEMPLOY: data });
      } else {
        form.setValues({ DATAEMPLOY: [] });
      }
      open();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  const Submit = async (data) => {
    try {
      console.log(data);
      const fetch = await axios.post(API + "/Debtor/AddDebtor", {
        DEBTOR_CITIZEN: data.DEBTOR_CITIZEN,
        DEBTOR_FISICALYEAR: data.DEBTOR_FISICALYEAR,
        DEBTOR_DATE: data.DEBTOR_DATE,
        DEBTOR_DATEEND: data.DEBTOR_DATEEND,
        DEBTOR_PURPOSE: data.DEBTOR_PURPOSE,
        DEBTOR_AMOUNT: data.DEBTOR_AMOUNT,
        DEBTOR_TOTAL: data.DEBTOR_TOTAL,
        DEBTOR_BILL: data.DEBTOR_BILL,
        DEBTOR_NOTE: data.DEBTOR_NOTE,
        // DEBTOR_NEXTNOTIFY: data.DEBTOR_NEXTNOTIFY,
        // DEBTOR_STATUS_NOTIFY: data.DEBTOR_STATUS_NOTIFY,
        DEBTOR_TYPENOTIFY: data.DEBTOR_TYPENOTIFY,
      });
      const response = await fetch.data;
      if (response === "success") {
        Swal.fire({
          icon: "success",
          title: "เพิ่มข้อมูลสำเร็จ",
          timer: 1500,
          timerProgressBar: true,
          showConfirmButton: false,
        }).then((res)=>{

          setLoadingSubmit(false);
          close();
          console.log(res)
          FN()

        })
      } else if (response === "copy") {
        Swal.fire({
          icon: "info",
          title: "เพิ่มข้อมูลไม่สำเร็จ",
          text: "มีข้อมูลรายการนี้ในระบบแล้ว",
          timer: 1500,
          timerProgressBar: true,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  const [LoadingSubmit, setLoadingSubmit] = useState(false);
  return (
    <>
      <Button
        color="var(--primary)"
        onClick={() => {
          FindEmploy();
        }}
      >
        เพิ่มข้อมูลลูกหนี้
      </Button>
      <Modal size={"lg"} title="เพิ่มข้อมูลลูกหนี้" opened={opened} onClose={close}>
        <LoadingOverlay
          visible={LoadingSubmit}
          pos={"fixed"}
          h={"100vh"}
          loaderProps={{ type: "dots" }}
        />
        <form
          onSubmit={form.onSubmit((val) => {
            setLoadingSubmit(true);
            Submit(val);
          })}
        >
          <SimpleGrid cols={2}>
            <TextInput type="date" label="วัน เดือน ปี" {...form.getInputProps("DEBTOR_DATE")} />
            <TextInput type="date" label="วันครบกำหนด" {...form.getInputProps("DEBTOR_DATEEND")} />
          </SimpleGrid>
          <Select
            searchable={true}
            data={form.values.DATAEMPLOY}
            mt={5}
            label="ผู้ยืม"
            {...form.getInputProps("DEBTOR_CITIZEN")}
          />
          <Textarea
            autosize
            minRows={2}
            resize="vertical"
            label="วัตถุประสงค์การยืม"
            {...form.getInputProps("DEBTOR_PURPOSE")}
          />
          <SimpleGrid cols={2}>
            <NumberInput
              suffix=" ฿"
              thousandSeparator
              defaultValue={0.0}
              decimalScale={2}
              fixedDecimalScale
              label="จำนวนเงินค้าง"
              {...form.getInputProps("DEBTOR_AMOUNT")}
              hideControls
            />
            <NumberInput
              defaultValue={0.0}
              thousandSeparator
              suffix=" ฿"
              hideControls
              decimalScale={2}
              fixedDecimalScale
              {...form.getInputProps("DEBTOR_TOTAL")}
              label="จำนวนเงินค้างคงเหลือ"
            />
          </SimpleGrid>
          <SimpleGrid cols={2}>
            <SimpleGrid cols={2}>
              <NumberInput
                mt={5}
                hideControls
                label="ปีงบประมาณ"
                maxLength={4}
                {...form.getInputProps("DEBTOR_FISICALYEAR")}
              />
              <NumberInput
                mt={5}
                label="ใบยืมที่"
                hideControls
                {...form.getInputProps("DEBTOR_BILL")}
              />
            </SimpleGrid>

            <Select
              {...form.getInputProps("DEBTOR_TYPENOTIFY")}
              mt={5}
              data={[
                {
                  label: "ทุกๆ 1 วัน",
                  value: "1",
                },
                {
                  label: "ทุกๆ 7 วัน",
                  value: "2",
                },
                {
                  label: "ทุกๆ 15 วัน",
                  value: "3",
                },
                {
                  label: "ทุกๆ 30 วัน",
                  value: "4",
                },
              ]}
              label="รอบการแจ้งเตือน"
            />
          </SimpleGrid>{" "}
          <Textarea
            autosize
            minRows={2}
            resize="vertical"
            label="หมายเหตุ"
            {...form.getInputProps("DEBTOR_NOTE")}
          />
          <Divider size={"md"} variant="dashed" my={15} />
          <Button type="submit" color="var(--primary)" fullWidth mt={5}>
            บันทึก
          </Button>
        </form>
      </Modal>
    </>
  );
}

export default AddDebtor;
