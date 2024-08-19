import { Button, Flex, Modal, Select, SimpleGrid } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import React, { useEffect } from "react";
import { monthh } from "../../Publicc-user/Month";
import { useForm } from "@mantine/form";
import { IconDeviceFloppy } from "@tabler/icons-react";
import axios from "axios";
import { API } from "../../Config/ConfigApi";
import Swal from "sweetalert2";

function AddMonthSalaryShow({ fetch }) {
  const [opened, { open, close }] = useDisclosure();
  const form = useForm({
    initialValues: {
      YEAR: "",
      MONTH: "",
      DATA_YEAR: [],
      STATUS: "0",
    },
  });
  const GetYear = (params) => {
    const yearNow = new Date().getFullYear();
    const month = new Date().getMonth() + 1;
    const selectYear = [
      {
        value: (yearNow + 1).toString(),
        label: (yearNow + 1).toString(),
      },
      {
        value: yearNow.toString(),
        label: yearNow.toString(),
      },
      {
        value: (yearNow - 1).toString(),
        label: (yearNow - 1).toString(),
      },
    ];

    form.setValues({
      DATA_YEAR: selectYear,
      YEAR: yearNow.toString(),
      MONTH: month < 10 ? "0" + month.toString() : month.toString(),
    });
  };
  const Save = (data) => {
    const value = new FormData();
    value.append("show_year", data.YEAR);
    value.append("show_month", data.MONTH);
    value.append("show_status", data.STATUS);
    axios.post(API + "/index/AddSalaryShow", value).then((res) => {
      if (res.data === "success") {
        Swal.fire({
          icon: "success",
          title: "เพิ่มรายการสำเร็จ",
          timer: 600,
          timerProgressBar: true,
          showConfirmButton: false,
        }).then((res) => {
          fetch();
          close();
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "เพิ่มรายการไม่สำเร็จ",
        });
      }
    });
    // $show_year = $_POST['show_year'];
    // $show_month = $_POST['show_month'];
    // $show_status = $_POST['show_status'];
  };
  
  useEffect(() => {
    // GetYear();
  }, []);
  return (
    <div>
      <Button
        onClick={() => {
          GetYear();
          open();
        }}
        color="green"
        size="xs"
      >
        เพิ่มรายการที่จะแสดง
      </Button>
      <Modal
        title="เพิ่มรายการที่จะแสดง"
        opened={opened}
        onClose={() => {
          form.reset();
          close();
        }}
      >
        <form
          onSubmit={form.onSubmit((val) => {
            Save(val);
          })}
        >
          <SimpleGrid>
            <Select searchable label="ปี" allowDeselect={false} data={form.values.DATA_YEAR} {...form.getInputProps("YEAR")} />
            <Select searchable label="เดือน" allowDeselect={false} data={monthh} {...form.getInputProps("MONTH")} />
            <Select searchable
              label="สถานะ"
              allowDeselect={false}
              data={[
                {
                  value: "1",
                  label: "แสดง",
                },
                {
                  value: "0",
                  label: "ไม่แสดง",
                },
              ]}
              {...form.getInputProps("STATUS")}
            />
            <Flex justify={"flex-end"}>
              <Button type="submit" color="green" leftSection={<IconDeviceFloppy />}>
                บันทึก
              </Button>
            </Flex>
          </SimpleGrid>
        </form>
      </Modal>
    </div>
  );
}

export default AddMonthSalaryShow;
