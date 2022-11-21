import { instance } from "./instance"


export const createNewPasswopdAPI = {
  sendNewPasswopd(newPasswordData:NewPasswordDataType) {
      return instance.post(`/auth/set-new-password`,newPasswordData)
  } 
}

export type NewPasswordDataType= {
  password: string
  resetPasswordToken: string
  }