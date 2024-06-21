import { Stepper, Button, Group, Paper } from "@mantine/core";
import React, { useState } from "react";

function Steppers() {
  const [active, setActive] = useState(3);
  return (
    <Paper w={"100%"} maw={800}  shadow="none" p={10} mb={10}>
      <label>สถานะการจัดทำ</label>
      <Stepper iconSize={32} size="xs" active={active} onStepClick={setActive}>
        <Stepper.Step label="กจ" description="นำเข้าข้อมูลบุคลากรและเงินเดือน"></Stepper.Step>
        <Stepper.Step label="การเงิน" description="จัดทำเงินเดือน"></Stepper.Step>
        <Stepper.Step label="เสร็จสิ้น" description="เปิดให้พิมพ์เงินเดือน"></Stepper.Step>
        {/* <Stepper.Completed>Completed, click back button to get to previous step</Stepper.Completed> */}
      </Stepper>
    </Paper>
  );
}

export default Steppers;
