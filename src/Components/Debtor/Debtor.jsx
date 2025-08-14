import {  Flex, Paper } from "@mantine/core";
import { IconSettings } from "@tabler/icons-react";
import { MDBDataTableV5 } from "mdbreact";
import { useEffect, useState } from "react";
import AddDebtor from "./Components/AddDebtor";
import EditDebtor from "./Components/EditDebtor";
import axios from "axios";
import { API } from "../Config/ConfigApi";
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
     const fetch = await axios.get(API+'/Debtor');
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
