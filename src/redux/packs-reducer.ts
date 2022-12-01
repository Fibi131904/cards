import { packAPI } from './../api/packsAPI';
import { PacksType } from "../api/packsAPI"
import { setAppStatusAC } from "./app-reducer"
import { AppThunk } from "./redux-store"
import { AxiosError } from 'axios';
import { errorUtils } from '../utils/error-utils';


const initialState = {
  cardPacks: [] as PacksType[],
  cardPacksTotalCount: 0,
  minCardsCount: 0,
  maxCardsCount: 110,
  params: {
    page: 1,
    pageCount: 10,
    minCardsCount: 0,
    maxCardsCount: 110,
    packName: '',
    sortPacks: '',
  },
  isMyPack: false
}

export const packsReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType =>
{
  switch (action.type)
  {
    case 'packs/SET_PACKS':
      return { ...state, cardPacks: action.packs }
    case 'packs/SET_PAGE':
      return { ...state, params: { ...state.params, page: action.page } }
    case 'packs/SET_PAGE_COUNT':
      return { ...state, params: { ...state.params, pageCount: action.pageCount } }
    case 'packs/SET_PACKS_TOTAL_COUNT':
      return {...state, cardPacksTotalCount: action.cardPacksTotalCount}
    case 'packs/IS_MY_PACK':
      return { ...state, isMyPack: action.isMyPack } 

    default:
      return state
  }
}

export const getPacksAC = (packs: PacksType[]) => ({ type: 'packs/SET_PACKS', packs } as const)
export const setPageAC = (page: number) => ({ type: 'packs/SET_PAGE', page } as const)
export const setPageCountAC = (pageCount: number) => ({ type: 'packs/SET_PAGE_COUNT',pageCount } as const)
export const isMyPackAC = (isMyPack: boolean) => ({ type: 'packs/IS_MY_PACK', isMyPack
} as const)
export const setPacksTotalCountAC = (cardPacksTotalCount: number) => ({ type: 'packs/SET_PACKS_TOTAL_COUNT', cardPacksTotalCount
} as const)


export const getPacksTC = (): AppThunk => async (dispatch, getState) =>
{
  const { isMyPack, params } = getState().packs
  const userId = getState().profile._id
  dispatch(setAppStatusAC('loading'))
  try
  {
    const res = await packAPI.getPacks({
      user_id: isMyPack ? userId : '',
      ...params
    })
    if (res.data.cardPacks)
    {
      dispatch(getPacksAC(res.data.cardPacks))
      dispatch(setPageAC(res.data.page))
      dispatch(setPageCountAC(res.data.pageCount))
      dispatch(setPacksTotalCountAC(res.data.cardPacksTotalCount))
    }
  }
  catch (error: any | AxiosError<{ error: string; }, any>)
  {
    errorUtils(error, dispatch)
  }
  finally
  {
    dispatch(setAppStatusAC('succeeded'))
  }
}

export const addPackTC = (name: string, deckCover: string, isPrivate?: boolean): AppThunk => async (dispatch) =>
{
  dispatch(setAppStatusAC('loading'))
  try
  {
    const res = await packAPI.addPack(
      name, deckCover, isPrivate)
    if (res.data)
    {
      dispatch(getPacksTC())
    }
  }
  catch (error: any | AxiosError<{ error: string; }, any>)
  {
    errorUtils(error, dispatch)
  }
  finally
  {
    dispatch(setAppStatusAC('succeeded'))
  }
}

export const deletePackTC = (id: string): AppThunk => async (dispatch) =>
{
  dispatch(setAppStatusAC('loading'))
  try
  {
    const res = await packAPI.deletePack(id)
    if (res.data)
    {
      dispatch(getPacksTC())
    }
  }
  catch (error: any | AxiosError<{ error: string; }, any>)
  {
    errorUtils(error, dispatch)
  }
  finally
  {
    dispatch(setAppStatusAC('succeeded'))
  }
}

export const updatePackTC = (id: string, name: string, deckCover: string): AppThunk => async (dispatch) =>
{
  dispatch(setAppStatusAC('loading'))
  try
  {
    const res = await packAPI.updatePack(id, name, deckCover)
    if (res.data)
    {
      dispatch(getPacksTC())
    }
  }
  catch (error: any | AxiosError<{ error: string; }, any>)
  {
    errorUtils(error, dispatch)
  }
  finally
  {
    dispatch(setAppStatusAC('succeeded'))
  }
}

export type InitialStateType = typeof initialState
export type ActionsType = ReturnType<typeof getPacksAC>
  | ReturnType<typeof setPageAC>
  | ReturnType<typeof setPageCountAC>
  | ReturnType<typeof isMyPackAC>
  | ReturnType<typeof setPacksTotalCountAC>
