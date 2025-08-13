import { Button, Flex, Paper } from "@mantine/core";
import { IconSettings } from "@tabler/icons-react";
import { MDBDataTableV5 } from "mdbreact";
import { useEffect, useState } from "react";
import AddDebtor from "./Components/AddDebtor";
import EditDebtor from "./Components/EditDebtor";

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
      label: "จำนวนเงินค้างคงเหลือ",
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
  useEffect(() => {
    FetchData();
  }, []);
  const FetchData = async () => {
    try {
      const d = [
        {
          id: "1",
          names: "12",
        },
        {
          id: "1s",
          names: "12s",
        },
        {
          id: "1a",
          names: "12a",
        },
        {
          id: "1d",
          names: "12d",
        },
      ];
      const rowwwww = d.map((i, key) => ({
        no: key + 1,
        date: i.names,
        manage: (
          <>
            <Flex>
             <EditDebtor/>
            </Flex>
          </>
        ),
      }));
      setData({
        columns: columns,
        rows: rowwwww,
      });
    } catch (error) {
      console.log(error);
    }
  };

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
