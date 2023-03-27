import axios from 'axios'
const URL = process.env.BASE_URL ?? 'http://localhost:8080'

export const message = async (token: any, MessageRequest: any) => {
  return axios.post(`${URL}/chat/message`, MessageRequest, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}
export const getConversationById = async (token: any, id: any) => {
  return axios.get(`${URL}/chat/conversation/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}

export const getAllConversation = async (token: any) => {
  return axios.get(`${URL}/chat/allconversations`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}
export const upload = async (token: any,file :any) => {
  return axios.post(`${URL}/chat/upload`,file, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}