import { getUsers } from '@/pages/admin/adminApi'
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

export const ListOfUsers = () => {
  const toast = useToast()
  const router = useRouter()
  const [users, setUsers] = useState<any[]>([])

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
    getUsers(token)
      .then((res: any) => {
        setUsers(res.data)
      })
      .catch((err) => {
        toast({
          position: 'top-right',
          title: 'Error',
          description: "Can't get users! Please contact support",
          status: 'error',
          duration: 9000,
          isClosable: true,
        })
      })
  }, [])
  return (
    <div>
      <Heading size="lg" mb="4">
        List of Users
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
            {users.map((user) => (
              <Tr key={user.id}>
                <Td>
                  {' '}
                  <Flex>
                    <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
                      <Avatar
                        size="sm"
                        name="Segun Adebayo"
                        src="https://bit.ly/sage-adebayo"
                      />
                      <Box>
                        <Text size="sm">Segun Adebayo</Text>
                      </Box>
                    </Flex>
                  </Flex>
                </Td>
                <Td>helloworld</Td>
                <Td>24, March 2022</Td>
                <Td>
                  <Badge colorScheme="yellow">Pending</Badge>
                </Td>
                <Td color="blue.200">tempƒ</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default ListOfUsers
