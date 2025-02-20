import { Button, Divider, FileInput, Flex, Modal, SimpleGrid, Text } from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { IconFile } from "@tabler/icons-react";
import axios from "axios";
import { API } from "../../../Config/ConfigApi";
import Swal from "sweetalert2";
import { useState } from "react";

function UploadButton({ customers_citizent, name, type, FN }) {
  const [opened, { open, close }] = useDisclosure();
  const formupload = useForm({
    initialValues: {
      files: null,
      customers_citizent: "",
    },
    validate: {
      files: (val) => (val !== null ? null : "กรุณาเลือกไฟล์"),
    },
  });
  const ChangeFile = (data) => {
    console.log(data);
    if (data !== null) {
      formupload.setValues({ files: data });
    } else {
      formupload.setValues({ files: null });
    }
  };
  const [LBtn, setLBtn] = useState(false);
  const Submitt = async (data) => {
    try {
      setLBtn(true);
      const formdata = new FormData();
      formdata.append("file", data.files);
      formdata.append("customers_citizent", data.customers_citizent);
      const fetch = await axios.post(API + "/uploadfile/uploadfiletax", formdata);
      const response = fetch.data;
      setLBtn(false);
      if (response === "success") {
        Swal.fire({
          icon: "success",
          title: "อัพโหลดสำเร็จ",
        }).then((rr) => {
          console.log(rr);
          FN();
          close();
        });
      }
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Button
        onClick={() => {
          formupload.setValues({ customers_citizent: customers_citizent, files: null });
          open();
        }}
        size="xs"
        color="violet.8"
      >
        อัพโหลด หนังสือรับรองการหักภาษี ณ ที่จ่าย
      </Button>
      <Modal title="อัพโหลดหนังสือรับรองการหักภาษี" opened={opened} onClose={close}>
        <SimpleGrid>
          <Text>{customers_citizent}</Text>
          <Text>{name}</Text>
          <Text>{type}</Text>
        </SimpleGrid>
        <form
          onSubmit={formupload.onSubmit((val) => {
            Submitt(val);
          })}
        >
          <Flex mt={10} gap={10} direction={"column"}>
            <Divider variant="dashed" size={"md"} my={"sm"} />

            <FileInput
              error={formupload.errors.files}
              onChange={ChangeFile}
              label="ไฟล์หนังสือรับรองการหักภาษี ณ ที่จ่าย"
              leftSection={<IconFile />}
              placeholder="เลือกไฟล์ PDF"
              accept=".pdf"
            />
            <Button loading={LBtn} type="submit" fullWidth color="green.8">
              Upload
            </Button>
          </Flex>
        </form>
      </Modal>
    </div>
  );
}

export default UploadButton;
