import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';

import useField from '../../hooks/input';
import { withRouter } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    alignItems: 'center'
  },
  headerPaper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.primary
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.primary
  },
  formPaper: {
    padding: theme.spacing(2),
    textAlign: 'center'
  },
  form: {
    width: '100%' // Fix IE 11 issue.
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

const Feedback = () => {
  const textFeedback = useField('text');
  const classes = useStyles();
  const [appGrade, setAppGrade] = React.useState(2);
  const [uiGrade, setUiGrade] = React.useState(2);

  const handleFeedback = event => {
    event.preventDefault();
    const feedback = {
      appPerformance: appGrade,
      UI: uiGrade,
      writtenFeedback: textFeedback.value
    };
    console.log('Feedback', feedback);
    // sendFeedback(feedback)
    setAppGrade(2);
    setUiGrade(2);
    textFeedback.resetState();
  };

  return (
    <Container component="main" maxWidth="md">
      <div className={classes.root}>
        <Grid container justify="center" spacing={2}>
          <Grid item xs={12} sm={12} md={12}>
            <Paper className={classes.headerPaper}>
              <h1> Give us feedback! </h1>
              <p>
                This application template is still a work in progress, and we
                would love some feedback about the application features and
                layout.
              </p>
            </Paper>
          </Grid>

          <Grid item xs={8} sm={6} md={3}>
            <Paper className={classes.paper}>
              <Box component="fieldset" borderColor="transparent">
                <Typography>Application performance</Typography>
                <Rating
                  name="appGrade"
                  value={appGrade}
                  onChange={(event, newValue) => {
                    setAppGrade(newValue);
                  }}
                />
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={8} sm={6} md={3}>
            <Paper className={classes.paper}>
              <Box component="fieldset" borderColor="transparent">
                <Typography>UI</Typography>
                <Rating
                  name="uiGrade"
                  value={uiGrade}
                  onChange={(event, newValue) => {
                    setUiGrade(newValue);
                  }}
                />
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <Paper className={classes.formPaper}>
              <TextField
                multiline
                rows="3"
                className={classes.root}
                variant="outlined"
                name="feedback"
                label="Feedback"
                placeholder="Tell us what we could improve"
                fullWidth
                {...textFeedback.inputprops()}
              />
            </Paper>
          </Grid>
          <Button
            type="button"
            variant="contained"
            color="secondary"
            onClick={handleFeedback}
          >
            Send feedback
          </Button>
        </Grid>
      </div>
    </Container>
  );
};

export default withRouter(Feedback);
