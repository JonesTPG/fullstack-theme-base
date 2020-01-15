import { createMuiTheme } from "@material-ui/core/styles"

export const mainTheme = createMuiTheme({
  palette: {
    primary: {
      main: "#009be5",
      contrastText: "#fff",
    },
    secondary: {
      main: "#15AA30",
      contrastText: "#000",
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
      main: "#262626",
      contrastText: "#ffff",
    },
    secondary: {
      main: "#34a7d7",
      contrastText: "#ffff",
    },
    background: {
      default: "#262626",
    },
  },
})
