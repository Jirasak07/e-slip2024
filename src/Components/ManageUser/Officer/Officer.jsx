import { Badge, Box, Button, Container, Flex, LoadingOverlay, Paper, Select, SimpleGrid, Text } from "@mantine/core";
import { IconRefresh, IconSearch, IconUserCancel } from "@tabler/icons-react";
import axios from "axios";
import { MDBDataTableV5 } from "mdbreact";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { API } from "../../Config/ConfigApi";
import { isNotEmpty, useForm } from "@mantine/form";
import SkeletonTable from "../../Publicc-user/SkeletonTable";
import ModalEditOfficer from "./ModalEditOfficer";
import ModalManageSalaryOfficer from "./ModalManageSalaryOfficer";
import ModalDeleteOfficer from "./ModalDeleteOfficer";
import ModalManageBankOfficer from "./ManageBank/ModalManageBankOfficer";
import ManageOfficer from "./ManageOfficer/ManageOfficer";
function Officer() {
  const [OverLayLoad, setOverLayLoad] = useState(false);
  const [DataSelectTypeCustomer, setDataSelectTypeCustomer] = useState([]);
  const [DataSelectCustomerlist, setDataSelectCustomerlist] = useState([]);
  const [LoadTable, setLoadTable] = useState(false);
  const columns = [
    {
      label: "ลำดับ",
      field: "no",
    },
    {
      label: "เลขบัตรประชาชน",
      field: "citizen",
      minimal: "lg",
    },
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
      label: "จัดการ",
      field: "manage",
      minimal: "sm",
    },
  ];
  const [TableUser, setTableUser] = useState({
    columns: columns,
    rows: [],
  });
  const FetchTypeCustomer = (params) => {
    axios.get(API + "/index/showcustomertype").then((res) => {
      const data = res.data;
      if (data.length !== 0) {
        const menu = data.map((i) => ({
          value: i.customer_type_id,
          label: i.customer_type_name,
        }));
        setDataSelectTypeCustomer(menu);
      }
    });
  };

  const FetchCustomerlist = () => {
    axios.get(API + "/index/selectEmp").then((res) => {
      const data = res.data;
      if (data.length !== 0) {
        // const menu = data.map((i) => ({
        //   value: i.customer_type_id,
        //   label: i.customer_type_name,
        // }));
        setDataSelectCustomerlist(data);
      }
    });
  };

  const FetchData = (v) => {
    setLoadTable(true);
    axios.get(API + "/index/showcustomer/" + v).then((res) => {
      setTimeout(() => {
        setLoadTable(false);
      }, 440);

      const data = res.data;

      if (data.length !== 0) {
        setTableUser({
          columns: columns,
          rows: [
            ...data.map((i, key) => ({
              no: key + 1,
              citizen: i.customers_citizent,
              name: i.customers_pname + i.customers_name + " " + i.customers_lname,
              bank:
                i.bank_name === null ? (
                  <Text fz={14} fw={300}>
                    ไม่ได้ระบุ
                  </Text>
                ) : (
                  i.bank_name
                ),
              manage: (
                <Flex direction={"row"} gap={5}>
                  {i.customer_type_id}
                  <ModalEditOfficer customerid={i.customers_citizent} fn={Fetchcc} />
                  <ModalManageBankOfficer
                    citizenid={i.customers_citizent}
                    name={i.customers_pname + i.customers_name + " " + i.customers_lname}
                  />{" "}
                  <ModalManageSalaryOfficer customer_type_id={i.customers_type} citizenid={i.customers_citizent} />
                </Flex>
              ),
            })),
          ],
        });
      } else {
        setTableUser({
          columns: columns,
          rows: [],
        });
      }
    });
  };
  const formSearch = useForm({
    initialValues: {
      customer_type_id: "",
    },
    validate: {
      customer_type_id: isNotEmpty("กรุณาเลือกประเภทบุคลากร"),
    },
  });

  useEffect(() => {
    FetchTypeCustomer();
    FetchCustomerlist();
  }, []);


  const UpdateUserAdd = (params) => {
    Swal.fire({
      icon: "info",
      title: "ยืนยันอัพเดทบุคลากรใหม่",
      confirmButtonText: "ยืนยัน",
      confirmButtonColor: "var(--success)",
      showCancelButton: true,
      cancelButtonText: "ยกเลิก",
      cancelButtonColor: "var(--danger)",
    }).then((res) => {
      if (res.isConfirmed === true) {
        setOverLayLoad(true);
        setTimeout(() => {
          setOverLayLoad(false);
        }, 1200);
      }
    });
  };


  const UpdateStatusUserOut = (params) => {

    Swal.fire({
      icon: "warning",
      title: "ยืนยันอัพเดทสถานะบุคลากรลาออก",
      confirmButtonText: "ยืนยัน",
      confirmButtonColor: "var(--success)",
      showCancelButton: true,
      cancelButtonText: "ยกเลิก",
      cancelButtonColor: "var(--danger)",
    }).then((res) => {
      if (res.isConfirmed === true) {
        setOverLayLoad(true);
        setTimeout(() => {

          const form = DataSelectCustomerlist
          // console.log(value.values)
           console.log(DataSelectCustomerlist)
           axios.post(API + "/index/Updatestatusemp", {
               check: form,
           }).then((res) => {
            setOverLayLoad(false);
               Swal.fire({
                   title: 'อัพเดทข้อมูลสำเร็จ',
                   icon: 'success',
                   confirmButtonText: 'ตกลง',
               }).then((result) => {
                  
                   
               })
               console.log(res.data)
           })

          
        }, 1200);
      }
    });
  };
  const Fetchcc = () => {
    FetchData(formSearch.values.customer_type_id);
  };

  return (
    <>
      <LoadingOverlay
        visible={OverLayLoad}
        loaderProps={{ type: "dots", color: "var(--primary)" }}
        overlayProps={{ radius: "sm", blur: 1 }}
      />

      <Container p={0} bg={"white"} fluid>
        <Badge color="var(--primary)" variant="light" size="md" radius={8}>
          ข้อมูลบุคลากร
        </Badge>
        <Paper mt={15}>
          <form
            onSubmit={formSearch.onSubmit((v) => {
              FetchData(v.customer_type_id);
            })}
          >
            <Flex direction={{ base: "column", md: "row" }} gap={10}>
              <Select searchable
                miw={300}
                withAsterisk
                label="ประเภทบุคลากร"
                {...formSearch.getInputProps("customer_type_id")}
                data={DataSelectTypeCustomer}
              />
              <Flex mt={{ base: 0, md: 33 }}>
                <SimpleGrid w="100%" cols={{ base: 1, sm: 3 }}>
                  <Button
                    w={{ base: null, sm: "100%" }}
                    color="var(--primary)"
                    type="submit"
                    leftSection={<IconSearch />}
                  >
                    ค้นหา
                  </Button>
                  <Button
                    onClick={() => UpdateUserAdd()}
                    leftSection={<IconRefresh />}
                    variant="light"
                    color="var(--success)"
                  >
                    อัพเดทบุคลากรเพิ่มใหม่
                  </Button>
                  <Button
                    onClick={() => UpdateStatusUserOut()}
                    leftSection={<IconUserCancel />}
                    variant="light"
                    color="var(--danger)"
                  >
                    อัพเดทสถานะบุคลากรลาออก
                  </Button>
                  <SimpleGrid>
                    <ManageOfficer />
                  </SimpleGrid>
                </SimpleGrid>
              </Flex>
            </Flex>
          </form>
        </Paper>
        <Paper p={10} my={10}>
          <Flex justify={"flex-end"} direction={{ base: "column", md: "row" }} gap={10}></Flex>
        </Paper>
        <Paper mt={10}>
          <Badge variant="light">รายการบุคลากร</Badge>
        </Paper>
        <Paper shadow="md" p={10} mt={10}>
          {LoadTable ? (
            <SkeletonTable />
          ) : (
            <MDBDataTableV5
              responsive
              striped
              searchLabel="ค้นหาจากเลขบัตร หรือ ชื่อ"
              searchTop
              searchBottom={false}
              data={TableUser}
              noRecordsFoundLabel="ไม่พบรายการ"
            />
          )}
        </Paper>
      </Container>
    </>
  );
}

export default Officer;
