export interface NumericFilter {
  operator: 'gt';
  value: number;
}

export const filterTypes = {
  gt: (currentValue: number, value: number) => currentValue > value,
};
