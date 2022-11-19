import { instance } from "./instance"



export const recoverPaswordAPI = {
  sendEmail:(email: string, message: string)=> {
    return instance.post('/auth/forgot', { email, message })
  }
}


