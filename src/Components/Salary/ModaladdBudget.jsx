import { useDisclosure } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import { NumberInput, TextInput, Box } from '@mantine/core';
import { Modal, Button } from '@mantine/core';
import { Input } from '@mantine/core';
import { API } from '../Config/ConfigApi';



export default function ModaladdBudget() {
  const [opened, { open, close }] = useDisclosure(false);


  const submitdata =(initialValues)=>{
        console.log(initialValues.name)
            const datafrm = new FormData(); //สร้างฟอร์มสำหรับการส่งข้อมูล
            datafrm.append("OLDID", this.props.OLDID);
            datafrm.append("details", this.state.auth_tel);
            datafrm.append("LEV", this.props.LEV);
      
            Axios.post(API+"/Finish/addfinishthesisdetails",datafrm,{
              headers: {
                  'content-type': 'multipart/form-data'
              }
            })
        
                              .then(res => {
                                  console.warn(res);
                                  console.log("response: ", res)
                                  if (res.status=== 200) {
                                  // this.showitem = true;
                                  // message.success("ลงทะเบียนสำเร็จ")
                                Swal.fire({
                                  title: 'บันทึกข้อมูลสำเร็จ',
                                  icon: 'success',
                                // showCancelButton: true,
                                  confirmButtonText: 'ตกลง',
                                // cancelButtonText: 'No, keep it'
                                }).then((result) => {
                                  this.toggle();
            
                                })
      
                                  }else{
                                  // window.location.href = '/'
                                  }
                                
                              })
    }

  const form = useForm({
    initialValues: { name: '', email: '', age: 0 },

    // functions will be used to validate values at corresponding key
    validate: {
      name: (value) => (value.length < 2 ? 'Name must have at least 2 letters' : null),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      age: (value) => (value < 18 ? 'You must be at least 18 to register' : null),
    },
  });

  return (
    <>
      <Modal opened={opened} onClose={close} title="เพิ่มงบประมาณ">
        {/* Modal content */}
       
        <Box maw={340} mx="auto">
      <form onSubmit={form.onSubmit(submitdata)}>
        <TextInput label="Name" placeholder="Name" {...form.getInputProps('name')} />
        <TextInput mt="sm" label="Email" placeholder="Email" {...form.getInputProps('email')} />
        <NumberInput
          mt="sm"
          label="Age"
          placeholder="Age"
          min={0}
          max={99}
          {...form.getInputProps('age')}
        />
        <Button type="submit" mt="sm">
          Submit
        </Button>
      </form>
    </Box>

      </Modal>

      <Button variant="filled" onClick={open}>เพิ่มงบประมาณ</Button>
    </>
  );
}