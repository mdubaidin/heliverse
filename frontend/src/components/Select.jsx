import { FormControl, FormHelperText, InputLabel } from '@mui/material';
import MuiSelect from '@mui/material/Select';
import React from 'react';

const Select = props => {
    const {
        fieldName,
        error,
        helperText,
        label,
        register,
        registerOptions,
        children,
        FormControlProps,
        ...rest
    } = props;

    return (
        <FormControl fullWidth size='small' {...FormControlProps}>
            {label && <InputLabel>{label}</InputLabel>}
            <MuiSelect label={label} {...rest}>
                {children}
            </MuiSelect>
            <FormHelperText error={error} sx={{ ml: 2 }}>
                {helperText}
            </FormHelperText>
        </FormControl>
    );
};

export default Select;
