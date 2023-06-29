import axios from 'axios'
const baseUrl = 'https://quizapp.fly.dev/api/login'

const login = async (credentials) => {
  const response = await axios.post(baseUrl, credentials)
  console.log('login response', response.data)
  return response.data
}

export default { login }
