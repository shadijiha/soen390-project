import { getUsers } from '@/pages/api/adminApi'
import {
  Avatar,
  Badge,
  Box,
  Button,
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
import Alert from './alert'
import { formatDate } from './messages'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

export const ListOfUsers = () => {
  const toast = useToast()
  const router = useRouter()
  const [users, setUsers] = useState<any[]>([])
  const { t } = useTranslation('common')

  const unbanUser = (id) => {
    const user: any = users.find((user: any) => user.id === id)
    if (!user) return
    user.status = 'active'
    setUsers(users.filter((user: any) => user.id !== id))
  }

  useEffect(() => {
    const token = localStorage.getItem('jwt')
    if (!token) {
      toast({
        position: 'top-right',
        title: 'Error',
        description: (t('You are not logged in!')),
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
          description: (t("Can't get users! Please contact support")),
          status: 'error',
          duration: 9000,
          isClosable: true,
        })
      })
  }, [])
  return (
    <div>
      <Heading size="lg" mb="4">
        {t('List of Users')}
      </Heading>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>{t('User')}</Th>
              <Th>{t('Email')}</Th>
              <Th>{t('Since')}</Th>
              <Th>{t('Status')}</Th>
              <Th>{t('Action')}</Th>
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
                <Td>
                  <Link color="blue.200" href={'mailto:' + user.email}>
                    {user.email}
                  </Link>
                </Td>
                <Td>{formatDate(user.created_at)}</Td>
                <Td>
                  {user.deleted_at ? (
                    <Badge colorScheme="red">{t('Banned')}</Badge>
                  ) : (
                    <Badge colorScheme="green">{t('Active')}</Badge>
                  )}
                </Td>
                <Td color="blue.200">
                  {user.deleted_at ? (
                    <Text color="blue.200">
                      <Link>
                        <Alert
                          title="Unban User"
                          message={
                            (t('Are you sure you want to send unban ')) +
                            user.firstName +
                            ' ' +
                            user.lastName +
                            '?'
                          }
                          scheme="red"
                          action="Unban User"
                          id={user.id}
                          resolveItem={unbanUser}
                        />
                      </Link>
                    </Text>
                  ) : (
                    <Text color="blue.200">
                      <Link href={'/profile/' + user.id} isExternal>
                        {t('Visit Profile')}
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

export const getServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
})
export default ListOfUsers
