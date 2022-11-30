import Button from '@mui/material/Button/Button'
import React, { useEffect, useState } from 'react'
import { SuperDoubleRange } from '../../common/SuperDoubleRange/SuperDoubleRange'
import { getPacksTC, setPageAC } from '../../redux/packs-reducer'
import { useAppSelector, useTypedDispatch } from '../../redux/redux-store'
import s from './PacksList.module.css'
import { PacksTable } from './PacksTable'

export const PacksList = () => {
  const min=useAppSelector(state=>state.packs.params.minCardsCount)
  const max=useAppSelector(state=>state.packs.params.maxCardsCount)
  const minCardsCount = useAppSelector(state => state.packs.minCardsCount)
  const maxCardsCount = useAppSelector(state => state.packs.maxCardsCount)

  const dispatch = useTypedDispatch()

  const [value, setValue] = useState<number | number[]>([min,max])
  
const onMyCklick=()=>{
  
}
const onAllClick=()=>{

}




const handleChangeMinMax = (event: React.SyntheticEvent | Event, value: number | Array<number>) => {
  if (Array.isArray(value)) {
           setValue([value[0], value[1]])
  }
};

  useEffect(()=>{
    dispatch(getPacksTC())
  },[])
  
  return (
    <div>
      <div>
        <button> Add new pack </button>
        <div className={s.headerBlock}>
          <div className={s.search}>Search</div>
          <div className={s.search2}>
            <div>show packs cards</div>
            <Button color={'primary'} onClick={onMyCklick} >My</Button>
            <Button color={'primary'} onClick={onAllClick} >All</Button>
          </div>

          <div className={s.search3}>
            <div>number of cards</div>
            <div className={s.superDoubleRange}>
              <span>{minCardsCount}</span>
              <SuperDoubleRange
               min={minCardsCount}
               max={maxCardsCount}
               value={value}
               onChange={(e, newValue) => setValue(newValue)}
               onChangeCommitted={handleChangeMinMax}
              />
              <div className={s.divValue2}>{maxCardsCount}</div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div>Table</div>
       
      </div>
     < PacksTable/>
    </div>
  )
}
