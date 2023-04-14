/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/rules-of-hooks */
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
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spacer,
  Spinner,
  Text,
  VStack,
  chakra,
  useDisclosure,
} from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { getAllConversation } from '../api/chat'

interface User {
  id: number
  name: string
}

const SearchUserModal = ({ isOpen, onClose, newMessage }) => {
  const [search, setSearch] = useState('')
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSearch = async () => {
    setLoading(true)
    // Call your API with the search query and set the users in the state
    const response = await fetch(`/api/search?q=${search}`) // Replace with your API endpoint
    const data = await response.json()
    setUsers(data)
    setLoading(false)
  }

  const handleUserSelect = (user) => {
    newMessage(user)
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay
        className={styles.blurred}
        bgColor="rgba(0, 0, 0, 0.4)"
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
        <ModalHeader>Search for a User</ModalHeader>

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

          {loading ? (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100px',
              }}
            >
              <Spinner />
            </div>
          ) : (
            <VStack mt={4} spacing={4}>
              {users.map((user) => (
                <Box key={user.id} onClick={() => handleUserSelect(user)}>
                  {user.name}
                </Box>
              ))}
            </VStack>
          )}
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="red" mr={3} onClick={onClose} borderRadius={'100px'}>
            Close
          </Button>
          <Button colorScheme="blue" onClick={handleSearch} borderRadius={'100px'}>
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
            <Button
              onClick={onOpen}
              colorScheme="blue"
              style={{
                marginLeft: '1em',
                borderRadius: '100px',
              }}
            >
              {t('newMessage')}
            </Button>
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
            <Box
              textAlign="center"
              paddingTop={'2em'}
              style={{
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <img
                alt={t('noMessages')}
                src="https://img.icons8.com/3d-fluency/256/speech-bubble-with-dots.png"
                style={{
                  height: '90px',
                  width: '90px',
                  objectFit: 'cover',
                  marginBottom: '2em',
                }}
              ></img>
              <chakra.p fontSize="xl">
                {/* click hyperlink to create application */}
                {t('noMessages')}
                <br />
              </chakra.p>
            </Box>
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
