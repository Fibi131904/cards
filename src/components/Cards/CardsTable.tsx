import Table from '@mui/material/Table'
import BorderColorIcon from '@mui/icons-material/BorderColor';
import TableContainer from '@mui/material/TableContainer'
import TableRow from '@mui/material/TableRow'
import {IconButton, Paper, Rating, TableBody, TableCell, TableHead} from '@mui/material';
import React from 'react'
import { useAppSelector } from '../../redux/redux-store';
import DeleteIcon from '@material-ui/icons/Delete';

export const CardsTable=()=>{
  const status = useAppSelector((state) => state.app.status)
  const cards = useAppSelector(state => state.cards.cards)
 
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{minWidth: 400}} aria-label="simple table" >
          <TableHead>
            <TableRow>
              <TableCell> Question</TableCell>
              <TableCell align="center">Answer</TableCell>
              <TableCell align="center">Grade</TableCell>
              <TableCell align="center">Updated</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cards.length
              ? status !== 'loading' &&
                cards?.map((card) => (
                  <TableRow key={card._id}>
                    <TableCell component="th" scope="row">
                      {card.question}
                    </TableCell>
                    <TableCell align="center">{card.answer}</TableCell>
                    <TableCell align="center">{card.grade}</TableCell>
                    <TableCell align="center">{card.updated}</TableCell>
                    <TableCell>
                 
                    <BorderColorIcon fontSize="small" color='primary' />
                      <IconButton aria-label="delete">
                        <DeleteIcon fontSize="small"/>                       
                      </IconButton>                       
                    </TableCell>
                  </TableRow>
                ))
              : status !== 'loading' && (
                  <TableRow>
                    <TableCell>{'NO CARDS FOUND'}</TableCell>
                  </TableRow>
                )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )

}