import { createStyles, Theme, StyleRules } from '@material-ui/core';

const styles = (theme: Theme): StyleRules =>
  createStyles({
    root: {
      width: '100vw',
      borderBottom: `1px solid ${theme.palette.divider}`,
    },
    header: {
      width: '100vw',
      alignItems: 'center',
      margin: `${theme.spacing(2)}px ${theme.spacing(4)}px`,
      justifyContent: 'space-between',
    },
    navigator: {
      display: 'flex',
      justifyContent: 'flex-end',
    },
    links: {
      display: 'flex',
      alignItems: 'center',
      color: theme.palette.primary.dark,
      '& > a': {
        color: theme.palette.primary.dark,
        padding: `${theme.spacing(2)}px`,
        textDecoration: 'none',

        '& :active': {
          color: theme.palette.primary.main,
        },
      },

      '& :hover': {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        textDecoration: 'none',
      },
    },
    logo: {
      width: '120px',
    },
  });

export default styles;
