import {
  ResolveMessageBan,
  ResolveMessageSafe,
  ResolveMessageWarn,
} from '@/pages/admin/adminApi'
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  useDisclosure,
  useToast,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

export default function Alert(props: any) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = React.useRef()
  const { title, message, action, scheme, id, resolveItem } = props
  const onCLoseParent = props.close
  const router = useRouter()
  const [token, setToken] = useState('')
  const toast = useToast()

  useEffect(() => {
    const token = localStorage.getItem('jwt')
    if (!token) {
      router.push({ pathname: '/login' })
    } else {
      setToken(token)
    }
  }, [])
  const takeAction = () => {
    if (action === 'Ban User') {
      resolveBan()
    } else if (action === 'Send Warning') {
      resolveWarning()
    } else if (action === 'Safe') {
      resolveSafe()
    }
    onCLoseParent()
    onClose()
  }

  const resolveSafe = () => {
    ResolveMessageSafe(token, id)
      .then((res) => {
        resolveItem(id, 'safe')
        toast({
          position: 'top-right',
          title: 'Success',
          description: 'This message has been marked safe',
          status: 'success',
          duration: 9000,
          isClosable: true,
        })
      })
      .catch((err) => {
        toast({
          position: 'top-right',
          title: 'Error',
          description: "An error has occured while marking this message as 'safe'",
          status: 'error',
          duration: 9000,
          isClosable: true,
        })
      })
  }

  const resolveWarning = () => {
    ResolveMessageWarn(token, id)
      .then((res) => {
        resolveItem(id, 'warned')
        toast({
          position: 'top-right',
          title: 'Success',
          description: 'This user has been warned',
          status: 'success',
          duration: 9000,
          isClosable: true,
        })
      })
      .catch((err) => {
        toast({
          position: 'top-right',
          title: 'Error',
          description: 'An error has occured while warning this user',
          status: 'error',
          duration: 9000,
          isClosable: true,
        })
      })
  }

  const resolveBan = () => {
    ResolveMessageBan(token, id)
      .then((res) => {
        resolveItem(id, 'banned')
        toast({
          position: 'top-right',
          title: 'Success',
          description: 'This user has been banned',
          status: 'success',
          duration: 9000,
          isClosable: true,
        })
      })
      .catch((err) => {
        toast({
          position: 'top-right',
          title: 'Error',
          description: 'An error has occured wile banning this user',
          status: 'success',
          duration: 9000,
          isClosable: true,
        })
      })
  }

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
