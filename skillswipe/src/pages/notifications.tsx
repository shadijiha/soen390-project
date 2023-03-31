import Layout from '@/components/Layout'
import NavBar from '@/components/NavBar'
import {
  Avatar,
  Badge,
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Spacer,
  Text,
} from '@chakra-ui/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Pusher from 'pusher-js'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { acceptRequest, getPendingRequest, removeConnection } from './api/api'
import { useTranslation, Trans } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import type { GetStaticProps, InferGetStaticPropsType } from 'next'
import { type } from 'os'
import { useRouter } from 'next/router'

const Notifications = (_props: InferGetStaticPropsType<typeof getStaticProps>) => {

import { getAllConversation, getConversationById } from './api/chat'


  const [pendingConnections, setPendingConnections] = useState([
    { user: { id: '', firstName: '', lastName: '', profilePic: '', timestamp: '' } },
  ])
  const [messageNotification, setmessageNotification] = useState([])
  const currentUser = useSelector((state) => state as any)
  const router = useRouter()
  const [loading1, setloading1] = useState(0)
  const [loading2, setloading2] = useState(0)

  useEffect(() => {
    getPendingConnections()
    getMessage()
    const PUSHER_APP_KEY = process.env.NEXT_PUBLIC_PUSHER_APP_KEY ?? 'null'
    const PUSHER_APP_CLUSTER = process.env.NEXT_PUBLIC_PUSHER_APP_CLUSTER ?? 'us2'
    const pusher = new Pusher(PUSHER_APP_KEY, {
      cluster: PUSHER_APP_CLUSTER,
    })
    var channel = pusher.subscribe(`user-${currentUser.auth.id}`)
    channel.bind('friend-request', function (data) {

      addRequest()
    })
    channel.bind('message-notification', function (data) {
      getMessage()
    })
  }, [currentUser])

  const notifications = [
    {
      id: 1,
      title: 'New message',
      description: 'You have a new message from John Doe',
      timestamp: '2023-03-01T09:00:00Z',
      avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    },
    {
      id: 2,
      title: 'New Friend Request',
      description: 'Please add me to your network',
      timestamp: '2023-03-02T10:30:00Z',
      avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
    },
  ]

  const getPendingConnections = () => {
    if (typeof localStorage !== 'undefined') {
      const token = localStorage.getItem('jwt')
      getPendingRequest(token)
        .then((res) => {
          setPendingConnections(res.data)
          setloading2(res.data.length);
        })
        .catch((err) => {
          toast.error(err)
        })
    }
  }

  const ignore = (id) => {
    if (typeof localStorage !== 'undefined') {
      const token = localStorage.getItem('jwt')
      removeConnection(token, id)
        .then((res) => {
          setPendingConnections(
            pendingConnections.filter((connection: any) => connection.user.id !== id)
          )
          toast.success(t('connectionRemoved'))
        })
        .catch((err) => {
          toast.error(err)
        })
    }
  }

  const accept = (id) => {
    if (typeof localStorage !== 'undefined') {
      const token = localStorage.getItem('jwt')
      acceptRequest(token, id)
        .then((res) => {
          setPendingConnections(
            pendingConnections.filter((connection: any) => connection.user.id !== id)

          )
          toast.success(t('requestAccepted'))

            )
            
          toast.success('Request Accepted')

        })
        .catch((err) => {
          toast.error(err)
        })
    }
  }

  const addRequest = () => {
    getPendingConnections()
  }
  const { t } = useTranslation('common')


  const getMessage = async () => {
    const token = localStorage.getItem('jwt')
    var notification: any = []
    if (token) {
      try {
        const allConvo = await getAllConversation(token)
        allConvo.data.map(async (element) => {
          const convo = await getConversationById(token, element.id)

          await Promise.all(
            convo.data.map(async (el) => {
              // console.log(el)
              const created_at: Date = new Date(el.created_at)
              const currentDate: Date = new Date()
              const diffInMs: any = currentDate.getTime() - created_at.getTime()
              const diffInHrs: number = diffInMs / (1000 * 60 * 60)
              if (el.receiverId == currentUser.auth.id && diffInHrs < 24) {
                var notif: any = {
                  id: element.id,
                  firstName: element.firstName,
                  lastName: element.lastName,
                  created_at: el.created_at,
                  profilePic: element.profilePic,
                }
                notification.push(notif)
              }
            })
          )
          notification.sort((a, b) => {
            const cr1: any = new Date(a.created_at)
            const cr2: any = new Date(b.created_at)
            return cr2.getTime() - cr1.getTime()
          })
          setloading1(notification.length);
          setmessageNotification(notification)
        })
      } catch (error) {
        toast(error.message)
      }
    }
  }

  return (
    <>
      <Layout>
        <NavBar
          nbNotifications={pendingConnections.length + messageNotification.length}
          addRequest={addRequest}
        ></NavBar>
        <Box p={4}>
          <Heading as="h1" size="lg" mb={4}>
            {t('pendingRequests')}
          </Heading>
          <Flex flexDirection={'column-reverse'}>
            {pendingConnections.length > 0 ? (
              pendingConnections.map((connection: any) => (
                <Flex
                  key={connection.user.id}
                  borderWidth="1px"
                  borderRadius="lg"
                  p={4}
                  mb={4}
                  display="flex"
                  alignItems="center"
                >
                  <Link href={`/profile/${connection.user.id}`}>
                    <Flex>
                      <Avatar size="lg" mr={4} src={connection.user.profilePic} />
                      <Box>
                        <Heading as="h2" size="md" mb={2}>
                          {connection.user.firstName} {connection.user.lastName}
                          <Badge ml="1" colorScheme="green">
                            {t('new')}
                          </Badge>
                        </Heading>
                        <Text mb={2}>Please add me to your network</Text>
                        <Text fontSize="sm">{connection.user.timestamp}</Text>
                      </Box>
                    </Flex>
                  </Link>
                  <Spacer />
                  <Box>
                    <HStack>
                      <Button
                        colorScheme="gray"
                        onClick={() => ignore(connection.user.id)}
                      >
                        {t('ignore')}
                      </Button>
                      <Button
                        colorScheme="twitter"
                        onClick={() => accept(connection.user.id)}
                      > <text>{t('accept')}</text>
                       
                      </Button>
                    </HStack>
                  </Box>
                </Flex>
              ))
            ) : (
              <footer>
                <Text>
                  {t('noPendingRequests')}
                </Text>
              </footer>
            )}
          </Flex>
        </Box>
        <Box p={4}>
          <Heading as="h1" size="lg" mb={4}>
           
            {t('notifications')}
          </Heading>
          {messageNotification.length > 0 ? (
            messageNotification.map((notification: any, index) => (
              <Flex
                key={index}
                borderWidth="1px"
                borderRadius="lg"
                p={4}
                mb={4}
                display="flex"
                alignItems="center"
              >
                <Flex>
                  <Avatar
                    size="lg"
                    mr={4}
                    src={
                      notification.profilePic
                        ? `data:image/jpeg;base64,${notification.profilePic}`
                        : process.env.NEXT_PUBLIC_DEFAULT_PICTURE
                    }
                  />
                  <Box>
                    <Heading
                      as="h2"
                      size="md"
                      mb={2}
                      style={{ cursor: 'pointer' }}
                      onClick={() => {
                        router.push(`/inbox/${notification.id}`)
                      }}
                    >
                      {`${notification.firstName} ${notification.lastName}`}{' '}
                      <Badge ml="1" colorScheme="green">
                        {t("new")}
                      </Badge>
                    </Heading>
                    <Text
                      mb={2}
                    >{`You have a new message from ${notification.firstName} ${notification.lastName}`}</Text>
                    <Text fontSize="sm">{notification.created_at}</Text>
                  </Box>
                </Flex>
              </Flex>
            ))
          ) : (
            <Text>{t('noNotifications')}</Text>
          )}
        </Box>
      </Layout>
    </>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
})

export default Notifications;

