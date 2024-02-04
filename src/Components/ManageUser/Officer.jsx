import { Badge, Container, Paper, Select, SimpleGrid, Text } from "@mantine/core";
import { MDBDataTableV5 } from "mdbreact";
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
          <SimpleGrid>
            <Select />
          </SimpleGrid>
        </Paper>
        <Paper>
          <MDBDataTableV5 />
        </Paper>
      </Container>
    </>
  );
}

export default Officer;
