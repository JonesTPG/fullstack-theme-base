import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';

import useField from '../../hooks/input';
import { withRouter } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import { SignUpStyles } from '../AllStyles';
import { SIGNUP } from '../../queries/signup';

const SignUp = props => {
  const fname = useField('text');
  const lname = useField('text');
  const email = useField('email');
  const password = useField('password');
  const { classes } = props;

  const [signup] = useMutation(SIGNUP, {
    onCompleted() {
      props.history.push('/login');
    },
    onError(error) {
      console.log(error);
    }
  });

  const handleSubmit = async event => {
    event.preventDefault();

    if (
      email.value === '' ||
      fname.value === '' ||
      lname.value === '' ||
      password.value === ''
    ) {
      return;
    }

    await signup({
      variables: {
        username: email.value,
        password: password.value,
        firstName: fname.value,
        lastName: lname.value
      }
    });
    fname.resetState();
    lname.resetState();
    email.resetState();
    password.resetState();
  };

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                data-cy="firstName"
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                {...fname.inputprops()}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                data-cy="lastName"
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                {...lname.inputprops()}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                data-cy="email"
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                {...email.inputprops()}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                data-cy="password"
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                {...password.inputprops()}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    value="allowExtraEmails"
                    name="checkBox"
                    className={classes.checkBox}
                  />
                }
                label="I allow my activities in the app to be tracked and shown in the admin page in real time."
              />
            </Grid>
          </Grid>
          <Button
            data-cy="signUp"
            type="submit"
            fullWidth
            variant="contained"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Typography className={classes.typography}>
                <Link
                  style={{ cursor: 'pointer' }}
                  data-cy="signIn"
                  onClick={() => props.history.push('/login')}
                  variant="body2"
                  color="primary"
                >
                  Already have an account? Sign in
                </Link>
              </Typography>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

const styledSignUp = withStyles(SignUpStyles)(SignUp);
export default withRouter(styledSignUp);
