import React, { useState, useEffect } from 'react';
import CustomTable from './customTable';
import Pagination from '@mui/material/Pagination';
import '../style.css';

const PaginationTable = ({
  rowsData,
  colsData,
  clickable,
  dates,
  isCustom,
  CustomComponent,
  activeEmpLength,
  inactiveEmpLength,
  abscondedEmpLength,
  value,
  countToShow,
}) => {
  const [offset, setOffset] = useState(1);
  const [data, setData] = useState([]);
  const [perPage] = useState(countToShow ? countToShow : 20);
  const [pageCount, setPageCount] = useState(0);
  const handlePageClick = (e, value) => {
    setOffset(value);
  };

  useEffect(() => {
    const getData = async () => {
      const dataRow = rowsData ? [...rowsData] : [];
      const slice = dataRow.slice(perPage * (offset - 1), offset * perPage);
      setData(slice);
      setPageCount(Math.ceil(dataRow.length / perPage));
    };
    getData();
  }, [rowsData, perPage, offset]);
  return (
    <div>
      {isCustom ? (
        <CustomComponent
          data={data}
          activeEmpLength={activeEmpLength}
          abscondedEmpLength={abscondedEmpLength}
          inactiveEmpLength={inactiveEmpLength}
          value={value}
        />
      ) : (
        <CustomTable
          colsData={colsData}
          rowsData={data}
          clickable={clickable}
          dates={dates}
        />
      )}
      <div className="pagination">
        <Pagination
          count={pageCount}
          variant="outlined"
          shape="rounded"
          onChange={handlePageClick}
          page={offset}
        />
      </div>
    </div>
  );
};

export default PaginationTable;
