import { Button, Divider, FileInput, Flex, Modal, SimpleGrid, Text } from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { IconFile } from "@tabler/icons-react";

function UploadButton({ customers_citizent, name, type }) {
  const [opened, { open, close }] = useDisclosure();
  const formupload = useForm({
    initialValues: {
      file: null,
      customers_citizent: "",
    },
    validate: {
      file: (val)=>val !== null ? null:"ddd",
    },
  });
  const ChangeFile = (data) => {
    console.log(data);
    if (data !== null) {
      formupload.setValues({ file: data });
    } else {
      formupload.setValues({ file: null });
    }
  };

  return (
    <div>
      <Button
        onClick={() => {
          formupload.setValues({ customers_citizent: customers_citizent });
          open();
        }}
        size="xs"
        color="violet.8"
      >
        อัพโหลด หนังสือรับรองการหักภาษี ณ ที่จ่าย
      </Button>
      <Modal title="อัพโหลดหนังสือรับรองการหักภาษี" opened={opened} onClose={close}>
        <SimpleGrid>
          <Text>{customers_citizent}</Text>
          <Text>{name}</Text>
          <Text>{type}</Text>
        </SimpleGrid>
        <form>
          <Flex mt={10} gap={10} direction={"column"}>
            <Divider variant="dashed" size={"md"} my={"sm"} />

            <FileInput
              error={formupload.errors}
              {...formupload.getInputProps("file")}
              onChange={ChangeFile}
              label="ไฟล์หนังสือรับรองการหักภาษี ณ ที่จ่าย"
              leftSection={<IconFile />}
              placeholder="เลือกไฟล์ PDF"
              accept=".pdf"
            />
            <Button
             type="submit"
              fullWidth
              color="green.8"
            >
              Upload
            </Button>
          </Flex>
        </form>
      </Modal>
    </div>
  );
}

export default UploadButton;
