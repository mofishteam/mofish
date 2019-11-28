import axios from '../index'

export const getDocument = (params) => {
  return axios.get(`/api/document/${params.name}`)
}
