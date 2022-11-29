import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Paper from '@material-ui/core/Paper';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import React from 'react'
import { useAppSelector } from '../../redux/redux-store';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import SchoolIcon from '@mui/icons-material/School';




export const PacksTable=()=>{
   const packs = useAppSelector(state => state.packs.cardPacks)
    // const userId = useAppSelector(state => state.profile._id)
    const status = useAppSelector((state) => state.app.status)

  const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });
 
 
  
 
  const classes = useStyles();
  return (
    <>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell> Name </TableCell>
              <TableCell align="center">Cards</TableCell>
              <TableCell align="center">LastUpdated</TableCell>
              <TableCell align="center">createdBy</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {packs.length
              ? status !== 'loading' &&
                packs?.map((pack) => (
                  <TableRow key={pack._id}>
                    <TableCell component="th" scope="row">
                      {pack.name}
                    </TableCell>
                    <TableCell align="center">{pack.cardsCount}</TableCell>
                    <TableCell align="center">{pack.user_name}</TableCell>
                    <TableCell align="center">{pack.updated}</TableCell>
                    <TableCell>
                    <SchoolIcon fontSize="small" color='primary' />
                    <BorderColorIcon fontSize="small" color='primary'/>
                      <IconButton aria-label="delete">
                        <DeleteIcon fontSize="small" />                       
                      </IconButton>                       
                    </TableCell>
                  </TableRow>
                ))
              : status !== 'loading' && (
                  <TableRow>
                    <TableCell>{'NO PACKS FOUND'}</TableCell>
                  </TableRow>
                )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}