import { Badge, Button, Container, Flex, LoadingOverlay, Modal, Paper, Switch } from "@mantine/core";
import { IconFilePlus, IconFileTypeXls, IconUserPlus } from "@tabler/icons-react";
import { MDBDataTableV5 } from "mdbreact";
import { useEffect, useState } from "react";
import FormKTB from "./FormKTB";
import axios from "axios";
import { API } from "../../Config/ConfigApi";
import EditKtb from "./Manage/EditKtb";
import DeleteKtb from "./Manage/DeleteKtb";
import Swal from "sweetalert2";
function KtbCorporate() {
  const [OpenFormKbt, setOpenFormKbt] = useState(false);
  const columns = [
    {
      label: "ลำดับ",
      field: "no",
    },
    // {
    //   label: "เลขบัตรประชาชน",
    //   field: "citizen",
    //   minimal: "lg",
    // },
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
  const [TableKtb, setTableKtb] = useState({
    columns: columns,
    rows: [],
  });
  const ChangeSending = (status, citizen) => {
    const form = new FormData();
    form.append("user_citizent", citizen);
    if (status === "1") {
      form.append("user_status_sent", 0);
    } else {
      form.append("user_status_sent", 1);
    }
    axios.post(API + "/index/UpdateSentCOperate", form).then((res) => {
      if (res.data === "success") {
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 600,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          },
        });
        Toast.fire({
          icon: "success",
          title: "อัพเดทสถานะการส่งสำเร็จ",
        }).then((res) => {
          GetData();
        });
      } else {
        console.log(res.data);
      }
    });
  };

  const GetData = (params) => {
    setLoad(true);
    axios.get(API + "/index/ShowAllCoperate").then((res) => {
      const data = res.data;
      setLoad(false);
      if (data.length !== 0) {
        setTableKtb({
          columns: columns,
          rows: [
            ...data.map((i, key) => ({
              no: key + 1,
              citizen: i.user_citizent,
              name: i.user_pname + i.user_fname + " " + i.user_lname,
              bank: i.user_bank_name,
              branch: i.user_bank_branch,
              banknumber: i.user_bank_number,
              sending: (
                <>
                  <Switch
                    checked={i.user_status_sent === "1" ? true : false}
                    color="green"
                    onChange={() => {
                      ChangeSending(i.user_status_sent, i.user_citizent);
                    }}
                  />
                </>
              ),
              manage: (
                <>
                  <Flex gap={10}>
                    <EditKtb fetch={Fetch} user_citizent={i.user_citizent} />
                    <DeleteKtb fetch={Fetch} user_citizent={i.user_citizent} />
                  </Flex>
                </>
              ),
            })),
          ],
        });
      } else {
        setTableKtb({
          columns: columns,
          rows: [],
        });
      }
    });
  };
  const Fetch = (params) => {
    GetData();
  }
  
  const [Load, setLoad] = useState(false);
  useEffect(() => {
    // setLoad
    GetData();
  }, []);
  return (
    <>
      <LoadingOverlay visible={Load} loaderProps={{ type: "dots" }} />
      <Container p={0} bg={"white"} fluid>
        <Badge color="var(--primary)" variant="light" size="md" radius={8}>
          จัดการข้อมูลการรับเงินผ่านระบบ KTB Corporate Online
        </Badge>
        <Paper mt={15}>
          <Flex justify={"flex-end"} gap={10}>
          <FormKTB fetch={Fetch} />
            <Button variant="light" color="var(--success)" leftSection={<IconFileTypeXls />}>
              Excel
            </Button>
          </Flex>
        </Paper>
        <Paper pt={20}>
          <MDBDataTableV5
          maxHeight={"50dvh"}
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
      {/* <Modal
        title="แบบแจ้งข้อมูลการรับเงินผ่านระบบ KTB Corporate Online"
        opened={OpenFormKbt}
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
      </Modal> */}
    </>
  );
}

export default KtbCorporate;
