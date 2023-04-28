import SearchUserModal from '@/components/Chat/SeachUserModel'
import Layout from '@/components/Layout'
import NavBar from '@/components/NavBar'
import {
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  Heading,
  Spacer,
  Text,
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

const Inbox = () => {
  const { t } = useTranslation('common')
  const router = useRouter()
  const [messages, setMessages] = useState([{ user: '' }])
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
          console.log(response)
          let allConvo: any = response.data
          allConvo = allConvo.filter(filterConvo)
          allConvo.map((element) => {
            if (isMessageData(element)) {
              element.lastMessage = `${JSON.parse(element.lastMessage).ext} File`
            }
          })
          setMessages(allConvo)
          setLoading(false)
        })
        .catch((error) => {
          toast(error.message)
        })
    }
  }, [User.auth])

  const isMessageData = (Message) => {
    var data = false

    let file = { ext: '', link: '', name: '', size: 0, loaded: false }

    try {
      file = JSON.parse(Message.lastMessage)
      if (file.ext && file.size) {
        data = true
      } else {
        data = false
      }
    } catch (error) {
      var data = false
    }

    if (!isNaN(parseFloat(Message.lastMessage)) && isFinite(Message.lastMessage)) {
      data = false
    }
    return data
  }
  const filterConvo = (element: any) => {
    return element.user.id != User.auth.id
  }
  return (
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
        {messages[0] ? (
          messages.map((element: any, index: number) => (
            <Flex
              key={index}
              borderWidth="1px"
              borderRadius="lg"
              p={4}
              mb={4}
              display="flex"
              alignItems="center"
              cursor={'pointer'}
              onClick={() => router.push(`/inbox/${element.user.id}`)}
            >
              <Flex>
                <Avatar
                  size="lg"
                  mr={4}
                  src={
                    element.profilePic
                      ? `data:image/jpeg;base64,${element.user.profilePic}`
                      : process.env.NEXT_PUBLIC_DEFAULT_PICTURE
                  }
                />
                <Box>
                  <Heading as="h2" size="md" mb={2}>
                    {`${element.user.firstName} ${element.user.lastName}`}
                  </Heading>
                  <Text mb={2}>{element.lastMessage}</Text>
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
  )
}

export const getServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
})
export default Inbox
