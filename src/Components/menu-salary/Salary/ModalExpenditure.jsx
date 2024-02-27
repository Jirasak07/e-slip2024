import { Button, Flex, LoadingOverlay, Modal, Select, SimpleGrid, TextInput } from "@mantine/core";
import { IconDeviceFloppy, IconEdit, IconPlaylistAdd } from "@tabler/icons-react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { API } from "../../Config/ConfigApi";
import { isNotEmpty, useForm } from "@mantine/form";
import Swal from "sweetalert2";
import { Checkbox } from "@mantine/core";
import { Grid } from "@mantine/core";
import { Text } from "@mantine/core";
import { Divider, Table } from "@mantine/core";

function ModalExpenditure({ year, month, citizent, type }) {
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
      check: [],
    },
    validate: {
      expenditure_name: isNotEmpty("กรุณากรอกข้อมูล"),
    },
  });

  //   const FetchData = () => {
  //     axios
  //       .post(API + "/index/ExpenditureDetail", {
  //         expenditure_id: expenditure_id,
  //       })
  //       .then((res) => {
  //         const data = res.data;
  //         console.log(data);
  //         if (data.length !== 0) {
  //           formEditExpenditure.setValues({
  //             expenditure_name: data[0].expenditure_name,
  //             customer_type_id: data[0].customer_type_id,
  //           });
  //           setopenModal(true);
  //           // console.log(data[0].customer_type_id)
  //         } else {
  //           console.log("null");
  //         }
  //       });
  //   };

  const Fetchdata = () => {
    // setLoadTable(true);
    setTimeout(() => {
      axios.get(API + "/index/showexpenditureallid/" + year + "/" + month + "/" + citizent + "/" + type).then((res) => {
        console.log(res.data);
        const data = res.data;
        setopenModal(true);
        // formEditExpenditure.setValues({
        //     check:data
        // })
        setDataCheck(data);
      });
    }, 400);
  };
  const UpdateExpenditure = () => {
    
    //   setOverLay(true)
    //   const data = new FormData();
    //   data.append("expenditure_id",value.expenditure_id)
    //   data.append("expenditure_name",value.expenditure_name)
    //   data.append("customer_type_id",value.customer_type_id)
    //   data.append("use_tax",0)
    //  axios.post(API+"/index/updateexpenditure",data).then((res)=>{
    //   if(res.data === "200"){
    //     setOverLay(false)
    //     Swal.fire({
    //       icon:'success',
    //       title:'อัพเดทข้อมูลรายจ่ายสำเร็จ',
    //       timer:1000,
    //       timerProgressBar:true,
    //       showConfirmButton:false
    //     }).then((res)=>{
    //       FetchExpenditure(value.customer_type_id)
    //       setopenModal(false)
    //     })
    //   }
    //  })
    console.log("jkjkj");
  };

  const handleClick = (expenditure_id, payslip_total) => {
    const yourDataCheck = [...DataCheck];
    const artwork = yourDataCheck.find((a) => a.expenditure_id === expenditure_id);
    artwork.payslip_total = payslip_total;
    setDataCheck(yourDataCheck);

    console.log(yourDataCheck);
    //console.log(b);
  };

  const handleClickcheckbook = (expenditure_id, checked) => {
    console.log(checked);

    {
      checked === true ? <>{(checked = 1)}</> : <>{(checked = 0)}</>;
    }

    const yourDataCheck = [...DataCheck];
    const artwork = yourDataCheck.find((a) => a.expenditure_id === expenditure_id);
    artwork.payslip_status_out = checked;
    setDataCheck(yourDataCheck);

    console.log(yourDataCheck);
    console.log(expenditure_id);
    console.log(checked);
  };

  return (
    <>
      <Button
        onClick={() => {
          Fetchdata();
        }}
        color="var(--purpel)"
        leftSection={<IconPlaylistAdd />}
        size="xs"
      >
        เพิ่มรายจ่าย
      </Button>
      <Modal
        opened={openModal}
        onClose={() => {
          setopenModal(false);
        }}
        closeOnClickOutside={false}
        title="เพิ่มรายจ่าย"
        size={"xl"}
      >
        <LoadingOverlay visible={OverLay} loaderProps={{ type: "dots" }} />
        <form
          onSubmit={formEditExpenditure.onSubmit((value) => {
            UpdateExpenditure(value);
          })}
        >
          <Divider my="xs" />

          {DataCheck.map((value, index) => (
            <>
              <Grid>
                <Grid.Col span={4}>
                  <Text  size="sm">{value.expenditure_name}</Text>
                </Grid.Col>
                <Grid.Col span={4}>
                  <Checkbox
                    mt="xs"
                    ml={33}
                    //   label={'test'}
                    key={value.expenditure_id}
                    // checked={value.payslip_status_out === 1 ?<>{true}</>:<>{false}</>}

                    checked={Number(value.payslip_status_out)}
                    onChange={(event) => handleClickcheckbook(value.expenditure_id, event.currentTarget.checked)}
                  />
                </Grid.Col>
                <Grid.Col span={4}>
                  <TextInput
                    key={value.expenditure_id}
                    value={value.payslip_total}
                    onChange={(e) => handleClick(value.expenditure_id, e.target.value)}
                  />        
                </Grid.Col>
      
              </Grid>  <Divider my="xs" variant="dashed" />
              {/* <Divider my="xs" /> */}
            </>
          ))}
          {/* {DataTypeEmploy} */}
          {/* <SimpleGrid>
            <TextInput label="ชื่อรายการรายรับ" {...formEditExpenditure.getInputProps("expenditure_name")} />
            <Select
              allowDeselect={false}
              label="ประเภทพนักงาน"
              data={selectType}
              {...formEditExpenditure.getInputProps("customer_type_id")}
            />
          </SimpleGrid> */}
          <Flex justify={"flex-end"} py={10} gap={10} px={0}>
            <Button onClick={UpdateExpenditure} leftSection={<IconDeviceFloppy />} color="var(--success)">
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

export default ModalExpenditure;
