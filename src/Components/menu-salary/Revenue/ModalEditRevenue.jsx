import { Button, Modal } from "@mantine/core";
import { IconEdit } from "@tabler/icons-react";
import React, { useState } from "react";

function ModalEditRevenue({ FetchRevenue, revenue_id }) {
  const [openModal, setopenModal] = useState(false);

  return (
    <>
      <Button
        onClick={() => {
          setopenModal(true);
        }}
        color="var(--warning)"
        leftSection={<IconEdit />}
        size="xs"
      >
        แก้ไขข้อมูลรายรับ
      </Button>
      <Modal
        opened={openModal}
        onClose={() => {
          setopenModal(false);
        }}
      >
        {revenue_id}
      </Modal>
    </>
  );
}

export default ModalEditRevenue;
