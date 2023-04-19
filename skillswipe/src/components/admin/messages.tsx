import { getReportedMessage, getResolvedMessages } from '@/pages/api/adminApi'
import {
  Avatar,
  Badge,
  Box,
  Flex,
  Heading,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useToast,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import ActionsModal from './actionsModal'
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
export const ReportedMessages = () => {
  const toast = useToast()
  const router = useRouter()
  const [ReportedMessages, setReportedMessages] = useState<any[]>([])
  const [ResolvedMessages, setResolvedMessages] = useState<any[]>([])

  // send request to get reportedMessages

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
    const message: any = ReportedMessages.find((message: any) => message.id === id)
    if (!message) return
    message.status = status
    setReportedMessages(ReportedMessages.filter((message: any) => message.id !== id))
    setResolvedMessages([...(ResolvedMessages as any), message])
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
    getReportedMessage(token)
      .then((res) => {
        setReportedMessages(res.data)
      })
      .catch(() => {
        toast({
          position: 'top-right',
          title: 'Error',
          description: "Can't get reported messages! Please contact support",
          status: 'error',
          duration: 9000,
          isClosable: true,
        })
      })

    getResolvedMessages(token)
      .then((res) => {
        setResolvedMessages(res.data)
      })
      .catch(() => {
        toast({
          position: 'top-right',
          title: 'Error',
          description: "Can't get resolved messages! Please contact support",
          status: 'error',
          duration: 9000,
          isClosable: true,
        })
      })
  }, [])
  return (
    <div>
      <Heading size="lg" mb="4">
        Pending Reported Messages
      </Heading>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>User</Th>
              <Th>Message</Th>
              <Th>Date</Th>
              <Th>Status</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {ReportedMessages.map((message: any) => (
              <Tr key={message.id}>
                <Td>
                  {' '}
                  <Flex>
                    <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
                      <Avatar size="sm" src={message.reportedProfilePic} />
                      <Box>
                        <Text size="sm">{message.reportedFullName}</Text>
                      </Box>
                    </Flex>
                  </Flex>
                </Td>
                <Td>
                  {message.message.message.length > 30
                    ? message.message.message.substring(0, 30) + '...'
                    : message.message.message}
                </Td>
                <Td>{formatDate(message.created_at)}</Td>
                <Td>
                  <Badge colorScheme={getColorScheme(message.status)}>
                    {message.status}
                  </Badge>
                </Td>
                <Td color="blue.200">
                  <ActionsModal
                    message={message}
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
        Resolved Reported Messages
      </Heading>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>User</Th>
              <Th>Message</Th>
              <Th>Date</Th>
              <Th>Status</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {ResolvedMessages.map((message: any) => (
              <Tr key={message.id}>
                <Td>
                  {' '}
                  <Flex>
                    <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
                      <Avatar size="sm" src={message.reportedProfilePic} />
                      <Box>
                        <Text size="sm">{message.reportedFullName}</Text>
                      </Box>
                    </Flex>
                  </Flex>
                </Td>
                <Td>
                  {message.message.message.length > 30
                    ? message.message.message.substring(0, 30) + '...'
                    : message.message.message}
                </Td>
                <Td>{formatDate(message.created_at)}</Td>
                <Td>
                  <Badge colorScheme={getColorScheme(message.status)}>
                    {message.status}
                  </Badge>
                </Td>
                <Td color="blue.200">
                  <ActionsModal message={message} type="resolved" />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  )
}
