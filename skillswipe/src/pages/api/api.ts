// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from 'axios'

const req = axios.create({
  withCredentials: true,
  baseURL: process.env.BASE_URL ?? 'http://localhost:8080',
})

export const register = async (RegisterUser: any) =>
  req.post('/auth/register', RegisterUser)

export const loginApi = async (LoginUser: any) => req.post('/auth/login', LoginUser)

export const logout = async () => req.get('/auth/logout')

export const editProfile = async (editProfile: any) =>
  req.put('/auth/login', editProfile)

export const changeStatus = async (status: any) =>
  fetch(`${URL}/user/status`, {
    method: 'PUT',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userStatus: status }),
    keepalive: true,
  })

export const googleAuth = async (authtoken: string) =>
  req.post('/auth/google/redirect', { token: authtoken })

export const getUserStatus = async (id: any) => req.get(`/user/status/${id}`)

export const checkLogin = async () => req.get('/auth/me')

export const editPersonalInformation = async (UpdatedUser: any) =>
  req.put('/user', UpdatedUser)

export const uploadUserDocuments = async (UpdatedUser: any) =>
  req.post('/user/documents', UpdatedUser)

export const deleteUserCv = async () =>
  req.delete('/user/documents', { data: { cv: true } })

export const deleteCover = async () =>
  req.delete('/user/documents', { data: { coverLetter: true } })

export const getUserById = async (id: any) => req.get(`/user/${id}`)

export const sendRequest = async (id: any) =>
  req.post('/connections/add', { toUser: id })
export const getPendingRequest = async () => req.get('/connections/pending')
export const getAccepted = async () => req.get('/connections/add')
export const getStatus = async (id: any) => req.get('/connections/status/${id}')
export const acceptRequest = async (id: any) =>
  req.put('/connections/accept', { id: id })
export const removeConnection = async (id: any) =>
  req.delete('/connections/delete/${id}')

export const editEducationHistory = async (UpdatedUser: any) =>
  req.put('/Profile/add/education', UpdatedUser)

export const editExperience = async (UpdatedUser: any) => req.put('', UpdatedUser)

export const editVolunteering = async (UpdatedUser: any) =>
  req.put('/Profile/add/volunteering', UpdatedUser)

export const editAwards = async (updatedAward: any) =>
  req.put('/profile/add/award/${updatedAward.id}', updatedAward)

export const editSkills = async (UpdatedUser: any) =>
  req.put('/profile/add/skill', UpdatedUser)

export const editCourses = async (UpdatedUser: any) => req.put('', UpdatedUser)

export const editLanguages = async (UpdatedUser: any) => req.put('', UpdatedUser)

export const removeCoverpic = async () => req.delete('/user/coverPic')

export const removeProfilepic = async () => req.delete('/user/profilePic')

export const search = async (query: string) => req.get('/search?query=${query}')

export const createJob = async (jobCreate: any) =>
  req.post('/jobs', jobCreate).catch((err) => {
    return { status: 400, data: err.response.data }
  })

export const getOpenJobs = async () =>
  req.get('/jobs/all').catch((err) => {
    return { status: 400, data: err.response.data }
  })

export const getMyListings = async () =>
  req.get('/jobs/my').catch((err) => {
    return { status: 400, data: err.response.data }
  })

export const viewJob = async (id: number) =>
  req.get(`/jobs/${id}`).catch((err) => {
    return { status: 400, data: err.response.data }
  })

export const getPosts = async () => req.get('/posts/feed')

export const createPosts = async (postCreate: any) => req.post('/posts', postCreate)
export const deletePost = async (postId: number) =>
  req.delete(`/posts/${postId}`).catch((err) => {
    return { status: 500, data: err }
  })

export const applyToJob = async (id: number, jobApply: any) =>
  req.post(`/application/${id}`, jobApply).catch((err) => {
    return { status: 400, data: err.response.data }
  })

export const getMyApplications = async () =>
  req.get('/application/my').catch((err) => {
    return { status: 400, data: err.response.data }
  })

export const withdrawJobApplication = async (id) =>
  req
    .delete(`${URL}/application/${id}`)
    .then((resp) => resp.data)
    .catch((error) => {
      throw new Error(error.response.data.error)
    })

export const deleteJobListing = async (id) =>
  req
    .delete(`${URL}/jobs/${id}`)
    .then((resp) => resp.data)
    .catch((error) => {
      throw new Error(error.response.data.error)
    })
