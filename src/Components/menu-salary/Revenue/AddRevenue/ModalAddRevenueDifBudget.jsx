import { Button, Flex, Modal, Select, SimpleGrid, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
function ModalAddRevenueDifBudget({}) {
  const [opened, { open, close }] = useDisclosure(false);
  const form = useForm({
    initialValues: {
      year: "",
      month: "",
      DATEMONTH: [],
      customers_citizent: "",
      idbudget: "",
      databudget: "",
      customers_type: "",
      revenue_id: "",
      datarevenue: [],
      dateTYpe: [],
      DATAYEAR: [],
      payslip_total: "",
    },
  });
  return (
    <div>
      <Button onClick={open}>เพิ่มรายรับใหม่</Button>
      <Modal opened={opened} onClose={close}>
        <form>
          <SimpleGrid>
            <TextInput {...form.getInputProps("customers_citizent")} label={"เลขบัตรประชาชน"} />
            <Select {...form.getInputProps("revenue_id")} label={"รายรับ"} />
            <TextInput label={"ปี"} {...form.getInputProps("year")} />
            <TextInput label={"เดือน"} {...form.getInputProps("month")} />
            <TextInput label={"ประเภทพนักงาน"} {...form.getInputProps("customers_type")} />
            <TextInput label={"จำนวนเงิน"} {...form.getInputProps("payslip_total")} />
            <Flex justify={"flex-end"}>
              <Button color="green">บันทึก</Button>
            </Flex>
          </SimpleGrid>
        </form>
      </Modal>
    </div>
  );
}

export default ModalAddRevenueDifBudget;
