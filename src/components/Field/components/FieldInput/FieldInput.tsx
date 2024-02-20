import { InputHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

interface FieldInputProps extends InputHTMLAttributes<HTMLInputElement> {
  ref?: React.Ref<HTMLInputElement>;
}

export default function FieldInput({
  ref,
  className,
  ...props
}: FieldInputProps) {
  return (
    <input
      ref={ref}
      className={twMerge(
        'border-gray-300 rounded-md focus:outline-none',
        className
      )}
      {...props}
    />
  );
}
