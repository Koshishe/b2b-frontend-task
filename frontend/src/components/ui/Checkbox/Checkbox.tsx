import cn from 'classnames';

import { Check } from '@/components/svg';

import s from './Checkbox.module.scss';

interface CheckboxProps {
  label?: string;
  isActive: boolean;
  onChange: (checked: boolean) => void;
  className?: string;
}

export const Checkbox = ({
  label,
  isActive,
  onChange,
  className,
}: CheckboxProps) => {
  const handleChange = () => {
    onChange(!isActive);
  };

  return (
    <button
      type="button"
      className={cn(s.button, className)}
      onClick={handleChange}
    >
      <span className={cn(s.checkbox, { [s.active]: isActive })}>
        <Check className={s.checkIcon} />
      </span>
      {label && <span className={s.text}>{label}</span>}
    </button>
  );
};
