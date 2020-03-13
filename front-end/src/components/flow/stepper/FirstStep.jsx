import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  },
  formControl: {
    margin: theme.spacing(3)
  }
}));

const FirstStep = ({ handleCheck }) => {
  const classes = useStyles();
  const [state, setState] = React.useState({
    onlineShop: false,
    choice2: false
  });

  const handleChange = item => event => {
    let tempState = {};
    setState(prevState => {
      tempState = { ...prevState, [item]: event.target.checked };
      return tempState;
    });
    handleCheck(tempState);
  };

  const { onlineShop, choice2 } = state;

  return (
    <div className={classes.root}>
      <FormControl component="fieldset" className={classes.formControl}>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={onlineShop}
                onChange={handleChange('onlineShop')}
                value="onlineShop"
              />
            }
            label="B2B online store"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={choice2}
                onChange={handleChange('choice2')}
                value="choice2"
              />
            }
            label="B2C online store"
          />
        </FormGroup>
      </FormControl>
    </div>
  );
};

export default FirstStep;
