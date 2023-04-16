import { GoogleLogin } from '@react-oauth/google'
import Router from 'next/router'
import React from 'react'
import { toast } from 'react-toastify'

const GoogleLoginButton = ({ lang }) => {
  const responseGoogle = (response) => {
    console.log(response)
    // Handle the response from Google
    const { tokenId } = response
    fetch('http://localhost:8080/auth/google', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ tokenId }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          localStorage.setItem('jwt', data.token)
          Router.push('/home')
        } else {
          console.log('google login error')
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const onFailure = () => {
    // Handle errors
    toast('Failed to login with Google. Please try again later.')
  }

  return (
    <GoogleLogin
      text="signin_with"
      locale={lang}
      onSuccess={responseGoogle}
      onError={onFailure}
      state_cookie_domain={'single_host_origin'}
    />
  )
}

export default GoogleLoginButton
