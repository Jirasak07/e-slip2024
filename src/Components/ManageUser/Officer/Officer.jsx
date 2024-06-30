import { ActionIcon, Badge, Box, Button, Container, Flex, LoadingOverlay, Menu, Paper, Select, SimpleGrid, Text, Tooltip, rem } from "@mantine/core";
import { IconMenu, IconRefresh, IconSearch, IconSettings, IconUserCancel } from "@tabler/icons-react";
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
import { useViewportSize } from "@mantine/hooks";
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
                  {/* {i.customer_type_id} */}
                  <ModalEditOfficer customerid={i.customers_citizent} fn={Fetchcc} />
                  <ModalManageBankOfficer citizenid={i.customers_citizent} name={i.customers_pname + i.customers_name + " " + i.customers_lname} /> <ModalManageSalaryOfficer customer_type_id={i.customers_type} citizenid={i.customers_citizent} />
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
          const form = DataSelectCustomerlist;
          // console.log(value.values)
          console.log(DataSelectCustomerlist);
          axios
            .post(API + "/index/Updatestatusemp", {
              check: form,
            })
            .then((res) => {
              setOverLayLoad(false);
              Swal.fire({
                title: "อัพเดทข้อมูลสำเร็จ",
                icon: "success",
                confirmButtonText: "ตกลง",
              }).then((result) => {});
              console.log(res.data);
            });
        }, 1200);
      }
    });
  };

  
  const Fetchcc = () => {
    FetchData(formSearch.values.customer_type_id);
  };
  // const { height, width } = useViewportSize();
  return (
    <>
      <LoadingOverlay visible={OverLayLoad} loaderProps={{ type: "dots", color: "var(--primary)" }} overlayProps={{ radius: "sm", blur: 1 }} />
      <Container fluid px={0} bg={"white"}>
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
              <Flex gap={5} w="100%">
                <Select maw={400} w={{ base: null, sm: "100%" }} searchable withAsterisk label="ประเภทบุคลากร" {...formSearch.getInputProps("customer_type_id")} data={DataSelectTypeCustomer} />
                <Button maw={200} w={{ base: null, sm: "100%" }} mt={{ base: 0, sm: 33, md: 33 }} color="var(--primary)" type="submit" leftSection={<IconSearch />}>
                  ค้นหา
                </Button>
                <ManageOfficer />
                <Tooltip label="อัพเดทบุคลากรเพิ่มใหม่">
                  <ActionIcon size={"lg"} mt={{ base: 0, sm: 33, md: 33 }} onClick={() => UpdateUserAdd()} color="var(--success)">
                    <IconRefresh />
                  </ActionIcon>
                </Tooltip>
                <Tooltip label="อัพเดทสถานะบุคลากรลาออก">
                  <ActionIcon size={"lg"} mt={{ base: 0, sm: 33, md: 33 }} onClick={() => UpdateStatusUserOut()} color="var(--danger)">
                    <IconUserCancel />
                  </ActionIcon>
                </Tooltip>
              </Flex>{" "}
            </Flex>
          </form>
        </Paper>
        <Paper p={10} my={10}>
          <Flex justify={"flex-end"} direction={{ base: "column", md: "row" }} gap={10}></Flex>
        </Paper>
        <Paper mt={10}>
          <Badge variant="light">รายการบุคลากร</Badge>
        </Paper>
        {/* <Paper m={0} shadow="md" p={0} mt={10}> */}
        {LoadTable ? <SkeletonTable /> : <MDBDataTableV5 responsiveMd striped searchLabel="ค้นหาจากเลขบัตร หรือ ชื่อ" searchTop searchBottom={false} data={TableUser} noRecordsFoundLabel="ไม่พบรายการ" />}
        {/* </Paper> */}
      </Container>
    </>
  );
}

export default Officer;
