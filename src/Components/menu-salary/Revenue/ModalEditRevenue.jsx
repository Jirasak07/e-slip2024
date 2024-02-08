import { Button, Modal } from "@mantine/core";
import React, { useState } from "react";

function ModalEditRevenue({ revenue_id }) {
  const [Opend, setOpend] = useState(false);
  return (
    <>
      <Modal
        opened={Opend}
        onClose={() => {
          setOpend(false);
        }}
      >
        {revenue_id}
      </Modal>
      <Button
        color="var(--warning)"
        size="xs"
        onClick={() => {
          setOpend(true);
        }}
      >
        แก้ไขข้อมูลรายรับ
      </Button>
    </>
  );
}

export default ModalEditRevenue;
