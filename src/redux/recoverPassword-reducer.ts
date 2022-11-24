import { AxiosError } from "axios"
import { recoverPaswordAPI } from "../api/recoverPasswordAPI"
import { errorUtils } from "../utils/error-utils"
import { setAppStatusAC } from "./app-reducer"
import { AppThunk } from "./redux-store"

type InitialStateType = {
  info: string
}
type ActionType = ReturnType<typeof recoverAC>

const initialState = {
  info: ''
}

export const recoverPasswordReducer = (state: InitialStateType = initialState, action: ActionType): InitialStateType =>
{
  switch (action.type)
  {
    case 'recover/CONFIRM_STATUS':
      return {
        ...state, info: action.info
      }
    default:
      return state
  }
}

export const recoverAC = (info: string) => ({ type: 'recover/CONFIRM_STATUS', info } as const)

export const recoverTC = (email: string, message: string): AppThunk => async (dispatch) =>
{
  dispatch(setAppStatusAC('loading'))
  try
  {
    const res = await recoverPaswordAPI.sendEmail(email, message)
      if (res.data){    
      dispatch(recoverAC(res.data.info))
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
