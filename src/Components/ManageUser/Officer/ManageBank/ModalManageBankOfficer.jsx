import { Badge, Button, Flex, Modal, Paper } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconBook, IconCashBanknote, IconDeviceFloppy, IconPlus } from "@tabler/icons-react";
import { MDBDataTableV5 } from "mdbreact";
import React, { useState } from "react";

function ModalManageBankOfficer({ name, citizenid }) {
  const [opened, { open, close }] = useDisclosure(false);
  const [RowTatble, setRowTatble] = useState([]);
  const col = [
    {
      label: "ลำดับ",
      field: "no",
    },
    {
      label: "ธนาคาร",
      field: "bank_name",
      minimal: "lg",
    },
    {
      label: "เลขบัญชี",
      field: "bank_no",
      minimal: "lg",
    },
    {
      label: "ประเภทบัญชี",
      field: "bank_type",
    },
    {
      label: "สถานะ",
      field: "bank_status",
    },
    {
      label: "จัดการ",
      field: "manage",
    },
  ];

  return (
    <>
      <Button onClick={open} leftSection={<IconBook />} size="xs" color="var(--primary)">
        บัญชี
      </Button>

      <Modal size={"xl"} title={"จัดการข้อมูลธนาคาร " + name} opened={opened} onClose={close}>
        <Flex justify={"space-between"} >
          <Badge radius={4} variant="light" size="lg" color="var(--primary)">
            รายการบัญชี
          </Badge>
          <Button color="violet" size="xs" leftSection={<IconCashBanknote />} >
            เพิ่มบัญชีใหม่
          </Button>
        </Flex>

        <MDBDataTableV5 striped responsive data={{ columns: col, rows: RowTatble }} />
      </Modal>
    </>
  );
}

export default ModalManageBankOfficer;
