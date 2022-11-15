
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
type InitialStateType = typeof initialState
const initialState= {
  status:'idle' as RequestStatusType,
  error: null as null | string,
  isInitialized:false
}
export const appReducer=(state:InitialStateType = initialState, action: ActionType ):InitialStateType=>{
  switch(action.type){
case 'APP/SET_STATUS':
  return {
    ...state, status: action.status
  }
  default:
    return state
  }
}
export type ActionType= ReturnType<typeof setAppStatus>

export const setAppStatus=(status: RequestStatusType)=>({type:'APP/SET_STATUS',status}as const)
