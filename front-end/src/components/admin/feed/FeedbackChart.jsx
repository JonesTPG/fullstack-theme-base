import React from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { withStyles } from '@material-ui/core/styles';
import StarRoundedIcon from '@material-ui/icons/StarRounded';

const Bar1 = withStyles({
  colorPrimary: {
    backgroundColor: '#E9A2AA'
  },
  barColorPrimary: {
    backgroundColor: '#E0001B'
  }
})(LinearProgress);
const Bar2 = withStyles({
  colorPrimary: {
    backgroundColor: '#EED3A8'
  },
  barColorPrimary: {
    backgroundColor: '#E48E00'
  }
})(LinearProgress);
const Bar3 = withStyles({
  colorPrimary: {
    backgroundColor: '#DDE097'
  },
  barColorPrimary: {
    backgroundColor: '#D0D900'
  }
})(LinearProgress);
const Bar4 = withStyles({
  colorPrimary: {
    backgroundColor: '#C6CF9B'
  },
  barColorPrimary: {
    backgroundColor: '#93B100'
  }
})(LinearProgress);
const Bar5 = withStyles({
  colorPrimary: {
    backgroundColor: '#B6E59E'
  },
  barColorPrimary: {
    backgroundColor: '#3DBB00'
  }
})(LinearProgress);

const FeedbackChart = ({ data }) => {
  const feedbackGrades = data.map(f => f.type);
  let grades = [0, 0, 0, 0, 0];
  let total = 0;
  for (let i = 0; i < feedbackGrades.length; i++) {
    total += feedbackGrades[i];
    grades[feedbackGrades[i] - 1]++;
  }
  const average = total / feedbackGrades.length;
  return (
    <>
      <Grid item key="average" xs={3}>
        <Typography>Average</Typography>
        <Typography>{Math.round(average * 10) / 10}</Typography>
        <Typography>{feedbackGrades.length} total ratings!</Typography>
      </Grid>
      <Grid item key="chart" xs={8}>
        <Table>
          <TableBody>
            <TableRow key="fives">
              <TableCell align="left">
                <StarRoundedIcon />
                <StarRoundedIcon />
                <StarRoundedIcon />
                <StarRoundedIcon />
                <StarRoundedIcon />
                <Bar5
                  variant="determinate"
                  value={(grades[4] / feedbackGrades.length) * 100}
                />
              </TableCell>
            </TableRow>
            <TableRow key="fours">
              <TableCell align="left">
                <StarRoundedIcon />
                <StarRoundedIcon />
                <StarRoundedIcon />
                <StarRoundedIcon />
                <Bar4
                  variant="determinate"
                  value={(grades[3] / feedbackGrades.length) * 100}
                />
              </TableCell>
            </TableRow>
            <TableRow key="threes">
              <TableCell align="left">
                <StarRoundedIcon />
                <StarRoundedIcon />
                <StarRoundedIcon />
                <Bar3
                  variant="determinate"
                  value={(grades[2] / feedbackGrades.length) * 100}
                />
              </TableCell>
            </TableRow>
            <TableRow key="twos">
              <TableCell align="left">
                <StarRoundedIcon />
                <StarRoundedIcon />
                <Bar2
                  variant="determinate"
                  value={(grades[1] / feedbackGrades.length) * 100}
                />
              </TableCell>
            </TableRow>
            <TableRow key="ones">
              <TableCell align="left">
                <StarRoundedIcon />
                <Bar1
                  variant="determinate"
                  value={(grades[0] / feedbackGrades.length) * 100}
                />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Grid>
    </>
  );
};

export default FeedbackChart;
