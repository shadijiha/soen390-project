/* eslint-disable react/no-children-prop */
import Layout from '@/components/Layout'
import NavBar from '@/components/NavBar'
import styles from '@/styles/modal.module.css'

import {
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  Heading,
  Input,
  InputGroup,
  InputLeftAddon,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spacer,
  Spinner,
  Text,
  VStack,
  chakra,
  useDisclosure,
} from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

interface User {
  id: number
  name: string
}

const SearchUserModal = ({ isOpen, onClose, newMessage }) => {
  const [search, setSearch] = useState('')
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { t } = useTranslation('common')

  const handleSearch = async () => {
    router.push(`/searchResultpage?q=${search}`)
  }

  const handleUserSelect = (user) => {
    newMessage(user)
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
            <InputLeftAddon children="Find User" />
            <Input
              type="text"
              value={search}
              placeholder="Type a name"
              onChange={(e) => setSearch(e.target.value)}
            />
          </InputGroup>
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
