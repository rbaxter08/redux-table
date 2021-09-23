import {
  createSlice,
  PayloadAction,
  ValidateSliceCaseReducers,
  SliceCaseReducers,
  createSelector,
} from '@reduxjs/toolkit';
import { TablePlugin } from './types';

export interface Column<T> {
  accessor: keyof T;
}

export interface TableState<T> {
  data: T[];
  columns: Column<T>[];
}

interface BaseSliceProps<T> {
  selectSelf?: (state: TableState<T>) => TableState<T>;
  initialState?: Partial<TableState<T>>;
}

type BaseTableSlice = ReturnType<typeof createBaseTableSlice>;

const namePostFix = '@ReduxTable';

export function createBaseTableSlice<
  T,
  Reducers extends SliceCaseReducers<TableState<T>>
>(name: string, props: BaseSliceProps<T>) {
  const { selectSelf, initialState } = props;

  // const selectors = createSelectors(`${namePostFix}-${name}`, selectSelf);
  const slice = createSlice({
    name: `${namePostFix}-${name}`,
    initialState: {
      data: [],
      columns: [],
      ...initialState,
    } as TableState<T>,
    reducers: {
      onDataLoad(state: TableState<T>, action: PayloadAction<T[]>) {
        state.data = action.payload;
      },
      ...({} as ValidateSliceCaseReducers<TableState<T>, Reducers>),
    },
  });

  return {
    // selectors,
    slice,
  };
}

function createSelectors<T>(
  name: string,
  selectSelf: (state: TableState<T>) => TableState<T>,
) {
  const selectColumns = createSelector(selectSelf, (state) => {
    // @ts-ignore
    return state[name].columns;
  });

  const selectData = createSelector(selectSelf, (state) => {
    // @ts-ignore
    return state[name].data.map((d, index) => ({ id: index, item: d }));
  });

  return {
    selectColumns,
    selectData,
  };
}

export const baseTablePlugin: TablePlugin<BaseSliceProps<any>> = <T>(
  props: BaseSliceProps<T>,
) => {
  return (name: string) => createBaseTableSlice(name, props);
};

export default createBaseTableSlice;
