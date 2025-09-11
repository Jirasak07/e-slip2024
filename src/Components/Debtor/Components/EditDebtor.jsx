import { ActionIcon, Divider, Modal, Paper } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconEdit } from "@tabler/icons-react";

function EditDebtor({ FN, DEBTOR_ID }) {
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <>
      <ActionIcon
        color="orange.5"
        onClick={() => {
          open();
          console.log("ee");
        }}
      >
        <IconEdit />
      </ActionIcon>
      <Modal title="แก้ไขรายละเอียดลูกหนี้นอกงบประมาณ" opened={opened} onClose={close}>
        <Paper p={10}>sahgdjhsagdjhas</Paper>
        <Divider my={5} variant="dashed" size={"sm"} />
      </Modal>
    </>
  );
}

export default EditDebtor;
