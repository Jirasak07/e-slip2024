import { ActionIcon, Divider, Flex, Modal, Paper, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconEye } from "@tabler/icons-react";

function DetailDebtor({ DEBTOR_ID }) {
  const [opened, { open, close }] = useDisclosure(false);
  const OpenDetail = async () => {
    try {
      open();
      // console.log(object)
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <ActionIcon
        onClick={() => {
          OpenDetail();
        }}
        color="var(--primary)"
      >
        <IconEye />
      </ActionIcon>
      <Modal title="ข้อมูลลูกหนี้เงินยืมนอกงบประมาณ" opened={opened} onClose={close}>
        <Paper>
          <Text fw={600}>ผู้ยืม</Text>
          <Text>นายจิรศักดิ์ สิงหบุตร</Text>
        </Paper>
        <Divider variant="dashed" my={5} size={"sm"} />
        <Paper>
          <Text fw={600}>รายละเอียด</Text>
          <Text>ใบยืมเลขที่ : 12</Text>
          <Text>วันที่ยืม : 11/01/2025 </Text>
          <Text>วันครบกำหนด : 20/01/2025</Text>
          <Text>จำนวนเงินค้าง : 32,210.00</Text>
          <Text>จำนวนเงินค้างคงเหลือ : 32,210.00</Text>
         <Divider variant="dashed" my={5} size={"sm"} />
          <Flex>
            <Text mx={"auto"}>วัตถุประสงค์การยืม</Text>
          </Flex>
          <Text>วัตถุประสงค์การยืม</Text>
        </Paper>
      </Modal>
    </>
  );
}

export default DetailDebtor;
