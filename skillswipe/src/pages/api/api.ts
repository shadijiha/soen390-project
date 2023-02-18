

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
export const sendRequest = async (token : any,id : any) =>{
  return axios.post(`${URL}/connections/add`,{toUser : id},{
    headers : {
      "Authorization" : `Bearer ${token}`
    }
  })
}
export const getPendingRequest = async (token : any) =>{
  return axios.get(`${URL}/connections/pending`,{
    headers : {
      "Authorization" : `Bearer ${token}`
    }
  })
}
export const getAccepted = async (token : any) =>{
  return axios.get(`${URL}/connections/add`,{
    headers : {
      "Authorization" : `Bearer ${token}`
    }
  })
}
export const getStatus = async (token : any,id : any) => {
  return axios.get(`${URL}/connections/status/${id}`,{
    headers : {
      "Authorization" : `Bearer ${token}`
    }
  })
}
export const acceptRequest = async (token : any,id : any) =>{
  return axios.put(`${URL}/connections/accept`,{id : id},{
    headers : {
      "Authorization" : `Bearer ${token}`
    }
  })
}
export const removeConnection = async (token : any,id : any) =>{
  return axios.delete(`${URL}/connections/delete/${id}`,{
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

export const editExperience = async (token : any,UpdatedUser : any) => {
  return axios.put(`${URL}`,UpdatedUser,{
    headers : {
      "Authorization" : `Bearer ${token}`
    }
  })
}

export const editVolunteering = async (token : any,UpdatedUser : any) => {
  return axios.put(`${URL}/Profile/add/volunteering`,UpdatedUser,{
    headers : {
      "authorization" : `Bearer ${token}`
    }
  })
}

export const editPersonalProjects = async (token : any,UpdatedUser : any) => {
  return axios.put(`${URL}/profile/add/Project`,UpdatedUser,{
    headers : {
      "authorization" : `Bearer ${token}`
    }
  })
}

