import { createTableSlice, tableFiltersPlugin } from 'redux-table';
import { Person } from '../MockDataService';

const tableSlice = createTableSlice({
  name: 'mySlice',
  plugins: [
    tableFiltersPlugin({
      initialState: { filters: [{ columnId: '1', operator: 'eq', value: 0 }] },
    }),
  ],
});

const {} = tableSlice.actions;

export default tableSlice.rootReducer;

// const tableSlice = createTableSlice({
//   name: 'table-demo',
//   plugins: [
//     tableFiltersPlugin({
//       initialState: { filters: [{ columnId: '1', operator: 'eq', value: 0 }] },
//     }),
//   ],
//   initialState: {
//     data: [] as Person[],
//     columns: [
//       {
//         accessor: 'firstName',
//       },
//       {
//         accessor: 'lastName',
//       },
//       {
//         accessor: 'age',
//       },
//       {
//         accessor: 'visits',
//       },
//       {
//         accessor: 'progress',
//       },
//       {
//         accessor: 'status',
//       },
//     ],
//   },
// });

// // @ts-ignore
// export const { onDataLoad } = tableSlice.actions;

// // @ts-ignore
// export const { selectData, selectColumns } = tableSlice.selectors;
