import {
  TypedUseSelectorHook,
  useSelector as REDUXuseSelector,
} from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import tableReducer from './TableSlice';

export const store = configureStore({
  reducer: tableReducer,
});

export type RootState = ReturnType<typeof store.getState>;

export const useSelector: TypedUseSelectorHook<RootState> = REDUXuseSelector;
