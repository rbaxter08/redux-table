import React from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from './Redux';
import { asyncDataFetch } from '../TableUtils';
import { onDataLoad } from './Redux/TableSlice';

export function ReduxTable() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.data);

  React.useEffect(() => {
    async function fetchData() {
      const { data } = await asyncDataFetch();
      dispatch(onDataLoad(data));
    }
    fetchData();
  }, [dispatch]);

  return (
    <div>
      {data.map((d) => (
        <div>{d.name}</div>
      ))}
    </div>
  );
}
