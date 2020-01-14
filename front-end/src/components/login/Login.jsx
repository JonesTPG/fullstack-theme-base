import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import useField from "../../hooks/input-hooks";

import Copyright from "../Copyright";

import { withRouter } from "react-router-dom";

import { LOGIN } from "../../queries/login";
import { useMutation } from "@apollo/react-hooks";
import LoginStyles from "./LoginStyles";

const Login = props => {
  const email = useField("email");
  const password = useField("password");

  const [login] = useMutation(LOGIN, {
    onCompleted({ login }) {
      window.localStorage.setItem("theme-base-token", login.value);
      props.history.push("/");
    },
    onError({ error }) {
      console.log("error");
    }
  });

  const { classes } = props;

  const handleSubmit = async event => {
    event.preventDefault();

    await login({
      variables: {
        username: email.value,
        password: password.value
      }
    });

    email.resetState();
    password.resetState();
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit} noValidate>
          <TextField
            data-cy="username"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            {...email.inputprops()}
          />
          <TextField
            data-cy="password"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            {...password.inputprops()}
          />
          <FormControlLabel
            control={
              <Checkbox value="remember" name="checkBox" color="primary" />
            }
            label="Remember me"
          />
          <Button
            data-cy="signIn"
            color="primary"
            type="submit"
            fullWidth
            variant="contained"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/signup" variant="body2">
                Don't have an account? Sign Up
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
};

const styledLogin = withStyles(LoginStyles)(Login);
export default withRouter(styledLogin);
