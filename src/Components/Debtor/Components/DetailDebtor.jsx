import { ActionIcon } from "@mantine/core";
import { IconEye } from "@tabler/icons-react";

function DetailDebtor({ DEBTOR_ID }) {
  return (
    <>
      <ActionIcon   color="var(--primary)" >
        <IconEye />
      </ActionIcon>
    </>
  );
}

export default DetailDebtor;
