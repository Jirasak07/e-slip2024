import { Button, Flex, LoadingOverlay, Modal, Select, SimpleGrid, TextInput } from "@mantine/core";
import { IconDeviceFloppy, IconEdit } from "@tabler/icons-react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { API } from "../../Config/ConfigApi";
import { isNotEmpty, useForm } from "@mantine/form";
import Swal from "sweetalert2";
import { Checkbox } from '@mantine/core';
import { Grid } from '@mantine/core';
import { Text } from '@mantine/core';

function ModalAddrevenue({ year, month, citizent, type }) {
  const [openModal, setopenModal] = useState(false);
  const [OverLay, setOverLay] = useState(false);
  const [DataTypeEmploy, setDataTypeEmploy] = useState([]);
  const [DataCheck, setDataCheck] = useState([]);

  const formEditExpenditure = useForm({
    initialValues: {
        year: year,
        month: month,
        citizent: citizent,
        type: type,
        payslip_total:0,
        check:[],
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
      axios.get(API + "/index/showrevenueallid/"+year+"/"+month+"/"+citizent+"/"+type).then((res) => {
         console.log(res.data);
        const data = res.data;
        setopenModal(true);
        // formEditExpenditure.setValues({
        //     check:data
        // })
        setDataCheck(data);

        // const itemsf = data.map((value, index) => (


        //     <Grid>
        //         <Grid.Col span={4}>
        //           <Text size="xs">{value.revenue_name}</Text>
        //         </Grid.Col>
        //         <Grid.Col span={4}>
        //         <Checkbox
        //             mt="xs"
        //             ml={33}
        //             //   label={'test'}
        //             key={index}
        //             checked={'0'}
        //             onChange={(event) => handlers.setItemProp(index, 'checked', event.currentTarget.checked)}
        //             />
        //        </Grid.Col>
        //        <Grid.Col span={4}>
        //              <TextInput  {...formEditExpenditure.getInputProps("check")}  value={value[index].payslip_total} />
        //         </Grid.Col>
        //        </Grid>
            
        //   ));
         // setDataTypeEmploy(itemsf);

        // if (data.length !== 0) {
        // //  setLoadTable(false);
      
        //  // setDataYear(select);
        // }
      });
    }, 400);
  };
  const UpdateExpenditure = (value) => {
    setOverLay(true)
    const data = new FormData();
    data.append("expenditure_id",value.expenditure_id)
    data.append("expenditure_name",value.expenditure_name)
    data.append("customer_type_id",value.customer_type_id)
    data.append("use_tax",0)
   axios.post(API+"/index/updateexpenditure",data).then((res)=>{
    if(res.data === "200"){
      setOverLay(false)
      Swal.fire({
        icon:'success',
        title:'อัพเดทข้อมูลรายจ่ายสำเร็จ',
        timer:1000,
        timerProgressBar:true,
        showConfirmButton:false
      }).then((res)=>{
        FetchExpenditure(value.customer_type_id)
        setopenModal(false)
      })
    }
   }) 
  }
  
  return (
    <>
   
      <Button
        onClick={() => {
          Fetchdata();
        }}
        color="var(--warning)"
        leftSection={<IconEdit />}
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
      >
         <LoadingOverlay visible={OverLay} loaderProps={{type:'dots'}}  />
        <form onSubmit={formEditExpenditure.onSubmit((value)=>{
          UpdateExpenditure(value)
        })} >
               {
              DataCheck.map((value, index) => (

                    <Grid>
                        <Grid.Col span={4}>
                        <Text size="xs">{value.revenue_name}</Text>
                        </Grid.Col>
                        <Grid.Col span={4}>
                        <Checkbox
                            mt="xs"
                            ml={33}
                            //   label={'test'}
                            key={index}
                            checked={'0'}
                            onChange={(event) => handlers.setItemProp(index, 'checked', event.currentTarget.checked)}
                            />
                    </Grid.Col>
                    <Grid.Col span={4}>
                            <TextInput  key={value.revenue_id}  value={value.payslip_total} />
                        </Grid.Col>
                    </Grid>

                    ))
               } 
            {/* {DataTypeEmploy} */}
          {/* <SimpleGrid>
            <TextInput label="ชื่อรายการรายรับ" {...formEditExpenditure.getInputProps("expenditure_name")} />
            <Select
              allowDeselect={false}
              label="ประเภทพนักงาน"
              data={selectType}
              {...formEditExpenditure.getInputProps("customer_type_id")}
            />
          </SimpleGrid>
          <Flex justify={"flex-end"} py={10} gap={10} px={0}>
            <Button type="submit" leftSection={<IconDeviceFloppy />} color="var(--success)">
              บันทึก
            </Button>
            <Button onClick={()=>{
              setopenModal(false)
            }} color="var(--danger)" variant="transparent">
              ยกเลิก
            </Button>
          </Flex> */}
        </form>
      </Modal>
    </>
  );
}

export default ModalAddrevenue;
