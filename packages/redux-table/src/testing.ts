import {
  createSlice,
  PayloadAction,
  ValidateSliceCaseReducers,
  SliceCaseReducers,
} from '@reduxjs/toolkit';

type PluginGenerator<Slice> = (name: string) => Slice;

interface FooState {
  footers: [];
}

type FooSlice = ReturnType<typeof fooFunc>;
function fooFunc(name: string, initialState: FooState) {
  return createSlice({
    name,
    initialState,
    reducers: { onDataLoad(state, action: PayloadAction<number>) {} },
  });
}

function foo(initialState: FooState): PluginGenerator<FooSlice> {
  return (name) => fooFunc(name, initialState);
}

interface BooState<T> {
  booters: T[];
}

function booFunc<T, Reducers extends SliceCaseReducers<BooState<T>>>(
  name: string,
  initialState: BooState<T>,
) {
  return createSlice({
    name,
    initialState,
    reducers: {
      onBooLoad(state: BooState<T>, action: PayloadAction<T[]>) {
        state.booters = action.payload;
      },
      ...({} as ValidateSliceCaseReducers<BooState<T>, Reducers>),
    },
  });
}

function boo<T>(initialState: BooState<T>) {
  return (name: string) => booFunc(name, initialState);
}

type PluginArray<T extends ReadonlyArray<PluginGenerator<any>>> = {
  [Key in keyof T]: T[Key] extends PluginGenerator<infer Slice> ? Slice : never;
};

function baz<T extends ReadonlyArray<PluginGenerator<any>>>(
  ...plugins: T
): PluginArray<T> {
  return plugins.map((plugin) => plugin('test')) as any;
}

const x = baz(foo({ footers: [] }), boo({ booters: ['string'] }));

x[0].actions.onDataLoad;
x[1].actions.onBooLoad;

export default foo;
