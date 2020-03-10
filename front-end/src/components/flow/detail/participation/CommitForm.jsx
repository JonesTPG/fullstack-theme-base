import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

const useStyles = makeStyles(theme => ({
  grid: {
    padding: theme.spacing(2)
  },
  form: {
    paddingBottom: '30px'
  },
  root: {
    flexGrow: 1,
    alignItems: 'center',
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
  },
  actionbuttons: {
    paddingRight: '30px',
    paddingBottom: '30px'
  }
}));

const CommitForm = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.form}>
      <Grid container justify="center" spacing={2} className={classes.grid}>
        <Button
          variant="contained"
          color="secondary"
          size="large"
          onClick={handleClickOpen}
        >
          Sitoudu projektiin
        </Button>
      </Grid>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          Sitoutuminen projektiin
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Projektin etenemisen kannalta tarvitsemme sitovan ilmoittautumisen
            osallistumisesta.
          </DialogContentText>
          <TextField
            data-cy="firstName"
            className={classes.root}
            required
            variant="outlined"
            margin="normal"
            fullWidth
            label="Etunimi"
            name="firstName"
            autoComplete="firstName"
            autoFocus
          />

          <TextField
            data-cy="lastName"
            className={classes.root}
            required
            variant="outlined"
            margin="normal"
            fullWidth
            name="lastName"
            label="Sukunimi"
            id="lastName"
          />
          <TextField
            data-cy="email"
            className={classes.root}
            required
            variant="outlined"
            margin="normal"
            fullWidth
            name="email"
            label="Email"
            id="email"
          />

          <TextField
            data-cy="phone"
            className={classes.root}
            placeholder="Phone"
            variant="outlined"
            margin="normal"
            fullWidth
            name="phone"
            label="Puhelinnumero"
            id="phone"
          />
          <TextField
            data-cy="company"
            className={classes.root}
            variant="outlined"
            margin="normal"
            fullWidth
            name="company"
            label="Yritys"
            id="company"
          />
          <TextField
            data-cy="message"
            className={classes.root}
            rows="4"
            label="Lisätietoja"
            id="filled-textarea"
            margin="dense"
            multiline
            fullWidth
            variant="outlined"
          />
          <FormControlLabel
            control={<Checkbox value="remember" name="checkBox" />}
            label="Ilmoittautuminen on sitova *"
          />
        </DialogContent>
        <DialogActions className={classes.actionbuttons}>
          <Button onClick={handleClose}>Peruuta</Button>
          <Button onClick={handleClose} variant="outlined">
            Sitoudu
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CommitForm;
