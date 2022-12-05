import React from 'react'
import s from './TableRow.module.css'
import { useAppSelector } from '../../redux/redux-store'

type DataCardsProps = {
  name: string
  countCard: number
  created: string
  rating: number
  id: string
  grade: number
}

export const TableRow = (props: DataCardsProps) => {
    const cardPacks = useAppSelector(state => state.packs.cardPacks)
  return (
    <div>
      <div className={s.table}>
        <div>showPacksCard</div>
        <div>{props.countCard}</div>
        <div>{props.created}</div>
        <div>Raiting </div>
        <div className={s.menu}>
          <button>change</button>
          <button>delete</button>
          <button>lern</button>
        </div>
      </div>
    </div>
  )
}
