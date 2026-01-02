import { MenuItem, FormControl, Select, FormHelperText } from '@mui/material';
import { useTranslation } from 'react-i18next';

const formStyles = {
  minWidth: 120,
};

const SelectDropdownComponent = ({
  options,
  value,
  onChange,
  defaultValue = 'Select',
  inputProps,
  formSx,
  sx,
  className,
  size,
  name,
  placeholder,
  error,
  renderValue,
  disabled,
}) => {
  const { t } = useTranslation('translations');

  return (
    <div>
      <FormControl sx={formSx || formStyles} fullWidth>
        <Select
          required
          displayEmpty
          sx={sx}
          className={className}
          value={value || ''}
          onChange={onChange}
          size={size || 'small'}
          name={name}
          error={!!error}
          disabled={disabled}
          inputProps={inputProps || { 'aria-label': 'Without label' }}
        >
          <MenuItem value="">
            <em>{defaultValue}</em>
          </MenuItem>
          {options?.map((i, index) => (
            <MenuItem key={index} value={i?.value}>
              {t(i?.label)}
            </MenuItem>
          ))}
        </Select>
        {error && (
          <FormHelperText style={{ marginLeft: '20px', color: '#C32525' }}>
            {error}
          </FormHelperText>
        )}
      </FormControl>
    </div>
  );
};

export default SelectDropdownComponent;
