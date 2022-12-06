import React, { ChangeEvent, DetailedHTMLProps, InputHTMLAttributes } from 'react'

type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
type RangeInputProps = DefaultInputPropsType& {
  chagnedValue: (value: number) => void
  setFilterValue:()=> void
}

export const RangeInput:React.FC<RangeInputProps> = ({chagnedValue,setFilterValue, ...restProps}) => {
  const onChanged = (e: ChangeEvent<HTMLInputElement>) => {
    chagnedValue(+e.currentTarget.value)
}
const setValue = () => {
    setFilterValue()
}
  return(
<div>
  
<input type={'range'} onChange={onChanged} onMouseUp={setValue}   {...restProps}/>
</div>
  )
}