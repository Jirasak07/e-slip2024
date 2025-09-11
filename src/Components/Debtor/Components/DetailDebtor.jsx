import {
  ActionIcon,
  Divider,
  Flex,
  Modal,
  NumberFormatter,
  Paper,
  Text,
  Textarea,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconEye } from "@tabler/icons-react";
import axios from "axios";
import { API } from "../../Config/ConfigApi";
import { useState } from "react";

function DetailDebtor({ DEBTOR_ID }) {
  const typenotice = [
    {
      label: "ทุกๆ 1 วัน",
      value: "1",
    },
    {
      label: "ทุกๆ 7 วัน",
      value: "2",
    },
    {
      label: "ทุกๆ 15 วัน",
      value: "3",
    },
    {
      label: "ทุกๆ 30 วัน",
      value: "4",
    },
  ];
  const [opened, { open, close }] = useDisclosure(false);
  const [DataDebtor, setDataDebtor] = useState(null);
  const OpenDetail = async () => {
    try {
      open();
      const fetch = await axios.post(API + "/Debtor/DetailDebtor", {
        DEBTOR_ID: DEBTOR_ID,
      });
      const response = await fetch.data;
      console.log(response);
      if (response.length !== 0) {
        setDataDebtor(response);
      } else {
        setDataDebtor(null);
      }
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
        {DataDebtor !== null && (
          <>
            <Paper>
              <Text fw={600}>ผู้ยืม</Text>
              <Text>
                {DataDebtor[0].PRES !== null ? DataDebtor[0].PRES : DataDebtor[0].PRE}
                {DataDebtor[0].DEBTOR_NAME}
              </Text>
            </Paper>
            <Divider variant="dashed" my={5} size={"sm"} />
            <Paper>
              <Text fw={600}>รายละเอียด</Text>
              <Text>ใบยืมเลขที่ : {DataDebtor[0].DEBTOR_BILL}</Text>
              <Text>วันที่ยืม : {DataDebtor[0].DEBTOR_DATE} </Text>
              <Text>วันครบกำหนด : {DataDebtor[0].DEBTOR_DATEEND}</Text>
              <Text>
                จำนวนเงินค้าง :
                <NumberFormatter
                  value={DataDebtor[0].DEBTOR_AMOUNT}
                  thousandSeparator
                  decimalScale={2}
                  fixedDecimalScale
                />
              </Text>
              <Text>
                จำนวนเงินค้างคงเหลือ :
                <NumberFormatter
                  value={DataDebtor[0].DEBTOR_TOTAL}
                  thousandSeparator
                  decimalScale={2}
                  fixedDecimalScale
                />
              </Text>
              <Divider variant="dashed" my={5} size={"sm"} />
              <Flex>
                <Text mx={"auto"}>วัตถุประสงค์การยืม</Text>
              </Flex>
              <Textarea readOnly value={DataDebtor[0].DEBTOR_PURPOSE} />
              <Flex>
                <Text mx={"auto"}>หมายเหตุ</Text>
              </Flex>
              <Textarea readOnly value={DataDebtor[0].DEBTOR_NOTE} />
              <Divider variant="dashed" my={5} size={"sm"} />
              <Text>
                รอบการแจ้งเตือน :
                {typenotice.find((val) => val.value === DataDebtor[0].DEBTOR_TYPENOTIFY).label}
              </Text>
              <Text>การแจ้งเตือนครั้งถัดไป : {DataDebtor[0].DEBTOR_NEXTNOTIFY}</Text>
              <Text>
                สถานะการแจ้งเตือน :
                {DataDebtor[0].DEBTOR_STATUS_NOTIFY === "1" ? "เปิดใช้งาน" : "ปิดใช้งาน"}
                
              </Text>
            </Paper>
          </>
        )}
      </Modal>
    </>
  );
}

export default DetailDebtor;
