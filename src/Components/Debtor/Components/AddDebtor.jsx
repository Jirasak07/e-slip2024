import {
  Button,
  Divider,
  Modal,
  NumberInput,
  Select,
  SimpleGrid,
  Textarea,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import axios from "axios";

function AddDebtor() {
  const [opened, { open, close }] = useDisclosure();
  const form = useForm({
    initialValues: {
      DATAEMPLOY: [],
      DEBTOR_CITIZEN: "", //เลขบัตรผู้ยืม
      DEBTOR_DATE: "", //วัน เดือน ปี ยืม
      DEBTOR_DATEEND: "", //วัน เดือน ปี ครบกำหนด
      DEBTOR_PURPOSE: "", //วัตถุประสงค์การยืม
      DEBTOR_AMOUNT: "", //จำนวนเงินค้าง
      DEBTOR_TOTAL: "", //จำนวนเงินค้างคงเหลือ
      DEBTOR_BILL: "", //ใบยืมที่
      DEBTOR_NOTE: "", //หมายเหตุ
      DEBTOR_TYPENOTIFY: "", //ประเภทระยะเวลาการแจ้งเตือน
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
        <SimpleGrid cols={2}>
          <TextInput type="date" label="วัน เดือน ปี" />
          <TextInput type="date" label="วันครบกำหนด" />
        </SimpleGrid>

        <Select searchable={true} data={form.values.DATAEMPLOY} mt={5} label="ผู้ยืม" />
        <Textarea autosize minRows={2} resize="vertical" label="วัตถุประสงค์การยืม" />
        <SimpleGrid cols={2}>
          <NumberInput
            suffix=" ฿"
            thousandSeparator
            defaultValue={0.00}
            decimalScale={2}
            fixedDecimalScale
            label="จำนวนเงินค้าง"
            hideControls
          />
          <NumberInput
          defaultValue={0.00}
            thousandSeparator
            suffix=" ฿"
            hideControls
            decimalScale={2}
            fixedDecimalScale
            label="จำนวนเงินค้างคงเหลือ"
          />
        </SimpleGrid>
        <TextInput mt={5} label="ใบยืมที่" />
        <Textarea autosize minRows={2} resize="vertical" label="หมายเหตุ" />
        <SimpleGrid cols={2}>
          <Select
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
        </SimpleGrid>
        <Divider size={"md"} variant="dashed" my={15} />
        <Button color="var(--primary)" fullWidth mt={5}>
          บันทึก
        </Button>
      </Modal>
    </>
  );
}

export default AddDebtor;
