import React from 'react'
import s from './HeaderTable.module.css'
import { useAppSelector } from '../../../redux/redux-store';
import { TableRow } from '../TableRow';



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
              {cardPacks.map((el) => <TableRow
                    id={el._id}
                    key={el._id}
                    name={el.name}
                    countCard={el.cardsCount}
                    created={el.created.slice(0, 10)}
                    rating={el.rating}
                    grade={el.grade}
                />)}
          </div>
      </div>

  );
};