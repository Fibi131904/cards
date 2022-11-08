import React, { ChangeEvent } from 'react';
import { useState } from 'react';
import { Button } from '../common/button/Button';
import { Checkbox } from '../common/checkbox/Checkbokx';
import InputText from '../common/input/InputText';





export function Test() {
  
const [checked, setChecked] = useState<boolean>(false)
const [text, setText] = useState<string>('')
const testOnChange = (e: ChangeEvent<HTMLInputElement>) => 
setChecked(e.currentTarget.checked)

  return (
    <div>
      <Button onClick={()=>{}} >click</Button> 
      <Checkbox checked={checked}  onChange={testOnChange}/>
      <InputText onChangeText={setText} value={text}/>
    </div>
  )
}
  