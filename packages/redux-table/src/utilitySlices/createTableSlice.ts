import {
  createSlice,
  PayloadAction,
  ValidateSliceCaseReducers,
  SliceCaseReducers,
} from '@reduxjs/toolkit';

export interface Column<T> {
  accessor: keyof T;
}

export interface TableState<T> {
  data: T[];
  columns: Column<T>[];
}

const slicePrefix = '@ReduxTable';

// function createSelectors<T>(
//   name: string,
//   selectSelf: (state: TableState<T>) => TableState<T>,
// ) {
//   const selectColumns = createSelector(selectSelf, (state) => {
//     // @ts-ignore
//     return state[name].columns;
//   });

//   const selectData = createSelector(selectSelf, (state) => {
//     // @ts-ignore
//     return state[name].data.map((d, index) => ({ id: index, item: d }));
//   });

//   return {
//     selectColumns,
//     selectData,
//   };
// }

function createBaseTableSlice<
  T,
  Reducers extends SliceCaseReducers<TableState<T>>
>(name: string, initialState: TableState<T>) {
  return createSlice({
    name: `${slicePrefix}-${name}`,
    initialState,
    reducers: {
      onDataLoad(state: TableState<T>, action: PayloadAction<T[]>) {
        state.data = action.payload;
      },
      ...({} as ValidateSliceCaseReducers<TableState<T>, Reducers>),
    },
  });
}

export function baseTablePlugin<T>(initialState: TableState<T>) {
  return (name: string) => createBaseTableSlice(name, initialState);
}
