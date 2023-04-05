import axios from 'axios'

const Client = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  headers: {
    'dmx-header': 'dmx'
  }
})

Client.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.log('error log from interceptor', error)
    return await Promise.reject(error)
  }
)

export default Client
