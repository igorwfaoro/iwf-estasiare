import {
  ForwardedRef,
  InputHTMLAttributes,
  forwardRef,
  useEffect
} from 'react';
import { MdSearch } from 'react-icons/md';
import { twMerge } from 'tailwind-merge';

export interface FieldInputProps extends InputHTMLAttributes<HTMLInputElement> {
  containerClassName?: string;
  handleClickSearchButton?: () => void;
  datalist?: { value: any; label: string }[];
}

const FieldInput = forwardRef(
  (
    {
      id,
      className,
      containerClassName,
      handleClickSearchButton,
      datalist,
      ...props
    }: FieldInputProps,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    useEffect(() => {
      if (datalist && !id) {
        throw new Error(
          'Field input with datalist, must have an "id" attribute'
        );
      }
    }, []);

    return (
      <span className={twMerge('relative', containerClassName)}>
        <input
          id={id}
          ref={ref}
          className={twMerge(
            'border border-gray-300 rounded-lg focus:outline-none p-4 text-md w-full relative',
            handleClickSearchButton && 'pr-12',
            className
          )}
          list={datalist && `datalist-${id}`}
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

        {datalist && (
          <datalist id={`datalist-${id}`}>
            {datalist.map((it) => (
              <option value={it.value}>{it.label}</option>
            ))}
          </datalist>
        )}
      </span>
    );
  }
);

export default FieldInput;
