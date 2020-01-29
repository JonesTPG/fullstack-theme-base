import React, { useState } from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import EuroIcon from '@material-ui/icons/EuroSymbol';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';

import clsx from 'clsx';
const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 345
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: 'rotate(180deg)'
  }
}));

const Restaurant = ({ data }) => {
  const [expanded, setExpanded] = useState(false);

  const classes = useStyles();

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Imagine yummy cheeseburger here"
          height="140"
          image={data.image}
          title="I know you want me, just click me already"
        />
        <CardContent>
          <Typography gutterBottom variant="subtitle1" component="h2">
            {data.name}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions disableSpacing>
        {data.delivery_price}
        <EuroIcon fontSize="small" />
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>{data.description}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default Restaurant;
