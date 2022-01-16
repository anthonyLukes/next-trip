import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import MuiSelect from '@mui/material/Select';

// @todo: add proptypes

const Select = (props) => {
  const { id, label, options, onChange, value, placeholder } = props;
  return (
    <FormControl fullWidth>
      <InputLabel id={`label-${id}`}>{label}</InputLabel>
      <MuiSelect
        value={value}
        onChange={onChange}
        labelId={`label-${id}`}
        id={id}
        label={label}
        // renderValue={(selected) => {
        //   if (selected.length === 0) {
        //     return <em>{placeholder}</em>;
        //   }

        //   return selected.join(', ');
        // }}
      >
        {placeholder && (
          <MenuItem disabled value="">
            <em>{placeholder}</em>
          </MenuItem>
        )}
        {options && options.length && options.map(option => {
          const {
            label = '',
            value = ''
          } = option;
          return (
            <MenuItem key={value} value={value}>{label}</MenuItem>
          )
        })}
      </MuiSelect>
    </FormControl>
  );
}
 
export default Select;


