import axios from 'axios'
const baseUrl = 'https://quizapp.fly.dev/api/users'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const getIndividual = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`)
  return response.data
}

export default { getAll, getIndividual }