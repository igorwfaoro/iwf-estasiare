import React, { InputHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  inputRef?: React.Ref<HTMLInputElement>;
  className?: string;
  labelClassName?: string;
  inputClassName?: string;
  color?: string;
}

export default function Checkbox({
  label,
  inputRef,
  className,
  labelClassName,
  inputClassName,
  color,
  ...otherProps
}: CheckboxProps) {
  return (
    <div className={twMerge('inline-flex items-center', className)}>
      <label className={twMerge('flex items-center', labelClassName)}>
        <input
          type="checkbox"
          ref={inputRef}
          className={twMerge(
            'h-6 w-6 bg-primary border-gray-300 rounded outline-none',
            inputClassName
          )}
          style={{ backgroundColor: color }}
          {...otherProps}
        />
        <span className="ml-2 text-gray-800">{label}</span>
      </label>
    </div>
  );
}
