import {
  ForwardedRef,
  TextareaHTMLAttributes,
  forwardRef,
  useState
} from 'react';
import { twMerge } from 'tailwind-merge';

export interface FieldTextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  showCaracterCount?: boolean;
}

const FieldTextArea = forwardRef(
  (
    {
      className,
      showCaracterCount,
      maxLength,
      value,
      onChange,
      ...props
    }: FieldTextareaProps,
    ref: ForwardedRef<HTMLTextAreaElement>
  ) => {
    const maxCaracteres = maxLength;

    const [currentCaracteres, setCurrentCaracteres] = useState(
      value?.toString().length
    );

    return (
      <div>
        <textarea
          ref={ref}
          className={twMerge(
            'border border-gray-300 rounded-lg focus:outline-none p-4 pr-12 text-md w-full relative',
            className
          )}
          onChange={(e) => {
            setCurrentCaracteres(e.target.value?.length);
            onChange && onChange(e);
          }}
          {...props}
        />
        {showCaracterCount && (
          <div className="text-sm text-gray-600 text-right">
            {currentCaracteres || 0}/{maxCaracteres}
          </div>
        )}
      </div>
    );
  }
);

export default FieldTextArea;
