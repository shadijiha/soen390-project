import {
  ResolvePostBan,
  ResolvePostSafe,
  ResolvePostWarn,
  getReportedPosts,
  getResolvedPosts,
} from '@/pages/api/adminApi'
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Avatar,
  Badge,
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
  useToast,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

export const formatDate = (dateString) => {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }

  const date = new Date(dateString)
  return new Intl.DateTimeFormat('en-US', options).format(date)
}

export const ReportedPosts = () => {
  const toast = useToast()
  const router = useRouter()
  const [ReportedPosts, setReportedPosts] = useState<any[]>([])
  const [ResolvedPosts, setResolvedPosts] = useState<any[]>([])

  // send request to get reportedPosts
  const getColorScheme = (status) => {
    switch (status) {
      case 'unresolved':
        return 'blue'
      case 'safe':
        return 'green'
      case 'banned':
        return 'red'
      case 'warned':
        return 'yellow'
      default:
        return 'gray'
    }
  }

  const resolveItem = (id, status) => {
    const post: any = ReportedPosts.find((post: any) => post.id === id)
    if (!post) return
    post.status = status
    setReportedPosts(ReportedPosts.filter((post: any) => post.id !== id))
    setResolvedPosts([...(ResolvedPosts as any), post])
  }

  useEffect(() => {
    const token = localStorage.getItem('jwt')
    if (!token) {
      toast({
        position: 'top-right',
        title: 'Error',
        description: 'You are not logged in!',
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
      router.push({ pathname: '/login' })
      return
    }
    getReportedPosts(token)
      .then((res) => {
        setReportedPosts(res.data)
      })
      .catch(() => {
        toast({
          position: 'top-right',
          title: 'Error',
          description: "Can't get reported posts! Please contact support.",
          status: 'error',
          duration: 9000,
          isClosable: true,
        })
      })

    getResolvedPosts(token)
      .then((res) => {
        setResolvedPosts(res.data)
      })
      .catch(() => {
        toast({
          position: 'top-right',
          title: 'Error',
          description: "Can't get resolved posts! Please contact support.",
          status: 'error',
          duration: 9000,
          isClosable: true,
        })
      })
  }, [])

  return (
    <div>
      <Heading size="lg" mb="4">
        Pending Reported Posts
      </Heading>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>User</Th>
              <Th>Post</Th>
              <Th>Date</Th>
              <Th>Status</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {ReportedPosts.map((post: any) => (
              <Tr key={post._id}>
                <Td>
                  {' '}
                  <Flex>
                    <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
                      <Avatar size="sm" src={post.reportedProfilePic} />
                      <Box>
                        <Text size="sm">{post.reportedFullName} </Text>
                      </Box>
                    </Flex>
                  </Flex>
                </Td>
                <Td>
                  {post.post.post.length > 50
                    ? post.post.post.substring(0, 50) + '...'
                    : post.post.post}
                </Td>
                <Td>{formatDate(post.created_at)}</Td>
                <Td>
                  <Badge colorScheme={getColorScheme(post.status)}>
                    {post.status}
                  </Badge>
                </Td>
                <Td color="blue.200">
                  <MessagesModal
                    post={post}
                    type="unresolved"
                    resolveItem={resolveItem}
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      <Heading size="lg" mb="4" mt={8}>
        Resolved Reported Posts
      </Heading>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>User</Th>
              <Th>Post</Th>
              <Th>Date</Th>
              <Th>Status</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {ResolvedPosts.map((post: any) => (
              <Tr key={post._id}>
                <Td>
                  {' '}
                  <Flex>
                    <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
                      <Avatar size="sm" src={post.reportedProfilePic} />
                      <Box>
                        <Text size="sm">{post.reportedFullName} </Text>
                      </Box>
                    </Flex>
                  </Flex>
                </Td>
                <Td>
                  {post.post.post.length > 50
                    ? post.post.post.substring(0, 50) + '...'
                    : post.post.post}
                </Td>
                <Td> {formatDate(post.created_at)}</Td>
                <Td>
                  <Badge colorScheme={getColorScheme(post.status)}>
                    {post.status}
                  </Badge>
                </Td>
                <Td color="blue.200">
                  <MessagesModal post={post} type="resolved" />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  )
}

function MessagesModal(props) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { post, type, resolveItem } = props
  return (
    <>
      <Link onClick={onOpen}>View</Link>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Heading size="lg">Reported Post</Heading>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box mb="2">
              <Heading size="md" mb="2">
                Report Owner:{' '}
              </Heading>
              <Flex>
                <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
                  <Avatar size="sm" src={post.reporter?.profilePic} />
                  <Box>
                    <Text size="sm">
                      {' '}
                      {post.reporter?.firstName + ' ' + post.reporter?.lastName}
                    </Text>
                  </Box>
                </Flex>
              </Flex>
            </Box>
            <Divider orientation="horizontal" />
            <Box mt="2">
              <Heading size="md" mb="2">
                Reported User:{' '}
              </Heading>
              <Flex>
                <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
                  <Avatar size="sm" src={post.reportedProfilePic} />
                  <Box>
                    <Text size="sm">{post.reportedFullName} </Text>
                  </Box>
                </Flex>
              </Flex>
            </Box>
            <Box mt="4">
              <Heading size="md" mb="2">
                Post:{' '}
              </Heading>
              <Text size="sm">{post.post.post}</Text>
            </Box>
            <Box mt="4">
              <Text size="sm">
                <Text fontSize="20px" fontWeight="bold" mb="2" display="inline">
                  Date:{' '}
                </Text>
                {formatDate(post.created_at)}
              </Text>
            </Box>
            {type === 'unresolved' && (
              <Box mt="4">
                <Heading size="md" mb="2">
                  Actions:{' '}
                </Heading>
                <Alert
                  title="Send Warning to User"
                  message="Are you sure you want to send a warning to user?"
                  scheme="yellow"
                  action="Send Warning"
                  id={post.id}
                  close={onClose}
                  resolveItem={resolveItem}
                />
                <Alert
                  title="Send Warning to User"
                  message="Are you sure you want to ban user?"
                  scheme="red"
                  action="Ban User"
                  id={post.id}
                  close={onClose}
                  resolveItem={resolveItem}
                />
                <Alert
                  title="Mark Post as Safe"
                  message="Are you sure you want ot mark this as safe?"
                  scheme="green"
                  action="Safe"
                  id={post.id}
                  close={onClose}
                  resolveItem={resolveItem}
                />
              </Box>
            )}
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default function Alert(props: any) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [isLoading, setIsLoading] = useState(false)
  const cancelRef: any = React.useRef()
  const { title, message, action, scheme, id, resolveItem } = props
  const onCLoseParent = props.close
  const router = useRouter()
  const [token, setToken] = useState('')
  const toast = useToast()

  useEffect(() => {
    const token = localStorage.getItem('jwt')
    if (!token) {
      router.push({ pathname: '/login' })
    } else {
      setToken(token)
    }
  }, [])
  const takeAction = () => {
    setIsLoading(true)
    if (action === 'Ban User') {
      resolveBan()
    } else if (action === 'Send Warning') {
      resolveWarning()
    } else if (action === 'Safe') {
      resolveSafe()
    } else if (action === 'Unban User') {
      resolveUnban()
    }
  }

  const resolveSafe = () => {
    ResolvePostSafe(token, id)
      .then((res) => {
        resolveItem(id, 'safe')
        toast({
          position: 'top-right',
          title: 'Success',
          description: 'This post has been marked safe',
          status: 'success',
          duration: 9000,
          isClosable: true,
        })
        setIsLoading(false)
        onCLoseParent()
        onClose()
      })
      .catch((err) => {
        toast({
          position: 'top-right',
          title: 'Error',
          description: "An error has occured while marking this message as 'safe'",
          status: 'error',
          duration: 9000,
          isClosable: true,
        })
      })
  }

  const resolveWarning = () => {
    ResolvePostWarn(token, id)
      .then((res) => {
        resolveItem(id, 'warned')
        toast({
          position: 'top-right',
          title: 'Success',
          description: 'This user has been warned',
          status: 'success',
          duration: 9000,
          isClosable: true,
        })
        setIsLoading(false)
        onCLoseParent()
        onClose()
      })
      .catch((err) => {
        toast({
          position: 'top-right',
          title: 'Error',
          description: 'An error has occured while warning this user',
          status: 'error',
          duration: 9000,
          isClosable: true,
        })
      })
  }

  const resolveBan = () => {
    ResolvePostBan(token, id)
      .then((res) => {
        resolveItem(id, 'banned')
        toast({
          position: 'top-right',
          title: 'Success',
          description: 'This user has been banned',
          status: 'success',
          duration: 9000,
          isClosable: true,
        })
        setIsLoading(false)
        onCLoseParent()
        onClose()
      })
      .catch((err) => {
        toast({
          position: 'top-right',
          title: 'Error',
          description: 'An error has occured wile banning this user',
          status: 'success',
          duration: 9000,
          isClosable: true,
        })
      })
  }

  const resolveUnban = () => {
    resolveItem(id)
    setIsLoading(false)
  }

  return (
    <>
      <Button colorScheme={scheme} onClick={onOpen} mr={2}>
        {action}
      </Button>

      <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              {title}
            </AlertDialogHeader>

            <AlertDialogBody>{message}</AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button
                colorScheme={scheme}
                onClick={takeAction}
                ml={3}
                isLoading={isLoading}
              >
                {action}
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  )
}
