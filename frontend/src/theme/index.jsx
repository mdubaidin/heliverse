import CssBaseline from '@mui/material/CssBaseline';
import React from 'react';
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material';

const ThemeProvider = props => {
    const baseTheme = createTheme({
        palette: {
            mode: 'light',
            primary: { main: '#EF5A6F' },
            secondary: { main: '#08090e' },
            text: {
                primary: '#1e1e22',
                secondary: '#7b7e95',
            },
            background: {
                // default: '#f3f8fe',
                default: '#ffffff',
                button: {
                    dark: '#12162f',
                    listItemHover: '#e7e8eb',
                },
            },
        },
        breakpoints: {
            keys: ['xs', 'sm', 'md', 'xm', 'lg', 'xlg', 'xl', 'xxl'],
            values: {
                xs: 0,
                sm: 576,
                md: 768,
                xm: 1024,
                lg: 1146,
                xlg: 1380,
                xl: 1600,
                xxl: 1756,
            },
        },
        components: {
            MuiCssBaseline: {
                styleOverrides: theme => ({
                    body: {
                        '&::-webkit-scrollbar, & *::-webkit-scrollbar': {
                            backgroundColor: 'transparent',
                            width: '6px',
                        },
                        '&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb': {
                            borderRadius: 8,
                            backgroundColor: theme.palette.divider,
                            // backgroundColor: 'red',
                        },
                        '&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus': {
                            backgroundColor: '#747775',
                        },
                        '&::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active': {
                            backgroundColor: '#747775',
                        },
                        '&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover': {
                            backgroundColor: '#747775',
                        },
                    },
                }),
            },

            MuiListItemButton: {
                variants: [
                    {
                        props: { variant: 'navigationButton' },
                        style: ({ theme }) => ({
                            padding: '2px 15px',
                            cursor: 'pointer',
                            color: theme.palette.text.primary,
                            fontSize: 14,
                            borderRadius: '100px',

                            '& .MuiListItemIcon-root': {
                                color: theme.palette.contrast,
                            },

                            '&:hover': {
                                backgroundColor: theme.palette.background.button.listItemHover,
                            },

                            '&.Mui-selected': {
                                '&:hover': {
                                    backgroundColor: theme.palette.primary.main,
                                },
                                backgroundColor: theme.palette.primary.main,

                                '.MuiListItemIcon-root': {
                                    color: theme.palette.primary.contrastText,
                                },
                                '.MuiListItemText-root': {
                                    color: theme.palette.primary.contrastText,
                                    m: 0,
                                },
                            },
                        }),
                    },
                ],
            },

            MuiDivider: {
                styleOverrides: {
                    light: {
                        borderColor: '#424242',
                        width: '100%',
                    },
                },
            },

            MuiButton: {
                styleOverrides: {
                    root: {
                        borderRadius: '100px',
                        textTransform: 'none',
                    },
                },
            },
            MuiTextField: {
                styleOverrides: {
                    root: {
                        marginBottom: '20px',
                        'input::-webkit-outer-spin-button,\ninput::-webkit-inner-spin-button': {
                            WebkitAppearance: 'none',
                            margin: '0',
                        },
                    },
                },
            },

            MuiSelect: {
                styleOverrides: {
                    root: {
                        marginBottom: '20px',
                    },
                },
            },
        },
    });

    return (
        <MuiThemeProvider theme={baseTheme}>
            <CssBaseline />
            {props.children}
        </MuiThemeProvider>
    );
};

export default ThemeProvider;
