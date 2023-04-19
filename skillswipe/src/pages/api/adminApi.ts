import axios from 'axios'
const URL = process.env.BASE_URL ?? 'http://localhost:8080'

//messages related api
export const getReportedMessage = async (token: string) => {
  return axios
    .get(`${URL}/admin/reported-messages`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .catch((err) => {
      return { status: 400, data: err.response.data }
    })
}

export const getResolvedMessages = async (token: string) => {
  return axios
    .get(`${URL}/admin/resolved-messages`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .catch((err) => {
      return { status: 400, data: err.response.data }
    })
}

export const ResolveMessageSafe = async (token: string, id: string) => {
  return axios
    .put(
      `${URL}/admin/resolve-message/safe/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .catch((err) => {
      return { status: 400, data: err.response.data }
    })
}

export const ResolveMessageBan = async (token: string, id: string) => {
  return axios
    .put(
      `${URL}/admin/resolve-message/Ban/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .catch((err) => {
      return { status: 400, data: err.response.data }
    })
}

export const ResolveMessageWarn = async (token: string, id: string) => {
  return axios
    .put(
      `${URL}/admin/resolve-message/warned/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .catch((err) => {
      return { status: 400, data: err.response.data }
    })
}
//posts related api
export const getReportedPosts = async (token: string) => {
  return axios
    .get(`${URL}/admin/reported-posts`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .catch((err) => {
      return { status: 400, data: err.response.data }
    })
}

export const getResolvedPosts = async (token: string) => {
  return axios
    .get(`${URL}/admin/resolved-posts`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .catch((err) => {
      return { status: 400, data: err.response.data }
    })
}

export const getUsers = async (token: string) => {
  return axios
    .get(`${URL}/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .catch((err) => {
      return { status: 400, data: err.response.data }
    })
}

export const ResolvePostSafe = async (token: string, id: string) => {
  return axios
    .put(
      `${URL}/admin/resolve-post/safe/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .catch((err) => {
      return { status: 400, data: err.response.data }
    })
}

export const ResolvePostBan = async (token: string, id: string) => {
  return axios
    .put(
      `${URL}/admin/resolve-post/Ban/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .catch((err) => {
      return { status: 400, data: err.response.data }
    })
}

export const ResolvePostWarn = async (token: string, id: string) => {
  return axios
    .put(
      `${URL}/admin/resolve-post/warned/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .catch((err) => {
      return { status: 400, data: err.response.data }
    })
}

export const ReportMessage= async (token: string, id: number) => {
  console.log(id)
  return axios
    .post(
      `${URL}/admin/report-message/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    
}