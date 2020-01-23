import { createMuiTheme } from '@material-ui/core/styles';

export const mainTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#009be5',
      contrastText: '#fff'
    },
    secondary: {
      main: '#15AA30',
      contrastText: '#fff'
    },
    background: {
      contrastText: '#000'
    }
  },
  typography: {
    h5: {
      fontWeight: 500,
      fontSize: 26,
      letterSpacing: 0.5
    }
  },
  shape: {
    borderRadius: 8
  },
  props: {
    MuiTab: {
      disableRipple: true
    }
  },
  mixins: {
    toolbar: {
      minHeight: 48
    }
  }
});

export const darkTheme = createMuiTheme({
  palette: {
    common: {
      black: 'rgba(0, 0, 0, 1)',
      white: 'rgba(255, 255, 255, 1)'
    },
    background: {
      paper: '#2A2A2A',
      default: '#1A1A1A',
      contrastText: '#FFFFFF'
    },
    primary: {
      light: '#47A8E9',
      main: '#3C88C6',
      dark: '#2D578E',
      contrastText: '#FFFFFF'
    },
    secondary: {
      light: '#E98847',
      main: '#C67A3C',
      dark: '#8E642D',
      contrastText: '#FFFFFF'
    },
    error: {
      light: '#E49CAD',
      main: '#CF6679',
      dark: '#B75463',
      contrastText: '#000000'
    },
    text: {
      primary: 'rgba(255, 255, 255, 1)',
      secondary: 'rgba(201, 201, 201, 1)',
      disabled: 'rgba(155, 155, 155, 1)',
      hint: 'rgba(201, 201, 201, 1)'
    }
  }
});
