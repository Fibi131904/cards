import { AxiosError } from "axios"
import { registerAPI } from "../api/registerAPI"
import { RegDataType } from "../api/types"
import { AppThunk } from "./redux-store"


type InitialStateType = typeof initialState
const initialState= {
   isRegistered:false
}
export const registerReducer=(state:InitialStateType = initialState, action: ActionType ):InitialStateType=>{
  switch(action.type){
case 'register/SIGN_UP':
  return {
    ...state, isRegistered: action.isRegistered
  }
  default:
    return state
  }
}
export type ActionType= ReturnType<typeof registerAC>

export const registerAC=(isRegistered:boolean)=>({type:'register/SIGN_UP',isRegistered}as const)

// thunks
export const registerTC = (regData: RegDataType): AppThunk => {
  return (dispatch) => {
     
      registerAPI.register(regData)
          .then(() => {
              dispatch(registerAC(true))
          })
          .catch((error: AxiosError<{ error: string }>) => {
              
          })
          .finally(() => {
              
          })
  }
}