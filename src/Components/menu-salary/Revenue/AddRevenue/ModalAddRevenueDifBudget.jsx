import { Button, Flex, Modal, Select, SimpleGrid, TextInput } from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import axios from "axios";
import { API } from "../../../Config/ConfigApi";
import { useEffect } from "react";
function ModalAddRevenueDifBudget({ DATAEMP, DATAYEAR, DATEMONTH, year, month, customer_type }) {
  const [opened, { open, close }] = useDisclosure(false);
  const form = useForm({
    initialValues: {
      month:
        (new Date().getMonth() + 1).toString().length === 1
          ? "0" + (new Date().getMonth() + 1).toString()
          : (new Date().getMonth() + 1).toString(),
      year: new Date().getFullYear().toString(),
      DATEMONTH: DATEMONTH,
      customers_citizent: "",
      idbudget: "",
      databudget: "",
      customers_type: customer_type,
      revenue_id: "",
      datarevenue: [],
      dateTYpe: [],
      DATAYEAR: [],
      payslip_total: "",
      DATA_TYPE_BUDGET: [],
    },
    validate: {
      revenue_id: isNotEmpty("กรุณากรอกข้อมูล"),
      customers_citizent: isNotEmpty("กรุณากรอกข้อมูล"),
      customers_type: isNotEmpty("กรุณากรอกข้อมูล"),
      year: isNotEmpty("กรุณากรอกข้อมูล"),
      month: isNotEmpty("กรุณากรอกข้อมูล"),
      payslip_total: isNotEmpty("กรุณากรอกข้อมูล"),
      idbudget: isNotEmpty("กรุณากรอกข้อมูล"),
    },
  });
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
          form.setValues({ dateTYpe: select });
        }
      });
    }, 400);
  };
  useEffect(() => {
    FetchBudget();
    FetchTypeEmploy();
    FetchYear();
  }, []);
  const FetchBudget = () => {
    axios.get(API + "/index/showBudget").then((res) => {
      const data = res.data;
      if (data.length !== 0) {
        //   setLoadTable(false);
        const select = data.map((i) => ({
          value: i.idbudget,
          label: i.namebudget + " ( " + i.idbudget + " ) ",
        }));

        form.setValues({ DATA_TYPE_BUDGET: select });
      }
    });
  };
  const Selectrevenue = (id) => {
    axios.get(API + "/index/showrevenue/" + id).then((res) => {
      const data = res.data;
      if (data.length !== 0) {
        const select = data.map((i) => ({
          value: i.revenue_id,
          label: i.revenue_name,
        }));
        form.setValues({ datarevenue: select });
        form.setValues({ year: year });
      }
    });
  };
  const FetchYear = () => {
    // setLoadTable(true);
    setTimeout(() => {
      axios.get(API + "/index/showyear").then((res) => {
        // console.log(res.data);
        const data = res.data;
        if (data.length !== 0) {
          const select = data.map((i) => ({
            value: i.name_year,
            label: i.name_year_th,
          }));
          form.setValues({ DATAYEAR: select });
        }
      });
    }, 400);
  };
  const SendNewRevenue = (val) => {
    console.log(val);
  };

  return (
    <div>
      <Button onClick={open}>เพิ่มรายรับใหม่</Button>
      <Modal opened={opened} onClose={close}>
        <form
          onSubmit={form.onSubmit((val) => {
            SendNewRevenue(val);
          })}
        >
          <SimpleGrid>
            <TextInput {...form.getInputProps("customers_citizent")} label={"เลขบัตรประชาชน"} />
            <Select
              searchable
              allowDeselect={false}
              data={form.values.dateTYpe}
              value={form.values.customers_type}
              error={form.errors.customers_type}
              //   {...formSearch.getInputProps("type_employ")}
              onChange={(val) => {
                form.setValues({
                  customers_type: val,
                  revenue_id: null,
                });
                Selectrevenue(val);
              }}
              label="ประเภทบุคลากร"
            />{" "}
            <Select
              searchable
              data={form.values.datarevenue}
              {...form.getInputProps("revenue_id")}
              label={"ประเภทรายรับ"}
            />
            <SimpleGrid cols={2}>
              <Select data={form.values.DATAYEAR} label={"ปี"} {...form.getInputProps("year")} />

              <Select
                data={form.values.DATEMONTH}
                label={"เดือน"}
                {...form.getInputProps("month")}
              />
            </SimpleGrid>
            <TextInput label={"จำนวนเงิน"} {...form.getInputProps("payslip_total")} />
            <Select
              data={form.values.DATA_TYPE_BUDGET}
              label={"ประเภทงบประมาณ"}
              {...form.getInputProps("idbudget")}
            />
            <Flex justify={"flex-end"}>
              <Button type="submit" color="green">
                บันทึก
              </Button>
            </Flex>
          </SimpleGrid>
        </form>
      </Modal>
    </div>
  );
}

export default ModalAddRevenueDifBudget;
