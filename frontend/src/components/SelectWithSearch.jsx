import {
    Box,
    Select as MuiSelect,
    Stack,
    IconButton,
    InputBase,
    Paper,
    CircularProgress,
    FormHelperText,
} from '@mui/material';
import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';

const SelectWithSearch = props => {
    const {
        children,
        filter,
        clear,
        placeholder,
        SearchProps,
        disabled,
        error,
        helperText,
        ...rest
    } = props;
    const [select, setSelect] = useState(false);

    const closeSelect = () => setSelect(false);
    const openSelect = () => setSelect(true);

    return (
        <Box sx={{ mb: 2 }}>
            <MuiSelect
                variant='outlined'
                open={select}
                onClose={closeSelect}
                onOpen={e => {
                    e.stopPropagation();
                    openSelect();
                }}
                MenuProps={{
                    onKeyDown: e => e.stopPropagation(),
                    onKeyDownCapture: e => e.stopPropagation(),
                }}
                disabled={disabled}
                error={error}
                size='small'
                {...rest}>
                <Stack direction='row'>
                    <Paper
                        component='form'
                        variant='outlined'
                        onClick={e => e.stopPropagation()}
                        sx={{
                            display: 'flex',
                            flexGrow: 1,
                            alignItems: 'center',
                            bgcolor: 'transparent',
                            minHeight: '46px',
                            border: 'none',
                            px: 1,
                        }}>
                        <IconButton type='button' aria-label='search'>
                            <SearchIcon fontSize='small' />
                        </IconButton>
                        <InputBase
                            sx={{
                                ml: 1,
                                flex: 1,
                                'input::placeholder': {
                                    fontSize: '12px',
                                },
                            }}
                            inputRef={input => input && input.focus()}
                            placeholder={placeholder ? placeholder : 'Search......'}
                            onFocusCapture={e => e.target.focus()}
                            onBlur={e => e.target.focus()}
                            {...SearchProps}
                        />
                    </Paper>
                    {SearchProps.loader && (
                        <CircularProgress
                            sx={{
                                mx: 1,
                                width: '20px !important',
                                height: '20px !important',
                            }}
                        />
                    )}
                </Stack>
                {children}
            </MuiSelect>
            <FormHelperText error={error} sx={{ ml: 2 }}>
                {helperText}
            </FormHelperText>
        </Box>
    );
};

export default SelectWithSearch;
