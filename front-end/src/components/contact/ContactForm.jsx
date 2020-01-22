import React from 'react';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  heroContent: {
    padding: theme.spacing(3, 0, 3)
  }
}));

const ContactForm = () => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Card>
        <CardContent>
          <Container maxWidth="xs" className={classes.heroContent}>
            <div className={classes.paper}>
              <form className={classes.form} noValidate>
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
                />
                <TextField
                  data-cy="phone"
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  name="phone"
                  label="Phone"
                  id="phone"
                />
                <TextField
                  data-cy="company"
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  name="company"
                  label="Company"
                  id="company"
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
                  fullWidth
                  type="submit"
                  variant="contained"
                  color="primary"
                >
                  Send
                </Button>
              </form>
            </div>
          </Container>
        </CardContent>
      </Card>
    </React.Fragment>
  );
};
export default ContactForm;
