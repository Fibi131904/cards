export enum ResultCodesEnum {
  Success= 0,
  Error= 1,
  }

export type DataLoginType =  { 
  email: string 
  password: string
  rememberMe: boolean
 }
 export type ResponseType = {
  _id: string,
  email: string,
  rememberMe: boolean,
  isAdmin: boolean,
  name: string,
  verified: boolean,
  publicCardPacksCount: number,
  created: Date,
  updated: Date,
  __v: any,
  token: string,
  tokenDeathTime: number,
  avatar: string,
};

export type RegDataType = {
  email: string
  password: string
}

