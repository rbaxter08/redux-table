export interface ColumnFilter<T, F> {
  columnId: keyof T;
  operator: keyof F;
  value: T[keyof T];
}

export const baseFilterTypes = {
  gt: (currentValue: number, value: number) => currentValue > value,
};

type FilterTypes<T> = {
  [key in keyof T]: T[key];
};

export function createFilterTypes<T>(
  userFilterTypes: T,
): FilterTypes<
  Omit<typeof baseFilterTypes, keyof typeof userFilterTypes> &
    typeof userFilterTypes
> {
  return { ...baseFilterTypes, ...userFilterTypes };
}
