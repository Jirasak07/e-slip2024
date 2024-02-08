import { Button } from '@mantine/core'
import { IconBook } from '@tabler/icons-react'
import React from 'react'

function ModalEditBankOfficer() {
  return (
    <>
         <Button leftSection={<IconBook/>} size='xs' color='var(--primary)' >
       บัญชี
        </Button> 
    </>
  )
}

export default ModalEditBankOfficer
