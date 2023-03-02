import Layout from '@/components/Layout'
import NavBar from '@/components/NavBar'
import { Avatar, Badge, Box, Button, Heading, HStack, Text, Spacer, Flex } from '@chakra-ui/react'

const Notifications = () => {
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
  return (
    <>
      <Layout>
        <NavBar></NavBar>
        <Box p={4}>
          <Heading as="h1" size="lg" mb={4}>
            Pending Requests
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
                        New
                      </Badge>
                    </Heading>
                    <Text mb={2}>{notification.description}</Text>
                    <Text fontSize="sm">{notification.timestamp}</Text>
                  </Box>
                </Flex>
                <Spacer />
                <Box>
                  <HStack>
                    <Button colorScheme="gray">Ignore</Button>
                    <Button colorScheme="twitter">Accept</Button>
                  </HStack>
                </Box>
              </Flex>
            ))
          ) : (
            <Text>No notifications to display</Text>
          )}
        </Box>
        <Box p={4}>
          <Heading as="h1" size="lg" mb={4}>
            Notifications
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
                        New
                      </Badge>
                    </Heading>
                    <Text mb={2}>{notification.description}</Text>
                    <Text fontSize="sm">{notification.timestamp}</Text>
                  </Box>
                </Flex>
              </Flex>
            ))
          ) : (
            <Text>No notifications to display</Text>
          )}
        </Box>
      </Layout>
    </>
  )
}

export default Notifications
