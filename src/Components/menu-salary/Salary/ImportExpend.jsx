import { Button, Container, Paper, Select, SimpleGrid, Stack } from "@mantine/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { API } from "../../Config/ConfigApi";
import ExcelJs from "exceljs";
//import { read, writeFileXLSX } from "xlsx";
import * as xlsx from "xlsx";
function ImportExpend() {
  const staticArray = [
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
      header: "ประเภทงบประมาณ",
      key: "namebudget",
      width: 20,
    },
  ];
  const [DataExcel, setDataExcel] = useState([]);
  const ExcelExport = () => {
    const workbook = new ExcelJs.Workbook();
    const sheets = {};
    if (DataExcel.length > 0) {
      console.log(DataExcel);
      DataExcel.forEach((value, key) => {
        const head = value.header;
        head.unshift(...staticArray)
        sheets[key] = workbook.addWorksheet(`${value.label}`);
        sheets[key].properties.defaultRowHeight = 15;
        sheets[key].columns = head;
        const columns = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

        // Assuming Rws column is column 'I' (change 'I' to the actual column if different)
        const rwsColumn = 'I';
    
        const customers = value.customers;
        
        // Add customer rows
        customers.forEach((customer) => {
            const row = {};
            head.forEach(col => {
                row[col.key] = customer[col.key]; // Assuming customer is an object with keys matching those in `head`
            });
            sheets[key].addRow(row);
        });
    
        // Apply colors to rows based on the Rws column
        sheets[key].eachRow({ includeEmpty: true }, (row, rowNumber) => {
            // Get the color from the Rws column

            // Apply the color to cells in columns A to H
            columns.forEach(column => {
              const cell = `${column}${rowNumber}`;
              const cellRef = sheets[key].getCell(cell);
              cellRef.fill = {
                  type: "pattern",
                  pattern: "solid",
                  fgColor: { argb: 'a9dfbf' },
                  bgColor: { argb: "FFFFFF" } // Set a default background color if needed
              };
  
              cellRef.border = {
                  top: { style: 'thin', color: { argb: '00000000' } }, // Set your desired border color
                  left: { style: 'thin', color: { argb: '00000000' } },
                  bottom: { style: 'thin', color: { argb: '00000000' } },
                  right: { style: 'thin', color: { argb: '00000000' } }
              };
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
      anchor.download = "ข้อมูลเงินเดือนงบ.xlsx";

      anchor.click();
      window.URL.revokeObjectURL(url);
    });
  };
  useEffect(() => {
    axios.get(API + "/index/bbbb").then((res) => {
      setDataExcel(res.data);
    });
  }, []);
  return (
    <Container fluid p={0}>
      <Paper p={20} shadow="xl" radius={12} withBorder>
        <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }}>
          <Select label="ประเภท" />
          <Select label="ปี" />
          <Select label="เดือน" />
          <Stack pt={0}>
            <Button onClick={ExcelExport}>sdfgdjkfhglkf</Button>
          </Stack>
        </SimpleGrid>
      </Paper>
    </Container>
  );
}

export default ImportExpend;
