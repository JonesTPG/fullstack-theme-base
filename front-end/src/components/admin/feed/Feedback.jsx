import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Skeleton from '@material-ui/lab/Skeleton';

const useStyles = makeStyles({
  card: {
    minWidth: 275,
    minHeight: 100
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

const Feedback = ({ data }) => {
  const classes = useStyles();
  return (
    <>
      <Card className={classes.card}>
        <CardContent>
          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
          >
            Feedback from the site
          </Typography>

          <Typography variant="body2" component="p">
            {data.user ? data.user.username : 'anonymous user'} gave the site a
            grade of {data.type}.
            <br />
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Remove feedback</Button>
        </CardActions>
      </Card>
    </>
  );
};

export default Feedback;
