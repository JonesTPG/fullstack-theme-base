import React from 'react';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import Button from '@material-ui/core/Button';
import useField from '../../hooks/input';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles(theme => ({
  heroContent: {
    padding: theme.spacing(3, 0, 3),
    alignItems: 'center'
  },
  paper: {
    padding: theme.spacing(2)
  }
}));

const ContactForm = () => {
  const classes = useStyles();
  const fName = useField('text');
  const lName = useField('text');
  const phone = useField('number');
  const email = useField('email');
  const company = useField('text');
  const message = useField('text');

  const handleSubmit = event => {
    event.preventDefault();
    if (!event.target.checkBox.checked) {
      console.log('Must accept the privacy policy');
      return null;
    }
    const info = {
      firstName: fName.value,
      lastName: lName.value,
      phonenumber: phone.value,
      email: email.value,
      company: company.value,
      message: message.value
    };
    console.log('Information', info);
    fName.resetState();
    lName.resetState();
    phone.resetState();
    email.resetState();
    message.resetState();
  };

  return (
    <React.Fragment>
      <Container component="main" maxWidth="md" className={classes.heroContent}>
        <Grid container justify="center" spacing={2}>
          <Grid item xs={8} sm={8} md={8}>
            <Paper className={classes.paper}>
              <form onSubmit={handleSubmit}>
                <Typography
                  component="h1"
                  variant="h4"
                  align="center"
                  color="textPrimary"
                  gutterBottom
                >
                  Contact us
                </Typography>
                <Typography
                  variant="h7"
                  align="center"
                  color="textSecondary"
                  component="p"
                >
                  Please leave a message – we’ll be in touch with you soon! Our
                  email addresses follow the format of
                  firstname.lastname@fullstack.com
                </Typography>
                <TextField
                  required
                  data-cy="firstName"
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  id="firstName"
                  label="First name"
                  name="firstName"
                  autoComplete="firstName"
                  autoFocus
                  {...fName.inputprops()}
                />
                <TextField
                  required
                  data-cy="lastName"
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  name="lastName"
                  label="Last name"
                  id="lastName"
                  {...lName.inputprops()}
                />
                <TextField
                  required
                  data-cy="email"
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  name="email"
                  label="Email"
                  id="email"
                  {...email.inputprops()}
                />
                <TextField
                  data-cy="phone"
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  name="phone"
                  label="Phone"
                  id="phone"
                  {...phone.inputprops()}
                />
                <TextField
                  data-cy="company"
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  name="company"
                  label="Company"
                  id="company"
                  {...company.inputprops()}
                />
                <TextField
                  data-cy="message"
                  label="Tell us about your business needs"
                  id="filled-textarea"
                  placeholder="Message"
                  margin="normal"
                  multiline
                  fullWidth
                  variant="outlined"
                  {...message.inputprops()}
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      value="remember"
                      name="checkBox"
                      className={classes.checkBox}
                    />
                  }
                  label="I have read the privacy policy*"
                />
                <Button
                  data-cy="send"
                  type="submit"
                  variant="contained"
                  fullWidth
                  color="primary"
                >
                  Send
                </Button>
              </form>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  );
};
export default ContactForm;
