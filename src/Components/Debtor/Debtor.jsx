import { ActionIcon, Flex, LoadingOverlay, Paper } from "@mantine/core";
import { IconEye, IconSettings, IconTrash } from "@tabler/icons-react";
import { MDBDataTableV5 } from "mdbreact";
import { useEffect, useState } from "react";
import AddDebtor from "./Components/AddDebtor";
import EditDebtor from "./Components/EditDebtor";
import axios from "axios";
import { API } from "../Config/ConfigApi";
import DetailDebtor from "./Components/DetailDebtor";
import Swal from "sweetalert2";
function Debtor() {
  const columns = [
    {
      label: "ลำดับ",
      field: "no",
    },
    {
      label: "วัน เดือน ปี",
      field: "DATE",
    },
    {
      label: "ชื่อผู้ยืม",
      field: "NAME",
    },
    {
      label: "ใบยืมที่",
      field: "BILL",
    },
    {
      label: "วันครบกำหนด",
      field: "DATEEND",
    },
    {
      label: "จำนวนเงินค้างคงเหลือ",
      field: "TOTAL",
    },
    {
      label: <IconSettings />,
      field: "MANAGE",
    },
  ];
  const [Data, setData] = useState({
    columns: columns,
    rows: [],
  });
  useEffect(() => {
    FetchData();
  }, []);
  const DeleteDebtor = async (ID) => {
    try {
      console.log(ID);
      const fetch = await axios.post(API + "/Debtor/DeleteDebtor", {
        DEBTOR_ID: ID,
      });
      const response = await fetch.data;
      if (response === "success") {
        Swal.fire({
          icon: "success",
          title: "ลบรายการสำเร็จ",
          timer: 1200,
          timerProgressBar: true,
          showConfirmButton: false,
        }).then((r) => {
          setLoadingDebtor(false);
          FetchData();
          console.log(r);
        });
      }
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const FetchData = async () => {
    try {
      setLoadingDebtor(true);
      const fetch = await axios.get(API + "/Debtor/GetDebtor");
      const da = await fetch.data;
      console.log(da);
      if (da.length !== 0) {
        const rowwwww = da.map((i, key) => ({
          no: key + 1,
          DATE: i.DEBTOR_DATE,
          NAME: (i.PRES !== null ? i.PRES : i.PRE) + i.DEBTOR_NAME,
          BILL: i.DEBTOR_BILL,
          DATEEND: i.DEBTOR_DATEEND,
          TOTAL: i.DEBTOR_TOTAL,
          MANAGE: (
            <>
              <Flex gap={5}>
                <DetailDebtor DEBTOR_ID={i.DEBTOR_ID} />
                <EditDebtor />
                <ActionIcon
                  onClick={() => {
                    Swal.fire({
                      icon: "question",
                      title: "ลบรายการนี้หรือไม่ ?",
                      showCancelButton: true,
                      cancelButtonText: "ยกเลิก",
                      confirmButtonText: "ยืนยัน",
                      confirmButtonColor: "var(--primary)",
                      cancelButtonColor: "var(--danger)",
                    }).then((res) => {
                      if (res.isConfirmed === true) {
                        setLoadingDebtor(true);
                        DeleteDebtor(i.DEBTOR_ID);
                      }
                    });
                  }}
                  color="red"
                >
                  <IconTrash />
                </ActionIcon>
              </Flex>
            </>
          ),
        }));
        setData({
          columns: columns,
          rows: rowwwww,
        });
      }
      setLoadingDebtor(false);
    } catch (error) {
      console.log(error);
    }
  };

  const FN = () => {
    FetchData();
  };
  const [LoadingDebtor, setLoadingDebtor] = useState(false);

  return (
    <>
      <LoadingOverlay
        visible={LoadingDebtor}
        pos={"fixed"}
        loaderProps={{ type: "dots" }}
        h={"100vh"}
      />
      <Flex px={30} justify={"flex-end"}>
        <AddDebtor FN={FN} />
      </Flex>
      <Paper p={10} shadow="sm">
        <MDBDataTableV5 data={Data} />
      </Paper>
    </>
  );
}

export default Debtor;
