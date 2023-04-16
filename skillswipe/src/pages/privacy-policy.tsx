import Layout from '@/components/Layout'
import {
  Button,
  Flex,
  Heading,
  Input,
  Select,
  Text,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react'
import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Link from 'next/link'
import router from 'next/router'
import React from 'react'
import { useTranslation } from 'react-i18next'
import 'react-toastify/dist/ReactToastify.css'

const PrivacyPolicy = () => {
  const { toggleColorMode } = useColorMode()
  const formBackground = useColorModeValue('gray.100', 'gray.700')
  const placeholderBackground = useColorModeValue('gray.200', 'gray.600')
  const toggleTheme = useColorModeValue('🌙', '💡')
  const { t } = useTranslation('common')

  return (
    <>
      <Layout>
        <Flex
          height="100vh"
          alignItems="center"
          justifyContent="center"
          data-testid="register-page"
        >
          <Button>
            <Link href="/">{t('Return Home')}</Link>
          </Button>
          <Flex direction="column" background={formBackground} p={12} rounded={25}>
            <Heading mb={6}>{t('register')} 🧖🏼</Heading>
          </Flex>
        </Flex>
      </Layout>
    </>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale!, ['common'])),
  },
})

export default PrivacyPolicy
