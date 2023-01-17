import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import DataTableToolbar from '../components/DataTableToolbar';
import DataTableBody from '../components/DataTableBody';
import { fetchData } from '../redux/data/tableSlice';
import useCustomSearchParams from '../hooks/useCustomSearchParams';

export default function HomePage() {
  const [search, setSearch] = useCustomSearchParams();

  const dataStatus = useSelector((state) => state.data.dataStatus);
  const dispatch = useDispatch();
  useEffect(() => {
    if (dataStatus === 'idle') {
      dispatch(fetchData());
    }
  }, [dataStatus, dispatch]);
  if (dataStatus === 'succeeded')
    return (
      <Box sx={{ width: '100%' }}>
        <Paper sx={{ width: '100%', mb: 2 }}>
          <DataTableToolbar setSearch={setSearch} />
          <DataTableBody search={search} />
        </Paper>
      </Box>
    );
}
