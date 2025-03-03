import { Button, Select, SimpleGrid } from "@mantine/core";
import React, { useEffect } from "react";
import { API } from "../../Config/ConfigApi";
import axios from "axios";
import { useForm } from "@mantine/form";

function DownloadTax() {
  const form = useForm({
    initialValues: {
      DATATYPE_EM: [],
      DATAYEAR_TAX: [],
      TYPE: "",
      YEAR: "",
    },
  });
  const FetchTypeEmploy = () => {
    axios.get(API + "/index/showcustomertype").then((res) => {
      //    console.log(res.data);

      const data = res.data;

      if (data.length !== 0) {
        const select = data.map((i) => ({
          value: i.customer_type_id,
          label: i.customer_type_name,
        }));
        form.setValues({ DATATYPE_EM: select });
      }
    });
  };
  useEffect(() => {
    FetchTypeEmploy();
  }, []);
  return (
    <div>
      <SimpleGrid cols={{ base: 1, sm: 3 }}>
        <Select label="ปี" />
        <Select label="ประเภท" data={form.values.DATATYPE_EM} />
        {/* <Select /> */}
        <Button mt={{ base: 0, sm: 33 }} color="blue.8">
          ค้นหา
        </Button>
      </SimpleGrid>
    </div>
  );
}

export default DownloadTax;
