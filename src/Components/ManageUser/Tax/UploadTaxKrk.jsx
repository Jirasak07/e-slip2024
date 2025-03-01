import { ActionIcon, Button, Flex, Paper, Select, Table, Text } from "@mantine/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { API } from "../../Config/ConfigApi";
import { isNotEmpty, useForm } from "@mantine/form";
import UploadButton from "./Component/UploadButton";
import { MDBDataTableV5 } from "mdbreact";
import { IconEye, IconView360 } from "@tabler/icons-react";

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

  const [DataTypeEmploy, setDataTypeEmploy] = useState([]);
  useEffect(() => {
    FetchTypeEmploy();
  }, []);
  const formSearch = useForm({
    initialValues: {
      type_employ: "",
      DATAEMPLOY: [],
    },

    validate: {
      type_employ: isNotEmpty("กรุณาเลือกประเภทบุคลากร"),
    },
  });
  // https://admission.kpru.ac.th/admission2017/public/Files_All/6476447068test.pdf
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
      minimal: "xl",
    },
    {
      label: "ประเภทพนักงาน",
      field: "type",
      minimal: "lg",
    },
    {
      label: "ตรวจสอบ",
      field: "chk",
      minimal: "sm",
    },
    {
      label: "จัดการ",
      field: "manage",
      minimal: "sm",
    },
  ];
  const FetchEmploy = async () => {
    try {
      const fetch = await axios.post(API + "/index/getlistemploy", {
        type_employ: formSearch.values.type_employ,
      });
      const data = await fetch.data;
      if (data.length !== 0) {
        const datatble = {
          columns: columns,
          rows: [
            ...data.map((item, key) => ({
              no: key + 1,
              citizen: item.customers_citizent,
              name: item.customers_pname + item.customers_name + " " + item.customers_lname,
              type: item.customer_type_name,
              chk: (
                <>
                  <ActionIcon
                    onClick={() => {
                      window.open(
                        API +
                          "/public/uploads/tax/" +
                          item.customers_citizent +
                          "/" +
                          item.customers_citizent +
                          "-2567.pdf"
                      );
                    }}
                    color="yellow"
                  >
                    <IconEye />
                  </ActionIcon>
                </>
              ),
              manage: (
                <>
                  <UploadButton
                    FN={FN}
                    customers_citizent={item.customers_citizent}
                    name={item.customers_pname + item.customers_name + " " + item.customers_lname}
                    type={item.customer_type_name}
                  />
                </>
              ),
            })),
          ],
        };
        formSearch.setValues({ DATAEMPLOY: datatble });
      }
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  const FN = (params) => {
    FetchEmploy();
  };

  return (
    <div>
      <Paper p={10}>
        <Flex gap={10}>
          <Select
            miw={250}
            searchable
            data={DataTypeEmploy}
            {...formSearch.getInputProps("type_employ")}
            label="ประเภทบุคลากร"
          />
          <Button onClick={FetchEmploy} mt={33}>
            ค้นหา
          </Button>
        </Flex>
      </Paper>

      <Paper p={10} mt={10}>
        <MDBDataTableV5
          responsiveMd
          theadColor="dark"
          searching
          searchBottom={false}
          searchTop={true}
          searchLabel="ค้นหา"
          data={formSearch.values.DATAEMPLOY}
        />
      </Paper>
    </div>
  );
}

export default UploadTaxKrk;
