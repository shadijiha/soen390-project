import axios from 'axios'

const req = axios.create({
  withCredentials: true,
  baseURL: process.env.BASE_URL ?? 'http://localhost:8080',
})

export const editAwardsRequest = async (award: any) => {
  return req.put(`/profile/award/${award.id}`, award).catch((err) => {
    return { status: 500, data: err }
  })
}

export const addAwardsRequest = async (award: any) => {
  return req.post('/profile/award', award).catch((err) => {
    return { status: 500, data: err }
  })
}

export const deleteAwardsRequest = async (awardId: number) => {
  return req.delete(`/profile/award/${awardId}`).catch((err) => {
    return { status: 500, data: err }
  })
}

export const editEducationHistoryRequest = async (education: any) => {
  return req.put(`/profile/education/${education.id}`, education).catch((err) => {
    return { status: 500, data: err }
  })
}

export const addEducationHistoryRequest = async (education: any) => {
  return req.post('/profile/education', education).catch((err) => {
    return { status: 500, data: err }
  })
}

export const deleteEducationHistoryRequest = async (
  token: any,
  educationId: number
) => {
  return req.delete(`/profile/education/${educationId}`).catch((err) => {
    return { status: 500, data: err }
  })
}

export const editWorkEperienceRequest = async (work: any) => {
  return req.put(`/profile/work/${work.id}`, work).catch((err) => {
    return { status: 500, data: err }
  })
}

export const addWorkExperienceRequest = async (work: any) => {
  return req.post('/profile/work', work).catch((err) => {
    return { status: 500, data: err }
  })
}

export const deleteWorkExperienceRequest = async (workId: number) => {
  return req.delete(`/profile/work/${workId}`).catch((err) => {
    return { status: 500, data: err }
  })
}

export const editVolunteeringRequest = async (volunteering: any) => {
  return req
    .put(`/Profile/volunteering/${volunteering.id}`, volunteering)
    .catch((err) => {
      return { status: 500, data: err }
    })
}

export const addVolunteeringRequest = async (volunteering: any) => {
  return req.post('/Profile/volunteering', volunteering).catch((err) => {
    return { status: 500, data: err }
  })
}

export const deleteVolunteeringRequest = async (VolunteeringId: number) => {
  return req.delete(`/Profile/volunteering/${VolunteeringId}`).catch((err) => {
    return { status: 500, data: err }
  })
}

export const editPersonalProjectsRequest = async (project: any) => {
  return req.put(`/profile/project/${project.id}`, project).catch((err) => {
    return { status: 500, data: err }
  })
}

export const addPersonalProjectsRequest = async (project: any) => {
  return req.post('/profile/project', project).catch((err) => {
    return { status: 500, data: err }
  })
}

export const deletePersonalProjectsRequest = async (projectId: number) => {
  return req.delete(`/profile/project/${projectId}`).catch((err) => {
    return { status: 500, data: err }
  })
}

export const editCoursesRequest = async (course: any) => {
  return req.put(`/profile/course/${course.id}`, course).catch((err) => {
    return { status: 500, data: err }
  })
}

export const addCoursesRequest = async (course: any) => {
  return req.post('/profile/course', course).catch((err) => {
    return { status: 500, data: err }
  })
}

export const deleteCoursesRequest = async (courseId: number) => {
  return req.delete(`/profile/course/${courseId}`).catch((err) => {
    return { status: 500, data: err }
  })
}

export const editLanguagesRequest = async (language: any) => {
  return req.put(`/profile/language/${language.id}`, language).catch((err) => {
    return { status: 500, data: err }
  })
}

export const addLanguagesRequest = async (language: any) => {
  return req.post('/profile/language', language).catch((err) => {
    return { status: 500, data: err }
  })
}

export const deleteLanguagesRequest = async (languageId: number) => {
  return req.delete(`/profile/language/${languageId}`).catch((err) => {
    return { status: 500, data: err }
  })
}

export const editSkillsRequest = async (skill: any) => {
  return req.put(`/profile/skill/${skill.id}`, skill).catch((err) => {
    return { status: 500, data: err }
  })
}

export const addSkillsRequest = async (skill: any) => {
  return req.post('/profile/skill', skill).catch((err) => {
    return { status: 500, data: err }
  })
}

export const deleteSkillsRequest = async (skillId: number) => {
  return req.delete(`/profile/skill/${skillId}`).catch((err) => {
    return { status: 500, data: err }
  })
}
