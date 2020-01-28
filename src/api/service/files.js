import ipc from '@/api/ipc'

export const getFilePath = (params) => {
  return ipc('/file/getFilePath', { data: {
    options: params
  } })
}
