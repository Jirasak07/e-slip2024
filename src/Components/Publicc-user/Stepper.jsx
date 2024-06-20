import { Stepper, Button, Group, Paper } from "@mantine/core";
import React, { useState } from "react";

function Steppers() {
  const [active, setActive] = useState(1);
  return (
    <Paper w={500} shadow="none" p={10} mb={10}>
      <label>สถานะการจัดทำ</label>
      <Stepper iconSize={32} size="xs" active={active} onStepClick={setActive}>
        <Stepper.Step label="First step" description="Create an account"></Stepper.Step>
        <Stepper.Step label="Second step" description="Verify email"></Stepper.Step>
        <Stepper.Step label="Final step" description="Get full access"></Stepper.Step>
        <Stepper.Completed>Completed, click back button to get to previous step</Stepper.Completed>
      </Stepper>
    </Paper>
  );
}

export default Steppers;
