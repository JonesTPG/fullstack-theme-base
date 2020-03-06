import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  card: {
    minWidth: 275
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)'
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
});

const Contact = ({ data }) => {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          Contact Request
        </Typography>
        <ul>
          <li>first name: {data.firstName}</li>
          <li>last name: {data.lastName}</li>
          <li>email: {data.email}</li>
          <li>phone: {data.phone}</li>
          <li>company: {data.company}</li>
          <li>message: {data.message}</li>
        </ul>
      </CardContent>
      <CardActions>
        <Button size="small">Remove request</Button>
      </CardActions>
    </Card>
  );
};

export default Contact;
