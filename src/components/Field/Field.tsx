import React, { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';
import FieldLabel from './components/FieldLabel/FieldLabel';
import FieldInput from './components/FieldInput/FieldInput';
import FieldSelect from './components/FieldSelect/FieldSelect';
import FieldHelpText from './components/FieldHelpText/FieldHelpText';
import FieldError from './components/FieldError/FieldError';
import FieldSelectOption from './components/FieldSelect/components/FieldSelectOption/FieldSelectOption';

interface FieldProps {
  className?: string;
  children: ReactNode;
}

export default function Field({ className, children }: FieldProps) {
  return (
    <div className={twMerge('mb-4 flex flex-col gap-1', className)}>
      {children}
    </div>
  );
}

Field.Label = FieldLabel;
Field.Input = FieldInput;
Field.Select = FieldSelect;
Field.SelectOption = FieldSelectOption;
Field.HelpText = FieldHelpText;
Field.Error = FieldError;
