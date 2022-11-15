import { useDispatch } from "react-redux";
import { AnyAction, applyMiddleware, combineReducers } from "redux";
import { legacy_createStore} from 'redux'
import thunk, { ThunkAction, ThunkDispatch} from "redux-thunk";
import {  AuthActionType, authReducer } from "./auth-reducer";
import { profileReducer } from "./profile-reducer";

export type AppStateType = ReturnType<typeof rootReducer>

export const rootReducer= combineReducers({
  auth: authReducer,
  // profile: profileReducer
})

export const store= legacy_createStore(rootReducer , applyMiddleware(thunk))
export type RootState= ReturnType<typeof store.getState>
export type AppThunk<ReturnType= void>= ThunkAction<
ReturnType,
RootState,
unknown,AnyAction>

export type AppActionsType = AuthActionType


export type AppDispatch = typeof store.dispatch;
export type TypedDispatch = ThunkDispatch<AppStateType, any, AppActionsType>;

export const useTypedDispatch = () => useDispatch<TypedDispatch>();