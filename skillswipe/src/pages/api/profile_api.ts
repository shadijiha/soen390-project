
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction


import axios from 'axios'
const URL = 'http://localhost:8080'

export const editAwardsRequest = async (token: any, updatedAward: any) => {
  return axios
    .put(`${URL}/profile/award/${updatedAward.id}`, updatedAward, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
    .catch((err) => {
      return { status: 500, data: err }
    })
}

export const addAwardsRequest = async (token: any, award: any) => {
  return axios
    .post(`${URL}/profile/award`, award, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
    .catch((err) => {
      return { status: 500, data: err }
    })
}

export const deleteAwardsRequest = async (token: any, awardId: any) => {
  return axios
    .delete(`${URL}/profile/award/${awardId}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
    .catch((err) => {
      return { status: 500, data: err }
    })
}

export const editEducationHistoryRequest = async (token: any, education: any) => {
  return axios
    .put(`${URL}/profile/education/${education.id}`, education, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .catch((err) => {
      return { status: 500, data: err }
    })
}

export const addEducationHistoryRequest = async (token: any, education: any) => {
  return axios
    .post(`${URL}/profile/education`, education, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .catch((err) => {
      return { status: 500, data: err }
    })
}

export const deleteEducationHistoryRequest = async (
  token: any,
  educationId: number
) => {
  return axios
    .delete(`${URL}/profile/education/${educationId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .catch((err) => {
      return { status: 500, data: err }
    })
}

export const editWorkEperienceRequest = async (token: any, workExperience: any) => {
  return axios
    .put(`${URL}/profile/work/${workExperience.id}`, workExperience, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .catch((err) => {
      return { status: 500, data: err }
    })
}

export const addWorkExperienceRequest = async (token: any, workExperience: any) => {
  return axios
    .post(`${URL}/profile/work`, workExperience, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .catch((err) => {
      return { status: 500, data: err }
    })
}

export const deleteWorkExperienceRequest = async (
  token: any,
  workExperienceId: number
) => {
  return axios
    .delete(`${URL}/profile/work/${workExperienceId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .catch((err) => {
      return { status: 500, data: err }
    })
}

export const editVolunteeringRequest = async (token: any, UpdatedUser: any) => {
  return axios
    .put(`${URL}/Profile/volunteering/${UpdatedUser.id}`, UpdatedUser, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
    .catch((err) => {
      return { status: 500, data: err }
    })
}

export const addVolunteeringRequest = async (token: any, volunteering: any) => {
  return axios
    .post(`${URL}/Profile/volunteering`, volunteering, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
    .catch((err) => {
      return { status: 500, data: err }
    })
}

export const deleteVolunteeringRequest = async (
  token: any, 
  VolunteeringId: number
  ) => {
  return axios
    .delete(`${URL}/Profile/volunteering/${VolunteeringId}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
    .catch((err) => {
      return { status: 500, data: err }
    })
}


export const editPersonalProjects = async (token: any, UpdatedUser: any) => {
  return axios.put(`${URL}/profile/add/Project`, UpdatedUser, {
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

export const editSkillRequest = async (token: any, Skill: any) => {
  return axios
    .put(`${URL}/profile/work/${Skill.id}`, Skill, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .catch((err) => {
      return { status: 500, data: err }
    })
}

export const addSkillRequest = async (token: any, Skill: any) => {
  return axios
    .post(`${URL}/profile/Skill`, Skill, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .catch((err) => {
      return { status: 500, data: err }
    })
}

export const deleteSkillRequest = async (
  token: any,
  Skill: number
) => {
  return axios
    .delete(`${URL}/profile/Skill/${Skill}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .catch((err) => {
      return { status: 500, data: err }
    })
}