import { Button, Flex, Paper, Select } from "@mantine/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { API } from "../../Config/ConfigApi";
import { isNotEmpty, useForm } from "@mantine/form";

function UploadTaxKrk() {
  const FetchTypeEmploy = () => {
    setTimeout(() => {
      axios.get(API + "/index/showcustomertype").then((res) => {
        //    console.log(res.data);

        const data = res.data;

        if (data.length !== 0) {
          const select = data.map((i) => ({
            value: i.customer_type_id,
            label: i.customer_type_name,
          }));
          setDataTypeEmploy(select);
        }
      });
    }, 400);
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
          <Button mt={33}>ค้นหา</Button>
        </Flex>
      </Paper>
    </div>
  );
}

export default UploadTaxKrk;
