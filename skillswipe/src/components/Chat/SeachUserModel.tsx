import styles from '@/styles/modal.module.css'
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Flex,
  Input,
  InputGroup,
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
      setUsers(response.data.users.map((el) => el.user))
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

  return (
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
        borderRadius="14px"
        padding={'1em'}
        borderWidth="2px"
        display={'flex'}
        flexDirection={'column'}
        justifyContent={'space-between'}
        minWidth={'50%'}
      >
        <ModalHeader>{t('searchForUser')}</ModalHeader>

        <ModalBody>
          <InputGroup>
            <Input
              type="text"
              value={search}
              placeholder="Type a name"
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
                <Box
                  key={user.id}
                  fontSize="lg"
                  onClick={() => handleUserSelect(user)}
                  cursor={'pointer'}
                >
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
                  </Flex>
                </Box>
              ))
            )}
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="red" mr={3} onClick={onClose} borderRadius={'100px'}>
            Close
          </Button>
          <Button colorScheme="blue" onClick={handleSearch} borderRadius={'100px'}>
            Search
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
export default SearchUserModal
