import { AxiosError } from 'axios';
import { packsAPI } from './../api/packsAPI';
import { setAlertListAC, setAppStatusAC } from "./app-reducer"
import { AppThunk } from "./redux-store"
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
  maxCardsCount: 110,
  minCardsCount: 0,
  page: 1,
  pageCount: 10,
  currentPack: '',
  searchName: '',
  min: 0,
  max: 110,
}

export const packsReducer = (state: PackInitStateType = initialState, action: PackActionType): PackInitStateType =>
{
  switch (action.type) 
  {
    case 'packs/GET_PACKS_CARD_DATA': {
      return {
        ...state,
        cardPacks: action.packs.cardPacks,
        cardPacksTotalCount: action.packs.cardPacksTotalCount,
        maxCardsCount: action.packs.maxCardsCount,
        page: action.packs.page
      }
    }
    case 'packs/SET_TOTAL_PACK_COUNT': {
      return {
        ...state, cardPacksTotalCount: action.cardPacksTotalCount
      }
    }
    case 'packs/SET_CURRENT_PAGES': {
      return {
        ...state, page: action.currentPage
      }
    }
    case 'packs/SEARCH_NAME': {
      return {
        ...state, searchName: action.name
      }
    }
    case 'packs/CHANGE_MIN_CARD_COUNT': {
      return {
        ...state,
        minCardsCount: action.minCardsCount,
        maxCardsCount: action.maxCardsCount
      }
    }
    case 'packs/SET_MIN_MAX': {
      return { ...state, min: action.min, max: action.max }
    }
    case 'packs/IS_MY_PACK': {
      return {
        ...state,
        isCheckedMyPacks: action.isChecked
      }
    }

    default:
      return state
  }
}

export const setMinMaxAC = (min: number, max: number) => ({ type: 'packs/SET_MIN_MAX', min, max } as const)
export const getPacksCartDataAC = (packs: PackInitStateType) => ({ type: 'packs/GET_PACKS_CARD_DATA', packs } as const)
export const setTotalPackCountAC = (cardPacksTotalCount: number) => ({ type: 'packs/SET_TOTAL_PACK_COUNT', cardPacksTotalCount } as const)
export const setCurrentPagesAC = (currentPage: number) => ({ type: 'packs/SET_CURRENT_PAGES', currentPage } as const)
export const searchNameAC = (name: string) => ({ type: 'packs/SEARCH_NAME', name } as const)
export const changeMinCardCountAC = (minCardsCount: number, maxCardsCount: number) => ({
  type: 'packs/CHANGE_MIN_CARD_COUNT', minCardsCount,
  maxCardsCount
} as const)
export const isCheckedMyPacksAC = (isChecked: boolean) => ({
  type: 'packs/IS_MY_PACK',
  isChecked
} as const)




export const getPacksCardTC = (): AppThunk => (dispatch, getState) =>
{

  const { minCardsCount, page, pageCount, searchName } = getState().packs
  dispatch(setAppStatusAC('loading'))
  packsAPI.getPacks(searchName, page, pageCount, minCardsCount)
    .then((res) =>
    {
      dispatch(getPacksCartDataAC(res.data))
    })
    .catch((error: any | AxiosError<{ error: string; }, any>) =>
    {

      errorUtils(error, dispatch)
    })

    .finally(() =>
    {
      dispatch(setAppStatusAC('succeeded'))
    })
}
export const filterPacksByCardsTC = (minCardsCount: number, maxCardsCount: number): AppThunk => (dispatch) =>
{
  dispatch(changeMinCardCountAC(minCardsCount,
    maxCardsCount))
  dispatch(getPacksCardTC())

}
export const filterPacksMyAllTC = (isCheckedMyPacks: boolean): AppThunk => (dispatch) =>
{
  dispatch(isCheckedMyPacksAC(isCheckedMyPacks))
  dispatch(getPacksCardTC())

}
export const setPrivatPacksTC = (): AppThunk => (dispatch, getState) =>
{
  const userID = getState().profile._id
  const { minCardsCount, page, pageCount, searchName } = getState().packs
  packsAPI.getPacks(searchName, page, pageCount, minCardsCount, userID)
    .then((res) =>
    {
      dispatch(getPacksCartDataAC(res.data))
    })
}

export const getUserTC = (currentPage: number, pageCount: number): AppThunk => (dispatch, getState) =>
{
  const { isCheckedMyPacks, minCardsCount, searchName } = getState().packs
  const userID = getState().profile._id
  if (!isCheckedMyPacks)
  {
    packsAPI.getPacks(searchName, currentPage, pageCount, minCardsCount)
      .then(data =>
      {
        dispatch(setTotalPackCountAC(data.data.cardPacksTotalCount))
        dispatch(setCurrentPagesAC(currentPage))
        dispatch(getPacksCartDataAC(data.data))
      })
  } else
  {
    packsAPI.getPacks(searchName, currentPage, pageCount, minCardsCount, userID)
      .then((data) =>
      {
        dispatch(setTotalPackCountAC(data.data.cardPacksTotalCount))
        dispatch(setCurrentPagesAC(currentPage))
        dispatch(getPacksCartDataAC(data.data))
      })
  }
}
export const searchNameTC = (findByName: string): AppThunk => (dispatch, getState) =>
{
  const { isCheckedMyPacks, minCardsCount, page, pageCount } = getState().packs
  const userID = getState().profile._id
  if (!isCheckedMyPacks)
  {
    packsAPI.getPacks(findByName, page, pageCount, minCardsCount)
      .then(res =>
      {
        dispatch(searchNameAC(findByName))
        dispatch(getPacksCartDataAC(res.data))
        dispatch(setAlertListAC({
          id: 1,
          type: 'success',
          title: `Found ${res.data.cardPacksTotalCount} decks with this name`
        }))
      })
  } else
  {
    packsAPI.getPacks(findByName, page, pageCount, minCardsCount, userID)
      .then(res =>
      {
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
  | ReturnType<typeof setMinMaxAC>
  | ReturnType<typeof isCheckedMyPacksAC>



export type PackInitStateType = typeof initialState



