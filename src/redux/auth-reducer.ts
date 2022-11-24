import { AxiosError } from 'axios';
import { Dispatch } from 'redux';
import { authAPI } from '../api/authAPI';
import { DataLoginType } from '../api/types';
import { errorUtils } from '../utils/error-utils';
import { setAppStatusAC } from './app-reducer';
import { AppThunk } from './redux-store';



const initialState = { isLoggedIn: false }


export const authReducer = (state: InitialStateType = initialState, action: AuthActionType): InitialStateType =>
{
    switch (action.type)
    {
        case 'login/SET-IS-LOGGED-IN':
            return { ...state, isLoggedIn: action.value }
        default:
            return state
    }
}


export const setIsLoggedInAC = (value: boolean) => ({ type: 'login/SET-IS-LOGGED-IN', value } as const)

export const loginTC = (data: DataLoginType): AppThunk => async (dispatch) =>
{
    dispatch(setAppStatusAC('loading'))
    try
    {
        let res = await authAPI.login(data)
        if (res.data)
        {
            dispatch(setIsLoggedInAC(true))
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

export const logoutTC = (): AppThunk => async (dispatch) =>
{
    dispatch(setAppStatusAC('loading'))
    try
    {
        const res = await authAPI.logout()
        if (res.data)
        {
            dispatch(setIsLoggedInAC(false))
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

export type AuthActionType = ReturnType<typeof setIsLoggedInAC>
export type InitialStateType = typeof initialState
 