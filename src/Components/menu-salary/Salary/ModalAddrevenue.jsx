import {
  Button,
  Center,
  Flex,
  LoadingOverlay,
  Modal,
  NumberInput,
  Select,
  SimpleGrid,
  TextInput,
} from "@mantine/core";
import {
  IconChartBubble,
  IconCoin,
  IconDeviceFloppy,
  IconEdit,
  IconPlaylistAdd,
} from "@tabler/icons-react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { API } from "../../Config/ConfigApi";
import { isNotEmpty, useForm } from "@mantine/form";
import Swal from "sweetalert2";
import { Checkbox } from "@mantine/core";
import { Grid } from "@mantine/core";
import { Text } from "@mantine/core";
import { Divider } from "@mantine/core";

function ModalAddrevenue({ year, month, citizent, type, idbudget, fn, cname }) {
  const [openModal, setopenModal] = useState(false);
  const [OverLay, setOverLay] = useState(false);
  const [DataTypeEmploy, setDataTypeEmploy] = useState([]);
  const [DataCheck, setDataCheck] = useState([]);
  const [artists, setArtists] = useState([]);

  const formEditExpenditure = useForm({
    initialValues: {
      year: year,
      month: month,
      citizent: citizent,
      type: type,
      payslip_total: 0,
      idbudget: "",
      check: [],
    },
    validate: {
      expenditure_name: isNotEmpty("กรุณากรอกข้อมูล"),
    },
  });
  const Fetchdata = () => {
    setTimeout(() => {
      axios
        .get(API + "/index/showrevenueallid/" + year + "/" + month + "/" + citizent + "/" + type)
        .then((res) => {
          console.log(res.data);
          const data = res.data;
          formEditExpenditure.setValues({
            check: data,
          });
          console.log(month);
          setopenModal(true);
          setDataCheck(data);
        });
    }, 400);
  };
  const [BtnLoad, setBtnLoad] = useState(false);
  const UpdateExpenditure = (value) => {
    setBtnLoad(true);
    const form = formEditExpenditure.values;
    axios
      .post(API + "/index/AddRevenueForPersons", {
        citizent: citizent,
        type: type,
        year: year,
        month: month,
        idbudget: idbudget,
        check: form.check,
      })
      .then((res) => {
        setBtnLoad(false);
        if (res.data === "200") {
          Swal.fire({
            icon: "success",
            title: "อัพเดทเสร็จสิ้น",
            timer: 1200,
            timerProgressBar: true,
            showConfirmButton: false,
          }).then((res) => {
            fn();
            setopenModal(false);
          });
        }
        console.log(res.data);
      });
  };

  const handleClick = (revenue_id, payslip_total) => {
    const yourDataCheck = [...DataCheck];
    const artwork = yourDataCheck.find((a) => a.revenue_id === revenue_id);
    artwork.payslip_total = payslip_total;
    setDataCheck(yourDataCheck);
    // console.log(yourDataCheck);
    formEditExpenditure.setValues({
      check: yourDataCheck,
    });
  };

  //   const handleClickcheckbook = (revenue_id,checked) => {
  //     console.log(checked);
  // {checked === true ?<>{checked = 1}</>:<>{checked = 0}</>}

  //     const yourDataCheck = [...DataCheck];
  //     const artwork = yourDataCheck.find(
  //       a => a.revenue_id === revenue_id
  //     );
  //     artwork.payslip_status_out  = checked
  //     setDataCheck(yourDataCheck);

  //   console.log(yourDataCheck);
  //   console.log(revenue_id);
  //   console.log(checked);
  //   }

  return (
    <>
      <Button
        onClick={() => {
          Fetchdata();
        }}
        color="var(--secondary)"
        leftSection={<IconPlaylistAdd />}
        size="xs"
      >
        เพิ่มรายรับ
      </Button>
      <Modal
        opened={openModal}
        onClose={() => {
          setopenModal(false);
        }}
        closeOnClickOutside={false}
        title="เพิ่มรายรับ"
      >
        <LoadingOverlay visible={BtnLoad} loaderProps={{ type: "dots" }} />
        <Center>
          <Text>{cname} {month} / {year} </Text>
        </Center>

        <form
          onSubmit={formEditExpenditure.onSubmit((value) => {
            UpdateExpenditure(value);
          })}
        >
          <Divider my="xs" />
          {DataCheck.map((value, index) => (
            <>
              <Grid>
                <Grid.Col span={2}></Grid.Col>
                <Grid.Col span={4}>
                  <Text size="xs">{value.revenue_name}</Text>
                  <Text size="xs" c={"gray.5"} >{value.namebudget}</Text>
                </Grid.Col>
                <Grid.Col span={4}>
                  <TextInput
            
                    type="number"
                    rightSection={<IconCoin />}
                    rightSectionPointerEvents="none"
                    suffix=" ฿"
                    key={value.revenue_id}
                    value={value.payslip_total}
                    error={formEditExpenditure.errors.check}
                    onChange={(e) => handleClick(value.revenue_id, e.target.value)}
                  />
                </Grid.Col>
              </Grid>
              <Divider m="xs" variant="dashed" />
            </>
          ))}

          <Flex justify={"flex-end"} py={10} gap={10} px={0}>
            <Button
              loading={BtnLoad}
              onClick={() => {
                UpdateExpenditure();
              }}
              leftSection={<IconDeviceFloppy />}
              color="var(--success)"
            >
              บันทึก
            </Button>
            <Button
              onClick={() => {
                setopenModal(false);
              }}
              color="var(--danger)"
              variant="transparent"
            >
              ยกเลิก
            </Button>
          </Flex>
        </form>
      </Modal>
    </>
  );
}

export default ModalAddrevenue;
