export const sleep = async (time) => new Promise(resolve => {
  setTimeout(() => {
    resolve()
  }, time)
})
