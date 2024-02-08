import { Button } from '@mantine/core'
import { IconEdit } from '@tabler/icons-react'
import React from 'react'

function ModalEditOfficer() {
  return (
    <>
     <Button leftSection={<IconEdit/>} size='xs' color='var(--warning)' >
       แก้ไข
        </Button> 
    </>
  )
}

export default ModalEditOfficer
