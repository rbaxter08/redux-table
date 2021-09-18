import {
  createSlice,
  PayloadAction,
  ValidateSliceCaseReducers,
  SliceCaseReducers,
} from '@reduxjs/toolkit';
import { createSelectors, TableState } from './createSelectors';
import { NumericFilter } from './filterTypes';

export const createTableSlice = <
  T,
  Reducers extends SliceCaseReducers<TableState<T>>
>({
  name,
  initialState,
  selectSelf = (state: TableState<T>) => state,
  userFilterTypes = {},
  getRowId,
  reducers = {} as ValidateSliceCaseReducers<TableState<T>, Reducers>,
}: {
  name: string;
  selectSelf?: (state: TableState<T>) => TableState<T>;
  getRowId: (item: T) => string;
  userFilterTypes: Object;
  initialState?: Partial<TableState<T>>;
  reducers?: ValidateSliceCaseReducers<TableState<T>, Reducers>;
}) => {
  return {
    slice: createSlice({
      name,
      initialState: {
        data: [],
        test: false,
        ...initialState,
      } as TableState<T>,
      reducers: {
        onClearFilters(state: TableState<T>) {
          state.columns.forEach((column) => {
            column.filter = undefined;
          });
        },
        onColumnFilterChange(
          state: TableState<T>,
          action: PayloadAction<{ columnId: string; filter: NumericFilter }>,
        ) {
          const column = state.columns.find(
            (column) => column.accessor === action.payload.columnId,
          );
          if (column) column.filter = action.payload.filter;
        },
        onDataLoad(state: TableState<T>, action: PayloadAction<T[]>) {
          state.data = action.payload;
        },
        ...reducers,
      },
    }),
    selectors: createSelectors(selectSelf, getRowId, userFilterTypes),
  };
};
