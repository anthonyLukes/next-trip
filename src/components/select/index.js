import * as React from 'react';
import PropTypes from 'prop-types';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import MuiSelect from '@mui/material/Select';

const Select = (props) => {
  const { id, label, options, onChange, value, placeholder } = props;
  return (
    <FormControl id={`${id}-wrapper`} fullWidth>
      <InputLabel id={`label-${id}`}>{label}</InputLabel>
      <MuiSelect
        value={value}
        onChange={onChange}
        labelId={`label-${id}`}
        id={id}
        label={label}
      >
        {placeholder && (
          <MenuItem disabled value="">
            <em>{placeholder}</em>
          </MenuItem>
        )}
        {options &&
          options.length &&
          options.map((option) => {
            const { label = '', value = '' } = option;
            return (
              <MenuItem key={value} value={value}>
                {label}
              </MenuItem>
            );
          })}
      </MuiSelect>
    </FormControl>
  );
};

Select.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    })
  ),
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
};

export default Select;
