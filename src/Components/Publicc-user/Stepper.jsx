import { Stepper, Button, Group, Paper, LoadingOverlay } from "@mantine/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { API } from "../Config/ConfigApi";

function Steppers({ val }) {
  const [active, setActive] = useState(val);
  const [Load, setLoad] = useState(false);
  console.log(active);
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
        const fn = parseInt(data[0].process_finance);
        const fsh = parseInt(data[0].process_finish);
        setActive(hr + fn + fsh);
      }
      setLoad(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    Fetch2();
  }, []);
  return (
    <Paper w={"100%"} maw={800} shadow="none" p={10} mb={10}>
      <LoadingOverlay visible={Load} />
      <label>สถานะการจัดทำ</label>
      <Stepper color="var(--success)" iconSize={32} size="xs" active={active}>
        <Stepper.Step label="กจ" description="นำเข้าข้อมูลบุคลากรและเงินเดือน"></Stepper.Step>
        <Stepper.Step label="การเงิน" description="จัดทำเงินเดือน"></Stepper.Step>
        <Stepper.Step label="เสร็จสิ้น" description="เปิดให้พิมพ์เงินเดือน"></Stepper.Step>
        {/* <Stepper.Completed>Completed, click back button to get to previous step</Stepper.Completed> */}
      </Stepper>
    </Paper>
  );
}

export default Steppers;
