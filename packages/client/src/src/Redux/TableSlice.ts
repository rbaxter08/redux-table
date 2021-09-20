import { createTableSlice, createFilterTypes } from 'redux-table';
import { Person } from '../MockDataService';

const tableSlice = createTableSlice({
  name: 'my-table',
  getRowId: (item) => item.firstName,
  filterTypes: createFilterTypes({
    lt: (itemValue: number, currValue: number) => itemValue < currValue,
  }),
  initialState: {
    data: [] as Person[],
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
