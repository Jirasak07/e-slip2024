import { Button, Container, FileInput, Group, Text, rem } from "@mantine/core";
import { IconUpload, IconPhoto, IconX, IconFileSpreadsheet, IconFileTypeXls } from "@tabler/icons-react";
import { Dropzone, MS_EXCEL_MIME_TYPE } from "@mantine/dropzone";
import { useState } from "react";
import axios from "axios";
import { API } from "../../Config/ConfigApi";
import Swal from "sweetalert2";
function Upload50() {
  const [FileExcel, setFileExcel] = useState([]);
  const [FileName, setFileName] = useState("");
  const SetFile = (val) => {
    if (val) {
      setFileName(val[0].name);
      setFileExcel(val[0]);
    } else {
      setFileName("");
      setFileExcel([]);
    }
  };
  const [Load, setLoad] = useState(false);
  const SendFile = (params) => {
    // setLoad(true);
    // const frm = new FormData();
    // frm.append("slip", FileExcel);
    // axios.post(API + "/uploadfile/uploadtavi50", frm).then((res) => {
    //   setLoad(false);
    //   if (res.data === "success") {
    //     Swal.fire({
    //       icon: "success",
    //       title: "อัพโหลดสำเร็จ",
    //       timer: 1200,
    //       timerProgressBar: true,
    //       showConfirmButton: false,
    //     }).then((res) => {
    //       setFileExcel([]);
    //       setFileName("");
    //     });
    //   } else {
    //     Swal.fire({
    //       icon: "error",
    //       title: "อัพโหลดไม่สำเร็จ",
    //     });
    //   }
    // });
  };
  const columns = [
    "yearpay",
    "monthpay",
    "citizent",
    "prefix",
    "fname",
    "lname",
    "department",
    "subdepart",
    "bank_code",
    "bank_name",
    "bank_branch",
  ];
  const [Txt, setTxt] = useState("");
  const [A, setA] = useState([]);
  const Onchange = (val) => {
    if (val) {
      var preview = document.getElementById("show-text");
      var file = val;
      var reader = new FileReader();
      var textFile = /text.*/;
      if (file.type.match(textFile)) {
        reader.onload = function (event) {
          const data = event.target.result;
          const arrayText = data.split("$");
          const arraySort = [];
          arrayText.forEach((item) => {
            const stringsArray = item.split(/\r?\n/).map(String);
            if (stringsArray.length > 1) {
              stringsArray.forEach((items) => {
                arraySort.push(items);
              });
            } else {
              arraySort.push(item);
            }
          });
          setA(arraySort);
          let dataToPush = [];
          let dataToPushs = [];
          let i = 0;
          let j = 0;
          arraySort.forEach((is) => {  
            dataToPush.push(is);
            if (i === 78) {
              dataToPushs[j] = dataToPush
              dataToPush = []
              i = 0;
              j++;
            }else{
                   i++;  
            }
       
          });
          //   setA(arrrr);
          //   let i = 0;
          //   let a = 0;
          //   let pp = [];
          //   arrrr.forEach((element) => {
          //     if (i <= 78) {
          //       const stringsArray = element.split(/\r?\n/).map(String);
          //       if (stringsArray.length > 1) {
          //         pp.push(stringsArray[0]);
          //         pp.push(stringsArray[1]);
          //       }
          //       ad.push(element);
          //       if (i === 78) {
          //         d[a] = ad;
          //         ad = [];
          //         i = 0;
          //         a++;
          //       }
          //     }
          //     i++;
          //   });
          //   setTxt(d);
          //   setA(pp);
          setA(dataToPushs)
        };
      } else {
        console.log("skdjhf");
      }
      reader.readAsText(file);
    } else {
      alert("Your browser is too old to support HTML5 File API");
    }
  };
  const show = (params) => {
    axios.post(API+"/index/InsertGovToSlip",{
        data:A
    }).then((res)=>{
        console.log(res.data)
    })
  };

  return (
    <Container>
      <Text fz={20} fw={500}>
        อัพโหลดไฟล์ทวิ 50
      </Text>
      <Dropzone
        loading={Load}
        onDrop={(files) => SetFile(files)}
        onReject={(files) => console.log("rejected files", files)}
        maxSize={5 * 1024 ** 2}
        accept={MS_EXCEL_MIME_TYPE}
        // {...props}
      >
        <Group justify="center" gap="xl" mih={220} style={{ pointerEvents: "none" }}>
          <Dropzone.Accept>
            <IconUpload
              style={{ width: rem(52), height: rem(52), color: "var(--mantine-color-blue-6)" }}
              stroke={1.5}
            />
          </Dropzone.Accept>
          {/* <Dropzone.Reject>
            <IconX style={{ width: rem(52), height: rem(52), color: "var(--mantine-color-red-6)" }} stroke={1.5} />
          </Dropzone.Reject> */}
          <Dropzone.Idle>
            <IconPhoto style={{ width: rem(52), height: rem(52), color: "var(--mantine-color-dimmed)" }} stroke={1.5} />
          </Dropzone.Idle>

          <div>
            <Text size="xl" inline>
              ลากไฟล์มาวาง หรือ คลิกที่ว่างเพื่อเลือกไฟล์
            </Text>
            <Text size="sm" c="dimmed" inline mt={7}>
              ไฟล์นามสกุล .xlsx เท่านั้น
            </Text>
          </div>
        </Group>
      </Dropzone>{" "}
      {FileName !== "" ? "ไฟล์ที่เลือก : " + FileName : ""}
      <Button
        mt={10}
        disabled={FileExcel.length !== 0 ? false : true}
        w={"100%"}
        h={60}
        color="green"
        onClick={() => {
          SendFile();
        }}
        leftSection={<IconFileTypeXls />}
      >
        อัพโหลดไฟล์ทวิ50
      </Button>
      <Button onClick={show}></Button>
      <FileInput
        onChange={(e) => {
          Onchange(e);
        }}
      />
      {/* {Txt} */}
    </Container>
  );
}

export default Upload50;
