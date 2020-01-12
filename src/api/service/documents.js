import ipc from '@/api/ipc'

export const getDocument = (params) => {
  return ipc(`/api/document/${params.name}`)
}
