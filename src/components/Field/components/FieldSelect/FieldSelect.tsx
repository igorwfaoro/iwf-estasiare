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
          'border-gray-300 rounded-md focus:outline-none p-4 text-md w-full',
          className
        )}
        defaultValue={includeEmpty ? '' : defaultValue}
        {...props}
      >
        {includeEmpty && (
          <FieldSelectOption value="" disabled>
            -
          </FieldSelectOption>
        )}
        {children}
      </select>
    );
  }
);

export default FieldSelect;
