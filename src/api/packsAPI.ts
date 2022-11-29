import { AxiosResponse } from 'axios';
import { instance } from './instance';

export const packAPI={
  getPacks(params?:RequestGetPacksType){
    return instance.get<RequestGetPacksType, AxiosResponse<ResponseGetPacksType>>('/cards/pack', {params})
  },
}

type RequestGetPacksType={
packName?: string
min?: number
max?: number 
  sortPacks?: string
  page?: number
  pageCount?: number
  user_id?: string
}

export type PacksType = {
  _id: string
  user_id: string
  user_name: string
  private: boolean
  name: string
  path: string
  grade: number
  shots: number
  cardsCount: number
  type: string
  rating: number
  created: string
  updated: string
  more_id: string
  __v: number
  deckCover: string
}

export type ResponseGetPacksType={
  cardPacks:PacksType[]
  page:number 
  pageCount: number 
  cardPacksTotalCount:number 
  minCardsCount: number 
  maxCardsCount: number 
  sortPacks: string   
}