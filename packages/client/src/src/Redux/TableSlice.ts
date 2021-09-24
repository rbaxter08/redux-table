import {
  createTableSlice,
  tableFiltersPlugin,
  baseTablePlugin,
} from 'redux-table';
import { Person } from '../MockDataService';

const [tableSlice, filterSlice] = createTableSlice(
  'mySlice',
  baseTablePlugin({
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
  }),
  tableFiltersPlugin({
    filters: [],
  }),
);

export const { onDataLoad } = tableSlice.actions;
export const { onClearFilters, onColumnFilterChange } = filterSlice.actions;

export { tableSlice, filterSlice };
