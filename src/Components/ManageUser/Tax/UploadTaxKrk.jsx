import { Button, Flex, Paper, Select, Table } from "@mantine/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { API } from "../../Config/ConfigApi";
import { isNotEmpty, useForm } from "@mantine/form";
import UploadButton from "./Component/UploadButton";
import Checkpdf from "./Component/CheckPdf";
import { MDBDataTableV5 } from "mdbreact";

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
  const pdf1 = "https://admission.kpru.ac.th/admission2017/public/Files_All/6476447068test.pdf";
  const pdf2 = "https://example.com/file2.pdf";
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
      label: "ตัวอย่าง",
      field: "chk",
      minimal: "lg",
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
        type_emp: "6",
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
              chk: <Checkpdf pdfUrl={pdf1} />,
              manage: (
                <>
                  <UploadButton
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
          {/* <Button onClick={(()=>{
            checkFileExists(pdf1)
          })} mt={33}> */}
          <Button onClick={FetchEmploy} mt={33}>
            ค้นหา
          </Button>
        </Flex>
      </Paper>
      <Paper p={10} mt={10}>
        <Table striped>
          {/* <Table.Thead bg={"gray.7"} c={"white"}>
            <Table.Th>ลำดับ</Table.Th>
            <Table.Th>เลขบัตร</Table.Th>
            <Table.Th>ชื่อ - นามสกุล</Table.Th>
            <Table.Th>ประเภทพนักงาน</Table.Th>
            <Table.Th>ตัวอย่าง</Table.Th>
            <Table.Th>จัดการ</Table.Th>
          </Table.Thead> */}
          <Table.Tbody>
            {/* {formSearch.values.DATAEMPLOY.length !== 0 &&
              formSearch.values.DATAEMPLOY.map((item, key) => (
                <Table.Tr key={key}>
                  <Table.Td>{key + 1}</Table.Td>
                  <Table.Td>{item.customers_citizent}</Table.Td>
                  <Table.Td>
                    {item.customers_pname + item.customers_name + " " + item.customers_lname}
                  </Table.Td>
                  <Table.Td>{item.customer_type_name}</Table.Td>
                  <Checkpdf pdfUrl={pdf1} />
                  <Table.Td>
                    <UploadButton
                      customers_citizent={item.customers_citizent}
                      name={item.customers_pname + item.customers_name + " " + item.customers_lname}
                      type={item.customer_type_name}
                    />
                  </Table.Td>
                </Table.Tr>
              ))} */}
          </Table.Tbody>
        </Table>
      </Paper>
      <Paper>
        <MDBDataTableV5
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
