import React from 'react'
import { Link } from 'react-router-dom'
import { getUserTC } from '../../redux/packs-reducer'
import { useAppDispatch, useAppSelector } from '../../redux/redux-store'
import { Paginator } from '../Paginator/Paginator'
import { Table } from './Table/Table'
import s from './PacksList.module.css'
import { SearchByName } from '../../common/Search/SearchByName'


export const PacksList=()=>{
  const dispatch = useAppDispatch()
  const cardPacksTotalCount = useAppSelector(state => state.packs.cardPacksTotalCount)
  const pageCount = useAppSelector(state => state.packs.pageCount)
  const page = useAppSelector(state => state.packs.page)

  const pageClickChange = (page: number) => dispatch(getUserTC(page, pageCount))
  const onSearchNameClick=(name:string)=>{
    dispatch(getUserTC(page, pageCount))
  }
  return(
    <div>
<h3>Pack List</h3>
<SearchByName searchName={onSearchNameClick}/>


<Link to="/addNewPack" className={s.btn}>Add New Pack</Link>
<div>
 <Table/>
</div>
<div>
  <Paginator pageClickChange={pageClickChange}
      currentPage={page} pageSize={pageCount} totalCount={cardPacksTotalCount}/>
</div>
</div>
  
  )
}


