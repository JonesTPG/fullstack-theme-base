import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const PasswordDialog = ({ open, handleClose, handleSign }) => {
  const [value, setValue] = React.useState('');
  const handleClick = e => {
    e.preventDefault();
    handleSign(value);
    setValue('');
  };
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Sign Up</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To create a new user, please enter your password here.
          </DialogContentText>
          <TextField
            margin="dense"
            id="password"
            label="Password"
            type="password"
            value={value}
            onChange={e => setValue(e.target.value)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleClick} color="secondary">
            Sign Up
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default PasswordDialog;
