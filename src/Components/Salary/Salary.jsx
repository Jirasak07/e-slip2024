import { Badge, Button, Container, Paper, Select } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";

function Salary() {
  return (
    <>
      <Container p={0} bg={"white"} fluid>
        <Badge color="var(--primary)" variant="light" size="md" radius={8}>
          จัดการข้อมูลเงินเดือน
        </Badge>
    <Paper>
      <Select/>
      <Select/>
      <Select/>
      <Button leftSection={<IconSearch/>} >
        ค้นหา
      </Button>
    </Paper>
      </Container>
    </>
  );
}

export default Salary;
