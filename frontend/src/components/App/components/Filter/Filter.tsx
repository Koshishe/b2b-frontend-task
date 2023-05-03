import cn from 'classnames';

import { Checkbox } from '@/components/ui/Checkbox/Checkbox';
import { getWordDeclination } from '@/utils/helpers';

import s from './Filter.module.scss';

interface FilterProps {
  filters: number[];
  activeFilters: number[];
  onChange: (check: boolean, segments?: number) => void;
  className?: string;
}
export const Filter = ({
  filters,
  activeFilters,
  onChange,
  className,
}: FilterProps) => {
  return (
    <div className={cn(s.root, className)}>
      <p className={s.title}>Количество пересадок</p>
      <Checkbox
        isActive={activeFilters.length === filters.length}
        onChange={onChange}
        label="Все"
        className={s.checkbox}
      />
      <div>
        {filters.map((filter) => {
          return (
            <Checkbox
              key={`${filter}`}
              isActive={
                activeFilters.length === filters.length ||
                activeFilters.includes(filter)
              }
              onChange={(checked) => onChange(checked, filter)}
              label={`${filter ? filter : 'Без'} ${getWordDeclination(
                'пересад',
                ['ок', 'ка', 'ки'],
                filter
              )}`}
              className={s.checkbox}
            />
          );
        })}
      </div>
    </div>
  );
};
