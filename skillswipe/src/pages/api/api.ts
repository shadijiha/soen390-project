// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from 'axios'
const URL = 'http://localhost:8080'



export const register =  async (RegisterUser : any) =>{
  return axios.post(`${URL}/auth/register`,RegisterUser);
}

export const loginApi = async (LoginUser : any) =>{
  return axios.post(`${URL}/auth/login`,LoginUser);
}

export const editProfile = async (editProfile: any) => {
  //do put
  return axios.put(`${URL}/auth/login`,editProfile);
}

export const checkLogin = async (token : any) => {
  return axios.get(`${URL}/auth/me`,{
    headers : {
      "Authorization" : `Bearer ${token}`
    }
  })

}
export const editPersonalInformation = async (token : any,UpdatedUser : any) => {
  return axios.put(`${URL}/user`,UpdatedUser,{
    headers : {
      "Authorization" : `Bearer ${token}`
    }
  })
}
export const getUserById = async (token : any,id : any) =>{
  return axios.get(`${URL}/user/${id}`,{
    headers : {
      "Authorization" : `Bearer ${token}`
    }
  })
}

export const search = async (token : any, query: string) => {
  return axios.get(`${URL}/search?query=${query}`,{
    headers : {
      "Authorization" : `Bearer ${token}`
    }
  })
}