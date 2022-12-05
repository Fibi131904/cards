import ButtonGroup from '@mui/material/ButtonGroup'
import React, { useState } from 'react'
import { useAppSelector, useAppDispatch } from '../../redux/redux-store'
import { FilterButton } from './FilterButton'

export const FilterPacks = () => {
  const [active, setActive] = useState(false)
  const dispatch = useAppDispatch()
  const userId = useAppSelector(state => state.profile._id)
 

  const onClickHandler = (title: any) => {
    setActive(!active)
   // dispatch(setQueryParams({ user_id: title === 'My' ? userId : '' }))
  }



  const filterButtons = [
    <FilterButton key={'My'} state={active} title={'My'} handler={onClickHandler} />,
    <FilterButton key={'All'} state={!active} title={'All'} handler={onClickHandler} />,
  ]

  return <ButtonGroup> {filterButtons}</ButtonGroup>
}