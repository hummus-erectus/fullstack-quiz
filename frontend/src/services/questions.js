import axios from 'axios'
import tokenService from './tokenService'
const baseUrl = '/api/questions'

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
    headers: { Authorization: tokenService.getToken() },
  }

  const response = await axios.post(`${baseUrl}/${quizId}`, newObject, config)
  return response.data
}

const update = async (id, updatedObject) => {
  const config = {
    headers: { Authorization: tokenService.getToken() },
  }

  const response = await axios.put(`${baseUrl}/question/${id}`, updatedObject, config)
  return response.data
}

const removeFromOne = async (id, quizId) => {
  const config = {
    headers: { Authorization: tokenService.getToken() },
  }
  await axios.delete(`${baseUrl}/${quizId}/${id}`, config)
}

const removeFromAll = async (id) => {
  const config = {
    headers: { Authorization: tokenService.getToken() },
  }
  await axios.delete(`${baseUrl}/question/${id}`, config)
}

export default {
  getById,
  getByQuizId,
  create,
  update,
  removeFromOne,
  removeFromAll
}