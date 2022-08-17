import { createTheme } from '@mui/material/styles';
import { orange } from '@mui/material/colors'
import { PaletteOptions } from '@mui/material';

const theme = createTheme({
    status: {
      danger: orange[500],
    },
    palette: {
        primary: {
          light: '#6750A4',
          main: '#6750A4',
          dark: '#6750A4',
          contrastText: '#FFFFFF',
        },
        secondary: {
          light: '#FFFFFF',
          main: '#FFFFFF',
          dark: '#FFFFFF',
          contrastText: '#272D2A',
        },
        // text: {
        //     primary: '#FFFCB6',
        // },
        // background: {
        //     default: '#272D2A',
        // }
    },
  });
  

declare module '@mui/material/styles' {
    interface Theme {
      status: {
        danger: string;
      };
    }
    // allow configuration using `createTheme`
    interface ThemeOptions {
      status?: {
        danger?: string;
      };
      palette?: PaletteOptions;
    }
  }
  

export default theme;