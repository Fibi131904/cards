import { setNewPasswordReducer } from './setNewPassword-reducer';
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AnyAction, applyMiddleware, combineReducers } from "redux";
import { legacy_createStore} from 'redux'
import thunk, { ThunkAction, ThunkDispatch} from "redux-thunk";
import { appReducer } from "./app-reducer";
import {  AuthActionType, authReducer } from "./auth-reducer";
import { recoverPasswordReducer } from "./recoverPassword-reducer";
import { registerReducer } from "./register-reducer";
import { profileReducer } from './profile-reducer';
import { packsReducer } from './packs-reducer';
import { cardsReducer } from './cards-reducer';


export type AppStateType = ReturnType<typeof rootReducer>

export const rootReducer= combineReducers({
  app: appReducer,
  auth: authReducer,
  register:registerReducer,
  recoverPassword: recoverPasswordReducer,
  setNewPassword: setNewPasswordReducer,
  profile: profileReducer,
  packs: packsReducer,
  cards: cardsReducer
})

export const store= legacy_createStore(rootReducer , applyMiddleware(thunk))
export type RootStateType= ReturnType<typeof store.getState>
export type AppThunk<ReturnType= void>= ThunkAction<
ReturnType,
RootStateType,
unknown,AnyAction>

export type AppActionsType = AuthActionType


//export type AppDispatch = typeof store.dispatch;
export type AppDispatch = ThunkDispatch<RootStateType, unknown, AnyAction>
export type TypedDispatch = ThunkDispatch<AppStateType, any, AppActionsType>;

export const useAppDispatch = () => useDispatch<TypedDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppStateType> = useSelector