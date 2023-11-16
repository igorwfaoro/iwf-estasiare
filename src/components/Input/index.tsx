import classNames from 'classnames';
import React, { forwardRef, InputHTMLAttributes } from 'react';
import './index.scss';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  inputRef?: React.Ref<HTMLInputElement>;
  className?: string;
  labelClassName?: string;
  inputClassName?: string;
  errorMessageClassName?: string;
  errorMessage?: string | null;
}

export default function Input({
  label,
  inputRef,
  className,
  labelClassName,
  inputClassName,
  errorMessage,
  errorMessageClassName,
  ...otherProps
}: InputProps) {
  return (
    <div className={classNames('app-input', className)}>
      <label className={classNames('label', labelClassName)}>{label}</label>
      <input
        ref={inputRef}
        {...otherProps}
        className={classNames('input', inputClassName)}
      />
      {errorMessage && (
        <span className={classNames('error-message', errorMessageClassName)}>
          {errorMessage}
        </span>
      )}
    </div>
  );
}
