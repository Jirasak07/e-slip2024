import { useDisclosure } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import { NumberInput, TextInput, Box } from '@mantine/core';
import { Modal, Button } from '@mantine/core';
import { Input } from '@mantine/core';
import { API } from '../../Config/ConfigApi';
import axios from "axios";
import Swal from "sweetalert2";



export default function ModaladdBudget() {
  const [opened, { open, close }] = useDisclosure(false);


  const submitdata =(initialValues)=>{

            const datafrm = new FormData(); //สร้างฟอร์มสำหรับการส่งข้อมูล
            datafrm.append("namebudget", initialValues.name);
            datafrm.append("levelbudget", initialValues.levelbudget);
      
            axios.post(API+"/index/InsertBudget",datafrm,{
              headers: {
                  'content-type': 'multipart/form-data'
              }
            })
                              .then(res => {
                                  console.warn(res);
                                  if (res.status=== 200) {
                               
                                        Swal.fire({
                                          title: 'บันทึกข้อมูลสำเร็จ',
                                          icon: 'success',
                                        // showCancelButton: true,
                                          confirmButtonText: 'ตกลง',
                                        // cancelButtonText: 'No, keep it'
                                        }).then((result) => {
                                        //  this.toggle();
                                        close();
                                        })
                                  }else{
                                  // window.location.href = '/'
                                  }
                              })
    }

  const form = useForm({
    initialValues: { name: '',  levelbudget: 0 },

    // functions will be used to validate values at corresponding key
    validate: {
      name: (value) => (value.length < 2 ? 'Name must have at least 2 letters' : null),
      // email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      levelbudget: (value) => (value < 0 ? 'You must be at least 18 to register' : null),
    },
  });

  return (
    <>
      <Modal opened={opened} onClose={close} title="เพิ่มงบประมาณ">

        <Box maw={340} mx="auto">
            <form onSubmit={form.onSubmit(submitdata)}>
              <TextInput label="ชื่องบประมาณ" placeholder="ชื่องบประมาณ" {...form.getInputProps('name')} />
              <NumberInput
                mt="sm"
                label="level"
                placeholder="levelbudget"
                min={0}
                max={99}
                {...form.getInputProps('levelbudget')}
              />
              <Button type="submit" mt="sm">
                เพิ่ม
              </Button>
            </form>
    </Box>

      </Modal>

      <Button variant="filled" onClick={open}>เพิ่มงบประมาณ</Button>
    </>
  );
}