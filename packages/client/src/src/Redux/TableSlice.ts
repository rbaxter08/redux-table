import { createTableSlice } from 'redux-table';
import { DataType } from '../MockDataService';

const tableSlice = createTableSlice({
  getRowId: (item) => item.firstName,
  userFilterTypes: {
    lt: (itemValue: number, currValue: number) => itemValue < currValue,
  },
  name: 'my-table',
  initialState: {
    data: [] as DataType[],
    columns: [
      {
        accessor: 'firstName',
      },
      {
        accessor: 'lastName',
      },
      {
        accessor: 'age',
      },
      {
        accessor: 'visits',
      },
      {
        accessor: 'progress',
      },
      {
        accessor: 'status',
      },
    ],
  },
});

export const {
  onDataLoad,
  onColumnFilterChange,
  onClearFilters,
} = tableSlice.slice.actions;
export const { selectRows, selectColumns } = tableSlice.selectors;
export default tableSlice.slice;
