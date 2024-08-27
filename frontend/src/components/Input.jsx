import TextField from '@mui/material/TextField';
import React from 'react';

const Input = props => {
    const { fieldName, register, registerOptions, ...rest } = props;

    return <TextField size='small' fullWidth {...register(fieldName, registerOptions)} {...rest} />;
};

export default Input;
