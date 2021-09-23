import { combineReducers } from 'redux';
import { baseTablePlugin, TableState } from './utilitySlices/createTableSlice';
import { PluginInstantiator, TableSlice } from './utilitySlices/types';

// type PluginList<T extends any[]> = [...T];

// interface Props<D, P> {
//   name: string;
//   plugins?: P[];
//   initialState?: Partial<TableState<D>>;
//   selectSelf?: (state: TableState<D>) => TableState<D>;
// }

// export function createTableSlice<DataType, Plugins extends any[]>({
//   name,
//   plugins = [],
//   initialState = {},
//   selectSelf = (state: TableState<DataType>) => state,
// }: Props<DataType, PluginList<Plugins>>) {
//   const sliceFactories = [baseTablePlugin(name, { initialState }), ...plugins];

//   const slices = sliceFactories.map(([slice, initArgs]) => {
//     return slice(name, { selectSelf, ...initArgs });
//   });

//   const reducedSlice = slices.reduce(
//     (accum, curr) => ({
//       rootReducer: {
//         ...accum.rootReducer,
//         [curr.slice.name]: curr.slice.reducer,
//       },
//       // @ts-ignore
//       selectors: { ...accum.selectors, ...curr.selectors },
//       actions: { ...accum.actions, ...curr.slice.actions },
//     }),
//     { rootReducer: {}, selectors: {}, actions: {} },
//   );

//   return plugins;
// }

interface Props {
  name: string;
  plugins: PluginInstantiator[];
}

export function createTableSlice({ name, plugins }: Props) {
  const slicePlugins = [baseTablePlugin({}), ...plugins];

  const tableSlice = slicePlugins.reduce(
    (accum, plugin) => {
      const { slice } = plugin(name);
      return {
        ...accum,
        reducers: { ...accum.reducers, [slice.name]: slice.reducer },
        actions: { ...accum.actions, ...slice.actions },
      };
    },
    { reducers: {}, actions: {} },
  );

  return {
    rootReducer: combineReducers(tableSlice.reducers),
    actions: tableSlice.actions,
  };
}
