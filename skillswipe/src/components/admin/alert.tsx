import {
  ResolveMessageBan,
  ResolveMessageSafe,
  ResolveMessageWarn,
} from '@/pages/api/adminApi'
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
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

export default function Alert(props: any) {
  const { t } = useTranslation('common')
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [isLoading, setIsLoading] = useState(false)
  const cancelRef: any = React.useRef()
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
    setIsLoading(true)
    if (action === 'Ban User') {
      resolveBan()
    } else if (action === 'Send Warning') {
      resolveWarning()
    } else if (action === 'Safe') {
      resolveSafe()
    } else if (action === 'Unban User') {
      resolveUnban()
    }
  }

  const resolveSafe = () => {
    ResolveMessageSafe(token, id)
      .then((res) => {
        resolveItem(id, 'safe')
        toast({
          position: 'top-right',
          title: 'Success',
          description: t('This message has been marked as safe'),
          status: 'success',
          duration: 9000,
          isClosable: true,
        })
        setIsLoading(false)
        onCLoseParent()
        onClose()
      })
      .catch((err) => {
        toast({
          position: 'top-right',
          title: 'Error',
          description: t('An error has occured while marking this message as safe'),
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
          description: t('This user has been warned'),
          status: 'success',
          duration: 9000,
          isClosable: true,
        })
        setIsLoading(false)
        onCLoseParent()
        onClose()
      })
      .catch((err) => {
        toast({
          position: 'top-right',
          title: 'Error',
          description: t('An error has occured while warning this user'),
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
          description: t('This user has been banned'),
          status: 'success',
          duration: 9000,
          isClosable: true,
        })
        setIsLoading(false)
        onCLoseParent()
        onClose()
      })
      .catch((err) => {
        toast({
          position: 'top-right',
          title: 'Error',
          description: t('An error has occured wile banning this user'),
          status: 'success',
          duration: 9000,
          isClosable: true,
        })
      })
  }

  const resolveUnban = () => {
    resolveItem(id)
    setIsLoading(false)
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
                {t('cancel')}
              </Button>
              <Button
                colorScheme={scheme}
                onClick={takeAction}
                ml={3}
                isLoading={isLoading}
              >
                {action}
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  )
}
