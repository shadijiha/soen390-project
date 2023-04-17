import { Button, useColorModeValue } from '@chakra-ui/react'
import { GoogleLogin } from '@react-oauth/google'
import Router from 'next/router'
import React from 'react'
import { toast } from 'react-toastify'
import { googleAuth } from '../pages/api/api'

const GoogleLoginButton = ({ lang }) => {
  const buttonBackground = useColorModeValue('gray.100', 'gray.700')

  const responseGoogle = (response) => {
    console.log(response)
    // Handle the response from Google
    const { credential } = response
    googleAuth(credential)
      .then(async (response) => {
        console.log(response)
        Router.push('/home')
      })
      .catch((err) => {
        console.log('google login error')
        console.log(err)
      })
  }

  const onFailure = () => {
    // Handle errors
    toast('Failed to login with Google. Please try again later.')
  }

  return (
    <Button
      as={GoogleLogin}
      colorScheme="blue"
      background={buttonBackground}
      text="signin_with"
      locale={lang}
      onSuccess={responseGoogle}
      onError={onFailure}
      // state_cookie_domain={'single_host_origin'}
      style={{ display: 'flex', justifyContent: 'center' }}
    >
      Sign in with Google
    </Button>
  )
}

export default GoogleLoginButton
