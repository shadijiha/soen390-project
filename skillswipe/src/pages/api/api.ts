// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from 'axios'
const URL = 'http://localhost:8080'



export const register =  async (RegisterUser : any) =>{
  return axios.post(`${URL}/auth/register`,RegisterUser);
}

export const loginApi = async (LoginUser : any) =>{
  return axios.post(`${URL}/auth/login`,LoginUser);

}