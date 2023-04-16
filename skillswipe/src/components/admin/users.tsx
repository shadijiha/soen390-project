import { getUsers } from '@/pages/admin/adminApi'
import {
  Avatar,
  Badge,
  Box,
  Flex,
  Heading,
  Link,
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
import { formatDate } from './messages'

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
              <Th>Email</Th>
              <Th>Since</Th>
              <Th>Status</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {users.map((user) => (
              <Tr key={user.id}>
                <Td>
                  {' '}
                  <Flex>
                    <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
                      <Avatar size="sm" src={user.profilePic} />
                      <Box>
                        <Text size="sm">{user.firstName + ' ' + user.lastName}</Text>
                      </Box>
                    </Flex>
                  </Flex>
                </Td>
                <Td>{user.email}</Td>
                <Td>{formatDate(user.created_at)}</Td>
                <Td>
                  {user.deleted_at ? (
                    <Badge colorScheme="red">Banned</Badge>
                  ) : (
                    <Badge colorScheme="green">Active</Badge>
                  )}
                </Td>
                <Td color="blue.200">
                  {user.deleted_at ? (
                    <Text color="blue.200">
                      <Link>Unban</Link>
                    </Text>
                  ) : (
                    <Text color="blue.200">
                      <Link href={'/profile/' + user.id} isExternal>
                        Visit Profile
                      </Link>
                    </Text>
                  )}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default ListOfUsers
