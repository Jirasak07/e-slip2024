import { Button, Paper, Select, SimpleGrid, Text } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { API } from "../../Config/ConfigApi";
import axios from "axios";
import { useForm } from "@mantine/form";
import { MDBDataTableV5 } from "mdbreact";
import { IconDownload } from "@tabler/icons-react";

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
  const FetchYearTax = () => {
    axios.get(API + "/index/SelectYearTaxs").then((res) => {
      if (res.data.length !== 0) {
        const data = res.data;
        const select = data.map((i) => ({
          value: i.TAVI_YEAR,
          label: (parseInt(i.TAVI_YEAR) + 543).toString(),
        }));
        form.setValues({
          DATAYEAR_TAX: select,
          YEAR: select[0].value,
        });
      } else {
        console.log(res.data);
      }
    });
  };
  useEffect(() => {
    FetchTypeEmploy();
    FetchYearTax();
  }, []);

  const FetchData = (v) => {
    axios.get(API + "/index/showcustomers/" + v.TYPE + "/" + v.YEAR).then((res) => {
      const data = res.data;
      console.log(data);
      if (data.length !== 0) {
        setTableUser({
          columns: columns,
          rows: [
            ...data.map((i, key) => ({
              no: key + 1,
              citizen: i.customers_citizent,
              name: i.customers_pname + i.customers_name + " " + i.customers_lname,
              manage: (
                <SimpleGrid cols={1}>
                  {i.have === "1" ? (
                    <Button
                      maw={500}
                      leftSection={<IconDownload />}
                      onClick={() => {
                        window.open(
                          "https://mua.kpru.ac.th/FrontEnd_Salary/chirasax/tavi50.php?citizen=" +
                            i.customers_citizent +
                            "&year=" +
                            form.values.YEAR
                        );
                      }}
                      color="green.8"
                    >
                      ดาวน์โหลดหนังสือรับรองการหักภาษี
                      {i.customers_type === "6" ? "(ค่าตอบแทนยานพาหนะ)" : ""}
                    </Button>
                  ) : (
                    ""
                  )}
                  {i.customers_type === "6" && (
                    <Button
                      maw={500}
                      color="violet.8"
                      onClick={() => {
                        window.open(
                          API +
                            "/public/uploads/tax/" +
                            i.customers_citizent +
                            "/" +
                            i.customers_citizent +
                            "-2567.pdf"
                        );
                      }}
                    >
                      ดาวน์โหลดหนังสือรับรองการหักภาษี (ข้าราชการ)
                    </Button>
                  )}
                </SimpleGrid>
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
      label: "จัดการ",
      field: "manage",
      minimal: "sm",
    },
  ];
  const [TableUser, setTableUser] = useState({
    columns: columns,
    rows: [],
  });
  return (
    <div>
      <form
        onSubmit={form.onSubmit((value) => {
          FetchData(value);
        })}
      >
        <SimpleGrid cols={{ base: 1, sm: 3 }}>
          <Select label="ปี" data={form.values.DATAYEAR_TAX} {...form.getInputProps("YEAR")} />
          <Select label="ประเภท" {...form.getInputProps("TYPE")} data={form.values.DATATYPE_EM} />
          {/* <Select /> */}
          <Button type="submit" mt={{ base: 0, sm: 33 }} color="blue.8">
            ค้นหา
          </Button>
        </SimpleGrid>
      </form>
      <Paper my={15}>
        <MDBDataTableV5 barReverse={false} searchTop={true} searchBottom={false} data={TableUser} />
      </Paper>
    </div>
  );
}

export default DownloadTax;
