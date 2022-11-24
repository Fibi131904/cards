import { AxiosError } from 'axios';
import { Dispatch } from 'redux';
import { authAPI } from '../api/authAPI';
import { DataLoginType } from '../api/types';
import { errorUtils } from '../utils/error-utils';
import { setAppStatusAC } from './app-reducer';
import { AppThunk } from './redux-store';



export type AuthActionType = ReturnType<typeof setIsLoggedInAC>
export type InitialStateType = typeof initialState


const initialState = { isLoggedIn: false }


export const authReducer = (state: InitialStateType = initialState, action: AuthActionType): InitialStateType =>
{
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':
            return { ...state, isLoggedIn: action.value }
        default:
            return state
    }
}


export const setIsLoggedInAC = (value: boolean) => ({ type: 'login/SET-IS-LOGGED-IN', value } as const)

export const loginTC = (data: DataLoginType): AppThunk  => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.login(data)
        .then((res) =>
        {
            dispatch(setIsLoggedInAC(true))
        })
        .catch((error: AxiosError<{ error: string }>) =>
        {
            errorUtils(error, dispatch)

        })
        .finally(() =>
        {
            dispatch(setAppStatusAC('succeeded'))
        })
}

export const logoutTC = (): AppThunk => async (dispatch) =>
{
    try
    {
        let res = await authAPI.logout()
        dispatch(setAppStatusAC('loading'))
        dispatch(setIsLoggedInAC(false))
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
 