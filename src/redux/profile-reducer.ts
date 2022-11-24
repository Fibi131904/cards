import { AxiosError } from 'axios';
import React from 'react';
import { profileAPI } from '../api/profileAPI';
import { errorUtils } from '../utils/error-utils';
import { setAppStatusAC } from './app-reducer';
import { AppThunk } from './redux-store';

const initialState = {
    _id: '',
    name: 'Enter your name',
    avatar: '',
    email: '',
    publicCardPacksCount: 0
}

export const profileReducer = (state: UserDataType = initialState, action: ActionType): InitialStateType =>
{
    switch (action.type)
    {
        case 'profile/SET_USER_DATA': {
            return { ...state, ...action.userData }
        }
        default:
            return state
    }

}

export const setUserDataAC = (userData: UserDataType) => ({ type: 'profile/SET_USER_DATA', userData } as const)

export const updateUserDataTC = (userData: UserDataType): AppThunk => async (dispatch) =>
{
    dispatch(setAppStatusAC('loading'))
    try
    {
        const res = await profileAPI.updateUserData(userData)
        if (res.data)
        {
            dispatch(setUserDataAC(res.data.updatedUser))
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
export type UserDataType = {
    _id: string
    email: string
    rememberMe?: boolean
    isAdmin?: boolean
    name: string
    verified?: boolean
    publicCardPacksCount: number
    created?: Date
    updated?: Date
    __v?: number
    token?: string
    tokenDeathTime?: number
    avatar: string
}

export type InitialStateType = typeof initialState
export type ActionType = ReturnType<typeof setUserDataAC> 
