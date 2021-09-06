import {
  createSlice,
  PayloadAction,
  ValidateSliceCaseReducers,
  SliceCaseReducers,
} from '@reduxjs/toolkit';

interface TableState<T> {
  data: T[];
}

export const createTableSlice = <
  T,
  Reducers extends SliceCaseReducers<TableState<T>>
>({
  name,
  initialState,
  reducers = {} as ValidateSliceCaseReducers<TableState<T>, Reducers>,
}: {
  name: string;
  initialState?: Partial<TableState<T>>;
  reducers?: ValidateSliceCaseReducers<TableState<T>, Reducers>;
}) => {
  return createSlice({
    name,
    initialState: {
      data: [],
      ...initialState,
    } as TableState<T>,
    reducers: {
      onDataLoad(state: TableState<T>, action: PayloadAction<T[]>) {
        state.data = action.payload;
      },
      ...reducers,
    },
  });
};
