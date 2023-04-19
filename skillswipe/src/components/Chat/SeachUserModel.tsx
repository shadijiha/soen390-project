/* eslint-disable react/jsx-no-undef */
/* eslint-disable react/no-children-prop */
import styles from '@/styles/modal.module.css'
import {
  Avatar,
  Box,
  Button,
  Center,
  CircularProgress,
  Flex,
  Input,
  InputGroup,
  InputLeftAddon,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
} from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { search as searchUser } from 'src/pages/api/api'
interface User {
  id: number
  firstName: string
  lastName: string
  profilePic: string | null
  connectionStatus: string
}

const SearchUserModal = ({ isOpen, onClose, newMessage }) => {
  const [search, setSearch] = useState('')
  const [users, setUsers] = useState<User[]>([])
  const [searched, setSearched] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { t } = useTranslation('common')

  const handleSearch = async () => {
    setLoading(true)
    setSearched(false)
    try {
      const token = localStorage.getItem('jwt')
      const response = await searchUser(token, search)
      console.log(response.data)
      console.log('response data:', response.data.users) // Log the response data

      // Sort users based on connectionStatus
      const sortedUsers = response.data.users.sort((a, b) => {
        if (a.connectionStatus === b.connectionStatus) {
          return 0
        }
        return a.connectionStatus === 'Connected' ? -1 : 1
      })

      // Set the state with the sorted users array
      setUsers(
        sortedUsers.map((el) => ({
          ...el.user,
          connectionStatus: el.connectionStatus,
        }))
      )
    } catch (error) {
      console.error(error)
    }
    setLoading(false)
    setSearched(true)
  }

  const handleUserSelect = (user) => {
    router.push(`/inbox/${user.id}`)
    onClose()
  }

  const handleUserSelectConnect = (user) => {
    router.push(`/profile/${user.id}`)
    onClose()
  }

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay
          className={styles.blurred}
          bgColor="rgba(0, 0, 0, 0.4)"
          style={{
            display: 'flex',
            alignContent: 'start',
            justifyContent: 'start',
            alignItems: 'start',
          }}
        />
        <ModalContent
          margin={'auto'}
          borderRadius="25px"
          padding={'0.5em'}
          borderWidth="2px"
          display={'flex'}
          flexDirection={'column'}
          justifyContent={'space-between'}
          minWidth={'45%'}
        >
          <ModalHeader>{t('searchForUser')}</ModalHeader>

          <ModalBody>
            <InputGroup>
              <Input
                type="text"
                value={search}
                placeholder={t('typeName')}
                borderRadius={'200px'}
                onChange={(e) => setSearch(e.target.value)}
                // enter key pressed to search
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleSearch()
                  }
                }}
              />
            </InputGroup>
            <VStack align="start" mt={5} spacing={5}>
              {loading ? (
                <Flex justifyContent="center" align={'center'} alignItems={'center'}>
                  <CircularProgress
                    alignContent={'center'}
                    alignItems={'center'}
                    alignSelf={'center'}
                  />
                </Flex>
              ) : searched && users.length === 0 ? (
                <Text>No user found</Text>
              ) : (
                users.map((user) => (
                  <Box key={user.id} fontSize="lg" cursor={'pointer'}>
                    <Flex align="center">
                      <Avatar
                        size="md"
                        name="name"
                        src={
                          user.profilePic
                            ? `data:image/jpeg;base64,${user.profilePic}`
                            : process.env.NEXT_PUBLIC_DEFAULT_PICTURE
                        }
                        mr={3}
                      />
                      <Text>{`${user.firstName} ${user.lastName}`}</Text>
                      {user.connectionStatus === 'NotConnected' && (
                        <Button
                          ml={3}
                          colorScheme="transparent"
                          fontSize="sm"
                          size={'sm'}
                          textColor={'blue.100'}
                          borderWidth={'2px'}
                          borderColor={'blue.100'}
                          padding={' 1em'}
                          borderRadius={'100px'}
                          onClick={() => handleUserSelectConnect(user)}
                        >
                          {t('connect')}
                        </Button>
                      )}
                      {user.connectionStatus === 'Connected' && (
                        <Button
                          ml={3}
                          colorScheme="green"
                          fontSize="sm"
                          size={'sm'}
                          borderWidth={'2px'}
                          borderColor={'blue.100'}
                          padding={' 1em'}
                          borderRadius={'100px'}
                          onClick={() => handleUserSelect(user)}
                        >
                          {t('message')}
                        </Button>
                      )}
                    </Flex>
                  </Box>
                ))
              )}
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="red"
              mr={3}
              onClick={onClose}
              borderRadius={'100px'}
            >
              {t('Cancel')}
            </Button>
            <Button colorScheme="blue" onClick={handleSearch} borderRadius={'100px'}>
              {t('search')}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
export default SearchUserModal
