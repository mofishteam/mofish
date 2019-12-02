import ipc from '../ipc'

export const getDocument = (params) => {
  return ipc(`/api/document/${params.name}`)
}
