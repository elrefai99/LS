// composables/useApiFetch.ts
export async function useApiFetch<T>(url: string, options: any = {}) {
     const accessToken = useCookie('access_token') // or use useState if stored there
     const refreshToken = useCookie('refresh_token')

     options.headers = options.headers || {}
     options.headers['Authorization'] = `Bearer ${accessToken.value}`

     try {
          const response = await $fetch<T>(url, options)
          return response
     } catch (error: any) {
          if (error?.response?.status === 400 && !options._retry) {
               options._retry = true

               try {
                    // Call refresh token API
                    const newTokens = await $fetch<{ access_token: string }>('/auth/refresh', {
                         method: 'POST',
                         body: {
                              refresh_token: refreshToken.value
                         }
                    })

                    // Save new access token
                    accessToken.value = newTokens.access_token

                    // Retry original request
                    options.headers['Authorization'] = `Bearer ${newTokens.access_token}`
                    return await $fetch<T>(url, options)
               } catch (refreshError) {
                    console.error('Refresh token failed', refreshError)
                    throw refreshError
               }
          }

          throw error
     }
}
