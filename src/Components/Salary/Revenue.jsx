import { Badge, Button, Container, Flex, Paper, Select, SimpleGrid } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconAdFilled, IconPlus, IconSearch } from "@tabler/icons-react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { API } from "../Config/ConfigApi";
import { MDBDataTableV5 } from "mdbreact";
import SkeletonTable from "../Publicc/SkeletonTable";
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
  const formSearchRevenueCustomers = useForm({
    initialValues: {
      customer_type_id: "",
    },
    validate: {
      customer_type_id: (v) => (v === "" || v === null ? "กรุณาเลือกประเภทพนักงาน" : null),
    },
  });
  const [DataTypeEmploy, setDataTypeEmploy] = useState([]);
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
      axios.get(API + "/index/showrevenue/" + data.customer_type_id).then((res) => {
        console.log(res.data);
        const data = res.data;
        if (data.lenth !== 0) {
          setDataRevenue({
            columns: column,
            rows: [
              ...data.map((i, key) => ({
                no: key + 1,
                label: i.revenue_name,
                manage: <></>,
              })),
            ],
          });
        }
        setLoadTable(false);
      });
    }, 440);
  };
  const [LoadTable, setLoadTable] = useState(false);
  useEffect(() => {
    FetchTypeEmploy();
  }, []);
  const formAddRevenue = useForm({
    initialValues:{
        
    }
  })
  return (
    <>
      <Container p={0} bg={"white"} fluid>
        <Badge color="var(--primary)" variant="light" size="md" radius={8}>
          จัดการข้อมูลรายรับ
        </Badge>
        <Paper mt={20}>
          <form
            onSubmit={formSearchRevenueCustomers.onSubmit((v) => {
              FetchRevenue(v);
            })}
          >
            <SimpleGrid cols={{ base: 1, sm: 2 }}>
              <Select
                data={DataTypeEmploy}
                {...formSearchRevenueCustomers.getInputProps("customer_type_id")}
                label="ประเภทพนักงาน"
              />
              <Flex pt={{ base: 0, sm: 33 }}>
                <Button
                  type="submit"
                  w={{ base: "100%", sm: "200" }}
                  color="var(--primary)"
                  leftSection={<IconSearch />}
                >
                  ค้นหา
                </Button>
              </Flex>
            </SimpleGrid>
          </form>
        </Paper>
        <Paper pt={20}>
          <Flex justify={"flex-end"} pr={{ base: 0, sm: 20 }}>
            <Button leftSection={<IconPlus />} color="teal">
              เพิ่มรายการรายจ่าย
            </Button>
          </Flex>
        </Paper>
        <Paper pt={10}>
          {LoadTable ? (
            <SkeletonTable />
          ) : (
            <MDBDataTableV5
              data={DataRevenue}
              responsive
              striped
              searchLabel="ค้นหาจากเลขบัตร หรือ ชื่อ"
              searchTop
              searchBottom={false}
              noRecordsFoundLabel="ไม่พบรายการ"
            />
          )}
        </Paper>
      </Container>
    </>
  );
}

export default Revenue;
