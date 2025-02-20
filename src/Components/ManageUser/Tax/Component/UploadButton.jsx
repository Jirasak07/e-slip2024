import { Button, Divider, FileInput, Flex, Modal, SimpleGrid, Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { IconFile } from "@tabler/icons-react";

function UploadButton({ customers_citizent, name, type }) {
  const [opened, { open, close }] = useDisclosure();
  const formupload = useForm({
    
  })
  return (
    <div>
      <Button
        onClick={() => {
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
        <Flex mt={10} gap={10} direction={"column"}>
          <Divider variant="dashed" size={"md"} my={"sm"} />
          <FileInput
            label="ไฟล์หนังสือรับรองการหักภาษี ณ ที่จ่าย"
            leftSection={<IconFile />}
            placeholder="เลือกไฟล์ PDF"
            accept=".pdf"
          />
          <Button fullWidth color="green.8">
            Upload
          </Button>
        </Flex>
      </Modal>
    </div>
  );
}

export default UploadButton;
