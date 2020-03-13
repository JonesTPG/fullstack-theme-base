import React from 'react';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

const FourthStep = ({ handleCheck }) => {
  const [value, setValue] = React.useState([300, 1500]);

  const handleChange = (event, newValue) => {
    let tempState = [];
    setValue(() => {
      tempState = newValue;
      return tempState;
    });
    handleCheck({ minPrice: tempState[0], maxPrice: tempState[1] });
  };

  return (
    <div>
      <Typography id="range-slider" gutterBottom>
        Price Range (€/month)
      </Typography>
      <Slider
        value={value}
        onChange={(event, newValue) => setValue(newValue)}
        onChangeCommitted={handleChange}
        min={0}
        max={3000}
        valueLabelDisplay="auto"
        valueLabelFormat={value => `${value} €`}
        color="secondary"
      />
    </div>
  );
};

export default FourthStep;
