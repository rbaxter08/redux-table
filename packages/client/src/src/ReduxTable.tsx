import React from 'react';
import { useDispatch } from 'react-redux';
import { Grid, Button, Typography } from '@material-ui/core';
import { useSelector } from './Redux';
import { asyncDataFetch } from './MockDataService';
import {
  onDataLoad,
  onColumnFilterChange,
  onClearFilters,
} from './Redux/TableSlice';

export function ReduxTable() {
  const dispatch = useDispatch();
  const rows = useSelector((state) => state.table.data);
  const columns = useSelector((state) => state.table.columns);

  React.useEffect(() => {
    async function fetchData() {
      const { data } = await asyncDataFetch();
      dispatch(onDataLoad(data));
    }
    fetchData();
  }, [dispatch]);

  return (
    <Grid container>
      <Grid item xs={12} container>
        {columns.map((column: any) => {
          return (
            <Grid item xs={2} key={column.accessor}>
              <Typography variant="h5">{column.accessor}</Typography>
            </Grid>
          );
        })}
      </Grid>
      {rows.slice(15).map((d: any) => (
        <Grid
          key={d.id}
          item
          container
          xs={12}
          style={{ border: '1px solid #eaeaea' }}
        >
          {columns.map((column: any) => {
            return (
              <Grid key={column.accessor} item xs={2}>
                {d[column.accessor]}
              </Grid>
            );
          })}
        </Grid>
      ))}
      <Button
        onClick={() =>
          dispatch(
            onColumnFilterChange({
              columnId: 'age',
              operator: 'lt',
              value: 20,
            }),
          )
        }
      >
        Apply Filter
      </Button>
      <Button onClick={() => dispatch(onClearFilters())}>Clear Filter</Button>
    </Grid>
  );
}
