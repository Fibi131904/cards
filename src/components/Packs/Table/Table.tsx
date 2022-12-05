import React, { useEffect } from 'react'
import { getPacksCardTC, setPrivatPacksTC } from '../../../redux/packs-reducer'
import { useAppDispatch, useAppSelector } from '../../../redux/redux-store'
import { HeaderTable } from './HeaderTable'
import s from './Table.module.css'






export const Table=()=>{
  const dispatch = useAppDispatch()
  const isCheckedMyPacks = useAppSelector(state => state.packs.isCheckedMyPacks)
  
  useEffect(() => {
    if (isCheckedMyPacks) {
        dispatch(setPrivatPacksTC())
    } else {
        dispatch(getPacksCardTC())
    }
}, [isCheckedMyPacks])
 
  return (
    <div className={s.table}>
      <HeaderTable/>     
    </div>
  )
}