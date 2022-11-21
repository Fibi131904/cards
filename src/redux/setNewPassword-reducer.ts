import { AxiosError } from "axios"
import { createNewPasswopdAPI, NewPasswordDataType } from "../api/createNewPasswopdAPI"
import { errorUtils } from "../utils/error-utils"
import { AppThunk } from "./redux-store"


type InitialStateType = typeof initialState
const initialState= {
   info: '',
   isPasswordChanged: false
}
export const setNewPasswordReducer=(state:InitialStateType = initialState, action: ActionTypes ):InitialStateType=>{
  switch(action.type){
case 'setNewPassword/NEW_PASSWORD_SUCCESS':
  return {
    ...state, info: action.info
  }
case 'setNewPassword/IS_PASSWORD_CHANGED':
  return {
    ...state, isPasswordChanged: action.isPasswordChanged
  }
  default:
    return state
  }
}

export type ActionTypes= ReturnType<typeof setInfoAC> 
| ReturnType<typeof setPasswordChangedAC>

export const setInfoAC=(info:string)=>({type:'setNewPassword/NEW_PASSWORD_SUCCESS', info} as const)
export const setPasswordChangedAC=(isPasswordChanged:boolean)=>({type:'setNewPassword/IS_PASSWORD_CHANGED', isPasswordChanged} as const)


export const setInfoTC = (newPasswordData: NewPasswordDataType): AppThunk => {
  return (dispatch) => {
     
    createNewPasswopdAPI.sendNewPasswopd(newPasswordData)
          .then((res) => {
              dispatch(setInfoAC(res.data.info))
          })
          .catch((error: AxiosError<{ error: string }>)=>{
            errorUtils(error, dispatch)    
        })
          .finally(() => {
              
          })
  }
}