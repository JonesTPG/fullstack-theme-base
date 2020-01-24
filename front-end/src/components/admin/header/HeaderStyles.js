const lightColor = 'rgba(255, 255, 255, 0.7)';

export const styles = theme => ({
  secondaryBar: {
    zIndex: 0,
    backgroundColor: theme.palette.primary.main
  },
  menuButton: {
    marginLeft: -theme.spacing(1)
  },
  iconButtonAvatar: {
    padding: 4
  },
  link: {
    textDecoration: 'none',
    color: lightColor,
    '&:hover': {
      color: theme.palette.common.white
    }
  },
  button: {},
  appBar: {
    backgroundColor: theme.palette.primary.main
  }
});
