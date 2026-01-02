/* eslint-disable react/prop-types */
import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../style.css';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { Tooltip } from '@mui/material';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    // color: theme.palette.secondary.main,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
    marginLeft: '8px !important',
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const CustomTable = ({
  colsData = [],
  rowsData = [],
  clickable = [],
  custComp = [],
  CustomComponent,
  dates = [],
}) => {
  //   const { t } = useTranslation("translations");

  const [sortBy, setSortBy] = useState('');
  const [sortDirection, setSortDirection] = useState('asc');
  const [hoveredColumn, setHoveredColumn] = useState(null);

  const handleSort = (col) => {
    const colConfig = colsData.find((column) => column.col === col);
    if (colConfig && colConfig.sortable) {
      if (sortBy === col) {
        setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
      } else {
        setSortBy(col);
        setSortDirection('asc');
      }
    }
  };

  return (
    <TableContainer
      component={Paper}
      sx={{
        overflow: 'auto',
      }}
    >
      <Table
        aria-label="customized table"
        sx={{
          minWidth: '90vw',
        }}
      >
        <TableHead>
          <TableRow>
            {colsData.map((colConfig, index) => {
              const { col, name, sortable } = colConfig;
              const isSortable = sortable === true; // Make sure it's explicitly set to true
              const isAscendingSort = sortDirection === 'asc';

              return (
                <StyledTableCell
                  key={index}
                  className={`table-styles ${isSortable ? 'sortable' : ''}`}
                  onClick={() => (isSortable ? handleSort(col) : null)}
                  style={{ cursor: isSortable ? 'pointer' : 'default' }}
                  onMouseOver={() => {
                    setHoveredColumn(col);
                  }}
                  onMouseLeave={() => setHoveredColumn(null)}
                >
                  {name}
                  {isSortable && (
                    <span className="arrow-icons">
                      {isAscendingSort ? (
                        <ArrowUpwardIcon
                          style={{
                            display: hoveredColumn === col ? 'inline' : 'none',
                            height: '12px',
                          }}
                        />
                      ) : (
                        <ArrowDownwardIcon
                          style={{
                            display: hoveredColumn === col ? 'inline' : 'none',
                            top: '5px',
                            height: '12px',
                          }}
                        />
                      )}
                    </span>
                  )}
                </StyledTableCell>
              );
            })}
          </TableRow>
        </TableHead>

        <TableBody className="ml-4">
          {rowsData
            ?.slice()
            .sort((a, b) => {
              const multiplier = sortDirection === 'asc' ? 1 : -1;
              const aValue = String(a[sortBy]).toLowerCase(); // Convert to lowercase for case-insensitive comparison
              const bValue = String(b[sortBy]).toLowerCase();

              return aValue.localeCompare(bValue) * multiplier;
            })
            .map((row, index) => {
              return (
                <StyledTableRow
                  className="ml-4"
                  key={index}
                  sx={{ marginLeft: '10px' }}
                >
                  {colsData.map((col) => {
                    const isClickable = clickable.find(
                      (d) => col.col === d.col
                    );
                    const isCustComp = custComp.find((d) => col.col === d.col);
                    const CustomComp = CustomComponent
                      ? CustomComponent[col.col]
                      : '00';
                    let column = row[col.col];

                    if (dates.includes(col.col)) {
                      column = column
                        ? new Date(column * 1).toDateString()
                        : '';
                    }

                    return (
                      <StyledTableCell key={col.col} className="point py-2">
                        <Tooltip title={row.toolTip ? row.toolTip : ''}>
                          {isClickable ? (
                            <div>
                              <Link
                                className="applicantId_link"
                                to={{
                                  pathname:
                                    isClickable.link +
                                    (isClickable?.params ? column : ''),
                                  state: {
                                    data: isClickable
                                      ? {
                                          [isClickable?.col]:
                                            row[isClickable?.col],
                                        }
                                      : row,
                                  },
                                }}
                                state={{
                                  data: isClickable
                                    ? {
                                        [isClickable?.col]:
                                          row[isClickable?.col],
                                        [isClickable?.other]:
                                          row[isClickable?.other],
                                      }
                                    : row,
                                }}
                              >
                                {column}
                              </Link>
                            </div>
                          ) : isCustComp ? (
                            <CustomComp col={column} row={row} />
                          ) : column || column === 0 ? (
                            column
                          ) : (
                            row?.process?.length || '0'
                          )}
                        </Tooltip>
                      </StyledTableCell>
                    );
                  })}
                </StyledTableRow>
              );
            })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CustomTable;
