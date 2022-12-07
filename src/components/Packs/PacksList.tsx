import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { filterPacksByCardsTC, getPacksCardTC, getUserTC, searchNameTC } from '../../redux/packs-reducer'
import { useAppDispatch, useAppSelector } from '../../redux/redux-store'
import { Paginator } from '../../common/Paginator/Paginator'
import { Table } from './Table/Table'
import s from './PacksList.module.css'
import { SearchByName } from '../../common/Search/SearchByName'
import { SuperDoubleRange } from '../../common/SuperDoubleRange/SuperDoubleRange'
import useDebounce from '../../hooks/useDebounce'



export const PacksList = React.memo( () => {
  const dispatch = useAppDispatch()
  const cardPacksTotalCount = useAppSelector(
    (state) => state.packs.cardPacksTotalCount
  )
  const pageCount = useAppSelector((state) => state.packs.pageCount)
  const page = useAppSelector((state) => state.packs.page)
  const minCardsCount = useAppSelector((state) => state.packs.minCardsCount)
  const maxCardsCount = useAppSelector((state) => state.packs.maxCardsCount)
  const min = useAppSelector(state => state.packs.min)
  const max = useAppSelector(state => state.packs.max)
  const searchName = useAppSelector(state => state.packs.searchName)
  const isCheckedMyPacks = useAppSelector(state => state.packs.isCheckedMyPacks)

  const [value, setValue] = React.useState<number | number[]>([min, max]);

  const debouncedValue = useDebounce<string>(searchName, 1000)

  const pageClickChange = (page: number) => {
    dispatch(getUserTC(page, pageCount))
  }

  const onSearchNameClick = (name: string) => {
    dispatch(searchNameTC(name))
  }


  
  const handleChangeMinMax = (event: React.SyntheticEvent | Event, value: number | Array<number>) => {
    if (Array.isArray(value)) {
        dispatch(filterPacksByCardsTC (value[0], value[1]));
        setValue([value[0], value[1]])
    }
};

useEffect(() => {
  dispatch(getPacksCardTC())
}, [dispatch, debouncedValue, isCheckedMyPacks, min, max, pageCount, page])


    return (
      <div>
        <h3>Pack List</h3>
        <div className={s.header}>
        <SearchByName searchName={onSearchNameClick} />

       
        <div className={s.superDoubleRange}>       
        <SuperDoubleRange
         value={value}
         onChange={(e, newValue) => setValue(newValue)}
         onChangeCommitted={handleChangeMinMax}
          min={minCardsCount}
          max={maxCardsCount}
          />
           <Link to="/addNewPack" className={s.btn}>
          Add New Pack
        </Link>
</div>
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
)
