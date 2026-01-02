import React, { useRef } from 'react';
import { TextField, Autocomplete, FormHelperText } from '@mui/material';

const autoFieldProps = {
  width: '100%',
};

const AutocompleteDropdown = ({
  onChange,
  options,
  placeholder,
  value,
  selectOnFocus,
  clearOnBlur,
  size,
  getOptionLabel,
  loading,
  renderOption,
  name,
  isOptionEqualToValue,
  error,
  disabled,
  label,
}) => {
  const ref0 = useRef();
  return (
    <>
      <Autocomplete
        disabled={disabled}
        disablePortal
        ref={ref0}
        id="combo-box-demo"
        options={options}
        name={name}
        renderInput={(params) => (
          <TextField
            sx={autoFieldProps}
            {...params}
            label={label}
            error={Boolean(error)}
          />
        )}
        onChange={(e, val) => {
          e.target.name = ref0.current.getAttribute('name');
          onChange(e, val);
        }}
        placeholder={placeholder}
        value={value || null}
        selectOnFocus={selectOnFocus}
        clearOnBlur={clearOnBlur}
        size={size || 'small'}
        getOptionLabel={getOptionLabel}
        loading={loading}
        renderOption={renderOption}
        isOptionEqualToValue={(option, value) => option?.id === value?.id}
        error={error ? true : undefined}
      />
      {error && (
        <FormHelperText style={{ marginLeft: '20px', color: '#C32525' }}>
          {error}
        </FormHelperText>
      )}
    </>
  );
};

export default AutocompleteDropdown;
