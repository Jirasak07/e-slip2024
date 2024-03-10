import {
  Badge,
  Button,
  Card,
  Container,
  Divider,
  Flex,
  Grid,
  Image,
  LoadingOverlay,
  NumberFormatter,
  Paper,
  ScrollArea,
  SimpleGrid,
  Skeleton,
  Stack,
  Text,
} from "@mantine/core";
import React, { useEffect, useState } from "react";
import SkeletonTable from "./SkeletonTable";
import { MDBDataTableV5 } from "mdbreact";
import axios from "axios";
import { monthh } from "./Month";
import { API } from "../Config/ConfigApi";
import { IconFileDescription, IconPdf, IconPrinter } from "@tabler/icons-react";
function User() {
  const monthselect = monthh;
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
      minimal: "lg",
    },
    {
      label: "รายจ่าย",
      field: "expenditure",
      minimal: "lg",
    },
    {
      label: "ยอดสุทธิ",
      field: "total",
      minimal: "lg",
    },
    {
      label: "ใบเงินเดือน",
      field: "fileprint",
      minimal: "lg",
    },
  ];
  const [LoadButton, setLoadButton] = useState(false);
  const [TableSalary, setTableSalary] = useState({
    columns: column,
    rows: [],
  });
  const fontsize = "clamp(14px,1vw,16px)";
  const GetMonth = (params) => {
    const label = monthselect.findIndex((value) => value.value === params);
    return monthselect[label].label;
  };

  const FetchData = (params) => {
    axios.get(API + "/index/showhistorysalarywhereemp/1629900531666/1").then((res) => {
      const data = res.data;
      if (data.length !== 0) {
        setTableSalary({
          columns: column,
          rows: [
            ...data.map((i, key) => ({
              year: i.history_salary_year,
              month: GetMonth(i.history_salary_month),
              revenue: <NumberFormatter thousandSeparator suffix=" ฿" value={i.revenue} />,
              expenditure: <NumberFormatter thousandSeparator suffix=" ฿" value={i.expenditure} />,
              total: <NumberFormatter thousandSeparator suffix=" ฿" value={i.salary_true} />,
              fileprint: (
                <>
                  <Flex gap={10}>
                    <Button
                      onClick={() => {
                        setLoadButton(true);
                        setTimeout(() => {
                          setLoadButton(false);
                          window.open(
                            API +
                              "/PDF/SalarySlip.php?id=" +
                              i.customers_citizent +
                              "&year=" +
                              i.history_salary_year +
                              "&month=" +
                              i.history_salary_month +
                              "&type=" +
                              i.customers_type
                          );
                        }, 1200);
                      }}
                      leftSection={<IconPrinter />}
                      color="var(--primary)"
                    >
                      พิมพ์สลิปเงินเดือน
                    </Button>
                    <Button leftSection={<IconFileDescription />} color="blue.8">
                      ไฟล์เอกสารอื่นๆ
                    </Button>
                  </Flex>
                </>
              ),
            })),
          ],
        });
      }
    });
  };
  useEffect(() => {
    setLoad(true);
    FetchData();
    setTimeout(() => {
      setLoad(false);
    }, 1200);
  }, []);
  return (
    <>
      <div>
        {" "}
        <ScrollArea h={"calc(100dvh - 2rem)"}>
          <Container fluid p={0}>
            <Badge size="xl" variant="subtle" color="var(--primary)">
              รายการเงินเดือน
            </Badge>
            <Flex justify={"center"}>
              <Paper withBorder shadow="lg" w={"clamp(300px,80vw,600px)"} mih={150} p={10}>
                <LoadingOverlay transitionProps={{ transition: "pop" }} visible={LoadButton} />
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
                <Paper withBorder p={10} shadow="lg">
                  <MDBDataTableV5
                    data={TableSalary}
                    entriesOptions={[5,6,10,15,50,100,150,200,300,500]}
                    entries={6}
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
          </Container>{" "}
        </ScrollArea>
      </div>
    </>
  );
}

export default User;
