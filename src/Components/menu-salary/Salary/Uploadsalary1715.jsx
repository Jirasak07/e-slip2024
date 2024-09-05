import {
  Badge,
  Button,
  Container,
  Paper,
  Select,
  SimpleGrid,
  Flex,
  NumberFormatter,
  Grid,
  FileButton,
  Group,
  LoadingOverlay,
  ActionIcon,
  MultiSelect,
} from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import {
  IconSearch,
  IconDownload,
  IconFolderUp,
  IconFile,
  IconQuestionMark,
  IconFileSpreadsheet,
} from "@tabler/icons-react";
import { MDBDataTableV5 } from "mdbreact";
import { useEffect, useState } from "react";
import { API } from "../../Config/ConfigApi";
import axios from "axios";
import Swal from "sweetalert2";
import { Text } from "@mantine/core";
import SkeletonTable from "../../Publicc-user/SkeletonTable";
import ExcelJs from "exceljs";
//import { read, writeFileXLSX } from "xlsx";
import * as xlsx from "xlsx";

function Uploadsalary1715() {
  const [files, setFiles] = useState(null);
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
    {
      label: "ตกเบิกเงินตอบแทนพิเศษ",
      field: "compensation2",
      minimal: "lg",
    },
  ];

  const columns = [
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
    {
      label: "ค่าเช่าบ้าน",
      field: "chao",
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

  const [DataTablelist, setDataTablelist] = useState([]); //alldate

  const [Datacompensation, setDatacompensation] = useState([]); //ค่าตอบแทนพิเศษ
  const [Datacompensation2, setDatacompensation2] = useState([]); //ค่าตอบแทนพิเศษ
  const [Databackpay, setDataDatabackpay] = useState([]); //ตกเบิก
  const [Databackpay01, setDataDatabackpay01] = useState([]); //ตกเบิก01
  const [Databackpay1715, setDataDatabackpay1715] = useState([]); //ตกเบิก1715
  const [DataChao, setDataDataChao] = useState([]); //ค่าเช้าบ้าน

  const [NameBudget, setNameBudget] = useState("");
  const [Namemount, setNamemount] = useState("");
  const [Nameyear, setNameyear] = useState("");
  const [Nametype, setNametype] = useState("");
  //const [file, setFile] = useState<File | null>(null);
  const [file, setFile] = useState([]);

  const ExcelExport = () => {
    const workbook = new ExcelJs.Workbook();
    const sheet = workbook.addWorksheet("Mysheet");
    sheet.properties.defaultRowHeight = 15;
    sheet.getCell("H1").fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "a9dfbf" },
      bgColor: { argb: "FF0000FF" },
    };
    sheet.getCell("I1").fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "a9dfbf" },
      bgColor: { argb: "FF0000FF" },
    };
    sheet.getCell("J1").fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "a9dfbf" },
      bgColor: { argb: "FF0000FF" },
    };
    sheet.getCell("K1").fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "a9dfbf" },
      bgColor: { argb: "FF0000FF" },
    };

    sheet.columns = [
      {
        header: "เลขที่ตำแหน่ง",
        key: "customers_positionnumber",
        width: 20,
      },
      {
        header: "เลขบัตร",
        key: "customers_citizent",
        width: 20,
      },

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
    ];

    Salarylist.map((i) =>
      sheet.addRow({
        customers_positionnumber: i.customers_positionnumber,
        customers_citizent: i.customers_citizent,

        customers_type: i.customers_type,
        customers_line: i.customers_line,
        customers_pname: i.customers_pname,
        customers_name: i.customers_name,
        customers_lname: i.customers_lname,
        history_salary_salary: i.history_salary_salary,
        history_salary_salary1: "00.00",
        history_salary_salary2: "00.00",
        history_salary_salary3: "0",
      })
    );

    workbook.xlsx.writeBuffer().then((data) => {
      const blob = new Blob([data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheet.sheet",
      });
      const url = window.URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download =
        "ข้อมูลเงินเดือนงบ" +
        NameBudget +
        "-ประเภท" +
        Nametype +
        "-ปี " +
        Nameyear +
        "-เดือน " +
        Namemount +
        ".xlsx";
      DataYear;
      anchor.click();
      window.URL.revokeObjectURL(url);
    });
  };

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
            label: i.namebudget + " ( " + i.idbudget + " ) ",
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
          // setDataexpenditurelist(select);
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

    // e.preventDefault();
    if (e) {
      // if (e.target.files) {
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

        // function round2(number) {
        //   const decimalPlaces = 2;
        //   const result = number.toFixed(decimalPlaces);
        //   return result;
        // }

        // const myArray = [];
        setLoadTable(false);
        const myArray = json.map((i) => ({
          customers_citizent: i.เลขบัตร,
          customers_type: i.customers_type,
          customers_line: i.customers_line,
          customers_pname: i.คำนำหน้า,
          customers_name: i.ชื่อ,
          customers_lname: i.นามสกุล,
          history_salary_salary: parseFloat(i.เงินเดือนบัจจุบัน).toFixed(2),
          history_salary_salary1715:
            i.customers_type === "4" || i.customers_type === 4
              ? i.customers_line === 1 || i.customers_line === "1"
                ? round((i.เงินเดือนบัจจุบัน * 1.7) / 1.6, -1)
                : round((i.เงินเดือนบัจจุบัน * 1.5) / 1.4, -1)
              : "0.00",
          history_salary_salary01:
            i.customers_type === "4" || i.customers_type === 4
              ? i.customers_line === 1 || i.customers_line === "1"
                ? (round((i.เงินเดือนบัจจุบัน * 1.7) / 1.6, -1) - i.เงินเดือนบัจจุบัน).toFixed(2)
                : (round((i.เงินเดือนบัจจุบัน * 1.5) / 1.4, -1) - i.เงินเดือนบัจจุบัน).toFixed(2)
              : "0.00",
          promotionmoney: parseFloat(i.เงินเลื่อนขั้น).toFixed(2),
          numberofmonths: i.จำนวนเดือนตกเบิก,
          backpay:
            i.เงินเลื่อนขั้น * i.จำนวนเดือนตกเบิก === 0 ||
            i.เงินเลื่อนขั้น * i.จำนวนเดือนตกเบิก === ""
              ? "0.00"
              : i.เงินเลื่อนขั้น * i.จำนวนเดือนตกเบิก, //ตกเบิก
          backpay1715:
            i.customers_type === "4" || i.customers_type === 4
              ? i.customers_line === 1 || i.customers_line === "1"
                ? round((i.เงินเลื่อนขั้น * i.จำนวนเดือนตกเบิก * 1.7) / 1.6, -1)
                : round((i.เงินเลื่อนขั้น * i.จำนวนเดือนตกเบิก * 1.5) / 1.4, -1)
              : "0.00", //ตกเบิก1715
          backpay01:
            i.customers_type === "4" || i.customers_type === 4
              ? i.customers_line === 1 || i.customers_line === "1"
                ? round((i.เงินเลื่อนขั้น * i.จำนวนเดือนตกเบิก * 1.7) / 1.6, -1) -
                  i.เงินเลื่อนขั้น * i.จำนวนเดือนตกเบิก
                : round((i.เงินเลื่อนขั้น * i.จำนวนเดือนตกเบิก * 1.5) / 1.4, -1) -
                  i.เงินเลื่อนขั้น * i.จำนวนเดือนตกเบิก
              : "0.00", //ตกเบิก01
          compensation:
            i.เงินตอบแทนพิเศษ === 0 ||
            i.เงินตอบแทนพิเศษ === "" ||
            i.เงินตอบแทนพิเศษ === undefined ||
            i.เงินตอบแทนพิเศษ === null
              ? "0.00"
              : i.เงินตอบแทนพิเศษ,
          chao: i.ค่าเช่าบ้าน,
          compensation2:
            i.เงินตอบแทนพิเศษ === 0 ||
            i.เงินตอบแทนพิเศษ === "" ||
            i.เงินตอบแทนพิเศษ === undefined ||
            i.เงินตอบแทนพิเศษ === null
              ? "0.00"
              : i.เงินตอบแทนพิเศษ * i.จำนวนเดือนตกเบิก,
        }));

        //Addhistorysalaryincrease  --logทั้งหมด
        //Addhistorysalarymonth   --เพิ่มเงินเดือนปกติและ 1.7/1.5
        //Addrevenueforid --เพิ่มรายรับid 20 15 99 100

        //filter ค่าตอบแทนพิเศษ id = '20'
        const compensation = myArray.filter(
          (salary) => salary.compensation > 0 || salary.compensation !== ""
        );
        // console.log(compensation)
        setDatacompensation(compensation);

        //filter ตกเบิกปกติ id = '15'
        const backpay = myArray.filter((salary) => salary.backpay > 0 || salary.backpay !== "");
        // console.log(backpay)
        setDataDatabackpay(backpay);

        //filter ตกเบิกปกติ0.1 id = '99'
        const backpay01 = myArray.filter(
          (salary) => salary.backpay01 > 0 || salary.backpay01 !== ""
        );
        // console.log(backpay01)
        setDataDatabackpay01(backpay01);

        //filter ตกเบิกปกติ 1.7/1.5 id = '100'
        const backpay1715 = myArray.filter(
          (salary) => salary.backpay1715 > 0 || salary.backpay1715 !== ""
        );
        // console.log(backpay1715)
        setDataDatabackpay1715(backpay1715);

        //////////////////////////////////////////////////////////////

        const DataChaos = myArray.filter(
          (salary) =>
            (salary.chao > 0 || salary.chao !== "") &&
            (salary.customers_type === "7" || salary.customers_type === 7)
        );
        // console.log(backpay1715)
        setDataDataChao(DataChaos);

        setDataTablelist(myArray);

        //filter ตกเบิกค่าตอบแทนพิเศษ id = '44'
        const compensation2 = myArray.filter(
          (salary) => salary.compensation2 > 0 || salary.compensation2 !== ""
        );
        // console.log(compensation)
        setDatacompensation2(compensation2);

        //ใช้โชว์ข้อมูล
        setTablelist({
          columns: DataChaos.length > 0 ? columns : column,
          rows: [
            ...json.map((i, key) => ({
              no: key + 1,
              customers_citizent: i.เลขบัตร,
              customers_type: i.customers_type,
              customers_line:
                i.customers_line === 1 || i.customers_line === "1" ? (
                  <Text c="blue">สายวิชาการ</Text>
                ) : (
                  <Text c="red.9">สายสนับสนุน</Text>
                ),
              customers_pname: i.คำนำหน้า,
              customers_name: i.ชื่อ,
              customers_lname: i.นามสกุล,
              history_salary_salary: (
                <Text c="teal.8">
                  <NumberFormatter thousandSeparator value={i.เงินเดือนบัจจุบัน} decimalScale={2} />
                </Text>
              ),
              history_salary_salary1715:
                i.customers_type === "4" || i.customers_type === 4 ? (
                  i.customers_line === 1 || i.customers_line === "1" ? (
                    <NumberFormatter
                      thousandSeparator
                      value={round((parseFloat(i.เงินเดือนบัจจุบัน) * 1.7) / 1.6, -1)}
                      decimalScale={2}
                    />
                  ) : (
                    <NumberFormatter
                      thousandSeparator
                      value={round((i.เงินเดือนบัจจุบัน * 1.5) / 1.4, -1)}
                      decimalScale={2}
                    />
                  )
                ) : (
                  "-"
                ),

              history_salary_salary01:
                i.customers_type === "4" || i.customers_type === 4 ? (
                  i.customers_line === 1 || i.customers_line === "1" ? (
                    <NumberFormatter
                      thousandSeparator
                      value={round((i.เงินเดือนบัจจุบัน * 1.7) / 1.6, -1) - i.เงินเดือนบัจจุบัน}
                      decimalScale={2}
                    />
                  ) : (
                    <NumberFormatter
                      thousandSeparator
                      value={round((i.เงินเดือนบัจจุบัน * 1.5) / 1.4, -1) - i.เงินเดือนบัจจุบัน}
                      decimalScale={2}
                    />
                  )
                ) : (
                  "-"
                ),

              promotionmoney: i.เงินเลื่อนขั้น,
              numberofmonths: i.จำนวนเดือนตกเบิก,
              backpay: (
                <NumberFormatter
                  thousandSeparator
                  value={i.เงินเลื่อนขั้น * i.จำนวนเดือนตกเบิก}
                  decimalScale={2}
                />
              ), //ตกเบิก
              backpay1715:
                i.customers_type === "4" || i.customers_type === 4 ? (
                  i.customers_line === 1 ? (
                    <NumberFormatter
                      thousandSeparator
                      value={round(
                        (Number(i.เงินเลื่อนขั้น) * Number(i.จำนวนเดือนตกเบิก) * 1.7) / 1.6,
                        -1
                      )}
                      decimalScale={2}
                    />
                  ) : (
                    <NumberFormatter
                      thousandSeparator
                      value={round((i.เงินเลื่อนขั้น * i.จำนวนเดือนตกเบิก * 1.5) / 1.4, -1)}
                      decimalScale={2}
                    />
                  )
                ) : (
                  "-"
                ), //ตกเบิก1715
              backpay01:
                i.customers_type === "4" || i.customers_type === 4 ? (
                  i.customers_line === 1 ? (
                    <NumberFormatter
                      thousandSeparator
                      value={
                        round((i.เงินเลื่อนขั้น * i.จำนวนเดือนตกเบิก * 1.7) / 1.6, -1) -
                        i.เงินเลื่อนขั้น * i.จำนวนเดือนตกเบิก
                      }
                      decimalScale={2}
                    />
                  ) : (
                    <NumberFormatter
                      thousandSeparator
                      value={
                        round((i.เงินเลื่อนขั้น * i.จำนวนเดือนตกเบิก * 1.5) / 1.4, -1) -
                        i.เงินเลื่อนขั้น * i.จำนวนเดือนตกเบิก
                      }
                      decimalScale={2}
                    />
                  )
                ) : (
                  "-"
                ), //ตกเบิก1715

              compensation: (
                <NumberFormatter thousandSeparator value={i.เงินตอบแทนพิเศษ} decimalScale={2} />
              ),
              chao: i.ค่าเช่าบ้าน,
              compensation2: (
                <NumberFormatter
                  thousandSeparator
                  value={i.เงินตอบแทนพิเศษ * i.จำนวนเดือนตกเบิก}
                  decimalScale={2}
                />
              ),
            })),
          ],
        });

        console.log(myArray);

        //setTablelist(json);
      };
      // reader.readAsArrayBuffer(e.target.files[0]);
      reader.readAsArrayBuffer(e);
    }
  };

  const searchdata = (value) => {
    setLoadTable(true);

    axios
      .post(API + "/index/showhTotalsummaryrevenuelist", {
        month: value.month,
        year: value.year,
        type: value.type,
        idbudget: value.idbudget,
      })
      .then((res) => {
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
                total_in: (
                  <Text c="teal.8">
                    <NumberFormatter thousandSeparator value={i.total_in} />
                  </Text>
                ),
                total: (
                  <Text c="red.9">
                    <NumberFormatter thousandSeparator value={i.total} />
                  </Text>
                ),
              })),
            ],
          });

          setDataTotalsummary(res.data);
        }
      });
  };
  const [LoadSubmit, setLoadSubmit] = useState(false);
  const submitdata = (initialValues) => {
    console.log(initialValues.year);
    console.log(initialValues.month);
    console.log(initialValues.idbudget);
    if (DataTablelist.length !== 0) {
      Swal.fire({
        title: "กรุณากรอกรหัสความปลอดภัย",
        input: "password",
        inputAttributes: {
          autocapitalize: "off",
        },
        showCancelButton: true,
        confirmButtonText: "ยืนยัน",
        showLoaderOnConfirm: true,
      }).then((result) => {
        console.log(result);
        if (result.isConfirmed && result.value === "lovekpru") {
          Swal.fire({
            title: "ระบบปลดล็อคถูกต้อง",
            icon: "success",
            showConfirmButton: false,
            timer: 600,
            timerProgressBar: true,
          }).then((result) => {
            setLoadSubmit(true);

            console.log("ok");
            //logทั้งหมด
            const form = DataTablelist;
            axios
              .post(API + "/index/Addhistorysalaryincrease", {
                month: initialValues.month,
                year: initialValues.year,
                idbudget: initialValues.idbudget,
                user_update: localStorage.getItem("employee_id"),
                check: form,
              })
              .then((res) => {
                //เงินเดือนปกติและ 1.7/1.5
                const form = DataTablelist;
                axios
                  .post(API + "/index/Addhistorysalarymonth", {
                    month: initialValues.month,
                    year: initialValues.year,
                    idbudget: initialValues.idbudget,
                    check: form,
                  })
                  .then((res) => {
                    //ค่าตอบแทนพิเศษ
                    const form = Datacompensation;
                    axios
                      .post(API + "/index/Addrevenueforid", {
                        month: initialValues.month,
                        year: initialValues.year,
                        idbudget: initialValues.idbudget,
                        idpayslip_revenue: "20",
                        check: form,
                      })
                      .then((res) => {
                        //ค่าตกเบิกปกติ
                        const form = Databackpay;
                        axios
                          .post(API + "/index/Addrevenueforid", {
                            month: initialValues.month,
                            year: initialValues.year,
                            idbudget: initialValues.idbudget,
                            idpayslip_revenue: "15",
                            check: form,
                          })
                          .then((res) => {
                            //ค่าตกเบิก1715
                            const form = Databackpay1715;
                            axios
                              .post(API + "/index/Addrevenueforid", {
                                month: initialValues.month,
                                year: initialValues.year,
                                idbudget: initialValues.idbudget,
                                idpayslip_revenue: "99",
                                check: form,
                              })
                              .then((res) => {
                                //ค่าตกเบิก01
                                const form = Databackpay01;
                                axios
                                  .post(API + "/index/Addrevenueforid", {
                                    month: initialValues.month,
                                    year: initialValues.year,
                                    idbudget: initialValues.idbudget,
                                    idpayslip_revenue: "100",
                                    check: form,
                                  })
                                  .then((res) => {
                                    if (DataChao.length > 0) {
                                      const form = DataChao;
                                      axios
                                        .post(API + "/index/Addrevenueforid", {
                                          month: initialValues.month,
                                          year: initialValues.year,
                                          idbudget: initialValues.idbudget,
                                          idpayslip_revenue: "50",
                                          check: form,
                                        })
                                        .then((res) => {
                                          setLoadSubmit(false);
                                          Swal.fire({
                                            title: "อัพเดทข้อมูลสำเร็จ",
                                            icon: "success",
                                            confirmButtonText: "ตกลง",
                                          }).then((result) => {
                                            // setTablelist({
                                            //   columns: column,
                                            //   rows: [],
                                            // });
                                            setSalarylist([]);
                                            window.location.reload();
                                          });
                                        });
                                    } else {
                                      //ตกเบิกค่าตอบแทนพิเศษ
                                      const form = Datacompensation2;
                                      axios
                                        .post(API + "/index/Addrevenueforid", {
                                          month: initialValues.month,
                                          year: initialValues.year,
                                          idbudget: initialValues.idbudget,
                                          idpayslip_revenue: "44",
                                          check: form,
                                        })
                                        .then((res) => {
                                          setLoadSubmit(false);
                                          Swal.fire({
                                            title: "อัพเดทข้อมูลสำเร็จ",
                                            icon: "success",
                                            confirmButtonText: "ตกลง",
                                          }).then((result) => {
                                            // setTablelist({
                                            //   columns: column,
                                            //   rows: [],
                                            // });
                                            setSalarylist([]);
                                            window.location.reload();
                                          });
                                        });
                                    }
                                  });
                              });
                          });
                      });
                  });
              });

            //ปิดaleart
          });
        } else {
          Swal.fire({
            title: "รหัสความปลอดภัยไม่ถูกต้อง",
            icon: "error",
            confirmButtonText: "ตกลง",
          }).then((result) => {});
        }
      });
    } else {
      Swal.fire({
        title: "กรุณาอัพโหลดไฟล์เงินเดือน",
        icon: "warning",
        confirmButtonText: "ตกลง",
      }).then((result) => {});
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
    setNameBudget(value.idbudget);
    setNamemount(value.month);
    setNameyear(value.year);

    // setLoadTable(true);
    console.log(value.customertype);
    let text = "";
    value.customertype.forEach((i, k) => {
      if (k + 1 === value.customertype.length) {
        text += "'" + i + "'";
      } else {
        text += "'" + i + "',";
      }
    });
    console.log(text);
    setNametype(text);

    setTimeout(() => {
      axios
        .get(
          API +
            "/index/showhistorysalarylist/" +
            value.year +
            "/" +
            value.month +
            "/" +
            value.idbudget +
            "/" +
            text
        )
        .then((res) => {
          // console.log(res.data);
          const data = res.data;
          if (data.length !== 0) {
            // setLoadTable(false);
            // const select = data.map((i) => ({
            //     value: i.name_year,
            //     label: i.name_year_th,
            // }));
            setSalarylist(data);
          } else {
            setSalarylist([]);
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
      // customertype:"",
      month: (new Date().getMonth().toString().length === 1
        ? "0" + new Date().getMonth()
        : new Date().getMonth()
      ).toString(),
      year: new Date().getFullYear().toString(),
      customertype: [],
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
  const fff = [
    { value: "1", label: "ลูกจ้างชั่วคราว" },
    { value: "2", label: "ลูกจ้างประจำ" },
    { value: "3", label: "พนักงานราชการ" },
    { value: "4", label: "พนักงานมหาวิทยาลัย" },
    { value: "5", label: "อาจารย์ประจำตามสัญญาจ้าง" },
    { value: "6", label: "ข้าราชการ/ข้าราชการพลเรือน" },
    { value: "7", label: "อาจารย์ต่างชาติ" },
    { value: "8", label: "บุคลากรภายนอก" },
  ];
  const staticArray = [
    {
      header: "เลขบัตร",
      key: "customers_citizent",
      width: 20,
    },
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
      header: "ประเภทงบประมาณ",
      key: "namebudget",
      width: 20,
    },
  ];
  function getExcelColumnLetter(columnNumber) {
    let columnLetter = "";
    let temp;

    while (columnNumber > 0) {
      temp = (columnNumber - 1) % 26;
      columnLetter = String.fromCharCode(65 + temp) + columnLetter;
      columnNumber = Math.floor((columnNumber - temp) / 26);
    }

    return columnLetter;
  }

  const FetchDatas = (value) => {
    setLoadSubmit(true);
    let text = "";
    let textz = "";
    value.customertype.forEach((i, k) => {
      if (k + 1 === value.customertype.length) {
        text += "'" + i + "'";
      } else {
        text += "'" + i + "',";
      }
    });
    value.customertype.forEach((i, k) => {
      if (k + 1 === value.customertype.length) {
        textz += "'" + i + "'";
      } else {
        textz += "'" + i + "'-";
      }
    });
    axios
      .post(API + "/index/getdataexpenditures", {
        year: value.year,
        month: value.month,
        type: text,
        budget: value.idbudget,
      })
      .then((res) => {
        if (res.data.length !== 0) {
          ExcelExports(res.data, textz);
        } else {
          setLoadSubmit(false);
        }
      });
  };
  const ExcelExports = (DataExcel, textz) => {
    const workbook = new ExcelJs.Workbook();
    const sheets = {};
    if (DataExcel.length > 0) {
      console.log(DataExcel);
      DataExcel.forEach((value, key) => {
        const head = value.header;
        head.unshift(...staticArray);
        sheets[key] = workbook.addWorksheet(`${value.label}`);
        sheets[key].properties.defaultRowHeight = 20;
        sheets[key].columns = head;
        const columns = ["A", "B", "C", "D", "E"];
        const columns2 = [];
        const colors = ["e9ecef", "ffffff"];
        const numNewColumns = head.length - columns.length;
        const startCol = columns.length + 1;
        if (numNewColumns > 0) {
          for (let i = 0; i < numNewColumns; i++) {
            columns2.push(getExcelColumnLetter(startCol + i));
          }
        }
        console.log(columns2);
        // Assuming Rws column is column 'I' (change 'I' to the actual column if different)
        // const rwsColumn = 'I';

        const customers = value.customers;

        // Add customer rows
        customers.forEach((customer) => {
          const row = {};
          head.forEach((col) => {
            row[col.key] = customer[col.key]; // Assuming customer is an object with keys matching those in `head`
          });
          sheets[key].addRow(row);
        });

        // Apply colors to rows based on the Rws column
        sheets[key].eachRow({ includeEmpty: true }, (row, rowNumber) => {
          // Get the color from the Rws column
          row.height = 25;
          // Apply the color to cells in columns A to H

          columns.forEach((column) => {
            const cell = `${column}${rowNumber}`;
            const cellRef = sheets[key].getCell(cell);
            const cell2 = `${column}${1}`;
            const cellRefs = sheets[key].getCell(cell2);
            cellRef.fill = {
              type: "pattern",
              pattern: "solid",
              fgColor: { argb: "6c757d" },
              bgColor: { argb: "FFFFFF" }, // Set a default background color if needed
            };
            cellRefs.fill = {
              type: "pattern",
              pattern: "solid",
              fgColor: { argb: "005f73" },
              bgColor: { argb: "FFFFFF" }, // Set a default background color if needed
            };
            cellRefs.font = {
              color: { argb: "FFFFFF" }, // เปลี่ยนสีข้อความเป็นสีขาว
            };
            cellRef.font = {
              color: { argb: "FFFFFF" }, // เปลี่ยนสีข้อความเป็นสีขาว
            };

            cellRef.border = {
              top: { style: "thin", color: { argb: "00000000" } }, // Set your desired border color
              // left: { style: "thin", color: { argb: "00000000" } },
              bottom: { style: "thin", color: { argb: "00000000" } },
              right: { style: "thin", color: { argb: "00000000" } },
            };
          });

          columns2.forEach((column) => {
            const cell = `${column}${rowNumber}`;
            const colorIndex = rowNumber % 2;
            const cellRef = sheets[key].getCell(cell);
            const cell2 = `${column}${1}`;
            const cellRefs = sheets[key].getCell(cell2);
            cellRef.fill = {
              type: "pattern",
              pattern: "solid",
              fgColor: { argb: colors[colorIndex] },
              bgColor: { argb: "FFFFFF" }, // Set a default background color if needed
            };
            cellRefs.fill = {
              type: "pattern",
              pattern: "solid",
              fgColor: { argb: "ffb703" },
              bgColor: { argb: "FFFFFF" }, // Set a default background color if needed
            };
            cellRefs.font = {
              color: { argb: "000000" }, // เปลี่ยนสีข้อความเป็นสีขาว
            };

            cellRef.border = {
              top: { style: "thin", color: { argb: "adb5bd" } }, // Set your desired border color
              // left: { style: "thin", color: { argb: "00000000" } },
              bottom: { style: "thin", color: { argb: "adb5bd" } },
              // right: { style: "thin", color: { argb: "00000000" } },
            };
            cellRefs.border = {
              // top: { style: "thin", color: { argb: "adb5bd" } }, // Set your desired border color
              left: { style: "thin", color: { argb: "00000000" } },
              // bottom: { style: "thin", color: { argb: "adb5bd" } },
              right: { style: "thin", color: { argb: "00000000" } },
            };
          });

          head.forEach((col, colIndex) => {
            const column = getExcelColumnLetter(colIndex + 1);
            let maxLength = column.length; // Start with the length of the column letter

            sheets[key].eachRow({ includeEmpty: true }, (row) => {
              const cell = row.getCell(colIndex + 1);
              if (cell.value) {
                maxLength = Math.max(maxLength, cell.value.toString().length);
              }
            });

            sheets[key].getColumn(column).width = maxLength + 2; // Add extra space for padding
          });
        });
      });
    }
    setLoadSubmit(false);
    workbook.xlsx.writeBuffer().then((data) => {
      const blob = new Blob([data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheet.sheet",
      });
      const url = window.URL.createObjectURL(blob);
      const anchor = document.createElement("a");

      anchor.href = url;
      anchor.download =
        "ข้อมูลนำเข้ารายจ่ายบุคลากร " +
        formSearch.values.year +
        "- " +
        formSearch.values.month +
        " งบ " +
        formSearch.values.idbudget +
        "ประเภท " +
        textz +
        ".xlsx";

      anchor.click();
      window.URL.revokeObjectURL(url);
    });
  };
  return (
    <>
      {" "}
      <LoadingOverlay pos={"fixed"} visible={LoadSubmit} loaderProps={{ type: "dots" }} />
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
            <Grid gutter={{ base: 5, xs: "md", md: "xl", xl: 50 }}>
              <Grid.Col span={2}>
                <Select
                  searchable
                  data={DataBudget}
                  {...formSearch.getInputProps("idbudget")}
                  label="งบประมาณ"
                />
              </Grid.Col>
              <Grid.Col span={2}>
                <Select
                  searchable
                  label="เดือน"
                  data={selectmount}
                  {...formSearch.getInputProps("month")}
                />
              </Grid.Col>
              <Grid.Col span={2}>
                <Select
                  searchable
                  label="ปี"
                  data={DataYear}
                  {...formSearch.getInputProps("year")}
                />
                {/* <Select searchable label="เลือกเดือนที่จะนำข้อมูลเข้า " data={selectmount} {...formSearch.getInputProps("monthend")}  />
                                <Select searchable label="ปี" data={DataYear} {...formSearch.getInputProps("yearend")} mt={10} /> */}
              </Grid.Col>
              <Grid.Col span={2}>
                <MultiSelect
                  label="ประเภทพนักงาน"
                  placeholder="เลือกประเภทพนักงาน"
                  data={[
                    { value: "1", label: "ลูกจ้างชั่วคราว" },
                    { value: "2", label: "ลูกจ้างประจำ" },
                    { value: "3", label: "พนักงานราชการ" },
                    { value: "4", label: "พนักงานมหาวิทยาลัย" },
                    { value: "5", label: "อาจารย์ประจำตามสัญญาจ้าง" },
                    { value: "6", label: "ข้าราชการ/ข้าราชการพลเรือน" },
                    { value: "7", label: "อาจารย์ต่างชาติ" },
                    { value: "8", label: "บุคลากรภายนอก" },
                  ]}
                  {...formSearch.getInputProps("customertype")}
                />
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

          {Salarylist.length !== 0 ? (
            <>
              <p className="mt-5">พบรายการเงินเดือน {Salarylist.length} รายการ</p>
              <Button
                onClick={() => {
                  ExcelExport();
                }}
                color="green"
                mt={10}
                leftSection={<IconDownload />}
              >
                {" "}
                ดาวน์โหลดข้อมูลเงินเดือน
              </Button>
              <Button
                disabled={
                  formSearch.values.idbudget !== "" && formSearch.values.customertype.length !== 0
                    ? false
                    : true
                }
                ml={5}
                mt={10}
                leftSection={<IconFileSpreadsheet />}
                onClick={() => {
                  FetchDatas(formSearch.values);
                }}
                color="green"
              >
                ดาวน์โหลดการนำเข้า-ส่งออกรายจ่าย
              </Button>
            </>
          ) : (
            <></>
          )}
        </Paper>

        <hr />
        <Paper pt={20} shadow="none" p="xl">
          <p>นำเข้าข้อมูลเงินเดือน</p>
          <Group justify="start">
            <FileButton onChange={Readfile} accept="xlsx">
              {(props) => (
                <Button
                  disabled={
                    formSearch.values.idbudget === "" ||
                    formSearch.values.month === "" ||
                    formSearch.values.year === ""
                  }
                  leftSection={<IconFile />}
                  color="violet"
                  {...props}
                >
                  เลือกไฟล์ที่นำเข้า
                </Button>
              )}
            </FileButton>
            <form onSubmit={formSearch.onSubmit(submitdata)}>
              <Button
                disabled={
                  formSearch.values.idbudget === "" ||
                  formSearch.values.month === "" ||
                  formSearch.values.year === ""
                }
                type="submit"
                leftSection={<IconFolderUp />}
              >
                นำเข้าข้อมูล
              </Button>
            </form>
          </Group>
          {files && (
            <Text size="sm" ta="center" mt="sm">
              ไฟล์ที่เลือก : {files.name}
            </Text>
          )}
          {/* <input type="file" onChange={(e) => Readfile(e)} /> */}
          <p className="mt-5">รายการนำเข้า {DataTablelist.length} รายการ</p>
          <Grid justify="center">
            <Grid.Col span={4}>
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
              // maxHeight={"80dvh"}
              responsive
              entries={100}
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
