/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/jsx-no-undef */
import {
  Avatar,
  Badge,
  Box,
  Button,
  Center,
  Divider,
  Flex,
  Heading,
  Icon,
  HStack,
  Link,
  Spacer,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'

import type { InferGetStaticPropsType } from 'next'
import { useTranslation } from 'next-i18next'
import { default as NextLink } from 'next/link'
import { useRouter } from 'next/router'
import Pusher from 'pusher-js'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { getStaticProps } from '.'
import Layout from '../components/Layout'
import NavBar from '../components/NavBar'
import {
  acceptRequest,
  getPendingRequest,
  getUserById,
  jobNotificationApi,
  readJobNotifications,
  removeConnection,
  sendRequest,
} from './api/api'
import { getSuggestedUsers } from './api/profile_api'

import { px } from 'framer-motion'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { getAllConversation, getConversationById } from './api/chat'

const Notifications = (_props: InferGetStaticPropsType<typeof getStaticProps>) => {
  const [pendingConnections, setPendingConnections] = useState([
    { user: { id: '', firstName: '', lastName: '', profilePic: '', timestamp: '' } },
  ])
  const [messageNotification, setmessageNotification] = useState([])
  const [suggestedFriends, setSuggestedFriends] = useState([])
  const [jobNotification, setJobNotification] = useState([
    {
      id: 64,
      type: '',
      text: 'A new job by hdwgjhxgdw, Job noti test, has been posted that matches your skills: Java',
      photo: null,
      link: '/jobId/66',
      title: null,
      read: false,
      created_at: '2023-04-20T04:26:54.724Z',
      updated_at: '2023-04-20T04:26:54.724Z',
      deleted_at: null,
    },
  ])
  const currentUser = useSelector((state) => state as any)
  const router = useRouter()
  const [loading, setloading] = useState(true)
  const [loading1, setloading1] = useState(0)
  const [loading2, setloading2] = useState(0)
  const [loading3, setloading3] = useState(0)
  const buttonColors = useColorModeValue('black', 'white')
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobileNo: '',
    gender: '',
    profilePic: '',
    coverPic: '',
    biography: '',
    skills: [],
    awards: [],
    workExperiences: [],
    educations: [],
    volunteeringExperience: [],
    recommendationsReceived: [],
    projects: [],
    courses: [],
    Languages: [],
  })

  useEffect(() => {
    getPendingConnections()
    getMessage()
    getSuggestedFriends()
    getJobNotifications()
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
    channel.bind('newJob', function (data) {
      getJobNotifications()
    })
  }, [currentUser])

  const getJobNotifications = () => {
    const token = localStorage.getItem('jwt')
    jobNotificationApi(token)
      .then((res) => {
        // console.log(res)
        setJobNotification(res.data)
      })
      .catch((err) => {
        toast.error(err)
      })
  }
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
  const Request = (id) => {
    const token = localStorage.getItem('jwt')
    sendRequest(token, id)
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

  const Reject = (id) => {
    const token = localStorage.getItem('jwt')
    removeConnection(token, id)
      .then((reponse) => {
        setStatus({ connected: false, Requested: false, Pending: false })
        toast.success('Connection has been removed', { type: 'success' })
      })
      .catch((error) => {
        toast(error.message)
      })
  }

  useEffect(() => {
    if (router.query.id) {
      console.log(router.query.id)
      if (router.query.id == currentUser.auth.id) {
        console.log('same url')
        router.push('/home')
      } else {
        const token = localStorage.getItem('jwt')
        getUserById(token, router.query.id)
          .then((response: any) => {
            console.log(response.data)
            setUser(response.data.user)
            if (response.data.connectionStatus == 'NotConnected') {
              setStatus({ ...Status, connected: false })
              console.log('Status')
            } else {
              if (response.data.connectionStatus == 'Pending') {
                getPendingRequest(token).then((response) => {
                  console.log(response)
                  if (response.data.length > 0) {
                    let found = false
                    console.log(response.data)
                    response.data.map((element: any) => {
                      if (element.user.id == router.query.id) {
                        setStatus({ ...Status, Pending: true })
                        found = true
                      }
                    })
                    if (found == false) {
                      setStatus({ ...Status, Requested: true })
                    }
                  } else {
                    setStatus({ ...Status, Requested: true })
                  }
                })
              } else {
                setStatus({ ...Status, connected: true })
              }
            }
            console.log(Status)
            setloading(false)
          })
          .catch((error) => {
            toast(t('userNotFound'))
            router.push('/')
          })
      }
    }
  }, [router.query])

  const { t } = useTranslation('common')

  const getMessage = async () => {
    const token = localStorage.getItem('jwt')
    const notification: any = []
    if (token) {
      try {
        const allConvo = await getAllConversation(token)
        allConvo.data.map(async (element) => {
          const convo = await getConversationById(token, element.user.id)

          await Promise.all(
            convo.data.map(async (el) => {
              // console.log(el)
              const created_at: Date = new Date(el.created_at)
              const currentDate: Date = new Date()
              const diffInMs: any = currentDate.getTime() - created_at.getTime()
              const diffInHrs: number = diffInMs / (1000 * 60 * 60)
              if (el.receiverId == currentUser.auth.id && diffInHrs < 24) {
                const notif: any = {
                  id: element.user.id,
                  firstName: element.user.firstName,
                  lastName: element.user.lastName,
                  created_at: el.created_at,
                  profilePic: element.user.profilePic,
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

  const getSuggestedFriends = () => {
    if (typeof localStorage !== 'undefined') {
      const token = localStorage.getItem('jwt')
      getSuggestedUsers(token)
        .then((res) => {
          setSuggestedFriends(res.data)
          setloading3(res.data.length)
        })
        .catch((err) => {
          toast.error(err)
        })
    }
  }
  const readNotification = (id) => {
    const token = localStorage.getItem('jwt')
    getSuggestedUsers(token)
    readJobNotifications(token, id)
      .then((res: any) => {
        toast(res)
      })
      .catch((err) => {
        toast.error(err)
      })
  }

  const viewUsers = () => {
    getSuggestedFriends()
  }

  const handleImageError = (self) => {
    self.target.src = 'https://img.icons8.com/emoji/512/carp-streamer.png'
    console.log('Error loading logo image')
  }

  const handleImageLoad = () => {
    console.log('Logo image loaded successfully')
  }
  const handleJobNotification = (job) => {
    readNotification(job)
    router.push(`/jobListing/${job}`)
  }

  return (
    <>
      <Layout>
        <NavBar
          nbNotifications={
            pendingConnections.length +
            messageNotification.length +
            suggestedFriends.length +
            jobNotification.length
          }
          addRequest={addRequest}
        ></NavBar>
        <Flex justifyContent="center">
          <Box ml="2">
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
                            <Text mb={2}>{t('Please add me to your network')}</Text>
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
              <br></br>
              <Divider />
              <Box py="4">
                <Heading as="h1" size="lg" mb={8}>
                  {t('People you might know')}
                </Heading>
                <Flex flexWrap="wrap" justifyContent="around ">
                  {suggestedFriends.length > 0 ? (
                    suggestedFriends.map((friend: any) => (
                      <Box
                        key={friend.id}
                        maxW={'260px'}
                        w={'full'}
                        bg={
                          friend.coverPic
                            ? `url(data:image/jpeg;base64,${friend.coverPic})`
                            : 'gray.700'
                        }
                        boxShadow={'2xl'}
                        borderRadius={'20px'}
                        borderWidth={'3px'}
                        borderColor={'white.900'}
                        p={10}
                        mb={8}
                        mx={6}
                        textAlign={'center'}
                      >
                        <Avatar
                          size={'xl'}
                          src={
                            friend.profilePic
                              ? `data:image/jpeg;base64,${friend.profilePic}`
                              : process.env.NEXT_PUBLIC_DEFAULT_PICTURE
                          }
                          mb={4}
                          pos={'relative'}
                          boxShadow={'2xl'}
                        />
                        <NextLink href={`profile/${friend.id}`}>
                          <Heading fontSize={'2xl'} fontFamily={'body'}>
                            {friend.firstName} {friend.lastName}
                          </Heading>
                        </NextLink>

                        <Text
                          textAlign={'center'}
                          color={useColorModeValue('gray.700', 'gray.400')}
                          px={3}
                        >
                          <Box
                            display="flex"
                            flexDirection="row"
                            justifyContent="center"
                            alignItems="center"
                            mt={2}
                          >
                            <Text fontSize="md" fontWeight="medium" mr={2}>
                              {friend.suggestedFriendType} at
                            </Text>
                            <Text
                              fontSize="md"
                              color={useColorModeValue('gray.700', 'gray.400')}
                              mr={2}
                            >
                              {friend.workExperiences[0]?.company}
                            </Text>
                            {friend.workExperiences[0]?.company && (
                              <img
                                src={`https://www.${friend.workExperiences[0]?.company.toLowerCase()}.com/favicon.ico`}
                                alt={`${friend.company} logo`}
                                width={20}
                                height={20}
                                onError={handleImageError}
                                onLoad={handleImageLoad}
                              />
                            )}
                          </Box>
                        </Text>

                        <Text
                          mt={14}
                          textAlign={'center'}
                          color={useColorModeValue('gray.700', 'gray.400')}
                          px={3}
                        >
                          {friend.educations && friend.educations.length > 0
                            ? `${friend.educations[0].degree} at ${friend.educations[0].institution}`
                            : 'Education not specified'}
                        </Text>

                        <Stack mt={8} direction={'row'} align={'center'}>
                          {Status.Requested == true ? (
                            <Button
                              flex={1}
                              className="profile-button button"
                              style={{
                                color: buttonColors,
                                borderColor: buttonColors,
                                borderWidth: '2px',
                                textShadow: '0px 0px 40px #000000CA',
                                fontWeight: 600,
                              }}
                              onClick={() => Reject(friend.id)}
                            >
                              <span>
                                <span>{t('deleteRequest')}</span>
                              </span>
                            </Button>
                          ) : (
                            <Button
                              flex={1}
                              className="profile-button button"
                              onClick={() => Request(friend.id)}
                              style={{
                                color: buttonColors,
                                borderColor: buttonColors,
                                borderRadius: '100em',
                                borderWidth: '2px',
                                textShadow: '0px 0px 40px #000000CA',
                                fontWeight: 600,
                              }}
                            >
                              <span>{t('connect')}</span>
                            </Button>
                          )}
                        </Stack>
                      </Box>
                    ))
                  ) : (
                    <Text>{t('noSuggestions')}</Text>
                  )}
                </Flex>
              </Box>
            </Box>

            <Heading as="h1" size="lg" mb={8}>
              {t('Jobs for you')}
            </Heading>
            {jobNotification.length > 0
              ? jobNotification.map((job: any) => (
                  <Flex
                    key={job.id}
                    borderWidth="1px"
                    borderRadius="lg"
                    p={4}
                    mb={4}
                    display="flex"
                    alignItems="center"
                  >
                    <Link onClick={() => handleJobNotification(job.id)}>
                      <Flex>
                        <Box>
                          <Heading as="h2" size="md" mb={2}>
                            <Badge ml="1" colorScheme="green">
                              {t('new')}
                            </Badge>
                          </Heading>
                          <Text mb={2}>{job.text}</Text>
                        </Box>
                      </Flex>
                    </Link>
                    <Spacer />
                    <Box>
                      <HStack>
                        <Button
                          colorScheme="twitter"
                          onClick={() => handleJobNotification(job.id)}
                        >
                          {t('Apply')}
                        </Button>
                      </HStack>
                    </Box>
                  </Flex>
                ))
              : null}
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
