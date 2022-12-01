import { AxiosResponse } from "axios"
import { instance } from "./instance"

export const cardsAPI={
  getCards(cardsPack_id: string, params?: RequestGetCardsType){
    return instance.get<RequestGetCardsType, AxiosResponse<ResponseGetCardsType>>(`/cards/card/?cardsPack_id=${cardsPack_id}`, {params})
  }
}




export type RequestGetCardsType={
cardAnswer: string
cardQuestion?: string
cardsPack_id?: string
min?: number
max?: number
sortCards?: string
page?: number
pageCount?: number
}

export type CardType = {
  _id: string
  cardsPack_id: string
  user_id?: string
  answer: string
  question: string
  grade: number
  shots: number
  comments?: string
  type: string
  rating: number
  more_id: string
  created: string
  updated: string
  __v?: number
}

export type ResponseGetCardsType = {
  cards: CardType[],
  packUserId: string
  page: number
  pageCount: number
  cardsTotalCount: number
  minGrade: number
  maxGrade: number
  token: string
  tokenDeathTime: number
}