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

function EditDebtor() {
  const [opened, { open, close }] = useDisclosure();
  const form = useForm({
    initialValues: {
      DATAEMPLOY: [],
    },
  });
  return (
    <>
      <Button onClick={open} color="orange.5" size="xs">
        แก้ไข
      </Button>
      <Modal title="แก้ไขข้อมูลลูกหนี้" opened={opened} onClose={close}>
        <SimpleGrid cols={2}>
          <TextInput type="date" label="วัน เดือน ปี" />
          <TextInput type="date" label="วันครบกำหนด" />
        </SimpleGrid>

        <Select searchable={true} data={form.values.DATAEMPLOY} mt={5} label="ผู้ยืม" />
        <Textarea autosize minRows={2} resize="vertical" label="วัตถุประสงค์การยืม" />
        <SimpleGrid cols={2}>
          <NumberInput thousandSeparator decimalScale={2} fixedDecimalScale label="จำนวนเงินค้าง" />
          <NumberInput
            thousandSeparator
            decimalScale={2}
            fixedDecimalScale
            label="จำนวนเงินค้างคงเหลือ"
          />
        </SimpleGrid>
        <TextInput mt={5} label="ใบยืมที่" />
        <Textarea autosize minRows={2} resize="vertical" label="หมายเหตุ" />
        <SimpleGrid cols={2} mt={5}>
          <Select
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
            label="ระยะเวลาการแจ้งเตือน"
          />
          <Select
            label="สถานะการแจ้งเตือน"
            data={[
              {
                label: "เปิดใช้งาน",
                value: "1",
              },
              {
                label: "ปิดใช้งาน",
                value: "0",
              },
            ]}
          />
        </SimpleGrid>
        <Divider size={"md"} variant="dashed" my={15} />
        <Button fullWidth mt={5}>
          บันทึก
        </Button>
      </Modal>
    </>
  );
}

export default EditDebtor;
