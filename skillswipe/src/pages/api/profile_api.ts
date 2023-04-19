// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from 'axios'
const URL = process.env.BASE_URL ?? 'http://localhost:8080'

export const editAwardsRequest = async (token: any, award: any) => {
  return axios
    .put(`${URL}/profile/award/${award.id}`, award, {
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

export const deleteAwardsRequest = async (token: any, awardId: number) => {
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

export const editWorkEperienceRequest = async (token: any, work: any) => {
  return axios
    .put(`${URL}/profile/work/${work.id}`, work, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .catch((err) => {
      return { status: 500, data: err }
    })
}

export const addWorkExperienceRequest = async (token: any, work: any) => {
  return axios
    .post(`${URL}/profile/work`, work, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .catch((err) => {
      return { status: 500, data: err }
    })
}

export const deleteWorkExperienceRequest = async (token: any, workId: number) => {
  return axios
    .delete(`${URL}/profile/work/${workId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .catch((err) => {
      return { status: 500, data: err }
    })
}

export const editVolunteeringRequest = async (token: any, volunteering: any) => {
  return axios
    .put(`${URL}/Profile/volunteering/${volunteering.id}`, volunteering, {
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

export const editPersonalProjectsRequest = async (token: any, project: any) => {
  return axios
    .put(`${URL}/profile/project/${project.id}`, project, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
    .catch((err) => {
      return { status: 500, data: err }
    })
}

export const addPersonalProjectsRequest = async (token: any, project: any) => {
  return axios
    .post(`${URL}/profile/project`, project, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
    .catch((err) => {
      return { status: 500, data: err }
    })
}

export const deletePersonalProjectsRequest = async (
  token: any,
  projectId: number
) => {
  return axios
    .delete(`${URL}/profile/project/${projectId}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
    .catch((err) => {
      return { status: 500, data: err }
    })
}

export const editCoursesRequest = async (token: any, course: any) => {
  return axios
    .put(`${URL}/profile/course/${course.id}`, course, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
    .catch((err) => {
      return { status: 500, data: err }
    })
}

export const addCoursesRequest = async (token: any, course: any) => {
  return axios
    .post(`${URL}/profile/course`, course, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
    .catch((err) => {
      return { status: 500, data: err }
    })
}

export const deleteCoursesRequest = async (token: any, courseId: number) => {
  return axios
    .delete(`${URL}/profile/course/${courseId}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
    .catch((err) => {
      return { status: 500, data: err }
    })
}

export const editLanguagesRequest = async (token: any, language: any) => {
  return axios
    .put(`${URL}/profile/language/${language.id}`, language, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
    .catch((err) => {
      return { status: 500, data: err }
    })
}

export const addLanguagesRequest = async (token: any, language: any) => {
  return axios
    .post(`${URL}/profile/language`, language, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
    .catch((err) => {
      return { status: 500, data: err }
    })
}

export const deleteLanguagesRequest = async (token: any, languageId: number) => {
  return axios
    .delete(`${URL}/profile/language/${languageId}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
    .catch((err) => {
      return { status: 500, data: err }
    })
}

export const editSkillsRequest = async (token: any, skill: any) => {
  return axios
    .put(`${URL}/profile/skill/${skill.id}`, skill, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .catch((err) => {
      return { status: 500, data: err }
    })
}

export const addSkillsRequest = async (token: any, skill: any) => {
  return axios
    .post(`${URL}/profile/skill`, skill, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .catch((err) => {
      return { status: 500, data: err }
    })
}

export const deleteSkillsRequest = async (token: any, skillId: number) => {
  return axios
    .delete(`${URL}/profile/skill/${skillId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .catch((err) => {
      return { status: 500, data: err }
    })
}
export const ReportApi = async (token: any, Report: any) => {
  return axios.post(`${URL}/report`, Report, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}
