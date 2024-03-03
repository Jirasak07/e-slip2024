import {
  Badge,
  Card,
  Container,
  Divider,
  Flex,
  Grid,
  Image,
  Paper,
  SimpleGrid,
  Skeleton,
  Stack,
  Text,
} from "@mantine/core";
import React, { useEffect, useState } from "react";
import SkeletonTable from "./SkeletonTable";
import { MDBDataTableV5 } from "mdbreact";
function User() {
  const [Load, setLoad] = useState(false);

  const column = [
    {
      label: "ปี",
      field: "year",
      minimal: "sm",
    },
    {
      label: "เดือน",
      field: "month",
      minimal: "sm",
    },
    {
      label: "รายรับ",
      field: "revenue",
      minimal: "sm",
    },
    {
      label: "รายจ่าย",
      field: "expenditure",
      minimal: "sm",
    },
    {
      label: "ยอดสุทธิ",
      field: "total",
      minimal: "sm",
    },
    {
      label: "ใบเงินเดือน",
      field: "fileprint",
      minimal: "sm",
    },
  ];
  const [TableSalary, setTableSalary] = useState({
    columns: column,
    rows: [],
  });
  const fontsize = "clamp(14px,1vw,16px)";
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
          {Load ? (
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
            <>
              <Flex h={"100%"} align={"center"}>
                <Image src={"https://mis.kpru.ac.th/images/pic_emp_50/001596.jpg"} maw={100} radius={8} />
                <Flex px={10} direction={"column"}>
                  <Grid gutter={0}>
                    <Grid.Col span={4}>
                      <Text fz={fontsize}>ชื่อ - นามสกุล : </Text>
                    </Grid.Col>
                    <Grid.Col span={8}>
                      <Text fz={fontsize} fw={300}>
                        นาย จิรศักดิ์ สิงหบุตร
                      </Text>
                    </Grid.Col>
                    <Grid.Col>
                      <Divider variant="dashed" />
                    </Grid.Col>

                    <Grid.Col span={4}>
                      <Text fz={fontsize}>ประเภท : </Text>
                    </Grid.Col>
                    <Grid.Col span={8}>
                      <Text fz={fontsize} fw={300}>
                        ลูกจ้างชั่วคราว
                      </Text>
                    </Grid.Col>
                    <Grid.Col span={4}>
                      <Text fz={fontsize}>ตำแหน่ง :</Text>
                    </Grid.Col>
                    <Grid.Col span={8}>
                      <Text fz={fontsize} fw={300}>
                        {" "}
                        นักวิชาการคอมพิวเตอร์
                      </Text>
                    </Grid.Col>
                    <Grid.Col span={4}>
                      <Text fz={fontsize}>สังกัด :</Text>
                    </Grid.Col>
                    <Grid.Col span={8}>
                      <Text fz={fontsize} fw={300}>
                        สำนักส่งเสริมวิชาการและงานทะเบียน
                      </Text>
                    </Grid.Col>
                  </Grid>
                </Flex>
              </Flex>
            </>
          )}
        </Paper>
      </Flex>
      <Container fluid mt={20}>
        {Load ? (
          <SkeletonTable />
        ) : (
          <Paper p={10} shadow="lg">
            <MDBDataTableV5
              data={TableSalary}
              responsive
              searchTop={true}
              searchBottom={false}
              barReverse={false}
              searchLabel="ค้นหาปี"
              striped
              sortable={false}
            />
          </Paper>
        )}
      </Container>
    </div>
  );
}

export default User;
