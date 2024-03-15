import { Badge, Button, Flex, Modal, Paper } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconBook, IconCashBanknote, IconDeviceFloppy, IconPlus } from "@tabler/icons-react";
import { MDBDataTableV5 } from "mdbreact";
import React, { useState } from "react";
import ModalAddBank from "./ModalAddBank";
import axios from "axios";
import { API } from "../../../Config/ConfigApi";
import { useForm } from "@mantine/form";

function ModalManageBankOfficer({ name, citizenid }) {
  const [opened, { open, close }] = useDisclosure(false);
  const [RowTatble, setRowTatble] = useState([]);
  const col = [
    {
      label: "ลำดับ",
      field: "no",
    },
    {
      label: "ธนาคาร",
      field: "bank_name",
      minimal: "lg",
    },
    {
      label: "เลขบัญชี",
      field: "bank_no",
      minimal: "lg",
    },
    {
      label: "ประเภทบัญชี",
      field: "bank_type",
    },
    {
      label: "สถานะ",
      field: "bank_status",
    },
    // {
    //   label: "จัดการ",
    //   field: "manage",
    // },
  ];

  const FetchBank = (params) => {
    axios.get(API + "/index/showcustomerbank/" + citizenid).then((res) => {
      const data = res.data;
      if (data.length !== 0) {
        console.log(data);
        setRowTatble([
          ...data.map((i, key) => ({
            no: key + 1,
            bank_name: i.bank_name,
            bank_no: i.account_number,
            bank_type: i.name_account_type,
            bank_status: (
              <Badge variant="light" color={i.statusbank === "1" ? "green" : "gray"} radius={4} fz={12}>
                {i.statusbank === "1" ? "ใช้งาน" : "ระงับใช้งาน"}{" "}
              </Badge>
            ),
            manage: (
              <>
                <Button size="xs"></Button>
              </>
            ),
          })),
        ]);
      } else {
        console.log("error ");
      }
    });
  };

  return (
    <>
      <Button
        onClick={() => {
          FetchBank();
          open();
        }}
        leftSection={<IconBook />}
        size="xs"
        color="var(--primary)"
      >
        บัญชี
      </Button>

      <Modal size={"xl"} title={"จัดการข้อมูลธนาคาร " + name} opened={opened} onClose={close}>
        <Flex justify={"space-between"}>
          <Badge radius={4} variant="light" size="lg" color="var(--primary)">
            รายการบัญชี
          </Badge>
          <ModalAddBank fetch={FetchBank} customers_citizent={citizenid} />
        </Flex>

        <MDBDataTableV5 striped responsive data={{ columns: col, rows: RowTatble }} />
      </Modal>
    </>
  );
}

export default ModalManageBankOfficer;
