export default undefined;
// import { createSelector } from '@reduxjs/toolkit';

// export interface Row<T> {
//   id: string;
//   item: T;
// }

// export function createSelectors<T>(
//   selectSelf: (state: TableState<T>) => TableState<T>,
// ) {
//   const selectColumns = createSelector(selectSelf, (state) => {
//     return state.columns;
//   });

//   const selectData = createSelector(selectSelf, (state) => {
//     return state.data;
//   });

//   const selectSortedRows = createSelector(selectData, (data) => {
//     return [...data].sort();
//   });

//   const selectPaginatedRows = createSelector([selectSortedRows], (data) => {
//     let start = 0;
//     let end = 30;
//     const pageRows = data.slice(start, end);
//     return pageRows;
//   });

//   const selectRows = createSelector(selectPaginatedRows, (data) => {
//     return data.map((item, index) => ({ id: index, item }));
//   });

//   return {
//     selectData,
//     selectRows,
//     selectColumns,
//   };
// }
