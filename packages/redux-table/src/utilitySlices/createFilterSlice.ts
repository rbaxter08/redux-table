import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit';
import { TableSlice, TablePlugin } from './types';

interface ColumnFilter {
  columnId: string;
  operator: string;
  value: string | number;
}

interface FilterState {
  filters: ColumnFilter[];
}

export interface FilterSliceProps {
  initialState?: Partial<FilterState>;
}

const defaultInitialState: FilterState = {
  filters: [],
};

const namePostFix = '@ReduxTableFilters';

type TableFilterSlice = ReturnType<typeof createFilterSlice>;

export function createFilterSlice(
  name: string,
  { initialState }: FilterSliceProps,
): TableSlice {
  const slice = createSlice({
    name: `${namePostFix}-${name}`,
    initialState: {
      ...defaultInitialState,
      ...initialState,
    },
    reducers: {
      onClearFilters(state) {
        state.filters = [];
      },
      onColumnFilterChange(state, action: PayloadAction<ColumnFilter>) {
        const filterIndex = state.filters.findIndex(
          (filter) => filter.columnId === action.payload.columnId,
        );
        if (filterIndex >= 0) {
          state.filters[filterIndex] = action.payload;
        } else {
          state.filters.push(action.payload);
        }
      },
    },
  });

  return {
    slice,
  };
}

export const tableFiltersPlugin: TablePlugin<FilterSliceProps> = (props) => {
  return (name) => createFilterSlice(name, props);
};
