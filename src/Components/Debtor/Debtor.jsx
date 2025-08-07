import { Button, Flex, Paper } from "@mantine/core";
import { IconSettings } from "@tabler/icons-react";
import { MDBDataTableV5 } from "mdbreact";
import { useState } from "react";
import AddDebtor from "./Components/AddDebtor";

function Debtor() {
  const columns = [
    {
      label: "ลำดับ",
      field: "no",
    },
    {
      label: "วัน เดือน ปี",
      field: "date",
    },
    {
      label: "ชื่อผู้ยืม",
      field: "name",
    },
    {
      label: "วัตถุประสงค์การยืม",
      field: "reason",
    },
    {
      label: "จำนวนเงินค้าง",
      field: "amount",
    },
    {
      label: "ใบยืมที่",
      field: "billno",
    },
    {
      label: "วันครบกำหนด",
      field: "enddate",
    },
    {
      label: "หมายเหตุ",
      field: "note",
    },
    {
      label: "จำนวนเงินค้าง",
      field: "total",
    },
    {
      label: <IconSettings />,
      field: "manage",
    },
  ];
  const [Data, setData] = useState({
    columns: columns,
    rows: [],
  });
  return (
    <>
      <Flex px={30} justify={"flex-end"}>
        <AddDebtor />
      </Flex>
      <Paper p={10} shadow="sm">
        <MDBDataTableV5 data={Data} />
      </Paper>
    </>
  );
}

export default Debtor;
