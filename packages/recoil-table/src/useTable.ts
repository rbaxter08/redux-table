import React from 'react';
import { RecoilState, RecoilValueReadOnly, useSetRecoilState } from 'recoil';
import {
  columnState,
  columnSortState,
  columnVisibilityState,
  dataState,
  rowSelectionState,
  ColumnSortState,
  Page,
  Sort,
  Column,
  tableOptionsState,
  TableOptions,
} from './atoms';
import {
  pageState,
  selectRows,
  selectSelectedRows,
  selectSort,
  selectColumns,
} from './selectors';

export interface TableInstance<T> {
  columnAtom: RecoilState<Column<T>[]>;
  columnSortState: (columnId: string) => RecoilState<ColumnSortState>;
  dataAtom: RecoilState<T[]>;
  pageAtom: RecoilState<Page>;
  selectRows: RecoilValueReadOnly<T[]>;
  selectSelectedRows: RecoilState<Record<string, boolean>>;
  rowSelectionState: (rowId: string) => RecoilState<boolean>;
  selectSort: RecoilState<Sort>;
  tableOptionsState: RecoilState<TableOptions>;
  selectColumns: RecoilValueReadOnly<Column<T>[]>;
  columnVisibilityState: (columnId: string) => RecoilState<boolean>;
}

export function useTable<T>(
  tableKey: string,
  options: TableOptions = {},
): TableInstance<T> {
  const setConfig = useSetRecoilState(tableOptionsState(tableKey));
  React.useEffect(() => {
    setConfig(options);
  }, []);

  return React.useMemo(
    () => ({
      columnAtom: columnState(tableKey),
      columnSortState: (columnId: string) =>
        columnSortState(`${tableKey}-${columnId}`),
      dataAtom: dataState(tableKey),
      pageAtom: pageState(tableKey),
      selectRows: selectRows(tableKey),
      selectSelectedRows: selectSelectedRows(tableKey),
      rowSelectionState: (rowId: string) =>
        rowSelectionState(`${tableKey}-${rowId}`),
      selectSort: selectSort(tableKey),
      tableOptionsState: tableOptionsState(tableKey),
      selectColumns: selectColumns(tableKey),
      columnVisibilityState: (columnId: string) =>
        columnVisibilityState(`${tableKey}-${columnId}`),
    }),
    [tableKey, options],
  );
}

// dataAtom

// columnsAtom

// selectColumnById
// - columnSortState
// - columnVisibilityState

// columnSortState
// columnVisibilityState
