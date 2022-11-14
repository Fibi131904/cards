export enum ResultCodesEnum {
  Success= 0,
  Error= 1,
  }

export type DataLoginType =  { 
  email: string 
  password: string
  rememberMe: boolean
 }