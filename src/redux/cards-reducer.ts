import { CardType } from "../api/cardsAPI"

type InitialStateType= typeof initialState;
type ActionsType = ReturnType<typeof getCardsAC>

const initialState={
  cards: [] as CardType[],
  card: {} as CardType,
  packUserId: '',
  params: {
      page: 1,
      pageCount: 10,
      cardsTotalCount: 0,
      cardQuestion: '',
      cardAnswer: '',
  },
  minGrade: 0,
  maxGrade: 6,
}

export const cardsReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
  switch (action.type) {
    case 'cards/GET_CARDS':
      return {...state, cards: action.cards}

  
  default:
    return state
}
}
export const getCardsAC=(cards: CardType[])=>({type:'cards/GET_CARDS', cards}as const)


