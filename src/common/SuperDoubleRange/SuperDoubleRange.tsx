import Box from '@mui/material/Box'
import Slider, { SliderProps } from '@mui/material/Slider'
import React from 'react'

export const SuperDoubleRange: React.FC<SliderProps> = ({ ...restProps }) => {
  return (
    <Box sx={{ width: 300 }}>
      <Slider
        color={'primary'}
        valueLabelDisplay="on"
        disableSwap
        {...restProps}
      />
    </Box>
  )
}
