import { createTheme } from '@mui/material/styles';


export const themeOptions = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#3f51b5',
        },
        secondary: {
            main: '#f50057',
        },
        background: {
            default: '#ffffff',
            paper: '#ffffff',
        },
        common: {
            black: '#333333'
        },
        text: {
            primary: '#333333',
        },
    },
    typography: {
        fontFamily: 'Roboto',
    },
});
