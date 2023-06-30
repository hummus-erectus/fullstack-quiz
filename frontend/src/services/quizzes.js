import axios from 'axios'
import tokenService from './tokenService'
const baseUrl = 'https://quizapp.fly.dev/api/quizzes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const getIndividual = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`)
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
  const config = {
    headers: { Authorization: tokenService.getToken() },
  }
  const response = await axios.put(`${baseUrl}/${id}`, updatedObject, config)
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

const addLike = async (id) => {
  const config = {
    headers: { Authorization: tokenService.getToken() },
  }
  const response = await axios.post(`${baseUrl}/${id}/like`,'', config)
  return response.data
}

const removeLike = async (id) => {
  const config = {
    headers: { Authorization: tokenService.getToken() },
  }
  const response = await axios.post(`${baseUrl}/${id}/unlike`,'', config)
  return response.data
}

export default { getAll, getIndividual, create, update, remove, createComment, addLike, removeLike }
