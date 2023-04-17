import axios from 'axios'

const req = axios.create({
  withCredentials: true,
  baseURL: process.env.BASE_URL ?? 'http://localhost:8080',
})

export const message = async (MessageRequest: any) => {
  return req.post('/chat/message', MessageRequest)
}
export const getConversationById = async (id: any) => {
  return req.get(`/chat/conversation/${id}`)
}

export const getAllConversation = async () => {
  return req.get('/chat/allconversations')
}
export const upload = async (file: any) => {
  return req.post('/chat/upload', file)
}
