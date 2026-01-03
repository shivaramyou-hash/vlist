import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Paper from '@mui/material/Paper';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { visuallyHidden } from '@mui/utils';
import { stableSort } from '@/utils/votersTable/votersTableUtill';
import { HrmBlackBtn } from '@/components/Button/Buttons';

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

const headCells = [
  { id: 'EPIC', numeric: false, disablePadding: true, label: 'EPIC' },
  { id: 'SLNo', numeric: true, disablePadding: false, label: 'SL No' },
  { id: 'voterName', numeric: true, disablePadding: false, label: 'Voter Name' },
  { id: 'age', numeric: true, disablePadding: false, label: 'Age' },
  { id: 'gender', numeric: true, disablePadding: false, label: 'Gender' },
  { id: 'houseNumber', numeric: true, disablePadding: false, label: 'House Number' },
  // { id: 'address', numeric: true, disablePadding: false, label: 'Address' },
  // { id: 'mobileNumber', numeric: true, disablePadding: false, label: 'Mobile Number' },
  // { id: 'status', numeric: true, disablePadding: false, label: 'Status' },
  // { id: 'notes', numeric: true, disablePadding: false, label: 'Notes' },
  { id: 'actions', label: 'Actions' },
];

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow sx={{ backgroundColor: '#1e40af' }}>
        {headCells.map((headCell, index) => (
          <TableCell
            key={index}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
            sx={{ pl: 2, color: 'white', fontWeight: 'bold' }}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
              sx={{
                '&.MuiTableSortLabel-root': { color: 'white' },
                '&.MuiTableSortLabel-root:hover': { color: '#e0e7ff' },
                '&.Mui-active': { color: 'white' },
                '& .MuiTableSortLabel-icon': { color: 'white !important' },
              }}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

EnhancedTable.propTypes = {
  votersList: PropTypes.any,
  handleEditVoter: PropTypes.func, // Changed prop name to be clearer
};

export default function EnhancedTable({ votersList, handleEditVoter }) {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('SLNo');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(200);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  const emptyRows =
    page > 0
      ? Math.max(
          0,
          (1 + page) * rowsPerPage - (votersList?.voters?.length || 0)
        )
      : 0;

  return (
    <Box sx={{ width: '100%' }}>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
      <div className="w-full overflow-x-auto mb-4">
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={() => {}}
              onRequestSort={handleRequestSort}
              rowCount={votersList?.voters?.length || 0}
            />
            <TableBody>
              {stableSort(votersList?.voters, getComparator(order, orderBy))
                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.id)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id}
                      selected={isItemSelected}
                      sx={{ cursor: 'pointer', '&:hover': { backgroundColor: '#f0f9ff !important' } }}
                    >
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                        sx={{ pl: 2 }}
                      >
                        {row.EPIC}
                      </TableCell>
                      <TableCell align="right">{row.SLNo}</TableCell>
                      <TableCell align="right">{row.voterName || '-'}</TableCell>
                      <TableCell align="right">{row.age || '-'}</TableCell>
                      <TableCell align="right">{row.gender || '-'}</TableCell>
                      <TableCell align="right">{row.houseNumber || '-'}</TableCell>
                      {/* <TableCell align="right">{row.address || '-'}</TableCell> */}
                      {/* <TableCell align="right">{row.mobileNumber || '-'}</TableCell> */}
                      {/* <TableCell align="right">{row.status || '-'}</TableCell> */}
                      {/* <TableCell align="right">{row.notes || '-'}</TableCell> */}
                      
                      <TableCell className="payroll-table-val-align">
                        {votersList?.writeAccess && (
                           <HrmBlackBtn
                              onClick={(e) => {
                                e.stopPropagation(); // Prevent row click
                                handleEditVoter(row);
                              }}
                              label={'Edit'}
                            />
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[
            100, 200, 300, 400, 500, 600, 700, 800, 900, 1000,
          ]}
          component="div"
          count={votersList?.voters?.length || 0}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>
    </Box>
  );
}
