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
  return axios.put(`${URL}/auth/login`, editProfile)
}

export const changeStatus = async (status: any, token: any) => {
  return fetch(`${URL}/user/status`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ userStatus: status }),
    keepalive: true,
  })
}

export const googleAuth = async (authtoken: string) => {
  return axios.post(`${URL}/auth/google/redirect`, { token: authtoken })
}

// export const changeStatus = async (status: any, token: any) => {
//   return axios.put(
//     `${URL}/user/status`,
//     { userStatus: status },
//     {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     }
//   )
// }
export const getUserStatus = async (id: any, token: any) => {
  return axios.get(`${URL}/user/status/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
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
export const uploadUserDocuments = async (token: any, UpdatedUser: any) => {
  return axios.post(`${URL}/user/documents`, UpdatedUser, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}
export const deleteUserCv = async (token: any) => {
  return axios.delete(`${URL}/user/documents`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {
      cv: true,
    },
  })
}
export const deleteCover = async (token: any) => {
  return axios.delete(`${URL}/user/documents`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {
      coverLetter: true,
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

export const removeCoverpic = async (token: any) => {
  return axios.delete(`${URL}/user/coverPic`, {
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

export const getPosts = async (token: any) => {
  return axios.get(`${URL}/posts/feed`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}

export const createPosts = async (token: any, postCreate: any) => {
  return axios.post(`${URL}/posts`, postCreate, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}
export const deletePost = async (token: any, postId: number) => {
  return axios
    .delete(`${URL}/posts/${postId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .catch((err) => {
      return { status: 500, data: err }
    })
}

export const reportPost = async (token: any, Id: number, some: any) => {
  return axios
    .post(`${URL}/admin/report-post/${Id}`, some, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .catch((err) => {
      return { status: 400, data: err }
    })
}

export const applyToJob = async (token, id, jobApply: any) => {
  return axios
    .post(`${URL}/application/${id}`, jobApply, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .catch((err) => {
      return { status: 400, data: err.response.data }
    })
}

export const getMyApplications = async (token: any) => {
  return axios
    .get(`${URL}/application/my`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .catch((err) => {
      return { status: 400, data: err.response.data }
    })
}

export const withdrawJobApplication = async (token, id) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  try {
    const response = await axios.delete(`${URL}/application/${id}`, config)
    return response.data
  } catch (error) {
    throw new Error(error.response.data.error)
  }
}
export const deleteJobListing = async (token, id) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  try {
    const response = await axios.delete(`${URL}/jobs/${id}`, config)
    return response.data
  } catch (error) {
    throw new Error(error.response.data.error)
  }
}

export const jobNotificationApi = async (token: any) => {
  return axios.get(`${URL}/notifications/notifications/unread`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}

export const readJobNotifications = async (token: any, id: any) => {
  return axios.post(`${URL}/notifications/notifications/read/${id}`, id, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}
