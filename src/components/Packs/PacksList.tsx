import React, { useState } from 'react'
import { SuperDoubleRange } from '../../common/SuperDoubleRange/SuperDoubleRange'
import s from './PacksList.module.css'
import { PacksTable } from './PacksTable'

export const PacksList = () => {
  const [value1, setValue1] = useState(0)
  const [value2, setValue2] = useState(100)
  const onChangeRange2 = (value: [number, number]) => {
    setValue1(value[0])
    setValue2(value[1])
  }
  return (
    <div>
      <div>
        <button> Add new pack </button>
        <div className={s.headerBlock}>
          <div className={s.search}>Search</div>
          <div className={s.search2}>
            <div>show packs cards</div>
            <button>My</button>
            <button>All</button>
          </div>

          <div className={s.search3}>
            <div>number of cards</div>
            <div className={s.superDoubleRange}>
              <span>{value1}</span>
              <SuperDoubleRange
                onChangeRange2={onChangeRange2}
                value={[value1, value2]}
              />
              <div className={s.divValue2}>{value2}</div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div>Table</div>
       
      </div>
     < PacksTable/>
    </div>
  )
}
