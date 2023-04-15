import Layout from '@/components/Layout'
import NavBar from '@/components/NavBar'
import { Avatar, Box, Flex, Heading, Spacer, Text } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { getAllConversation } from '../api/chat'

const Inbox = () => {

  const { t } = useTranslation('common')
  const router = useRouter()
  const [messages, setMessages] = useState([{user : ""}]);
  const [loading, setLoading] = useState(true)
  const User = useSelector((state) => state as any)
  useEffect(() => {
    if (User.auth) {
      const token = localStorage.getItem('jwt')
      getAllConversation(token)
        .then((response) => {
          console.log(response)
          let allConvo: any = response.data
          allConvo = allConvo.filter(filterConvo)
          allConvo.map(element => {
            if(isMessageData(element)){
              element.lastMessage  = `${JSON.parse(element.lastMessage).ext} File` 
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

    var file = { ext: '', link: '', name: '', size: 0, loaded: false }

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
    <>
      <Layout>
        <NavBar></NavBar>

        <Box p={50} data-testid="inbox">
          <Heading as="h1" size="lg" mb={4}>
            {t('inbox')}
          </Heading>
          {messages[0].user != "" ? (
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
