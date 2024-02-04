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
      minimal: "lg",
    },
    {
      label: "ชื่อ-นามสกุล",
      field: "name",
      minimal: "lg",
    },
    {
      label: "ธนาคาร",
      field: "bank",
      minimal: "lg",
    },
    {
      label: "สาขา",
      field: "branch",
      minimal: "lg",
    },
    {
      label: "เลขบัญชี",
      field: "banknumber",
      minimal: "lg",
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
  useEffect(() => {
    setTableKtb({
      columns: columns,
      rows: [
        {
          no: 1,
        },
      ],
    });
  }, []);
  return (
    <>
      <Container p={0} bg={"white"} fluid>
        <Badge color="var(--primary)" variant="light" size="md" radius={8}>
          จัดการข้อมูลการรับเงินผ่านระบบ KTB Corporate Online
        </Badge>
        <Paper mt={15}>
          <Flex justify={"flex-end"} gap={10}>
            <Button
              onClick={() => {
                setOpenFormKbt(true);
              }}
              variant="light"
              color="var(--primary)"
              leftSection={<IconFilePlus />}
            >
              เพิ่มข้อมูล
            </Button>
            <Button variant="light" color="var(--success)" leftSection={<IconFileTypeXls />}>
              Excel
            </Button>
          </Flex>
        </Paper>
        <Paper pt={20}>
          <MDBDataTableV5
            noRecordsFoundLabel="ไม่พบรายการ"
            responsive
            striped
            searchLabel="ค้นหาจากเลขบัตร หรือ ชื่อ"
            barReverse
            searchTop
            searchBottom={false}
            data={TableKtb}
            entriesLabel="จำนวนที่แสดง"
            entries={10}
            entriesOptions={[10, 15, 20, 50, 100, 150, 300, 500]}
            infoLabel={["", "ถึง", "จาก", ""]}
          />
        </Paper>
      </Container>
      <Modal
        title="แบบแจ้งข้อมูลการรับเงินผ่านระบบ KTB Corporate Online"
        opened={OpenFormKbt}
        // opened={true}
        onClose={() => {
          setOpenFormKbt(false);
        }}
        size={"xxl"}
        closeOnClickOutside={false}
      >
        <FormKTB
          close={() => {
            setOpenFormKbt(false);
          }}
        />
      </Modal>
    </>
  );
}

export default KtbCorporate;
