import { AxiosError } from "axios"
import { registerAPI } from "../api/registerAPI"
import { RegDataType } from "../api/types"
import { errorUtils } from "../utils/error-utils"
import { setAppStatusAC } from "./app-reducer"
import { AppThunk } from "./redux-store"


type InitialStateType = typeof initialState
const initialState = {
  isRegistered: false
}
export const registerReducer = (state: InitialStateType = initialState, action: ActionType): InitialStateType =>
{
  switch (action.type)
  {
    case 'register/SIGN_UP':
      return {
        ...state, isRegistered: action.isRegistered
      }
    default:
      return state
  }
}

export type ActionType = ReturnType<typeof registerAC>

export const registerAC = (isRegistered: boolean) => ({ type: 'register/SIGN_UP', isRegistered } as const)

export const registerTC = (regData: RegDataType): AppThunk => async (dispatch) =>
{
  dispatch(setAppStatusAC('loading'))
  try
  {
    const res = await registerAPI.register(regData)
    if (res.data)
    {
      dispatch(registerAC(true))
    }
  }
  catch (error: any | AxiosError<{ error: string; }, any>)
  {
    errorUtils(error, dispatch)
  }
  finally
  {
    dispatch(setAppStatusAC('succeeded'))
  }
}
