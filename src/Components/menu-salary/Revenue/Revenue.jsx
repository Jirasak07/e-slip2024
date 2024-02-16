import {
  ActionIcon,
  Badge,
  Button,
  Container,
  Flex,
  LoadingOverlay,
  Modal,
  Paper,
  Select,
  SimpleGrid,
  TextInput,
  Tooltip,
} from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { IconAdFilled, IconDeviceFloppy, IconEdit, IconPlus, IconSearch } from "@tabler/icons-react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { API } from "../../Config/ConfigApi";
import { MDBDataTableV5 } from "mdbreact";
import SkeletonTable from "../../Publicc-user/SkeletonTable";
import Swal from "sweetalert2";
import ModalEditRevenue from "./ModalEditRevenue";
function Revenue() {
  const column = [
    {
      label: "ลำดับ",
      field: "no",
      minimal: "lg",
    },
    {
      label: "ชื่อรายการ",
      field: "label",
      minimal: "lg",
    },
    {
      label: "จัดการ",
      field: "manage",
      minimal: "lg",
    },
  ];
  const [DataRevenue, setDataRevenue] = useState({
    columns: column,
    rows: [],
  });
  const [LoadTable, setLoadTable] = useState(false);
  const [DataTypeEmploy, setDataTypeEmploy] = useState([]);
  const [OverLayLoad, setOverLayLoad] = useState(false);
  const [OpenForm, setOpenForm] = useState(false);

  //   const [TypeCustomer, setTypeCustomer] = useState("");
  const formSearchRevenueCustomers = useForm({
    initialValues: {
      customer_type_id: "",
    },
    validate: {
      customer_type_id: (v) => (v === "" || v === null ? "กรุณาเลือกประเภทพนักงาน" : null),
    },
  });

  const FetchTypeEmploy = () => {
    setLoadTable(true);
    setTimeout(() => {
      axios.get(API + "/index/showcustomertype").then((res) => {
        console.log(res.data);
        const data = res.data;
        if (data.length !== 0) {
          setLoadTable(false);
          const select = data.map((i) => ({
            value: i.customer_type_id,
            label: i.customer_type_name,
          }));
          setDataTypeEmploy(select);
        }
      });
    }, 400);
  };

  const FetchRevenue = (data) => {
    setLoadTable(true);
    setTimeout(() => {
      formAddRevenue.setValues({
        customer_type_id: data,
      });
      axios.get(API + "/index/showrevenue/" + data).then((res) => {
        console.log(res.data);
        const data = res.data;
        if (data.lenth !== 0) {
          setDataRevenue({
            columns: column,
            rows: [
              ...data.map((i, key) => ({
                no: key + 1,
                label: i.revenue_name,
                manage: (
                  <ModalEditRevenue selectType={DataTypeEmploy} FetchRevenue={FetchRevenue} revenue_id={i.revenue_id} />
                ),
              })),
            ],
          });
        }
        setLoadTable(false);
      });
    }, 440);
  };
  useEffect(() => {
    FetchTypeEmploy();
  }, []);
  const formAddRevenue = useForm({
    initialValues: {
      revenue_name: "",
      customer_type_id: "",
      use_tax:0
    },
    validate: {
      revenue_name: isNotEmpty("กรุณากรอกข้อมูล"),
      customer_type_id: isNotEmpty("กรุณาเลือกประเภทพนักงาน"),
    },
  });

  const AddRevenue = (data) => {
    formSearchRevenueCustomers.setValues({
      customer_type_id: data.customer_type_id,
    });
    setOverLayLoad(true);
    setTimeout(() => {
      const revenuedata = new FormData();
      revenuedata.append("revenue_name",data.revenue_name)
      revenuedata.append("customer_type_id",data.customer_type_id)
      revenuedata.append("use_tax","0")
      axios
        .post(API + "/index/Insertrevenue",revenuedata)
        .then((res) => {
          setOverLayLoad(false);
          if(res.data === "200"){
             Swal.fire({
            icon: "success",
            title: "เพิ่มรายรับใหม่สำเร็จ",
            timer: 1000,
            timerProgressBar: true,
            showConfirmButton: false,
          }).then((res) => {
            setOpenForm(false);
            FetchRevenue(data.customer_type_id);
            formAddRevenue.reset();
          });
          }else{
            Swal.fire({
              icon:'info',
              title:'เพิ่มไม่สำเร็จ',
              timer:1000,
              timerProgressBar:true,
              showConfirmButton:false
            }).then((res)=>{
              setOpenForm(false)
            })
          }
         
        });
     
    }, 540);
  };

  return (
    <>
      <LoadingOverlay
        visible={OverLayLoad}
        loaderProps={{ type: "dots", color: "var(--primary)" }}
        overlayProps={{ blur: 2 }}
      />
      <Container p={0} bg={"white"} fluid>
        <Badge color="var(--primary)" variant="light" size="md" radius={8}>
          จัดการข้อมูลรายรับ
        </Badge>
        <Paper mt={20}>
          <form
            onSubmit={formSearchRevenueCustomers.onSubmit((v) => {
              FetchRevenue(v.customer_type_id);
            })}
          >
            <SimpleGrid cols={{ base: 1, sm: 2 }}>
              <Select
                searchable
                data={DataTypeEmploy}
                {...formSearchRevenueCustomers.getInputProps("customer_type_id")}
                label="ประเภทพนักงาน"
              />
              <Flex pt={{ base: 0, sm: 33 }} gap={10} direction={{ base: "column", sm: "row" }}>
                <Button
                  type="submit"
                  w={{ base: "100%", sm: "200" }}
                  color="var(--primary)"
                  leftSection={<IconSearch />}
                >
                  ค้นหา
                </Button>
                <Button
                  onClick={() => {
                    setOpenForm(true);
                  }}
                  leftSection={<IconPlus />}
                  color="teal"
                  w={{ base: "100%", sm: "200" }}
                >
                  เพิ่มรายรับใหม่
                </Button>
              </Flex>
            </SimpleGrid>
          </form>
        </Paper>
        <Paper pt={10}>
          {LoadTable ? (
            <SkeletonTable />
          ) : (
            <MDBDataTableV5
              data={DataRevenue}
              responsive
              striped
              searchLabel="ค้นหาจากชื่อรายการ"
              searchTop
              searchBottom={false}
              noRecordsFoundLabel="ไม่พบรายการ"
              entriesLabel="จำนวนที่แสดง"
            />
          )}
        </Paper>
      </Container>
      <Modal
        closeOnClickOutside={false}
        opened={OpenForm}
        onClose={() => {
          formAddRevenue.reset();
          setOpenForm(false);
        }}
        title="เพิ่มรายรับใหม่"
      >
        <form
          onSubmit={formAddRevenue.onSubmit((val) => {
            AddRevenue(val);
          })}
        >
          <SimpleGrid>
            <TextInput label="ชื่อรายรับใหม่" withAsterisk {...formAddRevenue.getInputProps("revenue_name")} />
            <Select
              withAsterisk
              data={DataTypeEmploy}
              label="ประเภทพนักงาน"
              {...formAddRevenue.getInputProps("customer_type_id")}
            />
          </SimpleGrid>
          <Flex justify={"flex-end"} gap={10} pt={10}>
            <Button type="submit" color="teal" variant="filled" leftSection={<IconDeviceFloppy />}>
              บันทึกข้อมูล
            </Button>
            <Button
              onClick={() => {
                formAddRevenue.reset();
                setOpenForm(false);
              }}
              color="red"
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

export default Revenue;
