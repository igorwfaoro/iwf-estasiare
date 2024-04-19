import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

import FieldError from './components/FieldError/FieldError';
import FieldHelpText from './components/FieldHelpText/FieldHelpText';
import FieldInput from './components/FieldInput/FieldInput';
import FieldInputAddressAutocomplete from './components/FieldInputAddressAutocomplete/FieldInputAddressAutocomplete';
import FieldLabel from './components/FieldLabel/FieldLabel';
import FieldSelect from './components/FieldSelect/FieldSelect';
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
Field.AddressAutocomplete = FieldInputAddressAutocomplete;
Field.HelpText = FieldHelpText;
Field.Error = FieldError;
