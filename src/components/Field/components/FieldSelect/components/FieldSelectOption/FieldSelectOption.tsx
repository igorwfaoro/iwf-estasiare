import { OptionHTMLAttributes, ReactNode } from 'react';

export interface FieldSelectOptionProps
  extends OptionHTMLAttributes<HTMLOptionElement> {
  children?: ReactNode;
}

export default function FieldSelectOption({
  className,
  children,
  ...props
}: FieldSelectOptionProps) {
  return <option {...props}>{children}</option>;
}
