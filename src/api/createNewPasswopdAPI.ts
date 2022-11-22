import { AxiosResponse } from "axios"
import { instance } from "./instance"


export const createNewPasswopdAPI = {
  sendNewPasswopd(newPasswordData: NewPasswordDataType)
  {
    return instance.post<NewPasswordDataType, AxiosResponse<ResponseType>>(`/auth/set-new-password`, newPasswordData)
  }
}

export type NewPasswordDataType = {
  password: string
  resetPasswordToken: string
}
type ResponseType = {
  info: string
  error: string;
}