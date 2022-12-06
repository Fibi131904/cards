import { packsAPI } from './../api/packsAPI';
import { setAlertListAC } from "./app-reducer"
import { AppThunk } from "./redux-store"


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
  maxCardsCount: 110,
  minCardsCount: 0,
  page: 1,
  pageCount: 10,
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
    case 'Packs/SEARCH_NAME':{
      return{
        ...state, searchName:action.name
      }
    }
    case 'Packs/CHANGE_MIN_CARD_COUNT':{
      return{
        ...state,
        minCardsCount: action.minCardsCount,
        maxCardsCount:action.maxCardsCount
      }
    }
default:
      return state
  }
}



export const getPacksCartDataAC = (packs: PackInitStateType) => ({ type: 'Packs/GET_PACKS_CARD_DATA', packs } as const)
export const setTotalPackCountAC = (cardPacksTotalCount: number) => ({ type: 'Packs/SET_TOTAL_PACK_COUNT', cardPacksTotalCount } as const)
export const setCurrentPagesAC = (currentPage: number) => ({ type: 'Packs/SET_CURRENT_PAGES', currentPage } as const)
export const searchNameAC = (name: string) => ({ type: 'Packs/SEARCH_NAME', name } as const)
export const changeMinCardCountAC = (minCardsCount: number, maxCardsCount: number) => ({ type: 'Packs/CHANGE_MIN_CARD_COUNT', minCardsCount,
maxCardsCount } as const)

export const getPacksCardTC = (): AppThunk => (dispatch, getState) => {
  const {minCardsCount, page, pageCount,searchName} = getState().packs
  packsAPI.getPacks(searchName, page, pageCount, minCardsCount)
      .then((res) => {
          dispatch(getPacksCartDataAC(res.data))
      })
}
export const filterPacksByCardsTC = (minCardsCount: number, maxCardsCount: number): AppThunk => (dispatch) => {
  dispatch(changeMinCardCountAC( minCardsCount,
    maxCardsCount))
  dispatch(getPacksCardTC())
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
export const searchNameTC = (findByName: string): AppThunk => (dispatch, getState) => {
  const {isCheckedMyPacks, minCardsCount, page, pageCount} = getState().packs
  const userID = getState().profile._id
          if (!isCheckedMyPacks) {
          packsAPI.getPacks(findByName, page, pageCount, minCardsCount)
              .then(res => {
                  dispatch(searchNameAC(findByName))
                  dispatch(getPacksCartDataAC(res.data))
                  dispatch(setAlertListAC({
                      id: 1,
                      type: 'success',
                      title: `Found ${res.data.cardPacksTotalCount} decks with this name`
                  }))
              }) } else {
              packsAPI.getPacks(findByName, page, pageCount, minCardsCount, userID)
                  .then(res => {
                      dispatch(searchNameAC(findByName))
                      dispatch(getPacksCartDataAC(res.data))
                      dispatch(setAlertListAC({
                          id: 1,
                          type: 'success',
                          title: `Found ${res.data.cardPacksTotalCount} decks with this name`
                      }))
                  })
          }
}



export type PackActionType = ReturnType<typeof getPacksCartDataAC>
| ReturnType<typeof setTotalPackCountAC>
| ReturnType<typeof setCurrentPagesAC>
| ReturnType<typeof searchNameAC>
| ReturnType<typeof changeMinCardCountAC>


export type PackInitStateType = typeof initialState


