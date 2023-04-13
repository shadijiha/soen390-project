import React from 'react';
import GoogleLogin from 'react-google-login';
import Router from 'next/router';
import { toast } from 'react-toastify';

const GoogleLoginButton = () => {
  const responseGoogle = (response) => {
    console.log(response);
    // Handle the response from Google
    const { tokenId } = response;
    fetch('http://localhost:3000/api/auth/google',{
      method: 'POST',
      headers: {
         'Content-Type': 'application/json',
      },
      body: JSON.stringify({ tokenId }),
   })
      .then((res) => res.json())
      .then((data) => {
         if (data.success){
            localStorage.setItem('jwt', data.token);
            Router.push('/home');
         }else{
            console.log('google login error');
         }
      })
      .catch((err) => {
         console.log(err);
      });
      

  };

  const onFailure = (error) => {
    console.log(error);
    // Handle errors
     toast ('Failed to login with Google. Please try again later.');
  };

  return (
    <GoogleLogin
      clientId="382691840743-ornp7e0bkt11mt1rjjuqgfd7t6i5bnf3.apps.googleusercontent.com"
      buttonText="Login with Google"
      onSuccess={responseGoogle}
      onFailure={onFailure}
      cookiePolicy={'single_host_origin'}
    />
  );
};

export default GoogleLoginButton;
