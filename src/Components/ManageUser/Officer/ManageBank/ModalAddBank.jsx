import { Button, Flex, Modal, Select, SimpleGrid, TextInput } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconCashBanknote, IconDeviceFloppy } from "@tabler/icons-react";
import { API } from "../../../Config/ConfigApi";
import axios from "axios";
import { isNotEmpty, useForm } from "@mantine/form";
import Swal from "sweetalert2";

function ModalAddBank({ customers_citizent,fetch }) {
  const form = useForm({
    initialValues: {
      customers_citizent: "",
      account_number: "",
      account_type: "",
      statusbank: "1",
      bank_id: "",
      select_bank: [],
      select_bank_type: [],
    },
    validate: {
      account_number: (value) => (/^\d{3}-\d{1,5}-\d{5}-\d{1,7}$/.test(value) ? null : 'รูปแบบไม่ถูกต้อง'),
      customers_citizent:isNotEmpty("กรุณาเพิ่มข้อมูล"),
      account_type:isNotEmpty("กรุณาเพิ่มข้อมูล"),
      statusbank:isNotEmpty("กรุณาเพิ่มข้อมูล"),
      bank_id:isNotEmpty("กรุณาเพิ่มข้อมูล"),
    },
  });
  const FetchBankData = (params) => {
    axios.get(API + "/index/showbank").then((res) => {
      const data = res.data;
      if (data.length !== 0) {
        const select = data[0].bank.map((i) => ({
          value: i.bank_id,
          label: i.bank_name,
        }));
        const selecttype = data[0].bank_type.map((i) => ({
          value: i.id_account_type,
          label: i.name_account_type,
        }));
        form.setValues({
          select_bank: select,
          select_bank_type: selecttype,
          customers_citizent: customers_citizent,
        });
      }
    });
  };
  const [opened, { open, close }] = useDisclosure(false);
  const Submit = (val) => {
    const frm = new FormData();
    frm.append("customers_citizent", val.customers_citizent);
    frm.append("account_number", val.account_number);
    frm.append("account_type", val.account_type);
    frm.append("statusbank", val.statusbank);
    frm.append("bank_id", val.bank_id);
    axios.post(API+"/index/insertcustomerbank",frm).then((res)=>{
      if (res.data === "200") {
        Swal.fire({
          icon: "success",
          title: "เพิ่มข้อมูลสำเร็จ",
          timer: 1200,
          timerProgressBar: true,
          showConfirmButton: false,
        }).then((res) => {
          close();
          fetch();
        });
      }
    })
  };

  return (
    <div>
      <Button
        onClick={() => {
          FetchBankData();
          open();
        }}
        color="var(--primary)"
        size="xs"
        leftSection={<IconCashBanknote />}
      >
        เพิ่มบัญชีใหม่
      </Button>

      <Modal size={"lg"} title="เพิ่มบัญชีธนาคาร" closeOnClickOutside={false} opened={opened} onClose={close}>
        <form
          onSubmit={form.onSubmit((val) => {
            Submit(val);
          })}
        >
          <SimpleGrid cols={1}>
            <SimpleGrid cols={{ base: 1, sm: 2 }}>
              <Select searchable
                allowDeselect={false}
                
                data={form.values.select_bank}
                label="ธนาคาร"
                {...form.getInputProps("bank_id")}
              />
              <Select searchable
                allowDeselect={false}
                
                data={form.values.select_bank_type}
                label="ประเภทธนาคาร"
                {...form.getInputProps("account_type")}
              />
            </SimpleGrid>

            <TextInput label="เลขบัญชี" {...form.getInputProps("account_number")} />
            <Flex>
              <Button type="submit" color="var(--success)" leftSection={<IconDeviceFloppy />}>
                บันทึก
              </Button>
            </Flex>
          </SimpleGrid>
        </form>
      </Modal>
    </div>
  );
}
export default ModalAddBank;
