import { combineReducers } from "redux";
import { legacy_createStore as createStore} from 'redux'
import { authReducer } from "./auth-reducer";
import { profileReducer } from "./profile-reducer";

export type AppStateType = ReturnType<typeof rootReducer>

export const rootReducer= combineReducers({
  auth: authReducer,
  profile: profileReducer
})
export let store= createStore(rootReducer)