import { Button, Drawer, Flex, LoadingOverlay, NumberInput, Paper, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import React, { useState } from "react";
import Swal from "sweetalert2";
import { API } from "../../Config/ConfigApi";
import axios from "axios";

function EditIncrease({ data, Fetch, name }) {
  const [opened, { open, close }] = useDisclosure();
  const formEdit = useForm({
    initialValues: {
      history_salary_year: "",
      history_salary_month: "",
      customers_citizent: "",
      customers_line: "",
      history_salary_salary: "",
      history_salary_salary1715: "",
      history_salary_salary01: "",
      promotionmoney: "",
      numberofmonths: "",
      backpay: "",
      backpay1715: "",
      backpay01: "",
      compensation: "",
      idbudget: "",
    },
  });
  const GetData = (params) => {
    formEdit.setValues({
      history_salary_year: data.history_salary_year,
      history_salary_month: data.history_salary_month,
      customers_citizent: data.customers_citizent,
      customers_line: data.customers_line,
      history_salary_salary: data.history_salary_salary,
      history_salary_salary1715: data.history_salary_salary1715,
      history_salary_salary01: data.history_salary_salary01,
      promotionmoney: data.promotionmoney,
      numberofmonths: data.numberofmonths,
      backpay: data.backpay,
      backpay1715: data.backpay1715,
      backpay01: data.backpay01,
      compensation: data.compensation,
      customers_type: data.customers_type,
      idbudget: data.idbudget,
    });
    open();
  };
  const [LoadSubmit, setLoadSubmit] = useState(false);
  const SalaryChane = (salary) => {
    console.log(salary);
    formEdit.setValues({ history_salary_salary: salary });
    function round(number, num_digits) {
      const decimalPlaces = 2;
      const result = number.toFixed(decimalPlaces);

      const factor = Math.pow(10, num_digits);
      const result1 = Math.round(result * factor) / factor;
      return result1.toFixed(decimalPlaces);
    }
    if (formEdit.values.customers_type === "4") {
      if (formEdit.values.customers_line === "1") {
        const money = round((salary * 1.7) / 1.6, -1);
        console.log(money);
        formEdit.setValues({ history_salary_salary1715: money });
        const money2 = money - salary;
        formEdit.setValues({ history_salary_salary01: money2 });
      } else if (formEdit.values.customers_line === "2") {
        const money = round((salary * 1.5) / 1.4, -1);
        formEdit.setValues({ history_salary_salary1715: money });
        const money2 = money - salary;
        formEdit.setValues({ history_salary_salary01: money2 });
        console.log(money);
      }
    } else {
      formEdit.setValues({ history_salary_salary1715: 0 });
      formEdit.setValues({ history_salary_salary01: 0 });
    }
  };
  const ChangeBackPay = (value, name) => {
    formEdit.setValues({ [name]: value });
    let backpay = 0;
    if (name === "promotionmoney") {
      backpay = value * formEdit.values.numberofmonths;
    } else if (name === "numberofmonths") {
      backpay = value * formEdit.values.promotionmoney;
    }
    console.log(backpay);
    formEdit.setValues({
      backpay: backpay,
    });

    function round(number, num_digits) {
      const decimalPlaces = 2;
      const result = number.toFixed(decimalPlaces);

      const factor = Math.pow(10, num_digits);
      const result1 = Math.round(result * factor) / factor;
      return result1.toFixed(decimalPlaces);
    }
    if (formEdit.values.customers_type === "4") {
      if (formEdit.values.customers_line === "1") {
        const money = round((backpay * 1.7) / 1.6, -1);
        console.log(money);
        formEdit.setValues({ backpay1715: money });
        const money2 = money - backpay;
        formEdit.setValues({ backpay01: money2 });
      } else if (formEdit.values.customers_line === "2") {
        const money = round((backpay * 1.5) / 1.4, -1);
        formEdit.setValues({ backpay1715: money });
        const money2 = money - backpay;
        formEdit.setValues({ backpay01: money2 });
        console.log(money);
      }
    } else {
      formEdit.setValues({ backpay1715: 0 });
      formEdit.setValues({ backpay01: 0 });
    }
  };
  const Submit = (value) => {
    if (value.length !== 0) {
      Swal.fire({
        title: "กรุณากรอกรหัสความปลอดภัย",
        input: "password",
        inputAttributes: {
          autocapitalize: "off",
        },
        showCancelButton: true,
        confirmButtonText: "ยืนยัน",
        showLoaderOnConfirm: true,
      }).then((result) => {
        console.log(result);
        if (result.isConfirmed && result.value === "lovekpru") {
          Swal.fire({
            title: "ระบบปลดล็อคถูกต้อง",
            icon: "success",
            showConfirmButton: false,
            timer: 600,
            timerProgressBar: true,
          }).then((result) => {
            setLoadSubmit(true);

            console.log("ok");
            //logทั้งหมด
            const form = [value];
            axios
              .post(API + "/index/Addhistorysalaryincrease", {
                month: value.history_salary_month,
                year: value.history_salary_year,
                idbudget: value.idbudget,
                user_update: localStorage.getItem("employee_id"),
                check: form,
              })
              .then((res) => {
                //เงินเดือนปกติและ 1.7/1.5
                // const data = [
                //   {
                //     history_salary_salary: value.history_salary_salary,
                //     history_salary_salary01: value.history_salary_salary01,
                //     history_salary_salary1715: value.history_salary_salary1715,
                //   },
                // ];
                const compensation = form.filter((salary) => salary.compensation > 0 || salary.compensation !== "");

                //filter ตกเบิกปกติ id = '15'
                const backpay = form.filter((salary) => salary.backpay > 0 || salary.backpay !== "");

                //filter ตกเบิกปกติ0.1 id = '99'
                const backpay01 = form.filter((salary) => salary.backpay01 > 0 || salary.backpay01 !== "");

                //filter ตกเบิกปกติ 1.7/1.5 id = '100'
                const backpay1715 = form.filter((salary) => salary.backpay1715 > 0 || salary.backpay1715 !== "");
                axios
                  .post(API + "/index/Addhistorysalarymonth", {
                    month: value.history_salary_month,
                    year: value.history_salary_year,
                    idbudget: value.idbudget,
                    check: form,
                  })
                  .then((res) => {
                    //ค่าตอบแทนพิเศษ
                    const form = compensation;
                    axios
                      .post(API + "/index/Addrevenueforid", {
                        month: value.history_salary_month,
                        year: value.history_salary_year,
                        idbudget: value.idbudget,
                        idpayslip_revenue: "20",
                        check: form,
                      })
                      .then((res) => {
                        //ค่าตกเบิกปกติ
                        const form = backpay;
                        axios
                          .post(API + "/index/Addrevenueforid", {
                            month: value.history_salary_month,
                            year: value.history_salary_year,
                            idbudget: value.idbudget,
                            idpayslip_revenue: "15",
                            check: form,
                          })
                          .then((res) => {
                            //ค่าตกเบิก1715
                            const form = backpay1715;
                            axios
                              .post(API + "/index/Addrevenueforid", {
                                month: value.history_salary_month,
                                year: value.history_salary_year,
                                idbudget: value.idbudget,
                                idpayslip_revenue: "99",
                                check: form,
                              })
                              .then((res) => {
                                //ค่าตกเบิก01
                                const form = backpay01;
                                axios
                                  .post(API + "/index/Addrevenueforid", {
                                    month: value.history_salary_month,
                                    year: value.history_salary_year,
                                    idbudget: value.idbudget,
                                    idpayslip_revenue: "100",
                                    check: form,
                                  })
                                  .then((res) => {
                                    setLoadSubmit(false);
                                    Swal.fire({
                                      title: "อัพเดทข้อมูลสำเร็จ",
                                      icon: "success",
                                      confirmButtonText: "ตกลง",
                                    }).then((result) => {
                                      Fetch();
                                      close();
                                      // setTablelist({
                                      //   columns: column,
                                      //   rows: [],
                                      // });
                                      //   setSalarylist([]);
                                      //   window.location.reload();
                                    });
                                  });
                              });
                          });
                      });
                  });
              });

            //ปิดaleart
          });
        } else {
          Swal.fire({
            title: "รหัสความปลอดภัยไม่ถูกต้อง",
            icon: "error",
            confirmButtonText: "ตกลง",
          }).then((result) => {});
        }
      });
    } else {
      Swal.fire({
        title: "กรุณาอัพโหลดไฟล์เงินเดือน",
        icon: "warning",
        confirmButtonText: "ตกลง",
      }).then((result) => {});
    }
  };

  return (
    <>
      <LoadingOverlay pos="fixed" w={"100vw"} h={"100vh"} visible={LoadSubmit} />
      <Button onClick={GetData} size="xs" color="orange">
        แก้ไข
      </Button>
      <Drawer size={"lg"} opened={opened} position={"right"} onClose={close} title="แก้ไขข้อมูลนำเข้าเงินเดือน">
        <form
          onSubmit={formEdit.onSubmit((value) => {
            Submit(value);
          })}
        >
          <Paper>
            {name} {data.history_salary_month + "/" + data.history_salary_year}
            <NumberInput label="เงินเดือนบัจจุบัน" onChange={SalaryChane} value={formEdit.values.history_salary_salary} />
            <TextInput label="เงินเดือนบัจจุบัน 1.7/1.5" {...formEdit.getInputProps("history_salary_salary1715")} disabled />
            <TextInput label="เงินเดือนบัจจุบัน 0.1" {...formEdit.getInputProps("history_salary_salary01")} disabled />
            <TextInput label="เงินตอบแทนพิเศษ" {...formEdit.getInputProps("compensation")} />
            <NumberInput
              label="เงินเลื่อนขั้น"
              onChange={(event) => {
                ChangeBackPay(event, "promotionmoney");
              }}
              value={formEdit.values.promotionmoney}
            />
            <NumberInput
              label="จำนวนเดือนตกเบิก"
              onChange={(event) => {
                ChangeBackPay(event, "numberofmonths");
              }}
              value={formEdit.values.numberofmonths}
            />
            <NumberInput label="เงินตกเบิก" {...formEdit.getInputProps("backpay")} disabled />
            <NumberInput label="เงินตกเบิก 1.7/1.5" {...formEdit.getInputProps("backpay1715")} disabled />
            <NumberInput label="เงินตกเบิก 0.1" {...formEdit.getInputProps("backpay01")} disabled />
            <Flex pt={10} justify="flex-end">
              <Button type="submit" color="green">
                บันทึกข้อมูล
              </Button>
            </Flex>
          </Paper>
        </form>
      </Drawer>
    </>
  );
}

export default EditIncrease;
