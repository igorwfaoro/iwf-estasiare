import classNames from 'classnames';
import React, { InputHTMLAttributes } from 'react';
import './index.scss';

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  inputRef?: React.Ref<HTMLInputElement>;
  className?: string;
  labelClassName?: string;
  inputClassName?: string;
}

export default function Checkbox({
  label,
  inputRef,
  className,
  labelClassName,
  inputClassName,
  ...otherProps
}: CheckboxProps) {
  return (
    <div className={classNames('app-checkbox', className)}>
      <label className={labelClassName}>
        <input
          type="checkbox"
          ref={inputRef}
          {...otherProps}
          className={inputClassName}
        />
        <span>{label}</span>
      </label>
    </div>
  );
}
