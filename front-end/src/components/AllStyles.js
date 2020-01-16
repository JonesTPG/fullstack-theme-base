export const SignUpStyles = theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(2),
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.secondary.main,
  },
  checBox: {
    color: theme.palette.secondary.main,
    outlineColor: theme.palette.secondary.main,
  },
  typography: {
    color: theme.palette.background.contrastText,
  },
})

export const LoginStyles = theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(2),
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.secondary.main,
  },
  checBox: {
    color: theme.palette.secondary.main,
    outlineColor: theme.palette.secondary.main,
  },
  typography: {
    color: theme.palette.background.contrastText,
  },
})

export const MainStyles = theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 240,
  },
})

export const FeedbackStyles = theme => ({
  paper: {
    marginTop: theme.spacing(8),
    padding: theme.spacing(3),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: 400,
    height: 100,
  },
  iconbutton: {
    padding: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
    "&:hover,&:focus": {
      backgroundColor: theme.palette.secondary.light,
    },
    color: theme.palette.secondary.contrastText,
  },
})

export const CopyrightStyles = theme => ({
  typography: {
    color: theme.palette.background.contrastText,
  },
})
