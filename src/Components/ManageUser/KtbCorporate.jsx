import { Badge, Button, Container, Flex, Modal, Paper } from "@mantine/core";
import { IconFilePlus, IconFileTypeXls, IconUserPlus } from "@tabler/icons-react";
import { MDBDataTableV5 } from "mdbreact";
import { useEffect, useState } from "react";
import FormKTB from "./FormKTB";
function KtbCorporate() {
    const [TableKtb, setTableKtb] = useState([]);
    const [OpenFormKbt, setOpenFormKbt] = useState(false);
    const columns = [
        {
          label: "ลำดับ",
          field: "no",
        },
        {
          label: "เลขบัตรประชาชน",
          field: "citizen",
        },
        {
          label: "ชื่อ-นามสกุล",
          field: "name",
        },
        {
          label: "ธนาคาร",
          field: "bank",
        },
        {
          label: "สาขา",
          field: "branch",
        },
        {
          label: "เลขบัญชี",
          field: "banknumber",
        },
        {
          label: "ส่งแล้ว",
          field: "sending",
        },
        {
          label: "จัดการ",
          field: "manage",
        },
      ];
      useEffect(()=>{
        setTableKtb({
            columns:columns,
            rows:[]
        })
      },[])
  return (
    <>
      <Badge color="var(--primary)" variant="light" size="lg" radius={8}>
        จัดการข้อมูลการรับเงินผ่านระบบ KTB Corporate Online
      </Badge>
      <Container bg={"white"} fluid>
        <Paper mt={15}>
          <Flex justify={"flex-end"} gap={10}>
            <Button onClick={()=>{
                setOpenFormKbt(true)
            }} variant="light" color="var(--primary)" leftSection={<IconFilePlus />}>
              เพิ่มข้อมูล
            </Button>
            <Button variant="light" color="var(--success)" leftSection={<IconFileTypeXls />}>
              Excel
            </Button>
          </Flex>
        </Paper>
        <Paper>
          <MDBDataTableV5 responsive striped data={TableKtb} />
        </Paper>
      </Container>
      <Modal 
      title="แบบแจ้งข้อมูลการรับเงินผ่านระบบ KTB Corporate Online"
      opened={OpenFormKbt} onClose={()=>{
        setOpenFormKbt(false)
      }} 
      size={"xxl"}
      closeOnClickOutside={false}
      >
<FormKTB/>
      </Modal>
    </>
  );
}

export default KtbCorporate;
