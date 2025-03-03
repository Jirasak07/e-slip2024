import {
  Badge,
  Button,
  Container,
  Divider,
  Flex,
  Grid,
  LoadingOverlay,
  NumberFormatter,
  Paper,
  Select,
  SimpleGrid,
  Skeleton,
  Stack,
  Text,
} from "@mantine/core";
import { useEffect, useState } from "react";
import SkeletonTable from "./SkeletonTable";
import { MDBDataTableV5 } from "mdbreact";
import axios from "axios";
import { monthh } from "./Month";
import { API } from "../Config/ConfigApi";
import { IconDownload, IconFileDescription, IconPrinter } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { isNotEmpty, useForm } from "@mantine/form";
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
  const formtax = useForm({
    initialValues: {
      TAX_PAY_YEAR: "",
      TAX_PAY_YEAR_DATA: [],
    },
    validate: {
      TAX_PAY_YEAR: isNotEmpty("กรุณาเลือกปี"),
    },
  });
  const [CitiZent, setCitiZent] = useState("");
  const FetchYearTax = (params) => {
    axios
      .post(API + "/index/SelectYearTax", {
        citizen: parseInt(localStorage.getItem("citizen")),
      })
      .then((res) => {
        if (res.data.length !== 0) {
          const data = res.data;
          const select = data.map((i) => ({
            value: i.TAVI_YEAR,
            label: (parseInt(i.TAVI_YEAR) + 543).toString(),
          }));
          formtax.setValues({
            TAX_PAY_YEAR_DATA: select,
            TAX_PAY_YEAR: select[0].value,
          });
        } else {
          console.log(res.data);
        }
      });
  };

  const [IMG, setIMG] = useState("");
  const FetchData = async () => {
    const fm = new FormData();
    fm.append("customers_citizent", localStorage.getItem("citizen"));
    axios.post(API + "/index/findtypeemploy", fm).then((type) => {
      console.log(type.data[0].customers_type_name);
      const types = type.data[0].customers_type;
      localStorage.setItem("type_name", type.data[0].customers_type_name);
      localStorage.setItem("type_ids", types);
      axios
        .get(
          API + "/index/showhistorysalarywhereemp/" + localStorage.getItem("citizen") + "/" + types
        )
        .then((res) => {
          const data = res.data;
          setIMG(
            "https://mis.kpru.ac.th/images/pic_emp_50/" +
              localStorage.getItem("employee_id") +
              ".jpg"
          );
          if (data.length !== 0) {
            setTableSalary({
              columns: column,
              rows: [
                ...data.map((i, key) => ({
                  year: i.history_salary_year,
                  month: GetMonth(i.history_salary_month),
                  revenue: <NumberFormatter thousandSeparator suffix=" ฿" value={i.revenue} />,
                  expenditure: (
                    <NumberFormatter thousandSeparator suffix=" ฿" value={i.expenditure} />
                  ),
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
                                  parseInt(i.customers_citizent) +
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
    });
  };
  const PrintTax50 = (val) => {
    window.open(
      "https://mua.kpru.ac.th/FrontEnd_Salary/chirasax/tavi50.php?citizen=" +
        localStorage.getItem("citizen") +
        "&year=" +
        val.TAX_PAY_YEAR
    );
    // window.open(
    //   API + "/PDF/Tax50.php?id=" + localStorage.getItem("citizen") + "&year=" + val.TAX_PAY_YEAR
    // );
  };

  const nav = useNavigate();
  useEffect(() => {
    if (
      localStorage.getItem("citizen") === null ||
      localStorage.getItem("citizen") === undefined ||
      localStorage.getItem("citizen") === ""
    ) {
      nav("/login");
    } else {
      const id = parseInt(localStorage.getItem("citizen"));
      setCitiZent(id);
    }
    setLoad(true);
    FetchData();
    FetchYearTax();
    setTimeout(() => {
      setLoad(false);
    }, 1200);
  }, [CitiZent]);
  return (
    <>
      <div>
        <Container fluid p={0}>
          <Badge size="xl" variant="subtle" color="var(--primary)">
            รายการเงินเดือน
          </Badge>
          <Flex justify={"center"}>
            <Paper withBorder shadow="lg" w={"clamp(300px,80vw,600px)"} mih={160} p={10}>
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
                    <img src={IMG} style={{ maxWidth: 100 }} radius={8} />
                    <Flex px={10} direction={"column"}>
                      <Grid gutter={0}>
                        <Grid.Col span={4}>
                          <Text fz={fontsize}>ชื่อ - นามสกุล : </Text>
                        </Grid.Col>
                        <Grid.Col span={8}>
                          <Text fz={fontsize} fw={300}>
                            {localStorage.getItem("pname")}
                            {localStorage.getItem("fname")}
                            &nbsp; &nbsp;
                            {localStorage.getItem("lname")}
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
                            {localStorage.getItem("type_name")}
                          </Text>
                        </Grid.Col>
                        <Grid.Col span={4}>
                          <Text fz={fontsize}>ตำแหน่ง :</Text>
                        </Grid.Col>
                        <Grid.Col span={8}>
                          <Text fz={fontsize} fw={300}>
                            {localStorage.getItem("rank_name")}
                          </Text>
                        </Grid.Col>
                        <Grid.Col span={4}>
                          <Text fz={fontsize}>สังกัด :</Text>
                        </Grid.Col>
                        <Grid.Col span={8}>
                          <Text fz={fontsize} fw={300}>
                            {localStorage.getItem("organization_name")}
                          </Text>
                        </Grid.Col>
                      </Grid>
                    </Flex>
                  </Flex>
                </>
              )}
            </Paper>
          </Flex>
          <Paper>
            <Button
              size="md"
              mt={25}
              variant="light"
              onClick={() => {
                window.open("https://e-payslip.kpru.ac.th/");
              }}
            >
              สำหรับผู้ที่ต้องการข้อมูลเงินเดือนย้อนหลังก่อนเดือน สิงหาคม 2567 คลิกที่นี่
            </Button>
          </Paper>
          <Container
            fluid
            p={0}
            mt={10}
            hidden={
              localStorage.getItem("type_ids") === "6" || localStorage.getItem("type_ids") === "2"
            }
          >
            <Paper shadow="sm" p={10}>
              <form
                onSubmit={formtax.onSubmit((val) => {
                  PrintTax50(val);
                })}
              >
                <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }}>
                  <Select
                    searchable
                    allowDeselect={false}
                    data={formtax.values.TAX_PAY_YEAR_DATA}
                    {...formtax.getInputProps("TAX_PAY_YEAR")}
                    label="เลือกปี"
                  />
                  <Button
                    fullWidth
                    disabled={formtax.values.TAX_PAY_YEAR_DATA.length > 0 ? false : true}
                    type="submit"
                    mt={{ base: 10, sm: 33, md: 33 }}
                    variant="filled"
                    color="green.7"
                    leftSection={<IconDownload />}
                  >
                    <Text fz={12} fw={500}>
                      {" "}
                      ดาวน์โหลดหนังสือรับรองการหักภาษี ณ ที่จ่าย ประจำปี 2567
                    </Text>
                  </Button>
                </SimpleGrid>
              </form>
            </Paper>
          </Container>
          <Paper
            p={10}
            my={5}
            withBorder
            hidden={
              localStorage.getItem("type_ids") !== "6" && localStorage.getItem("type_ids") !== "2"
            }
          >
            <Text></Text>
            <Button
              // disabled={formtax.values.TAX_PAY_YEAR_DATA.length > 0 ? false : true}
              // type="submit"
              // mt={{ base: 10, sm: 33, md: 33 }}
              onClick={() => {
                // window.open(
                //   API + "/PDF/Tax50.php?id=" + localStorage.getItem("citizen") + "&year=" + val.TAX_PAY_YEAR
                // );
                window.open(
                  API +
                    "/public/uploads/tax/" +
                    localStorage.getItem("citizen") +
                    "/" +
                    localStorage.getItem("citizen") +
                    "-2567.pdf"
                );
              }}
              variant="filled"
              color="green.8"
              leftSection={<IconDownload />}
            >
              <Text fz={12} fw={500}>
                ดาวน์โหลดหนังสือรับรองการหักภาษี ณ ที่จ่าย ประจำปี 2567 (ข้าราชการ)
              </Text>
            </Button>
          </Paper>
          <Container fluid p={0} mt={10} hidden={formtax.values.TAX_PAY_YEAR_DATA.length === 0}>
            <Paper shadow="sm" p={10} withBorder>
              <form
                onSubmit={formtax.onSubmit((val) => {
                  PrintTax50(val);
                })}
              >
                <Text my={5} c="blue">
                  สำหรับค่าตอบแทนยานพาหนะ
                </Text>
                <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }}>
                  <Select
                    searchable
                    allowDeselect={false}
                    data={formtax.values.TAX_PAY_YEAR_DATA}
                    {...formtax.getInputProps("TAX_PAY_YEAR")}
                    label="เลือกปี"
                  />
                  <Button
                    fullWidth
                    disabled={formtax.values.TAX_PAY_YEAR_DATA.length > 0 ? false : true}
                    type="submit"
                    mt={{ base: 10, sm: 33, md: 33 }}
                    variant="filled"
                    color="green.7"
                    leftSection={<IconDownload />}
                  >
                    <Text fz={12} fw={500}>
                      {" "}
                      ดาวน์โหลดหนังสือรับรองการหักภาษี ณ ที่จ่าย ประจำปี 2567
                    </Text>
                  </Button>
                </SimpleGrid>
              </form>
            </Paper>
          </Container>
          <Container fluid p={0} mt={20}>
            {Load ? (
              <SkeletonTable />
            ) : (
              <Paper withBorder p={10} shadow="lg">
                <MDBDataTableV5
                  data={TableSalary}
                  entriesOptions={[5, 6, 10, 15, 50, 100, 150, 200, 300, 500]}
                  entries={100}
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
        {/* </ScrollArea> */}
      </div>
    </>
  );
}

export default User;
