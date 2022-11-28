import { Box, Slider } from '@material-ui/core'
import React from 'react'


type SuperDoubleRangePropsType = {
  onChangeRange2: (value: [number, number]) => void
  value: [number, number]
}
export const SuperDoubleRange: React.FC<SuperDoubleRangePropsType> = (
  { onChangeRange2, value }) => {
 
  const onChangeCallback = (e: React.ChangeEvent<{}>, newValue: any) => {
    onChangeRange2(newValue);
  }
  return (
    <Box sx={{ width: 400 }}>
      <Slider
        getAriaLabel={() => 'Temperature range'}
        value={value}
        onChange={onChangeCallback}
        valueLabelDisplay="auto"

      />
    </Box>
  );
}