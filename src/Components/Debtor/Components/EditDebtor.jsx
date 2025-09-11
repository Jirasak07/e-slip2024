import { ActionIcon } from "@mantine/core";
import { IconEdit } from "@tabler/icons-react";

function EditDebtor({ FN, DEBTOR_ID }) {
  return (
    <>
      <ActionIcon
        color="orange.5"
        onClick={() => {
          console.log("ee");
        }}
      >
        <IconEdit />
      </ActionIcon>
    </>
  );
}

export default EditDebtor;
