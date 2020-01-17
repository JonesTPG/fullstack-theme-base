import { drawerWidth } from './AdminConstants';

const styles = theme => ({
  root: {
    display: 'flex',
    minHeight: '100vh'
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0
    },
    backgroundColor: theme.palette.primary.main
  },
  app: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column'
  },
  main: {
    flex: 1,
    padding: theme.spacing(6, 4),
    background: theme.palette.background.default
  },
  footer: {
    padding: theme.spacing(2)
  }
});

export default styles;
