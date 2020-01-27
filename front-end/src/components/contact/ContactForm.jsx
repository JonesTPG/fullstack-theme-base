import React, { useState } from 'react';
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
  root: {
    '& .MuiInputBase-input:focus': {
      borderColor: '#f50057'
    }
  },
  heroContent: {
    padding: theme.spacing(3, 0, 3)
  },
  submit: {
    margin: theme.spacing(2, 0, 2)
  },
  inputFocused: {
    backgroundColor: '#f0f0f0'
  }
}));

const ContactForm = () => {
  const [errorText, setErrorText] = useState('');
  const classes = useStyles();

  const firstName = useField('firstName');
  const lastName = useField('lastName');
  const email = useField('email');
  const phone = useField('phone');
  const company = useField('company');
  const message = useField('message');

  const [addContact] = useMutation(CREATE_CONTACT, {
    onCompleted({ data }) {
      console.log(data);
      //ohjaus esim etusivulle, tai kiitosviesti
    },

    onError() {
      setErrorText('*Please fill all the required fields.');
      setTimeout(() => {
        setErrorText(null);
      }, 9000);
    }
  });

  const handleSubmit = async event => {
    event.preventDefault();
    console.log(firstName);

    console.log(firstName.value);
    await addContact({
      variables: {
        firstName: firstName.value,
        lastName: lastName.value,
        email: email.value,
        phone: phone.value,
        company: company.value,
        message: message.value
      }
    });
    firstName.resetState('');
    lastName.resetState('');
    email.resetState('');
    phone.resetState('');
    company.resetState('');
    message.resetState('');
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
                <p
                  variant="h5"
                  align="center"
                  color="textSecondary"
                  component="p"
                >
                  Please leave a message – we’ll be in touch with you soon! Our
                  email addresses follow the format of
                  firstname.lastname@fullstack.com
                </p>
                <TextField
                  className={classes.root}
                  required
                  placeholder="First name*"
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
                  placeholder="Last name*"
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
                  placeholder="Email*"
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
                  placeholder="Phone"
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
                  placeholder="Company"
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  name="company"
                  label="Company"
                  id="company"
                  {...company.inputprops()}
                />
                <TextField
                  rows="4"
                  data-cy="message"
                  label="Tell us about your business needs"
                  id="filled-textarea"
                  placeholder="Message"
                  margin="normal"
                  multiline
                  fullWidth
                  variant="outlined"
                  {...message.inputprops()}
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
                  label="I have read the privacy policy*"
                />
                <Button
                  data-cy="send"
                  fullWidth
                  type="submit"
                  variant="contained"
                  color="secondary"
                  onClick={handleSubmit}
                  className={classes.submit}
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
