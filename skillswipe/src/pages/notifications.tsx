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

  const [pendingConnections, setPendingConnections] = useState([
    { user: { id: '', firstName: '', lastName: '', profilePic: '', timestamp: '' } },
  ])
  const currentUser = useSelector((state) => state as any)
  
  useEffect(() => {
    getPendingConnections()

    const pusher = new Pusher("5611330c8d67150acf7f", {
      cluster: "us2",
    });

    var channel = pusher.subscribe(`user-${currentUser.auth.id}`);
    channel.bind('friend-request', function(data) {
        addRequest()
    });
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
    }
  }

  const addRequest = () => {
    getPendingConnections()
  }
  const { t } = useTranslation('common')


  return (
    <>
      <Layout>
        <NavBar
          nbNotifications={pendingConnections.length}
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
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <Flex
                key={notification.id}
                borderWidth="1px"
                borderRadius="lg"
                p={4}
                mb={4}
                display="flex"
                alignItems="center"
              >
                <Flex>
                  <Avatar size="lg" mr={4} src={notification.avatar} />
                  <Box>
                    <Heading as="h2" size="md" mb={2}>
                      {notification.title}{' '}
                      <Badge ml="1" colorScheme="green">
                        {t("new")}
                      </Badge>
                    </Heading>
                    <Text mb={2}>{notification.description}</Text>
                    <Text fontSize="sm">{notification.timestamp}</Text>
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

