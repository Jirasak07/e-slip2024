import { Button, Flex, LoadingOverlay, Modal, Select, SimpleGrid, TextInput } from "@mantine/core";
import { IconDeviceFloppy, IconEdit, IconPlaylistAdd ,IconDownload} from "@tabler/icons-react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { API } from "../../Config/ConfigApi";
import { isNotEmpty, useForm } from "@mantine/form";
import Swal from "sweetalert2";
import ExcelJs from 'exceljs'

function Btndownloadtobank({ FetchExpenditure, expenditure_id, year, month, idbudget, bank_id, bank_name }) {
  const [openModal, setopenModal] = useState(false);
  const [OverLay, setOverLay] = useState(false);
  const [Dataexport, setDataexport] = useState(false);
  const formEditExpenditure = useForm({
    initialValues: {
      expenditure_id: expenditure_id,
      expenditure_name: "",
      customer_type_id: null,
      use_tax: 0,
    },
    validate: {
      expenditure_name: isNotEmpty("กรุณากรอกข้อมูล"),
    },
  });


  const ExcelExport = () => {

    const workbook = new ExcelJs.Workbook();
    const sheet = workbook.addWorksheet("Mysheet");
    sheet.properties.defaultRowHeight = 15;

    
    sheet.columns = [
        {
            header: "Receiving Bank Code",
            key: "BankCode",
            width: 20
        },
        {
            header: "Receiving A/C No.",
            key: "No",
            width: 20,
        },
        {
            header: "Receiver Name",
            key: "Name",
            width: 20,
        },
        {
            header: "Transfer Amount",
            key: "Amount",
            width: 20,
        },
        {
            header: "Citizen ID/Tax ID",
            key: "Citizen",
            width: 20,
        },
        {
            header: "Reference No./ DDA Ref 2",
            key: "DDA",
            width: 20,
        },
        {
            header: "Email",
            key: "Email",
            width: 20,
        },
        {
            header: "Mobile No.",
            key: "Mobile",
            width: 20,
        },
    ]

    Dataexport.map((i) => (
        sheet.addRow(
            {
                BankCode: i.customers_bank,
                No: i.account_number,
                Name: i.customers_pname+i.customers_name+' '+i.customers_lname,
                Amount: Number(i.salary_true) ,
                Citizen: i.customers_citizent,
                DDA: 'xxxxx',
                Email: 'xxxxx',
                Mobile: 'xxxxx',
            }
        )
    ))


    workbook.xlsx.writeBuffer().then(data => {
        const blob = new Blob([data], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheet.sheet",
        });
        const url = window.URL.createObjectURL(blob);
        const anchor = document.createElement('a');
        anchor.href = url;
        anchor.download = (bank_name+"-"+year+"-"+month+"-"+idbudget+".xlsx");
        anchor.click();
        window.URL.revokeObjectURL(url);
    })

}


  const FetchData = () => {

     axios.get(API + "/index/showrevenueexporttobank/"+year+"/"+month+"/"+idbudget+"/"+bank_id)
      .then((res) => {
        const data = res.data;
        console.log(data);
        if (data.length !== 0) {
            setDataexport(data);
         // setopenModal(true);
          // console.log(data[0].customer_type_id)
        } else {
          console.log("null");
        }
      });
  };
  const UpdateExpenditure = (value) => {
    setOverLay(true)
    const data = new FormData();
    data.append("expenditure_id", value.expenditure_id)
    data.append("expenditure_name", value.expenditure_name)
    data.append("customer_type_id", value.customer_type_id)
    data.append("use_tax", 0)
    axios.post(API + "/index/updateexpenditure", data).then((res) => {
      if (res.data === "200") {
        setOverLay(false)
        Swal.fire({
          icon: 'success',
          title: 'อัพเดทข้อมูลรายจ่ายสำเร็จ',
          timer: 1000,
          timerProgressBar: true,
          showConfirmButton: false
        }).then((res) => {
          FetchExpenditure(value.customer_type_id)
          setopenModal(false)
        })
      }
    })
  }


  return (
    <>
{Dataexport.length >0 ?<>
    <Button
       onClick={()=>{ExcelExport()}} color="purple" 
       leftSection={<IconDownload  />}
       size="xs"
       radius="lg"
      >
       Download {bank_name}
      </Button>
</>:<>
 <Button
        onClick={() => {
          FetchData();
        }}
        color="var(--warning)"
        leftSection={<IconPlaylistAdd />}
        size="xs"
        radius="lg"
      >
    Download {bank_name}
      </Button>
     
</>}
     

    </>
  );
}

export default Btndownloadtobank;
