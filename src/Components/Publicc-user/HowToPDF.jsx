import { Button, Flex, Image, Paper, SimpleGrid, Stack, Text } from "@mantine/core";
import { IconBulb, IconLamp, IconLighter, IconWorld } from "@tabler/icons-react";
import img1 from "../../assets/1/1.jpg";
import img2 from "../../assets/1/2.jpg";
import img3 from "../../assets/1/3.jpg";
import img4 from "../../assets/1/5.jpg";
import img5 from "../../assets/1/6.jpg";
import React from "react";

function HowToPDF() {
  return (
    <div>
      <Flex>
        <IconBulb /> <Text>เทคนิคการแยกไฟล์ PDF แบบง่ายๆ</Text>
      </Flex>

      <Paper shadow="md" mt={15} p={10}>
        <Text>ขั้นตอนการแบ่งส่วน (ตัดครึ่ง)</Text>
        <Text pl={10} fw={300} fz={"14"}>
          -ใช้สำหรับต้องการแบ่ง PDF เป็นส่วนๆ เช่นสลิปเงินเดือนข้าราชการที่ต้องทำมาตัดหรือแยกออกก่อน
        </Text>
      </Paper>
      <SimpleGrid mt={20} px={10}>
        <Stack>
          <Text>
            1. เข้าเว็บ{" "}
            <Button
              size="xs"
              variant="light"
              onClick={() => {
                window.open("https://pdfresizer.com/crop");
              }}
            >
              <IconWorld />
              pdfresizer.com
            </Button>
          </Text>
          <Image src={img1} />
        </Stack>
        <Stack>
          <Text>
            2. เลือกไฟล์ จากนั้นคลิกอัพโหลด
          </Text>
          <Image src={img2} />
        </Stack>
        <Stack>
          <Text>
            3. ลากตามขนาดที่ต้องการ จากนั้นคลิก Crop It
          </Text>
          <Image src={img3} />
        </Stack>
        <Stack>
          <Text>
            4. จากนั้นคลิก download จะได้ไฟล์ที่ตัดแล้ว ทำอีกครั้งนึง โดย crop ด้านล่างต่อ
          </Text>
          <Image src={img4} />
        </Stack>
        <Stack>
          <Text>
            5. จะได้ไฟล์ทั้งหมดมา 2 ไฟล์ แล้วตั้งชื่อให้เรียบร้อย
          </Text>
          <Image src={img4} />
        </Stack>
       
      </SimpleGrid>
    </div>
  );
}

export default HowToPDF;
