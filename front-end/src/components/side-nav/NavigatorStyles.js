export const styles = theme => ({
  categoryHeader: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2)
  },
  categoryHeaderPrimary: {
    backgroundColor: theme.palette.primary.main
  },
  item: {
    paddingTop: 1,
    paddingBottom: 1,
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    '&:hover,&:focus': {
      backgroundColor: theme.palette.primary.light
    }
  },
  itemCategory: {
    backgroundColor: theme.palette.primary.main,
    boxShadow: '0 -1px 0 #404854 inset',
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2)
  },
  firebase: {
    fontSize: 24,
    backgroundColor: theme.palette.primary.main
  },
  itemActiveItem: {
    color: theme.palette.primary.contrastText
  },
  itemPrimary: {
    fontSize: 'inherit'
  },
  itemIcon: {
    minWidth: 'auto',
    marginRight: theme.spacing(2)
  },
  divider: {
    marginTop: theme.spacing(2)
  },
  list: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText
  },
  drawer: {
    backgroundColor: theme.palette.primary.main
  }
});
