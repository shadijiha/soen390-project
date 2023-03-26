// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from 'axios'
const URL = process.env.BASE_URL ?? 'http://localhost:8080'

export const register = async (RegisterUser: any) => {
  return axios.post(`${URL}/auth/register`, RegisterUser)
}

export const loginApi = async (LoginUser: any) => {
  return axios.post(`${URL}/auth/login`, LoginUser)
}

export const editProfile = async (editProfile: any) => {
  //do put
  return axios.put(`${URL}/auth/login`, editProfile)
}

export const checkLogin = async (token: any) => {
  return axios.get(`${URL}/auth/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}
export const editPersonalInformation = async (token: any, UpdatedUser: any) => {
  return axios.put(`${URL}/user`, UpdatedUser, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}
export const getUserById = async (token: any, id: any) => {
  return axios.get(`${URL}/user/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}

export const sendRequest = async (token: any, id: any) => {
  return axios.post(
    `${URL}/connections/add`,
    { toUser: id },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
}
export const getPendingRequest = async (token: any) => {
  return axios.get(`${URL}/connections/pending`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}
export const getAccepted = async (token: any) => {
  return axios.get(`${URL}/connections/add`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}
export const getStatus = async (token: any, id: any) => {
  return axios.get(`${URL}/connections/status/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}
export const acceptRequest = async (token: any, id: any) => {
  return axios.put(
    `${URL}/connections/accept`,
    { id: id },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
}
export const removeConnection = async (token: any, id: any) => {
  return axios.delete(`${URL}/connections/delete/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}

export const editEducationHistory = async (token: any, UpdatedUser: any) => {
  return axios.put(`${URL}/Profile/add/education`, UpdatedUser, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}

export const editExperience = async (token: any, UpdatedUser: any) => {
  return axios.put(`${URL}`, UpdatedUser, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}

export const editVolunteering = async (token: any, UpdatedUser: any) => {
  return axios.put(`${URL}/Profile/add/volunteering`, UpdatedUser, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  })
}

export const editAwards = async (token: any, updatedAward: any) => {
  return axios.put(`${URL}/profile/add/award/${updatedAward.id}`, updatedAward, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  })
}

export const editSkills = async (token: any, UpdatedUser: any) => {
  return axios.put(`${URL}/profile/add/skill`, UpdatedUser, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  })
}

export const editCourses = async (token: any, UpdatedUser: any) => {
  return axios.put(`${URL}`, UpdatedUser, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  })
}

export const editLanguages = async (token: any, UpdatedUser: any) => {
  return axios.put(`${URL}`, UpdatedUser, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  })
}

export const removeProfilepic = async (token: any) => {
  return axios.delete(`${URL}/user/profilePic`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  })
}

export const search = async (token: any, query: string) => {
  return axios.get(`${URL}/search?query=${query}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}

export const createJob = async (token: any, jobCreate: any) => {
  return axios
    .post(`${URL}/jobs`, jobCreate, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .catch((err) => {
      return { status: 400, data: err.response.data }
    })
}

export const getOpenJobs = async (token: any) => {
  return axios
    .get(`${URL}/jobs/all`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .catch((err) => {
      return { status: 400, data: err.response.data }
    })
}

export const getMyListings = async (token: any) => {
  return axios
    .get(`${URL}/jobs/my`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .catch((err) => {
      return { status: 400, data: err.response.data }
    })
}

export const viewJob = async (token, id) => {
  return axios
    .get(`${URL}/jobs/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .catch((err) => {
      return { status: 400, data: err.response.data }
    })
}
