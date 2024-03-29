import {
  ActionIcon,
  Button,
  Container,
  FileInput,
  Flex,
  Group,
  LoadingOverlay,
  Select,
  Text,
  rem,
} from "@mantine/core";
import {
  IconUpload,
  IconPhoto,
  IconX,
  IconFileSpreadsheet,
  IconFileTypeXls,
  IconTruckReturn,
  IconRestore,
} from "@tabler/icons-react";
import { Dropzone, MS_EXCEL_MIME_TYPE } from "@mantine/dropzone";
import { useState } from "react";
import axios from "axios";
import { API } from "../../Config/ConfigApi";
import Swal from "sweetalert2";
import { useForm } from "@mantine/form";
function UploadTax() {
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
  const form = useForm({
    initialValues: {
      TYPE: "2",
    },
  });
  const [Load, setLoad] = useState(false);
  // const SendFile = (params) => {
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
  // };
  const [A, setA] = useState([]);
  const Onchange = (val) => {
    setLoad(true);
    SetFile(val);
    if (val) {
      // var preview = document.getElementById("show-text");
      var file = val[0];
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
          //   setA(arraySort);
          let dataToPush = [];
          let dataToPushs = [];
          let i = 0;
          let j = 0;
          arraySort.forEach((is) => {
            dataToPush.push(is);
            if (i === 19) {
              dataToPushs[j] = dataToPush;
              dataToPush = [];
              i = 0;
              j++;
            } else {
              i++;
            }
          });
          const dataB = [];
          dataToPushs.forEach((value) => {
            // if (value[4] === "3100601225418") {
              dataB.push({
                TAX_NO: value[0],
                AGENCY_NAME: value[1],
                TAX_ID_AGENCY: value[2],
                ADDRESS_AGENCY: value[3],
                CITIZEN_ID: value[4],
                TAX_ID_NONECITIZEN: value[5],
                FULLNAME: value[6],
                ADDRESS_CUSTOMER: value[7],
                NO: value[8],
                TAX_PAY_TYPE: value[9],
                TAX_PAY_YEAR: value[10],
                TAX_AMOUNT: value[11],
                TAX_DEDUCTED: value[12],
                TAX_AMOUNT_TOTAL: value[13],
                TAX_DEDUCTED_TOTAL: value[14],
                TAX_TOTAL_TEXT: value[15],
                RESERVE_TYPE: value[16],
                RESERVE_AMOUNT: value[17],
                PAY_TYPE: value[18],
                DATE_SIGN: value[19],
                CUSTOMER_TYPE_ID: form.values.TYPE,
              });
            // }
          });
          console.log(dataB);
          //   setA(dataToPushs);
          setA(dataB);
        };
      } else {
        console.log("skdjhf");
      }
      reader.readAsText(file);
    } else {
      alert("Your browser is too old to support HTML5 File API");
    }
    setLoad(false);
  };
  const [Over, setOver] = useState(false);
  const show = (params) => {
    const title = form.values.TYPE === "2" ? "ลูกจ้างประจำ" : "ข้าราชการ/ข้าราชการพลเรือน";
    Swal.fire({
      icon: "info",
      title: "ยืนยันเลือกประเภทบุคลากร",
      text: title,
      showCancelButton: true,
      cancelButtonText: "ยกเลิก",
      confirmButtonText: "ยืนยันส่ง",
    }).then((res) => {
      setOver(true);
      if (res.isConfirmed === true) {
        console.log(A);
        axios
          .post(API + "/index/UploadTax50", {
            data: A,
          })
          .then((ress) => {
            if (ress.data === "success") {
              Swal.fire({
                icon: "success",
                title: "เพิ่มรายการสำเร็จ",
                timer: 1200,
                timerProgressBar: true,
                showConfirmButton: false,
              }).then((ree) => {
                setOver(false);
              });
            } else {
              setOver(false);
              console.log(ress.data);
            }
          });
      } else {
        setOver(false);
      }
    });
  };
  const resets = (params) => {
    setFileName("");
    setFileExcel([]);
  };

  return (
    <Container>
      <LoadingOverlay visible={Over} />
      <Text fz={20} fw={500}>
        อัพโหลดไฟล์หนังสือรับรองภาษี
      </Text>
      <Dropzone
        onDrop={(files) => Onchange(files)}
        // onReject={(files) => console.log("rejected files", files)}
        onReject={() => {
          console.log("sdsdsd");
        }}
        maxSize={5 * 1024 ** 2}
        accept=".txt"
        // {...props}
      >
        <Group justify="center" gap="xl" mih={220} style={{ pointerEvents: "none" }}>
          <Dropzone.Accept>
            <IconUpload
              style={{ width: rem(52), height: rem(52), color: "var(--mantine-color-blue-6)" }}
              stroke={1.5}
            />
          </Dropzone.Accept>
          <Dropzone.Idle>
            <IconPhoto style={{ width: rem(52), height: rem(52), color: "var(--mantine-color-dimmed)" }} stroke={1.5} />
          </Dropzone.Idle>

          <div>
            <Text size="xl" inline>
              ลากไฟล์มาวาง หรือ คลิกที่ว่างเพื่อเลือกไฟล์
            </Text>
            <Text size="sm" c="dimmed" inline mt={7}>
              ไฟล์นามสกุล .txt UTF-8 เท่านั้น
            </Text>
          </div>
        </Group>
      </Dropzone>{" "}
      {FileName !== "" ? (
        <Flex align={"center"} gap={10} mt={10}>
          {"ไฟล์ที่เลือก : " + FileName}
          <ActionIcon color="orange" onClick={resets}>
            <IconRestore />
          </ActionIcon>{" "}
        </Flex>
      ) : (
        ""
      )}
      <Select
        label="ประเภทบุคลากร"
        allowDeselect={false}
        data={[
          {
            value: "2",
            label: "ลูกจ้างประจำ",
          },
          {
            value: "6",
            label: "ข้าราชการ/ข้าราชการพลเรือน",
          },
        ]}
        {...form.getInputProps("TYPE")}
      />
      <Button
        mt={10}
        disabled={FileExcel.length !== 0 ? false : true}
        w={"100%"}
        h={60}
        color="green"
        onClick={() => {
          // SendFile();
          show();
        }}
        leftSection={<IconFileTypeXls />}
      >
        อัพโหลดไฟล์หนังสือรับรองภาษี
      </Button>
      {/* <Button onClick={show}></Button> */}
      {/* <FileInput
       
      /> */}
      {/* {Txt} */}
    </Container>
  );
}

export default UploadTax;
