import Button from '@mui/material/Button'
import * as React from 'react'

import { useAppDispatch, useAppSelector } from '../../redux/redux-store'

export const ButtonGroup = React.memo(() => {
  const dispatch = useAppDispatch()
  const isCheckedMyPacks = useAppSelector(
    (state) => state.packs.isCheckedMyPacks
  )

  const allPacksHandler = () => {
    // dispatch((false))
  }

  const myPacksHandler = () => {
    // dispatch((true))
  }

  return (
    <div>
      <Button
        variant={isCheckedMyPacks ? 'contained' : 'outlined'}
        color="primary"
        onClick={myPacksHandler}>
        My
      </Button>
      <Button
        variant={!isCheckedMyPacks ? 'contained' : 'outlined'}
        color="primary"
        onClick={allPacksHandler}>
        All
      </Button>
    </div>
  )

})
