import { Badge, Button, Container, Paper, Select, SimpleGrid, Flex, NumberFormatter, Grid, FileButton, Group } from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { IconSearch, IconPrinter, IconDownload, IconFolderUp } from "@tabler/icons-react";
import { MDBDataTableV5 } from "mdbreact";
import { useEffect, useState } from "react";
import { API } from "../../Config/ConfigApi";
import axios from "axios";
import Swal from "sweetalert2";
import { Text } from "@mantine/core";
import SkeletonTable from "../../Publicc-user/SkeletonTable";
import ExcelJs from 'exceljs'
//import { read, writeFileXLSX } from "xlsx";
import * as xlsx from 'xlsx';


function Uploadsalary() {
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
            label: "รายรับ",
            field: "total_in",
            minimal: "lg",
        },

        {
            label: "ยอดสุทธิ",
            field: "total",
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
    // const [DataTotalsummary, setDataTotalsummary] = useState([]);
    //const [Dataexpenditurelist, setDataexpenditurelist] = useState([]);
    const [Tablelist, setTablelist] = useState([]);
    const [Salarylist, setSalarylist] = useState([]);

    //const [file, setFile] = useState<File | null>(null);
    const [file, setFile] = useState([]);



    const ExcelExport = () => {

        const workbook = new ExcelJs.Workbook();
        const sheet = workbook.addWorksheet("Mysheet");
        sheet.properties.defaultRowHeight = 15;

        sheet.columns = [
            {
                header: "customers_citizent",
                key: "customers_citizent",
                width: 20
            },
            {
                header: "history_salary_year",
                key: "history_salary_year",
                width: 20,
            },
            {
                header: "history_salary_month",
                key: "history_salary_month",
                width: 20,
            },
            {
                header: "customers_type",
                key: "customers_type",
                width: 20,
            },
            {
                header: "idbudget",
                key: "idbudget",
                width: 20,
            },
            {
                header: "customers_pname",
                key: "customers_pname",
                width: 20,
            },
            {
                header: "customers_name",
                key: "customers_name",
                width: 20,
            },
            {
                header: "customers_lname",
                key: "customers_lname",
                width: 20,
            },
            {
                header: "history_salary_salary",
                key: "history_salary_salary",
                width: 20,
            },
        ]

        Salarylist.map((i) => (
            sheet.addRow(
                {
                    customers_citizent: i.customers_citizent,
                    history_salary_year: i.history_salary_year,
                    history_salary_month: i.history_salary_month,
                    customers_type: i.customers_type,
                    idbudget: i.idbudget,
                    customers_pname: i.customers_pname,
                    customers_name: i.customers_name,
                    customers_lname: i.customers_lname,
                    history_salary_salary: i.history_salary_salary
                }
            )
        ))


        workbook.xlsx.writeBuffer().then(data => {
            //  const sdfg = `dd${formSearch.getInputProps("year").toString}.xlsx`;
            const blob = new Blob([data], {
                type: "application/vnd.openxmlformats-officedocument.spreadsheet.sheet",
            });
            const url = window.URL.createObjectURL(blob);
            const anchor = document.createElement('a');
            anchor.href = url;
            anchor.download = 'ข้อมูลเงินเดือน.xlsx';
            // anchor.download = sdfg;
            anchor.click();
            window.URL.revokeObjectURL(url);
        })

    }



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
                        label: i.namebudget+" ( "+i.idbudget+" ) ",
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

    const Readfile = (e) => {


        e.preventDefault();
        if (e.target.files) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const data = e.target.result;
                const workbook = xlsx.read(data, { type: "array" });
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];
                const json = xlsx.utils.sheet_to_json(worksheet);
                console.log(json);
                setTablelist(json);
            };
            reader.readAsArrayBuffer(e.target.files[0]);
        }

    };

    const searchdata = (value) => {

        setLoadTable(true);

        axios.post(API + "/index/showhTotalsummaryrevenuelist", {
            month: value.month,
            year: value.year,
            type: value.type,
            idbudget: value.idbudget

        }).then((res) => {
            setLoadTable(false);
            console.log(res.data);
            const data = res.data;
            if (data.length !== 0) {


                setTablelist({
                    columns: column,
                    rows: [
                        ...data.map((i, key) => ({
                            no: key + 1,
                            citizen: i.customers_citizent,
                            name: i.customers_pname + i.customers_name + " " + i.customers_lname,
                            type_employ: i.customer_type_name,
                            total_in: <Text c="teal.8"><NumberFormatter thousandSeparator value={i.total_in} /></Text>,
                            total: <Text c="red.9"><NumberFormatter thousandSeparator value={i.total} /></Text>,

                        })),
                    ],
                });

                setDataTotalsummary(res.data);
            }
        });

    }

    const submitdata = (initialValues) => {
     
        console.log(initialValues.year)

        const form = Tablelist
       // console.log(value.values)
        console.log(Tablelist)
        axios.post(API + "/index/Addhistorysalarymonth", {
            month: initialValues.month,
            year: initialValues.year,
            check: form,
        }).then((res) => {
            Swal.fire({
                title: 'อัพเดทข้อมูลสำเร็จ',
                icon: 'success',
                confirmButtonText: 'ตกลง',
            }).then((result) => {
               
                
            })
            console.log(res.data)
        })


    };

    const Fetchshowhistorysalarylist = (value) => {
        // setLoadTable(true);
        setTimeout(() => {
            axios.get(API + "/index/showhistorysalarylist/" + value.year + "/" + value.month + "/" + value.idbudget).then((res) => {
                // console.log(res.data);
                const data = res.data;
                if (data.length !== 0) {
                    // setLoadTable(false);
                    // const select = data.map((i) => ({
                    //     value: i.name_year,
                    //     label: i.name_year_th,
                    // }));
                    setSalarylist(data);
                }
            });
        }, 400);
    };



    useEffect(() => {
        FetchTypeshowBudget();
        FetchTshowexpenditurelist();
        FetchYear();
        // FetchYear();
    }, []);

    const formSearch = useForm({
        initialValues: {
            idbudget: "",
            month: (new Date().getMonth().toString().length === 1
                ? "0" + new Date().getMonth()
                : new Date().getMonth()
            ).toString(),
            year: (new Date().getFullYear()).toString(),
            //    type: "",
            //  yearend: (new Date().getFullYear()).toString(),
        },

        validate: {
            idbudget: isNotEmpty("กรุณาเลือกประเภทงบประมาณ"),
            month: isNotEmpty("กรุณาเลือกเดือน"),
            year: isNotEmpty("กรุณาเลือกปี"),
            //  type: isNotEmpty("กรุณาเลือกประเภทรายจ่าย"),
            //  yearend: isNotEmpty("กรุณาเลือกปี"),

        },
    });
    return (
        <>
            <Container p={0} bg={"white"} fluid>
                <Badge color="var(--primary)" variant="light" size="md" radius={8}>
                    นำเข้าข้อมูลเงินเดือน
                </Badge>

                <Paper mt={20} mb={20}>
                    <form
                        onSubmit={formSearch.onSubmit((v) => {
                            Fetchshowhistorysalarylist(v);
                            // console.log(v);
                        })}
                    >
                        <Grid>
                            <Grid.Col span={8}>
                                <Select searchable data={DataBudget} {...formSearch.getInputProps("idbudget")} label="งบประมาณ" />
                            </Grid.Col>
                        </Grid>
                        <Grid gutter={{ base: 5, xs: 'md', md: 'xl', xl: 50 }}>
                            <Grid.Col span={2} >
                                <Select searchable label="เดือน" data={selectmount} {...formSearch.getInputProps("month")} />

                            </Grid.Col>
                            <Grid.Col span={2}>
                                <Select searchable label="ปี" data={DataYear} {...formSearch.getInputProps("year")} />
                                {/* <Select searchable label="เลือกเดือนที่จะนำข้อมูลเข้า " data={selectmount} {...formSearch.getInputProps("monthend")}  />
                                <Select searchable label="ปี" data={DataYear} {...formSearch.getInputProps("yearend")} mt={10} /> */}
                            </Grid.Col>
                            {/* <Grid.Col span={4}>
                                 <Select searchable label="ประเภทรายจ่าย" data={Dataexpenditurelist} {...formSearch.getInputProps("type")}  />
                               
                            </Grid.Col> */}
                            <Grid.Col span={4}>
                                <Button type="submit" mt={33} leftSection={<IconSearch />}>
                                    ค้นหา
                                </Button>
                            </Grid.Col>
                        </Grid>

                    </form>

                  
                    {Salarylist.length !== 0 ? <>
                        <p className="mt-5">พบรายการเงินเดือน {Salarylist.length} รายการ</p>
                        <Button onClick={() => { ExcelExport() }} color="green" mt={10} leftSection={<IconDownload />}> ดาวน์โหลดข้อมูลเงินเดือน</Button>
                    </> : <></>}
                </Paper>


                <hr />
                <Paper pt={20} shadow="xl" p="xl">
                    <p>นำเข้าข้อมูลเงินเดือน</p>
                    <input type='file' onChange={(e) => Readfile(e)} />
                    <p className="mt-5">รายการนำเข้า {Tablelist.length} รายการ</p>

                    <form onSubmit={formSearch.onSubmit(submitdata)}>
                               <Button type="submit"   leftSection={<IconFolderUp />}>
                                    นำเข้าข้อมูล 
                                </Button>
                    </form>

                    <Grid justify="center">
                        <Grid.Col span={4} >

                            {/* <FileButton onChange={(e) => Readfile(e) } accept="image/png,image/jpeg,application/.xls,.xlsx">
                                {(props) => <Button {...props}>Upload image</Button>}
                                </FileButton> */}

                        </Grid.Col>
                    </Grid>
                    {/* {LoadTable ? (
                        <SkeletonTable />
                    ) : (
                        <MDBDataTableV5
                            data={Tablelist}
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

export default Uploadsalary;
