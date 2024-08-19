import { Button, Flex, Modal, Select, SimpleGrid, TextInput } from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import axios from "axios";
import { API } from "../../../Config/ConfigApi";
import { useEffect } from "react";
import Swal from "sweetalert2";
function ModalAddExpenditureDifBudget({
  DATAEMP,
  DATAYEAR,
  DATEMONTH,
  years,
  month,
  customer_type,
  expenditure,
  disable,
  FN,
}) {
  const [opened, { open, close }] = useDisclosure(false);
  const form = useForm({
    initialValues: {
      month: "",
      year: "",
      // month:
      //   (new Date().getMonth() + 1).toString().length === 1
      //     ? "0" + (new Date().getMonth() + 1).toString()
      //     : (new Date().getMonth() + 1).toString(),
      // year: new Date().getFullYear().toString(),
      DATEMONTH: DATEMONTH,
      customers_citizent: "",
      idbudget: "",
      databudget: "",
      customers_type: customer_type,
      expenditure_id: "",
      datarevenue: [],
      dateTYpe: [],
      DATAYEAR: [],
      payslip_total: "",
      DATA_TYPE_BUDGET: [],
      DATACUSTOMER: [],
    },
    validate: {
      expenditure_id: isNotEmpty("กรุณากรอกข้อมูล"),
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
  const SelectExpenditure = (id) => {
    axios.get(API + "/index/showexpenditure/" + id).then((res) => {
      const data = res.data;
      if (data.length !== 0) {
        const select = data.map((i) => ({
          value: i.expenditure_id,
          label: i.expenditure_name,
        }));
        form.setValues({ datarevenue: select });
        form.setValues({ year: years });
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
  const FetchCustomers = (v) => {
    axios.get(API + "/index/showcustomer/" + v).then((res) => {
      const data = res.data;
      if (data.length !== 0) {
        const select = data.map((i) => ({
          value: i.customers_citizent,
          label:
            i.customers_pname +
            i.customers_name +
            " " +
            i.customers_lname +
            " : " +
            i.customers_citizent,
        }));
        form.setValues({ DATACUSTOMER: select });
      }
    });
  };

  const SendNewRevenue = (val) => {
    axios
      .post(API + "/index/addNewExpenditure", {
        idbudget: val.idbudget,
        year: val.year,
        month: val.month,
        customers_citizent: val.customers_citizent,
        customers_type: val.customers_type,
        payslip_total: val.payslip_total,
        expenditure_id: val.expenditure_id,
      })
      .then((res) => {
        if (res.data === "success") {
          Swal.fire({
            icon: "success",
            title: "เพิ่มสำเร็จ",
            timer: 600,
            timerProgressBar: true,
            showConfirmButton: false,
          }).then((success) => {
            form.reset();
            close();
            FN();
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "เพิ่มไม่สำเร็จ",
          }).then((error) => {
            console.log(error);
          });
        }
      });
  };

  return (
    <div>
      <Button
        disabled={disable}
        onClick={() => {
          form.setValues({
            year: years,
            month: month,
            expenditure_id: expenditure,
            customers_type: customer_type,
          });
          SelectExpenditure(customer_type);
          FetchCustomers(customer_type);
          open();
        }}
      >
        เพิ่มรายจ่ายใหม่
      </Button>
      <Modal
        opened={opened}
        onClose={() => {
          form.setValues({ customers_citizent: "" });
          close();
        }}
      >
        <form
          onSubmit={form.onSubmit((val) => {
            SendNewRevenue(val);
          })}
        >
          <SimpleGrid>
            <Select
              searchable
              allowDeselect={false}
              data={form.values.dateTYpe}
              // value={form.values.customers_type}
              {...form.getInputProps("customers_type")}
              error={form.errors.customers_type}
              readOnly
              label="ประเภทบุคลากร"
            />{" "}
            <Select
              readOnly
              searchable
              data={form.values.datarevenue}
              {...form.getInputProps("expenditure_id")}
              label={"ประเภทรายจ่าย"}
            />
            <Select
              searchable
              data={form.values.DATACUSTOMER}
              {...form.getInputProps("customers_citizent")}
              label={"ผู้ได้รับ"}
            />
            <SimpleGrid cols={2}>
              <Select
                data={form.values.DATEMONTH}
                label={"เดือน"}
                readOnly
                {...form.getInputProps("month")}
              />
              <Select
                readOnly
                data={form.values.DATAYEAR}
                label={"ปี"}
                {...form.getInputProps("year")}
              />
            </SimpleGrid>
            <Select
              data={form.values.DATA_TYPE_BUDGET}
              label={"งบประมาณ"}
              {...form.getInputProps("idbudget")}
            />
            <TextInput label={"จำนวนเงิน"} {...form.getInputProps("payslip_total")} />
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

export default ModalAddExpenditureDifBudget;
