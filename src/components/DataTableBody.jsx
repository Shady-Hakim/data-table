import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { stableSort } from '../functions';
import DataTableHead from '../components/DataTableHead';
import { selectAllData } from '../redux/data/tableSlice';

const headCells = [
  {
    id: 'logId',
    label: 'Log ID',
  },
  {
    id: 'applicationType',
    label: 'Application Type',
  },
  {
    id: 'applicationId',
    label: 'Application ID',
  },
  {
    id: 'action',
    label: 'Action',
  },
  {
    id: 'actionDetails',
    label: 'Action Details',
  },
  {
    id: 'creationTimestamp',
    label: 'Date : Time',
  },
];

function DataTableBody({ search }) {
  const data = useSelector(selectAllData);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('applicationType');
  const [page, setPage] = useState(0);
  const searchIsEmpty = !Object.values(search).join('').length;
  const rowsPerPage = 10;

  const searchResults = data?.filter((item) => {
    if (
      item?.actionType
        ?.toString()
        .toLowerCase()
        .includes(search.actionType?.toString().toLowerCase()) &&
      item?.applicationType
        ?.toString()
        .toLowerCase()
        .includes(search.applicationType?.toString().toLowerCase()) &&
      item?.applicationId
        ?.toString()
        .toLowerCase()
        .includes(search.applicationId?.toString().toLowerCase()) &&
      search.fromDate < item.creationTimestamp &&
      search.toDate > item.creationTimestamp
    )
      return true;
  });

  const sortedData = stableSort(
    searchIsEmpty ? data : searchResults,
    order,
    orderBy
  ).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  console.log('search', Object.values(search).join('').length);

  return (
    <>
      <TableContainer>
        <Table
          sx={{ minWidth: 750 }}
          aria-labelledby='tableTitle'
          size='medium'
        >
          <DataTableHead
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
            headCells={headCells}
          />
          <TableBody>
            {sortedData.map((item, index) => {
              const labelId = `enhanced-table-checkbox-${index}`;

              return (
                <TableRow hover role='checkbox' tabIndex={-1} key={item.logId}>
                  <TableCell component='th' id={labelId}>
                    {item.logId}
                  </TableCell>
                  <TableCell>
                    {item?.applicationType?.length &&
                      item?.applicationType.charAt(0).toUpperCase() +
                        item?.applicationType
                          ?.slice(1)
                          .toLowerCase()
                          .replaceAll('_', ' ')}
                  </TableCell>

                  <TableCell>{item.applicationId}</TableCell>
                  <TableCell>
                    {item?.actionType?.length &&
                      item?.actionType.charAt(0).toUpperCase() +
                        item?.actionType
                          ?.slice(1)
                          .toLowerCase()
                          .replaceAll('_', ' ')}
                  </TableCell>
                  <TableCell>{item.actionDetails}</TableCell>
                  <TableCell>
                    {item.creationTimestamp.replace(' ', ' / ')}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[rowsPerPage]}
        component='div'
        count={searchIsEmpty ? data.length : searchResults.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
      />
    </>
  );
}
export default DataTableBody;
