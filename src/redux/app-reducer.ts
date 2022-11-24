import { AxiosError } from "axios"
import { authAPI } from "../api/authAPI"
import { errorUtils } from "../utils/error-utils"
import { setIsLoggedInAC } from "./auth-reducer"
import { AppThunk } from "./redux-store"


export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState= {
  status:'idle' as RequestStatusType,
  error: null as null | string,
  isInitialized:false
}
export const appReducer=(state:InitialStateType = initialState, action: ActionTypes ):InitialStateType=>{
  switch(action.type){
case 'APP/SET_STATUS':
  return {
    ...state, status: action.status
  }
case 'APP/SET_ERROR':
  return {
        ...state, error: action.error    
  }
case 'APP/SET_IS_INITIALIZED':
  return {
        ...state, isInitialized: action.value   
  }
  default:
    return state
  }
}

export const setAppStatusAC=(status: RequestStatusType)=>({type:'APP/SET_STATUS',status}as const)
export const setAppErrorAC=(error: null | string)=>({
  type: 'APP/SET_ERROR', error
}as const)
export const setInitializedAC = (value: boolean) => ({type: 'APP/SET_IS_INITIALIZED', value} as const)

export const authMeTC = (): AppThunk  => async (dispatch) =>
{
  try
  {
    let res = await authAPI.authMe()
    dispatch(setAppStatusAC('loading'))
    dispatch(setIsLoggedInAC(true))
  }
  catch (error: any | AxiosError<{ error: string; }, any>)
  {
    errorUtils(error, dispatch)
  }
  finally
  {
    dispatch(setInitializedAC(true))
    dispatch(setAppStatusAC('succeeded'))
  }
}

type InitialStateType = typeof initialState
export type ActionTypes= ReturnType<typeof setAppStatusAC> | ReturnType<typeof setAppErrorAC> | ReturnType<typeof setInitializedAC>
