import { createTableSlice } from 'redux-table';
import { DataType } from '../MockDataService';

const tableSlice = createTableSlice({
  name: 'my-table',
  initialState: { data: [] as DataType[] },
});

export const { onDataLoad } = tableSlice.actions;
export default tableSlice;
