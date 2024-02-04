import { Badge, Container, Paper, Text } from "@mantine/core";
import { MDBDataTableV5 } from "mdbreact";
import React from "react";

function Officer() {
  return (
    <>
      <Badge color="var(--primary)" variant="light" size="lg" radius={8}>
        ข้อมูลบุคลากร
      </Badge>
      <Container bg={"white"} fluid>
        <Paper mt={10}>
          <Text>รายการบุคลากร </Text>{" "}
        </Paper>
        <Paper>
            <MDBDataTableV5/>
        </Paper>
      </Container>
    </>
  );
}

export default Officer;
