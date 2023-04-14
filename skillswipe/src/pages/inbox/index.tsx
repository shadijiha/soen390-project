/* eslint-disable react/no-children-prop */
/* eslint-disable @next/next/no-html-link-for-pages */
import Layout from '@/components/Layout'
import NavBar from '@/components/NavBar'
import styles from '@/styles/modal.module.css'

import {
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  Heading,
  Input,
  InputGroup,
  InputLeftAddon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spacer,
  Text,
  VStack,
  useDisclosure,
} from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { getAllConversation } from '../api/chat'

const SearchUserModal = ({ isOpen, onClose, newMessage }) => {
  const [search, setSearch] = useState('')
  const [users, setUsers] = useState([])

  const handleSearch = () => {
    // Call your API with the search query and set the users in the state
  }

  const handleUserSelect = (user) => {
    newMessage(user)
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay
        className={styles.blurred}
        style={{
          display: 'flex',
          alignContent: 'start',
          justifyContent: 'start',
          alignItems: 'start',
        }}
      />
      <ModalContent
        margin={'auto'}
        borderRadius="14px"
        padding={'1em'}
        borderWidth="2px"
        display={'flex'}
        flexDirection={'column'}
        justifyContent={'space-between'}
        minWidth={'50%'}
      >
        <ModalHeader>Search for a user</ModalHeader>

        <ModalBody>
          <InputGroup>
            <InputLeftAddon children="Find User" />
            <Input
              type="text"
              value={search}
              placeholder="Type a name"
              onChange={(e) => setSearch(e.target.value)}
            />
          </InputGroup>

          <VStack mt={4} spacing={4}>
            {users.map((user) => (
              <Box key={user.id} onClick={() => handleUserSelect(user)}>
                {user.name}
              </Box>
            ))}
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="red" mr={3} onClick={onClose}>
            Close
          </Button>
          <Button colorScheme="blue" onClick={handleSearch}>
            Search
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

const Inbox = () => {
  const { t } = useTranslation('common')
  const router = useRouter()
  const [messages, setMessages] = useState([{}])
  const [loading, setLoading] = useState(true)
  const User = useSelector((state) => state as any)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const handleNewMessage = (user) => {
    console.log(user)
    // Add your logic to use the selected user for creating a new message
  }

  useEffect(() => {
    if (User.auth) {
      const token = localStorage.getItem('jwt')
      getAllConversation(token)
        .then((response) => {
          let allConvo = response.data
          allConvo = allConvo.filter(filterConvo)
          setMessages(allConvo)
          setLoading(false)
        })
        .catch((error) => {
          toast(error.message)
        })
    }
  }, [User.auth])
  const filterConvo = (element: any) => {
    return element.id != User.auth.id
  }
  return (
    <>
      <Layout>
        <NavBar></NavBar>
        <Box p={50} data-testid="inbox">
          <HStack
            style={{
              display: 'flex',
              alignContent: 'start',
              justifyContent: 'start',
              alignItems: 'start',
            }}
          >
            <Heading as="h1" size="lg" mb={4}>
              {t('inbox')}
            </Heading>
            <Button onClick={onOpen}>{t('newMessage')}</Button>
            <SearchUserModal
              isOpen={isOpen}
              onClose={onClose}
              newMessage={handleNewMessage}
            />
          </HStack>
          {messages.length > 0 ? (
            messages.map((element: any) => (
              <Flex
                key={element.id}
                borderWidth="1px"
                borderRadius="lg"
                p={4}
                mb={4}
                display="flex"
                alignItems="center"
                cursor={'pointer'}
                onClick={() => router.push(`/inbox/${element.id}`)}
              >
                <Flex>
                  <Avatar
                    size="lg"
                    mr={4}
                    src={
                      element.profilePic
                        ? `data:image/jpeg;base64,${element.profilePic}`
                        : process.env.NEXT_PUBLIC_DEFAULT_PICTURE
                    }
                  />
                  <Box>
                    <Heading as="h2" size="md" mb={2}>
                      {`${element.firstName} ${element.lastName}`}
                    </Heading>
                    <Text mb={2}>{element.text}</Text>
                  </Box>
                </Flex>
                <Spacer />
              </Flex>
            ))
          ) : (
            <h1>{t('noMessages')}</h1>
          )}
        </Box>
      </Layout>
    </>
  )
}

export const getServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
})
export default Inbox
