import { Button, Flex, Modal, NumberInput, Select, SimpleGrid } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconDeviceFloppy, IconEdit } from "@tabler/icons-react";
import React from "react";

function ModalEditSalary({total,idbudget,citizenid,year,month}) {
  const [opened, { open, close }] = useDisclosure();
  return (
    <div>
      <Button onClick={open} leftSection={<IconEdit />} color="var(--warning)" size="xs">
        แก้ไข
      </Button>
      <Modal title="แก้ไขข้อมูลเงินเดือน" opened={opened} onClose={close}>
        <SimpleGrid>
          <Select label="ประเภทงบประมาณ" />
          <NumberInput label="จำนวนเงิน" thousandSeparator />
        </SimpleGrid>
        <Flex justify={"flex-end"} pt={10}>
          <Button leftSection={<IconDeviceFloppy />} color="var(--success)">
            บันทึก
          </Button>
          <Button onClick={close} leftSection={<IconDeviceFloppy />} color="var(--danger)" variant="transparent">
          ยกเลิก
          </Button>
        </Flex>
      </Modal>
    </div>
  );
}

export default ModalEditSalary;
