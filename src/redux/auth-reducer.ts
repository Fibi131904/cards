import React from 'react';



export type ActionType = ReturnType<typeof setIsLoggedInAC>
export type InitialStateType = typeof initialState
// export type AuthActionsType =  ActionType

const initialState = {isLoggedIn: false}


export const authReducer = (state: InitialStateType = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.value}
        default:
            return state
    }
}


export const setIsLoggedInAC = (value:boolean) => ({ type: 'login/SET-IS-LOGGED-IN', value} as const)
 