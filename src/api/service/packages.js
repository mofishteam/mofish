import axios from '../index'
import ipc from '@/api/ipc'

export const searchPackages = (params) => {
  return ipc(`/package/online?name=${params.name}`)
}

export const getLocalPackages = (params) => {
  return axios.get('/package/local')
}
