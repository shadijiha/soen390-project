/* eslint-disable @typescript-eslint/no-explicit-any */
import Layout from '@/components/Layout'
import {
  Button,
  Center,
  Flex,
  Heading,
  Input,
  Select,
  Text,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react'

import { useTranslation } from 'next-i18next'

import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { FcGoogle } from 'react-icons/fc'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { emailValidator } from '../Util/Validator'
import { register } from './api/api'

const Register = () => {
  const { toggleColorMode } = useColorMode()
  const formBackground = useColorModeValue('gray.100', 'gray.700')
  const googleBackground = useColorModeValue('white', 'gray.700')
  const placeholderBackground = useColorModeValue('gray.200', 'gray.600')
  const toggleTheme = useColorModeValue('🌙', '💡')
  const [User, setUser] = useState({
    firstName: '',
    lastName: '',
    password: '',
    email: '',
    gender: '',
  })
  const [ConfirmPass, setConfirmPass] = useState('')
  const router = useRouter()

  const FirstNameChange = (event: any) => {
    setUser({
      ...User,
      firstName: event.target.value,
    })
  }
  const LastNameChange = (event: any) => {
    setUser({
      ...User,
      lastName: event.target.value,
    })
  }
  const EmailChange = (event: any) => {
    setUser({
      ...User,
      email: event.target.value,
    })
  }
  const passwordChange = (event: any) => {
    setUser({
      ...User,
      password: event.target.value,
    })
  }
  const confirmpassChange = (event: any) => {
    setConfirmPass(event.target.value)
  }
  const genderChange = (event: any) => {
    setUser({
      ...User,
      gender: event.target.value,
    })
  }

  const { t } = useTranslation('common')
  const submitForm = () => {
    if (
      !(
        User.firstName &&
        User.lastName &&
        User.email &&
        User.password &&
        User.gender &&
        User.password == ConfirmPass
      )
    ) {
      toast(t('fillAllFields'))
    } else {
      if (emailValidator(User.email) == true) {
        register(User)
          .then((Response) => {
            toast(t('successfullyRegistered'))
            localStorage.setItem('jwt', Response.data.access_token)
            router.push('/home')
          })
          .catch((error) => {
            toast(error.message)
          })
      } else {
        toast(t('invalidInput'))
      }
    }
  }
  return (
    <>
      <Layout>
        <Flex
          height="100vh"
          alignItems="center"
          justifyContent="center"
          data-testid="register-page"
        >
          <Flex direction="column" background={formBackground} p={12} rounded={25}>
            <Heading mb={6}>{t('register')} 🧖🏼</Heading>
            <Input
              data-testid="first-name"
              placeholder="First Name"
              variant="filled"
              mb={3}
              type="text"
              background={placeholderBackground}
              onChange={FirstNameChange}
            />

            <Input
              data-testid="last-name"
              placeholder="Last Name"
              variant="filled"
              mb={3}
              type="text"
              background={placeholderBackground}
              onChange={LastNameChange}
            />

            <Input
              data-testid="email"
              placeholder={t('email')}
              variant="filled"
              mb={3}
              type="email"
              background={placeholderBackground}
              onChange={EmailChange}
            />
            <Input
              data-testid="password"
              placeholder={t('password')}
              variant="filled"
              mb={3}
              type="password"
              background={placeholderBackground}
              onChange={passwordChange}
            />
            <Input
              data-testid="confirm-password"
              placeholder={t('confirm password')}
              variant="filled"
              type="password"
              background={placeholderBackground}
              onChange={confirmpassChange}
            />
            <Text color={'tomato'} fontSize="xs" noOfLines={[1, 2]}>
              {ConfirmPass !== User.password ? t('password-mismatch') : ''}
            </Text>

            <Select
              my={3}
              onChange={genderChange}
              placeholder={t('select sex')}
              mb={6}
              variant="filled"
              background={placeholderBackground}
            >
              <option value="MALE">{t('male')}</option>
              <option value="FEMALE">{t('female')}</option>
            </Select>
            <Button colorScheme="green" mb={4} onClick={submitForm}>
              {t('register')}
            </Button>
            {/* Google */}
            <Button
              mb={4}
              w={'full'}
              variant={'outline'}
              backgroundColor={googleBackground}
              leftIcon={<FcGoogle />}
            >
              <Center>
                <Text>{t('signupWithGoogle')}</Text>
              </Center>
            </Button>

            <Button
              mb={4}
              onClick={toggleColorMode}
              _hover={{ bg: 'transparent' }}
              bg="transparent"
            >
              {toggleTheme}
            </Button>
            <Button mb={-5}>
              <Link href="/">
                <Text fontSize={13}>{t('alreadyUser')}</Text>
              </Link>
            </Button>
          </Flex>
        </Flex>
      </Layout>
    </>
  )
}

export const getServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
})

export default Register
