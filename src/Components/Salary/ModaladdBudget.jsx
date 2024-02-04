import { useDisclosure } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import { NumberInput, TextInput, Box } from '@mantine/core';
import { Modal, Button } from '@mantine/core';
import { Input } from '@mantine/core';


export default function ModaladdBudget() {
  const [opened, { open, close }] = useDisclosure(false);

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
      <form onSubmit={form.onSubmit(console.log)}>
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