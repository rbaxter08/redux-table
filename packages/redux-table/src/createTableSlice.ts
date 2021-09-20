import {
  createSlice,
  PayloadAction,
  ValidateSliceCaseReducers,
  SliceCaseReducers,
} from '@reduxjs/toolkit';
import { createSelectors, TableState } from './createSelectors';
import { ColumnFilter, createFilterTypes } from './filterTypes';

interface Props<DataType, F> {
  name: string;
  initialState?: Partial<TableState<DataType, F>>;
  selectSelf?: (state: TableState<DataType, F>) => TableState<DataType, F>;
  getRowId: (item: DataType) => string;
  filterTypes?: F;
}

export function createTableSlice<DataType, F>({
  name,
  initialState,
  selectSelf = (state: TableState<DataType, F>) => state,
  filterTypes = {} as F,
  getRowId,
}: Props<DataType, F>) {
  const consolidatedFilterTypes = createFilterTypes(filterTypes);
  const slice = createTableSliceHelper({ name, initialState });
  const selectors = createSelectors(
    selectSelf,
    getRowId,
    consolidatedFilterTypes,
  );
  return { slice, selectors };
}

const createTableSliceHelper = <
  T,
  F,
  Reducers extends SliceCaseReducers<TableState<T, F>>
>({
  name,
  initialState,
  reducers = {} as ValidateSliceCaseReducers<TableState<T, F>, Reducers>,
}: {
  name: string;
  initialState?: Partial<TableState<T, F>>;
  reducers?: ValidateSliceCaseReducers<TableState<T, F>, Reducers>;
}) => {
  return createSlice({
    name,
    initialState: {
      data: [],
      filters: [],
      test: false,
      ...initialState,
    } as TableState<T, F>,
    reducers: {
      onClearFilters(state: TableState<T, F>) {
        state.filters = [];
      },
      onColumnFilterChange(
        state: TableState<T, F>,
        action: PayloadAction<ColumnFilter<T, F>>,
      ) {
        const filterIndex = state.filters.findIndex(
          (filter) => filter.columnId === action.payload.columnId,
        );
        if (filterIndex >= 0) {
          state.filters[filterIndex] = action.payload;
        } else {
          state.filters.push(action.payload);
        }
      },
      onDataLoad(state: TableState<T, F>, action: PayloadAction<T[]>) {
        state.data = action.payload;
      },
      ...reducers,
    },
  });
};
