import { ForwardedRef, InputHTMLAttributes, forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

interface FieldInputProps extends InputHTMLAttributes<HTMLInputElement> {}

const FieldInput = forwardRef(
  (
    { className, ...props }: FieldInputProps,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    return (
      <input
        ref={ref}
        className={twMerge(
          'border-gray-300 rounded-md focus:outline-none p-4 text-md',
          className
        )}
        {...props}
      />
    );
  }
);

export default FieldInput;
