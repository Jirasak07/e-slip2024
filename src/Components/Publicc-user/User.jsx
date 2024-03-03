import { Badge, Card, Container, Flex, Paper, Skeleton, Stack } from "@mantine/core";
import React, { useEffect, useState } from "react";
import SkeletonTable from "./SkeletonTable";
import { MDBDataTableV5 } from "mdbreact";
function User() {
  const [Load, setLoad] = useState(false);

const column = [
    {
        label:"ปี",
        field:"year",
        minimal:'sm'
    },
    {
        label:"เดือน",
        field:"month",
        minimal:'sm'
    },
    {
        label:"รายรับ",
        field:"revenue",
        minimal:'sm'
    },
    {
        label:"รายจ่าย",
        field:"expenditure",
        minimal:'sm'
    },
    {
        label:"ยอดสุทธิ",
        field:"total",
        minimal:'sm'
    },
    {
        label:"ใบเงินเดือน",
        field:"fileprint",
        minimal:'sm'
    },
]
const [TableSalary, setTableSalary] = useState({
    columns:column,
    rows:[]
});


  useEffect(() => {
    setLoad(true);
    setTimeout(() => {
      setLoad(false);
    }, 1200);
  }, []);
  return (
    <div>
      <Badge size="xl" variant="subtle" color="var(--primary)">
        รายการเงินเดือน
      </Badge>
      <Flex justify={"center"}>
        <Paper shadow="lg" w={"clamp(300px,80vw,600px)"} mih={150} p={10}>
          {!Load ? (
            <Flex h={"100%"} gap={10}>
              <Stack my={"auto"}>
                <Skeleton h={90} w={80} />
              </Stack>
              <Stack mt="25">
                <Skeleton h={10} w={250} />
                <Skeleton h={10} w={120} />
                <Skeleton h={10} w={130} />
              </Stack>
            </Flex>
          ) : (
            <></>
          )}
        </Paper>
      </Flex>
      <Container fluid mt={20}>
        {Load ? (
          <SkeletonTable />
        ) : (
          <Paper p={10} shadow="lg">
            <MDBDataTableV5 data={TableSalary} striped sortable={false} />
          </Paper>
        )}
      </Container>
    </div>
  );
}

export default User;
