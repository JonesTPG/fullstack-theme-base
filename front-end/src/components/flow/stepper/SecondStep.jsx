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

const SecondStep = ({ handleCheck }) => {
  const classes = useStyles();
  const [state, setState] = React.useState({
    startBusiness: false,
    developBusiness: false,
    discoverBusiness: false
  });

  const handleChange = item => event => {
    let tempState = {};
    setState(prevState => {
      tempState = { ...prevState, [item]: event.target.checked };
      return tempState;
    });
    handleCheck(tempState);
  };

  // eslint-disable-next-line no-unused-vars
  const { startBusiness, developBusiness, discoverBusiness } = state;

  return (
    <div className={classes.root}>
      <FormControl component="fieldset" className={classes.formControl}>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={startBusiness}
                onChange={handleChange('startBusiness')}
                value="startBusiness"
              />
            }
            label="Yes"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={developBusiness}
                onChange={handleChange('developBusiness')}
                value="developBusiness"
              />
            }
            label="No"
          />
        </FormGroup>
      </FormControl>
    </div>
  );
};

export default SecondStep;
