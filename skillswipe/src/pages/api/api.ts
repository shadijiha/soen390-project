// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
const URL = 'http://localhost:8080'

export const register =  async (RegisterUser : any) =>{
  const user = {
    "fistName" : RegisterUser.firstName,
    "lastName" : RegisterUser.lastName,
    "password" : RegisterUser.password,
    "email" : RegisterUser.email,
    "gender" : RegisterUser.gender
  }
  const response = await fetch(`${URL}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body :JSON.stringify(user)
  })
  return await response.json();
}

export const loginApi = async (LoginUser : any) =>{
  console.log(LoginUser)
  const response = await fetch(`${URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(LoginUser)
  })
  return await response.json();

}