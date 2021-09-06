import { useRecoilValue, useSetRecoilState } from 'recoil';
import { act } from '@testing-library/react-hooks';
import { renderRecoilHook, MOCK_COLUMNS, MockDataType } from '../testHelpers';
import { useTable } from '../../index';

describe('Columns', () => {
  test('Should return full column info', () => {
    const { result } = renderRecoilHook(() => {
      const tableInstance = useTable<MockDataType>('test-table');
      const setColumns = useSetRecoilState(tableInstance.columnAtom);
      const fullColumns = useRecoilValue(tableInstance.selectColumns);
      const setColumnVisibility = useSetRecoilState(
        tableInstance.columnVisibilityState(`col1`),
      );
      return { setColumns, fullColumns, setColumnVisibility };
    });

    act(() => {
      result.current.setColumns(MOCK_COLUMNS);
    });

    expect(result.current.fullColumns).toMatchObject([
      {
        Header: 'foo',
        accessor: 'col1',
        isSorted: false,
        isDesc: false,
        visible: true,
      },
      {
        Header: 'bar',
        accessor: 'col2',
        isSorted: false,
        isDesc: false,
        visible: true,
      },
      {
        Header: 'baz',
        accessor: 'col3',
        isSorted: false,
        isDesc: false,
        visible: true,
      },
    ]);

    act(() => {
      result.current.setColumnVisibility(false);
    });

    expect(result.current.fullColumns).toMatchObject([
      {
        Header: 'foo',
        accessor: 'col1',
        isSorted: false,
        isDesc: false,
        visible: false,
      },
      {
        Header: 'bar',
        accessor: 'col2',
        isSorted: false,
        isDesc: false,
        visible: true,
      },
      {
        Header: 'baz',
        accessor: 'col3',
        isSorted: false,
        isDesc: false,
        visible: true,
      },
    ]);
  });
});
