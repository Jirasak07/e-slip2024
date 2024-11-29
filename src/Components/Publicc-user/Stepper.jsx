import { Stepper, Paper, LoadingOverlay, Text } from "@mantine/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { API } from "../Config/ConfigApi";
import Swal from "sweetalert2";

function Steppers({ val }) {
  const [active, setActive] = useState(val);
  const [Load, setLoad] = useState(false);
  const fname = localStorage.getItem("fname");
  const [CurrDate, setCurrDate] = useState();
  // console.log(active);
  const Fetch2 = async () => {
    try {
      setLoad(true);
      const getCurrentDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, "0");

        // return `${year}/02`;
        return `${year}/${month}`;
      };
      const date = getCurrentDate();
      console.log(date);
      const fetch = await axios.get(API + "/index/showprocess/" + date);
      const data = fetch.data;
      console.log(data);
      if (data.length !== 0) {
        const hr = parseInt(data[0].process_hr);
        const plan = parseInt(data[0].process_plan);
        const fn = parseInt(data[0].process_finance);
        const fsh = parseInt(data[0].process_finish);
        setActive(hr + fn + plan + fsh);
      }
      setLoad(false);
      setCurrDate("เดือน " + data[0].process_month + " / " + parseInt(data[0].process_year));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    Fetch2();
  }, []);
  const UpdateHR = () => {
    const today = new Date();
    const year = new Date().getFullYear();
    const months = String(today.getMonth() + 1).padStart(2, "0");
    // axios.post()

    // สร้างวัตถุ Date ใหม่
    const todaynxt = new Date();

    // สร้างสำเนาของวันนี้เพื่อหลีกเลี่ยงการเปลี่ยนแปลงวัตถุเดิม
    const nextMonth = new Date(todaynxt);

    // เพิ่มเดือนถัดไป
    nextMonth.setMonth(todaynxt.getMonth() + 1);

    Swal.fire({
      icon: "info",
      title: "ยืนยันอัพเดทสถานะ",
      cancelButtonText: "ยกเลิก",
      showCancelButton: true,
      confirmButtonText: "ยืนยัน",
    }).then((res) => {
      console.log(active);
      if (res.isConfirmed === true) {
        console.log(active);
        if (active === 3) {
          if (
            fname === "วรรณภา" ||
            fname === "นฤมล" ||
            fname === "ปราจิน" ||
            fname === "วราภรณ์" ||
            fname === "จิรศักดิ์" ||
            fname === "ปรางค์ทิพย์"
          ) {
            ////success
            const fmdata = new FormData();
            const yearnxt = nextMonth.getFullYear();
            const monthnxt = nextMonth.getMonth() + 1;
            const monthssss = String(monthnxt).padStart(2, "0");
            fmdata.append("process_year", year);
            fmdata.append("process_month", months);
            fmdata.append("process_status", "1");
            fmdata.append("year_new", yearnxt);
            fmdata.append("month_new", monthssss);
            axios.post(API + "/index/updateprocessSuccess", fmdata).then((res) => {
              if (res.data === "200") {
                Swal.fire({
                  icon: "success",
                  title: "success",
                  timer: 600,
                  showConfirmButton: false,
                }).then((re) => {
                  Fetch2();
                });
              }
            });
          }
        } else {
          if (fname === "งานบริหารทรัพยากรบุคคลและนิติการ") {
            const fmdata = new FormData();
            fmdata.append("process_year", year);
            fmdata.append("process_month", months);
            fmdata.append("process_hr", "1");
            axios.post(API + "/index/updateprocesshr", fmdata).then((res) => {
              if (res.data === "200") {
                Swal.fire({
                  icon: "success",
                  title: "success",
                  timer: 600,
                  showConfirmButton: false,
                }).then((re) => {
                  Fetch2();
                });
              }
            });
          } else if (
            active === 2 &&
            (fname === "วรรณภา" ||
              fname === "นฤมล" ||
              fname === "ปราจิน" ||
              fname === "วราภรณ์" ||
              fname === "จิรศักดิ์" ||
              fname === "ปรางค์ทิพย์")
          ) {
            const fmdata = new FormData();
            fmdata.append("process_year", year);
            fmdata.append("process_month", months);
            fmdata.append("process_status", "1");
            axios.post(API + "/index/updateprocessfinance", fmdata).then((res) => {
              if (res.data === "200") {
                Swal.fire({
                  icon: "success",
                  title: "success",
                  timer: 600,
                  showConfirmButton: false,
                }).then((re) => {
                  Fetch2();
                });
              }
            });
          } else if (active === 1 && fname === "กองนโยบายและแผน") {
            const fmdata = new FormData();
            fmdata.append("process_year", year);
            fmdata.append("process_month", months);
            fmdata.append("process_status", "1");
            axios.post(API + "/index/updateprocessplan", fmdata).then((res) => {
              if (res.data === "200") {
                Swal.fire({
                  icon: "success",
                  title: "success",
                  timer: 600,
                  showConfirmButton: false,
                }).then((re) => {
                  Fetch2();
                });
              }
            });
          }
        }
      }
    });
  };
  return (
    <Paper w={"100%"} shadow="none" p={10} mb={10}>
      <LoadingOverlay visible={Load} />
      <label>สถานะการจัดทำ {CurrDate}</label>
      {/* <Paper p={20} withBorder mb={5} >
        <Text>อย่าลืมอัพเดทสถานะ</Text>
      </Paper> */}
      <Stepper
        color="var(--success)"
        iconSize={32}
        size="xs"
        active={active}
        onStepClick={() => {
          UpdateHR();
        }}
      >
        <Stepper.Step label="บค." description="นำเข้าข้อมูลบุคลากรและเงินเดือน"></Stepper.Step>
        <Stepper.Step label="กองแผน" description="กองนโยบายและแผน"></Stepper.Step>
        <Stepper.Step label="การเงิน" description="จัดทำเงินเดือน"></Stepper.Step>
        <Stepper.Step label="เสร็จสิ้น" description="เปิดให้พิมพ์เงินเดือน"></Stepper.Step>
      </Stepper>
    </Paper>
  );
}

export default Steppers;
