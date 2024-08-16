import { Button, Container, FileInput, Paper, Select, SimpleGrid, Stack } from "@mantine/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { API } from "../../Config/ConfigApi";
import ExcelJs from "exceljs";
//import { read, writeFileXLSX } from "xlsx";
import * as xlsx from "xlsx";
import { isNotEmpty, useForm } from "@mantine/form";
import { IconFileSpreadsheet } from "@tabler/icons-react";
function ImportExpend() {
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
  // const [DataExcel, setDataExcel] = useState([]);
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
  const ExcelExport = (DataExcel) => {
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

    workbook.xlsx.writeBuffer().then((data) => {
      const blob = new Blob([data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheet.sheet",
      });
      const url = window.URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = "รูปแบบนำเข้ารายจ่ายบุคลากร.xlsx";

      anchor.click();
      window.URL.revokeObjectURL(url);
    });
  };
  useEffect(() => {
    FetchYear();
  }, []);
  const [Load, setLoad] = useState(false);
  const FetchData = (value) => {
    setLoad(true);
    axios
      .post(API + "/index/getdataexpenditure", {
        year: value.year,
        month: value.month,
      })
      .then((res) => {
        if (res.data.length !== 0) {
          // setDataExcel(res.data);
          setLoad(false);
          ExcelExport(res.data);
        }
      });
  };
  const form = useForm({
    initialValues: {
      year: "",
      month: "",
      DATAYEAR: [],
      DATAMONTH: [
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
      ],
    },
    validate: {
      year: isNotEmpty("กรุณาเลือก"),
      month: isNotEmpty("กรุณาเลือก"),
    },
  });
  const FetchYear = () => {
    // setLoadTable(true);
    setTimeout(() => {
      axios.get(API + "/index/showyear").then((res) => {
        // console.log(res.data);
        const data = res.data;
        if (data.length !== 0) {
          const select = data.map((i) => ({
            value: i.name_year,
            label: i.name_year_th,
          }));
          form.setValues({ DATAYEAR: select });
        }
      });
    }, 400);
  };
  return (
    <Container fluid p={0}>
      <Paper p={20} shadow="xl" radius={12} withBorder>
        <form
          onSubmit={form.onSubmit((value) => {
            FetchData(value);
          })}
        >
          <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }}>
            <Select data={form.values.DATAYEAR} label="ปี" {...form.getInputProps("year")} />
            <Select data={form.values.DATAMONTH} label="เดือน" {...form.getInputProps("month")} />
            <Stack pt={0}>
              <Button
                leftSection={<IconFileSpreadsheet />}
                type="submit"
                mt={32}
                loading={Load}
                color="green.9"
              >
                ดาวน์โหลดรูปแบบการเพิ่ม
              </Button>
            </Stack>
          </SimpleGrid>
        </form>
      </Paper>
      <Paper p={20} shadow="md" my={"md"} withBorder radius={8}>
        <FileInput/>
      </Paper>
    </Container>
  );
}

export default ImportExpend;
