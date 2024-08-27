import Box from '@mui/material/Box';
import React from 'react';

const Image = props => {
    const { name, src, sx, ...rest } = props;

    return (
        <Box
            component='img'
            src={src}
            alt='image'
            draggable='false'
            sx={{ maxWidth: '100%', ...sx }}
            {...rest}
        />
    );
};

export default Image;
