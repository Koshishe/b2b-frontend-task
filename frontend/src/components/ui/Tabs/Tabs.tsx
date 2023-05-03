import cn from 'classnames';

import type { SortType, TabItem } from '@/types/filters';

import s from './Tabs.module.scss';

interface TabsProps {
  tabs: TabItem[];
  activeTab: SortType;
  onSelect: (type: SortType) => void;
}
export const Tabs = ({ tabs, onSelect, activeTab }: TabsProps) => {
  return (
    <div className={s.root}>
      {tabs.map((tab) => (
        <button
          type="button"
          key={tab.type}
          className={cn(s.tab, { [s.active]: tab.type == activeTab })}
          onClick={() => onSelect(tab.type)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};
