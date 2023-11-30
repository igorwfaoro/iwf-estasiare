import React, { InputHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  inputRef?: React.Ref<HTMLInputElement>;
  className?: string;
  labelClassName?: string;
  inputClassName?: string;
  errorMessageClassName?: string;
  errorMessage?: string | null;
  helpText?: string;
}

export default function Input({
  label,
  inputRef,
  className,
  labelClassName,
  inputClassName,
  errorMessage,
  errorMessageClassName,
  helpText,
  ...otherProps
}: InputProps) {
  return (
    <div className={twMerge('mb-4 flex flex-col gap-1', className)}>
      <label className={twMerge('text-gray-700 text-sm mb-1', labelClassName)}>
        {label}
      </label>
      {helpText && <small className="text-neutral-500">{helpText}</small>}
      <input
        ref={inputRef}
        {...otherProps}
        className={twMerge(
          'border-gray-300 rounded-md focus:outline-none',
          inputClassName
        )}
      />
      {errorMessage && (
        <span
          className={twMerge('text-sm text-red-600', errorMessageClassName)}
        >
          {errorMessage}
        </span>
      )}
    </div>
  );
}
