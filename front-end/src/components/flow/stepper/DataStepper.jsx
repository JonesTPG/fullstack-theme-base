/* eslint-disable indent */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import FirstStep from './FirstStep';
import SecondStep from './SecondStep';
import ThirdStep from './ThirdStep';
import FourthStep from './FourthStep';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%'
  },
  button: {
    marginRight: theme.spacing(1)
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  }
}));

const steps = [
  'What kind of eCommerce solution are you looking for?',
  'Do you already have an eCommerce platform?',
  'Basic info',
  'How much can you invest in the solution?'
];

const DataStepper = ({ handleSubmit }) => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [data, setData] = React.useState({});
  const handleCheck = state => {
    setData(prevState => ({ ...prevState, ...state }));
  };

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleStepperFinish = () => {
    handleSubmit(data);
  };

  function getStepContent(step) {
    switch (step) {
      case 0:
        return <FirstStep handleCheck={handleCheck} />;
      case 1:
        return <SecondStep handleCheck={handleCheck} />;
      case 2:
        return <ThirdStep handleCheck={handleCheck} />;
      case 3:
        return <FourthStep handleCheck={handleCheck} />;
      default:
        return 'Finished';
    }
  }

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep}>
        {steps.map(label => {
          return (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div>
            <Typography className={classes.instructions}>
              All steps completed - you&apos;re finished
            </Typography>
            <Button
              onClick={handleStepperFinish}
              className={classes.button}
              color="secondary"
              variant="contained"
            >
              Continue
            </Button>
          </div>
        ) : (
          <div className={classes.instructions}>
            {getStepContent(activeStep)}
            <div>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.button}
                color="secondary"
              >
                Back
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleNext}
                className={classes.button}
              >
                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DataStepper;
