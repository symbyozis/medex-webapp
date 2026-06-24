import React from 'react';
import { IMaskInput } from 'react-imask';

interface PhoneMaskInputProps {
  onChange: (event: { target: { value: string } }) => void;
  name?: string;
}

const PhoneMaskInput = React.forwardRef<HTMLInputElement, PhoneMaskInputProps>(
  function PhoneMaskInput(props, ref) {
    const { onChange, ...other } = props;
    return (
      <IMaskInput
        {...other}
        mask="+7 (000) 000-00-00"
        inputRef={ref}
        onAccept={(value: string) => onChange({ target: { value } })}
        overwrite
      />
    );
  }
);

export default PhoneMaskInput;
