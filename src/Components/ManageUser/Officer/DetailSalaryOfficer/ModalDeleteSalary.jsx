import { Button } from '@mantine/core'
import { IconTrash } from '@tabler/icons-react'
import React from 'react'

function ModalDeleteSalary() {
  return (
    <div>
      <Button size='xs' leftSection={<IconTrash/>} color='var(--danger)' >
        ลบ
      </Button>
    </div>
  )
}

export default ModalDeleteSalary
