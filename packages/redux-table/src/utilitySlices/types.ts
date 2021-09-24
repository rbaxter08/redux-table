export type TablePlugin<Slice> = (name: string) => Slice;

export type PluginArray<T extends ReadonlyArray<TablePlugin<any>>> = {
  [Key in keyof T]: T[Key] extends TablePlugin<infer Slice> ? Slice : never;
};
