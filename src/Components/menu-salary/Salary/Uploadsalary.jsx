import { Badge, Button, Container, Paper, Select, SimpleGrid, Flex, NumberFormatter, Grid,  FileButton,  Group } from "@mantine/core";
import { isNotEmpty, useForm  } from "@mantine/form";
import { IconSearch, IconPrinter } from "@tabler/icons-react";
import { MDBDataTableV5 } from "mdbreact";
import { useEffect, useState } from "react";
import { API } from "../../Config/ConfigApi";
import axios from "axios";
import Swal from "sweetalert2";
import { Text } from "@mantine/core";
import SkeletonTable from "../../Publicc-user/SkeletonTable";
import ExcelJs from 'exceljs'



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
    const [DataTotalsummary, setDataTotalsummary] = useState([]);
    const [Dataexpenditurelist, setDataexpenditurelist] = useState([]);
    const [Tablelist, setTablelist] = useState({
        columns: column,
        rows: [
          
        ],
    });

    //const [file, setFile] = useState<File | null>(null);
    const [file, setFile] = useState([]);

   

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

    const Readfile = (e) => {
        // v.preventDefault();
    //     const workbook = new ExcelJs.Workbook();
    //     workbook.xlsx.load(v);
    //     const json = JSON.stringify(workbook.model);
    //    console.log(json);
    const file = e.target.files[0];
    const wb = new ExcelJs.Workbook();
    const reader = new FileReader();

    reader.readAsArrayBuffer(file);
    reader.onload = () => {
        const buffer = reader.result;
        wb.xlsx.load(buffer).then((workbook) => {
            console.log(workbook, 'workbook instance');
             workbook.eachSheet((sheet, id) => {
                sheet.eachRow((row, rowIndex) => {
                    console.log(row.values );
                });
            });
        });
       console.log(workbook);
      //workbook.xlsx.load(buffer);
     // const json = JSON.stringify(wb);
     // console.log(json);
    };


    };

    const searchdata = (value) => {
   
        setLoadTable(true);
        
            axios.post(API+"/index/showhTotalsummaryrevenuelist",{
                month:value.month,
                year:value.year,
                type:value.type,
                idbudget:value.idbudget
               
              }).then((res)=>{
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

    const submitdata = (value) => {
        // console.log(value.type_employ);
        // console.log(value.month);
        // console.log(value.year);
        // console.log(value.monthend);
        // console.log(value.yearend);


        const form = Datasalarystart
        console.log(value.values)
        console.log(form)
        axios.post(API+"/index/Addhistorysalarymonth",{
          month:value.values.monthend,
          year:value.values.yearend,
          check: form,
        }).then((res)=>{
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
            idbudget: "",
            month: (new Date().getMonth().toString().length === 1
                ? "0" + new Date().getMonth()
                : new Date().getMonth()
            ).toString(),
            year: (new Date().getFullYear()).toString(),
            type: "",
      //  yearend: (new Date().getFullYear()).toString(),
        },

        validate: {
            idbudget: isNotEmpty("กรุณาเลือกประเภทงบประมาณ"),
            month: isNotEmpty("กรุณาเลือกเดือน"),
            year: isNotEmpty("กรุณาเลือกปี"),
            type: isNotEmpty("กรุณาเลือกประเภทรายจ่าย"),
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
                            searchdata(v);
                            // console.log(v);
                        })}
                    >
                        <Grid>
                            <Grid.Col span={8}>
                                <Select data={DataBudget} {...formSearch.getInputProps("idbudget")} label="งบประมาณ" />
                            </Grid.Col>
                        </Grid>
                        <Grid gutter={{ base: 5, xs: 'md', md: 'xl', xl: 50  }}>
                            <Grid.Col span={2} >
                                <Select label="เดือน" data={selectmount} {...formSearch.getInputProps("month")} />
                               
                            </Grid.Col>
                            <Grid.Col span={2}>
                                 <Select label="ปี" data={DataYear} {...formSearch.getInputProps("year")}  />
                                {/* <Select label="เลือกเดือนที่จะนำข้อมูลเข้า " data={selectmount} {...formSearch.getInputProps("monthend")}  />
                                <Select label="ปี" data={DataYear} {...formSearch.getInputProps("yearend")} mt={10} /> */}
                            </Grid.Col>
                            <Grid.Col span={4}>
                                 <Select label="ประเภทรายจ่าย" data={Dataexpenditurelist} {...formSearch.getInputProps("type")}  />
                                {/* <Select label="เลือกเดือนที่จะนำข้อมูลเข้า " data={selectmount} {...formSearch.getInputProps("monthend")}  />
                                <Select label="ปี" data={DataYear} {...formSearch.getInputProps("yearend")} mt={10} /> */}
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

                             {/* <FileButton onChange={(e) => Readfile(e) } accept="image/png,image/jpeg,application/.xls,.xlsx">
                                {(props) => <Button {...props}>Upload image</Button>}
                                </FileButton> */}
 <input type='file' onChange={(e) => Readfile(e)} />

                        
                            </Grid.Col>
                        </Grid>
                    {LoadTable ? (
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
                    )}
                </Paper>
            </Container>
        </>
    );
}

export default Uploadsalary;
