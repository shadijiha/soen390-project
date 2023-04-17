import {
  Button,
  Center,
  Flex,
  Heading,
  Input,
  Text,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react'
import { GetStaticProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useContext, useState } from 'react'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import GoogleLoginButton from '../components/googleLogin'
import AuthContext, { User } from '../contexts/AuthContext'
import { loginApi } from './api/api'

const login = () => {
  const { setUser } = useContext(AuthContext)
  const { t } = useTranslation('common')
  const { toggleColorMode } = useColorMode()
  const formBackground = useColorModeValue('gray.100', 'gray.700')
  const placeholderBackground = useColorModeValue('gray.200', 'gray.600')
  const toggleTheme = useColorModeValue('🌙', '💡')
  // const [User, setUser] = useState({ email: '', password: '' })
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()
  const currentLang = router.locale // => locale string eg. "en"

  const submitForm = () => {
    if (!(email && password)) {
      toast(t('Please fill all the fields'))
    } else {
      loginApi({ email, password })
        .then((resp) => {
          console.log(resp)
          setUser(resp.data as User)
          toast(t('loggedIn'))
          router.push('/home')
        })
        .catch((error: any) => {
          console.log(error)
          if (error.response.status == 401 || error.response.status == 400) {
            toast(t('fillCorrectly'))
          } else {
            toast(error.message)
          }
        })
    }
  }

  return (
    <div data-testid="login-page">
      <Flex height="100vh" alignItems="center" justifyContent="center">
        <Flex
          direction="column"
          background={formBackground}
          p={12}
          rounded={25}
          justifyContent="center"
        >
          <Heading mb={6}>SkillSwipe 🚀</Heading>
          <Input
            placeholder="Email"
            onChange={(e) => {
              setEmail(e.target.value)
            }}
            variant="filled"
            mb={3}
            type="email"
            background={placeholderBackground}
            data-testid="email"
          />
          <Input
            placeholder="*******"
            onChange={(e) => {
              setPassword(e.target.value)
            }}
            variant="filled"
            mb={6}
            type="password"
            background={placeholderBackground}
            data-testid="password"
          />
          <Button colorScheme="blue" mb={3} onClick={submitForm}>
            {t('signIn')}
          </Button>
          <Center>
            <GoogleLoginButton lang={currentLang} />
          </Center>
          <Text textAlign="center">or</Text>
          <Button colorScheme="green" mb={6}>
            <Link href="/register">Register</Link>
          </Button>
          <Button
            onClick={toggleColorMode}
            _hover={{ bg: 'transparent' }}
            bg="transparent"
          >
            {toggleTheme}
          </Button>
          <div className="policy-agreement">
            <Text onClick={() => router.push('/privacy-policy')}>
              Read about privacy policy
            </Text>
            <Text onClick={() => router.push('/terms-agreement')}>
              Read our terms of agreement
            </Text>
          </div>
        </Flex>
      </Flex>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale!, ['common'])),
  },
})

export default login
