/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/jsx-no-undef */
import {
  Heading,
  Avatar,
  Badge,
  Box,
  Center,
  Button,
  Flex,
  HStack,
  Link,
  Spacer,
  Text,
  useColorModeValue,
  Stack,
  Icon,
} from '@chakra-ui/react'

import type { InferGetStaticPropsType } from 'next'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'

import Pusher from 'pusher-js'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { getStaticProps } from '.'
import Layout from '../components/Layout'
import NavBar from '../components/NavBar'
import { acceptRequest, getPendingRequest, removeConnection, sendRequest } from './api/api'

import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { getAllConversation, getConversationById, /*getSuggestedUsers */} from './api/chat'
import { px } from 'framer-motion'

const Notifications = (_props: InferGetStaticPropsType<typeof getStaticProps>) => {
  const [pendingConnections, setPendingConnections] = useState([
    { user: { id: '', firstName: '', lastName: '', profilePic: '', timestamp: '' } },
  ])
  const [messageNotification, setmessageNotification] = useState([])
  // const [suggestedUsers, setSuggestedUsers] = useState([])
  const currentUser = useSelector((state) => state as any)
  const router = useRouter()
  const [loading1, setloading1] = useState(0)
  const [loading2, setloading2] = useState(0)
  const buttonColors = useColorModeValue('black', 'white')

  const users = [
    {
      name: "John Doe",
      jobTitle: "Software Developer",
      company: "Amazon",
      location: "Toronto, Canada",
      avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    },
    {
      name: "Jane Smith",
      jobTitle: "UX Designer",
      company: "Facebook",
      location: "Vancouver, Canada",
      avatar: "https://randomuser.me/api/portraits/women/2.jpg",
    },
    {
      name: "Bob Johnson",
      jobTitle: "Marketing Manager",
      company: "Google",
      location: "Montreal, Canada",
      avatar: "https://randomuser.me/api/portraits/men/3.jpg",
    },
  ];
  
  useEffect(() => {
    getPendingConnections()
    getMessage()
    // getSuggestions()
    const PUSHER_APP_KEY = process.env.NEXT_PUBLIC_PUSHER_APP_KEY ?? 'null'
    const PUSHER_APP_CLUSTER = process.env.NEXT_PUBLIC_PUSHER_APP_CLUSTER ?? 'us2'
    const pusher = new Pusher(PUSHER_APP_KEY, {
      cluster: PUSHER_APP_CLUSTER,
    })
    const channel = pusher.subscribe(`user-${currentUser.auth.id}`)
    channel.bind('friend-request', function (data) {
      addRequest()
    })
    channel.bind('message-notification', function (data) {
      getMessage()
    })
  }, [currentUser])

  const getPendingConnections = () => {
    if (typeof localStorage !== 'undefined') {
      const token = localStorage.getItem('jwt')
      getPendingRequest(token)
        .then((res) => {
          setPendingConnections(res.data)
          setloading2(res.data.length)
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
        })
        .catch((err) => {
          toast.error(err)
        })
      toast.success('Request Accepted')
    }
  }
  const [Status, setStatus] = useState({
    connected: false,
    Requested: false,
    Pending: false,
  })
  const Request = () => {
    const token = localStorage.getItem('jwt')
    sendRequest(token, router.query.id)
      .then((reponse) => {
        setStatus({ ...Status, Requested: true })
      })
      .catch((error) => {
        toast(error.message)
      })
  }
  const addRequest = () => {
    getPendingConnections()
  }
  const { t } = useTranslation('common')

  const getMessage = async () => {
    const token = localStorage.getItem('jwt')
    const notification: any = []
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
                const notif: any = {
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
          setloading1(notification.length)
          setmessageNotification(notification)
        })
      } catch (error) {
        toast(error.message)
      }
    }
  }

  // const getSuggestions = async () => {
  //   const token = localStorage.getItem('jwt')
  //   if (token) {
  //     try {
  //       const res = await getSuggestedUsers(token)
  //       setSuggestedUsers(res.data)
  //     } catch (error) {
  //       toast(error.message)
  //     }
  //   }
  // }

  const handleImageError = (self) => {
    self.target.src = 'https://img.icons8.com/emoji/512/carp-streamer.png'
    console.log('Error loading logo image')
  }

  const handleImageLoad = () => {
    console.log('Logo image loaded successfully')
  }

  return (
    <>
      <Layout>
        <NavBar
          nbNotifications={pendingConnections.length + messageNotification.length}
          addRequest={addRequest}
        ></NavBar>
        <Flex  justifyContent="center">
      <Box ml="2">
        <Box p={4} >
          <Heading as="h1" size="lg" mb={4} >
            {t('pendingRequests')}
          </Heading>
          <Flex flexDirection={'column-reverse'} >
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
                      <Avatar
                        size="lg"
                        mr={4}
                        src={
                          connection.user.profilePic
                            ? `data:image/jpeg;base64,${connection.user.profilePic}`
                            : process.env.NEXT_PUBLIC_DEFAULT_PICTURE
                        }
                      />
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
                      >
                        {' '}
                        <text>{t('accept')}</text>
                      </Button>
                    </HStack>
                  </Box>
                </Flex>
              ))
            ) : (
              <footer>
                <Text>{t('noPendingRequests')}</Text>
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
                        {t('new')}
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

          {/* <Heading as="h1" size="lg" mb={4}>
            {t('suggestions')}
          </Heading>
          {suggestedUsers.length > 0 ? (
            suggestedUsers.map((user: any) => (
              <Flex
                key={user.id}
                borderWidth="1px"
                borderRadius="lg"
                p={4}
                mb={4}
                display="flex"
                alignItems="center"
              >
                <Link href={`/profile/${user.id}`}>
                  <Flex>
                    <Avatar
                      size="lg"
                      mr={4}
                      src={
                        user.profilePic
                          ? `data:image/jpeg;base64,${user.profilePic}`
                          : process.env.NEXT_PUBLIC_DEFAULT_PICTURE
                      }
                    />
                    <Box>
                      <Heading as="h2" size="md" mb={2}>
                        {user.firstName} {user.lastName}
                      </Heading>
                      <Text mb={2}>{user.bio}</Text>
                      <Text fontSize="sm">{user.timestamp}</Text>
                    </Box>
                  </Flex>
                </Link> 
                </Flex>
            ))
          ) : (
            <Text>{t('noSuggestions')}</Text>
          )} */}

<Box py="4" >
  <Heading as="h1" size="lg" mb={8}>
    People you might know
  </Heading>
  <Flex flexWrap="wrap" justifyContent= "around ">
    {users.map((user) => (
    <Box
    maxW={'260px'}
    w={'full'}
    bg={useColorModeValue('white', 'gray.900')}
    boxShadow={'2xl'}
    rounded={'lg'}
    p={3}
    mb={8}
    mx={6}
    textAlign={'center'}>
    <Avatar
      size={'xl'}
      src={user.avatar} 
      mb={4}
      pos={'relative'}

    />
    <Heading fontSize={'2xl'} fontFamily={'body'}>
      {user.name}
    </Heading>
    
    <Text
      textAlign={'center'}
      color={useColorModeValue('gray.700', 'gray.400')}
      px={3}
    >
     {user.jobTitle}
     <Box display="flex" flexDirection="row" justifyContent="center" alignItems="center" mt={2}>
  <Text fontSize="md" fontWeight="medium" mr={2}>
    Works at
  </Text>
  <Text fontSize="md" color={useColorModeValue('gray.700', 'gray.400')} mr={2}>
    {user.company}
  </Text>
  <img
    src={`https://www.${user.company.toLowerCase()}.com/favicon.ico`}
    alt={`${user.company} logo`}
    width={20}
    height={20}
    onError={handleImageError}
    onLoad={handleImageLoad}
  />
</Box>

    </Text>

    <Text mt={14}
      textAlign={'center'}
      color={useColorModeValue('gray.700', 'gray.400')}
      px={3}>
        {user.location}
    </Text>

    <Stack mt={8} direction={'row'} spacing={4}>
      <Button
       flex={1}
       className="profile-button button"
       onClick={Request}
       style={{
         color: buttonColors,
         borderColor: buttonColors,
         borderWidth: '2px',
         textShadow: '0px 0px 40px #000000CA',
         fontWeight: 600,
         marginRight: '1em',
       }}
       >
        Connect 
      </Button>
    </Stack>
   </Box>
    ))}
    </Flex>
  </Box>

        </Box>
        </Box>
      </Flex>
</Layout>
    </>
  )

}

export const getServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
})

export default Notifications
