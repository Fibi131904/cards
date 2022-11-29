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
    default:
    return state
   }
}

export const getPacksAC = (packs: PacksType[]) => ({ type: 'packs/SET_PACKS', packs } as const)

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