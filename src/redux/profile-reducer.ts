import React from 'react';


export type Action1Type = {
  type: '1'
}
export type Action2Type = {
  type: '2'
}

export type InitialStateType = typeof initionState
const initionState = {}

export type ActionsType = Action1Type | Action2Type

export const profileReducer = (state: InitialStateType = initionState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case '1': {

            return { ...state }
        }
        case '2': {

            return { ...state }
        }
        default:
            throw new Error("I don't userstand this action type")
    }

}

export const action1AC = (): Action1Type => {
    return { type: '1'}
 }
export const action2AC =():Action2Type => {
    return { type: '2'}
 }