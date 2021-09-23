import { Slice } from '@reduxjs/toolkit';
export type TableSlice = {
  slice: Slice;
};
export type PluginInstantiator = (name: string) => TableSlice;
export type TablePlugin<T> = (props: T) => PluginInstantiator;
