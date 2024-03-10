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



function Reportshowsalaryopen() {


    const column = [
        {
            label: "#",
            field: "no",
            minimal: "lg",
        },
        {
            label: "ปี",
            field: "show_year",
            minimal: "lg",
        },
        {
            label: "เดือน",
            field: "show_month",
            minimal: "lg",
        },
        {
            label: "สถานะ",
            field: "show_status",
            minimal: "lg",
        },

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


    const searchdata = (value) => {
        // console.log(value.idbudget);
        // console.log(value.month);
        // console.log(value.year);


        axios.get(API + "/index/showsalaryopen").then((res) => {


            console.log(res.data);
            const data = res.data;
            if (data.length !== 0) {
                //  setLoadTable(false);
                setTableSalary({
                    columns: column,
                    rows: [
                        ...data.map((i, key) => ({
                            no: key + 1,
                            show_year: i.show_year,
                            show_month: i.show_month,
                            show_status: i.show_status,

                        })),
                    ],
                });

               // setDatahistoryprint(res.data);
            }
        });

    }



    useEffect(() => {
        searchdata();

      //  FetchTshowexpenditurelist();
     //   FetchYear();
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
                    แสดงรายการโชว์เงินเดือน
                </Badge>

                {/* <Paper mt={20} mb={20}>
                    <form
                        onSubmit={formSearch.onSubmit((v) => {
                            searchdata(v);
                            // console.log(v);
                        })}
                    >
                      
                        <Grid gutter={{ base: 5, xs: 'md', md: 'xl', xl: 50 }}>
                            <Grid.Col span={4} >
                                <Select label="เดือน" data={selectmount} {...formSearch.getInputProps("month")} />

                            </Grid.Col>
                            <Grid.Col span={4}>
                                <Select label="ปี" data={DataYear} {...formSearch.getInputProps("year")} />

                            </Grid.Col>

                            <Grid.Col span={4}>
                                <Button type="submit" mt={33} leftSection={<IconSearch />}>
                                    ค้นหา
                                </Button>
                            </Grid.Col>
                        </Grid>

                    </form>
                </Paper> */}

                <Paper pt={20} shadow="xl" p="xl">

             
                    {LoadTable ? (
                        <SkeletonTable />
                    ) : (
                        <MDBDataTableV5
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

export default Reportshowsalaryopen;
