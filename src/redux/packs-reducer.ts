import { packsAPI } from './../api/packsAPI';
import { setAppStatusAC } from "./app-reducer"
import { AppThunk } from "./redux-store"
import { AxiosError } from 'axios';
import { errorUtils } from '../utils/error-utils';

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

const initialState = {
  cardPacks: [] as Array<PacksType>,
  isCheckedMyPacks: false,
  cardPacksTotalCount: 0,
  maxCardsCount: 0,
  minCardsCount: 0,
  page: 0,
  pageCount: 7,
  currentPack: '',
  searchName: ''
}

export const packsReducer = (state: PackInitStateType = initialState, action: PackActionType): PackInitStateType =>
{
  switch (action.type) 
  {
    case 'Packs/GET_PACKS_CARD_DATA': {
      return {
  ...state,
        cardPacks: action.packs.cardPacks,
        cardPacksTotalCount: action.packs.cardPacksTotalCount,
        maxCardsCount: action.packs.maxCardsCount,
        page: action.packs.page
      }
    }
    case 'Packs/SET_TOTAL_PACK_COUNT':{
      return{
        ...state, cardPacksTotalCount:action.cardPacksTotalCount
      }
    }
    case 'Packs/SET_CURRENT_PAGES':{
      return{
        ...state, page:action.currentPage
      }
    }
default:
      return state
  }
}



export const getPacksCartDataAC = (packs: PackInitStateType) => ({ type: 'Packs/GET_PACKS_CARD_DATA', packs } as const)
export const setTotalPackCountAC = (cardPacksTotalCount: number) => ({ type: 'Packs/SET_TOTAL_PACK_COUNT', cardPacksTotalCount } as const)
export const setCurrentPagesAC = (currentPage: number) => ({ type: 'Packs/SET_CURRENT_PAGES', currentPage } as const)

export const getPacksCardTC = (): AppThunk => (dispatch, getState) => {
  const {minCardsCount, page, pageCount,searchName} = getState().packs
  packsAPI.getPacks(searchName, page, pageCount, minCardsCount)
      .then((res) => {
          dispatch(getPacksCartDataAC(res.data))
      })
}
export const setPrivatPacksTC = (): AppThunk => (dispatch, getState) => {
  const userID = getState().profile._id
  const { minCardsCount, page, pageCount,searchName} = getState().packs
          packsAPI.getPacks(searchName, page, pageCount, minCardsCount,userID)
              .then((res) => {
                  dispatch(getPacksCartDataAC(res.data))
              })
}

export const getUserTC = (currentPage: number, pageCount: number): AppThunk => (dispatch, getState) => {
  const {isCheckedMyPacks, minCardsCount,searchName} = getState().packs
  const userID = getState().profile._id
  if (!isCheckedMyPacks) {
      packsAPI.getPacks(searchName, currentPage, pageCount, minCardsCount)
          .then(data => {
              dispatch(setTotalPackCountAC(data.data.cardPacksTotalCount))
              dispatch(setCurrentPagesAC(currentPage))
              dispatch(getPacksCartDataAC(data.data))
          })
  } else {
              packsAPI.getPacks(searchName, currentPage, pageCount, minCardsCount,userID)
                  .then((data) => {
                      dispatch(setTotalPackCountAC(data.data.cardPacksTotalCount))
                      dispatch(setCurrentPagesAC(currentPage))
                      dispatch(getPacksCartDataAC(data.data))
                  })
  }
}



export type PackActionType = ReturnType<typeof getPacksCartDataAC>
| ReturnType<typeof setTotalPackCountAC>
| ReturnType<typeof setCurrentPagesAC>


export type PackInitStateType = typeof initialState


