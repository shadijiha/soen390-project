import Layout from '@/components/Layout'
import NavBar from '@/components/NavBar'
import { Divider, Flex, Spinner, useColorMode } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import Pusher from 'pusher-js'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import Footer from '../../components/Chat/Footer'
import Header from '../../components/Chat/Header'
import Messages from '../../components/Chat/Messages'
import { getUserById, getUserStatus } from '../api/api'
import { getConversationById, message } from '../api/chat'

const Chat = () => {
  const { t } = useTranslation('common')
  const User = useSelector((state) => state as any)
  // const [inputMessage, setInputMessage] = useState('')
  const [Load, setLoad] = useState(false)
  const router = useRouter()
  const [messages, setMessages] = useState([{}])
  const [chatUser, setchatUser] = useState({})
  const [numberOfMessages, setnumberOfMessages] = useState(null)
  const [connectionStatus,setConnectionStatus] = useState(null);

  const [Status, setStatus] = useState('offline')

  const handleSendMessage = (inputMessage: any) => {
    if (!inputMessage.trim().length) {
      return
    }
    const data = inputMessage
    const token = localStorage.getItem('jwt')
    setMessages((old) => [...old, { senderId: User.auth.id, message: data }])

    message(token, {
      message: data,
      receiverId: router.query.id,
    })
      .then((Response) => {})
      .catch((error) => {
        toast(error.message)
      })
  }

  const append = (file: any) => {
    const data = JSON.stringify(file)
    setMessages((old) => [...old, { senderId: User.auth.id, message: data }])
  }

  const sendMessagefile = (file: any) => {
    const token = localStorage.getItem('jwt')

    message(token, {
      message: JSON.stringify(file),
      receiverId: router.query.id,
    })
      .then((Response) => {
        window.location.reload()
      })
      .catch((error) => {
        toast(error.message)
      })
  }

  const loadMessage = (id: any,connected:boolean) => {
    if (localStorage.getItem('jwt')) {
      const token = localStorage.getItem('jwt')
      getConversationById(token, id)
        .then((response) => {
          setMessages(response.data)
          if(connected == true || (connected == false && response.data.length > 0) ){
            setMessages(response.data)
          }
          else{
            toast(t('notConnected'))
            router.push('/home')
          }
          setnumberOfMessages(response.data.length)
        })
        .catch((error) => {
          toast(error.message)
        })
    }
  }
  useEffect(() => {
    if (router.query.id) {
      const token = localStorage.getItem('jwt')
      if (router.query.id == User.auth.id) {
        router.push('/home')
      } else {
        getUserById(token, router.query.id)
          .then((response) => {
            setchatUser(response.data.user)
            setConnectionStatus(response.data.connectionStatus)
            if (response.data.connectionStatus == 'Connected') {
              loadMessage(router.query.id,true);
              getUserStatus(router.query.id, token)
                .then((reponse) => {
                  console.log(reponse.data)
                  setStatus(reponse.data)
                })
                .catch((error) => {
                  toast(error.message)
                })
              setchatUser(response.data.user)
            } else {
              setchatUser(response.data.user)            
              loadMessage(router.query.id,false)
              getUserStatus(router.query.id, token)
                .then((reponse) => {
                  setStatus(reponse.data)
                })
                .catch((error) => {
                  toast(error.message)
                })
            }
          })
          .catch((error) => {
            router.push('/home')
            toast(t('userNotFound'))
          })
      }
      // setLoad(true)
    }
  }, [router.query.id])

  useEffect(() => {
    if (User.auth.id) {
      setLoad(true)
    }
  }, [User.auth])
  useEffect(() => {
    // Get coversation by ID will doo when apis are fully ready
    // Message is fully function
    if (Load == true) {
      const id = router.query.id
      // TODO Add the keys in env file
      const PUSHER_APP_KEY = process.env.NEXT_PUBLIC_PUSHER_APP_KEY ?? 'null'
      const PUSHER_APP_CLUSTER = process.env.NEXT_PUBLIC_PUSHER_APP_CLUSTER ?? 'us2'
      const pusher = new Pusher(PUSHER_APP_KEY, {
        cluster: PUSHER_APP_CLUSTER,
      })
      const channel = pusher.subscribe(`message-${User.auth.id}`)
      const channel2 = pusher.subscribe(`userStatus-${id}`)
      channel.bind('message', function (data: any) {
        console.log('Message recived')
        if (data.sender == id) {
          setMessages((old) => [...old, { senderId: id, message: data.message }])
        }
      })
      channel2.bind('statusUpdate', (data: any) => {
        setStatus(data.status)
      })
      return () => {
        pusher.unsubscribe(`message-${User.auth.id}`)
      }
    }
  }, [Load])
  return (
    <>
      <Layout>
        <NavBar />
        {Load == false ? (
          <Spinner />
        ) : (
          <Flex mt={0} w="100%" h="100vh" justify="center">
            <Flex
              w="65%"
              h="75%"
              flexDir="column"
              style={{
                backgroundColor:
                  useColorMode().colorMode === 'light' ? '#FFFFFF9F' : '#FFFFFF1F',
                borderRadius: '35px',
                padding: '25px',
                boxShadow: '0px 0px 10px 0px #0000001f',
                borderColor:
                  useColorMode().colorMode === 'light' ? '#CECECEA0' : '#FFFFFF1F',
                borderWidth: '7px',
              }}
            >
              <Header user={chatUser} status={Status} />
              <Divider />
              <br />
              <Messages messages={messages} user={chatUser} />
              <Divider />
              
              <Footer
                handleSendMessage={handleSendMessage}
                sendMessagefile={sendMessagefile}
                append={append}
                connectionStatus ={connectionStatus}
              />
            </Flex>
          </Flex>
        )}
      </Layout>
    </>
  )
}

export const getServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
})

export default Chat
