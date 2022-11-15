import { AxiosResponse } from 'axios';
import { instance } from "./instance"
import { RegDataType } from "./types"

export const registerAPI = {
  register(regData:RegDataType) {
      return instance.post(`auth/register`,regData)
  } 
}
