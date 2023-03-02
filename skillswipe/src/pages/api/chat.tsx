import axios from 'axios'
const URL = process.env.BASE_URL ?? 'http://localhost:8080'

export const message = async (token: any, MessageRequest: any) => {
    return axios.post(`${URL}/Chat/startConversation`, MessageRequest, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })

}
export const getConversationById = async (token:any,id :any) =>{
    return axios.get(`${URL}/Chat/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })
}

export const getAllConversation = async (token:any) =>{
    return axios.get(`${URL}/Chat/allconversations`, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })
}


