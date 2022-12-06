import React, { ChangeEvent, useState } from 'react'
import { Link } from 'react-router-dom'
import { filterPacksByCardsTC, getUserTC } from '../../redux/packs-reducer'
import { useAppDispatch, useAppSelector } from '../../redux/redux-store'
import { Paginator } from '../Paginator/Paginator'
import { Table } from './Table/Table'
import s from './PacksList.module.css'
import { SearchByName } from '../../common/Search/SearchByName'
import { SuperDoubleRange } from '../../common/SuperDoubleRange/SuperDoubleRange'


export const PacksList = () => {
  const dispatch = useAppDispatch()
  const cardPacksTotalCount = useAppSelector(
    (state) => state.packs.cardPacksTotalCount
  )
  const pageCount = useAppSelector((state) => state.packs.pageCount)
  const page = useAppSelector((state) => state.packs.page)
  const minCardsCount = useAppSelector((state) => state.packs.minCardsCount)
  const maxCardsCount = useAppSelector((state) => state.packs.maxCardsCount)

  const pageClickChange = (page: number) => {
    dispatch(getUserTC(page, pageCount))
  }

  const onSearchNameClick = (name: string) => {
    dispatch(getUserTC(page, pageCount))
  }
  const [value, setValue] = React.useState<number | number[]>([minCardsCount, maxCardsCount]);
  
   const handleChangeMinMax = (e: React.SyntheticEvent | Event, value: number | Array<number>) => {
    if (Array.isArray(value)) {
        dispatch(filterPacksByCardsTC(value[0], value[1]));
       
    }
};
const onChangeHandler=(e: React.SyntheticEvent | Event, newValue: number | Array<number>)=>{
 
  setValue(newValue)
}
  
    return (
      <div>
        <h3>Pack List</h3>
        <SearchByName searchName={onSearchNameClick} />

        <Link to="/addNewPack" className={s.btn}>
          Add New Pack
        </Link>
        <div className={s.superDoubleRange}>
       
        <SuperDoubleRange
         value={value}
         onChange={onChangeHandler}
         onChangeCommitted={handleChangeMinMax}
          min={minCardsCount}
          max={maxCardsCount}
          />

 </div>
        <div>
          <Table />
        </div>
        <div>
          <Paginator
            pageClickChange={pageClickChange}
            currentPage={page}
            pageSize={pageCount}
            totalCount={cardPacksTotalCount}
          />
        </div>
      </div>
    )
  }

