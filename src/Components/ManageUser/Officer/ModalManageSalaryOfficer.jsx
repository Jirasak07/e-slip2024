import { Button } from "@mantine/core";
import { IconCoin } from "@tabler/icons-react";
import React from "react";

function ModalManageSalaryOfficer() {
  return (
    <>
      <Button leftSection={<IconCoin />} size="xs" color="var(--purple)">
        เงินเดือน
      </Button>
    </>
  );
}

export default ModalManageSalaryOfficer;
