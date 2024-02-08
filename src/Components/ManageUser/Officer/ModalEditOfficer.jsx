import { Button, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconEdit } from "@tabler/icons-react";
import React from "react";

function ModalEditOfficer({ customerid }) {
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <>
      <Modal title="แก้ไขข้อมูลพนักงาน" opened={opened} onClose={close}>
        {customerid}
      </Modal>
      <Button onClick={open} leftSection={<IconEdit />} size="xs" color="var(--warning)">
        แก้ไข
      </Button>
    </>
  );
}

export default ModalEditOfficer;
