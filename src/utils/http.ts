import axios, { AxiosError, AxiosInstance } from 'axios'
import { toast } from 'react-toastify'
import HttpStatusCode from 'src/constants/httpStatusCode'
import { AuthResponse } from 'src/types/auth.type'
import { clearLS, getAccessTokenFromLS, saveAccessTokenToLS, setProfileToLS } from './auth'

class Http {
  instance: AxiosInstance
  private accessToken: string
  constructor() {
    this.accessToken = getAccessTokenFromLS()
    this.instance = axios.create({
      baseURL: 'https://api-ecom.duthanhduoc.com/',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
      }
    })
    this.instance.interceptors.request.use(
      (config) => {
        if (this.accessToken && config.headers) {
          config.headers.authorization = this.accessToken
          return config
        }
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )
    this.instance.interceptors.response.use(
      (response) => {
        const { url } = response.config
        if (url === '/login' || url === '/register') {
          this.accessToken = (response.data as AuthResponse).data?.access_token
          saveAccessTokenToLS(this.accessToken)
          setProfileToLS(response.data.data.user)
        } else if (url === '/logout') {
          this.accessToken = ''
          clearLS()
        }
        return response
      },
      function (error: AxiosError) {
        if (error.response?.status !== HttpStatusCode.UnprocessableEntity) {
          // const message = error.response?.data.message
          // ko duoc, do ko biet error.response.data la type gi
          const data: any | undefined = error.response?.data
          const message: string = data?.message || error.message
          toast.error(message)
        }
        if (error.response?.status === HttpStatusCode.Unauthorized) {
          clearLS()
          // cach 1 - reset lai page:
          // window.location.reload()
        }
        return Promise.reject(error)
      }
    )
  }
}

const http = new Http().instance

export default http
