import { Button, Flex, Modal, Select, SimpleGrid, TextInput } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconCashBanknote, IconDeviceFloppy } from "@tabler/icons-react";

function ModalAddBank() {
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <div>
      <Button
        onClick={() => {
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
          <SimpleGrid cols={{base:1,sm:2}}>
            <Select label="ธนาคาร" />
            <Select label="ประเภทธนาคาร" />
          </SimpleGrid>

          <TextInput label="เลขบัญชี" />
          <Flex>
            <Button color="var(--success)"  leftSection={<IconDeviceFloppy/>} >
                บันทึก
            </Button>
          </Flex>
        </SimpleGrid>
      </Modal>
    </div>
  );
}
export default ModalAddBank;
