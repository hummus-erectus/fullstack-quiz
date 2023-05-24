import axios from 'axios'
const baseUrl = '/api/questions'

let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const removeToken = () => {
  token = null
}

// Needs new endpoint
// const getAll = async () => {
//   const response = await axios.get(baseUrl)
//   return response.data
// }

const getById = async (id) => {
  const response = await axios.get(`${baseUrl}/question/${id}`)
  return response.data
}

const getByQuizId = async (quizId) => {
  const response = await axios.get(`${baseUrl}/${quizId}`)
  return response.data
}

const create = async (quizId, newObject) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(`${baseUrl}/${quizId}`, newObject, config)
  return response.data
}

const update = async (id, updatedObject) => {
  const response = await axios.put(`${baseUrl}/question/${id}`, updatedObject)
  return response.data
}

const removeFromOne = async (id, quizId) => {
  const config = {
    headers: { Authorization: token },
  }
  await axios.delete(`${baseUrl}/${quizId}/${id}`, config)
}

const removeFromAll = async (id) => {
  const config = {
    headers: { Authorization: token },
  }
  await axios.delete(`${baseUrl}/question/${id}`, config)
}

export default {
//   getAll,
  getById,
  getByQuizId,
  create,
  setToken,
  removeToken,
  update,
  removeFromOne,
  removeFromAll
}