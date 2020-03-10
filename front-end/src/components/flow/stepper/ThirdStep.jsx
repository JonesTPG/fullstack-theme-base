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

const ThirdStep = ({ handleCheck }) => {
  const classes = useStyles();
  const [state, setState] = React.useState({
    products: false,
    services: false,
    cash: false,
    card: false,
    deliverSelf: false,
    deliverNot: false
  });

  const handleChange = item => event => {
    let tempState = {};
    setState(prevState => {
      tempState = { ...prevState, [item]: event.target.checked };
      return tempState;
    });
    handleCheck(tempState);
  };

  const { products, services, cash, card, deliverSelf, deliverNot } = state;

  return (
    <div className={classes.root}>
      <FormControl component="fieldset" className={classes.formControl}>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={products}
                onChange={handleChange('products')}
                value="products"
              />
            }
            label="I Sell Products"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={services}
                onChange={handleChange('services')}
                value="services"
              />
            }
            label="I Sell Services"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={cash}
                onChange={handleChange('cash')}
                value="cash"
              />
            }
            label="I Accept Cash As Payment"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={card}
                onChange={handleChange('card')}
                value="card"
              />
            }
            label="I Accept Credit Card As Payment"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={deliverSelf}
                onChange={handleChange('deliverSelf')}
                value="deliverSelf"
              />
            }
            label="I Deliver Myself"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={deliverNot}
                onChange={handleChange('deliverNot')}
                value="deliverNot"
              />
            }
            label="I Use Delivery Service"
          />
        </FormGroup>
      </FormControl>
    </div>
  );
};

export default ThirdStep;
