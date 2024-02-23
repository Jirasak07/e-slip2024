import { Badge, Button, Container, Paper, Select, SimpleGrid, Flex, NumberFormatter, Grid } from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { IconSearch, IconPrinter } from "@tabler/icons-react";
import { MDBDataTableV5 } from "mdbreact";
import { useEffect, useState } from "react";
import { API } from "../../Config/ConfigApi";
import axios from "axios";
import Swal from "sweetalert2";
import { Text } from "@mantine/core";
import SkeletonTable from "../../Publicc-user/SkeletonTable";



function Updatesalary() {
    const column = [
        {
            label: "#",
            field: "no",
            minimal: "lg",
        },
        {
            label: "เลขบัตร",
            field: "citizen",
            minimal: "lg",
        },
        {
            label: "ชื่อ-นามสกุล",
            field: "name",
            minimal: "lg",
        },
        {
            label: "ประเภทบุคลากร",
            field: "type_employ",
            minimal: "lg",
        },
        {
            label: "เงินเดือน",
            field: "salary",
            minimal: "lg",
        },
        {
            label: "รายรับ",
            field: "revenue",
            minimal: "lg",
        },
        {
            label: "รายจ่าย",
            field: "expenses",
            minimal: "lg",
        },

        {
            label: "ยอดสุทธิ",
            field: "total",
            minimal: "lg",
        },
        {
            label: "จัดการ",
            field: "manage",
            minimal: "lg",
        },
    ];
    const [TableSalary, setTableSalary] = useState({
        columns: column,
        rows: [],
    });
    const [LoadTable, setLoadTable] = useState(false);
    const [DataTypeEmploy, setDataTypeEmploy] = useState([]);
    const [DataYear, setDataYear] = useState([]);

    const selectmount = [
        {
            value: "01",
            label: "มกราคม",
        },
        {
            value: "02",
            label: "กุมภาพันธ์",
        },
        {
            value: "03",
            label: "มีนาคม",
        },
        {
            value: "04",
            label: "เมษายน",
        },
        {
            value: "05",
            label: "พฤษภาคม",
        },
        {
            value: "06",
            label: "มิถุนายน",
        },
        {
            value: "07",
            label: "กรกฎาคม",
        },
        {
            value: "08",
            label: "สิงหาคม",
        },
        {
            value: "09",
            label: "กันยายน",
        },
        {
            value: "10",
            label: "ตุลาคม",
        },
        {
            value: "11",
            label: "พฤศจิกายน",
        },
        {
            value: "12",
            label: "ธันวาคม",
        },
    ];

    const FetchTypeEmploy = () => {
        setLoadTable(true);
        setTimeout(() => {
            axios.get(API + "/index/showcustomertype").then((res) => {
                //    console.log(res.data);
                const data = res.data;
                if (data.length !== 0) {
                    setLoadTable(false);
                    const select = data.map((i) => ({
                        value: i.customer_type_id,
                        label: i.customer_type_name,
                    }));
                    setDataTypeEmploy(select);
                }
            });
        }, 400);
    };

    const FetchYear = () => {
        // setLoadTable(true);
        setTimeout(() => {
            axios.get(API + "/index/showyear").then((res) => {
                // console.log(res.data);
                const data = res.data;
                if (data.length !== 0) {
                    setLoadTable(false);
                    const select = data.map((i) => ({
                        value: i.name_year,
                        label: i.name_year_th,
                    }));
                    setDataYear(select);
                }
            });
        }, 400);
    };

    const submitdata = (value) => {
        console.log(value.type_employ);
        console.log(value.month);
        console.log(value.year);
        console.log(value.monthend);
        console.log(value.yearend);
        // const datafrm = new FormData(); //สร้างฟอร์มสำหรับการส่งข้อมูล
        // datafrm.append("namebudget", initialValues.name);
        // datafrm.append("levelbudget", initialValues.levelbudget);

        // setLoadTable(true);

        // axios
        //     .get(API + "/index/showrevenueandexpenditure/" + value.type_employ + "/" + value.year + "/" + value.month)
        //     .then((res) => {
        //         console.warn(res);
        //         const data = res.data;
        //         if (data.lenth !== 0) {
        //             setTableSalary({
        //                 columns: column,
        //                 rows: [
        //                     ...data.map((i, key) => ({
        //                         no: key + 1,
        //                         citizen: i.customers_citizent,
        //                         name: i.customers_pname + i.customers_name + " " + i.customers_lname,
        //                         type_employ: i.customer_type_name,
        //                         salary: <Text c="teal.8"><NumberFormatter thousandSeparator value={i.history_salary_salary} /></Text>,
        //                         revenue: <Text c="blue"><NumberFormatter thousandSeparator value={i.revenue} /></Text>,
        //                         expenses: <Text c="red.9"><NumberFormatter thousandSeparator value={i.expenditure} /></Text>,
        //                         total: <Text c="dark.9"><NumberFormatter thousandSeparator value={i.salary_true} /></Text>,
        //                         manage: (<Flex direction={"row"} gap={5}>

        //                             <Button
        //                                 color="var(--info)"
        //                                 leftSection={<IconPrinter />}
        //                                 size="xs"
        //                             >
        //                                 พิมพ์
        //                             </Button>
        //                         </Flex>)
        //                         ,
        //                     })),
        //                 ],
        //             });
        //         }
        //         setLoadTable(false);
        //     });
    };

    useEffect(() => {
        FetchTypeEmploy();
        FetchYear();
    }, []);

    const formSearch = useForm({
        initialValues: {
            type_employ: "",
            month: (new Date().getMonth().toString().length === 1
                ? "0" + new Date().getMonth()
                : new Date().getMonth()
            ).toString(),
            year: (new Date().getFullYear()).toString(),
            monthend: (new Date().getMonth().toString().length === 1
            ? "0" + new Date().getMonth()
            : new Date().getMonth()
        ).toString(),
        yearend: (new Date().getFullYear()).toString(),
        },

        validate: {
            type_employ: isNotEmpty("กรุณาเลือกประเภทบุคลากร"),
            month: isNotEmpty("กรุณาเลือกเดือน"),
            year: isNotEmpty("กรุณาเลือกปี"),
            monthend: isNotEmpty("กรุณาเลือกเดือน"),
            yearend: isNotEmpty("กรุณาเลือกปี"),
            
        },
    });
    return (
        <>
            <Container p={0} bg={"white"} fluid>
                <Badge color="var(--primary)" variant="light" size="md" radius={8}>
                    อัพเดทข้อมูลเงินเดือน จากเดือนก่อนหน้า
                </Badge>
                <Paper mt={20} mb={20}>
                    <form
                        onSubmit={formSearch.onSubmit((v) => {
                            submitdata(v);
                            // console.log(v);
                        })}
                    >
                        <Grid>
                            <Grid.Col span={8}>
                                <Select data={DataTypeEmploy} {...formSearch.getInputProps("type_employ")} label="ประเภทบุคลากร" />
                            </Grid.Col>
                        </Grid>
                        <Grid gutter={{ base: 5, xs: 'md', md: 'xl', xl: 50  }}>
                            <Grid.Col span={4} >
                                <Select label="เลือกเดือนที่จะใช้ข้อมูลเข้าเดือนใหม่" data={selectmount} {...formSearch.getInputProps("month")} />
                                <Select label="ปี" data={DataYear} {...formSearch.getInputProps("year")} mt={10} />
                            </Grid.Col>
                            <Grid.Col span={4}>
                                <Select label="เลือกเดือนที่จะนำข้อมูลเข้า " data={selectmount} {...formSearch.getInputProps("monthend")}  />
                                <Select label="ปี" data={DataYear} {...formSearch.getInputProps("yearend")} mt={10} />
                            </Grid.Col>
                            <Grid.Col span={4}>
                                <Button type="submit" mt={33} leftSection={<IconSearch />}>
                                    ค้นหา
                                </Button>
                            </Grid.Col>
                        </Grid>

                    </form>
                </Paper>

                <Paper pt={20} shadow="xl" p="xl">
               
                       <Grid justify="center">
                            <Grid.Col span={4} >
                            <Text size="xl">พบข้อมูลเงินเดือน {selectmount.length} รายการ</Text>
                             <Button type="submit" mt={33} leftSection={<IconSearch />}  color="var(--purpel)">
                                    อัพเดท
                                </Button>
                            </Grid.Col>
                        </Grid>
                    {/* {LoadTable ? (
                        <SkeletonTable />
                    ) : (
                        <MDBDataTableV5
                            data={TableSalary}
                            responsive
                            striped
                            searchLabel="ค้นหาจากเลขบัตร หรือ ชื่อ"
                            barReverse
                            searchTop
                            searchBottom={false}
                            noRecordsFoundLabel="ไม่พบรายการ"
                        />
                    )} */}
                </Paper>
            </Container>
        </>
    );
}

export default Updatesalary;
