import React from 'react';
import { Toolbar } from '@material-ui/core';
import { IconButton } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { SentimentDissatisfiedRounded } from '@material-ui/icons';
import { SentimentSatisfiedRounded } from '@material-ui/icons';
import { SentimentDissatisfied } from '@material-ui/icons';
import { SentimentSatisfied } from '@material-ui/icons';

export default function Feedback() {

    const handleSadClick = (event) => {
        event.preventDefault()
        console.log("Sad")
    }
    const handleOkClick = (event) => {
        event.preventDefault()
        console.log("OK")
    }
    const handleGladClick = (event) => {
        event.preventDefault()
        console.log("Happy")
    }

  return (
    <>
        <Typography component="h1" variant="h6" color="inherit">
            Please let us know how you feel
        </Typography>
        <Toolbar>
            <IconButton onClick={handleSadClick} color="inherit">
                <SentimentDissatisfiedRounded />
            </IconButton>
            <IconButton onClick={handleOkClick} color="inherit">
                <SentimentDissatisfied />
            </IconButton>
            <IconButton onClick={handleOkClick} color="inherit">
                <SentimentSatisfied />
            </IconButton>
            <IconButton onClick={handleGladClick} color="inherit">
                <SentimentSatisfiedRounded />
            </IconButton>
        </Toolbar>
    </>
  );
}