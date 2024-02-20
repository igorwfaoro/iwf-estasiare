import { ReactElement, SelectHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';
import FieldSelectOption, {
  FieldSelectOptionProps
} from './components/FieldSelectOption/FieldSelectOption';

interface FieldSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  ref?: React.Ref<HTMLSelectElement>;
  children?: ReactElement<FieldSelectOptionProps>[];
}

export default function FieldSelect({
  ref,
  className,
  children,
  ...props
}: FieldSelectProps) {
  return (
    <select
      ref={ref}
      className={twMerge(
        'border-gray-300 rounded-md focus:outline-none',
        className
      )}
      {...props}
    >
      {children}
    </select>
  );
}

FieldSelect.Option = FieldSelectOption;
