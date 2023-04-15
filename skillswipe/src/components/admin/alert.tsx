import { ResolveMessageSafe } from '@/pages/admin/adminApi'
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  useDisclosure,
} from '@chakra-ui/react'
import React from 'react'
import { toast } from 'react-toastify'


function Alert(props: any) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = React.useRef()
  const { title, message, action, scheme, token, id } = props

  const takeAction = () => {
    switch (action) {
        case 'Ban User':

    onClose()
  }

  const banUser = () => {
    ResolveMessageSafe(token, id ).then((res) => {
    toast.success('User has been banned')  
    }).catch((err) => {
    toast.error('Something went wrong, try again later')
    })


  return (
    <>
      <Button colorScheme={scheme} onClick={onOpen} mr={2}>
        {action}
      </Button>

      <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              {title}
            </AlertDialogHeader>

            <AlertDialogBody>{message}</AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme={scheme} onClick={takeAction} ml={3}>
                {action}
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  )
}

export default Alert
