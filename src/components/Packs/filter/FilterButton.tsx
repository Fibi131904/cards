import Button from '@mui/material/Button'
import React from 'react'


type PropsType = {
  state: boolean
  title: string
  handler: (title: string) => void
}

export const FilterButton: React.FC<PropsType> = ({ state, title, handler }) => {
  const variant = state ? 'contained' : 'outlined'
  const onClickHandler = () => handler(title)

  return (
    <Button variant={variant} onClick={onClickHandler} >
      {title}
    </Button>
  )
}