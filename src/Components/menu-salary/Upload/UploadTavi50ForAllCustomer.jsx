import { Button, Container, Paper, Select, SimpleGrid } from "@mantine/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { API } from "../../Config/ConfigApi";
import { IconSearch } from "@tabler/icons-react";

function UploadTavi50ForAllCustomer() {
  const [DataTypeEmploy, setDataTypeEmploy] = useState([]);
  const [DataYear, setDataYear] = useState([]);
  const [LoadTable, setLoadTable] = useState(false);
  const FetchYear = (params) => {
    const year = new Date().getFullYear();
    console.log(year);
    const data = [];
    data.push({
      value: (year + 1).toString(),
      label: (year + 543 + 1).toString(),
    });
    data.push({
      value: year.toString(),
      label: (year + 543).toString(),
    });
    data.push({
      value: (year - 1).toString(),
      label: (year + 543 - 1).toString(),
    });
    setDataYear(data);
  };

  const FetchTypeEmploy = () => {
    setLoadTable(true);
    setTimeout(() => {
      axios.get(API + "/index/showcustomertype").then((res) => {
        //    console.log(res.data);
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
  useEffect(() => {
    FetchYear();
    FetchTypeEmploy();
  }, []);
  return (
    <div>
      <Container fluid p={0}>
        <Paper shadow="lg" p={10}>
          <SimpleGrid cols={{ base: 1, sm: 3 }}>
            <Select data={DataTypeEmploy} label="เลือกประเภทบุคลากร" />
            <Select data={DataYear} label="เลือกปี" />
            <Button mt={33} leftSection={<IconSearch />} color="var(--primary)">
          ดูข้อมูล
        </Button>
          </SimpleGrid>
        </Paper>
       
      </Container>
    </div>
  );
}

export default UploadTavi50ForAllCustomer;
