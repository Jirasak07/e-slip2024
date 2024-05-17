import { Button, Container, Group, LoadingOverlay, Select, Text, rem } from "@mantine/core";
import { IconUpload, IconPhoto,  IconFileTypeXls } from "@tabler/icons-react";
import { Dropzone } from "@mantine/dropzone";
import { useState } from "react";
import axios from "axios";
import { API } from "../../Config/ConfigApi";
import Swal from "sweetalert2";
import { useForm } from "@mantine/form";
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
    setLoad(true)
    SetFile(val);
    if (val[0]) {
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
          setA(arraySort);
          let dataToPush = [];
          let dataToPushs = [];
          let i = 0;
          let j = 0;
          arraySort.forEach((is) => {
            dataToPush.push(is);
            if (i === 78) {
              dataToPushs[j] = dataToPush;
              dataToPush = [];
              i = 0;
              j++;
            } else {
              i++;
            }
            setLoad(false)
          });
          setA(dataToPushs);
        };
      } else {
        console.log("skdjhf");
      }
      reader.readAsText(file);
    } else {
      alert("Your browser is too old to support HTML5 File API");
    }
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
        axios
          .post(API + "/index/InsertGovToSlip", {
            data: A,
            customer_type_id: form.values.TYPE,
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
            }
          });
      } else {
        // setOver(false);
      }
    });
  };

  return (
    <Container>
      <LoadingOverlay visible={Over} />
      <Text fz={20} fw={500}>
        อัพโหลดไฟล์สลิป
      </Text>
      <Dropzone
        loading={Load}
        onDrop={(files) => Onchange(files)}
        onReject={(files) => console.log("rejected files", files)}
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
      {FileName !== "" ? "ไฟล์ที่เลือก : " + FileName : ""}
      <Select searchable
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
        อัพโหลดไฟล์สลิป
      </Button>
      {/* <Button onClick={show}></Button> */}
      {/* <FileInput
       
      /> */}
      {/* {Txt} */}
    </Container>
  );
}

export default Upload50;
