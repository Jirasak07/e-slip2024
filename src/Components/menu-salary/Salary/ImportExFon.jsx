import { Button, FileInput, Flex, LoadingOverlay, Paper, Select, SimpleGrid } from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { IconSearch } from "@tabler/icons-react";
import axios from "axios";
import { API } from "../../Config/ConfigApi";
import { useEffect, useState } from "react";
import ExcelJs from "exceljs";
import Swal from "sweetalert2";
function ImportExFon() {
  const [file, setFile] = useState(null);
  const [sheetsData, setSheetsData] = useState([]);
  const formSearch = useForm({
    initialValues: {
      type_employ: "",
      idbudget: "",
      month: ((new Date().getMonth() + 1).toString().length === 1
  ? "0" + (new Date().getMonth() + 1)
  : (new Date().getMonth() + 1).toString()),
      year: new Date().getFullYear().toString(),
      DATABUDGET: [],
      DATAEMPLOY: [],
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
      type_employ: isNotEmpty("กรุณาเลือกประเภทบุคลากร"),
      idbudget: isNotEmpty("กรุณาเลือกงบประมาณ"),
      month: isNotEmpty("กรุณาเลือกเดือน"),
      year: isNotEmpty("กรุณาเลือกปี"),
    },
  });
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

        const customers = value.customers;
        customers.forEach((customer) => {
          const row = {};
          head.forEach((col) => {
            row[col.key] = customer[col.key];
          });
          sheets[key].addRow(row);
        });

        sheets[key].eachRow({ includeEmpty: true }, (row, rowNumber) => {
          row.height = 25;

          columns.forEach((column) => {
            const cell = `${column}${rowNumber}`;
            const cellRef = sheets[key].getCell(cell);
            const cell2 = `${column}${1}`;
            const cellRefs = sheets[key].getCell(cell2);
            cellRef.fill = {
              type: "pattern",
              pattern: "solid",
              fgColor: { argb: "6c757d" },
              bgColor: { argb: "FFFFFF" },
            };
            cellRefs.fill = {
              type: "pattern",
              pattern: "solid",
              fgColor: { argb: "005f73" },
              bgColor: { argb: "FFFFFF" },
            };
            cellRefs.font = {
              color: { argb: "FFFFFF" },
            };
            cellRef.font = {
              color: { argb: "FFFFFF" },
            };

            cellRef.border = {
              top: { style: "thin", color: { argb: "00000000" } },
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
              bgColor: { argb: "FFFFFF" },
            };
            cellRefs.fill = {
              type: "pattern",
              pattern: "solid",
              fgColor: { argb: "ffb703" },
              bgColor: { argb: "FFFFFF" },
            };
            cellRefs.font = {
              color: { argb: "000000" },
            };

            cellRef.border = {
              top: { style: "thin", color: { argb: "adb5bd" } },

              bottom: { style: "thin", color: { argb: "adb5bd" } },
            };
            cellRefs.border = {
              left: { style: "thin", color: { argb: "00000000" } },
              right: { style: "thin", color: { argb: "00000000" } },
            };
          });

          head.forEach((col, colIndex) => {
            const column = getExcelColumnLetter(colIndex + 1);
            let maxLength = column.length;

            sheets[key].eachRow({ includeEmpty: true }, (row) => {
              const cell = row.getCell(colIndex + 1);
              if (cell.value) {
                maxLength = Math.max(maxLength, cell.value.toString().length);
              }
            });

            sheets[key].getColumn(column).width = maxLength + 2;
          });
        });
      });
    }
    const namefile = formSearch.values.DATAEMPLOY.find(
      (val) => val.value === formSearch.values.type_employ
    ).label;
    const namefiles = formSearch.values.DATABUDGET.find(
      (val) => val.value === formSearch.values.idbudget
    ).label;

    workbook.xlsx.writeBuffer().then((data) => {
      const blob = new Blob([data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheet.sheet",
      });
      const url = window.URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = "รูปแบบนำเข้ารายจ่ายบุคลากรประเภท " + namefile + " " + namefiles + ".xlsx";

      anchor.click();
      window.URL.revokeObjectURL(url);
    });
  };

  const handleFileChange = async (selectedFile) => {
    setFile(selectedFile);

    if (selectedFile) {
      const workbook = new ExcelJs.Workbook();
      const fileReader = new FileReader();

      fileReader.onload = async (e) => {
        const buffer = e.target.result;
        await workbook.xlsx.load(buffer);

        const allSheetsData = [];

        workbook.eachSheet((worksheet) => {
          const sheetData = [];
          let headers = [];

          worksheet.eachRow((row, rowNumber) => {
            const rowValues = row.values.slice(1); // Remove first empty element

            if (rowNumber === 1) {
              headers = rowValues; // แถวแรกเป็น header
            } else {
              const rowData = {};
              headers.forEach((header, index) => {
                rowData[header] = rowValues[index];
              });
              sheetData.push(rowData);
            }
          });

          allSheetsData.push({
            label: worksheet.name, // ชื่อ sheet
            data: sheetData, // ข้อมูลใน sheet
          });
        });

        setSheetsData(allSheetsData);
      };

      fileReader.readAsArrayBuffer(selectedFile);
    }
  };
  const formsend = useForm({
    initialValues: {
      year: "",
      month: "",
      DATAYEAR: formSearch.values.DATAYEAR,
      DATAMONTH: formSearch.values.DATAMONTH,
    },
    validate: {
      year: isNotEmpty("กรุณาเลือก"),
      month: isNotEmpty("กรุณาเลือก"),
    },
  });
  const [LLLLLL, setLLLLLL] = useState(false);
  async function processSheets() {
    setLLLLLL(true);
    let i = 0;
    const jamnual = sheetsData.length;
    for (const sheet of sheetsData) {
      const typeuser = sheet.label;

      for (const record of sheet.data) {
        const citizent = record["เลขบัตร"];
        const budget = record["ประเภทงบประมาณ"];

        // Iterate over each key in the record
        for (const key of Object.keys(record)) {
          const value = record[key];
          const label = key;

          if (
            label !== "เลขบัตร" &&
            label !== "คำนำหน้า" &&
            label !== "ชื่อ" &&
            label !== "นามสกุล" &&
            label !== "ประเภทงบประมาณ" &&
            value !== 0
          ) {
            try {
              await axios.post(API + "/uploadfile/uploadexpenditureFON", {
                typeuser: typeuser,
                payslip_citizent: citizent,
                idbudget: budget,
                label: label,
                value: value,
                // year: "2026",
                // month: "12",
                year: formsend.values.year,
                month: formsend.values.month,
              });
              // });
              console.log("Data posted successfully");
            } catch (error) {
              console.error("Error posting data", error);
            }
          }
        }
        i++;
      }
    }

    if (i >= jamnual) {
      setLLLLLL(false);
      Swal.fire({
        icon: "success",
        title: "Success",
        showConfirmButton: false,
        timer: 600,
        timerProgressBar: true,
      });
      setFile(null);
      setSheetsData([]);
    } else {
      console.log("object");
    }
  }
  const CheckingConfirmed = () => {
    Swal.fire({
      icon: "info",
      title: "ต้องการบันทึกหรือไม่",
      showCancelButton: true,
    }).then((d) => {
      if (d.isConfirmed === true) {
        processSheets();
      }
    });
  };

  const FetchTypeEmploy = async () => {
    try {
      const fetch = await axios.get(API + "/index/showcustomertype");
      const data = fetch.data;

      if (data.length !== 0) {
        const select = data.map((i) => ({
          value: i.customer_type_id,
          label: i.customer_type_name,
        }));
        formSearch.setValues({ DATAEMPLOY: select });
      }
    } catch (error) {
      console.log(error);
    }
  };
  const FetchYear = async () => {
    try {
      const fetch = await axios.get(API + "/index/showyear");
      const data = fetch.data;
      if (data.length !== 0) {
        const select = data.map((i) => ({
          value: i.name_year,
          label: i.name_year_th,
        }));
        formSearch.setValues({ DATAYEAR: select });
      }
    } catch (error) {
      console.log(error);
    }
  };
  const FetchBudget = async () => {
    try {
      const res = await axios.get(API + "/index/showBudget");
      const data = res.data;
      if (data.length !== 0) {
        const select = data.map((i) => ({
          value: i.idbudget,
          label: i.namebudget + " ( " + i.idbudget + " ) ",
        }));

        formSearch.setValues({ DATABUDGET: select });
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    FetchTypeEmploy();
    FetchYear();
    FetchBudget();
  }, []);
  const [LoadPage, setLoadPage] = useState(false);
  const FetchData = async (data) => {
    try {
      setLoadPage(true);
      const fetch = await axios.post(API + "/index/getdataexpenditurePFON", {
        month: data.month,
        year: data.year,
        typeemploy: data.type_employ,
        idbudget: data.idbudget,
      });
      const datafetch = fetch.data;
      console.log(datafetch);
      if (datafetch[0].customers.length !== 0) {
        ExcelExport(datafetch);
      } else {
        Swal.fire({
          icon: "info",
          title: "ไม่พบรายการที่ค้นหา",
          timer: 1200,
          timerProgressBar: true,
          showConfirmButton: false,
        });
      }
      await setLoadPage(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <LoadingOverlay visible={LoadPage} pos={"fixed"} />
      <LoadingOverlay visible={LLLLLL} pos={"fixed"} />
      <form
        onSubmit={formSearch.onSubmit((value) => {
          FetchData(value);
        })}
      >
        <SimpleGrid cols={{ base: 1, sm: 2, md: 5 }}>
          <Select
            {...formSearch.getInputProps("idbudget")}
            allowDeselect={false}
            searchable={true}
            data={formSearch.values.DATABUDGET}
            label="ประเภทงบประมาณ"
          />
          <Select
            {...formSearch.getInputProps("type_employ")}
            allowDeselect={false}
            searchable={true}
            data={formSearch.values.DATAEMPLOY}
            label="ประเภทพนักงาน"
          />
          <Select
            data={formSearch.values.DATAYEAR}
            {...formSearch.getInputProps("year")}
            allowDeselect={false}
            label="ปี"
          />
          <Select
            data={formSearch.values.DATAMONTH}
            {...formSearch.getInputProps("month")}
            allowDeselect={false}
            label="เดือน"
          />
          <Button type="submit" leftSection={<IconSearch />} mt={{ base: 0, sm: 33 }}>
            ค้นหา
          </Button>
        </SimpleGrid>
      </form>
      <Paper shadow="md" p={10} mt={25} withBorder>
        <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }}>
          {/* <Flex> */}
          <FileInput
            accept=".xlsx"
            value={file}
            onChange={handleFileChange}
            label="เลือกไฟล์ Excel"
            placeholder="Upload files"
          />
          {/* </Flex> */}
          <Select
            data={formSearch.values.DATAYEAR}
            {...formsend.getInputProps("year")}
            allowDeselect={false}
            label="ปี"
          />
          <Select
            data={formSearch.values.DATAMONTH}
            {...formsend.getInputProps("month")}
            allowDeselect={false}
            label="เดือน"
          />
          <Button
            color="green.8"
            disabled={
              (localStorage.getItem("fname") !== "วรรณภา" &&
                localStorage.getItem("fname") !== "จิรศักดิ์" &&
                file !== null) ||
              file === null
                ? true
                : false
            }
            mt={{ base: 0, sm: 33 }}
            onClick={() => {
              CheckingConfirmed();
            }}
          >
            บันทึก
          </Button>
        </SimpleGrid>
      </Paper>
    </div>
  );
}

export default ImportExFon;
