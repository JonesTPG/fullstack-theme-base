import { createMuiTheme } from '@material-ui/core/styles';

export const mainTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#009be5',
      contrastText: '#FFFFFF',
      paper: '#009be5'
    },
    secondary: {
      main: '#15AA30',
      contrastText: '#FFFFFF'
    },
    background: {
      contrastText: '#000000'
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
    type: 'dark',
    primary: {
      main: '#3C88C6',
      paper: '#424242'
    },
    secondary: {
      main: '#C67A3C'
    },
    error: {
      main: '#D6405B'
    }
  }
});
