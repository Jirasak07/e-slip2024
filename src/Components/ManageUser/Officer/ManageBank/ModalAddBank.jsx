import { Button, Flex, Modal, Select, SimpleGrid, TextInput } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconCashBanknote, IconDeviceFloppy } from "@tabler/icons-react";
import { API } from "../../../Config/ConfigApi";
import axios from "axios";
import { useForm } from "@mantine/form";

function ModalAddBank() {
  const form = useForm({
    initialValues: {
      customers_citizent: "",
      account_number: "",
      account_type: "",
      statusbank: "",
      select_bank: [],
      select_bank_type: [],
    },
    validate: {},
  });
  const FetchBankData = (params) => {
    axios.get(API + "/index/showbank").then((res) => {
      const data = res.data;
      if (data.length !== 0) {
        const select = data[0].bank.map((i) => ({
          value: i.bank_id,
          label: i.bank_name,
        }));
        const selecttype = data[0].bank_type.map((i) => ({
          value: i.id_account_type,
          label: i.name_account_type,
        }));
        form.setValues({
          select_bank: select,
          select_bank_type: selecttype,
        });
      }
    });
  };
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <div>
      <Button
        onClick={() => {
          FetchBankData();
          open();
        }}
        color="var(--primary)"
        size="xs"
        leftSection={<IconCashBanknote />}
      >
        เพิ่มบัญชีใหม่
      </Button>

      <Modal size={"lg"} title="เพิ่มบัญชีธนาคาร" closeOnClickOutside={false} opened={opened} onClose={close}>
        <SimpleGrid cols={1}>
          <SimpleGrid cols={{ base: 1, sm: 2 }}>
            <Select allowDeselect={false} searchable data={form.values.select_bank} label="ธนาคาร" />
            <Select allowDeselect={false} searchable data={form.values.select_bank_type} label="ประเภทธนาคาร" />
          </SimpleGrid>

          <TextInput label="เลขบัญชี" />
          <Flex>
            <Button color="var(--success)" leftSection={<IconDeviceFloppy />}>
              บันทึก
            </Button>
          </Flex>
        </SimpleGrid>
      </Modal>
    </div>
  );
}
export default ModalAddBank;
