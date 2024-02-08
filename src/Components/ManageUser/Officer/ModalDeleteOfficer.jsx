import { Button } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";

function ModalDeleteOfficer() {
  return (
    <>
      <Button leftSection={<IconTrash />} size="xs" color="var(--danger)">
        ลบ
      </Button>
    </>
  );
}

export default ModalDeleteOfficer;
