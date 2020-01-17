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
      paper: 'rgba(74, 74, 74, 1)',
      default: 'rgba(74, 74, 74, 1)'
    },
    primary: {
      light: 'rgba(124, 180, 247, 1)',
      main: 'rgba(74, 144, 226, 1)',
      dark: 'rgba(43, 115, 200, 1)',
      contrastText: '#fff'
    },
    secondary: {
      light: 'rgba(144, 216, 68, 1)',
      main: 'rgba(126, 211, 33, 1)',
      dark: 'rgba(96, 167, 18, 1)',
      contrastText: '#fff'
    },
    error: {
      light: 'rgba(233, 64, 85, 1)',
      main: 'rgba(208, 2, 27, 1)',
      dark: 'rgba(170, 8, 28, 1)',
      contrastText: '#fff'
    },
    text: {
      primary: 'rgba(255, 255, 255, 1)',
      secondary: 'rgba(201, 201, 201, 1)',
      disabled: 'rgba(155, 155, 155, 1)',
      hint: 'rgba(201, 201, 201, 1)'
    }
  }
});
