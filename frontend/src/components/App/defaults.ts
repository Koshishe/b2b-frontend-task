import type { TabItem } from '@/types/filters';
import { SortType } from '@/types/filters';

export const tabs: TabItem[] = [
  {
    type: SortType.cheapest,
    label: 'Самый дешевый',
  },
  {
    type: SortType.fastest,
    label: 'Самый быстрый',
  },
];
