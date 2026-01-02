import React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

const AutoCompleteMultiple = ({
  onChange,
  options,
  placeholder,
  value,
  label,
  name,
  disabled,
  getOptionLabel,
  error,
  helpertext,
  defaultValue,
}) => {
  const getOptionDisabled = (option) =>
    value?.some((item) => item.value === option.value);

  const getOptionSelected = (option, selectedValue) =>
    selectedValue?.some((item) => item.value === option.value);

  return (
    <Autocomplete
      multiple
      name={name}
      options={options}
      getOptionLabel={getOptionLabel}
      value={value}
      onChange={onChange}
      defaultValue={defaultValue}
      size="small"
      getOptionDisabled={getOptionDisabled}
      // getOptionSelected={getOptionSelected}
      disabled={disabled}
      error={error}
      helpertext={helpertext}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          placeholder={placeholder}
          error={error}
          helperText={helpertext}
          disabled={disabled}
        />
      )}
    />
  );
};

export default AutoCompleteMultiple;
