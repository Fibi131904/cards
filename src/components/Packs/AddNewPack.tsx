import React from 'react'
import s from './AddNewPack.module.css'


export const AddNewPack = () => {
  return (
    <div >
      <div className={s.text}>This pack is empty. Click add new card to fill this pack</div>
      <button className={s.buttonAdd}>Add New card</button>
    </div>
  )
}