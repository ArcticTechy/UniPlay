export default defineEventHandler(async (event) => {
  const selectHost = async () => {
    const sample = (arr) => arr[Math.floor(Math.random() * arr.length)]
    return fetch('https://api.audius.co')
    .then(r => r.json())
    .then(j => {
      j.data
      return j.data;
    })
    .then(d => sample(d))
  }
  
  return selectHost()
})