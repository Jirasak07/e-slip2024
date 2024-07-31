import { Badge, Button, Container, Paper, Select, SimpleGrid, Flex, NumberFormatter, Grid, List, ThemeIcon, rem } from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { IconSearch, IconPrinter, IconCircleCheck, IconCircleDashed } from "@tabler/icons-react";
import { MDBDataTableV5 } from "mdbreact";
import { useEffect, useState } from "react";
import { API } from "../../Config/ConfigApi";
import axios from "axios";
import Swal from "sweetalert2";
import { Text } from "@mantine/core";
import SkeletonTable from "../../Publicc-user/SkeletonTable";



function Reporthistoryprint() {

    


    const column = [
        {
            label: "#",
            field: "no",
            minimal: "lg",
        },
        {
            label: "เลขบัตร",
            field: "print_citizent",
            minimal: "lg",
        },
        {
            label: "ชื่อไฟล์",
            field: "print_file_name",
            minimal: "lg",
        },
        {
            label: "ประเภทบุคลากร",
            field: "print_customer_type",
            minimal: "lg",
        },
        {
            label: "วันที่พิมพ์",
            field: "print_date",
            minimal: "lg",
        },
        {
            label: "เดือน",
            field: "print_payslip_month",
            minimal: "lg",
        },
        {
            label: "ปี",
            field: "print_payslip_year",
            minimal: "lg",
        }
    ];


    const [TableSalary, setTableSalary] = useState({
        columns: column,
        rows: [],
    });
    const [LoadTable, setLoadTable] = useState(false);
    const [DataBudget, setDataBudget] = useState([]);
    const [DataYear, setDataYear] = useState([]);
    const [Datahistoryprint, setDatahistoryprint] = useState([]);
    const [Dataexpenditurelist, setDataexpenditurelist] = useState([]);
    const [Dataipay, setDataipay] = useState({
        columns: column,
        rows: [
          
        ],
    });

 



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

    const FetchTypeshowBudget = () => {
        setLoadTable(true);
        setTimeout(() => {
            axios.get(API + "/index/showBudget").then((res) => {
                //    console.log(res.data);
                const data = res.data;
                if (data.length !== 0) {
                    setLoadTable(false);
                    const select = data.map((i) => ({
                        value: i.idbudget,
                        label: i.namebudget,
                    }));
                    setDataBudget(select);
                }
            });
        }, 400);
    };

    const FetchTshowexpenditurelist = () => {
        setLoadTable(true);
        setTimeout(() => {
            axios.get(API + "/index/showrevenuelist").then((res) => {
                //    console.log(res.data);
                const data = res.data;
                if (data.length !== 0) {
                    setLoadTable(false);
                    const select = data.map((i) => ({
                        value: i.revenue_name,
                        label: i.revenue_name,
                    }));
                    setDataexpenditurelist(select);
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


    const searchdata = (value) => {
        // console.log(value.idbudget);
        // console.log(value.month);
        // console.log(value.year);


        axios.get(API + "/index/showhistoryprint/" + value.year + "/" + value.month ).then((res) => {


            console.log(res.data);
            const data = res.data;
            if (data.length !== 0) {
                //  setLoadTable(false);
                setTableSalary({
                    columns: column,
                    rows: [
                        ...data.map((i, key) => ({
                            no: key + 1,
                            print_citizent: i.print_citizent,
                            print_file_name: i.print_file_name,
                            print_customer_type: i.print_customer_type,
                            print_date: i.print_date,
                            print_payslip_month: i.print_payslip_month,
                            print_payslip_year: i.print_payslip_year,

                        })),
                    ],
                });

                setDatahistoryprint(res.data);
            }
        });

    }

    const submitdata = (value) => {


        const form = Datasalarystart
        console.log(value.values)
        console.log(form)
        axios.post(API + "/index/Addhistorysalarymonth", {
            month: value.values.monthend,
            year: value.values.yearend,
            check: form,
        }).then((res) => {
            Swal.fire({
                title: 'อัพเดทข้อมูลสำเร็จ',
                icon: 'success',
                // showCancelButton: true,
                confirmButtonText: 'ตกลง',
                // cancelButtonText: 'No, keep it'
            }).then((result) => {
                //  this.toggle();
                // close();
            })
            console.log(res.data)
        })


    };

    useEffect(() => {
        FetchTypeshowBudget();
        FetchTshowexpenditurelist();
        FetchYear();
    }, []);

    const formSearch = useForm({
        initialValues: {
           
            month: (new Date().getMonth().toString().length === 1
                ? "0" + new Date().getMonth()
                : new Date().getMonth()
            ).toString(),
            year: (new Date().getFullYear()).toString(),

        },

        validate: {
         
            month: isNotEmpty("กรุณาเลือกเดือน"),
            year: isNotEmpty("กรุณาเลือกปี"),


        },
    });
    return (
        <>
            <Container p={0} bg={"white"} fluid>
                <Badge color="var(--primary)" variant="light" size="md" radius={8}>
                    ประวัติการพิมพ์
                </Badge>

                <Paper mt={20} mb={20}>
                    <form
                        onSubmit={formSearch.onSubmit((v) => {
                            searchdata(v);
                            // console.log(v);
                        })}
                    >
                      
                        <Grid gutter={{ base: 5, xs: 'md', md: 'xl', xl: 50 }}>
                            <Grid.Col span={4} >
                                <Select searchable label="เดือน" data={selectmount} {...formSearch.getInputProps("month")} />

                            </Grid.Col>
                            <Grid.Col span={4}>
                                <Select searchable label="ปี" data={DataYear} {...formSearch.getInputProps("year")} />

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
                            <Text size="xl">พบข้อมูลเงินเดือน {Datahistoryprint.length} รายการ</Text>

                            {/* <List
                                spacing="xs"
                                size="sm"
                                mt={10}
                                center
                                icon={
                                    <ThemeIcon color="teal" size={24} radius="xl">
                                        <IconCircleCheck style={{ width: rem(16), height: rem(16) }} />
                                    </ThemeIcon>
                                }
                            >
                                    {Datahistoryprint.map((i, key) => (
                                        <List.Item>{i.bank_name}  {i.MonneyFull}</List.Item>
                                    ))}
                                         
                            </List> */}

                            {/* <Button onClick={()=>submitdata(formSearch)} mt={33} leftSection={<IconSearch />}  color="var(--purpel)">
                                    อัพเดท
                                </Button> */}
                        </Grid.Col>
                    </Grid>
                    {LoadTable ? (
                        <SkeletonTable />
                    ) : (
                        <MDBDataTableV5 entries={100}
                            data={TableSalary}
                            responsive
                            striped
                            searchLabel="ค้นหาจากเลขบัตร"
                            barReverse
                            searchTop
                            searchBottom={false}
                            noRecordsFoundLabel="ไม่พบรายการ"
                        />
                    )}
                </Paper>
            </Container>
        </>
    );
}

export default Reporthistoryprint;
