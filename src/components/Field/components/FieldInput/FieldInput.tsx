import { ForwardedRef, InputHTMLAttributes, forwardRef } from 'react';
import { MdSearch } from 'react-icons/md';
import { twMerge } from 'tailwind-merge';

export interface FieldInputProps extends InputHTMLAttributes<HTMLInputElement> {
  containerClassName?: string;
  handleClickSearchButton?: () => void;
}

const FieldInput = forwardRef(
  (
    {
      className,
      containerClassName,
      handleClickSearchButton,
      ...props
    }: FieldInputProps,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    return (
      <span className={twMerge('relative', containerClassName)}>
        <input
          ref={ref}
          className={twMerge(
            'border-gray-300 rounded-md focus:outline-none p-4 pr-12 text-md w-full relative',
            className
          )}
          {...props}
        />

        {handleClickSearchButton && (
          <button
            onClick={handleClickSearchButton}
            className="absolute right-3 text-3xl top-[calc(50%-15px)] text-gray-300"
          >
            <MdSearch />
          </button>
        )}
      </span>
    );
  }
);

export default FieldInput;
