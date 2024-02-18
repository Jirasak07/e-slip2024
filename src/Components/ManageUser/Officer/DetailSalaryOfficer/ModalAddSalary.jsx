import { Button, Flex, Modal, NumberInput, Select, SimpleGrid, TextInput } from "@mantine/core";
import { IconDeviceFloppy, IconPlus, IconSearch } from "@tabler/icons-react";
import React, { useState } from "react";
import { API } from "../../../Config/ConfigApi";
import axios from "axios";
import { useForm } from "@mantine/form";

function ModalAddSalary({ Month, YearSelect, DataYear, DataMonth, DataBudget }) {
  const [Open, setOpen] = useState(false);
  const form = useForm({
    initialValues: {
      year: YearSelect,
      month: Month,
      idbudget: null,
      salary: null,
      citizenid: "",
    },
  });
  
  return (
    <div>
      <Button
        onClick={() => {
          setOpen(true);
        }}
        color="var(--success)"
        leftSection={<IconPlus />}
      >
        เพิ่มข้อมูลเงินเดือน
      </Button>
      <Modal
        opened={Open}
        onClose={() => {
          setOpen(false);
        }}
        title="เพิ่มข้อมูลเงินเดือน"
      >
        <SimpleGrid cols={{ base: 1, sm: 2 }}>
          <Select data={DataYear} {...form.getInputProps("year")} readOnly label="ปีล่าสุด" />
          <Select data={DataMonth} {...form.getInputProps("month")} allowDeselect={false} label="เดือนล่าสุด" />
          <Select
            data={DataBudget}
            allowDeselect={false}
            label="ประเภทงบประมาณล่าสุด"
            {...form.getInputProps("idbudget")}
          />
          <NumberInput {...form.getInputProps("salary")} thousandSeparator suffix=" ฿" label="เงินเดือนล่าสุด" />
        </SimpleGrid>{" "}
        <Flex justify={"flex-end"} py={10}>
          <Button color="var(--success)" leftSection={<IconDeviceFloppy />}>
            บันทึก
          </Button>
          <Button onClick={() => setOpen(false)} color="var(--danger)" variant="transparent">
            ยกเลิก
          </Button>
        </Flex>
      </Modal>
    </div>
  );
}

export default ModalAddSalary;
