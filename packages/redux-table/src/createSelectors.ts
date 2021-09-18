import { createSelector } from '@reduxjs/toolkit';
import { filterTypes, NumericFilter } from './filterTypes';

export interface Row<T> {
  id: string;
  item: T;
}

export interface Column<T> {
  accessor: keyof T;
  filter?: NumericFilter;
}

export interface TableState<T> {
  data: T[];
  columns: Column<T>[];
  config: boolean;
}

export function createSelectors<T>(
  selectSelf: (state: TableState<T>) => TableState<T>,
  getRowId: (item: T) => string,
  userFilterTypes = {},
) {
  const consolidatedFilterTypes = { ...filterTypes, ...userFilterTypes };

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
    (data, columns) => {
      // if data item does not pass any of the filters applied to any of the columns
      // remove it
      return data.filter((item) =>
        columns.every((column) => {
          if (column.filter) {
            // @ts-ignore
            const itemValue: number = item[column.accessor];
            return consolidatedFilterTypes[column.filter.operator](
              itemValue,
              column.filter.value,
            );
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
