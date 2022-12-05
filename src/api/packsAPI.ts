import { AxiosResponse } from 'axios';
import { instance } from './instance';

export const packsAPI={
  getPacks(value?: string,currentPage?:number, pageCount?: number ,min?: number,userID?: string) {
    return instance.get(`cards/pack?page=${currentPage}&pageCount=${pageCount}&min=${min}`, {params: {packName: value,user_id: userID}})
},
  addPack(name: string,  deckCover: string, isPrivate?: boolean ){
    return instance.post('/cards/pack',{cardsPack:{name, deckCover, private: isPrivate}})
  },
  deletePack(id: string ){
    return instance.delete('/cards/pack?id=${id}')
  },
  updatePack(_id:string, name:string, deckCover:string ){
    return instance.put('/cards/pack',{cardsPack:{_id, name, deckCover}})
  }
}

// type RequestGetPacksType = {
//   packName: string
//   min?: number
//   max?: number
//   sortPacks?: string
//   page: number
//   pageCount: number
//   user_id?: string
// }

export type PacksType = {
  _id: string,
    user_id: string,
    user_name: string,
    private: boolean,
    name: string,
    path: string,
    grade: number,
    shots: number,
    cardsCount: number,
    type: string,
    rating: number,
    created: string,
    updated: string,
    more_id: string,
    __v: number,
}

export type ResponseGetPacksType={
  cardPacks:PacksType[]
  page:number 
  pageCount: number 
  cardPacksTotalCount:number 
  minCardsCount: number 
  maxCardsCount: number 
  sortPacks: string   
  token: string
  tokenDeathTime: number
}