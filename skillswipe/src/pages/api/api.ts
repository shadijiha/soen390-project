
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

export const editEducationHistory = async (token : any,UpdatedUser : any) => {
  return axios.put(`${URL}/Profile/add/education`,UpdatedUser,{
    headers : {
      "Authorization" : `Bearer ${token}`
    }
  })
}