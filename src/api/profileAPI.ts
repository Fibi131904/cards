import { UserDataType } from "../redux/profile-reducer"
import { instance } from "./instance"


export const profileAPI = {
  updateUserData(profileData:UserDataType) {
      return instance.put(`auth/me`, profileData )
  } 
}

export type ProfileDataType ={
  name: string
  avatar: string
}
