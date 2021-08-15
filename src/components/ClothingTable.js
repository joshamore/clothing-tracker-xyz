import React from 'react';
import dayjs from 'dayjs';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { getClothingTypeNameFromId } from '../helpers/utils';

const TableHeaderCell = styled(TableCell)`
  font-weight: bold;
`;

const ClothingTable = ({ clothingItems }) => {
  return (
    <TableContainer component={Paper}>
      <Table aria-label='clothing items table'>
        <TableHead>
          <TableRow>
            <TableHeaderCell>Name</TableHeaderCell>
            {/* <TableHeaderCell align='right'>Purchase Condition</TableHeaderCell> */}
            <TableHeaderCell align='right'>Purchase Date</TableHeaderCell>
            <TableHeaderCell align='right'>Clothing Type</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {clothingItems.map((row) => (
            <TableRow key={row.id}>
              <TableCell component='th' scope='row'>
                {row.name}
              </TableCell>
              <TableCell align='right' component='th' scope='row'>
                {row.purchase_condition.toUpperCase()}
              </TableCell>
              {/* <TableCell align='right' component='th' scope='row'>
                {dayjs(row.purchase_date).format('DD/MM/YYYY')}
              </TableCell> */}
              <TableCell align='right' component='th' scope='row'>
                {getClothingTypeNameFromId(row.clothing_type)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

ClothingTable.propTypes = {
  clothingItems: PropTypes.array.isRequired,
};

export default ClothingTable;
