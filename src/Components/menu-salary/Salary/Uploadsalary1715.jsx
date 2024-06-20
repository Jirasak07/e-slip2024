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


function Uploadsalary1715() {

    const column = [
        {
            label: "#",
            field: "no",
            minimal: "lg",
        },
        {
            label: "เลขบัตร",
            field: "customers_citizent",
            minimal: "lg",
        },
        {
            label: "สายงาน",
            field: "customers_line",
            minimal: "lg",
        },
        {
            label: "คำนำหน้า",
            field: "customers_pname",
            minimal: "lg",
        },
        {
            label: "ชื่อ",
            field: "customers_name",
            minimal: "lg",
        },
        {
            label: "นามสกุล",
            field: "customers_lname",
            minimal: "lg",
        },
        {
            label: "เงินเดือนปัจจุบัน",
            field: "history_salary_salary",
            minimal: "lg",
        },
         {
            label: "เงินเดือน1.7/1.5",
            field: "history_salary_salary1715",
            minimal: "lg",
        },
        {
            label: "เงินเดือน 0.1",
            field: "history_salary_salary01",
            minimal: "lg",
        },
          {
            label: "เงินเลื่อนขั้น",
            field: "promotionmoney",
            minimal: "lg",
        },
          {
            label: "จำนวนเดือนตกเบิก",
            field: "numberofmonths",
            minimal: "lg",
        },
          {
            label: "เงินตกเบิก",
            field: "backpay",
            minimal: "lg",
        },
            {
            label: "เงินตกเบิก1.7/1.5",
            field: "backpay1715",
            minimal: "lg",
        },
        {
            label: "เงินตกเบิก01",
            field: "backpay01",
            minimal: "lg",
        },
        {
            label: "เงินตอบแทนพิเศษ",
            field: "compensation",
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

    const [DataTablelist, setDataTablelist] = useState([]);//alldate

      const [Datacompensation, setDatacompensation] = useState([]);//ค่าตอบแทนพิเศษ
      const [Databackpay, setDataDatabackpay] = useState([]);//ตกเบิก
      const [Databackpay01, setDataDatabackpay01] = useState([]);//ตกเบิก01
      const [Databackpay1715, setDataDatabackpay1715] = useState([]);//ตกเบิก1715

    //const [file, setFile] = useState<File | null>(null);
    const [file, setFile] = useState([]);



    const ExcelExport = () => {

        const workbook = new ExcelJs.Workbook();
        const sheet = workbook.addWorksheet("Mysheet");
        sheet.properties.defaultRowHeight = 15;

        sheet.columns = [
            {
                header: "เลขบัตร",
                key: "customers_citizent",
                width: 20
            },
            // {
            //     header: "history_salary_year",
            //     key: "history_salary_year",
            //     width: 20,
            // },
            // {
            //     header: "history_salary_month",
            //     key: "history_salary_month",
            //     width: 20,
            // },
            {
                header: "customers_type",
                key: "customers_type",
                width: 20,
            },
            {
                header: "customers_line",
                key: "customers_line",
                width: 20,
            },
            // {
            //     header: "idbudget",
            //     key: "idbudget",
            //     width: 20,
            // },
            {
                header: "คำนำหน้า",
                key: "customers_pname",
                width: 20,
            },
            {
                header: "ชื่อ",
                key: "customers_name",
                width: 20,
            },
            {
                header: "นามสกุล",
                key: "customers_lname",
                width: 20,
            },
            {
                header: "เงินเดือนบัจจุบัน",
                key: "history_salary_salary",
                width: 20,
            },
            {
                header: "เงินตอบแทนพิเศษ",
                key: "history_salary_salary1",
                width: 20,
            },
            {
                header: "เงินเลื่อนขั้น",
                key: "history_salary_salary2",
                width: 20,
            },
            {
                header: "จำนวนเดือนตกเบิก",
                key: "history_salary_salary3",
                width: 20,
            },
            
        ]

        Salarylist.map((i) => (
            sheet.addRow(
                {
                    customers_citizent: i.customers_citizent,
                    // history_salary_year: i.history_salary_year,
                    // history_salary_month: i.history_salary_month,
                    customers_type: i.customers_type,
                    customers_line: i.customers_line,
                    // idbudget: i.idbudget,
                    customers_pname: i.customers_pname,
                    customers_name: i.customers_name,
                    customers_lname: i.customers_lname,
                    history_salary_salary: i.history_salary_salary,
                    history_salary_salary1: '00.00',
                    history_salary_salary2: '00.00',
                    history_salary_salary3: ''
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
        setLoadTable(true);

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


                function round(number, num_digits) {
                    const decimalPlaces = 2;
                    const result = number.toFixed(decimalPlaces);

                    const factor = Math.pow(10, num_digits);
                    const result1 = Math.round(result * factor) / factor;
                    return result1.toFixed(decimalPlaces);
                }

                function round2(number) {
                    const decimalPlaces = 2;
                    const result = number.toFixed(decimalPlaces);
                    return result;
                }

               // const myArray = [];
               setLoadTable(false);
                const myArray = json.map((i) => ({

                    customers_citizent: i.เลขบัตร,
                    customers_type: i.customers_type,
                    customers_line: i.customers_line,
                    customers_pname: i.คำนำหน้า,
                    customers_name: i.ชื่อ,
                    customers_lname: i.นามสกุล,
                    history_salary_salary: i.เงินเดือนบัจจุบัน.toFixed(2),
                    history_salary_salary1715:i.customers_type === '4' ?
                     i.customers_line === '1' ? round(i.เงินเดือนบัจจุบัน*1.7/1.6,-1) :
                     round(i.เงินเดือนบัจจุบัน*1.5/1.4,-1) 
                    :'0.00',
                    history_salary_salary01:i.customers_type === '4' ?
                    i.customers_line === '1' ? (round(i.เงินเดือนบัจจุบัน*1.7/1.6,-1)-i.เงินเดือนบัจจุบัน).toFixed(2) :
                    (round(i.เงินเดือนบัจจุบัน*1.5/1.4,-1) - i.เงินเดือนบัจจุบัน).toFixed(2)
                   :'0.00',
                    promotionmoney: i.เงินเลื่อนขั้น.toFixed(2),
                    numberofmonths: i.จำนวนเดือนตกเบิก,
                    backpay: i.เงินเลื่อนขั้น*i.จำนวนเดือนตกเบิก === 0 || i.เงินเลื่อนขั้น*i.จำนวนเดือนตกเบิก === '' ? '0.00' : i.เงินเลื่อนขั้น*i.จำนวนเดือนตกเบิก,//ตกเบิก
                    backpay1715: i.customers_type === '4' ?
                    i.customers_line === '1' ?   round((i.เงินเลื่อนขั้น*i.จำนวนเดือนตกเบิก)*1.7/1.6,-1):  round((i.เงินเลื่อนขั้น*i.จำนวนเดือนตกเบิก)*1.5/1.4,-1)
                    :'0.00',//ตกเบิก1715
                    backpay01: i.customers_type === '4' ?
                    i.customers_line === '1' ?   (round((i.เงินเลื่อนขั้น*i.จำนวนเดือนตกเบิก)*1.7/1.6,-1))-(i.เงินเลื่อนขั้น*i.จำนวนเดือนตกเบิก)  :  (round((i.เงินเลื่อนขั้น*i.จำนวนเดือนตกเบิก)*1.5/1.4,-1))-(i.เงินเลื่อนขั้น*i.จำนวนเดือนตกเบิก) 
                    :'0.00',//ตกเบิก01
                    compensation: i.เงินตอบแทนพิเศษ === 0 || i.เงินตอบแทนพิเศษ === '' ? '0.00' : i.เงินตอบแทนพิเศษ
                    
                    
                }));

                //Addhistorysalaryincrease  --logทั้งหมด
                //Addhistorysalarymonth   --เพิ่มเงินเดือนปกติและ 1.7/1.5
                //Addrevenueforid --เพิ่มรายรับid 20 15 99 100
 
                 //filter ค่าตอบแทนพิเศษ id = '20'
                 const compensation = myArray.filter((salary) => salary.compensation > 0 || salary.compensation !== '')
                // console.log(compensation)
                 setDatacompensation(compensation)

                 //filter ตกเบิกปกติ id = '15'
                 const backpay = myArray.filter((salary) => salary.backpay > 0 || salary.backpay !== '')
                // console.log(backpay)
                 setDataDatabackpay(backpay)

                 //filter ตกเบิกปกติ0.1 id = '99'
                 const backpay01 = myArray.filter((salary) => salary.backpay01 > 0 || salary.backpay01 !== '')
                // console.log(backpay01)
                 setDataDatabackpay01(backpay01)

                 //filter ตกเบิกปกติ 1.7/1.5 id = '100'
                 const backpay1715 = myArray.filter((salary) => salary.backpay1715 > 0 || salary.backpay1715 !== '')
                // console.log(backpay1715)
                 setDataDatabackpay1715(backpay1715)



                setDataTablelist(myArray)
  
                //ใช้โชว์ข้อมูล
                setTablelist({
                    columns: column,
                    rows: [
                        ...json.map((i, key) => ({
                            no: key + 1,
                            customers_citizent: i.เลขบัตร,
                            customers_type: i.customers_type,
                            customers_line: i.customers_line === '1'?<Text c="blue">สายวิชาการ</Text>:<Text c="red.9">สายสนับสนุน</Text>,
                            customers_pname: i.คำนำหน้า,
                            customers_name: i.ชื่อ,
                            customers_lname: i.นามสกุล,
                            history_salary_salary: <Text c="teal.8"><NumberFormatter thousandSeparator value={i.เงินเดือนบัจจุบัน} decimalScale={2} /></Text> ,
                            history_salary_salary1715:i.customers_type === '4' ?
                            i.customers_line === '1' ? <NumberFormatter thousandSeparator value={round(i.เงินเดือนบัจจุบัน*1.7/1.6,-1)} decimalScale={2} /> :
                            <NumberFormatter thousandSeparator value={round(i.เงินเดือนบัจจุบัน*1.5/1.4,-1) } decimalScale={2}/>
                            :'-',

                            history_salary_salary01:i.customers_type === '4' ?
                            i.customers_line === '1' ? <NumberFormatter thousandSeparator value={(round(i.เงินเดือนบัจจุบัน*1.7/1.6,-1)-i.เงินเดือนบัจจุบัน)} decimalScale={2} /> :
                            <NumberFormatter thousandSeparator value={(round(i.เงินเดือนบัจจุบัน*1.5/1.4,-1)-i.เงินเดือนบัจจุบัน) } decimalScale={2}/>
                            :'-',

                            promotionmoney: i.เงินเลื่อนขั้น,
                            numberofmonths: i.จำนวนเดือนตกเบิก,
                            backpay: <NumberFormatter thousandSeparator value={i.เงินเลื่อนขั้น*i.จำนวนเดือนตกเบิก} decimalScale={2}/>,//ตกเบิก
                            backpay1715: i.customers_type === '4' ?
                            i.customers_line === '1' ? <NumberFormatter thousandSeparator value={round((i.เงินเลื่อนขั้น*i.จำนวนเดือนตกเบิก)*1.7/1.6,-1 )} decimalScale={2}/>:<NumberFormatter thousandSeparator value={round((i.เงินเลื่อนขั้น*i.จำนวนเดือนตกเบิก)*1.5/1.4,-1)} decimalScale={2}/>
                           :'-',//ตกเบิก1715
                           backpay01: i.customers_type === '4' ?
                           i.customers_line === '1' ? <NumberFormatter thousandSeparator value={(round((i.เงินเลื่อนขั้น*i.จำนวนเดือนตกเบิก)*1.7/1.6,-1))-(i.เงินเลื่อนขั้น*i.จำนวนเดือนตกเบิก) } decimalScale={2}/>:<NumberFormatter thousandSeparator value={(round((i.เงินเลื่อนขั้น*i.จำนวนเดือนตกเบิก)*1.5/1.4,-1))-(i.เงินเลื่อนขั้น*i.จำนวนเดือนตกเบิก) } decimalScale={2}/>
                          :'-',//ตกเบิก1715

                           compensation:<NumberFormatter thousandSeparator value={i.เงินตอบแทนพิเศษ} decimalScale={2} />,

                        })),
                    ],
                });
              
                console.log(myArray);
                


                //setTablelist(json);
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
        console.log(initialValues.month)
        console.log(initialValues.idbudget)
      
       
        //  if (DataTablelist.length === 477) {

       if (DataTablelist.length !== 0) {
        Swal.fire({
            title: "กรุณากรอกรหัสความปลอดภัย",
            input: "password",
            inputAttributes: {
              autocapitalize: "off"
            },
            showCancelButton: true,
            confirmButtonText: "ยืนยัน",
            showLoaderOnConfirm: true,
            // preConfirm: async (login) => {
            //   try {
            //   if (login ==='1234') {
            //     return true
            //   }
            //   } catch (error) {
            //     Swal.showValidationMessage(`
            //       Request failed: ${error}
            //     `);
            //   }
            // },
          //  allowOutsideClick: () => !Swal.isLoading()
          }).then((result) => {
            console.log(result)
            if (result.isConfirmed && result.value === 'lovekpru') {
            //   Swal.fire({
            //     title: `${result.value.login}'s avatar`,
            //     imageUrl: result.value.avatar_url
            //   });
                Swal.fire({
                title: 'ระบบปลดล็อคถูกต้อง',
                icon: 'success',
               // confirmButtonText: 'ตกลง',
               showConfirmButton:false,timer:1000,timerProgressBar:true
            }).then((result) => {



            console.log('ok')
            //logทั้งหมด
            const form = DataTablelist
             axios.post(API + "/index/Addhistorysalaryincrease", {
                 month: initialValues.month,
                 year: initialValues.year,
                 idbudget: initialValues.idbudget,
                 user_update: localStorage.getItem("employee_id"),
                 check: form,
            }).then((res) => {
                         //เงินเดือนปกติและ 1.7/1.5
                        const form = DataTablelist
                        axios.post(API + "/index/Addhistorysalarymonth", {
                            month: initialValues.month,
                            year: initialValues.year,
                            idbudget: initialValues.idbudget,
                            check: form,
                        }).then((res) => {
                                        //ค่าตอบแทนพิเศษ
                                        const form = Datacompensation
                                        axios.post(API + "/index/Addrevenueforid", {
                                            month: initialValues.month,
                                            year: initialValues.year,
                                            idbudget: initialValues.idbudget,
                                            idpayslip_revenue: '20',
                                            check: form,
                                        }).then((res) => {
                                                          //ค่าตกเบิกปกติ
                                                            const form = Databackpay
                                                            axios.post(API + "/index/Addrevenueforid", {
                                                                month: initialValues.month,
                                                                year: initialValues.year,
                                                                idbudget: initialValues.idbudget,
                                                                idpayslip_revenue: '15',
                                                                check: form,
                                                            }).then((res) => {
                                                                            //ค่าตกเบิก1715
                                                                            const form = Databackpay1715
                                                                            axios.post(API + "/index/Addrevenueforid", {
                                                                                month: initialValues.month,
                                                                                year: initialValues.year,
                                                                                idbudget: initialValues.idbudget,
                                                                                idpayslip_revenue: '99',
                                                                                check: form,
                                                                            }).then((res) => {
                                                                                       //ค่าตกเบิก01
                                                                                        const form = Databackpay01
                                                                                        axios.post(API + "/index/Addrevenueforid", {
                                                                                            month: initialValues.month,
                                                                                            year: initialValues.year,
                                                                                            idbudget: initialValues.idbudget,
                                                                                            idpayslip_revenue: '100',
                                                                                            check: form,
                                                                                        }).then((res) => {
                                                                                                   Swal.fire({
                                                                                                        title: 'อัพเดทข้อมูลสำเร็จ',
                                                                                                        icon: 'success',
                                                                                                        confirmButtonText: 'ตกลง',
                                                                                                    }).then((result) => {
                                                                                                        
                                                                                                    })
                                                                                        }) 
                                                                                            
                                                                            
                                                                            })           
                                                            
                                                            })         
                                        
                                        })   
                        })
            
             })




//ปิดaleart
            })
        }else{
               Swal.fire({
                title: 'รหัสความปลอดภัยไม่ถูกต้อง',
                icon: 'error',
                confirmButtonText: 'ตกลง',
            }).then((result) => {
                
            })
        }
      
      });



        }else{
            Swal.fire({
                        title: 'กรุณาอัพโหลดไฟล์เงินเดือน',
                        icon: 'warning',
                        confirmButtonText: 'ตกลง',
                    }).then((result) => {
                        
                    })



         
        }


        // const form = Tablelist
      
        // console.log(Tablelist)
        // axios.post(API + "/index/Addhistorysalarymonth", {
        //     month: initialValues.month,
        //     year: initialValues.year,
        //     check: form,
        // }).then((res) => {
        //     Swal.fire({
        //         title: 'อัพเดทข้อมูลสำเร็จ',
        //         icon: 'success',
        //         confirmButtonText: 'ตกลง',
        //     }).then((result) => {
                
        //     })
        //     console.log(res.data)
        // })


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
                    <p className="mt-5">รายการนำเข้า {DataTablelist.length} รายการ</p>

                 
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

export default Uploadsalary1715;
