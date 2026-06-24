import React, { useEffect, useRef } from 'react';
import { AddressSuggestions, DaDataAddressSuggestion } from 'react-dadata';

interface AddressInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const AddressInput = ({ value, onChange, placeholder }: AddressInputProps) => {
  const ref = useRef<AddressSuggestions>(null);

  useEffect(() => {
    if (!value) {
      ref.current?.setInputValue('');
    }
  }, [value]);

  return (
    <AddressSuggestions
      ref={ref}
      token={process.env.NEXT_PUBLIC_DADATA_TOKEN!}
      defaultQuery={value}
      onChange={(suggestion?: DaDataAddressSuggestion) => {
        onChange(suggestion?.value ?? '');
      }}
      inputProps={{
        placeholder,
        onChange: (e) => onChange(e.target.value),
      }}
      filterLocations={[{ region: 'Ингушетия' }]}
      count={5}
    />
  );
};

export default AddressInput;
