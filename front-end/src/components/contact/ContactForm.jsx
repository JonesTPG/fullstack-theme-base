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
import { withRouter } from 'react-router-dom';

import { useMutation } from '@apollo/react-hooks';
import useNotification from '../../hooks/notification';
import CustomSnackbar from '../notifications/CustomSnackbar';

import useField from '../../hooks/input';

const useStyles = makeStyles(theme => ({
  heroContent: {
    padding: theme.spacing(3, 0, 3)
  },
  submit: {
    margin: theme.spacing(2, 0, 2)
  },
  root: {
    '& label.Mui-focused': {
      color: '#009be5'
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#009be5'
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#009be5'
      },
      '&:hover fieldset': {
        borderColor: '#009be5'
      },
      '&.Mui-focused fieldset': {
        borderColor: '#009be5'
      }
    }
  }
}));

const ContactForm = props => {
  const notification = useNotification();

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
      notification.showNotification(
        'Thank you for your message! We will get back to you as soon as possible.',
        'success'
      );
      props.history.push('/');
      return;
    },

    onError() {
      notification.showNotification(
        '*Please fill all the required fields.',
        'info'
      );
      return;
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
                <CustomSnackbar {...notification.notificationProps()} />

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
                  data-cy="firstName"
                  className={classes.root}
                  required
                  data-cy="firstName"
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  label="First name"
                  name="firstName"
                  autoComplete="firstName"
                  autoFocus
                  {...firstName.inputprops()}
                />
                <TextField
                  data-cy="lastName"
                  className={classes.root}
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
                  data-cy="email"
                  className={classes.root}
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
                  className={classes.root}
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
                  className={classes.root}
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
                  className={classes.root}
                  rows="4"
                  data-cy="message"
                  label="Tell us about your business needs"
                  id="filled-textarea"
                  margin="normal"
                  multiline
                  fullWidth
                  variant="outlined"
                  {...message.inputprops()}
                />
                <FormControlLabel
                  control={<Checkbox value="remember" name="checkBox" />}
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

export default withRouter(ContactForm);
