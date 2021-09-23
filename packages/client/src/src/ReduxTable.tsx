import React from 'react';
import { useDispatch } from 'react-redux';
import { Grid, Typography } from '@material-ui/core';
import { useSelector } from './Redux';
import { asyncDataFetch } from './MockDataService';
// import { onDataLoad, selectData, selectColumns } from './Redux/TableSlice';

export function ReduxTable() {
  const dispatch = useDispatch();
  // const rows: any = useSelector(selectData);
  // const columns: any = useSelector(selectColumns);

  // console.log('columns', columns);
  // console.log('rows', rows);

  // React.useEffect(() => {
  //   async function fetchData() {
  //     const { data } = await asyncDataFetch();
  //     dispatch(onDataLoad(data));
  //   }
  //   fetchData();
  // }, [dispatch]);

  // console.log(columns);
  return (
    <Grid container>
      {/* <Grid item xs={12} container>
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
                {d.item[column.accessor]}
              </Grid>
            );
          })}
        </Grid>
      ))} */}
    </Grid>
  );
}
