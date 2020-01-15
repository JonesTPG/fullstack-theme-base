import { createMuiTheme } from "@material-ui/core/styles"

export const mainTheme = createMuiTheme({
  palette: {
    primary: {
      main: "#009be5",
      contrastText: "#ffff",
    },
    secondary: {
      main: "#15AA30",
      contrastText: "#ffff",
    },
  },
  typography: {
    h5: {
      fontWeight: 500,
      fontSize: 26,
      letterSpacing: 0.5,
    },
  },
  shape: {
    borderRadius: 8,
  },
  props: {
    MuiTab: {
      disableRipple: true,
    },
  },
  mixins: {
    toolbar: {
      minHeight: 48,
    },
  },
})

export const darkTheme = createMuiTheme({
  palette: {
    primary: {
      main: "#081C30",
      contrastText: "#ffff",
    },
    secondary: {
      main: "#15AA30",
      contrastText: "#ffff",
    },
  },
})
