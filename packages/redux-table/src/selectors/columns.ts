import { selectorFamily } from 'recoil';
import { ReadOnlySelectorFamily } from '../helpers';
import {
  Column,
  columnState,
  columnVisibilityState,
  columnSortState,
} from '../atoms/columns';

export const selectColumns: ReadOnlySelectorFamily = selectorFamily<
  any,
  string
>({
  key: 'recoil-table-select-columns',
  get: (tableKey) => ({ get }) => {
    const columns = get(columnState<Column<any>[]>(tableKey));
    return columns.map((column) => {
      const sortState = get(columnSortState(`${tableKey}-${column.accessor}`));
      const visible = get(
        columnVisibilityState(`${tableKey}-${column.accessor}`),
      );
      return {
        ...column,
        ...sortState,
        visible,
      };
    });
  },
});
