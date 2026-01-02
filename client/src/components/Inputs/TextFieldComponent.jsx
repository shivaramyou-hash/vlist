import React from 'react';
import { InputAdornment, TextField, IconButton } from '@mui/material';
import { colors, font } from './../themes/styles';

const textFieldProps = {
  backgroundColor: colors.WHITE_COLOR,
  borderRadius: 0.5,
  opacity: 1,
  fontSize: font.PRIMARY_FONT_SIZE,
  width: '100%',
  '& .MuiOutlinedInput-root': {
    '&.Mui-focused fieldset': {
      borderColor: colors.PRIMARY_COLOR,
    },
  },
};
const TextFieldComponent = ({
  placeholder,
  name,
  value,
  adornmentPosition,
  Icon,
  EndIcon,
  onChange,
  search,
  onBlurCallback,
  readOnly,
  multiline,
  type,
  rows,
  componentTextFieldProps,
  minRows,
  minLength,
  maxLength,
  keyPressCallBack,
  autoFocus,
  disabled,
  iconDisabled,
  onClick,
  size,
  className,
  error,
  helpertext,
  style,
  isRequired = true,
  defaultValue,
  min,
  max,
}) => {
  const inputProps =
    type === 'number' ? { pattern: '[0-9]*' } : { pattern: '[A-Za-z]*' };

  const handleKeyDown = (event) => {
    if (type === 'number' && event.key === '-') {
      event.preventDefault();
    }
  };

  return (
    <TextField
      defaultValue={defaultValue}
      required={isRequired}
      fullWidth
      sx={componentTextFieldProps || textFieldProps}
      className={className}
      placeholder={placeholder}
      variant="outlined"
      id={name}
      name={name}
      type={type}
      autoFocus={autoFocus}
      size={size || 'small'}
      multiline={multiline}
      minRows={minRows}
      rows={rows}
      onChange={onChange}
      disabled={disabled}
      onKeyUp={search}
      onBlur={onBlurCallback}
      onClick={onClick}
      error={!!error}
      helperText={helpertext}
      style={style}
      value={value || ''}
      inputProps={{
        ...inputProps,
        minLength: minLength ? String(minLength) : null,
        maxLength: maxLength ? String(maxLength) : null,
        autoComplete: 'off',
        min: min,
        max: max,
      }}
      InputProps={{
        min: 0,
        readOnly: readOnly || false,
        disabled: disabled || false,
        startAdornment: adornmentPosition === 'start' && (
          <InputAdornment position="start">
            <Icon />
          </InputAdornment>
        ),
        endAdornment: EndIcon && (
          <InputAdornment position="end">
            <IconButton
              disabled={iconDisabled}
              onClick={keyPressCallBack}
              edge="end"
            >
              <EndIcon />
            </IconButton>
          </InputAdornment>
        ),
      }}
      onKeyDown={handleKeyDown}
    />
  );
};

export default TextFieldComponent;
