// plugins/axios.ts
import axios from 'axios'
import { defineNuxtPlugin, useCookie } from '#app'

export default defineNuxtPlugin(() => {
     const accessToken = useCookie('access_token')
     const refreshToken = useCookie('refresh_token')

     const api = axios.create({
          baseURL: 'http://localhost:8000', // غيّره حسب مشروعك
     })

     let isRefreshing = false
     let failedQueue: any[] = []

     const processQueue = (error: any, token: string | null = null) => {
          failedQueue.forEach(prom => {
               if (token) {
                    prom.resolve(token)
               } else {
                    prom.reject(error)
               }
          })
          failedQueue = []
     }

     api.interceptors.request.use(config => {
          if (accessToken.value) {
               config.headers['Authorization'] = `Bearer ${accessToken.value}`
          }
          return config
     })

     api.interceptors.response.use(
          response => response,
          async error => {
               const originalRequest = error.config

               // إذا الخطأ من نوع 4xx ولم يتم إعادة المحاولة بعد
               if (
                    error.response?.status?.toString().startsWith('4') &&
                    !originalRequest._retry
               ) {
                    if (isRefreshing) {
                         return new Promise((resolve, reject) => {
                              failedQueue.push({
                                   resolve: (token: string) => {
                                        originalRequest.headers['Authorization'] = 'Bearer ' + token
                                        resolve(api(originalRequest))
                                   },
                                   reject
                              })
                         })
                    }

                    originalRequest._retry = true
                    isRefreshing = true

                    try {
                         const res = await api.post('/auth/refresh', {
                              refresh_token: refreshToken.value
                         })

                         const newAccessToken = res.data.access_token
                         accessToken.value = newAccessToken

                         processQueue(null, newAccessToken)

                         originalRequest.headers['Authorization'] = 'Bearer ' + newAccessToken
                         return api(originalRequest)
                    } catch (refreshError) {
                         processQueue(refreshError, null)
                         // يمكنك هنا تنفيذ redirect إلى login مثلاً
                         return Promise.reject(refreshError)
                    } finally {
                         isRefreshing = false
                    }
               }

               return Promise.reject(error)
          }
     )

     // اجعل axios متاحًا عبر $axios في المشروع
     return {
          provide: {
               axios: api
          }
     }
})
