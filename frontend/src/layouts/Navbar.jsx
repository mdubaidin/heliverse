import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {
    Divider,
    Drawer,
    Grid,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
} from '@mui/material';
import Image from '../components/Image';
import CloseIcon from '@mui/icons-material/Close';
import NavLinks from '../data/Navlinks';
import { NavLink } from 'react-router-dom';

export default function Navbar() {
    const [drawer, setDrawer] = React.useState(false);

    const toggleDrawer = () => setDrawer(!drawer);

    const drawerItem = (
        <Box display={'flex'} flexDirection='column' minHeight={'100vh'}>
            <Box
                sx={{
                    minHeight: '80px',
                    p: 2,
                }}>
                <Grid container alignItems='center' columnSpacing={1}>
                    <Grid item>
                        <IconButton
                            onClick={toggleDrawer}
                            edge='start'
                            sx={{
                                ml: 0.2,
                                mr: 1,
                            }}>
                            <CloseIcon />
                        </IconButton>
                    </Grid>
                    <Grid item xs>
                        <Image src='/heliverse.png' sx={{ height: '32px' }} />
                    </Grid>
                </Grid>
            </Box>
            <Divider sx={{ mb: 1 }} />

            <List sx={{ flexGrow: 1 }}>
                {NavLinks.map(link => (
                    <NavLink
                        to={link.to}
                        key={link.name}
                        style={{ textDecoration: 'none', color: 'inherit' }}>
                        {({ isActive }) => (
                            <ListItem
                                key={link.name}
                                onClick={toggleDrawer}
                                sx={{
                                    flexDirection: 'column',
                                    alignItems: 'flex-start',
                                    cursor: 'pointer',
                                }}>
                                <Typography
                                    variant='subtitle2'
                                    sx={{
                                        mx: 2,
                                        fontWeight: 600,
                                        fontSize: 14,
                                        color: isActive ? 'primary.main' : 'inherit',
                                    }}>
                                    {link.name}
                                </Typography>
                                <Divider sx={{ my: 2, width: '100%' }} />
                            </ListItem>
                        )}
                    </NavLink>
                ))}
            </List>
        </Box>
    );

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar
                position='fixed'
                sx={{
                    backgroundColor: 'background.paper',
                    borderBottom: '1px solid',
                    borderColor: 'divider',
                }}
                elevation={0}>
                <Toolbar
                    sx={{
                        '&': {
                            minHeight: '80px',
                            px: { xs: 2, xm: 12 },
                        },
                    }}>
                    <Grid container alignItems='center' columnSpacing={1}>
                        <Grid item sx={{ display: { xm: 'none' } }}>
                            <IconButton
                                onClick={toggleDrawer}
                                edge='start'
                                sx={{
                                    ml: 0.2,
                                    mr: 1,
                                }}>
                                <MenuIcon />
                            </IconButton>
                        </Grid>
                        <Grid item xs>
                            <Image src='/heliverse.png' sx={{ height: '40px' }} />
                        </Grid>

                        <Grid
                            item
                            sx={{
                                display: { xs: 'none', xm: 'flex' },
                            }}>
                            {NavLinks.map(link => (
                                <NavLink
                                    to={link.to}
                                    key={link.name}
                                    style={{
                                        textDecoration: 'none',
                                        color: 'inherit',
                                    }}>
                                    {({ isActive }) => (
                                        <ListItem sx={{ px: 0.5 }}>
                                            <ListItemButton
                                                selected={isActive}
                                                disableRipple
                                                disableTouchRipple
                                                variant='navigationButton'>
                                                <ListItemIcon
                                                    sx={{
                                                        minWidth: '34px',
                                                        color: 'text.secondary',
                                                    }}>
                                                    {React.createElement(link.icon)}
                                                </ListItemIcon>
                                                <ListItemText
                                                    primary={link.name}
                                                    primaryTypographyProps={{ fontSize: 14 }}
                                                />
                                            </ListItemButton>
                                        </ListItem>
                                    )}
                                </NavLink>
                            ))}
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>

            <Drawer
                open={drawer}
                onClose={toggleDrawer}
                sx={{ '& .MuiPaper-root': { width: '100%' } }}>
                {drawerItem}
            </Drawer>
        </Box>
    );
}
