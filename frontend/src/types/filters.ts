export interface TabItem {
  type: SortType;
  label: string;
}

export enum SortType {
  cheapest = 'cheapest',
  fastest = 'fastest',
}
