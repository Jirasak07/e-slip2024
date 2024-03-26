import { Button, Group, Text, rem } from "@mantine/core";
import { IconUpload, IconPhoto, IconX, IconFileSpreadsheet, IconFileTypeXls } from "@tabler/icons-react";
import { Dropzone, MS_EXCEL_MIME_TYPE } from "@mantine/dropzone";
import { useState } from "react";
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

  return (
    <>
      <Dropzone
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
      {FileName !== "" ? "ไฟล์ที่เลือก : "+FileName : ""}
      <Button
        mt={10}
        disabled={FileExcel.length !== 0 ? false : true}
        w={"100%"}
        h={60}
        color="green"
        onClick={() => {
          console.log(FileExcel);
        }}
        leftSection={<IconFileTypeXls />}
      >
        อัพโหลดไฟล์ทวิ50
      </Button>
    </>
  );
}

export default Upload50;
