import { CircularProgress, Grid, Typography } from '@mui/material';

export default function Loading({ message, minHeight, textColor }) {
    return (
        <Grid
            container
            spacing={0}
            justifyContent='center'
            alignItems='center'
            style={{ minHeight: minHeight || '100vh', width: '100%' }}>
            <Grid item>
                <CircularProgress style={{ marginRight: '30px' }} />
            </Grid>
            <Grid item>
                <Typography variant='h6' sx={{ color: textColor || 'inherit' }}>
                    {message}
                </Typography>
            </Grid>
        </Grid>
    );
}
