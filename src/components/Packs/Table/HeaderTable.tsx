import React from 'react'
import s from './HeaderTable.module.css'
import { useAppSelector } from '../../../redux/redux-store';
import { TableRow } from './TableRow';



export const HeaderTable = () => {

    const cardPacks = useAppSelector(state => state.packs.cardPacks)
   
  return (
      <div>
          <div>
              <div className={s.headerTable}>
                  <div>Name</div>
                  <div>CardsCount</div>
                  <div>Created</div>
                  <div>Rating</div>
                  <div>Actions</div>
              </div>
              {cardPacks.map((pack) => <TableRow
                    id={pack._id}
                    key={pack._id}
                    name={pack.name}
                    countCard={pack.cardsCount}
                    created={pack.created.slice(0, 10)}
                    rating={pack.rating}
                    grade={pack.grade}
                />)}
          </div>
      </div>

  );
};