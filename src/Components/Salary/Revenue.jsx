import { Badge, Button, Container, Flex, Paper, Select, SimpleGrid } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconSearch } from "@tabler/icons-react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { API } from "../Config/ConfigApi";
import { MDBDataTableV5 } from "mdbreact";
function Revenue() {
    const [DataRevenue, setDataRevenue] = useState([]);
    const column= [{
        label:'',
        field
    }]
  const formSearchRevenueCustomers = useForm({
    initialValues: {
      customer_type_id: "",
    },
    validate: {
      customer_type_id: (v) => (v === "" || v === null ?   "กรุณาเลือกประเภทพนักงาน":null),
    },
  });
  const [DataTypeEmploy, setDataTypeEmploy] = useState([]);
  const FetchTypeEmploy = () => {
    axios.get(API + "/index/showcustomertype").then((res) => {
      console.log(res.data);
      const data = res.data;
      if (data.length !== 0) {
        const select = data.map((i) => ({
          value: i.customer_type_id,
          label: i.customer_type_name,
        }));
        setDataTypeEmploy(select);
      }
    });
  };
  const FetchRevenue = (data) => {
    axios.get(API+'/index/showrevenue/'+data.customer_type_id).then((res)=>{
        console.log(res)
    })
  }
  
  useEffect(() => {
    FetchTypeEmploy();
  }, []);
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
                <Button type="submit" w={{ base: "100%", sm: "200" }} color="var(--primary)" leftSection={<IconSearch />}>
                  ค้นหา
                </Button>
              </Flex>
            </SimpleGrid>
          </form>
        </Paper>
        <Paper>
            <MDBDataTableV5 responsive data={[]} infoLabel={['','','','']} />
        </Paper>
      </Container>
    </>
  );
}

export default Revenue;
