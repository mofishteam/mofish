import ipc from '@/api/ipc'

export const searchPackages = async (params) => {
  return ipc('/package/online', params)
}

export const getLocalPackages = (params) => {
  return ipc('/package/local', params)
}
