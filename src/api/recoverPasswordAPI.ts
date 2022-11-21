import axios from "axios"


const instance = axios.create({
  baseURL:'https://neko-back.herokuapp.com/2.0/',
  // baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0',
  withCredentials: true,
})

export const recoverPaswordAPI = {
  sendEmail:(email: string, message: string)=> {
    return instance.post('/auth/forgot', { email, message })
  }
}


