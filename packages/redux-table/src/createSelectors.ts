import { createSelector } from '@reduxjs/toolkit';
import { ColumnFilter } from './filterTypes';

export interface Row<T> {
  id: string;
  item: T;
}

export interface Column<T> {
  accessor: keyof T;
}

export interface TableState<T, F> {
  data: T[];
  filters: ColumnFilter<T, F>[];
  columns: Column<T>[];
  config: boolean;
}

export function createSelectors<T, F>(
  selectSelf: (state: TableState<T, F>) => TableState<T, F>,
  getRowId: (item: T) => string,
  filterTypes: F,
) {
  const selectFilters = createSelector(selectSelf, (state) => {
    return state.filters;
  });

  const selectColumns = createSelector(selectSelf, (state) => {
    return state.columns;
  });

  const selectData = createSelector(selectSelf, (state) => {
    return state.data;
  });

  const selectSortedRows = createSelector(selectData, (data) => {
    return [...data].sort();
  });

  const selectFilteredRows = createSelector(
    selectSortedRows,
    selectColumns,
    selectFilters,
    (data, columns, filters) => {
      return data.filter((item) =>
        filters.every((filter) => {
          const column = columns.find(
            (column) => column.accessor === filter.columnId,
          );
          if (column) {
            const itemValue = item[column.accessor];
            const filterFunc = filterTypes[filter.operator];
            // @ts-ignore
            return filterFunc(itemValue, filter.value);
          }
          return true;
        }),
      );
    },
  );

  const selectConfig = createSelector(selectSelf, (state) => {
    return state.config;
  });

  const selectPaginatedRows = createSelector(
    [selectFilteredRows, selectConfig],
    (data, config) => {
      let start = 0;
      let end = config ? 15 : 30;
      const pageRows = data.slice(start, end);
      return pageRows;
    },
  );

  const selectRows = createSelector(selectPaginatedRows, (data) => {
    return data.map((item) => ({ id: getRowId(item), item }));
  });

  return {
    selectData,
    selectRows,
    selectColumns,
  };
}
