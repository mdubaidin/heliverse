import React from 'react';
import Box from '@mui/material/Box';

const Container = ({ children, sx, ...rest }) => {
    return (
        <Box sx={{ maxWidth: 'min(1736px, 90%)', mx: 'auto', py: 2, ...sx }} {...rest}>
            {children}
        </Box>
    );
};

export default Container;
