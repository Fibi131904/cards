import React, { ChangeEvent, useState } from "react"
import InputText from "../input/InputText"


type SearchByNamePropsType = {
  searchName: (name: string) => void
}

export const SearchByName = (props: SearchByNamePropsType) => {
  const [findByName, setFindByName] = useState<string>('')
  const handleChangeFindName = (e: ChangeEvent<HTMLInputElement>) => setFindByName(e.currentTarget.value)
  const onEnterHandler = () => {
      const validate = findByName.trim()
      props.searchName(validate)
  }
  return (
      <>
      
          <InputText name={'SearchByName'} placeholder={'Search name (onEnter)'}
                          onEnter={onEnterHandler} onChange={handleChangeFindName}
                          style={{width: '300px'}} value={findByName}
          />
      </>
  );
}