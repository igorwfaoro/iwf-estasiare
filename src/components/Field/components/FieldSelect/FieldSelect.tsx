import {
  ForwardedRef,
  ReactElement,
  SelectHTMLAttributes,
  forwardRef
} from 'react';
import { twMerge } from 'tailwind-merge';

import FieldSelectOption, {
  FieldSelectOptionProps
} from './components/FieldSelectOption/FieldSelectOption';

interface FieldSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  children?: ReactElement<FieldSelectOptionProps>[];
  includeEmpty?: boolean;
}

const FieldSelect = forwardRef(
  (
    {
      className,
      children,
      includeEmpty,
      defaultValue,
      ...props
    }: FieldSelectProps,
    ref: ForwardedRef<HTMLSelectElement>
  ) => {
    return (
      <select
        ref={ref}
        className={twMerge(
          'border border-gray-300 bg-white rounded-lg focus:outline-none p-4 pr-3 text-md w-full h-[58px]',
          className
        )}
        defaultValue={includeEmpty ? '' : defaultValue}
        {...props}
      >
        {includeEmpty && <FieldSelectOption value="">-</FieldSelectOption>}
        {children}
      </select>
    );
  }
);

export default FieldSelect;
