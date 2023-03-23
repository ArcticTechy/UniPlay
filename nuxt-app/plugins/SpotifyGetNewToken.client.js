export default async function ({ $fetch }) {
//    // Get the refresh token and the expiration time from the store
//    const refreshToken = store.state.auth.refreshToken
//    const expiresIn = store.state.auth.expiresIn
//  
//    // Set a timeout to call the /refresh endpoint before the token expires
//    setTimeout(async () => {
//      try {
//        // Send the refresh token as a header
//        const result = await $fetch('/refresh', {
//          method: 'POST',
//          headers: { Authorization: `Bearer ${refreshToken}` }
//        })
//        // Update the store with the new access token and expiration time
//        store.commit('auth/setAccessToken', result.accessToken)
//        store.commit('auth/setExpiresIn', result.expiresIn)
//      } catch (error) {
//        console.error(error)
//        // Handle any errors here
//      }
//    }, expiresIn - 1000) // Subtract one second to account for network delay
  }