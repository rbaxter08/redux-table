import {
  TypedUseSelectorHook,
  useSelector as REDUXuseSelector,
} from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { tableSlice, filterSlice } from './TableSlice';

export const store = configureStore({
  reducer: {
    table: tableSlice.reducer,
    filter: filterSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export const useSelector: TypedUseSelectorHook<RootState> = REDUXuseSelector;
