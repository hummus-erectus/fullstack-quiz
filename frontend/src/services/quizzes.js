import axios from 'axios'
import tokenService from './tokenService'
const baseUrl = '/api/quizzes'



const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (newObject) => {
  const config = {
    headers: { Authorization: tokenService.getToken() },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async (id, updatedObject) => {
  const response = await axios.put(`${baseUrl}/${id}`, updatedObject)
  return response.data
}

const remove = async (id) => {
  const config = {
    headers: { Authorization: tokenService.getToken() },
  }
  await axios.delete(`${baseUrl}/${id}`, config)
}

const createComment = async (id, newObject) => {
  const response = await axios.post(`${baseUrl}/${id}/comments`, newObject)
  return response.data
}

export default { getAll, create, update, remove, createComment }
