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
import { CREATE_CONTACT } from '../../queries/contact';

import { useMutation } from '@apollo/react-hooks';

import useField from '../../hooks/input';

const useStyles = makeStyles(theme => ({
  heroContent: {
    padding: theme.spacing(3, 0, 3)
  }
}));

const ContactForm = () => {
  const classes = useStyles();

  const firstName = useField('firstName');
  const lastName = useField('lastName');
  const email = useField('email');
  const phone = useField('phone');
  const company = useField('company');
  const message = useField('message');

  const [addContact] = useMutation(CREATE_CONTACT);

  const handleSubmit = async event => {
    event.preventDefault();
  };

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
                  {...firstName.inputprops()}
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
                  {...lastName.inputprops()}
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
                  fullWidth
                  type="submit"
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit}
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
