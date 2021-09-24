import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TablePlugin } from './types';

interface ColumnFilter {
  columnId: string;
  operator: string;
  value: string | number;
}

interface FilterState {
  filters: ColumnFilter[];
}

const defaultInitialState: FilterState = {
  filters: [],
};

type FilterSlice = ReturnType<typeof createFilterSlice>;

const slicePrefix = '@ReduxTableFilters';

function createFilterSlice(name: string, initialState: FilterState) {
  return createSlice({
    name: `${slicePrefix}-${name}`,
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
}

export function tableFiltersPlugin(
  initialState: FilterState,
): TablePlugin<FilterSlice> {
  return (name) => createFilterSlice(name, initialState);
}
