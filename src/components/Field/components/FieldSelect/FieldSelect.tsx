import {
  ForwardedRef,
  ReactElement,
  SelectHTMLAttributes,
  forwardRef
} from 'react';
import { twMerge } from 'tailwind-merge';

import { FieldSelectOptionProps } from './components/FieldSelectOption/FieldSelectOption';

interface FieldSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  children?: ReactElement<FieldSelectOptionProps>[];
}

const FieldSelect = forwardRef(
  (
    { className, children, ...props }: FieldSelectProps,
    ref: ForwardedRef<HTMLSelectElement>
  ) => {
    return (
      <select
        ref={ref}
        className={twMerge(
          'border-gray-300 rounded-md focus:outline-none p-4 text-md w-full',
          className
        )}
        {...props}
      >
        {children}
      </select>
    );
  }
);

export default FieldSelect;
