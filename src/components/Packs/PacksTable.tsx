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

export const PacksTable=()=>{
   const packs = useAppSelector(state => state.packs.cardPacks)
    const userId = useAppSelector(state => state.profile._id)
    
  const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });
 
  function createData(Name: string, Cards: number, LastUpdated: number, createdBy:number, Action: any) {
    return { Name, Cards, LastUpdated, createdBy, Action };
  }
  const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
  ];
 
  const classes = useStyles();
  return (
    <>
        <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell> Name </TableCell>
            <TableCell align="right">Cards</TableCell>
            <TableCell align="right">LastUpdated</TableCell>
            <TableCell align="right">createdBy</TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.Name}>
              <TableCell component="th" scope="row">
                {row.Name}
              </TableCell>
              <TableCell align="right">{row.Cards}</TableCell>
              <TableCell align="right">{row.LastUpdated}</TableCell>
              <TableCell align="right">{row.createdBy}</TableCell>
              <TableCell align="right">{row.Action}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
 
    </>
  )
}
