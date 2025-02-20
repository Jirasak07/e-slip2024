import { Button, Flex, Paper, Select, Table } from "@mantine/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { API } from "../../Config/ConfigApi";
import { isNotEmpty, useForm } from "@mantine/form";

function UploadTaxKrk() {
  const FetchTypeEmploy = () => {
    axios.get(API + "/index/showcustomertype").then((res) => {
      //    console.log(res.data);

      const data = res.data;

      if (data.length !== 0) {
        const select = data.map((i) => ({
          value: i.customer_type_id,
          label: i.customer_type_name,
        }));
        const sel = select.filter((val) => val.value === "2" || val.value === "6");
        setDataTypeEmploy(sel);
      }
    });
  };
  const FetchEmploy = async () => {
    try {
      const fetch = await axios.post(API + "/index/getlistemploy", {
        type_emp: "6",
      });
      const data = await fetch.data;
      console.log(data)
    } catch (error) {
      console.log(error);
    }
  };

  const [DataTypeEmploy, setDataTypeEmploy] = useState([]);
  useEffect(() => {
    FetchTypeEmploy();
  }, []);
  const formSearch = useForm({
    initialValues: {
      type_employ: "",
    },

    validate: {
      type_employ: isNotEmpty("กรุณาเลือกประเภทบุคลากร"),
    },
  });
  return (
    <div>
      <Paper p={10}>
        <Flex gap={10}>
          <Select
            searchable
            data={DataTypeEmploy}
            {...formSearch.getInputProps("type_employ")}
            label="ประเภทบุคลากร"
          />
          <Button onClick={FetchEmploy} mt={33}>ค้นหา</Button>
        </Flex>
      </Paper>
      <Paper p={10} mt={10}>
        <Table>
          <Table.Thead>
            <Table.Th>ลำดับ</Table.Th>
            <Table.Th>เลขบัตร</Table.Th>
            <Table.Th>ชื่อ - นามสกุล</Table.Th>
            <Table.Th>ประเภทพนักงาน</Table.Th>
            <Table.Th>จัดการ</Table.Th>
          </Table.Thead>
          <Table.Tbody>
            <Table.Tr>
              <Table.Td>sdjfhksjdhf</Table.Td>
              <Table.Td>sdjfhksjdhf</Table.Td>
              <Table.Td>sdjfhksjdhf</Table.Td>
              <Table.Td>sdjfhksjdhf</Table.Td>
              <Table.Td>
                <Button>Upload</Button>
              </Table.Td>
            </Table.Tr>
          </Table.Tbody>
        </Table>
      </Paper>
    </div>
  );
}

export default UploadTaxKrk;
