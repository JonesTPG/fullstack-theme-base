import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import useField from '../../hooks/input';
import { withRouter } from 'react-router-dom';
import { LOGIN } from '../../queries/login';
import { useMutation } from '@apollo/react-hooks';
import { LoginStyles } from '../AllStyles';

const Login = props => {
  const email = useField('email');
  const password = useField('password');
  const [errorText, setErrorText] = useState('');

  const [login] = useMutation(LOGIN, {
    onCompleted({ login }) {
      window.localStorage.setItem('theme-base-token', login.value);
      if (login.roles.includes('ADMIN')) {
        props.history.push('/admin');
      } else {
        props.history.push('/');
      }
    },
    onError() {
      setErrorText('*The username or password you entered is incorrect.');
      setTimeout(() => {
        setErrorText(null);
      }, 4000);
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
            helperText={errorText}
          />
          <FormControlLabel
            control={
              <Checkbox
                value="remember"
                name="checkBox"
                className={classes.checkBox}
              />
            }
            label="Remember me"
          />
          <Button
            data-cy="signIn"
            type="submit"
            fullWidth
            variant="contained"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Typography className={classes.typography}>
                <Link
                  onClick={() => props.history.push('/voivoi')}
                  color="inherit"
                >
                  Forgot password?
                </Link>
              </Typography>
            </Grid>
            <Grid item>
              <Typography className={classes.typography}>
                <Link
                  data-cy="signUp"
                  onClick={() => props.history.push('/signup')}
                  color="inherit"
                >
                  Don't have an account? Sign Up
                </Link>
              </Typography>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

const styledLogin = withStyles(LoginStyles)(Login);
export default withRouter(styledLogin);
