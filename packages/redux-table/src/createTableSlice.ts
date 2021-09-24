import { baseTablePlugin, TableState } from './utilitySlices/createTableSlice';

import { PluginArray, TablePlugin } from './utilitySlices/types';

export function createTableSlice<T extends ReadonlyArray<TablePlugin<any>>>(
  name: string,
  ...plugins: T
): PluginArray<T> {
  return plugins.map((plugin) => plugin(name)) as any;
}

export type Type<T> = [T, boolean];
